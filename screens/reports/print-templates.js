// النموذج المبسط
function getPrintMetaInfo(lang){
  const resolvedLang = (lang || 'ar') === 'en' ? 'en' : 'ar';
  const locale = resolvedLang === 'en' ? 'en-US-u-ca-gregory' : 'ar-SA-u-ca-gregory';
  const now = new Date();
  return {
    date: new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: '2-digit' }).format(now),
    time: new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: true }).format(now)
  };
}

function buildPrintFooter(printDateLabel, printTimeLabel, printDate, printTime){
  return `<div class="print-footer"><span>${printDateLabel}: <bdi>${printDate}</bdi></span><span class="separator">•</span><span>${printTimeLabel}: <bdi>${printTime}</bdi></span></div>`;
}

function generateSimpleTemplate(params){
  const {headerHTML, entityType, entityName, refId, entityAddr, headHtml, bodyHtml, model, fmt, cD, cC, cB, gD, gC, gB, sD, sC, sB, basis, silverBasis, cashWords, goldWords, silverWords, t, lang} = params;
  const isRtl = (lang || 'ar') === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const { date: printDate, time: printTime } = getPrintMetaInfo(lang);
  // Translation labels with fallbacks
  const lbl = {
    title: t?.statementTitle || 'كشف حساب',
    type: t?.type || 'النوع',
    name: t?.name || 'الاسم',
    number: t?.number || 'الرقم',
    address: t?.address || 'العنوان',
    printDate: t?.printDate || 'تاريخ الطباعة',
    printTime: t?.printTime || 'وقت الطباعة',
    totals: t?.totals || 'الإجماليات',
    debitCash: t?.debitCash || 'مدين ريال',
    creditCash: t?.creditCash || 'دائن ريال',
    balanceCash: t?.balanceCash || 'رصيد ريال',
    debitGold: t?.debitGold || 'مدين ذهب',
    creditGold: t?.creditGold || 'دائن ذهب',
    balanceGold: t?.balanceGold || 'رصيد ذهب',
    debitSilver: t?.debitSilver || 'مدين فضة',
    creditSilver: t?.creditSilver || 'دائن فضة',
    balanceSilver: t?.balanceSilver || 'رصيد فضة',
    cashLabel: t?.cashLabel || 'الريال',
    goldLabel: t?.goldLabel || 'الذهب',
    silverLabel: t?.silverLabel || 'الفضة',
    print: t?.print || 'طباعة'
  };
  return `<!doctype html><html lang="${lang||'ar'}" dir="${dir}"><head><meta charset="utf-8"><title>${lbl.title}</title><style>
    *{margin:0;padding:0;box-sizing:border-box}
    @page{margin:0}
    body{font-family:Cairo,Arial,sans-serif;margin:3mm;padding-bottom:${headerHTML ? '0' : '16mm'};background:#fff;color:#333}
    .print-button{position:fixed;bottom:30px;left:30px;background:linear-gradient(135deg,#00897B 0%,#00695C 100%);color:white;border:none;padding:15px 30px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,137,123,0.4);transition:all 0.3s;z-index:1000;display:inline-flex;align-items:center;gap:8px}
    .print-button:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,137,123,0.5)}
    .print-button i{font-style:normal}
    h2{text-align:center;margin:0 0 20px 0;font-size:22px;color:#0aa99d}
    .info{margin-bottom:20px;padding:15px;background:#f9f9f9;border-radius:8px;border:2px solid #e0e0e0}
    .info-item{margin:8px 0;font-size:13px}
    .info-item .lbl{font-weight:700;margin-left:8px}
    .print-meta{display:none}
    .print-footer{position:fixed;left:0;right:0;bottom:4mm;text-align:center;font-size:9px;font-weight:600;color:#64748b;background:rgba(255,255,255,0.96);padding:4px 12px 0;border-top:1px solid rgba(148,163,184,0.35)}
    .print-footer .separator{margin:0 8px;color:#94a3b8}
    table{width:100%;border-collapse:collapse;margin:20px 0;border:2px solid #000}
    th,td{border:1px solid #333;padding:1px 3px;text-align:center;font-size:11px;line-height:1.15;font-weight:700}
    thead th{background:#0aa99d;color:#fff;font-size:11px;font-weight:800;border:1.5px solid #fff}
    tbody tr:nth-child(odd){background:#f9f9f9}
    tbody td{border:1.5px solid #333;font-weight:700}
    .totals{margin-top:25px;padding:20px;background:#f0f9f8;border-radius:8px;border:2px solid #0aa99d}
    .totals h3{text-align:center;margin-bottom:15px;color:#0aa99d}
    .totals-row{display:flex;justify-content:space-around;margin:10px 0;font-size:13px}
    .totals-row .lbl{font-weight:600;color:#666}
    .totals-row .val{font-weight:700;color:#000}
    .words{margin-top:20px;padding:15px;background:#fffacd;border-radius:8px;font-size:13px;line-height:1.7;border:2px solid #ffd700}
    @media print{.no-print{display:none !important}body{margin:2mm}table{border:2px solid #000 !important}th,td{border:1px solid #333 !important;padding:1px 2px !important;font-size:10.5px !important}thead th{font-size:10.5px !important}}
  </style></head><body>
    ${headerHTML}
    <h2>${lbl.title}</h2>
    <div class="info">
      <div class="info-item"><span class="lbl">${lbl.type}:</span>${entityType}</div>
      <div class="info-item"><span class="lbl">${lbl.name}:</span>${entityName||'—'}</div>
      <div class="info-item"><span class="lbl">${lbl.number}:</span>${refId||'—'}</div>
      ${entityAddr?`<div class="info-item"><span class="lbl">${lbl.address}:</span>${entityAddr}</div>`:''}
    </div>
    <div class="print-meta">
      <div class="print-meta-item"><span class="lbl">${lbl.printDate}</span><span class="val">${printDate}</span></div>
      <div class="print-meta-item"><span class="lbl">${lbl.printTime}</span><span class="val">${printTime}</span></div>
    </div>
    <table><thead>${headHtml}</thead><tbody>${bodyHtml}</tbody></table>
    <div class="totals">
      <h3>${lbl.totals}</h3>
      ${(model==='cash'||model==='both'||model==='silver_cash'||model==='all')?`<div class="totals-row"><span class="lbl">${lbl.debitCash}:</span><span class="val">${fmt.format(cD)}</span></div>
      <div class="totals-row"><span class="lbl">${lbl.creditCash}:</span><span class="val">${fmt.format(cC)}</span></div>
      <div class="totals-row"><span class="lbl">${lbl.balanceCash}:</span><span class="val">${fmt.format(cB)}</span></div>`:''}
      ${(model==='gold'||model==='both'||model==='all')?`<div class="totals-row"><span class="lbl">${lbl.debitGold}:</span><span class="val">${fmt.format(gD)}</span></div>
      <div class="totals-row"><span class="lbl">${lbl.creditGold}:</span><span class="val">${fmt.format(gC)}</span></div>
      <div class="totals-row"><span class="lbl">${lbl.balanceGold}:</span><span class="val">${fmt.format(gB)}</span></div>`:''}
      ${(model==='silver'||model==='silver_cash'||model==='all')?`<div class="totals-row"><span class="lbl">${lbl.debitSilver}:</span><span class="val">${fmt.format(sD||0)}</span></div>
      <div class="totals-row"><span class="lbl">${lbl.creditSilver}:</span><span class="val">${fmt.format(sC||0)}</span></div>
      <div class="totals-row"><span class="lbl">${lbl.balanceSilver}:</span><span class="val">${fmt.format(sB||0)}</span></div>`:''}
    </div>
    <div class="words">
      ${(model==='cash'||model==='both'||model==='silver_cash'||model==='all')?`<div><strong>${lbl.cashLabel}:</strong> ${cashWords}</div>`:''}
      ${(model==='gold'||model==='both'||model==='all')?`<div><strong>${lbl.goldLabel}:</strong> ${goldWords}</div>`:''}
      ${(model==='silver'||model==='silver_cash'||model==='all')&&silverWords?`<div><strong>${lbl.silverLabel}:</strong> ${silverWords}</div>`:''}
    </div>
    ${headerHTML ? '' : buildPrintFooter(lbl.printDate, lbl.printTime, printDate, printTime)}
    <button class="print-button no-print" onclick="window.print()"><i>🖨️</i>${lbl.print}</button>
  </body></html>`;
}

