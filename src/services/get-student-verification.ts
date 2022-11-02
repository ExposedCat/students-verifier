import { Database } from '../types/index.js'

async function getStudentVerification(
	database: Database['students'],
	id: number
) {
	const user = await database.findOne({ userId: id })
	if (!user) {
		return false
	}
	return user.verified
}

export { getStudentVerification }
