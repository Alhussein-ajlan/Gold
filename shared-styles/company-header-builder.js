/**
 * Company Header Builder
 * بناء رأس معلومات الشركة الكامل لنماذج الطباعة
 */

function buildFullCompanyHeader(company, options = {}) {
  const showDateTime = options.showDateTime !== false; // default true
  const logoUrl = (company && company.logoData) 
    ? company.logoData 
    : (company && company.logo ? ('file:///' + String(company.logo).replace(/\\/g,'/')) : '');
  
  const name = company?.name || '';
  const nameEn = company?.name_en || company?.name || '';
  const tax = company?.tax || '';
  const phone = company?.phone || '';
  const email = company?.email || '';
  const website = company?.website || '';
  const address = company?.address || '';
  const addressEn = company?.address_en || company?.address || '';
  
  // Date and time if needed
  let dateTimeAr = '';
  let dateTimeEn = '';
  if (showDateTime) {
    const now = new Date();
    dateTimeAr = now.toLocaleString('ar-EG', { hour12: false });
    dateTimeEn = now.toLocaleString('en-GB', { hour12: false });
  }
  
  return `
    <section class="company-header" style="display:flex;gap:16px;align-items:stretch;margin-bottom:24px;padding:16px;background:linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);border:3px solid #10b981;border-radius:12px;box-shadow:0 4px 12px rgba(16,185,129,0.15)">
      <!-- العمود العربي -->
      <div class="comp-col-ar" style="flex:1;border:2px solid #10b981;padding:14px;background:#fff;border-radius:8px;direction:rtl;text-align:right">
        <div class="line" style="margin:6px 0;font-size:15px;font-weight:600;color:#1e293b;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-building" style="color:#10b981;font-size:14px"></i>
          <strong style="color:#10b981;min-width:90px">اسم الشركة:</strong> 
          <span>${name}</span>
        </div>
        <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-receipt" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:90px">الرقم الضريبي:</strong> 
          <span>${tax}</span>
        </div>
        <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-phone" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:90px">الهاتف:</strong> 
          <span>${phone}</span>
        </div>
        ${email ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-envelope" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:90px">البريد:</strong> 
          <span>${email}</span>
        </div>` : ''}
        ${website ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-globe" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:90px">الموقع:</strong> 
          <span>${website}</span>
        </div>` : ''}
        <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-location-dot" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:90px">العنوان:</strong> 
          <span>${address}</span>
        </div>
        ${showDateTime ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-clock" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:90px">التاريخ والوقت:</strong> 
          <span>${dateTimeAr}</span>
        </div>` : ''}
      </div>
      
      <!-- الشعار -->
      <div class="comp-logo" style="width:130px;height:130px;border:3px solid #10b981;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#fff;flex-shrink:0;box-shadow:0 4px 8px rgba(16,185,129,0.2)">
        ${logoUrl ? `<img src="${logoUrl}" alt="logo" style="width:100%;height:100%;object-fit:contain">` : '<div class="logo-fallback" style="width:100%;height:100%;background:linear-gradient(135deg, #f0f0f0, #e5e5e5);display:flex;align-items:center;justify-content:center;color:#999;font-size:14px">الشعار</div>'}
      </div>
      
      <!-- العمود الإنجليزي -->
      <div class="comp-col-en" style="flex:1;direction:ltr;text-align:left;border:2px solid #10b981;padding:14px;background:#fff;border-radius:8px">
        <div class="line" style="margin:6px 0;font-size:15px;font-weight:600;color:#1e293b;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-building" style="color:#10b981;font-size:14px"></i>
          <strong style="color:#10b981;min-width:120px">Company Name:</strong> 
          <span>${nameEn}</span>
        </div>
        <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-receipt" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:120px">Tax Number:</strong> 
          <span>${tax}</span>
        </div>
        <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-phone" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:120px">Phone:</strong> 
          <span>${phone}</span>
        </div>
        ${email ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-envelope" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:120px">Email:</strong> 
          <span>${email}</span>
        </div>` : ''}
        ${website ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-globe" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:120px">Website:</strong> 
          <span>${website}</span>
        </div>` : ''}
        <div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-location-dot" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:120px">Address:</strong> 
          <span>${addressEn}</span>
        </div>
        ${showDateTime ? `<div class="line" style="margin:6px 0;font-size:14px;color:#475569;display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-clock" style="color:#10b981;font-size:13px"></i>
          <strong style="color:#10b981;min-width:120px">Date & Time:</strong> 
          <span>${dateTimeEn}</span>
        </div>` : ''}
      </div>
    </section>
  `;
}

// نسخة مضغوطة لنماذج القوائم (بدون أيقونات وأصغر)
function buildCompactCompanyHeader(company) {
  const logoUrl = (company && company.logoData) 
    ? company.logoData 
    : (company && company.logo ? ('file:///' + String(company.logo).replace(/\\/g,'/')) : '');
  
  const name = company?.name || '';
  const nameEn = company?.name_en || company?.name || '';
  const tax = company?.tax || '';
  const phone = company?.phone || '';
  const email = company?.email || '';
  const website = company?.website || '';
  
  // بناء سطر واحد بكل المعلومات
  const infosAr = [
    tax ? `الرقم الضريبي: ${tax}` : '',
    phone ? `هاتف: ${phone}` : '',
    email ? `بريد: ${email}` : '',
    website ? `موقع: ${website}` : ''
  ].filter(Boolean).join(' • ');
  
  const infosEn = [
    tax ? `Tax: ${tax}` : '',
    phone ? `Tel: ${phone}` : '',
    email ? `Email: ${email}` : '',
    website ? `Web: ${website}` : ''
  ].filter(Boolean).join(' • ');
  
  return `
    <section class="company-header-compact" style="display:flex;gap:12px;align-items:center;margin-bottom:16px;padding:12px;background:linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);border:2px solid #10b981;border-radius:8px">
      <div class="comp-col-ar" style="flex:1;direction:rtl;text-align:right;padding:8px">
        <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:4px">${name}</div>
        <div style="font-size:12px;color:#64748b">${infosAr}</div>
      </div>
      
      <div class="comp-logo" style="width:80px;height:80px;border:2px solid #10b981;border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#fff;flex-shrink:0">
        ${logoUrl ? `<img src="${logoUrl}" alt="logo" style="width:100%;height:100%;object-fit:contain">` : '<div style="width:100%;height:100%;background:#f0f0f0"></div>'}
      </div>
      
      <div class="comp-col-en" style="flex:1;direction:ltr;text-align:left;padding:8px">
        <div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:4px">${nameEn}</div>
        <div style="font-size:12px;color:#64748b">${infosEn}</div>
      </div>
    </section>
  `;
}

// للاستخدام في النوافذ
if (typeof window !== 'undefined') {
  window.buildFullCompanyHeader = buildFullCompanyHeader;
  window.buildCompactCompanyHeader = buildCompactCompanyHeader;
}

// للاستخدام في Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buildFullCompanyHeader,
    buildCompactCompanyHeader
  };
}