// النموذج التفصيلي
function generateDetailedTemplate(params){
  const {headerHTML, entityType, entityName, refId, entityAddr, entityTax, headHtml, bodyHtml, model, fmt, cD, cC, cB, gD, gC, gB, sD, sC, sB, basis, silverBasis, cashWords, goldWords, silverWords, company, t, lang} = params;
  const { date: printDate, time: printTime } = getPrintMetaInfo(lang);
  const isRtl = (lang || 'ar') === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const lbl = {
    title: t?.detailedTitle || 'كشف حساب تفصيلي',
    printDate: t?.printDate || 'تاريخ الطباعة',
    printTime: t?.printTime || 'وقت الطباعة',
    accountType: t?.accountType || 'نوع الحساب',
    accountNo: t?.accountNo || 'رقم الحساب',
    accountName: t?.accountName || 'اسم الحساب',
    address: t?.address || 'العنوان',
    taxNo: t?.taxNo || 'الرقم الضريبي',
    basisKarat: t?.basisKarat || 'عيار الأساس',
    summary: t?.summary || 'ملخص الحساب',
    cashLabel: t?.cashLabel || 'الريال',
    goldLabel: t?.goldLabel || 'الذهب',
    silverLabel: t?.silverLabel || 'الفضة',
    debit: t?.debit || 'مدين',
    credit: t?.credit || 'دائن',
    balance: t?.balance || 'الرصيد',
    wordsTitle: t?.wordsTitle || 'الرصيد بالكتابة',
    footerNote: t?.footerNote || 'ملاحظة: جميع الأوزان محولة إلى عيار',
    printedAt: t?.printedAt || 'تم الطباعة في',
    atTime: t?.atTime || 'الساعة',
    print: t?.print || 'طباعة',
    karat: t?.karat || 'عيار',
    companyDefault: t?.companyDefault || 'الشركة'
  };
  return `<!doctype html><html lang="${lang||'ar'}" dir="${dir}"><head><meta charset="utf-8"><title>${lbl.title}</title><style>
    *{margin:0;padding:0;box-sizing:border-box}
    @page{margin:12mm}
    body{font-family:Cairo,Arial,sans-serif;margin:12mm;padding-bottom:${headerHTML ? '0' : '18mm'};background:#fff}
    .print-button{position:fixed;bottom:30px;left:30px;background:linear-gradient(135deg,#00897B 0%,#00695C 100%);color:white;border:none;padding:15px 30px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,137,123,0.4);transition:all 0.3s;z-index:1000;display:inline-flex;align-items:center;gap:8px}
    .print-button:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,137,123,0.5)}
    .print-button i{font-style:normal}
    .doc-header{background:linear-gradient(135deg,#4caf50,#66bb6a);color:#fff;padding:20px;border-radius:8px;margin-bottom:20px}
    .doc-header h1{margin:0;font-size:24px;text-align:center}
    .doc-header .subtitle{text-align:center;margin-top:8px;font-size:14px;opacity:0.9}
    .meta{display:none}
    .print-footer{position:fixed;left:0;right:0;bottom:4mm;text-align:center;font-size:9px;font-weight:600;color:#64748b;background:rgba(255,255,255,0.96);padding:4px 12px 0;border-top:1px solid rgba(148,163,184,0.35)}
    .print-footer .separator{margin:0 8px;color:#94a3b8}
    .info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:20px 0;padding:15px;border:2px solid #4caf50;border-radius:8px}
    .info-item{padding:10px;background:#f9f9f9;border-radius:4px;border:1px solid #ddd}
    .info-item .lbl{display:block;font-size:11px;color:#666;margin-bottom:4px;text-transform:uppercase}
    .info-item .val{display:block;font-size:12px;font-weight:700;color:#000}
    table{width:100%;border-collapse:collapse;margin:20px 0;border:2px solid #000}
    th,td{border:1px solid #333;padding:1px 3px;text-align:center;font-size:10.5px;line-height:1.15;font-weight:700}
    thead th{background:#4caf50;color:#fff;font-size:11px;font-weight:800;border:1.5px solid #fff}
    tbody tr:nth-child(even){background:#f9f9f9}
    tbody td{border:1.5px solid #333;font-weight:700}
    .totals-wrapper{margin:25px 0;padding:20px;background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-radius:8px;border:2px solid #4caf50}
    .totals-title{font-size:16px;font-weight:700;text-align:center;margin-bottom:16px;color:#2e7d32;text-transform:uppercase;letter-spacing:1px}
    .totals-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
    .totals-card{background:#fff;padding:15px;border-radius:8px;border:2px solid #4caf50}
    .totals-card h4{margin:0 0 10px 0;font-size:12px;color:#2e7d32;text-transform:uppercase}
    .totals-card .item{display:flex;justify-content:space-between;margin:7px 0;font-size:11px;padding:3px 0;border-bottom:1px solid #eee}
    .totals-card .item:last-child{border-bottom:none}
    .totals-card .item .lbl{color:#666}
    .totals-card .item .val{font-weight:700;color:#000}
    .words-section{margin:20px 0;padding:20px;background:#fff3cd;border:2px solid #ffc107;border-radius:8px}
    .words-section h3{margin:0 0 15px 0;color:#f57c00;font-size:14px;text-align:center}
    .words-section .line{margin:10px 0;padding:10px;background:#fff;border-radius:4px;font-size:12px;line-height:1.5;border:1px solid #ffe082}
    .footer-note{margin-top:20px;padding:15px;background:#e3f2fd;border:2px solid #2196f3;border-radius:8px;font-size:11px;color:#0d47a1;text-align:center}
    @media print{.no-print{display:none !important}body{margin:8mm}.totals-wrapper{break-inside:avoid}table{border:2px solid #000 !important}th,td{border:1px solid #333 !important;padding:1px 2px !important;font-size:10px !important}thead th{font-size:10.5px !important}}
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    .doc-header{margin-top:80px;margin-bottom:30px;text-align:center;animation: fadeIn 0.5s ease-out;}
    @media print{
      .doc-header{margin-top:20px;}
    }
  </style></head><body>
    ${headerHTML}
    <div class="doc-header">
      <h1>${lbl.title}</h1>
      <div class="subtitle">${company.name||lbl.companyDefault}</div>
    </div>
    <div class="meta">
      <div class="meta-item"><span class="meta-label">${lbl.printDate}</span><span class="meta-value">${printDate}</span></div>
      <div class="meta-item"><span class="meta-label">${lbl.printTime}</span><span class="meta-value">${printTime}</span></div>
    </div>
    <div class="info-grid">
      <div class="info-item"><span class="lbl">${lbl.accountType}</span><span class="val">${entityType}</span></div>
      <div class="info-item"><span class="lbl">${lbl.accountNo}</span><span class="val">${refId||'—'}</span></div>
      <div class="info-item" style="grid-column:1/-1"><span class="lbl">${lbl.accountName}</span><span class="val">${entityName||'—'}</span></div>
      ${entityAddr?`<div class="info-item" style="grid-column:1/-1"><span class="lbl">${lbl.address}</span><span class="val">${entityAddr}</span></div>`:''}
      ${entityTax?`<div class="info-item"><span class="lbl">${lbl.taxNo}</span><span class="val">${entityTax}</span></div>`:''}
      <div class="info-item"><span class="lbl">${lbl.basisKarat}</span><span class="val">${basis}</span></div>
    </div>
    <table><thead>${headHtml}</thead><tbody>${bodyHtml}</tbody></table>
    <div class="totals-wrapper">
      <div class="totals-title">${lbl.summary}</div>
      <div class="totals-grid">
        ${(model==='cash'||model==='both'||model==='silver_cash'||model==='all')?`<div class="totals-card">
          <h4>${lbl.cashLabel}</h4>
          <div class="item"><span class="lbl">${lbl.debit}</span><span class="val">${fmt.format(cD)}</span></div>
          <div class="item"><span class="lbl">${lbl.credit}</span><span class="val">${fmt.format(cC)}</span></div>
          <div class="item" style="border-top:2px solid #4caf50;padding-top:8px;margin-top:8px"><span class="lbl">${lbl.balance}</span><span class="val">${fmt.format(cB)}</span></div>
        </div>`:''}
        ${(model==='gold'||model==='both'||model==='all')?`<div class="totals-card">
          <h4>${lbl.goldLabel} (${lbl.karat} ${basis})</h4>
          <div class="item"><span class="lbl">${lbl.debit}</span><span class="val">${fmt.format(gD)}</span></div>
          <div class="item"><span class="lbl">${lbl.credit}</span><span class="val">${fmt.format(gC)}</span></div>
          <div class="item" style="border-top:2px solid #4caf50;padding-top:8px;margin-top:8px"><span class="lbl">${lbl.balance}</span><span class="val">${fmt.format(gB)}</span></div>
        </div>`:''}
        ${(model==='silver'||model==='silver_cash'||model==='all')?`<div class="totals-card">
          <h4>${lbl.silverLabel} (${lbl.karat} ${silverBasis||999})</h4>
          <div class="item"><span class="lbl">${lbl.debit}</span><span class="val">${fmt.format(sD||0)}</span></div>
          <div class="item"><span class="lbl">${lbl.credit}</span><span class="val">${fmt.format(sC||0)}</span></div>
          <div class="item" style="border-top:2px solid #4caf50;padding-top:8px;margin-top:8px"><span class="lbl">${lbl.balance}</span><span class="val">${fmt.format(sB||0)}</span></div>
        </div>`:''}
      </div>
    </div>
    <div class="words-section">
      <h3>${lbl.wordsTitle}</h3>
      ${(model==='cash'||model==='both'||model==='silver_cash'||model==='all')?`<div class="line"><strong>${lbl.cashLabel}:</strong> ${cashWords}</div>`:''}
      ${(model==='gold'||model==='both'||model==='all')?`<div class="line"><strong>${lbl.goldLabel}:</strong> ${goldWords}</div>`:''}
      ${(model==='silver'||model==='silver_cash'||model==='all')&&silverWords?`<div class="line"><strong>${lbl.silverLabel}:</strong> ${silverWords}</div>`:''}
    </div>
    <div class="footer-note">${lbl.footerNote} ${basis}</div>
    ${headerHTML ? '' : buildPrintFooter(lbl.printDate, lbl.printTime, printDate, printTime)}
    <button class="print-button no-print" onclick="window.print()"><i>🖨️</i>${lbl.print}</button>
  </body></html>`;
}

