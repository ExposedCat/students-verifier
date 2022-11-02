import { startBot, connectToDb } from './index.js'
import { loadEnv, validateEnv } from '../helpers/index.js'

async function startApp() {
	try {
		loadEnv()
		validateEnv()
	} catch (error) {
		console.error(`Error occurred while loading environment:`, error)
		process.exit(1)
	}

	let database
	try {
		database = await connectToDb()
	} catch (error) {
		console.error(`Error occurred while connecting to the database:`, error)
		process.exit(2)
	}

	try {
		await startBot(database)
	} catch (error) {
		console.error(`Error occurred while starting the bot:`, error)
		process.exit(3)
	}
}

export { startApp }
