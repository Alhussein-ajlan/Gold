/**
 * License Manager - نظام إدارة التراخيص
 * يدير التحقق من الترخيص وتفعيله
 */

const crypto = require('crypto');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// المفتاح السري للتشفير - مهم جداً: لا تشاركه مع أحد!
const SECRET_KEY = 'BenAjlan_Gold_2025_SecretKey_@#$%';

function getMachineIdCachePath(dataPath) {
  if (!dataPath || typeof dataPath !== 'string') return null;
  return path.join(dataPath, 'machine-id.json');
}

function readCachedMachineId(dataPath) {
  try {
    const cachePath = getMachineIdCachePath(dataPath);
    if (!cachePath || !fs.existsSync(cachePath)) {
      return null;
    }
    const raw = fs.readFileSync(cachePath, 'utf8');
    const parsed = JSON.parse(raw || '{}');
    const machineId = String(parsed?.machineId || '').trim().toUpperCase();
    return machineId || null;
  } catch (_) {
    return null;
  }
}

function writeCachedMachineId(dataPath, machineId) {
  try {
    const cachePath = getMachineIdCachePath(dataPath);
    if (!cachePath || !machineId) {
      return;
    }
    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, JSON.stringify({ machineId, savedAt: new Date().toISOString() }), 'utf8');
  } catch (_) {}
}

// أنواع التراخيص
const LICENSE_TYPES = {
  MONTHLY: { code: 'M', days: 30, name: 'شهري' },
  QUARTERLY: { code: 'Q', days: 90, name: 'ربع سنوي' },
  SEMI_ANNUAL: { code: 'S', days: 180, name: 'نصف سنوي' },
  YEARLY: { code: 'Y', days: 365, name: 'سنوي' },
  LIFETIME: { code: 'L', days: 36500, name: 'دائم' } // 100 سنة
};

const DAY_MS = 1000 * 60 * 60 * 24;

function formatDateOnlyLocal(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateOnlyLocal(value) {
  const text = String(value || '').trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  parsed.setHours(0, 0, 0, 0);
  return parsed;
}

function getDateOnlyStamp(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return NaN;
  }
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function getTodayDateOnlyLocal() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function buildLicenseWarning(daysRemaining) {
  const remaining = Number(daysRemaining);
  if (!Number.isFinite(remaining) || remaining > 7) {
    return null;
  }
  if (remaining <= 0) {
    return 'ينتهي الترخيص اليوم';
  }
  return `ينتهي الترخيص بعد ${remaining} يوم`;
}

/**
 * الحصول على معرف الجهاز الفريد
 */
function getMachineId(dataPath = null) {
  try {
    const cachedMachineId = readCachedMachineId(dataPath);
    if (cachedMachineId) {
      return cachedMachineId;
    }

    let machineInfo = '';
    
    // اسم الكمبيوتر
    machineInfo += os.hostname();
    
    // معرف المستخدم
    machineInfo += os.userInfo().username;
    
    // محاولة الحصول على معرف القرص الصلب (Windows)
    try {
      const diskSerial = execSync('wmic diskdrive get serialnumber', { encoding: 'utf8' });
      machineInfo += diskSerial.replace(/\s/g, '').substring(0, 20);
    } catch (e) {
      // في حالة الفشل، استخدم معلومات أخرى
      machineInfo += os.cpus()[0]?.model || 'CPU';
    }
    
    // إنشاء hash من المعلومات
    const hash = crypto.createHash('md5')
      .update(machineInfo + SECRET_KEY)
      .digest('hex')
      .substring(0, 8)
      .toUpperCase();

    writeCachedMachineId(dataPath, hash);
    
    return hash;
  } catch (error) {
    const fallbackMachineId = readCachedMachineId(dataPath);
    return fallbackMachineId || 'UNKNOWN1';
  }
}

/**
 * توليد رمز التفعيل (تُستخدم في أداة التوليد)
 */
function generateLicenseCode(machineId, licenseType, startDate = new Date()) {
  const typeInfo = LICENSE_TYPES[licenseType];
  if (!typeInfo) {
    throw new Error('نوع ترخيص غير صالح');
  }
  
  // حساب تاريخ الانتهاء
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + typeInfo.days);
  
  // البيانات للتشفير
  const data = {
    m: machineId,                              // معرف الجهاز
    t: typeInfo.code,                          // نوع الترخيص
    s: formatDateOnlyLocal(startDate),         // تاريخ البدء
    e: formatDateOnlyLocal(endDate)            // تاريخ الانتهاء
  };
  
  // إنشاء التوقيع
  const dataString = JSON.stringify(data);
  const signature = crypto.createHmac('sha256', SECRET_KEY)
    .update(dataString)
    .digest('hex')
    .substring(0, 8)
    .toUpperCase();
  
  // تشفير البيانات
  const encoded = Buffer.from(dataString).toString('base64');
  
  // تقسيم الرمز إلى أجزاء
  const code = signature + encoded;
  const formattedCode = formatLicenseCode(code);
  
  return {
    code: formattedCode,
    machineId,
    licenseType: typeInfo.name,
    startDate: data.s,
    endDate: data.e,
    daysValid: typeInfo.days
  };
}

