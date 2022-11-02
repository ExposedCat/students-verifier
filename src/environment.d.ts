export declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string
			DB_CONNECTION_STRING: string
			DB_NAME: string
			ADMINS: string
			GROUPS: string
		}
	}
}
