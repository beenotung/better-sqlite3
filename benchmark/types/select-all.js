'use strict';
exports.readonly = true; // Reading 100 rows into an array (`.all()`)

exports['better-sqlite3'] = (db, { table, columns, count }) => {
	const stmt = db.prepare(`SELECT ${columns.join(', ')} FROM ${table} WHERE rowid >= ? LIMIT 100`);
	let rowid = -100;
	return () => stmt.all((rowid += 100) % count + 1);
};

exports['better-sqlite3-proxy'] = (db, { table, columns, count }) => {
	let proxy = db.proxy
	let rows = proxy[table]
	let rowid = -100;
	return () => {
		rowid += 100
		let result = []
		for(let i = 0; i < count; i++) {
			let row = rows[rowid + i]
			if (!row) break
			result.push(Object.fromEntries(
				columns.map(column => [column, row[column]])
			))
		}
		return result
	};
};

exports['node-sqlite3'] = async (db, { table, columns, count }) => {
	const sql = `SELECT ${columns.join(', ')} FROM ${table} WHERE rowid >= ? LIMIT 100`;
	let rowid = -100;
	return () => db.all(sql, (rowid += 100) % count + 1);
};
