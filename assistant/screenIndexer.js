const fs = require('fs');
const path = require('path');
const { normalizeArabic } = require('./intentClassifier');
const { screenCatalog, screenFolderByTabId } = require('./screenCatalog');

const indexCache = {
  loadedAt: 0,
  projectRoot: '',
  data: null,
};

function uniqueStrings(values = []) {
  return Array.from(new Set(
    values
      .map((value) => String(value || '').trim())
      .filter(Boolean)
  ));
}

function safeReadFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (_) {
    return '';
  }
}

function listScreenFiles(folderPath, extensions = []) {
  try {
    const files = [];
    const queue = [folderPath];
    while (queue.length) {
      const currentFolder = queue.shift();
      if (!currentFolder) continue;
      const entries = fs.readdirSync(currentFolder, { withFileTypes: true });
      entries.forEach((entry) => {
        const fullPath = path.join(currentFolder, entry.name);
        if (entry.isDirectory()) {
          queue.push(fullPath);
          return;
        }
        if (entry.isFile() && extensions.includes(path.extname(entry.name).toLowerCase())) {
          files.push(fullPath);
        }
      });
    }
    return files.sort((a, b) => a.localeCompare(b));
  } catch (_) {
    return [];
  }
}

function stripTags(value = '') {
  return String(value || '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTagTexts(html = '', tagName = 'button') {
  const regex = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
  const matches = [];
  let match = null;
  while ((match = regex.exec(html)) !== null) {
    const text = stripTags(match[1]);
    if (!text || text.length < 2) continue;
    if (!/[A-Za-z0-9\u0600-\u06FF]/.test(text)) continue;
    matches.push(text);
  }
  return uniqueStrings(matches);
}

function extractAttributeValues(html = '', attribute = 'id') {
  const regex = new RegExp(`${attribute}\\s*=\\s*["']([^"']+)["']`, 'gi');
  const matches = [];
  let match = null;
  while ((match = regex.exec(html)) !== null) {
    const value = String(match[1] || '').trim();
    if (!value) continue;
    matches.push(value);
  }
  return uniqueStrings(matches);
}

function extractFunctionNames(js = '') {
  const names = [];
  const regularFunctionRegex = /function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  const arrowFunctionRegex = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g;
  const functionExpressionRegex = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?function\s*\(/g;
  let match = null;
  while ((match = regularFunctionRegex.exec(js)) !== null) {
    names.push(match[1]);
  }
  while ((match = arrowFunctionRegex.exec(js)) !== null) {
    names.push(match[1]);
  }
  while ((match = functionExpressionRegex.exec(js)) !== null) {
    names.push(match[1]);
  }
  return uniqueStrings(names).filter((value) => !['if', 'for', 'while', 'switch'].includes(value));
}

function extractWindowApiRefs(js = '') {
  const refs = [];
  const regex = /window\.([A-Za-z_$][\w$]*)/g;
  let match = null;
  while ((match = regex.exec(js)) !== null) {
    refs.push(match[1]);
  }
  return uniqueStrings(refs).filter((value) => !['location', 'document', 'localStorage', 'navigator', 'parent', 'top'].includes(value));
}

function splitIdentifierTerms(value = '') {
  const raw = String(value || '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!raw) return [];
  return uniqueStrings([raw, normalizeArabic(raw)]);
}

function expandTextTerms(values = []) {
  const collected = [];
  (values || []).forEach((value) => {
    const raw = String(value || '').trim();
    if (!raw) return;
    const normalized = normalizeArabic(raw);
    collected.push(raw, normalized);
    raw.split(/\s+/).forEach((token) => {
      if (String(token || '').trim().length >= 2) {
        collected.push(token);
      }
    });
    normalized.split(/\s+/).forEach((token) => {
      if (String(token || '').trim().length >= 2) {
        collected.push(token);
      }
    });
  });
  return uniqueStrings(collected);
}

function extractPreloadApis(projectRoot) {
  const preloadPath = path.join(projectRoot, 'preload.js');
  const content = safeReadFile(preloadPath);
  const apiMap = {};
  const blockRegex = /contextBridge\.exposeInMainWorld\('([^']+)',\s*\{([\s\S]*?)\}\);/g;
  let blockMatch = null;
  while ((blockMatch = blockRegex.exec(content)) !== null) {
    const apiName = String(blockMatch[1] || '').trim();
    const blockBody = String(blockMatch[2] || '');
    const methodRegex = /([A-Za-z_$][\w$]*)\s*:\s*\([^)]*\)\s*=>\s*ipcRenderer\.invoke\('([^']+)'/g;
    const methods = [];
    let methodMatch = null;
    while ((methodMatch = methodRegex.exec(blockBody)) !== null) {
      methods.push({ name: methodMatch[1], channel: methodMatch[2] });
    }
    apiMap[apiName] = uniqueStrings(methods.map((item) => item.name)).map((name) => {
      const found = methods.find((item) => item.name === name);
      return { name, channel: found?.channel || '' };
    });
  }
  return apiMap;
}

