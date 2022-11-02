import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'
import { unrestrictUser, updateStudentVerification } from '../services/index.js'

const controller = new Composer<CustomContext>()
controller.on('callback_query:data', async ctx => {
	const [userId, result] = ctx.callbackQuery.data.split('_')
	const verificationState = result === 'approve'
	await updateStudentVerification(
		ctx.db.students,
		Number(userId),
		verificationState
	)
	if (verificationState === true) {
		await unrestrictUser(ctx, Number(userId))
	}
	await ctx.answerCallbackQuery({
		text: ctx.i18n.t(`response.${result}`),
		show_alert: true
	})
})

export { controller }