// النموذج المحاسبي
function generateAccountingTemplate(params){
  const {headerHTML, entityType, entityName, refId, entityAddr, entityTax, headHtml, bodyHtml, model, fmt, cD, cC, cB, gD, gC, gB, sD, sC, sB, basis, silverBasis, cashWords, goldWords, silverWords, t, lang} = params;
  const isRtl = (lang || 'ar') === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const { date: printDate, time: printTime } = getPrintMetaInfo(lang);
  const lbl = {
    title: t?.accountingTitle || 'كشف حساب رسمي',
    accountType: t?.accountType || 'نوع الحساب',
    accountNo: t?.accountNo || 'رقم الحساب',
    accountName: t?.accountName || 'اسم الحساب',
    address: t?.address || 'العنوان',
    taxNo: t?.taxNo || 'الرقم الضريبي',
    printDate: t?.printDate || 'تاريخ الطباعة',
    printTime: t?.printTime || 'وقت الطباعة',
    accountingSummary: t?.accountingSummary || 'ملخص محاسبي',
    cashAccount: t?.cashAccount || 'حساب الريال',
    goldAccount: t?.goldAccount || 'حساب الذهب',
    silverAccount: t?.silverAccount || 'حساب الفضة',
    totalDebit: t?.totalDebit || 'إجمالي المدين',
    totalCredit: t?.totalCredit || 'إجمالي الدائن',
    finalBalance: t?.finalBalance || 'الرصيد النهائي',
    cashInWords: t?.cashInWords || 'الريال بالكتابة',
    goldInWords: t?.goldInWords || 'الذهب بالكتابة',
    silverInWords: t?.silverInWords || 'الفضة بالكتابة',
    karat: t?.karat || 'عيار',
    print: t?.print || 'طباعة'
  };
  return `<!doctype html><html lang="${lang||'ar'}" dir="${dir}"><head><meta charset="utf-8"><title>${lbl.title}</title><style>
    *{margin:0;padding:0;box-sizing:border-box}
    @page{margin:15mm}
    body{font-family:"Courier New",Courier,monospace;margin:15mm;padding-bottom:18mm;background:#fff;color:#000;font-size:11px}
    .print-button{position:fixed;bottom:30px;left:30px;background:linear-gradient(135deg,#00897B 0%,#00695C 100%);color:white;border:none;padding:15px 30px;border-radius:50px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,137,123,0.4);transition:all 0.3s;z-index:1000;display:inline-flex;align-items:center;gap:8px}
    .print-button:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(0,137,123,0.5)}
    .print-button i{font-style:normal}
    .letterhead{border:3px double #000;padding:15px;margin-bottom:15px}
    .letterhead h1{text-align:center;font-size:18px;margin:0;padding:10px 0;border-bottom:2px solid #000;font-family:Cairo,Arial,sans-serif}
    .print-meta{display:none}
    .print-footer{position:fixed;left:0;right:0;bottom:4mm;text-align:center;font-size:9px;font-weight:600;color:#64748b;background:rgba(255,255,255,0.96);padding:4px 12px 0;border-top:1px solid rgba(148,163,184,0.35)}
    .print-footer .separator{margin:0 8px;color:#94a3b8}
    .ref-box{margin:15px 0;padding:10px;border:2px solid #000}
    .ref-item{display:flex;justify-content:space-between;margin:5px 0;font-size:12px;padding:4px 0;border-bottom:1px solid #ccc}
    .ref-item:last-child{border-bottom:none}
    .ref-item .lbl{font-weight:700;text-transform:uppercase}
    table{width:100%;border:2px solid #000;border-collapse:collapse;margin:15px 0;font-size:11px}
    th,td{border:1px solid #000;padding:1px 3px;text-align:center;line-height:1.15;font-weight:700}
    thead th{background:#e0e0e0;font-weight:800;text-transform:uppercase;font-size:11px;letter-spacing:0.5px;border:1.5px solid #000}
    tbody td{font-family:"Courier New",Courier,monospace;border:1.5px solid #000;font-weight:700}
    .summary{margin:20px 0;border:3px solid #000;padding:15px}
    .summary-title{text-align:center;font-weight:700;font-size:13px;margin-bottom:15px;text-transform:uppercase;font-family:Cairo,Arial,sans-serif;border-bottom:2px solid #000;padding-bottom:8px}
    .summary-table{width:100%;border-collapse:collapse}
    .summary-table td{border:1.5px solid #000;padding:6px;font-size:11px}
    .summary-table .header{background:#e0e0e0;font-weight:700;text-align:center;border:1.5px solid #000}
    .summary-table .label{text-align:right;font-weight:600;width:40%;border:1.5px solid #000}
    .summary-table .value{text-align:left;font-family:"Courier New",Courier,monospace;font-weight:700;border:1.5px solid #000}
    .summary-table .total{background:#d0d0d0;font-weight:700;border:2px solid #000}
    .certification{margin:25px 0;padding:15px;border:2px dashed #000}
    .certification p{margin:8px 0;font-size:11px;line-height:1.5;font-family:Cairo,Arial,sans-serif}
    @media print{.no-print{display:none !important}body{margin:2mm}table{border:2px solid #000 !important;font-size:10px !important}th,td{border:1px solid #000 !important;padding:1px 2px !important;font-size:10px !important}thead th{font-size:10px !important}}
  </style></head><body>
    <div class="letterhead">
      <h1>${lbl.title}</h1>
    </div>
    <div class="print-meta">
      <div class="print-meta-item"><span class="lbl">${lbl.printDate}</span><span class="val">${printDate}</span></div>
      <div class="print-meta-item"><span class="lbl">${lbl.printTime}</span><span class="val">${printTime}</span></div>
    </div>
    <div class="ref-box">
      <div class="ref-item"><span class="lbl">${lbl.accountType}:</span><span>${entityType}</span></div>
      <div class="ref-item"><span class="lbl">${lbl.accountNo}:</span><span>${refId||'—'}</span></div>
      <div class="ref-item"><span class="lbl">${lbl.accountName}:</span><span>${entityName||'—'}</span></div>
      ${entityAddr?`<div class="ref-item"><span class="lbl">${lbl.address}:</span><span>${entityAddr}</span></div>`:''}
      ${entityTax?`<div class="ref-item"><span class="lbl">${lbl.taxNo}:</span><span>${entityTax}</span></div>`:''}
    </div>
    <table><thead>${headHtml}</thead><tbody>${bodyHtml}</tbody></table>
    <div class="summary">
      <div class="summary-title">${lbl.accountingSummary}</div>
      <table class="summary-table">
        ${(model==='cash'||model==='both'||model==='silver_cash'||model==='all')?`<tr><td class="header" colspan="2">${lbl.cashAccount}</td></tr>
        <tr><td class="label">${lbl.totalDebit}</td><td class="value">${fmt.format(cD)}</td></tr>
        <tr><td class="label">${lbl.totalCredit}</td><td class="value">${fmt.format(cC)}</td></tr>
        <tr class="total"><td class="label">${lbl.finalBalance}</td><td class="value">${fmt.format(cB)}</td></tr>`:''}
        ${(model==='gold'||model==='both'||model==='all')?`<tr><td class="header" colspan="2">${lbl.goldAccount} (${lbl.karat} ${basis})</td></tr>
        <tr><td class="label">${lbl.totalDebit}</td><td class="value">${fmt.format(gD)}</td></tr>
        <tr><td class="label">${lbl.totalCredit}</td><td class="value">${fmt.format(gC)}</td></tr>
        <tr class="total"><td class="label">${lbl.finalBalance}</td><td class="value">${fmt.format(gB)}</td></tr>`:''}
        ${(model==='silver'||model==='silver_cash'||model==='all')?`<tr><td class="header" colspan="2">${lbl.silverAccount} (${lbl.karat} ${silverBasis||999})</td></tr>
        <tr><td class="label">${lbl.totalDebit}</td><td class="value">${fmt.format(sD||0)}</td></tr>
        <tr><td class="label">${lbl.totalCredit}</td><td class="value">${fmt.format(sC||0)}</td></tr>
        <tr class="total"><td class="label">${lbl.finalBalance}</td><td class="value">${fmt.format(sB||0)}</td></tr>`:''}
      </table>
    </div>
    <div class="certification">
      <p>${(model==='cash'||model==='both'||model==='silver_cash'||model==='all')?`<strong>${lbl.cashInWords}:</strong> ${cashWords}`:''}</p>
      <p>${(model==='gold'||model==='both'||model==='all')?`<strong>${lbl.goldInWords}:</strong> ${goldWords}`:''}</p>
      <p>${(model==='silver'||model==='silver_cash'||model==='all')&&silverWords?`<strong>${lbl.silverInWords}:</strong> ${silverWords}`:''}</p>
    </div>
    ${buildPrintFooter(lbl.printDate, lbl.printTime, printDate, printTime)}
    <button class="print-button no-print" onclick="window.print()"><i>🖨️</i>${lbl.print}</button>
  </body></html>`;
}

