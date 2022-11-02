import { Database } from '../types/index.js'
import { DbQueryBuilder as $ } from '../helpers/index.js'

async function updateStudentVerification(
	database: Database['students'],
	id: number,
	state: boolean
) {
	let operation = database.initializeOrderedBulkOp()

	// Create student if not exists
	operation
		.find({ userId: id })
		.upsert()
		.updateOne({
			$setOnInsert: { verified: false }
		})

	// Update student data if specified
	operation //
		.find({ userId: id })
		.updateOne(
			$.set({
				verified: state
			})
		)

	await operation.execute()
	console.log(`Set ${state} for ${id}`)
}

export { updateStudentVerification }
