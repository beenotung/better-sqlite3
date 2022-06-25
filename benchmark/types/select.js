'use strict';
exports.readonly = true; // Reading rows individually (`.get()`)

exports['better-sqlite3'] = (db, { table, columns, count }) => {
	const stmt = db.prepare(`SELECT ${columns.join(', ')} FROM ${table} WHERE rowid = ?`);
	let rowid = -1;
	return () => stmt.get(++rowid % count + 1);
};

let lib = require('better-sqlite3-proxy')
exports['better-sqlite3-proxy'] = (db, { table, columns, count }) => {
	let rowid = -1;
	let proxy = db.proxy
	let rows = proxy[table]
	return () => {
		let row = lib.find(rows, {id: ++rowid % count + 1})
		return Object.fromEntries(
			columns.map(column => [column, row[column]])
		)
	};
};

exports['node-sqlite3'] = async (db, { table, columns, count }) => {
	const sql = `SELECT ${columns.join(', ')} FROM ${table} WHERE rowid = ?`;
	let rowid = -1;
	return () => db.get(sql, ++rowid % count + 1);
};
