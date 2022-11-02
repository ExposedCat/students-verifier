import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'

const controller = new Composer<CustomContext>()
controller.command('stop', async ctx => {
	await ctx.text('state.stopped', {
		username: ctx.from?.username
	})
})

export { controller }
