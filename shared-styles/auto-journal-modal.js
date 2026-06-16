/**
 * Auto Journal Modal - Shared Component
 * Shows the automatic journal entry for invoices, receipts, vouchers
 */

// ===== Translation System =====
const AJM_TRANSLATIONS = {
  ar: {
    title: 'صورة الحركة',
    loading: 'جاري التحميل...',
    noInterface: 'واجهة القيود غير متاحة. يرجى إعادة تحميل الصفحة.',
    noAutoJournal: 'لا يوجد قيد تلقائي لهذه العملية',
    journalNo: 'رقم القيد',
    date: 'التاريخ',
    memo: 'البيان',
    createdBy: 'المنشئ',
    thAccountParty: 'الحساب / الطرف',
    thLineMemo: 'البيان',
    thCurrency: 'العملة',
    thKarat: 'العيار',
    thDebit: 'مدين',
    thCredit: 'دائن',
    total: 'الإجمالي',
    loadError: 'حدث خطأ أثناء تحميل القيد:',
    badgeGold: 'ذهب',
    badgeSilver: 'فضة',
    badgeCash: 'ريال'
  },
  en: {
    title: 'Movement Image',
    loading: 'Loading...',
    noInterface: 'Journal interface is not available. Please reload the page.',
    noAutoJournal: 'No automatic journal entry for this transaction',
    journalNo: 'Journal No.',
    date: 'Date',
    memo: 'Description',
    createdBy: 'Created by',
    thAccountParty: 'Account / Party',
    thLineMemo: 'Description',
    thCurrency: 'Currency',
    thKarat: 'Karat',
    thDebit: 'Debit',
    thCredit: 'Credit',
    total: 'Total',
    loadError: 'Error while loading journal:',
    badgeGold: 'Gold',
    badgeSilver: 'Silver',
    badgeCash: 'Cash'
  }
};

function getAJMLang() {
  try {
    return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
  } catch (_) {
    return 'ar';
  }
}

function tAJM(key) {
  const lang = getAJMLang();
  const dict = AJM_TRANSLATIONS[lang] || AJM_TRANSLATIONS.ar;
  return dict[key] || AJM_TRANSLATIONS.ar[key] || key;
}

// Detect dark mode using the same logic as the main shell (data-theme="dark" + fallbacks)
function isDarkMode() {
  try {
    const doc = document;

    // 1) Check data-theme on current document
    const rootTheme = doc.documentElement ? (doc.documentElement.getAttribute('data-theme') || '') : '';
    const bodyTheme = doc.body ? (doc.body.getAttribute('data-theme') || '') : '';
    if (rootTheme === 'dark' || bodyTheme === 'dark') {
      return true;
    }

    // 2) Check parent document (main shell) if available
    if (window.parent && window.parent !== window) {
      try {
        const pDoc = window.parent.document;
        const pRootTheme = pDoc.documentElement ? (pDoc.documentElement.getAttribute('data-theme') || '') : '';
        const pBodyTheme = pDoc.body ? (pDoc.body.getAttribute('data-theme') || '') : '';
        if (pRootTheme === 'dark' || pBodyTheme === 'dark') {
          return true;
        }
      } catch (e) {
        // Ignore cross-origin / access errors
      }
    }

    // 3) Check dark classes (fallback)
    if (doc.body && doc.body.classList.contains('dark')) {
      return true;
    }
    if (doc.documentElement && doc.documentElement.classList.contains('dark')) {
      return true;
    }

    // 4) OS-level preference as a last resort
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
  } catch (e) {
    // If anything fails, fall back to light mode
  }
  return false;
}

