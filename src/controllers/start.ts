import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'

const controller = new Composer<CustomContext>()
controller.command('start', async ctx => {
	await ctx.text('state.started', {
		username: ctx.from?.username,
		admins: ctx.admins.join(', ')
	})
})

export { controller }