// النموذج التفصيلي للذهب والفضة
function generateGoldDetailedTemplate(params){
  const {entityType, entityName, refId, entityAddr, allRows, table, company, model, wordsCash, wordsGold, wordsSilver, basis, silverBasis, t, lang} = params;
  const isRtl = (lang || 'ar') === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';
  const { date: printDate, time: printTime } = getPrintMetaInfo(lang);
  // Translation labels with fallbacks
  const lbl = {
    reviewCustomer: t?.reviewCustomer || 'كشف حساب مراجعة لعميل',
    reviewSupplier: t?.reviewSupplier || 'كشف حساب مراجعة لمورد',
    reviewAccount: t?.reviewAccount || 'كشف حساب مراجعة لحساب',
    fromDate: t?.fromDate || 'من تاريخ',
    toDate: t?.toDate || 'الى تاريخ',
    customerNo: t?.customerNo || 'رقم العميل',
    supplierNo: t?.supplierNo || 'رقم المورد',
    accountNo: t?.accountNo || 'رقم الحساب',
    customerName: t?.customerName || 'اسم العميل',
    supplierName: t?.supplierName || 'اسم المورد',
    accountName: t?.accountName || 'اسم الحساب',
    printDate: t?.printDate || 'تاريخ الطباعة',
    printTime: t?.printTime || 'وقت الطباعة',
    date: t?.date || 'التاريخ',
    reference: t?.reference || 'المرجعي',
    number: t?.number || 'رقم',
    docType: t?.docType || 'النوع',
    description: t?.description || 'البيان',
    cash: t?.cash || 'الريال',
    gold: t?.gold || 'الذهب',
    silver: t?.silver || 'الفضة',
    debit: t?.debit || 'مدين',
    credit: t?.credit || 'دائن',
    balance: t?.balance || 'الرصيد',
    total: t?.total || 'المجموع',
    totalBalance: t?.totalBalance || 'اجمالي الرصيد',
    inSAR: t?.inSAR || 'بالريال السعودي',
    goldTotal: t?.goldTotal || 'اجمالي الذهب عيار',
    silverTotal: t?.silverTotal || 'اجمالي الفضة عيار',
    balanceInWords: t?.balanceInWords || 'الرصيد بالكتابة',
    owes: t?.owes || 'عليكم',
    has: t?.has || 'لكم',
    print: t?.print || 'طباعة',
    customer: t?.customer || 'عميل',
    supplier: t?.supplier || 'مورد',
    account: t?.account || 'حساب'
  };
  // Determine entity type labels
  const isCustomer = entityType === 'عميل' || entityType === 'Customer';
  const isSupplier = entityType === 'مورد' || entityType === 'Supplier';
  const titleLabel = isCustomer ? lbl.reviewCustomer : isSupplier ? lbl.reviewSupplier : lbl.reviewAccount;
  const idLabel = isCustomer ? lbl.customerNo : isSupplier ? lbl.supplierNo : lbl.accountNo;
  const nameLabel = isCustomer ? lbl.customerName : isSupplier ? lbl.supplierName : lbl.accountName;
  
  // Extract date range from UI or default
  const fromDate = document.getElementById('p_stmt_from')?.value || document.getElementById('stmt_from')?.value || '01/01/2024';
  const toDate = document.getElementById('p_stmt_to')?.value || document.getElementById('stmt_to')?.value || '31/12/2024';
  
  // Build table rows with karat breakdown
  let tableRowsHTML = '';
  const goldKarats = ['24', '22', '21', '18'];
  const silverKarats = ['999', '925', '900', '800'];
  
  // العيار المحدد من الواجهة
  const selectedGoldKarat = basis || 21;
  const selectedSilverKarat = silverBasis || 999;
  
  // Totals by karat
  let totals = {
    // Gold karats
    '24': {debit: 0, credit: 0, balance: 0},
    '22': {debit: 0, credit: 0, balance: 0},
    '21': {debit: 0, credit: 0, balance: 0},
    '18': {debit: 0, credit: 0, balance: 0},
    // Silver karats
    '999': {debit: 0, credit: 0, balance: 0},
    '925': {debit: 0, credit: 0, balance: 0},
    '900': {debit: 0, credit: 0, balance: 0},
    '800': {debit: 0, credit: 0, balance: 0},
    cash: {debit: 0, credit: 0, balance: 0}
  };
  
  allRows.forEach(tr => {
    const tds = tr.querySelectorAll('td');
    if (!tds || tds.length < 3) return;
    
    const date = tds[0]?.textContent?.trim() || '';
    const docId = tds[1]?.textContent?.trim() || '';
    const docType = tds[2]?.textContent?.trim() || '';
    const memo = tds[tds.length-1]?.textContent?.trim() || '';
    
    // استخراج البيانات من الأعمدة
    // الأعمدة: 0=تاريخ, 1=رقم, 2=نوع, 3=مدين ريال, 4=دائن ريال, 5=رصيد ريال
    // 6=مدين ذهب, 7=دائن ذهب, 8=عيار ذهب, 9=رصيد ذهب
    // 10=مدين فضة, 11=دائن فضة, 12=عيار فضة, 13=رصيد فضة, 14=بيان
    
    let goldKarat = '';
    let silverKarat = '';
    let goldDebit = 0, goldCredit = 0;
    let silverDebit = 0, silverCredit = 0;
    let cashDebit = 0, cashCredit = 0;
    let cashBalance = 0;
    
    // استخراج البيانات بناءً على عدد الأعمدة
    if (tds.length >= 15) {
      // النموذج الكامل مع الفضة
      cashDebit = parseFloat(tds[3]?.textContent?.replace(/,/g,'') || 0);
      cashCredit = parseFloat(tds[4]?.textContent?.replace(/,/g,'') || 0);
      cashBalance = parseFloat(tds[5]?.textContent?.replace(/,/g,'') || 0);
      goldDebit = parseFloat(tds[6]?.textContent?.replace(/,/g,'') || 0);
      goldCredit = parseFloat(tds[7]?.textContent?.replace(/,/g,'') || 0);
      goldKarat = tds[8]?.textContent?.trim() || '';
      silverDebit = parseFloat(tds[10]?.textContent?.replace(/,/g,'') || 0);
      silverCredit = parseFloat(tds[11]?.textContent?.replace(/,/g,'') || 0);
      silverKarat = tds[12]?.textContent?.trim() || '';
    } else if (tds.length >= 11) {
      // النموذج بدون أعمدة فضة منفصلة
      cashDebit = parseFloat(tds[3]?.textContent?.replace(/,/g,'') || 0);
      cashCredit = parseFloat(tds[4]?.textContent?.replace(/,/g,'') || 0);
      cashBalance = parseFloat(tds[5]?.textContent?.replace(/,/g,'') || 0);
      goldDebit = parseFloat(tds[6]?.textContent?.replace(/,/g,'') || 0);
      goldCredit = parseFloat(tds[7]?.textContent?.replace(/,/g,'') || 0);
      const karat = tds[8]?.textContent?.trim() || '21';
      // تحديد إذا كان العيار فضة أو ذهب
      if (silverKarats.includes(karat)) {
        silverKarat = karat;
        silverDebit = goldDebit;
        silverCredit = goldCredit;
        goldDebit = 0;
        goldCredit = 0;
      } else {
        goldKarat = karat;
      }
    }
    
    // حساب القيم الفعلية للذهب
    let actualGoldDebit = 0, actualGoldCredit = 0;
    if (goldDebit > 0 && goldCredit === 0) {
      actualGoldDebit = Math.abs(goldDebit);
    } else if (goldCredit > 0 && goldDebit === 0) {
      actualGoldCredit = Math.abs(goldCredit);
    } else if (goldDebit > 0 && goldCredit > 0) {
      const net = goldDebit - goldCredit;
      if (net > 0) actualGoldDebit = Math.abs(net);
      else if (net < 0) actualGoldCredit = Math.abs(net);
    }
    
    // حساب القيم الفعلية للفضة
    let actualSilverDebit = 0, actualSilverCredit = 0;
    if (silverDebit > 0 && silverCredit === 0) {
      actualSilverDebit = Math.abs(silverDebit);
    } else if (silverCredit > 0 && silverDebit === 0) {
      actualSilverCredit = Math.abs(silverCredit);
    } else if (silverDebit > 0 && silverCredit > 0) {
      const net = silverDebit - silverCredit;
      if (net > 0) actualSilverDebit = Math.abs(net);
      else if (net < 0) actualSilverCredit = Math.abs(net);
    }
    
    // حساب القيم الفعلية للريال
    let actualCashDebit = 0, actualCashCredit = 0;
    if (cashDebit > 0 && cashCredit === 0) {
      actualCashDebit = Math.abs(cashDebit);
    } else if (cashCredit > 0 && cashDebit === 0) {
      actualCashCredit = Math.abs(cashCredit);
    } else if (cashDebit > 0 && cashCredit > 0) {
      const net = cashDebit - cashCredit;
      if (net > 0) actualCashDebit = Math.abs(net);
      else if (net < 0) actualCashCredit = Math.abs(net);
    }
    
    // تحديد إذا كان الصف ذهب أو فضة
    const hasGold = actualGoldDebit > 0 || actualGoldCredit > 0;
    const hasSilver = actualSilverDebit > 0 || actualSilverCredit > 0;
    
    // Build row HTML
    const goldKaratKey = goldKarats.includes(goldKarat) ? goldKarat : '21';
    const silverKaratKey = silverKarats.includes(silverKarat) ? silverKarat : '999';
    
    let rowCells = `<tr>
      <td style="font-size:10px;font-weight:700;padding:1px 1px;line-height:1.2">${date}</td>
      <td style="font-size:10px;font-weight:700;padding:1px 1px;line-height:1.2">${docId}</td>
      <td style="text-align:right;padding:1px 2px;font-size:10px;font-weight:700;line-height:1.2">${docType}</td>
      <td style="text-align:right;padding:1px 4px;font-size:10px;font-weight:700;width:120px;word-wrap:break-word;line-height:1.2">${memo}</td>`;
    
    // أعمدة الريال
    rowCells += `<td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2">${actualCashDebit > 0 ? actualCashDebit.toFixed(2) : ''}</td>
      <td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2">${actualCashCredit > 0 ? actualCashCredit.toFixed(2) : ''}</td>
      <td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2">${cashBalance.toFixed(2)}</td>`;
    
    // أعمدة الذهب
    rowCells += goldKarats.map(k => {
      if (hasGold && k === goldKaratKey) {
        return `<td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2">${actualGoldCredit > 0 ? actualGoldCredit.toFixed(2) : ''}</td><td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2">${actualGoldDebit > 0 ? actualGoldDebit.toFixed(2) : ''}</td>`;
      }
      return '<td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2"></td><td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2"></td>';
    }).join('');
    
    // أعمدة الفضة
    rowCells += silverKarats.map(k => {
      if (hasSilver && k === silverKaratKey) {
        return `<td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2">${actualSilverCredit > 0 ? actualSilverCredit.toFixed(2) : ''}</td><td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2">${actualSilverDebit > 0 ? actualSilverDebit.toFixed(2) : ''}</td>`;
      }
      return '<td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2"></td><td style="font-size:10px;font-weight:700;padding:1px 2px;line-height:1.2"></td>';
    }).join('');
    
    rowCells += `</tr>`;
    tableRowsHTML += rowCells;
    
    // Update totals
    if (hasGold && goldKarats.includes(goldKaratKey)) {
      totals[goldKaratKey].debit += actualGoldDebit;
      totals[goldKaratKey].credit += actualGoldCredit;
      totals[goldKaratKey].balance += (actualGoldDebit - actualGoldCredit);
    }
    if (hasSilver && silverKarats.includes(silverKaratKey)) {
      totals[silverKaratKey].debit += actualSilverDebit;
      totals[silverKaratKey].credit += actualSilverCredit;
      totals[silverKaratKey].balance += (actualSilverDebit - actualSilverCredit);
    }
    totals.cash.debit += actualCashDebit;
    totals.cash.credit += actualCashCredit;
    totals.cash.balance = cashBalance;
  });
  
  return `<!doctype html><html lang="${lang||'ar'}" dir="${dir}"><head><meta charset="utf-8"><title>${titleLabel}</title><style>
    *{margin:0;padding:0;box-sizing:border-box}  
    @page{margin:10mm}
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes buttonPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    @keyframes buttonClick {
      0% { transform: scale(1); }
      50% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    body{font-family:Arial,sans-serif;direction:rtl;margin:0;padding:15px 15px 32px 15px;background:#fff;animation: fadeIn 0.3s ease-out;}
    
    /* Print Button - Floating Style */
    .print-button {
      position: fixed;
      bottom: 30px;
      left: 30px;
      background: linear-gradient(135deg, #00897B 0%, #00695C 100%);
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 50px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,137,123,0.4);
      transition: all 0.3s;
      z-index: 1000;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    
    .print-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 30px rgba(0,137,123,0.5);
    }
    
    .print-button:active {
      transform: translateY(0);
    }
    
    .print-button i {
      font-style: normal;
    }
    
    /* Close Button */
    #closeBtn {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #ff4444, #cc0000);
      border: 1px solid #cc0000;
      box-shadow: 0 2px 4px rgba(204, 0, 0, 0.2);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 10px 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 100px;
      color: white;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
    }
    
    #closeBtn:hover {
      background: linear-gradient(135deg, #ff1a1a, #b30000);
      box-shadow: 0 6px 12px rgba(204, 0, 0, 0.3);
      transform: translateY(-2px) scale(1.02);
    }
    
    #closeBtn:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 2px 4px rgba(204, 0, 0, 0.2);
    }
    
    #closeBtn:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba(255, 0, 0, 0.3);
    }
    
    /* Ripple Effect */
    .btn-ripple {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.7);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      #closeBtn {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      }
      
      #closeBtn:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
      }
    }
    
    #closeBtn:active {
      transform: translateY(1px);
      box-shadow: 0 2px 3px rgba(204, 0, 0, 0.2);
    }
    
    /* Ripple Effect */
    .btn-ripple {
      position:absolute;
      border-radius:50%;
      background-color:rgba(255,255,255,0.3);
      transform:scale(0);
      animation:ripple 0.6s linear;
      pointer-events:none;
    }
    
    @keyframes ripple {
      to {
        transform:scale(2.5);
        opacity:0;
      }
    }
    
    /* Focus Ring */
    .btn:focus-visible {
      outline:2px solid rgba(52, 152, 219, 0.6);
      outline-offset:2px;
    }
    
    /* Button Icons */
    .btn i {
      margin-left:8px;
      font-size:16px;
    }
    
    /* Responsive Adjustments */
    @media (max-width: 768px) {
      header {
        flex-direction:column;
        padding:12px;
        gap:12px;
      }
      
      .header-buttons {
        width:100%;
      }
      
      .btn {
        flex:1;
        padding:10px 12px;
        font-size:13px;
      }
    }
    .doc-header{
      background:linear-gradient(135deg, #f8f9fa, #e9ecef);
      text-align:center;
      font-size:15px;
      padding:14px 8px;
      margin-top:10px;
      margin-bottom:20px;
      border-radius:8px;
      box-shadow:0 2px 8px rgba(0,0,0,0.1);
      border-left:4px solid #3498db;
      animation:fadeIn 0.5s ease-out;
    }
    .date-range{background:#c8d5ea;padding:7px 10px;display:flex;justify-content:space-between;border:2px solid #0066aa;border-bottom:3px solid #0066aa;font-weight:600}
    .info-section{padding:7px 10px;background:#c8d5ea;display:flex;justify-content:space-between;border:2px solid #0066aa;border-top:none}
    .info-section div{font-size:11px;font-weight:600}
    .print-meta{display:none}
    table{width:100%;border-collapse:collapse;border:2px solid #000;font-size:9px;margin-top:5px}
    th,td{border:1px solid #000;padding:1px 1px;text-align:center;vertical-align:middle;line-height:1.15;font-weight:700}
    thead th{font-weight:800;font-size:9px;padding:1px 1px;background:#e8f0f8;border:1px solid #000;line-height:1.15}
    .karat-group{background:#e8f0f8;font-weight:700;border:1px solid #000}
    tbody td{font-size:9px;font-weight:700;border:1px solid #000;line-height:1.15}
    tbody tr:nth-child(even){background:#f9f9f9}
    tfoot td{background:#c8d5ea;font-weight:700;font-size:9px;border:1.5px solid #000;padding:1px 1px;line-height:1}
    .page-footer{display:none}
    .print-footer{position:fixed;left:0;right:0;bottom:4mm;text-align:center;font-size:9px;font-weight:600;color:#64748b;background:rgba(255,255,255,0.96);padding:4px 12px 0;border-top:1px solid rgba(148,163,184,0.35)}
    .print-footer .separator{margin:0 8px;color:#94a3b8}
    @media print {
      .no-print{display:none !important}
      header { 
        display:none !important; 
      }
      body { 
        margin: 2mm;
        background:#fff;
        padding:0 0 16mm 0;
      }
      .doc-header {
        margin-top: 0 !important;
        margin-bottom: 10px !important;
        box-shadow: none !important;
        border: 2px solid #0066aa !important;
        page-break-inside: avoid;
        page-break-before: avoid;
      }
      table{
        border:3px solid #000 !important;
        page-break-inside:auto;
        margin-top: 5px !important;
      }
      th,td{
        border:1px solid #000 !important;
      }
      tr{
        page-break-inside:avoid;
        page-break-after:auto;
      }
      tfoot{
        page-break-inside:avoid;
      }
    }
  </style></head><body>
    
    <div class="doc-header">
      <h1>${titleLabel}</h1>
      <div class="date-range">
        <span>${lbl.fromDate} : ${fromDate}</span>
        <span>${lbl.toDate} : ${toDate}</span>
      </div>
      <div class="info-section">
        <div>${idLabel} : ${refId}</div>
        <div>${nameLabel} : ${entityName || '—'}</div>
      </div>
      <div class="print-meta">
        <div class="print-meta-item"><span class="lbl">${lbl.printDate}</span><span class="val">${printDate}</span></div>
        <div class="print-meta-item"><span class="lbl">${lbl.printTime}</span><span class="val">${printTime}</span></div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th rowspan="3" style="width:35px">${lbl.date}</th>
          <th rowspan="3" style="width:20px">${lbl.number}</th>
          <th rowspan="3" style="width:40px">${lbl.docType}</th>
          <th rowspan="3" style="width:100px">${lbl.description}</th>
          <th colspan="3" style="background:#e8f0f8">${lbl.cash}</th>
          <th colspan="8" class="karat-group" style="background:#fff8e1">${lbl.gold}</th>
          <th colspan="8" class="karat-group" style="background:#f3e5f5">${lbl.silver}</th>
        </tr>
        <tr>
          <th rowspan="2" style="width:45px">${lbl.debit}</th>
          <th rowspan="2" style="width:45px">${lbl.credit}</th>
          <th rowspan="2" style="width:50px">${lbl.balance}</th>
          <th colspan="2" style="background:#fff3cd">24</th>
          <th colspan="2" style="background:#ffe0b2">22</th>
          <th colspan="2" style="background:#ffccbc">21</th>
          <th colspan="2" style="background:#e1bee7">18</th>
          <th colspan="2" style="background:#e1bee7">999</th>
          <th colspan="2" style="background:#ce93d8">925</th>
          <th colspan="2" style="background:#ba68c8">900</th>
          <th colspan="2" style="background:#ab47bc">800</th>
        </tr>
        <tr>
          ${goldKarats.map(k => `<th style="width:30px">${lbl.credit}</th><th style="width:30px">${lbl.debit}</th>`).join('')}
          ${silverKarats.map(k => `<th style="width:30px">${lbl.credit}</th><th style="width:30px">${lbl.debit}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${tableRowsHTML}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" style="text-align:center;font-weight:700">${lbl.total}</td>
          <td>${totals.cash.debit.toFixed(2)}</td>
          <td>${totals.cash.credit.toFixed(2)}</td>
          <td>${totals.cash.balance.toFixed(2)}</td>
          ${goldKarats.map(k => `<td>${(totals[k]?.credit||0).toFixed(2)}</td><td>${(totals[k]?.debit||0).toFixed(2)}</td>`).join('')}
          ${silverKarats.map(k => `<td>${(totals[k]?.credit||0).toFixed(2)}</td><td>${(totals[k]?.debit||0).toFixed(2)}</td>`).join('')}
        </tr>
        <tr>
          <td colspan="4" style="text-align:center;font-weight:700">${lbl.balance}</td>
          <td colspan="3" style="text-align:center;font-weight:700">${totals.cash.balance.toFixed(2)}</td>
          ${goldKarats.map(k => {
            const bal = totals[k]?.balance || 0;
            return `<td colspan="2" style="text-align:center;font-weight:700">${bal.toFixed(2)}</td>`;
          }).join('')}
          ${silverKarats.map(k => {
            const bal = totals[k]?.balance || 0;
            return `<td colspan="2" style="text-align:center;font-weight:700">${bal.toFixed(2)}</td>`;
          }).join('')}
        </tr>
      </tfoot>
    </table>
    <div style="display:flex;justify-content:flex-end;align-items:center;margin-top:20px;gap:15px;direction:${dir};padding:0 20px;flex-wrap:wrap">
      <div style="flex:0 0 auto;font-weight:700;font-size:14px;padding:10px 0">${lbl.totalBalance}</div>
      <div style="flex:0 0 auto;border:2px solid #000;border-radius:25px;padding:12px 30px;text-align:center;background:#fff;min-width:150px">
        <div style="font-size:15px;font-weight:700">${totals.cash.balance.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
        <div style="font-size:10px;color:#666;margin-top:2px">${lbl.inSAR}</div>
      </div>
      ${(() => {
        // Calculate total gold balance converted to selected karat
        let totalGoldConverted = 0;
        const targetKarat = selectedGoldKarat || 21;
        const conversionRates = {'24': 24/targetKarat, '22': 22/targetKarat, '21': 21/targetKarat, '18': 18/targetKarat};
        goldKarats.forEach(k => {
          const bal = totals[k]?.balance || 0;
          totalGoldConverted += bal * (conversionRates[k] || 1);
        });
        return `<div style="flex:0 0 auto;border:2px solid #000;border-radius:25px;padding:12px 30px;text-align:center;background:#fff;min-width:150px">
          <div style="font-size:15px;font-weight:700">${Math.abs(totalGoldConverted).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
          <div style="font-size:10px;color:#666;margin-top:2px">${lbl.goldTotal} ${targetKarat}</div>
        </div>`;
      })()}
      ${(() => {
        // Calculate total silver balance converted to selected karat
        let totalSilverConverted = 0;
        const targetKarat = selectedSilverKarat || 999;
        const conversionRates = {'999': 999/targetKarat, '925': 925/targetKarat, '900': 900/targetKarat, '800': 800/targetKarat};
        silverKarats.forEach(k => {
          const bal = totals[k]?.balance || 0;
          totalSilverConverted += bal * (conversionRates[k] || 1);
        });
        return `<div style="flex:0 0 auto;border:2px solid #000;border-radius:25px;padding:12px 30px;text-align:center;background:#fff;min-width:150px">
          <div style="font-size:15px;font-weight:700">${Math.abs(totalSilverConverted).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
          <div style="font-size:10px;color:#666;margin-top:2px">${lbl.silverTotal} ${targetKarat}</div>
        </div>`;
      })()}
    </div>
    
    <!-- الرصيد بالكتابة -->
    <div style="margin:25px 20px 20px 20px;padding:20px;background:linear-gradient(135deg,#fff3cd,#fff8dc);border:2px solid #ffc107;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1)">
      <div style="text-align:center;font-size:17px;font-weight:700;color:#f57c00;margin-bottom:18px;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #ffc107;padding-bottom:10px">
        📝 ${lbl.balanceInWords}
      </div>
      ${totals.cash.balance !== 0 ? `
      <div style="margin:12px 0;padding:14px;background:#fff;border-radius:8px;border-right:4px solid #2196f3;box-shadow:0 2px 6px rgba(0,0,0,0.08)">
        <div style="font-size:14px;line-height:1.8;color:#333">
          <strong style="color:#2196f3;font-size:15px">${lbl.cash} —</strong> 
          <span style="font-weight:600">${totals.cash.balance > 0 ? lbl.owes : totals.cash.balance < 0 ? lbl.has : ''}</span>
          ${(() => {
            const amt = Math.abs(totals.cash.balance);
            return wordsCash ? wordsCash(amt) : `${Math.floor(amt)} ريال`;
          })()}
        </div>
      </div>` : ''}
      ${(() => {
        // Calculate total gold balance converted to selected karat
        let totalGoldConverted = 0;
        const targetKarat = selectedGoldKarat || 21;
        const conversionRates = {'24': 24/targetKarat, '22': 22/targetKarat, '21': 21/targetKarat, '18': 18/targetKarat};
        goldKarats.forEach(k => {
          const bal = totals[k]?.balance || 0;
          totalGoldConverted += bal * (conversionRates[k] || 1);
        });
        if (totalGoldConverted === 0) return '';
        const goldAbs = Math.abs(totalGoldConverted);
        return `<div style="margin:12px 0;padding:14px;background:#fff;border-radius:8px;border-right:4px solid #4caf50;box-shadow:0 2px 6px rgba(0,0,0,0.08)">
          <div style="font-size:14px;line-height:1.8;color:#333">
            <strong style="color:#4caf50;font-size:15px">${lbl.gold} —</strong> 
            <span style="font-weight:600">${totalGoldConverted > 0 ? lbl.owes : lbl.has}</span>
            ${wordsGold ? wordsGold(goldAbs) : `${goldAbs.toFixed(2)} جرام`} / عيار ${targetKarat}
          </div>
        </div>`;
      })()}
      ${(() => {
        // Calculate total silver balance converted to selected karat
        let totalSilverConverted = 0;
        const targetKarat = selectedSilverKarat || 999;
        const conversionRates = {'999': 999/targetKarat, '925': 925/targetKarat, '900': 900/targetKarat, '800': 800/targetKarat};
        silverKarats.forEach(k => {
          const bal = totals[k]?.balance || 0;
          totalSilverConverted += bal * (conversionRates[k] || 1);
        });
        if (totalSilverConverted === 0) return '';
        const silverAbs = Math.abs(totalSilverConverted);
        return `<div style="margin:12px 0;padding:14px;background:#fff;border-radius:8px;border-right:4px solid #9c27b0;box-shadow:0 2px 6px rgba(0,0,0,0.08)">
          <div style="font-size:14px;line-height:1.8;color:#333">
            <strong style="color:#9c27b0;font-size:15px">${lbl.silver} —</strong> 
            <span style="font-weight:600">${totalSilverConverted > 0 ? lbl.owes : lbl.has}</span>
            ${wordsSilver ? wordsSilver(silverAbs) : `${silverAbs.toFixed(2)} جرام`} / عيار ${targetKarat}
          </div>
        </div>`;
      })()}
    </div>
    ${buildPrintFooter(lbl.printDate, lbl.printTime, printDate, printTime)}
    
    <!-- Print Button -->
    <button class="print-button no-print" onclick="window.print()">
      <i>🖨️</i>
      ${lbl.print}
    </button>
    
    <style>
      @media print {
        .no-print {
          display: none !important;
        }
      }
    </style>
  </body></html>`;
}