// Create modal HTML structure
function createAutoJournalModal() {
  // Check if modal already exists
  if (document.getElementById('autoJournalModal')) return;
  
  const darkClass = isDarkMode() ? 'dark-mode' : '';
  
  const modalHtml = `
    <div id="autoJournalModal" class="auto-journal-modal ${darkClass}" aria-hidden="true">
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3><i class="fas fa-file-invoice"></i> <span id="ajm_title">${tAJM('title')}</span></h3>
          <button class="modal-close" id="ajm_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
          <div id="ajm_content"></div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  // Listen for theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const modal = document.getElementById('autoJournalModal');
      if (modal) {
        modal.classList.toggle('dark-mode', e.matches);
      }
    });
  }
  
  // Add event listeners
  const modal = document.getElementById('autoJournalModal');
  const closeBtn = document.getElementById('ajm_close');
  const backdrop = modal.querySelector('.modal-backdrop');
  
  closeBtn.addEventListener('click', closeAutoJournalModal);
  backdrop.addEventListener('click', closeAutoJournalModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeAutoJournalModal();
    }
  });
}

// Close modal
function closeAutoJournalModal() {
  const modal = document.getElementById('autoJournalModal');
  if (modal) {
    modal.setAttribute('aria-hidden', 'true');
  }
}

// Format number with commas
function formatJournalNumber(num) {
  if (!num || num === 0) return '-';
  return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Get currency badge HTML
function getCurrencyBadge(currencyType) {
  if (!currencyType) return '';
  const type = currencyType.toLowerCase();
  if (type.includes('ذهب') || type.includes('gold')) {
    return '<span class="currency-badge gold">' + tAJM('badgeGold') + '</span>';
  } else if (type.includes('فضة') || type.includes('silver')) {
    return '<span class="currency-badge silver">' + tAJM('badgeSilver') + '</span>';
  } else {
    return '<span class="currency-badge cash">' + tAJM('badgeCash') + '</span>';
  }
}

// Show auto journal modal
async function showAutoJournalModal(sourceType, sourceId, title) {
  createAutoJournalModal();
  
  const modal = document.getElementById('autoJournalModal');
  const titleEl = document.getElementById('ajm_title');
  const contentEl = document.getElementById('ajm_content');

   // Ensure dark mode class is synced every time the modal is opened
   if (modal) {
     const dark = isDarkMode();
     if (dark) {
       modal.classList.add('dark-mode');
     } else {
       modal.classList.remove('dark-mode');
     }
   }
  
  titleEl.textContent = title || tAJM('title');
  contentEl.innerHTML = `
    <div style="text-align:center;padding:40px">
      <i class="fas fa-spinner fa-spin fa-2x"></i>
      <p>${tAJM('loading')}</p>
    </div>
  `;
  
  modal.setAttribute('aria-hidden', 'false');
  
  try {
    // Check if journal API is available (try window, then parent, then top)
    const journalApi = window.journal || (window.parent && window.parent.journal) || (window.top && window.top.journal);
    
    if (!journalApi || typeof journalApi.getAutoJournal !== 'function') {
      contentEl.innerHTML = `
        <div class="no-journal">
          <i class="fas fa-exclamation-triangle"></i>
          <p>${tAJM('noInterface')}</p>
        </div>
      `;
      return;
    }
    
    const result = await journalApi.getAutoJournal(sourceType, sourceId);
    
    if (!result.success) {
      contentEl.innerHTML = `
        <div class="no-journal">
          <i class="fas fa-file-circle-question"></i>
          <p>${result.error || tAJM('noAutoJournal')}</p>
        </div>
      `;
      return;
    }
    
    const { entry, lines } = result;
    
    // Calculate totals
    let totalDebit = 0, totalCredit = 0;
    lines.forEach(line => {
      totalDebit += Number(line.debit) || 0;
      totalCredit += Number(line.credit) || 0;
    });
    
    // Build HTML
    let html = `
      <div class="journal-info">
        <div class="journal-info-item">
          <label>${tAJM('journalNo')}</label>
          <span>${entry.id}</span>
        </div>
        <div class="journal-info-item">
          <label>${tAJM('date')}</label>
          <span>${entry.date || '-'}</span>
        </div>
        <div class="journal-info-item">
          <label>${tAJM('memo')}</label>
          <span>${entry.memo || '-'}</span>
        </div>
        <div class="journal-info-item">
          <label>${tAJM('createdBy')}</label>
          <span>${entry.created_by_name || '-'}</span>
        </div>
      </div>
      
      <table class="journal-table">
        <thead>
          <tr>
            <th>#</th>
            <th>${tAJM('thAccountParty')}</th>
            <th>${tAJM('thLineMemo')}</th>
            <th>${tAJM('thCurrency')}</th>
            <th>${tAJM('thKarat')}</th>
            <th>${tAJM('thDebit')}</th>
            <th>${tAJM('thCredit')}</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    lines.forEach((line, idx) => {
      const accountName = line.account_name || line.customer_name || line.supplier_name || '-';
      const accountCode = line.account_code || '';
      const displayName = accountCode ? `${accountName} (${accountCode})` : accountName;
      
      html += `
        <tr>
          <td>${idx + 1}</td>
          <td>${displayName}</td>
          <td>${line.memo || '-'}</td>
          <td>${getCurrencyBadge(line.currency_type)}</td>
          <td>${line.karat || '-'}</td>
          <td class="debit">${line.debit > 0 ? formatJournalNumber(line.debit) : '-'}</td>
          <td class="credit">${line.credit > 0 ? formatJournalNumber(line.credit) : '-'}</td>
        </tr>
      `;
    });
    
    html += `
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" style="text-align:left">${tAJM('total')}</td>
            <td class="debit">${formatJournalNumber(totalDebit)}</td>
            <td class="credit">${formatJournalNumber(totalCredit)}</td>
          </tr>
        </tfoot>
      </table>
    `;
    
    contentEl.innerHTML = html;
    
  } catch (error) {
    contentEl.innerHTML = `
      <div class="no-journal">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${tAJM('loadError')} ${error.message}</p>
      </div>
    `;
  }
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.showAutoJournalModal = showAutoJournalModal;
  window.closeAutoJournalModal = closeAutoJournalModal;
}
