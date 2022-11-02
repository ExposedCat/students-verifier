import { CustomContext } from '../types/index.js'

import { Composer } from 'grammy'
import {
	getStudentVerification,
	sendVerificationRequests
} from '../services/index.js'

const controller = new Composer<CustomContext>()
controller.chatType('private').on('msg:photo', async ctx => {
	const verification = await getStudentVerification(
		ctx.db.students,
		ctx.from.id
	)
	if (verification === false) {
		const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id
		await sendVerificationRequests(
			ctx.from.id,
			ctx.from.first_name,
			ctx,
			photo
		)
	}
})

export { controller }
