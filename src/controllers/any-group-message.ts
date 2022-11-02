import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'
import {
	clearMessageAndRestrict,
	getStudentVerification
} from '../services/index.js'

const controller = new Composer<CustomContext>()
controller.chatType(['group', 'supergroup']).on('message', async ctx => {
	const verified = await getStudentVerification(ctx.db.students, ctx.from.id)
	if (verified === false) {
		const success = await clearMessageAndRestrict(ctx)
		if (success) {
			await ctx.text('captcha', {
				username: ctx.from?.first_name
			})
		}
	}
})

export { controller }
