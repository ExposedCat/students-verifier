import { Database, Student } from '../types/index.js'

import { MongoClient } from 'mongodb'

async function connectToDb() {
	const client = new MongoClient(process.env.DB_CONNECTION_STRING)
	await client.connect()
	const mongoDb = client.db()
	const students = mongoDb.collection<Student>(process.env.DB_NAME)
	const database: Database = { students }
	return database
}

export { connectToDb }
