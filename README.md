# المحاسب الذكي BenAjlan - دليل التثبيت والتشغيل

## 🚀 البدء السريع

### الطريقة الأولى (موصى بها):
```bash
install-clean.bat
```

### الطريقة الثانية (يدوياً):
```bash
npm install
npm run rebuild
npm start
```

---

## ⚠️ مهم جداً

بعد كل `npm install`، يجب تشغيل:
```bash
npm run rebuild
```
أو استخدام:
```bash
rebuild-native.bat
```

**السبب:** `better-sqlite3` يحتاج إعادة بناء لـ Electron بعد التثبيت.

---

## 📋 الأوامر المتاحة

```bash
npm start              # تشغيل التطبيق
npm run rebuild        # إعادة بناء better-sqlite3
npm run build          # بناء installer كامل
npm run build:dir      # بناء سريع بدون installer
```

---

## 🔧 حل المشاكل

### المشكلة: شاشة Electron الافتراضية تظهر
**الحل:**
```bash
npm run rebuild
```
أو:
```bash
rebuild-native.bat
```

### المشكلة: خطأ في better-sqlite3
**الحل:**
```bash
npm run rebuild
```

### المشكلة: خطأ "deps is not iterable"
**الحل:**
```bash
del package-lock.json
npm install
npm run rebuild
```

---

## 📁 الملفات المهمة

- `install-clean.bat` - تثبيت نظيف كامل
- `rebuild-native.bat` - إعادة بناء better-sqlite3
- `main.js` - العملية الرئيسية
- `package.json` - إعدادات المشروع

---

## 🗄️ قاعدة البيانات

- **الموقع:** `database/database.db`
- **النسخ الاحتياطية:** `database/backup-databases/`
- **النسخ الاحتياطي التلقائي:** كل 6 ساعات
- **الاحتفاظ بـ:** آخر 30 نسخة

---

## 🏗️ البناء للتوزيع

```bash
npm run build
```

**الملف الناتج:** `D:\gold\GoldNew\BenAjlan-Setup-3.2.3.exe`

---

## 📦 المتطلبات

- Windows 10 أو أحدث
- Node.js v20.18.1
- Python 3.11+ (لبناء mt5_bridge)

---

## 🔑 المكتبات الأساسية

- **Electron** v38.5.0
- **better-sqlite3** v12.4.1
- **jspdf** v3.0.3
- **xlsx** v0.18.5

---

## 📝 ملاحظات

1. `better-sqlite3` مبني خصيصاً لـ Electron (لا يعمل مع node.exe العادي)
2. عند تحديث Electron، قم بتشغيل `npm run rebuild`
3. WAL mode مفعل للأداء والأمان
4. Foreign keys مفعلة

---

**الإصدار:** 3.2.3  
**آخر تحديث:** 2026-02-25
