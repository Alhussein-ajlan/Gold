const schemaCache = {
  loadedAt: 0,
  data: null,
};

function quoteIdentifier(name = '') {
  return `"${String(name || '').replace(/"/g, '""')}"`;
}

function loadSchema(db, { force = false } = {}) {
  if (!db) {
    return { tables: [], tableMap: {}, loadedAt: Date.now() };
  }

  const cacheAge = Date.now() - Number(schemaCache.loadedAt || 0);
  if (!force && schemaCache.data && cacheAge < 30000) {
    return schemaCache.data;
  }

  const tableRows = db.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  const tables = tableRows.map((row) => {
    const tableName = String(row.name || '').trim();
    const quotedTableName = quoteIdentifier(tableName);
    const columns = db.prepare(`PRAGMA table_info(${quotedTableName})`).all();
    const foreignKeys = db.prepare(`PRAGMA foreign_key_list(${quotedTableName})`).all();
    return {
      name: tableName,
      sql: String(row.sql || '').trim(),
      columns: columns.map((column) => ({
        name: column.name,
        type: column.type,
        notNull: Number(column.notnull || 0) === 1,
        primaryKey: Number(column.pk || 0) === 1,
        defaultValue: column.dflt_value,
      })),
      columnNames: columns.map((column) => String(column.name || '').trim()).filter(Boolean),
      foreignKeys: foreignKeys.map((foreignKey) => ({
        from: foreignKey.from,
        toTable: foreignKey.table,
        toColumn: foreignKey.to,
      })),
    };
  });

  const tableMap = Object.fromEntries(tables.map((table) => [table.name, table]));

  const data = {
    loadedAt: Date.now(),
    tables,
    tableMap,
  };

  schemaCache.loadedAt = data.loadedAt;
  schemaCache.data = data;
  return data;
}

function getTableSchema(schema, tableName = '') {
  const normalizedName = String(tableName || '').trim();
  if (!normalizedName) return null;
  if (schema?.tableMap && schema.tableMap[normalizedName]) {
    return schema.tableMap[normalizedName];
  }
  return Array.isArray(schema?.tables) ? schema.tables.find((table) => table.name === normalizedName) || null : null;
}

function hasColumn(schema, tableName = '', columnName = '') {
  const table = getTableSchema(schema, tableName);
  const normalizedColumnName = String(columnName || '').trim();
  if (!table || !normalizedColumnName) return false;
  return Array.isArray(table.columnNames)
    ? table.columnNames.includes(normalizedColumnName)
    : Array.isArray(table.columns) && table.columns.some((column) => column.name === normalizedColumnName);
}

function summarizeSchema(schema) {
  const tables = Array.isArray(schema?.tables) ? schema.tables : [];
  return tables
    .slice(0, 12)
    .map((table) => `${table.name}: ${table.columns.map((column) => column.name).slice(0, 6).join(', ')}`)
    .join('\n');
}

module.exports = {
  getTableSchema,
  hasColumn,
  loadSchema,
  summarizeSchema,
};
