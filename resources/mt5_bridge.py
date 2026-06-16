import argparse
import json
import sys
import time
import threading
import queue

try:
    import numpy  # noqa: F401
except Exception:
    numpy = None


def _emit(obj):
    try:
        if sys.stdout is None or sys.stdout.closed:
            return
        sys.stdout.write(json.dumps(obj, ensure_ascii=False) + "\n")
        sys.stdout.flush()
    except (OSError, IOError, ValueError):
        pass


def _read_stdin(cmd_q, stop_evt):
    try:
        while not stop_evt.is_set():
            line = sys.stdin.readline()
            if not line:
                break
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except Exception:
                continue
            try:
                cmd_q.put(obj)
            except Exception:
                pass
    except Exception:
        return


def _pick_attr(obj, keys):
    for k in keys:
        if isinstance(obj, dict) and k in obj:
            return obj.get(k)
        v = getattr(obj, k, None)
        if v is not None:
            return v
    return None


def _account_info_to_dict(info):
    if info is None:
        return None
    d = {}
    for k in ['login', 'name', 'server', 'currency', 'balance', 'equity', 'margin', 'margin_free', 'margin_level']:
        v = getattr(info, k, None)
        if v is None:
            continue
        try:
            if isinstance(v, (int, float, str)):
                d[k] = v
            else:
                d[k] = str(v)
        except Exception:
            pass
    return d


def _order_to_dict(order):
    if order is None:
        return None
    d = {}
    try:
        ticket = _pick_attr(order, ["ticket"])
        if ticket is not None:
            try:
                ticket = int(ticket)
            except Exception:
                pass
            d["ticket"] = ticket
    except Exception:
        pass

    try:
        symbol = _pick_attr(order, ["symbol"])
        if symbol is not None:
            d["symbol"] = str(symbol)
    except Exception:
        pass

    try:
        vol = _pick_attr(order, ["volume_current", "volume_initial", "volume"])
        if vol is not None:
            try:
                d["volume"] = float(vol)
            except Exception:
                d["volume"] = vol
    except Exception:
        pass

    try:
        price = _pick_attr(order, ["price_open", "price"])
        if price is not None:
            try:
                d["price_open"] = float(price)
            except Exception:
                d["price_open"] = price
    except Exception:
        pass

    try:
        ot = _pick_attr(order, ["type"])
        if ot is not None:
            d["type"] = int(ot) if isinstance(ot, (int, float)) else str(ot)
    except Exception:
        pass

    try:
        ts = _pick_attr(order, ["time_setup", "time"])
        if ts is not None:
            try:
                d["time_setup"] = int(ts)
            except Exception:
                d["time_setup"] = ts
    except Exception:
        pass

    try:
        comment = _pick_attr(order, ["comment"])
        if comment:
            d["comment"] = str(comment)
    except Exception:
        pass

    return d