function prettifyFolderName(folder = '') {
  return String(folder || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function buildScreenEntry(projectRoot, folder, preloadApis = {}) {
  const screenFolderPath = path.join(projectRoot, 'screens', folder);
  const htmlPath = path.join(projectRoot, 'screens', folder, 'index.html');
  const jsPath = path.join(projectRoot, 'screens', folder, 'script.js');
  const stylePath = path.join(projectRoot, 'screens', folder, 'style.css');
  const htmlFiles = listScreenFiles(screenFolderPath, ['.html']);
  const jsFiles = listScreenFiles(screenFolderPath, ['.js']);
  const html = htmlFiles.map((filePath) => safeReadFile(filePath)).join('\n');
  const js = jsFiles.map((filePath) => safeReadFile(filePath)).join('\n');
  const tabId = Object.entries(screenFolderByTabId).find(([, value]) => value === folder)?.[0] || null;
  const catalogItem = screenCatalog.find((item) => item.tabId === tabId) || null;

  const buttonTexts = extractTagTexts(html, 'button').slice(0, 40);
  const labelTexts = extractTagTexts(html, 'label').slice(0, 60);
  const headingTexts = uniqueStrings([
    ...extractTagTexts(html, 'h1'),
    ...extractTagTexts(html, 'h2'),
    ...extractTagTexts(html, 'h3'),
    ...extractTagTexts(html, 'legend'),
  ]).slice(0, 24);
  const placeholders = extractAttributeValues(html, 'placeholder').slice(0, 60);
  const titles = extractAttributeValues(html, 'title').slice(0, 60);
  const ids = extractAttributeValues(html, 'id').slice(0, 160);
  const functionNames = extractFunctionNames(js).slice(0, 80);
  const apiRefs = extractWindowApiRefs(js).slice(0, 30);
  const apiDetails = apiRefs.map((name) => ({
    name,
    methods: Array.isArray(preloadApis[name]) ? preloadApis[name].map((method) => method.name) : [],
  }));

  const terms = uniqueStrings([
    ...expandTextTerms([folder, prettifyFolderName(folder), catalogItem?.label || '', ...(catalogItem?.aliases || [])]),
    ...expandTextTerms(headingTexts),
    ...expandTextTerms(buttonTexts),
    ...expandTextTerms(labelTexts),
    ...expandTextTerms(placeholders),
    ...expandTextTerms(titles),
    ...ids.flatMap((id) => splitIdentifierTerms(id)),
    ...functionNames.flatMap((name) => splitIdentifierTerms(name)),
    ...apiRefs.flatMap((name) => splitIdentifierTerms(name)),
  ]);

  return {
    folder,
    tabId,
    label: catalogItem?.label || prettifyFolderName(folder),
    aliases: uniqueStrings(catalogItem?.aliases || []),
    files: {
      html: fs.existsSync(htmlPath) ? htmlPath : null,
      script: fs.existsSync(jsPath) ? jsPath : null,
      style: fs.existsSync(stylePath) ? stylePath : null,
    },
    headings: headingTexts,
    buttons: buttonTexts,
    labels: labelTexts,
    placeholders,
    titles,
    ids,
    functionNames,
    apiRefs,
    apiDetails,
    matchTerms: terms.map((value) => normalizeArabic(value)).filter(Boolean),
  };
}

function buildAppIndex(projectRoot, { force = false } = {}) {
  const cacheAge = Date.now() - Number(indexCache.loadedAt || 0);
  if (!force && indexCache.data && indexCache.projectRoot === projectRoot && cacheAge < 30000) {
    return indexCache.data;
  }

  const screensRoot = path.join(projectRoot, 'screens');
  let folders = [];
  try {
    folders = fs.readdirSync(screensRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch (_) {
    folders = [];
  }

  const preloadApis = extractPreloadApis(projectRoot);
  const screens = folders.map((folder) => buildScreenEntry(projectRoot, folder, preloadApis));
  const data = {
    loadedAt: Date.now(),
    preloadApis,
    screens,
  };

  indexCache.loadedAt = data.loadedAt;
  indexCache.projectRoot = projectRoot;
  indexCache.data = data;
  return data;
}

function scoreScreenMatch(normalizedQuery, screen) {
  if (!normalizedQuery || !screen) return 0;
  let score = 0;
  const queryTokens = uniqueStrings(normalizedQuery.split(' ').filter((token) => token.length >= 2));
  const phraseMatches = uniqueStrings((screen.matchTerms || []).filter((term) => term.length >= 4 && normalizedQuery.includes(term)));

  if (normalizeArabic(screen.label) && normalizedQuery.includes(normalizeArabic(screen.label))) {
    score += 10;
  }

  screen.aliases.forEach((alias) => {
    const normalizedAlias = normalizeArabic(alias);
    if (normalizedAlias && normalizedQuery.includes(normalizedAlias)) {
      score += 9;
    }
  });

  const normalizedFolder = normalizeArabic(screen.folder.replace(/[-_]+/g, ' '));
  if (normalizedFolder && normalizedQuery.includes(normalizedFolder)) {
    score += 7;
  }

  score += Math.min(12, phraseMatches.reduce((sum, term) => sum + Math.min(4, Math.max(2, Math.ceil(term.length / 6))), 0));

  queryTokens.forEach((token) => {
    if (screen.matchTerms.includes(token)) {
      score += token.length >= 4 ? 2 : 1;
    }
  });

  return score;
}

function findBestScreen(query = '', appIndex = null) {
  const normalizedQuery = normalizeArabic(query);
  const index = appIndex || { screens: [] };
  let bestScreen = null;
  let bestScore = 0;

  for (const screen of (index.screens || [])) {
    const score = scoreScreenMatch(normalizedQuery, screen);
    if (score > bestScore) {
      bestScore = score;
      bestScreen = screen;
    }
  }

  if (!bestScreen || bestScore < 3) {
    return null;
  }

  return {
    screen: bestScreen,
    score: bestScore,
  };
}

function scoreValueMatch(normalizedQuery, value = '') {
  const normalizedValue = normalizeArabic(value);
  if (!normalizedValue) return 0;
  if (normalizedQuery.includes(normalizedValue)) return normalizedValue.length + 10;
  const tokens = uniqueStrings(normalizedQuery.split(' ').filter((token) => token.length >= 2));
  return tokens.reduce((sum, token) => sum + (normalizedValue.includes(token) ? token.length : 0), 0);
}

function findRelevantValues(query = '', values = [], limit = 8) {
  const normalizedQuery = normalizeArabic(query);
  const scored = uniqueStrings(values)
    .map((value) => ({ value, score: scoreValueMatch(normalizedQuery, value) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.value);

  if (scored.length) {
    return scored;
  }
  return uniqueStrings(values).slice(0, limit);
}

module.exports = {
  buildAppIndex,
  findBestScreen,
  findRelevantValues,
};
