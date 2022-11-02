import { Bot, CustomContext, Database } from '../types/index.js'
import { I18n } from '@grammyjs/i18n'

import { Bot as TelegramBot, session } from 'grammy'

import { resolvePath } from '../helpers/index.js'

import { initLocaleEngine } from './index.js'
import * as handlers from '../controllers/index.js'
import { createReplyWithTextFunc } from '../services/index.js'

function extendContext(bot: Bot, database: Database) {
	bot.use(async (ctx, next) => {
		ctx.text = createReplyWithTextFunc(ctx)
		ctx.db = database
		ctx.admins = process.env.ADMINS.split(',').map(Number)
		ctx.groups = process.env.GROUPS.split(',').map(Number)
		await next()
	})
}

function setupMiddlewares(bot: Bot, localeEngine: I18n) {
	bot.use(session())
	bot.use(localeEngine.middleware())
}

function setupControllers(bot: Bot) {
	bot.use(handlers.updateVerification)
	bot.use(handlers.studentId)
	bot.use(handlers.start)
	bot.use(handlers.stop)
	bot.use(handlers.any)
}

async function startBot(database: Database) {
	const localesPath = resolvePath(import.meta.url, '../locales')
	const i18n = initLocaleEngine(localesPath)
	const bot = new TelegramBot<CustomContext>(process.env.TOKEN)
	extendContext(bot, database)
	setupMiddlewares(bot, i18n)
	setupControllers(bot)
	await bot.start()
}

export { startBot }