def _handle_command(mt5, cmd, resolved_symbols):
    rid = None
    try:
        if isinstance(cmd, dict):
            rid = cmd.get('id') or cmd.get('request_id')
    except Exception:
        rid = None

    def reply(ok, payload=None, error=None):
        out = {'type': 'response', 'id': rid, 'ok': bool(ok)}
        if isinstance(cmd, dict) and cmd.get('cmd'):
            out['cmd'] = cmd.get('cmd')
        if payload is not None:
            out['data'] = payload
        if error:
            out['error'] = str(error)
        _emit(out)

    if not isinstance(cmd, dict):
        reply(False, error='Invalid command')
        return

    c = (cmd.get('cmd') or '').strip().lower()
    if c == 'ping':
        info = None
        try:
            info = mt5.account_info()
        except Exception:
            info = None
        data = _account_info_to_dict(info)
        if data is None:
            reply(False, error='MT5 not ready')
            return
        reply(True, payload=data)
        return

    if c == 'deal_by_order':
        ticket = cmd.get('ticket')
        if ticket is None:
            ticket = cmd.get('order')
        if ticket is None:
            ticket = cmd.get('order_ticket')
        if ticket is None:
            ticket = cmd.get('mt5_order_ticket')
        try:
            ticket = int(ticket)
        except Exception:
            ticket = 0

        if ticket <= 0:
            reply(False, error='Invalid ticket')
            return

        # First, try to get the order from history to find its position
        from datetime import datetime, timedelta
        now = datetime.now()
        # Search last 30 days of history
        date_from = now - timedelta(days=30)
        
        deals = None
        position_id = None
        
        # Method 1: Try to get order from history and find its position
        try:
            orders = mt5.history_orders_get(ticket=ticket)
            if orders and len(orders) > 0:
                position_id = getattr(orders[0], 'position_id', None)
                if position_id and position_id > 0:
                    # Get deals by position
                    deals = mt5.history_deals_get(position=position_id)
        except Exception:
            pass
        
        # Method 2: If no deals found, search all deals by date range and match order attribute
        if deals is None or len(deals) < 1:
            try:
                all_deals = mt5.history_deals_get(date_from, now)
                if all_deals:
                    matching = [d for d in all_deals if getattr(d, 'order', None) == ticket]
                    if matching:
                        deals = matching
            except Exception:
                pass
        
        # Method 3: Fallback - try direct ticket query (might be deal ticket)
        if deals is None or len(deals) < 1:
            try:
                deals = mt5.history_deals_get(ticket=ticket)
            except Exception:
                deals = None

        if deals is None:
            le = None
            try:
                le = mt5.last_error()
            except Exception:
                le = None
            reply(False, payload={'ticket': ticket, 'last_error': str(le) if le is not None else None}, error='history_deals_get failed')
            return

        if len(deals) < 1:
            reply(True, payload={'ticket': ticket, 'found': False})
            return

        best = None
        best_ts = None
        for d in deals:
            t_msc = getattr(d, 'time_msc', None)
            t_sec = getattr(d, 'time', None)
            ts = None
            if t_msc is not None:
                try:
                    ts = int(t_msc)
                except Exception:
                    ts = None
            if ts is None and t_sec is not None:
                try:
                    ts = int(float(t_sec) * 1000)
                except Exception:
                    ts = None
            if ts is None:
                ts = 0

            if best is None or (best_ts is not None and ts > best_ts) or best_ts is None:
                best = d
                best_ts = ts

        deal_ticket = getattr(best, 'ticket', None)
        try:
            deal_ticket = int(deal_ticket) if deal_ticket is not None else None
        except Exception:
            deal_ticket = None

        symbol = getattr(best, 'symbol', None)
        try:
            symbol = str(symbol) if symbol is not None else None
        except Exception:
            symbol = None

        price = getattr(best, 'price', None)
        try:
            price = float(price) if price is not None else None
        except Exception:
            price = None

        volume = getattr(best, 'volume', None)
        try:
            volume = float(volume) if volume is not None else None
        except Exception:
            volume = None

        time_sec = getattr(best, 'time', None)
        try:
            time_sec = int(time_sec) if time_sec is not None else None
        except Exception:
            time_sec = None

        time_msc = getattr(best, 'time_msc', None)
        try:
            time_msc = int(time_msc) if time_msc is not None else None
        except Exception:
            time_msc = None

        reply(True, payload={
            'ticket': ticket,
            'found': True,
            'deal': deal_ticket,
            'symbol': symbol,
            'price': price,
            'volume': volume,
            'time': time_sec,
            'time_msc': time_msc,
        })
        return

    if c == 'list_open_positions':
        positions = None
        try:
            positions = mt5.positions_get()
        except Exception as e:
            le = None
            try:
                le = mt5.last_error()
            except Exception:
                le = None
            reply(False, payload={'last_error': str(le) if le is not None else None}, error=str(e))
            return

        if positions is None:
            le = None
            try:
                le = mt5.last_error()
            except Exception:
                le = None
            reply(False, payload={'last_error': str(le) if le is not None else None}, error='positions_get returned None')
            return

        items = []
        try:
            for p in positions:
                d = {}
                try:
                    ticket = getattr(p, 'ticket', None)
                    if ticket is not None:
                        try:
                            ticket = int(ticket)
                        except Exception:
                            pass
                        d['ticket'] = ticket
                except Exception:
                    pass

                try:
                    symbol = getattr(p, 'symbol', None)
                    if symbol is not None:
                        d['symbol'] = str(symbol)
                except Exception:
                    pass

                try:
                    vol = getattr(p, 'volume', None)
                    if vol is not None:
                        try:
                            d['volume'] = float(vol)
                        except Exception:
                            d['volume'] = vol
                except Exception:
                    pass

                try:
                    price_open = getattr(p, 'price_open', None)
                    if price_open is not None:
                        try:
                            d['price_open'] = float(price_open)
                        except Exception:
                            d['price_open'] = price_open
                except Exception:
                    pass

                try:
                    profit = getattr(p, 'profit', None)
                    if profit is not None:
                        try:
                            d['profit'] = float(profit)
                        except Exception:
                            d['profit'] = profit
                except Exception:
                    pass

                try:
                    pt = getattr(p, 'type', None)
                    if pt is not None:
                        d['type'] = int(pt) if isinstance(pt, (int, float)) else str(pt)
                except Exception:
                    pass

                if d:
                    items.append(d)
        except Exception:
            pass

        reply(True, payload={'positions': items})
        return

    if c == 'list_pending_orders':
        orders = None
        try:
            orders = mt5.orders_get()
        except Exception as e:
            le = None
            try:
                le = mt5.last_error()
            except Exception:
                le = None
            reply(False, payload={'last_error': str(le) if le is not None else None}, error=str(e))
            return

        if orders is None:
            le = None
            try:
                le = mt5.last_error()
            except Exception:
                le = None
            reply(False, payload={'last_error': str(le) if le is not None else None}, error='orders_get returned None')
            return

        items = []
        try:
            for o in orders:
                d = _order_to_dict(o)
                if d:
                    items.append(d)
        except Exception:
            pass

        reply(True, payload={'orders': items})
        return

    if c == 'cancel_order':
        ticket = cmd.get('ticket')
        if ticket is None:
            ticket = cmd.get('order_ticket')
        if ticket is None:
            ticket = cmd.get('mt5_order_ticket')
        try:
            ticket = int(ticket)
        except Exception:
            ticket = 0

        if ticket <= 0:
            reply(False, error='Invalid ticket')
            return

        # Check if order exists in pending orders
        orders = None
        try:
            orders = mt5.orders_get(ticket=ticket)
        except Exception:
            orders = None

        if orders is None or len(orders) < 1:
            # Order not found in pending - might be already executed or cancelled
            reply(True, payload={'ticket': ticket, 'cancelled': False, 'reason': 'Order not found in pending orders'})
            return

        order = orders[0]
        symbol = getattr(order, 'symbol', None)
        volume = getattr(order, 'volume_current', None) or getattr(order, 'volume_initial', None)

        try:
            volume = float(volume) if volume is not None else 0.01
        except Exception:
            volume = 0.01

        # Create cancel request
        request = {
            'action': mt5.TRADE_ACTION_REMOVE,
            'order': ticket,
        }

        result = None
        try:
            result = mt5.order_send(request)
        except Exception as e:
            reply(False, error=f'order_send exception: {str(e)}')
            return

        if result is None:
            le = None
            try:
                le = mt5.last_error()
            except Exception:
                le = None
            reply(False, payload={'ticket': ticket, 'last_error': str(le) if le else None}, error='order_send returned None')
            return

        retcode = getattr(result, 'retcode', None)
        if retcode == mt5.TRADE_RETCODE_DONE:
            reply(True, payload={
                'ticket': ticket,
                'cancelled': True,
                'retcode': retcode,
            })
        else:
            comment = getattr(result, 'comment', None)
            reply(False, payload={
                'ticket': ticket,
                'cancelled': False,
                'retcode': retcode,
                'comment': str(comment) if comment else None,
            }, error=f'Cancel failed: retcode={retcode}')
        return

    if c == 'trade':
        desired_symbol = (cmd.get('symbol') or '').strip()
        side = (cmd.get('side') or '').strip().lower()
        kind = (cmd.get('kind') or cmd.get('order_kind') or cmd.get('order_type') or '').strip().lower()
        pending_flag = cmd.get('pending')
        limit_price = cmd.get('price')
        if limit_price is None:
            limit_price = cmd.get('limit_price')
        if limit_price is None:
            limit_price = cmd.get('limitPrice')
        volume = cmd.get('volume')
        deviation = cmd.get('deviation', 20)
        magic = cmd.get('magic', 0)
        comment = cmd.get('comment', '')

        try:
            volume = float(volume)
        except Exception:
            volume = 0.0
        if volume <= 0:
            reply(False, error='Invalid volume')
            return

        if side not in ('buy', 'sell'):
            reply(False, error='Invalid side')
            return

        is_pending = False
        try:
            is_pending = bool(pending_flag) or kind in ('pending', 'limit', 'buy_limit', 'sell_limit')
        except Exception:
            is_pending = kind in ('pending', 'limit', 'buy_limit', 'sell_limit')

        actual = resolved_symbols.get(desired_symbol) if desired_symbol else None
        if not actual:
            actual = _resolve_symbol(mt5, desired_symbol)
            if actual:
                resolved_symbols[desired_symbol] = actual
        if not actual:
            reply(False, error='Symbol not available')
            return

        try:
            mt5.symbol_select(actual, True)
        except Exception:
            pass

        tick = None
        try:
            tick = mt5.symbol_info_tick(actual)
        except Exception:
            tick = None
        if tick is None:
            reply(False, error='No tick')
            return

        bid = _pick_attr(tick, ['bid'])
        ask = _pick_attr(tick, ['ask'])
        try:
            bid = float(bid)
            ask = float(ask)
        except Exception:
            reply(False, error='Invalid tick')
            return

        try:
            deviation = int(deviation)
        except Exception:
            deviation = 20
        try:
            magic = int(magic)
        except Exception:
            magic = 0

        sym_info = None
        try:
            sym_info = mt5.symbol_info(actual)
        except Exception:
            sym_info = None

        action = mt5.TRADE_ACTION_DEAL
        otype = mt5.ORDER_TYPE_BUY if side == 'buy' else mt5.ORDER_TYPE_SELL
        price = ask if side == 'buy' else bid

        if is_pending:
            try:
                limit_price = float(limit_price)
            except Exception:
                limit_price = 0.0
            if limit_price <= 0:
                reply(False, error='Invalid price')
                return

            if sym_info is not None:
                try:
                    digits = getattr(sym_info, 'digits', None)
                    if digits is not None:
                        limit_price = round(limit_price, int(digits))
                except Exception:
                    pass

            if side == 'buy' and limit_price >= ask:
                reply(False, payload={'bid': bid, 'ask': ask, 'price': limit_price}, error='Buy limit price must be below ask')
                return
            if side == 'sell' and limit_price <= bid:
                reply(False, payload={'bid': bid, 'ask': ask, 'price': limit_price}, error='Sell limit price must be above bid')
                return

            action = mt5.TRADE_ACTION_PENDING
            otype = mt5.ORDER_TYPE_BUY_LIMIT if side == 'buy' else mt5.ORDER_TYPE_SELL_LIMIT
            price = limit_price

        filling_candidates = []
        try:
            sym_fill = getattr(sym_info, 'filling_mode', None) if sym_info is not None else None
            if sym_fill is None and sym_info is not None:
                sym_fill = getattr(sym_info, 'trade_fill_mode', None)
            if sym_fill is not None:
                try:
                    filling_candidates.append(int(sym_fill))
                except Exception:
                    pass
        except Exception:
            pass

        for attr in ('ORDER_FILLING_FOK', 'ORDER_FILLING_IOC', 'ORDER_FILLING_RETURN'):
            try:
                filling_candidates.append(int(getattr(mt5, attr)))
            except Exception:
                pass

        seen = set()
        filling_candidates = [x for x in filling_candidates if not (x in seen or seen.add(x))]
        if not filling_candidates:
            filling_candidates = [0]

        result = None
        last_exc = None
        last_le = None
        attempted = []

        invalid_fill_retcode = None
        try:
            invalid_fill_retcode = int(getattr(mt5, 'TRADE_RETCODE_INVALID_FILL', 10030))
        except Exception:
            invalid_fill_retcode = 10030

        for filling in filling_candidates:
            attempted.append(filling)
            req = {
                'action': action,
                'symbol': actual,
                'volume': volume,
                'type': otype,
                'price': price,
                'deviation': deviation,
                'magic': magic,
                'comment': str(comment)[:64],
                'type_time': mt5.ORDER_TIME_GTC,
                'type_filling': filling,
            }

            try:
                result = mt5.order_send(req)
                if result is None:
                    continue
                res_comment = getattr(result, 'comment', '')
                res_retcode = getattr(result, 'retcode', None)
                try:
                    res_retcode = int(res_retcode) if res_retcode is not None else None
                except Exception:
                    res_retcode = None
                if res_comment and 'unsupported filling' in str(res_comment).lower():
                    try:
                        last_le = mt5.last_error()
                    except Exception:
                        last_le = None
                    result = None
                    continue
                if res_retcode is not None and res_retcode == invalid_fill_retcode:
                    try:
                        last_le = mt5.last_error()
                    except Exception:
                        last_le = None
                    result = None
                    continue
                break
            except Exception as e:
                last_exc = e
                try:
                    last_le = mt5.last_error()
                except Exception:
                    last_le = None
                result = None

        if result is None:
            reply(False, payload={
                'last_error': str(last_le) if last_le is not None else None,
                'attempted_filling': attempted,
            }, error=str(last_exc) if last_exc is not None else 'order_send returned None')
            return

        le = None
        try:
            le = mt5.last_error()
        except Exception:
            le = None

        retcode = getattr(result, 'retcode', None)
        order_ticket = getattr(result, 'order', None)
        deal_ticket = getattr(result, 'deal', None)
        res_comment = getattr(result, 'comment', None)
        request_id = getattr(result, 'request_id', None)

        ok = False
        try:
            ok = int(retcode) in (
                getattr(mt5, 'TRADE_RETCODE_DONE', 10009),
                getattr(mt5, 'TRADE_RETCODE_DONE_PARTIAL', 10010),
                getattr(mt5, 'TRADE_RETCODE_PLACED', 10008),
            )
        except Exception:
            ok = False

        payload = {
            'symbol': actual,
            'side': side,
            'volume': volume,
            'price': price,
            'retcode': retcode,
            'order': order_ticket,
            'deal': deal_ticket,
            'comment': res_comment,
            'request_id': request_id,
            'attempted_filling': attempted,
        }
        if not ok:
            payload['last_error'] = str(le) if le is not None else None
        reply(ok, payload=payload, error=None if ok else (res_comment or 'Trade failed'))
        return

    reply(False, error='Unknown command')


