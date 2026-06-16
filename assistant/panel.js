(function () {
  'use strict';

  const STORAGE_KEYS = {
    open: 'assistantPanelOpen',
    messages: 'assistantConversationV1',
    conversationState: 'assistantConversationStateV1',
    routeHint: 'assistantRouteHintV1',
  };

  const state = {
    isOpen: false,
    isProviderOpen: false,
    settings: null,
    presets: {},
    messages: [],
    conversationState: null,
    routeHint: 'auto',
    pending: false,
    userStorageScope: '',
    metaNoteKey: 'readyShort',
    metaNoteParams: {},
    lastResolvedRoute: '',
  };

  const dom = {};

  function getAssistantPanelLang() {
    try {
      return localStorage.getItem('uiLang') === 'en' ? 'en' : 'ar';
    } catch (_) {
      return 'ar';
    }
  }

  function getAssistantPanelLocaleBundle() {
    const locales = window.AssistantPanelLocales || {};
    const lang = getAssistantPanelLang();
    return locales[lang] || locales.ar || {};
  }

  function tp(key = '', params = {}) {
    const locales = window.AssistantPanelLocales || {};
    const bundle = getAssistantPanelLocaleBundle();
    const fallbackBundle = locales.ar || {};
    const template = bundle[key] || fallbackBundle[key] || key;
    return String(template).replace(/\{(\w+)\}/g, (_, token) => String(params?.[token] ?? ''));
  }

  function setMetaNoteKey(key = '', params = {}) {
    state.metaNoteKey = key;
    state.metaNoteParams = params || {};
    if (dom.metaNote) {
      dom.metaNote.textContent = key ? tp(key, params) : '';
    }
  }

  function setMetaNoteText(text = '') {
    state.metaNoteKey = '';
    state.metaNoteParams = {};
    if (dom.metaNote) {
      dom.metaNote.textContent = String(text || '');
    }
  }

  function nowTime() {
    return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(value = '') {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getAssistantApi() {
    return window.assistant || null;
  }

  function getCoreApi() {
    return window.api || window.parent?.api || window.top?.api || null;
  }

  function getCurrentUserSnapshot() {
    try {
      const raw = localStorage.getItem('currentUser');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch (_) {
      return null;
    }
  }

  function normalizePositiveId(value = null) {
    const numericValue = Number(value || 0);
    return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : null;
  }

  function normalizeBranchIdList(values = []) {
    if (!Array.isArray(values)) {
      return [];
    }
    return Array.from(new Set(values
      .map((value) => normalizePositiveId(value))
      .filter((value) => Number.isFinite(value) && value > 0)));
  }

  function getCurrentBranchSnapshot() {
    try {
      const raw = localStorage.getItem('currentBranch');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
    } catch (_) {
      return null;
    }
  }

  function getCurrentBranchScopeSnapshot() {
    try {
      const raw = localStorage.getItem('branchScope');
      const parsed = raw ? JSON.parse(raw) : {};
      const currentUser = getCurrentUserSnapshot();
      const currentBranch = getCurrentBranchSnapshot();
      const scopeAllowedBranchIds = normalizeBranchIdList(
        Array.isArray(parsed?.allowedBranchIds)
          ? parsed.allowedBranchIds
          : (Array.isArray(parsed?.allowed_branch_ids) ? parsed.allowed_branch_ids : [])
      );
      const userAllowedBranchIds = normalizeBranchIdList(Array.isArray(currentUser?.allowed_branch_ids) ? currentUser.allowed_branch_ids : []);
      const branchId = normalizePositiveId(parsed?.branchId || parsed?.branch_id || currentBranch?.id || currentUser?.branch_id || currentUser?.default_branch_id);
      const allowedBranchIds = scopeAllowedBranchIds.length
        ? scopeAllowedBranchIds
        : (userAllowedBranchIds.length ? userAllowedBranchIds : normalizeBranchIdList([branchId]));
      return {
        mode: String(parsed?.mode || parsed?.scope || '').trim().toLowerCase() === 'all' ? 'all' : 'branch',
        branchId,
        allowedBranchIds,
      };
    } catch (_) {
      return null;
    }
  }

  function slugifyStorageKeyPart(value = '') {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^\p{L}\p{N}_-]/gu, '')
      .slice(0, 60);
  }

  function getCurrentUserStorageScope() {
    const currentUser = getCurrentUserSnapshot();
    if (Number.isFinite(Number(currentUser?.id)) && Number(currentUser.id) > 0) {
      return `user_${Number(currentUser.id)}`;
    }
    const fallbackName = slugifyStorageKeyPart(currentUser?.username || currentUser?.full_name || currentUser?.name || '');
    return fallbackName ? `user_${fallbackName}` : 'guest';
  }

  function getScopedStorageKey(key = '') {
    return `${String(key || '').trim()}::${getCurrentUserStorageScope()}`;
  }

  function getCurrentUserDisplayName() {
    const currentUser = getCurrentUserSnapshot();
    const lang = getAssistantPanelLang();
    if (lang === 'en') {
      return String(currentUser?.username || currentUser?.full_name_en || currentUser?.full_name || '').trim();
    }
    return String(currentUser?.full_name || currentUser?.username || currentUser?.full_name_en || '').trim();
  }

  function buildWelcomeTitle() {
    const name = getCurrentUserDisplayName();
    return name ? tp('welcomeTitleWithName', { name }) : tp('welcomeTitleAnonymous');
  }

  function buildWelcomeText() {
    const name = getCurrentUserDisplayName();
    if (name) {
      return tp('welcomeTextWithName', { name });
    }
    return tp('welcomeTextAnonymous');
  }

  function buildHeaderSubtitle() {
    const name = getCurrentUserDisplayName();
    return name
      ? tp('panelSubtitleWithName', { name })
      : tp('panelSubtitleAnonymous');
  }

  function refreshPersonalizedUi() {
    if (dom.panelSubtitle) dom.panelSubtitle.textContent = buildHeaderSubtitle();
    if (dom.emptyTitle) dom.emptyTitle.textContent = buildWelcomeTitle();
    if (dom.emptyText) dom.emptyText.textContent = buildWelcomeText();
  }

  function applyAssistantPanelTranslations() {
    refreshPersonalizedUi();

    if (dom.fab) {
      dom.fab.setAttribute('aria-label', tp('openAssistant'));
      dom.fab.setAttribute('title', tp('panelTitle'));
    }
    if (dom.providerBtn) {
      dom.providerBtn.setAttribute('title', tp('openProviderSettings'));
      dom.providerBtn.setAttribute('aria-label', tp('openProviderSettings'));
    }
    if (dom.closeBtn) {
      dom.closeBtn.setAttribute('title', tp('closeAssistant'));
      dom.closeBtn.setAttribute('aria-label', tp('closeAssistant'));
    }
    if (dom.providerClose) {
      dom.providerClose.setAttribute('aria-label', tp('close'));
      dom.providerClose.setAttribute('title', tp('close'));
    }
    if (dom.send) {
      dom.send.setAttribute('aria-label', tp('send'));
      dom.send.setAttribute('title', tp('send'));
    }

    const panelTitle = document.querySelector('.assistant-panel-title');
    if (panelTitle) panelTitle.textContent = tp('panelTitle');

    if (dom.providerTitle) dom.providerTitle.textContent = tp('providerSettingsTitle');

    const composerHelp = document.querySelector('.assistant-composer-note span:first-child');
    if (composerHelp) composerHelp.textContent = tp('composerHelpText');

    const providerSubtitle = document.querySelector('.assistant-provider-header .assistant-provider-text');
    if (providerSubtitle) providerSubtitle.textContent = tp('providerSettingsSubtitle');

    const providerToggleLabel = document.querySelector('.assistant-provider-toggle > span');
    if (providerToggleLabel) providerToggleLabel.textContent = tp('providerToggleGeneral');

    const providerSelectLabel = document.querySelector('label[for="assistantProviderSelect"]');
    if (providerSelectLabel) providerSelectLabel.textContent = tp('providerLabel');

    const providerModelLabel = document.querySelector('label[for="assistantProviderModel"]');
    if (providerModelLabel) providerModelLabel.textContent = tp('providerModelLabel');

    const providerEndpointLabel = document.querySelector('label[for="assistantProviderEndpoint"]');
    if (providerEndpointLabel) providerEndpointLabel.textContent = tp('providerEndpointLabel');

    const providerApiKeyLabel = document.querySelector('label[for="assistantProviderApiKey"]');
    if (providerApiKeyLabel) providerApiKeyLabel.textContent = tp('providerApiKeyLabel');

    const providerSystemPromptLabel = document.querySelector('label[for="assistantProviderSystemPrompt"]');
    if (providerSystemPromptLabel) providerSystemPromptLabel.textContent = tp('providerSystemPromptLabel');

    const providerTemperatureLabel = document.querySelector('label[for="assistantProviderTemperature"]');
    if (providerTemperatureLabel) providerTemperatureLabel.textContent = tp('providerTemperatureLabel');

    const providerStateFieldLabel = dom.providerState?.closest('.assistant-provider-field')?.querySelector('label');
    if (providerStateFieldLabel) providerStateFieldLabel.textContent = tp('providerCurrentStatusLabel');

    const providerFooterNote = document.querySelector('.assistant-provider-footer .assistant-provider-text');
    if (providerFooterNote) providerFooterNote.textContent = tp('providerFooterNote');

    if (dom.providerModel) dom.providerModel.placeholder = tp('providerModelPlaceholder');
    if (dom.providerApiKey) dom.providerApiKey.placeholder = tp('providerApiKeyPlaceholder');
    if (dom.providerSystemPrompt) dom.providerSystemPrompt.placeholder = tp('providerSystemPromptPlaceholder');

    if (dom.providerCancel) dom.providerCancel.textContent = tp('close');
    if (dom.providerTest) dom.providerTest.textContent = tp('testConnection');
    if (dom.providerSave) dom.providerSave.textContent = tp('saveSettings');
    if (dom.toggleApiKey) dom.toggleApiKey.textContent = dom.providerApiKey?.getAttribute('type') === 'password' ? tp('show') : tp('hide');

    if (dom.providerStatus && !state.settings) {
      dom.providerStatus.innerHTML = `<span class="assistant-status-dot"></span><span>${escapeHtml(tp('loadingProviderStatus'))}</span>`;
    }
    if (dom.providerState && !state.settings) {
      dom.providerState.innerHTML = `<span class="assistant-status-dot"></span><span>${escapeHtml(tp('providerUnknownStatus'))}</span>`;
    }

    if (dom.routeInfo) {
      dom.routeInfo.textContent = mapRouteLabel(state.lastResolvedRoute);
    }

    if (dom.quickChips[0]) {
      dom.quickChips[0].textContent = tp('quickChipOpenReportsLabel');
      dom.quickChips[0].dataset.message = tp('quickChipOpenReportsMessage');
    }
    if (dom.quickChips[1]) {
      dom.quickChips[1].textContent = tp('quickChipSalesCalcLabel');
      dom.quickChips[1].dataset.message = tp('quickChipSalesCalcMessage');
    }
    if (dom.quickChips[2]) {
      dom.quickChips[2].textContent = tp('quickChipCustomersCountLabel');
      dom.quickChips[2].dataset.message = tp('quickChipCustomersCountMessage');
    }
    if (dom.quickChips[3]) {
      dom.quickChips[3].textContent = tp('quickChipProviderSettingsLabel');
      dom.quickChips[3].dataset.message = tp('quickChipProviderSettingsMessage');
    }

    const routeFiltersWrap = document.getElementById('assistantRouteFilters');
    if (routeFiltersWrap) routeFiltersWrap.setAttribute('aria-label', tp('routeHintAriaLabel'));

    dom.routeFilters.forEach((button) => {
      const normalized = normalizeRouteHint(button.dataset.routeHint || '');
      if (normalized === 'general') button.textContent = tp('routeHintGeneral');
      else if (normalized === 'database') button.textContent = tp('routeHintDatabase');
      else if (normalized === 'local') button.textContent = tp('routeHintLocal');
      else button.textContent = tp('routeHintAuto');
    });

    if (dom.input) {
      dom.input.placeholder = getRouteHintPlaceholder(state.routeHint || 'auto');
    }

    if (state.metaNoteKey) {
      setMetaNoteKey(state.metaNoteKey, state.metaNoteParams || {});
    }

    setProviderStatus(state.settings || null, { routeLabel: mapRouteLabel(state.lastResolvedRoute) });
    renderMessages();
  }

  function startsWithEmoji(text = '') {
    try {
      return /^\p{Extended_Pictographic}/u.test(String(text || '').trim());
    } catch (_) {
      return false;
    }
  }

  function decorateAssistantText(text = '', routeKey = '', contacts = [], attachments = []) {
    const cleanText = String(text || '').trim();
    if (!cleanText || startsWithEmoji(cleanText)) {
      return cleanText;
    }
    if (Array.isArray(attachments) && attachments.length) {
      return `📎 ${cleanText}`;
    }
    if (Array.isArray(contacts) && contacts.length) {
      return `🤝 ${cleanText}`;
    }
    const emojiByRoute = {
      knowledge: '🧠',
      database: '📊',
      command: '⚡',
      general: '💬',
    };
    return `${emojiByRoute[routeKey] || '✨'} ${cleanText}`;
  }

  async function openExternalUrl(url = '') {
    const targetUrl = String(url || '').trim();
    if (!targetUrl) return;
    try {
      const api = getCoreApi();
      if (api?.openExternal) {
        await api.openExternal(targetUrl);
        return;
      }
    } catch (_) {}
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }

  function pushAssistantStatusMessage(text = '', routeKey = 'command', actions = []) {
    const rawText = String(text || '').trim();
    if (!rawText) return;
    pushMessage({
      role: 'assistant',
      routeKey,
      route: routeKey,
      time: nowTime(),
      rawText,
      text: decorateAssistantText(rawText, routeKey),
      actions: Array.isArray(actions) ? actions : [],
    });
  }

  function getThemeModeLabel(mode = '') {
    if (mode === 'dark') return tp('themeDark');
    if (mode === 'light') return tp('themeLight');
    if (mode === 'auto') return tp('themeAuto');
    return tp('themeRequested');
  }

  function readStoredTheme() {
    try {
      const parsed = JSON.parse(localStorage.getItem('appTheme') || '{}');
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (_) {}
    return {};
  }

  function applyThemeAction(action = {}) {
    const savedTheme = readStoredTheme();
    const nextTheme = {
      mode: String(action.mode || savedTheme.mode || 'dark').trim() || 'dark',
      color: String(action.color || savedTheme.color || document.documentElement.getAttribute('data-color-theme') || 'turquoise').trim() || 'turquoise',
    };

    try {
      localStorage.setItem('appTheme', JSON.stringify(nextTheme));
    } catch (_) {}

    if (typeof window.applyAppTheme === 'function') {
      try {
        window.applyAppTheme(nextTheme);
      } catch (_) {}
    }

    let resolvedMode = nextTheme.mode;
    if (resolvedMode === 'auto' && window.matchMedia) {
      resolvedMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', resolvedMode || 'dark');
    document.documentElement.setAttribute('data-color-theme', nextTheme.color);
    if (document.body) {
      document.body.setAttribute('data-theme', resolvedMode || 'dark');
    }

    document.querySelectorAll('#content-area iframe').forEach((iframe) => {
      try {
        if (iframe.contentDocument?.documentElement) {
          iframe.contentDocument.documentElement.setAttribute('data-theme', resolvedMode || 'dark');
          iframe.contentDocument.documentElement.setAttribute('data-color-theme', nextTheme.color);
        }
        if (iframe.contentDocument?.body) {
          iframe.contentDocument.body.setAttribute('data-theme', resolvedMode || 'dark');
        }
      } catch (_) {}
    });

    try {
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: nextTheme }));
    } catch (_) {}

    return nextTheme;
  }

  function getContactKindIcon(kind = '') {
    const key = String(kind || '').trim().toLowerCase();
    if (key === 'whatsapp') return 'fa-brands fa-whatsapp';
    if (key === 'telegram') return 'fa-brands fa-telegram';
    if (key === 'email') return 'fa-solid fa-envelope';
    if (key === 'facebook') return 'fa-brands fa-facebook-f';
    if (key === 'instagram') return 'fa-brands fa-instagram';
    if (key === 'youtube') return 'fa-brands fa-youtube';
    if (key === 'tiktok') return 'fa-brands fa-tiktok';
    if (key === 'x') return 'fa-brands fa-x-twitter';
    return 'fa-solid fa-link';
  }

  function buildContactGrid(contacts = []) {
    if (!Array.isArray(contacts) || !contacts.length) return null;
    const grid = document.createElement('div');
    grid.className = 'assistant-contact-grid';

    contacts.forEach((contact) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `assistant-contact-card is-${escapeHtml(contact.kind || 'link')}`;

      const head = document.createElement('div');
      head.className = 'assistant-contact-head';

      const icon = document.createElement('div');
      icon.className = 'assistant-contact-icon';
      icon.innerHTML = `<i class="${escapeHtml(getContactKindIcon(contact.kind))}"></i>`;

      const textWrap = document.createElement('div');
      textWrap.className = 'assistant-contact-text';

      const label = document.createElement('div');
      label.className = 'assistant-contact-label';
      label.textContent = String(contact.label || tp('contactFallback'));

      const value = document.createElement('div');
      value.className = 'assistant-contact-value';
      value.textContent = String(contact.value || '');
      if (/[@+\d]/.test(String(contact.value || ''))) {
        value.setAttribute('dir', 'ltr');
      }

      textWrap.appendChild(label);
      textWrap.appendChild(value);
      head.appendChild(icon);
      head.appendChild(textWrap);
      button.appendChild(head);

      if (contact.note) {
        const note = document.createElement('div');
        note.className = 'assistant-contact-note';
        note.textContent = String(contact.note || '');
        button.appendChild(note);
      }

      button.addEventListener('click', () => openExternalUrl(contact.url));
      grid.appendChild(button);
    });

    return grid;
  }

  function toLocalFileUrl(filePath = '') {
    const targetPath = String(filePath || '').trim();
    if (!targetPath) return '';
    if (/^file:\/\//i.test(targetPath)) {
      return encodeURI(targetPath);
    }
    return encodeURI(`file:///${targetPath.replace(/\\/g, '/')}`);
  }

  function formatAttachmentDate(value = '') {
    const rawValue = String(value || '').trim();
    if (!rawValue) return '';
    const parsed = new Date(rawValue);
    if (!Number.isFinite(parsed.getTime())) {
      return rawValue;
    }
    return parsed.toLocaleString('ar-SA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  async function invokeCoreChannel(channel = '', payload = null) {
    const api = getCoreApi();
    if (!channel || !api?.invoke) {
      return { success: false, error: tp('localInterfacesUnavailable') };
    }
    try {
      return await api.invoke(channel, payload);
    } catch (error) {
      return { success: false, error: error?.message || tp('operationFailed') };
    }
  }

  async function openAttachmentPath(filePath = '') {
    const result = await invokeCoreChannel('assistant-open-path', filePath);
    if (!result?.success && !result?.canceled && dom.metaNote) {
      setMetaNoteText(result?.error || tp('attachmentOpenFileFailed'));
    }
  }

  async function revealAttachmentPath(filePath = '') {
    const result = await invokeCoreChannel('assistant-show-item-in-folder', filePath);
    if (!result?.success && !result?.canceled && dom.metaNote) {
      setMetaNoteText(result?.error || tp('attachmentOpenFolderFailed'));
    }
  }

  async function saveAttachmentFile(attachment = {}) {
    const sourcePath = String(attachment.pdfPath || attachment.filePath || '').trim();
    if (!sourcePath) {
      if (dom.metaNote) {
        setMetaNoteText(tp('attachmentMissingPath'));
      }
      return;
    }
    const result = await invokeCoreChannel('assistant-save-generated-file', {
      sourcePath,
      defaultName: attachment.fileName || '',
    });
    if (result?.success && dom.metaNote) {
      setMetaNoteText(tp('attachmentSaved'));
      return;
    }
    if (!result?.canceled && dom.metaNote) {
      setMetaNoteText(result?.error || tp('attachmentSaveFailed'));
    }
  }

  function buildAttachmentGrid(attachments = []) {
    if (!Array.isArray(attachments) || !attachments.length) return null;
    const grid = document.createElement('div');
    grid.className = 'assistant-attachment-grid';

    attachments.forEach((attachment) => {
      if (!attachment || typeof attachment !== 'object') return;

      const card = document.createElement('article');
      card.className = 'assistant-attachment-card';

      const previewButton = document.createElement('button');
      previewButton.type = 'button';
      previewButton.className = 'assistant-attachment-preview';
      previewButton.setAttribute('aria-label', String(attachment.title || tp('attachmentOpenAria')));

      const previewUrl = toLocalFileUrl(attachment.previewUrl || attachment.previewPath || '');
      if (previewUrl) {
        const image = document.createElement('img');
        image.className = 'assistant-attachment-image';
        image.src = previewUrl;
        image.alt = String(attachment.title || tp('attachmentPreviewAlt'));
        image.loading = 'lazy';
        previewButton.appendChild(image);
      } else {
        previewButton.innerHTML = '<span class="assistant-attachment-fallback"><i class="fa-solid fa-file-pdf"></i></span>';
      }
      previewButton.addEventListener('click', () => openAttachmentPath(attachment.pdfPath || attachment.previewPath || ''));

      const body = document.createElement('div');
      body.className = 'assistant-attachment-body';

      const badgeRow = document.createElement('div');
      badgeRow.className = 'assistant-attachment-badges';

      const fileBadge = document.createElement('span');
      fileBadge.className = 'assistant-attachment-badge';
      fileBadge.textContent = 'PDF';
      badgeRow.appendChild(fileBadge);

      if (attachment.entityLabel || attachment.entityId) {
        const entityBadge = document.createElement('span');
        entityBadge.className = 'assistant-attachment-badge muted';
        entityBadge.textContent = attachment.entityId
          ? `${attachment.entityLabel || tp('attachmentEntityFallback')} #${attachment.entityId}`
          : String(attachment.entityLabel || tp('attachmentEntityFallback'));
        badgeRow.appendChild(entityBadge);
      }

      const title = document.createElement('div');
      title.className = 'assistant-attachment-title';
      title.textContent = String(attachment.title || tp('attachmentReadyTitle'));

      const subtitle = document.createElement('div');
      subtitle.className = 'assistant-attachment-subtitle';
      subtitle.textContent = String(attachment.subtitle || tp('attachmentReadySubtitle'));

      const meta = document.createElement('div');
      meta.className = 'assistant-attachment-meta';
      const createdAtLabel = formatAttachmentDate(attachment.createdAt || '');
      meta.textContent = createdAtLabel || String(attachment.fileName || '');

      const actions = document.createElement('div');
      actions.className = 'assistant-attachment-actions';

      const openButton = document.createElement('button');
      openButton.type = 'button';
      openButton.className = 'assistant-action-btn';
      openButton.textContent = tp('attachmentOpen');
      openButton.addEventListener('click', () => openAttachmentPath(attachment.pdfPath || ''));

      const saveButton = document.createElement('button');
      saveButton.type = 'button';
      saveButton.className = 'assistant-action-btn';
      saveButton.textContent = tp('attachmentDownload');
      saveButton.addEventListener('click', () => saveAttachmentFile(attachment));

      const folderButton = document.createElement('button');
      folderButton.type = 'button';
      folderButton.className = 'assistant-action-btn';
      folderButton.textContent = tp('attachmentOpenFolder');
      folderButton.addEventListener('click', () => revealAttachmentPath(attachment.pdfPath || attachment.folderPath || ''));

      actions.appendChild(openButton);
      actions.appendChild(saveButton);
      actions.appendChild(folderButton);

      body.appendChild(badgeRow);
      body.appendChild(title);
      body.appendChild(subtitle);
      body.appendChild(meta);
      body.appendChild(actions);

      card.appendChild(previewButton);
      card.appendChild(body);
      grid.appendChild(card);
    });

    return grid;
  }

  function buildMarkup() {
    const wrapper = document.createElement('div');
    wrapper.id = 'assistantUiRoot';
    wrapper.innerHTML = `
      <button id="assistantFab" class="assistant-fab" type="button" aria-label="${escapeHtml(tp('openAssistant'))}" title="${escapeHtml(tp('panelTitle'))}">
        <span class="assistant-fab-pulse"></span>
        <span class="assistant-fab-inner" aria-hidden="true">
          <span class="assistant-fab-avatar">
            <i class="fa-solid fa-robot"></i>
          </span>
        </span>
      </button>
      <div id="assistantBackdrop" class="assistant-backdrop"></div>
      <aside id="assistantSidePanel" class="assistant-side-panel" aria-hidden="true">
        <div class="assistant-panel-shell">
          <div class="assistant-panel-header">
            <div class="assistant-panel-header-top">
              <div class="assistant-panel-avatar"><i class="fa-solid fa-robot"></i></div>
              <div class="assistant-panel-title-wrap">
                <h2 class="assistant-panel-title">${escapeHtml(tp('panelTitle'))}</h2>
                <div id="assistantPanelSubtitle" class="assistant-panel-subtitle">${escapeHtml(buildHeaderSubtitle())}</div>
              </div>
              <div class="assistant-panel-actions">
                <button id="assistantProviderBtn" class="assistant-panel-icon-btn" type="button" title="${escapeHtml(tp('openProviderSettings'))}" aria-label="${escapeHtml(tp('openProviderSettings'))}">
                  <i class="fa-solid fa-key"></i>
                </button>
                <button id="assistantCloseBtn" class="assistant-panel-icon-btn" type="button" title="${escapeHtml(tp('closeAssistant'))}" aria-label="${escapeHtml(tp('closeAssistant'))}">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
            <div class="assistant-panel-status-row">
              <div id="assistantProviderStatus" class="assistant-status-pill muted">
                <span class="assistant-status-dot"></span>
                <span>${escapeHtml(tp('loadingProviderStatus'))}</span>
              </div>
              <div id="assistantRouteInfo" class="assistant-inline-pill">${escapeHtml(tp('readyConversation'))}</div>
            </div>
          </div>
          <div class="assistant-quick-actions">
            <button class="assistant-quick-chip" type="button" data-message="${escapeHtml(tp('quickChipOpenReportsMessage'))}">${escapeHtml(tp('quickChipOpenReportsLabel'))}</button>
            <button class="assistant-quick-chip" type="button" data-message="${escapeHtml(tp('quickChipSalesCalcMessage'))}">${escapeHtml(tp('quickChipSalesCalcLabel'))}</button>
            <button class="assistant-quick-chip" type="button" data-message="${escapeHtml(tp('quickChipCustomersCountMessage'))}">${escapeHtml(tp('quickChipCustomersCountLabel'))}</button>
            <button class="assistant-quick-chip" type="button" data-message="${escapeHtml(tp('quickChipProviderSettingsMessage'))}">${escapeHtml(tp('quickChipProviderSettingsLabel'))}</button>
          </div>
          <div id="assistantMessages" class="assistant-messages">
            <div class="assistant-empty-state" id="assistantEmptyState">
              <div class="assistant-empty-orb"><i class="fa-solid fa-brain"></i></div>
              <h3 id="assistantEmptyTitle" class="assistant-empty-title">${escapeHtml(buildWelcomeTitle())}</h3>
              <div id="assistantEmptyText" class="assistant-empty-text">${escapeHtml(buildWelcomeText())}</div>
            </div>
          </div>
          <div class="assistant-composer">
            <div class="assistant-composer-filters" id="assistantRouteFilters" aria-label="${escapeHtml(tp('routeHintAriaLabel'))}">
              <button class="assistant-route-filter is-active" type="button" data-route-hint="auto" aria-pressed="true">${escapeHtml(tp('routeHintAuto'))}</button>
              <button class="assistant-route-filter" type="button" data-route-hint="general" aria-pressed="false">${escapeHtml(tp('routeHintGeneral'))}</button>
              <button class="assistant-route-filter" type="button" data-route-hint="database" aria-pressed="false">${escapeHtml(tp('routeHintDatabase'))}</button>
              <button class="assistant-route-filter" type="button" data-route-hint="local" aria-pressed="false">${escapeHtml(tp('routeHintLocal'))}</button>
            </div>
            <div class="assistant-composer-shell">
              <div class="assistant-input-wrap">
                <textarea id="assistantInput" class="assistant-input" placeholder="${escapeHtml(tp('routePlaceholderAuto'))}"></textarea>
              </div>
              <button id="assistantSendBtn" class="assistant-send-btn" type="button" aria-label="${escapeHtml(tp('send'))}" title="${escapeHtml(tp('send'))}">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
            <div class="assistant-composer-note">
              <span>${escapeHtml(tp('composerHelpText'))}</span>
              <span id="assistantMetaNote">${escapeHtml(tp('readyShort'))}</span>
            </div>
          </div>
        </div>
      </aside>
      <div id="assistantProviderModal" class="assistant-provider-modal" aria-hidden="true">
        <div class="assistant-provider-backdrop" data-close-provider="true"></div>
        <div class="assistant-provider-dialog" role="dialog" aria-modal="true" aria-labelledby="assistantProviderTitle">
          <div class="assistant-provider-header">
            <div>
              <h3 id="assistantProviderTitle" class="assistant-provider-title">${escapeHtml(tp('providerSettingsTitle'))}</h3>
              <div class="assistant-provider-text">${escapeHtml(tp('providerSettingsSubtitle'))}</div>
            </div>
            <button id="assistantProviderCloseBtn" class="assistant-panel-icon-btn" type="button" aria-label="${escapeHtml(tp('close'))}" title="${escapeHtml(tp('close'))}">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="assistant-provider-body">
            <div class="assistant-provider-toggle">
              <span>${escapeHtml(tp('providerToggleGeneral'))}</span>
              <label class="assistant-provider-switch">
                <input id="assistantProviderEnabled" type="checkbox" checked>
                <span class="assistant-provider-switch-track"></span>
              </label>
            </div>
            <div class="assistant-provider-grid">
              <div class="assistant-provider-field">
                <label for="assistantProviderSelect">${escapeHtml(tp('providerLabel'))}</label>
                <select id="assistantProviderSelect"></select>
              </div>
              <div class="assistant-provider-field">
                <label for="assistantProviderModel">${escapeHtml(tp('providerModelLabel'))}</label>
                <input id="assistantProviderModel" type="text" placeholder="${escapeHtml(tp('providerModelPlaceholder'))}">
              </div>
              <div class="assistant-provider-field full">
                <label for="assistantProviderEndpoint">${escapeHtml(tp('providerEndpointLabel'))}</label>
                <input id="assistantProviderEndpoint" type="text" placeholder="https://api.groq.com/openai/v1/chat/completions">
              </div>
              <div class="assistant-provider-field full">
                <label for="assistantProviderApiKey">${escapeHtml(tp('providerApiKeyLabel'))}</label>
                <div class="assistant-provider-inline">
                  <div class="assistant-provider-field" style="margin:0;">
                    <input id="assistantProviderApiKey" type="password" placeholder="${escapeHtml(tp('providerApiKeyPlaceholder'))}">
                  </div>
                  <button id="assistantToggleApiKeyBtn" class="assistant-btn-ghost" type="button">${escapeHtml(tp('show'))}</button>
                </div>
              </div>
              <div class="assistant-provider-field full">
                <label for="assistantProviderSystemPrompt">${escapeHtml(tp('providerSystemPromptLabel'))}</label>
                <textarea id="assistantProviderSystemPrompt" placeholder="${escapeHtml(tp('providerSystemPromptPlaceholder'))}"></textarea>
              </div>
              <div class="assistant-provider-field">
                <label for="assistantProviderTemperature">${escapeHtml(tp('providerTemperatureLabel'))}</label>
                <input id="assistantProviderTemperature" type="number" min="0" max="1" step="0.1" placeholder="0.2">
              </div>
              <div class="assistant-provider-field">
                <label>${escapeHtml(tp('providerCurrentStatusLabel'))}</label>
                <div id="assistantProviderCurrentState" class="assistant-status-pill muted"><span class="assistant-status-dot"></span><span>${escapeHtml(tp('providerUnknownStatus'))}</span></div>
              </div>
            </div>
            <div id="assistantProviderResult" class="assistant-provider-result"></div>
          </div>
          <div class="assistant-provider-footer">
            <div class="assistant-provider-text">${escapeHtml(tp('providerFooterNote'))}</div>
            <div class="assistant-provider-footer-actions">
              <button id="assistantProviderCancelBtn" class="assistant-btn-ghost" type="button">${escapeHtml(tp('close'))}</button>
              <button id="assistantProviderTestBtn" class="assistant-btn-secondary" type="button">${escapeHtml(tp('testConnection'))}</button>
              <button id="assistantProviderSaveBtn" class="assistant-btn" type="button">${escapeHtml(tp('saveSettings'))}</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
  }

  function cacheDom() {
    dom.fab = document.getElementById('assistantFab');
    dom.backdrop = document.getElementById('assistantBackdrop');
    dom.panel = document.getElementById('assistantSidePanel');
    dom.closeBtn = document.getElementById('assistantCloseBtn');
    dom.providerBtn = document.getElementById('assistantProviderBtn');
    dom.panelSubtitle = document.getElementById('assistantPanelSubtitle');
    dom.messages = document.getElementById('assistantMessages');
    dom.empty = document.getElementById('assistantEmptyState');
    dom.emptyTitle = document.getElementById('assistantEmptyTitle');
    dom.emptyText = document.getElementById('assistantEmptyText');
    dom.input = document.getElementById('assistantInput');
    dom.send = document.getElementById('assistantSendBtn');
    dom.metaNote = document.getElementById('assistantMetaNote');
    dom.providerStatus = document.getElementById('assistantProviderStatus');
    dom.routeInfo = document.getElementById('assistantRouteInfo');
    dom.providerModal = document.getElementById('assistantProviderModal');
    dom.providerTitle = document.getElementById('assistantProviderTitle');
    dom.providerClose = document.getElementById('assistantProviderCloseBtn');
    dom.providerCancel = document.getElementById('assistantProviderCancelBtn');
    dom.providerSelect = document.getElementById('assistantProviderSelect');
    dom.providerModel = document.getElementById('assistantProviderModel');
    dom.providerEndpoint = document.getElementById('assistantProviderEndpoint');
    dom.providerApiKey = document.getElementById('assistantProviderApiKey');
    dom.providerSystemPrompt = document.getElementById('assistantProviderSystemPrompt');
    dom.providerTemperature = document.getElementById('assistantProviderTemperature');
    dom.providerEnabled = document.getElementById('assistantProviderEnabled');
    dom.providerState = document.getElementById('assistantProviderCurrentState');
    dom.providerResult = document.getElementById('assistantProviderResult');
    dom.providerTest = document.getElementById('assistantProviderTestBtn');
    dom.providerSave = document.getElementById('assistantProviderSaveBtn');
    dom.toggleApiKey = document.getElementById('assistantToggleApiKeyBtn');
    dom.quickChips = Array.from(document.querySelectorAll('.assistant-quick-chip'));
    dom.routeFilters = Array.from(document.querySelectorAll('.assistant-route-filter'));
  }

  function persistPanelState() {
    localStorage.setItem(STORAGE_KEYS.open, state.isOpen ? 'true' : 'false');
  }

  function persistMessages() {
    try {
      localStorage.setItem(getScopedStorageKey(STORAGE_KEYS.messages), JSON.stringify(state.messages.slice(-30)));
    } catch (_) {}
  }

  function persistConversationState() {
    try {
      const serialized = state.conversationState ? JSON.stringify(state.conversationState) : '';
      if (serialized) {
        localStorage.setItem(getScopedStorageKey(STORAGE_KEYS.conversationState), serialized);
      } else {
        localStorage.removeItem(getScopedStorageKey(STORAGE_KEYS.conversationState));
      }
    } catch (_) {}
  }

  function persistRouteHint() {
    try {
      localStorage.setItem(getScopedStorageKey(STORAGE_KEYS.routeHint), state.routeHint || 'auto');
    } catch (_) {}
  }

  function normalizeRouteHint(routeHint = '') {
    const value = String(routeHint || '').trim().toLowerCase();
    if (value === 'general') return 'general';
    if (value === 'database') return 'database';
    if (value === 'local') return 'local';
    return 'auto';
  }

  function getRouteHintLabel(routeHint = '') {
    const normalized = normalizeRouteHint(routeHint);
    if (normalized === 'general') return tp('routeHintGeneral');
    if (normalized === 'database') return tp('routeHintDatabase');
    if (normalized === 'local') return tp('routeHintLocal');
    return tp('routeHintAuto');
  }

  function getRouteHintPlaceholder(routeHint = '') {
    const normalized = normalizeRouteHint(routeHint);
    if (normalized === 'general') return tp('routePlaceholderGeneral');
    if (normalized === 'database') return tp('routePlaceholderDatabase');
    if (normalized === 'local') return tp('routePlaceholderLocal');
    return tp('routePlaceholderAuto');
  }

  function setRouteHint(routeHint = 'auto', { persist = true } = {}) {
    const normalized = normalizeRouteHint(routeHint);
    state.routeHint = normalized;

    dom.routeFilters.forEach((button) => {
      const isActive = normalizeRouteHint(button.dataset.routeHint || '') === normalized;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (dom.input) {
      dom.input.placeholder = getRouteHintPlaceholder(normalized);
    }

    if (dom.metaNote && !state.pending) {
      setMetaNoteKey(normalized === 'auto' ? 'readyShort' : 'currentRouteLabel', normalized === 'auto' ? {} : { route: getRouteHintLabel(normalized) });
    }

    if (persist) {
      persistRouteHint();
    }
  }

  function restoreMessages() {
    try {
      const raw = localStorage.getItem(getScopedStorageKey(STORAGE_KEYS.messages));
      const parsed = raw ? JSON.parse(raw) : [];
      state.messages = Array.isArray(parsed)
        ? parsed.map((message) => ({
            ...message,
            actions: Array.isArray(message?.actions) ? message.actions : [],
            contacts: Array.isArray(message?.contacts) ? message.contacts : [],
            attachments: Array.isArray(message?.attachments) ? message.attachments : [],
          }))
        : [];
    } catch (_) {
      state.messages = [];
    }
  }

  function restoreConversationState() {
    try {
      const raw = localStorage.getItem(getScopedStorageKey(STORAGE_KEYS.conversationState));
      state.conversationState = raw ? JSON.parse(raw) : null;
    } catch (_) {
      state.conversationState = null;
    }
  }

  function restoreRouteHint() {
    try {
      const raw = localStorage.getItem(getScopedStorageKey(STORAGE_KEYS.routeHint));
      setRouteHint(raw || 'auto', { persist: false });
    } catch (_) {
      setRouteHint('auto', { persist: false });
    }
  }

  function syncUserScopedSessionState({ force = false } = {}) {
    const nextScope = getCurrentUserStorageScope();
    refreshPersonalizedUi();
    if (!force && state.userStorageScope === nextScope) {
      return false;
    }
    state.userStorageScope = nextScope;
    restoreRouteHint();
    restoreMessages();
    restoreConversationState();
    renderMessages();
    return true;
  }

  function buildConversationHistoryPayload(limit = 12) {
    return state.messages
      .filter((message) => message && message.type !== 'typing')
      .slice(-Math.max(1, Number(limit) || 10))
      .map((message) => ({
        role: message.role === 'assistant' ? 'assistant' : 'user',
        text: String(message.rawText || message.text || '').trim(),
        route: String(message.routeKey || message.route || '').trim(),
      }))
      .filter((message) => message.text);
  }

  function normalizeCommandText(text = '') {
    return String(text || '')
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/[ـ]+/g, '')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isClearChatRequest(text = '') {
    const normalizedText = normalizeCommandText(text);
    if (!normalizedText) return false;
    const clearWords = ['clear', 'delete', 'remove', 'clean', 'wipe', 'purge', 'reset', 'clure', 'clr', 'احذف', 'حذف', 'امسح', 'مسح', 'نظف', 'تنظيف', 'ازل', 'ازاله', 'افرغ', 'فضي'];
    const chatWords = ['الدردشه', 'دردشه', 'المحادثه', 'محادثه', 'الشات', 'شات', 'chat', 'conversation', 'history', 'messages', 'message'];
    const hasClearWord = clearWords.some((value) => normalizedText === value || normalizedText.includes(value));
    const hasChatWord = chatWords.some((value) => normalizedText.includes(value));
    return clearWords.includes(normalizedText) || (hasClearWord && hasChatWord);
  }

  function setProviderResult(message = '', type = '') {
    if (!dom.providerResult) return;
    dom.providerResult.textContent = message;
    dom.providerResult.className = 'assistant-provider-result';
    if (type) {
      dom.providerResult.classList.add(type);
    }
  }

  function setProviderStatus(settings = {}, meta = {}) {
    if (!settings || typeof settings !== 'object' || !Object.keys(settings).length) {
      if (dom.providerStatus) {
        dom.providerStatus.className = 'assistant-status-pill muted';
        dom.providerStatus.innerHTML = `<span class="assistant-status-dot"></span><span>${escapeHtml(tp('loadingProviderStatus'))}</span>`;
      }
      if (dom.providerState) {
        dom.providerState.className = 'assistant-status-pill muted';
        dom.providerState.innerHTML = `<span class="assistant-status-dot"></span><span>${escapeHtml(tp('providerUnknownStatus'))}</span>`;
      }
      if (dom.routeInfo) {
        dom.routeInfo.textContent = meta?.routeLabel || tp('readyConversation');
      }
      return;
    }
    const enabled = settings?.enabled !== false;
    const hasCredentials = Boolean(settings?.apiKey && settings?.endpoint && settings?.model);
    const providerKey = String(settings?.provider || '').trim().toLowerCase();
    const presetLabel = providerKey ? state.presets?.[providerKey]?.label : '';
    const label = presetLabel || settings?.label || settings?.provider || tp('providerGenericLabel');
    const statusText = enabled
      ? (hasCredentials ? tp('providerReady', { label }) : tp('providerIncomplete', { label }))
      : tp('providerDisabled');

    if (dom.providerStatus) {
      dom.providerStatus.className = `assistant-status-pill ${enabled && hasCredentials ? 'ready' : 'muted'}`;
      dom.providerStatus.innerHTML = `<span class="assistant-status-dot"></span><span>${escapeHtml(statusText)}</span>`;
    }

    if (dom.providerState) {
      dom.providerState.className = `assistant-status-pill ${enabled && hasCredentials ? 'ready' : 'muted'}`;
      dom.providerState.innerHTML = `<span class="assistant-status-dot"></span><span>${escapeHtml(statusText)}</span>`;
    }

    if (dom.routeInfo) {
      dom.routeInfo.textContent = meta?.routeLabel || tp('readyConversation');
    }
  }

  function getActionLabel(action = {}) {
    if (action.type === 'open_provider_settings') return action.label || tp('actionOpenProviderSettings');
    if (action.type === 'open_tab') return action.label || tp('actionOpenScreen', { label: action.label || tp('actionScreenFallback') });
    if (action.type === 'focus_screen_info') return action.label || tp('actionOpenScreen', { label: action.label || tp('actionScreenFallback') });
    if (action.type === 'clear_chat') return action.label || tp('actionClearChat');
    if (action.type === 'submit_message') return action.label || action.message || tp('actionSubmitMessage');
    if (action.type === 'set_theme') return action.label || tp('actionSetTheme', { mode: getThemeModeLabel(action.mode) });
    if (action.type === 'create_backup') return action.label || tp('actionCreateBackup');
    if (action.type === 'open_backup_folder') return action.label || tp('actionOpenBackupFolder');
    if (action.type === 'set_cloud_mode') return action.label || (action.enabled ? tp('actionEnableCloud') : tp('actionDisableCloud'));
    return action.label || tp('actionExecute');
  }

  function renderMessages() {
    if (!dom.messages) return;
    const realMessages = state.messages.filter((message) => message.type !== 'typing');
    if (dom.empty) {
      dom.empty.style.display = realMessages.length ? 'none' : '';
    }

    const oldList = dom.messages.querySelector('.assistant-message-list');
    if (oldList) oldList.remove();

    if (!state.messages.length) {
      return;
    }

    const list = document.createElement('div');
    list.className = 'assistant-message-list';
    state.messages.forEach((message, index) => {
      if (message.type === 'typing') {
        const typing = document.createElement('div');
        typing.className = 'assistant-message assistant';
        typing.innerHTML = `
          <div class="assistant-message-bubble">
            <div class="assistant-typing"><span></span><span></span><span></span></div>
          </div>
        `;
        list.appendChild(typing);
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = `assistant-message ${message.role === 'user' ? 'user' : 'assistant'}`;
      const metaHtml = message.role === 'assistant'
        ? `<div class="assistant-message-meta">
             ${message.route ? `<span class="assistant-route-badge">${escapeHtml(message.route)}</span>` : ''}
             <span class="assistant-message-time">${escapeHtml(message.time || '')}</span>
           </div>`
        : `<div class="assistant-message-meta"><span class="assistant-message-time">${escapeHtml(message.time || '')}</span></div>`;
      wrapper.innerHTML = `
        <div class="assistant-message-bubble">${escapeHtml(message.text || '')}</div>
        ${metaHtml}
      `;

      if (Array.isArray(message.contacts) && message.contacts.length && message.role !== 'user') {
        const contactsGrid = buildContactGrid(message.contacts);
        if (contactsGrid) {
          wrapper.appendChild(contactsGrid);
        }
      }

      if (Array.isArray(message.attachments) && message.attachments.length && message.role !== 'user') {
        const attachmentsGrid = buildAttachmentGrid(message.attachments);
        if (attachmentsGrid) {
          wrapper.appendChild(attachmentsGrid);
        }
      }

      if (Array.isArray(message.actions) && message.actions.length && message.role !== 'user') {
        const actionsRow = document.createElement('div');
        actionsRow.className = 'assistant-message-actions';
        message.actions.forEach((action) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'assistant-action-btn';
          button.textContent = getActionLabel(action);
          button.addEventListener('click', () => performAction(action));
          actionsRow.appendChild(button);
        });
        wrapper.appendChild(actionsRow);
      }

      list.appendChild(wrapper);

      if (index === state.messages.length - 1) {
        requestAnimationFrame(() => {
          dom.messages.scrollTop = dom.messages.scrollHeight;
        });
      }
    });

    dom.messages.appendChild(list);
  }

  function pushMessage(message) {
    state.messages.push(message);
    state.messages = state.messages.slice(-30);
    persistMessages();
    renderMessages();

    try {
      if (message && message.role !== 'user' && Array.isArray(message.actions)) {
        const autoActions = message.actions.filter((a) => a && a.autoRun && !a.__done);
        if (autoActions.length) {
          autoActions.forEach((action) => { action.__done = true; });
          persistMessages();
          setTimeout(() => {
            autoActions.forEach((action) => performAction(action));
          }, 30);
        }
      }
    } catch (_) {}
  }

  function clearConversation(metaNote = '') {
    state.messages = [];
    state.conversationState = null;
    persistMessages();
    persistConversationState();
    renderMessages();
    if (dom.messages) {
      dom.messages.scrollTop = 0;
    }
    if (dom.metaNote) {
      setMetaNoteText(metaNote || tp('cleanedChat'));
    }
    state.lastResolvedRoute = '';
    setProviderStatus(state.settings || {}, { routeLabel: tp('readyConversation') });
  }

  function removeTypingMessage() {
    state.messages = state.messages.filter((message) => message.type !== 'typing');
    persistMessages();
    renderMessages();
  }

  function syncPanelState() {
    document.body.classList.toggle('assistant-open', state.isOpen);
    if (dom.panel) {
      dom.panel.setAttribute('aria-hidden', state.isOpen ? 'false' : 'true');
    }
    if (dom.fab) {
      dom.fab.setAttribute('aria-hidden', state.isOpen ? 'true' : 'false');
      dom.fab.tabIndex = state.isOpen ? -1 : 0;
    }
  }

  function openPanel() {
    syncUserScopedSessionState();
    state.isOpen = true;
    syncPanelState();
    persistPanelState();
    setTimeout(() => {
      dom.input?.focus();
    }, 180);
  }

  function closePanel() {
    state.isOpen = false;
    syncPanelState();
    persistPanelState();
  }

  function togglePanel() {
    if (state.isOpen) {
      closePanel();
      return;
    }
    openPanel();
  }

  function openProviderModal() {
    state.isProviderOpen = true;
    document.body.classList.add('assistant-provider-open');
    dom.providerModal?.setAttribute('aria-hidden', 'false');
  }

  function closeProviderModal() {
    state.isProviderOpen = false;
    document.body.classList.remove('assistant-provider-open');
    dom.providerModal?.setAttribute('aria-hidden', 'true');
  }

  function mapRouteLabel(route) {
    if (route === 'knowledge') return tp('routeBadgeKnowledge');
    if (route === 'database') return tp('routeBadgeDatabase');
    if (route === 'command') return tp('routeBadgeCommand');
    if (route === 'general') return tp('routeBadgeGeneral');
    return tp('routeBadgeFallback');
  }

  function applyScreenParams(screenParams = null) {
    if (!screenParams || typeof screenParams !== 'object') {
      return;
    }

    const normalizedParams = { ...screenParams };
    window.screenParams = normalizedParams;
    if (window.parent && window.parent !== window) {
      window.parent.screenParams = { ...normalizedParams };
    }
  }

  async function performAction(action = {}) {
    if (action.type === 'open_provider_settings') {
      openPanel();
      openProviderModal();
      return;
    }

    if (action.type === 'clear_chat') {
      openPanel();
      clearConversation(tp('deletedChat'));
      dom.input?.focus();
      return;
    }

    if (action.type === 'submit_message' && action.message) {
      await sendMessage(String(action.message || ''));
      return;
    }

    if (action.type === 'set_theme') {
      openPanel();
      const theme = applyThemeAction(action);
      pushAssistantStatusMessage(tp('actionSetTheme', { mode: getThemeModeLabel(theme.mode) }));
      return;
    }

    if (action.type === 'create_backup') {
      openPanel();
      const api = getCoreApi();
      if (!api?.createManualBackup) {
        pushAssistantStatusMessage(tp('backupCreateUnavailable'));
        return;
      }
      try {
        const result = await api.createManualBackup();
        if (result?.success) {
          pushAssistantStatusMessage(result.message || tp('backupCreated'), 'command', [{ type: 'open_backup_folder' }]);
        } else {
          pushAssistantStatusMessage(tp('backupCreateFailed', { error: result?.error || tp('unexpectedError') }));
        }
      } catch (error) {
        pushAssistantStatusMessage(tp('backupCreateFailed', { error: error?.message || tp('unexpectedError') }));
      }
      return;
    }

    if (action.type === 'open_backup_folder') {
      openPanel();
      const api = getCoreApi();
      if (!api?.openBackupFolder) {
        pushAssistantStatusMessage(tp('backupOpenUnavailable'));
        return;
      }
      try {
        const result = await api.openBackupFolder();
        if (result?.success) {
          pushAssistantStatusMessage(tp('backupOpened'));
        } else {
          pushAssistantStatusMessage(tp('backupOpenFailed', { error: result?.error || tp('unexpectedError') }));
        }
      } catch (error) {
        pushAssistantStatusMessage(tp('backupOpenFailed', { error: error?.message || tp('unexpectedError') }));
      }
      return;
    }

    if (action.type === 'set_cloud_mode') {
      openPanel();
      const api = getCoreApi();
      if (!api?.setCloudMode) {
        pushAssistantStatusMessage(tp('cloudModeUnavailable'));
        return;
      }
      try {
        const result = await api.setCloudMode(Boolean(action.enabled));
        if (!result?.success) {
          pushAssistantStatusMessage(tp('cloudModeFailed', { error: result?.error || tp('unexpectedError') }));
          return;
        }

        if (action.enabled) {
          if (result.activeMode) {
            pushAssistantStatusMessage(result.connected
              ? tp('cloudEnabledSuccess')
              : tp('cloudEnabledDisconnected'));
          } else {
            pushAssistantStatusMessage(tp('cloudEnableDeferred'));
          }
        } else {
          pushAssistantStatusMessage(tp('cloudDisabledSuccess'));
        }
      } catch (error) {
        pushAssistantStatusMessage(tp('cloudModeFailed', { error: error?.message || tp('unexpectedError') }));
      }
      return;
    }

    if (action.type === 'check_license_status') {
      openPanel();
      try {
        const api = window.license;
        if (!api?.checkStatus) {
          pushAssistantStatusMessage(tp('licenseCheckUnavailable'));
          return;
        }
        const status = await api.checkStatus();
        const lines = [];
        if (!status || status.valid === false) {
          lines.push(tp('licenseStatusInactive'));
          if (status?.message) lines.push(status.message);
        } else {
          lines.push(tp('licenseStatusCurrent'));
          if (status.licenseType) lines.push(tp('licenseType', { value: status.licenseType }));
          if (status.endDate) lines.push(tp('licenseEndDate', { value: status.endDate }));
          if (Number.isFinite(Number(status.daysRemaining))) lines.push(tp('licenseDaysRemaining', { value: Number(status.daysRemaining) }));
          if (status.warning) lines.push(tp('licenseWarning', { value: status.warning }));
        }
        pushAssistantStatusMessage(lines.join('\n'), 'knowledge');
      } catch (error) {
        pushAssistantStatusMessage(tp('licenseCheckFailed', { error: error?.message || tp('unexpectedError') }));
      }
      return;
    }

    if (action.type === 'focus_screen_info' && action.tabId) {
      await performAction({
        type: 'open_tab',
        tabId: action.tabId,
        label: action.label,
        screenParams: action.screenParams,
      });
      return;
    }

    if (action.type === 'open_tab' && action.tabId) {
      const tab = document.getElementById(action.tabId);
      if (tab) {
        applyScreenParams(action.screenParams || null);
        tab.click();
        openPanel();
        pushMessage({
          role: 'assistant',
          routeKey: 'command',
          route: 'command',
          time: nowTime(),
          rawText: tp('screenOpened', { label: action.label || tp('screenRequestedFallback') }),
          text: decorateAssistantText(tp('screenOpened', { label: action.label || tp('screenRequestedFallback') }), 'command'),
          actions: [],
        });
      }
    }
  }

  function getFormSettings() {
    return {
      enabled: Boolean(dom.providerEnabled?.checked),
      provider: dom.providerSelect?.value || 'groq',
      model: dom.providerModel?.value || '',
      endpoint: dom.providerEndpoint?.value || '',
      apiKey: dom.providerApiKey?.value || '',
      systemPrompt: dom.providerSystemPrompt?.value || '',
      temperature: Number(dom.providerTemperature?.value || 0.2),
    };
  }

  function applySettingsToForm(settings = {}) {
    state.settings = settings;
    if (dom.providerEnabled) dom.providerEnabled.checked = settings.enabled !== false;
    if (dom.providerSelect) dom.providerSelect.value = settings.provider || 'groq';
    if (dom.providerModel) dom.providerModel.value = settings.model || '';
    if (dom.providerEndpoint) dom.providerEndpoint.value = settings.endpoint || '';
    if (dom.providerApiKey) dom.providerApiKey.value = settings.apiKey || '';
    if (dom.providerSystemPrompt) dom.providerSystemPrompt.value = settings.systemPrompt || '';
    if (dom.providerTemperature) dom.providerTemperature.value = Number.isFinite(Number(settings.temperature)) ? String(settings.temperature) : '0.2';
    setProviderStatus(settings);
  }

  function renderPresets(presets = {}) {
    state.presets = presets || {};
    if (!dom.providerSelect) return;
    const options = Object.values(presets).map((preset) => `<option value="${escapeHtml(preset.provider)}">${escapeHtml(preset.label)}</option>`).join('');
    dom.providerSelect.innerHTML = options;
  }

  function maybeApplyPreset(force = false) {
    const provider = dom.providerSelect?.value || 'groq';
    const preset = state.presets[provider];
    if (!preset) return;
    if (dom.providerEndpoint && (force || !String(dom.providerEndpoint.value || '').trim())) {
      dom.providerEndpoint.value = preset.endpoint || '';
    }
    if (dom.providerModel && (force || !String(dom.providerModel.value || '').trim())) {
      dom.providerModel.value = preset.model || '';
    }
  }

  async function loadSettings() {
    const api = getAssistantApi();
    if (!api?.getProviderSettings) {
      setProviderStatus({ enabled: false }, { routeLabel: tp('providerApiUnavailable') });
      return;
    }

    try {
      const result = await api.getProviderSettings();
      renderPresets(result?.presets || {});
      applySettingsToForm(result?.settings || {});
    } catch (error) {
      setProviderStatus({ enabled: false }, { routeLabel: tp('providerSettingsLoadFailed') });
    }
  }

  async function saveSettings() {
    const api = getAssistantApi();
    if (!api?.saveProviderSettings) return;
    setProviderResult(tp('providerSaving'));
    try {
      const result = await api.saveProviderSettings(getFormSettings());
      if (result?.success) {
        renderPresets(result.presets || state.presets);
        applySettingsToForm(result.settings || getFormSettings());
        setProviderResult(tp('providerSaved'), 'success');
      } else {
        setProviderResult(result?.error || tp('providerSaveFailed'), 'error');
      }
    } catch (error) {
      setProviderResult(error?.message || tp('providerSaveFailed'), 'error');
    }
  }

  async function testSettings() {
    const api = getAssistantApi();
    if (!api?.testProvider) return;
    setProviderResult(tp('providerTesting'));
    dom.providerTest.disabled = true;
    try {
      const result = await api.testProvider(getFormSettings());
      if (result?.success) {
        setProviderResult(result.message || tp('providerTestSuccess'), 'success');
      } else {
        setProviderResult(result?.error || tp('providerTestFailed'), 'error');
      }
    } catch (error) {
      setProviderResult(error?.message || tp('providerTestFailed'), 'error');
    } finally {
      dom.providerTest.disabled = false;
    }
  }

  async function sendMessage(prefilledMessage = '') {
    syncUserScopedSessionState();
    if (state.pending) return;
    const api = getAssistantApi();
    const text = String(prefilledMessage || dom.input?.value || '').trim();
    if (!text) return;
    const historyPayload = buildConversationHistoryPayload();

    openPanel();
    if (isClearChatRequest(text)) {
      if (!prefilledMessage && dom.input) {
        dom.input.value = '';
      }
      clearConversation(tp('deletedChat'));
      dom.input?.focus();
      return;
    }

    pushMessage({ role: 'user', time: nowTime(), text, rawText: text, actions: [] });
    if (!prefilledMessage && dom.input) {
      dom.input.value = '';
    }

    state.pending = true;
    dom.send.disabled = true;
    setMetaNoteKey('processing');
    state.messages.push({ type: 'typing' });
    renderMessages();

    try {
      if (!api?.chat) {
        throw new Error(tp('assistantApisUnavailable'));
      }
      const activeTab = document.querySelector('.sidebar .tab.active');
      const currentBranch = getCurrentBranchSnapshot();
      const branchScope = getCurrentBranchScopeSnapshot();
      const result = await api.chat({
        message: text,
        history: historyPayload,
        conversationState: state.conversationState || null,
        routeHint: state.routeHint || 'auto',
        activeTabId: activeTab?.id || null,
        activeTabLabel: activeTab?.textContent?.trim() || null,
        currentBranch: currentBranch || null,
        branchScope: branchScope || null,
      });
      removeTypingMessage();
      state.conversationState = result?.conversationState || state.conversationState || null;
      persistConversationState();
      const resultActions = Array.isArray(result?.actions) ? result.actions : [];
      if (resultActions.some((action) => action?.type === 'clear_chat')) {
        clearConversation(tp('deletedChat'));
        removeTypingMessage();
      }
      state.lastResolvedRoute = result?.route || '';
      pushMessage({
        role: 'assistant',
        routeKey: result?.route || '',
        route: mapRouteLabel(result?.route),
        time: nowTime(),
        rawText: result?.reply || tp('unableGenerateReply'),
        text: decorateAssistantText(result?.reply || tp('unableGenerateReply'), result?.route, result?.contacts, result?.attachments),
        contacts: Array.isArray(result?.contacts) ? result.contacts : [],
        attachments: Array.isArray(result?.attachments) ? result.attachments : [],
        actions: Array.isArray(result?.actions) ? result.actions : [],
      });
      setProviderStatus(state.settings || {}, { routeLabel: mapRouteLabel(result?.route) });
      if (result?.meta?.provider && result?.meta?.model) {
        setMetaNoteText(`${result.meta.provider} · ${result.meta.model}`);
      } else {
        setMetaNoteKey('processed');
      }
    } catch (error) {
      removeTypingMessage();
      pushMessage({
        role: 'assistant',
        routeKey: 'knowledge',
        route: mapRouteLabel('knowledge'),
        time: nowTime(),
        rawText: error?.message || tp('assistantCommunicationError'),
        text: decorateAssistantText(error?.message || tp('assistantCommunicationError'), 'knowledge'),
        actions: [{ type: 'open_provider_settings' }],
      });
      setMetaNoteKey('sendFailed');
    } finally {
      state.pending = false;
      dom.send.disabled = false;
      dom.input?.focus();
    }
  }

  function bindEvents() {
    dom.fab?.addEventListener('click', togglePanel);
    dom.closeBtn?.addEventListener('click', closePanel);
    dom.backdrop?.addEventListener('click', closePanel);
    dom.providerBtn?.addEventListener('click', openProviderModal);
    dom.providerClose?.addEventListener('click', closeProviderModal);
    dom.providerCancel?.addEventListener('click', closeProviderModal);
    dom.providerModal?.addEventListener('click', (event) => {
      if (event.target && event.target.hasAttribute('data-close-provider')) {
        closeProviderModal();
      }
    });
    dom.send?.addEventListener('click', () => sendMessage());
    dom.input?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
    dom.quickChips.forEach((chip) => {
      chip.addEventListener('click', () => sendMessage(chip.dataset.message || ''));
    });
    dom.routeFilters.forEach((button) => {
      button.addEventListener('click', () => setRouteHint(button.dataset.routeHint || 'auto'));
    });
    dom.providerSelect?.addEventListener('change', () => maybeApplyPreset(true));
    dom.providerSave?.addEventListener('click', saveSettings);
    dom.providerTest?.addEventListener('click', testSettings);
    dom.toggleApiKey?.addEventListener('click', () => {
      const isPassword = dom.providerApiKey?.getAttribute('type') === 'password';
      dom.providerApiKey?.setAttribute('type', isPassword ? 'text' : 'password');
      dom.toggleApiKey.textContent = isPassword ? tp('hide') : tp('show');
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'uiLang') {
        applyAssistantPanelTranslations();
      }
    });
    window.addEventListener('languageChanged', () => {
      applyAssistantPanelTranslations();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && state.isProviderOpen) {
        closeProviderModal();
        return;
      }
      if (event.key === 'Escape' && state.isOpen) {
        closePanel();
      }
    });
  }

  function restorePanelOpenState() {
    state.isOpen = localStorage.getItem(STORAGE_KEYS.open) === 'true';
    if (state.isOpen) {
      openPanel();
    }
  }

  async function init() {
    buildMarkup();
    cacheDom();
    applyAssistantPanelTranslations();
    syncUserScopedSessionState({ force: true });
    syncPanelState();
    bindEvents();
    restorePanelOpenState();
    await loadSettings();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
