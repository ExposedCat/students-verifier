import { ObjectId, Collection } from 'mongodb'

interface Student {
	_id: ObjectId
	verified: boolean
	userId: number
}

interface Database {
	students: Collection<Student>
}

export { Student, Database }