def _get_prev_close(mt5, symbol):
    try:
        rates = mt5.copy_rates_from_pos(symbol, mt5.TIMEFRAME_D1, 1, 1)
        if rates is None or len(rates) < 1:
            return None
        row = rates[0]
        val = row["close"] if isinstance(row, dict) else getattr(row, "close", None)
        return float(val) if val is not None else None
    except Exception:
        return None


def _resolve_symbol(mt5, desired):
    desired = (desired or "").strip()
    if not desired:
        return None

    try:
        if mt5.symbol_select(desired, True):
            return desired
    except Exception:
        pass

    base = desired
    try:
        if base.upper().endswith("M") and len(base) > 1:
            base = base[:-1]
    except Exception:
        base = desired

    try:
        syms = mt5.symbols_get()
    except Exception:
        syms = None

    if not syms:
        return None

    base_u = base.upper()
    scored = []
    for info in syms:
        name = getattr(info, "name", None)
        if not name:
            continue
        n_u = name.upper()
        score = None
        if n_u == base_u:
            score = 1000
        elif n_u == base_u + "M":
            score = 950
        elif n_u.startswith(base_u):
            score = 900 - min(200, len(name) - len(base))
        elif base_u in n_u:
            score = 700 - min(200, len(name) - len(base))
        if score is None:
            continue
        scored.append((score, name))

    scored.sort(reverse=True, key=lambda x: x[0])
    for _, name in scored:
        try:
            if mt5.symbol_select(name, True):
                return name
        except Exception:
            pass

    return None


