import { openOrCreate } from '@nativescript-community/sqlite'
import { knownFolders } from '@nativescript/core'
//import Model from '~/models/model'

export function initDatabase() {
	const path = `${knownFolders.documents().path}/database.db`
	return openOrCreate(path)
}

// Create a table dynamically based on the model's fields
export function createTable(tableName: string, fields: Record<string, any>) {
	const db = initDatabase()
	const columns = Object.keys(fields)
		.map((key) => {
			if (key === 'id') {
				return `${key} NUMERIC PRIMARY KEY`
			}

			if (key.includes('_at')) {
				return `${key} DATETIME`
			}

			return `${key} ${fields[key].sqlType || 'TEXT'}`
		})
		.join(', ')

	const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`
	return db.execute(createTableSQL)
}

// Insert or update data in a table
export function insertOrUpdate(tableName: string, data: Record<string, any>) {
	const db = initDatabase()

	const keys = Object.keys(data).join(', ')
	const placeholders = Object.keys(data)
		.map(() => '?')
		.join(', ')
	const values = Object.values(data)

	const sql = `INSERT OR REPLACE INTO ${tableName} (${keys}) VALUES (${placeholders})`

	return db.execute(sql, values)
}

// Fetch all records from a table
export async function fetchAll(tableName: string): Promise<any[]> {
	const db = initDatabase()

	return await db.select(`SELECT * FROM ${tableName}`, [])
}

export async function lastRecord(tableName: string) {
	const db = initDatabase()

	return await db.select(`SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`, [])
}

export default function setupSqlite(models: any[]) {
	models.forEach(async (model) => {
		createTable(model.$entity(), model.$fields()).catch((e) => console.error(e))

		model.load()
	})
}
