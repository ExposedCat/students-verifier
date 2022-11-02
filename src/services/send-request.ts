import { CustomContext } from '../types/index.js'

import { InlineKeyboard } from 'grammy'

async function sendVerificationRequest(
	adminId: number,
	studentId: number,
	studentName: string,
	ctx: CustomContext,
	photo: string
) {
	const keyboard = new InlineKeyboard()
		.text('Approve', `${studentId}_approve`)
		.row()
		.text('Reject', `${studentId}_reject`)

	try {
		await ctx.api.sendPhoto(adminId, photo, {
			reply_markup: keyboard,
			parse_mode: 'HTML',
			caption: ctx.i18n.t('request', {
				studentId,
				studentName
			})
		})
		return true
	} catch {
		return false
	}
}

async function sendVerificationRequests(
	studentId: number,
	studentName: string,
	ctx: CustomContext,
	photo: string
) {
	for (const admin of ctx.admins) {
		sendVerificationRequest(admin, studentId, studentName, ctx, photo)
	}
}

export { sendVerificationRequest, sendVerificationRequests }