def main():
    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument("--symbols", default="XAUUSDm,XAGUSDm")
    parser.add_argument("--poll-ms", type=int, default=150)
    parser.add_argument("--heartbeat-ms", type=int, default=1000)
    args, _ = parser.parse_known_args()

    try:
        import MetaTrader5 as mt5
    except Exception as e:
        _emit({"type": "error", "message": "MetaTrader5 package not available: " + str(e)})
        return 2

    if not mt5.initialize():
        _emit({"type": "error", "message": "mt5.initialize() failed", "last_error": str(mt5.last_error())})
        return 3

    symbols = [s.strip() for s in (args.symbols or "").split(",") if s.strip()]
    if not symbols:
        _emit({"type": "error", "message": "No symbols provided"})
        mt5.shutdown()
        return 4

    resolved_symbols = {}
    ok_any = False
    for s in symbols:
        actual = _resolve_symbol(mt5, s)
        if actual:
            resolved_symbols[s] = actual
            ok_any = True

    if not ok_any:
        _emit({"type": "error", "message": "No symbols could be selected", "symbols": symbols})
        mt5.shutdown()
        return 5

    prev_close = {}
    for s in symbols:
        actual = resolved_symbols.get(s)
        prev_close[s] = _get_prev_close(mt5, actual) if actual else None

    last_tick_msc = {}
    last_emit_ms = {}
    dup_emit_interval_ms = max(500, int(args.heartbeat_ms))
    last_heartbeat = 0.0
    cmd_q = queue.Queue()
    stop_evt = threading.Event()
    try:
        t = threading.Thread(target=_read_stdin, args=(cmd_q, stop_evt), daemon=True)
        t.start()
    except Exception:
        t = None

    try:
        while True:
            now = time.time()
            now_ms = int(now * 1000)
            if (now - last_heartbeat) * 1000.0 >= float(args.heartbeat_ms):
                _emit({"type": "heartbeat", "ts": now_ms})
                last_heartbeat = now

            try:
                while True:
                    c = cmd_q.get_nowait()
                    _handle_command(mt5, c, resolved_symbols)
            except Exception:
                pass

            for s in symbols:
                tick = None
                try:
                    actual = resolved_symbols.get(s)
                    if not actual:
                        continue
                    tick = mt5.symbol_info_tick(actual)
                except Exception:
                    tick = None

                if tick is None:
                    continue

                bid = _pick_attr(tick, ['bid'])
                ask = _pick_attr(tick, ['ask'])
                try:
                    bid = float(bid)
                    ask = float(ask)
                except Exception:
                    continue

                t_msc = getattr(tick, 'time_msc', None)
                t_sec = getattr(tick, 'time', None)
                ts_ms = None
                if t_msc is not None:
                    try:
                        ts_ms = int(t_msc)
                    except Exception:
                        ts_ms = None
                if ts_ms is None and t_sec is not None:
                    try:
                        ts_ms = int(float(t_sec) * 1000)
                    except Exception:
                        ts_ms = None
                if ts_ms is None:
                    ts_ms = int(now * 1000)

                if t_msc is not None:
                    try:
                        t_msc_int = int(t_msc)
                        if last_tick_msc.get(s) == t_msc_int:
                            last_emitted = last_emit_ms.get(s, 0)
                            if (now_ms - last_emitted) < dup_emit_interval_ms:
                                continue
                        last_tick_msc[s] = t_msc_int
                    except Exception:
                        pass

                mid = (bid + ask) / 2.0

                if prev_close.get(s) is None:
                    actual = resolved_symbols.get(s)
                    prev_close[s] = _get_prev_close(mt5, actual) if actual else None

                last_emit_ms[s] = now_ms
                _emit({
                    "type": "tick",
                    "symbol": s,
                    "bid": bid,
                    "ask": ask,
                    "mid": mid,
                    "ts": now_ms,
                    "prev_close": prev_close.get(s),
                })

            time.sleep(max(0.01, float(args.poll_ms) / 1000.0))

    except KeyboardInterrupt:
        return 0
    except Exception as e:
        _emit({"type": "error", "message": str(e)})
        return 1
    finally:
        try:
            stop_evt.set()
        except Exception:
            pass
        try:
            mt5.shutdown()
        except Exception:
            pass


if __name__ == "__main__":
    raise SystemExit(main())
