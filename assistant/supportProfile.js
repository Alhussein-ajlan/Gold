const supportProfile = {
  developerName: 'م. الحسين بن عجلان',
  developerRole: 'مبرمج نظم محاسبية ومطور حلول Gold الذكية',
  summary: 'مطور النظام والحلول التقنية المعتمدة داخل المنصة، بخبرة عملية في بناء الأنظمة المحاسبية وتطوير واجهات الاستخدام ودعم التشغيل المستمر.',
  profile: [
    'تم تطويري على يد المهندس الحسين بن عجلان، صاحب خبرة في البرمجة والتحول الرقمي للأنظمة المحاسبية.',
    'من اليمن، محافظة المحويت، خريج جامعة الحديدة – دفعة روّاد البرمجة 2014.',
    'حصل على المركز الثالث على دفعته بمعدل 90.5 وتقدير امتياز.',
    'أعمل بروح التحسين المستمر لتقديم تجربة أكثر دقة وسرعة واحترافية.'
  ],
  socialPrompt: 'هل تريد أن أظهر لك صفحات التواصل الاجتماعي الخاصة به؟',
  socialPromptButton: 'عرض صفحات التواصل',
  socialPromptMessage: 'أظهر صفحات التواصل الاجتماعي الخاصة بالمطور',
  contacts: [
    {
      kind: 'whatsapp',
      label: 'واتساب السعودية',
      value: '+966 575 813 910',
      url: 'https://wa.me/966575813910',
      note: 'يفتح محادثة واتساب مباشرة',
    },
    {
      kind: 'telegram',
      label: 'تيليجرام السعودية',
      value: '+966 575 813 910',
      url: 'https://t.me/+966575813910',
      note: 'يفتح تيليجرام في المتصفح أو التطبيق',
    },
    {
      kind: 'whatsapp',
      label: 'واتساب اليمن',
      value: '+967 771 889 030',
      url: 'https://wa.me/967771889030',
      note: 'يفتح محادثة واتساب مباشرة',
    },
    {
      kind: 'telegram',
      label: 'تيليجرام اليمن',
      value: '+967 771 889 030',
      url: 'https://t.me/+967771889030',
      note: 'يفتح تيليجرام في المتصفح أو التطبيق',
    },
    {
      kind: 'email',
      label: 'البريد الإلكتروني',
      value: 'al.hussein.ajlan@gmail.com',
      url: 'mailto:al.hussein.ajlan@gmail.com',
      note: 'يفتح تطبيق البريد الافتراضي',
    },
    {
      kind: 'email',
      label: 'البريد الاحتياطي',
      value: 'al.hussein.ajlan@Hotmail.com',
      url: 'mailto:al.hussein.ajlan@Hotmail.com',
      note: 'يفتح تطبيق البريد الافتراضي',
    },
    {
      kind: 'facebook',
      label: 'فيسبوك',
      value: 'facebook.com/share/1CjGrdQA4Y',
      url: 'https://www.facebook.com/share/1CjGrdQA4Y/',
      note: 'يفتح صفحة فيسبوك',
    },
    {
      kind: 'instagram',
      label: 'انستقرام',
      value: '@eng.alhussein.ben.ajlan',
      url: 'https://www.instagram.com/eng.alhussein.ben.ajlan?igsh=ZWVycTFlYjdpZDI0',
      note: 'يفتح حساب انستقرام',
    },
    {
      kind: 'youtube',
      label: 'يوتيوب',
      value: '@ben_ajlan',
      url: 'https://youtube.com/@ben_ajlan?si=Pu-Dz5T7cQ6dYORq',
      note: 'يفتح قناة يوتيوب',
    },
    {
      kind: 'tiktok',
      label: 'تيك توك',
      value: '@alhussein.ajlan',
      url: 'https://www.tiktok.com/@alhussein.ajlan?_r=1&_t=ZS-91M387c3BnM',
      note: 'يفتح حساب تيك توك',
    },
    {
      kind: 'x',
      label: 'X / تويتر',
      value: '@alhussein_ajlan',
      url: 'https://x.com/alhussein_ajlan?t=ZJ1g6WXF7LsHNgCxJ2rYHA&s=09',
      note: 'يفتح حساب X',
    },
  ],
};

function getSupportProfile() {
  return supportProfile;
}

function getSupportContacts() {
  return Array.isArray(supportProfile.contacts) ? supportProfile.contacts : [];
}

module.exports = {
  getSupportContacts,
  getSupportProfile,
};