/**
 * تنسيق رمز الترخيص
 */
function formatLicenseCode(code) {
  // تقسيم الرمز إلى مجموعات من 4 أحرف (بدون قطع)
  const parts = [];
  for (let i = 0; i < code.length; i += 4) {
    parts.push(code.substring(i, i + 4));
  }
  return parts.join('-');
}

/**
 * إزالة التنسيق من رمز الترخيص
 */
function unformatLicenseCode(formattedCode) {
  return formattedCode.replace(/-/g, '');
}

/**
 * التحقق من صحة رمز الترخيص
 */
function verifyLicenseCode(formattedCode, machineId) {
  try {
    const code = unformatLicenseCode(formattedCode);
    
    // استخراج التوقيع والبيانات
    const signature = code.substring(0, 8);
    const encoded = code.substring(8);
    
    // فك التشفير
    const dataString = Buffer.from(encoded, 'base64').toString('utf8');
    const data = JSON.parse(dataString);
    
    // التحقق من التوقيع
    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY)
      .update(dataString)
      .digest('hex')
      .substring(0, 8)
      .toUpperCase();
    
    if (signature !== expectedSignature) {
      return { valid: false, error: 'رمز التفعيل غير صالح' };
    }
    
    // التحقق من معرف الجهاز
    if (data.m !== machineId) {
      return { valid: false, error: 'رمز التفعيل غير مطابق لهذا الجهاز' };
    }
    
    // التحقق من تاريخ الانتهاء
    const endDate = parseDateOnlyLocal(data.e);
    const today = getTodayDateOnlyLocal();
    const endDateStamp = getDateOnlyStamp(endDate);
    const todayStamp = getDateOnlyStamp(today);
    
    if (!Number.isFinite(endDateStamp) || !Number.isFinite(todayStamp)) {
      return { valid: false, error: 'رمز التفعيل غير صالح' };
    }
    
    if (todayStamp > endDateStamp) {
      return { valid: false, error: 'انتهت صلاحية الترخيص', expired: true };
    }
    
    // حساب الأيام المتبقية
    const daysRemaining = Math.max(0, Math.round((endDateStamp - todayStamp) / DAY_MS));
    
    // الحصول على اسم نوع الترخيص
    let typeName = 'غير معروف';
    for (const [key, value] of Object.entries(LICENSE_TYPES)) {
      if (value.code === data.t) {
        typeName = value.name;
        break;
      }
    }
    
    return {
      valid: true,
      machineId: data.m,
      licenseType: typeName,
      startDate: data.s,
      endDate: data.e,
      daysRemaining,
      warning: buildLicenseWarning(daysRemaining)
    };
  } catch (error) {
    return { valid: false, error: 'رمز التفعيل غير صالح' };
  }
}

/**
 * حفظ بيانات الترخيص
 */
function saveLicense(licenseCode, dataPath) {
  try {
    // التأكد من وجود المجلد وإنشائه إذا لم يكن موجوداً
    if (!fs.existsSync(dataPath)) {
      fs.mkdirSync(dataPath, { recursive: true });
    }
    
    const licensePath = path.join(dataPath, 'license.dat');
    const data = {
      code: licenseCode,
      activatedAt: new Date().toISOString()
    };
    
    // تشفير بسيط للملف
    const encrypted = Buffer.from(JSON.stringify(data)).toString('base64');
    fs.writeFileSync(licensePath, encrypted);
    
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * قراءة بيانات الترخيص المحفوظة
 */
function loadLicense(dataPath) {
  try {
    const licensePath = path.join(dataPath, 'license.dat');
    
    if (!fs.existsSync(licensePath)) {
      return null;
    }
    
    const encrypted = fs.readFileSync(licensePath, 'utf8');
    const data = JSON.parse(Buffer.from(encrypted, 'base64').toString('utf8'));
    
    return data.code;
  } catch (error) {
    return null;
  }
}

/**
 * التحقق من حالة الترخيص الكاملة
 */
function checkLicenseStatus(dataPath) {
  const machineId = getMachineId(dataPath);
  const savedCode = loadLicense(dataPath);
  
  if (!savedCode) {
    return {
      licensed: false,
      valid: false,
      machineId,
      message: 'البرنامج غير مفعل'
    };
  }
  
  const verification = verifyLicenseCode(savedCode, machineId);
  
  if (!verification.valid) {
    return {
      licensed: false,
      valid: false,
      machineId,
      message: verification.error,
      expired: verification.expired || false
    };
  }
  
  return {
    licensed: true,
    valid: true,
    machineId,
    licenseType: verification.licenseType,
    startDate: verification.startDate,
    endDate: verification.endDate,
    daysRemaining: verification.daysRemaining,
    warning: verification.warning
  };
}

module.exports = {
  getMachineId,
  generateLicenseCode,
  verifyLicenseCode,
  saveLicense,
  loadLicense,
  checkLicenseStatus,
  LICENSE_TYPES
};
