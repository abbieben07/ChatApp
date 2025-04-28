// src/types/env.d.ts
declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production'
		API_URL: string // Add other environment variables here
		APP_NAME: string
		APP_ENV: string
		BUGSNAG_API_KEY: string

		OFFICE_LATITUDE: number
		OFFICE_LONGITUDE: number
		OFFICE_RADIUS: number
		OFFICE_INTERVAL: number
		OFFICE_START: string
		OFFICE_END: string
	}
}
