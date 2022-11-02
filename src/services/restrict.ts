import { CustomContext } from '../types/index.js'

async function unrestrictUser(ctx: CustomContext, studentId: number) {
	for (const group of ctx.groups) {
		try {
			await ctx.api.restrictChatMember(
				Number(group),
				studentId,
				{
					can_send_messages: true,
					can_send_polls: true,
					can_add_web_page_previews: true,
					can_send_media_messages: true
				},
				{
					until_date: Date.now() // Restrict forever
				}
			)
		} catch (error) {
			// console.error(`Can't unrestrict user ${studentId}`, error)
		}
	}
}

async function clearMessageAndRestrict(ctx: CustomContext) {
	try {
		await ctx.deleteMessage()
		await ctx.restrictAuthor(
			{ can_send_messages: false },
			{
				until_date: Date.now() // Restrict forever
			}
		)
		return true
	} catch {
		console.log(`Restricted`)
		return false
	}
}

export { clearMessageAndRestrict, unrestrictUser }
