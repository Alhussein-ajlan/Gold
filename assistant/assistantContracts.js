function isPlainObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeValue(item))
      .filter((item) => item !== undefined && item !== null && item !== '');
  }
  if (isPlainObject(value)) {
    return Object.entries(value).reduce((acc, [key, item]) => {
      const cleanKey = String(key || '').trim();
      if (!cleanKey) {
        return acc;
      }
      const cleanValue = sanitizeValue(item);
      if (cleanValue === undefined || cleanValue === null || cleanValue === '' || (Array.isArray(cleanValue) && !cleanValue.length)) {
        return acc;
      }
      acc[cleanKey] = cleanValue;
      return acc;
    }, {});
  }
  if (typeof value === 'string') {
    return value.trim();
  }
  return value;
}

function normalizeToolName(raw = '') {
  const value = String(raw || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (!value) return '';
  if (['open_tab', 'open_screen', 'navigate', 'show_screen'].includes(value)) return 'open_screen';
  if (['open_report_statement', 'open_statement_report', 'open_entity_statement'].includes(value)) return 'open_report_statement';
  if (['set_theme', 'change_theme', 'switch_theme'].includes(value)) return 'set_theme';
  if (['create_backup', 'backup_now', 'make_backup'].includes(value)) return 'create_backup';
  if (['open_backup_folder', 'show_backup_folder'].includes(value)) return 'open_backup_folder';
  if (['set_connection_mode', 'set_cloud_mode', 'switch_connection_mode', 'change_connection_mode'].includes(value)) return 'set_connection_mode';
  if (['check_license_status', 'license_status', 'subscription_status', 'check_subscription'].includes(value)) return 'check_license_status';
  if (['open_provider_settings', 'provider_settings'].includes(value)) return 'open_provider_settings';
  if (['clear_chat', 'clear_conversation'].includes(value)) return 'clear_chat';
  if (['submit_message', 'send_message'].includes(value)) return 'submit_message';
  if (['focus_screen_info', 'screen_info'].includes(value)) return 'focus_screen_info';
  if (['export_statement', 'generate_statement'].includes(value)) return 'export_statement';
  return value;
}

function normalizeToolRequest(raw = null) {
  if (!raw) {
    return null;
  }
  if (typeof raw === 'string') {
    const name = normalizeToolName(raw);
    return name ? { name, params: {} } : null;
  }
  if (!isPlainObject(raw)) {
    return null;
  }

  const name = normalizeToolName(raw.name || raw.type || raw.tool || raw.action || '');
  if (!name) {
    return null;
  }

  const fallbackParams = {
    tabId: raw.tabId,
    screen: raw.screen,
    label: raw.label,
    screenParams: raw.screenParams,
    mode: raw.mode,
    enabled: raw.enabled,
    message: raw.message,
    entityType: raw.entityType,
    entityId: raw.entityId,
    entityName: raw.entityName || raw.name,
    refId: raw.refId,
    realId: raw.realId,
    autoLoad: raw.autoLoad,
    orientation: raw.orientation,
  };
  const params = sanitizeValue(isPlainObject(raw.params) ? raw.params : fallbackParams);

  return {
    name,
    params: isPlainObject(params) ? params : {},
  };
}

function buildToolRequestFromAction(action = {}) {
  if (!isPlainObject(action) || !action.type) {
    return null;
  }

  if (action.type === 'open_tab') {
    const reportType = String(action?.screenParams?.reportType || '').trim().toLowerCase();
    if (action.tabId === 'tab-reports' && reportType === 'statement') {
      return normalizeToolRequest({
        name: 'open_report_statement',
        params: {
          tabId: action.tabId,
          entityType: action?.screenParams?.entityType,
          refId: action?.screenParams?.refId,
          realId: action?.screenParams?.realId,
          autoLoad: action?.screenParams?.autoLoad,
        },
      });
    }
    return normalizeToolRequest({
      name: 'open_screen',
      params: {
        tabId: action.tabId,
        label: action.label,
        screenParams: action.screenParams,
      },
    });
  }

  if (action.type === 'set_theme') {
    return normalizeToolRequest({ name: 'set_theme', params: { mode: action.mode } });
  }

  if (action.type === 'create_backup') {
    return normalizeToolRequest({ name: 'create_backup' });
  }

  if (action.type === 'open_backup_folder') {
    return normalizeToolRequest({ name: 'open_backup_folder' });
  }

  if (action.type === 'set_cloud_mode') {
    return normalizeToolRequest({
      name: 'set_connection_mode',
      params: {
        enabled: !!action.enabled,
        mode: action.enabled ? 'cloud' : 'local',
      },
    });
  }

  if (action.type === 'check_license_status') {
    return normalizeToolRequest({ name: 'check_license_status' });
  }

  if (action.type === 'open_provider_settings') {
    return normalizeToolRequest({ name: 'open_provider_settings' });
  }

  if (action.type === 'clear_chat') {
    return normalizeToolRequest({ name: 'clear_chat' });
  }

  if (action.type === 'submit_message') {
    return normalizeToolRequest({ name: 'submit_message', params: { message: action.message, label: action.label } });
  }

  if (action.type === 'focus_screen_info') {
    return normalizeToolRequest({ name: 'focus_screen_info', params: { tabId: action.tabId, label: action.label } });
  }

  if (action.type === 'export_statement') {
    return normalizeToolRequest({ name: 'export_statement', params: sanitizeValue(action) });
  }

  return normalizeToolRequest({ name: action.type, params: sanitizeValue(action) });
}

function buildToolRequestsFromActions(actions = []) {
  const seen = new Set();
  return (Array.isArray(actions) ? actions : []).reduce((acc, action) => {
    const tool = buildToolRequestFromAction(action);
    if (!tool) {
      return acc;
    }
    const key = JSON.stringify(tool);
    if (seen.has(key)) {
      return acc;
    }
    seen.add(key);
    acc.push(tool);
    return acc;
  }, []);
}

function normalizeEntityType(raw = '') {
  const value = String(raw || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (!value) return '';
  if (['customer', 'customers', 'عميل', 'العميل', 'العملاء'].includes(value)) return 'customer';
  if (['supplier', 'suppliers', 'مورد', 'المورد', 'الموردين'].includes(value)) return 'supplier';
  if (['account', 'accounts', 'حساب', 'الحساب', 'الحسابات'].includes(value)) return 'account';
  if (['user', 'users', 'مستخدم', 'المستخدم', 'المستخدمين'].includes(value)) return 'user';
  return value;
}

function normalizeDocumentType(raw = '') {
  const value = String(raw || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (!value) return '';
  if (['sales_invoice', 'sales_invoices', 'sale_invoice', 'invoice_sale'].includes(value)) return 'sales_invoice';
  if (['purchase_invoice', 'purchase_invoices', 'buy_invoice'].includes(value)) return 'purchase_invoice';
  if (['order', 'orders'].includes(value)) return 'order';
  if (['receipt', 'receipts'].includes(value)) return 'receipt';
  if (['voucher', 'vouchers'].includes(value)) return 'voucher';
  return value;
}

function normalizeBalanceSide(raw = '') {
  const value = String(raw || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (!value) return '';
  if (['debtor', 'debtors', 'مدين', 'مدينون', 'مدينين'].includes(value)) return 'debtors';
  if (['creditor', 'creditors', 'دائن', 'دائنون', 'دائنين'].includes(value)) return 'creditors';
  if (['net', 'all', 'total', 'both'].includes(value)) return 'all';
  return value;
}

function normalizeQueryPlanKind(raw = '') {
  const value = String(raw || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (!value) return '';
  if (['aggregate_party_balances', 'aggregate_balances', 'party_balance_summary'].includes(value)) return 'aggregate_party_balances';
  if (['entity_balance', 'balance_lookup', 'get_entity_balance'].includes(value)) return 'entity_balance';
  if (['entity_statement', 'statement', 'open_statement'].includes(value)) return 'entity_statement';
  if (['latest_related_document', 'latest_document', 'last_document'].includes(value)) return 'latest_related_document';
  if (['count_records', 'count', 'record_count'].includes(value)) return 'count_records';
  if (['grouped_count', 'count_group', 'count_multiple_tables'].includes(value)) return 'grouped_count';
  if (['box_balances', 'boxes_balance', 'box_balance'].includes(value)) return 'box_balances';
  if (['list_schema_tables', 'schema_tables', 'tables'].includes(value)) return 'list_schema_tables';
  return value;
}

function normalizeQueryPlan(raw = null) {
  if (!raw) {
    return null;
  }
  if (typeof raw === 'string') {
    const kind = normalizeQueryPlanKind(raw);
    return kind ? { kind } : null;
  }
  if (!isPlainObject(raw)) {
    return null;
  }

  const kind = normalizeQueryPlanKind(raw.kind || raw.type || raw.operation || raw.plan || '');
  const metric = String(raw.metric || '').trim();
  const inferredKind = kind || normalizeQueryPlanKind(metric);
  const tables = Array.isArray(raw.tables)
    ? raw.tables.map((item) => String(item || '').trim()).filter(Boolean)
    : [];
  const recordId = Number(raw.recordId || raw.id || raw.refId || 0);
  const queryPlan = sanitizeValue({
    kind: inferredKind,
    entityType: normalizeEntityType(raw.entityType || raw.entity || raw.scopeEntity || ''),
    documentType: normalizeDocumentType(raw.documentType || raw.document || ''),
    table: String(raw.table || '').trim(),
    tables,
    scope: String(raw.scope || '').trim(),
    metric,
    entityName: String(raw.entityName || raw.name || '').trim(),
    recordId: Number.isFinite(recordId) && recordId > 0 ? recordId : undefined,
    balanceSide: normalizeBalanceSide(raw.balanceSide || raw.side || raw.polarity || ''),
    boxType: String(raw.boxType || '').trim(),
    includeCount: typeof raw.includeCount === 'boolean' ? raw.includeCount : undefined,
    source: String(raw.source || '').trim(),
  });

  if (!queryPlan.kind && !queryPlan.table && !queryPlan.entityType && !queryPlan.documentType && !queryPlan.metric) {
    return null;
  }

  return queryPlan;
}

module.exports = {
  normalizeToolName,
  normalizeToolRequest,
  buildToolRequestFromAction,
  buildToolRequestsFromActions,
  normalizeEntityType,
  normalizeDocumentType,
  normalizeBalanceSide,
  normalizeQueryPlanKind,
  normalizeQueryPlan,
};
