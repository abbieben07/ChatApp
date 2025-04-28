//import { ApplicationSettings } from '@nativescript/core'
import { SecureStorage } from '@nativescript/secure-storage'
//import currency from 'currency.js'
import { merge } from 'lodash'
import { DateTime } from 'luxon'
import { acceptHMRUpdate, createPinia, defineStore } from 'pinia'
import { createORM } from 'pinia-orm'
import PersistedState from 'pinia-plugin-persistedstate'

// @todo: use secure storage
const storage = new SecureStorage()
export const AppStorage = {
	getItem(key: string): string | null {
		//return ApplicationSettings.getString(key)
		return storage.getSync({ key })
	},
	setItem(key: string, value: string): void {
		//ApplicationSettings.setString(key, value)
		storage.setSync({ key, value })
	},
}

export const useUserStore = defineStore('user', {
	state: () => ({ user: {} }),
	getters: {
		getUser: (state) => state.user,
	},
	actions: {
		setUser(user) {
			this.user = merge(this.user, user)
		},
	},
	persist: {
		storage: AppStorage,
	},
})

export const useSettingsStore = defineStore('settings', {
	state: () => ({ notifications: false, token: null, biometrics: { enrolled: false, enabled: null, text: '', vector: '' }, records: { total: 0, count: 0 }, models: { locations: 0 }, clock: { started_at: null, stopped_at: null } }),
	getters: {
		getNotifications: (state) => state.notifications,
		getToken: (state) => state.token,
		getRecords: (state) => state.records,
		getRecordsProgress: (state) => (state.records.total > 0 ? Math.round((state.records.count / state.records.total) * 100) : 0),
		getLocationsLastID: (state) => state.models.locations,
		getBiometricText: (state) => state.biometrics.text,
		getBiometricVector: (state) => state.biometrics.vector,
		getClockedIn: (state) => !!state.clock.started_at,
		getClockedOut: (state) => !!state.clock.stopped_at,
		isClockedToday: (state) => {
			if (!state.clock.started_at || !state.clock.stopped_at) {
				return false
			}

			const today = DateTime.now()

			return today.hasSame(state.clock.started_at, 'day') || today.hasSame(state.clock.stopped_at, 'day')
		},
	},
	actions: {
		setToken(token: string) {
			this.token = token
		},
		removeToken() {
			this.token = null
		},
		setRecordsTotal(total: number) {
			this.records.total = total
		},
		setRecordsCount() {
			this.records.count++
		},
		resetRecords() {
			this.records.count = 0
			this.records.total = 0
		},
		setLocationsLastID(id: number) {
			this.models.locations = id
		},
		setBiometricsEnrolled(enrolled: boolean) {
			this.biometrics.enrolled = enrolled
		},
		setBiometricsText(text: string, vector: string) {
			this.biometrics.text = text
			this.biometrics.vector = vector
		},
		setBiometricsEnabled(state: boolean) {
			this.biometrics.enabled = state
		},
		setNotificationsEnabled(state: boolean) {
			this.notifications = state
		},
		resetClock() {
			this.clock.started_at = null
			this.clock.stopped_at = null
		},
		clockIn() {
			this.clock.started_at = DateTime.now()
		},
		clockOut() {
			this.clock.stopped_at = DateTime.now()
		},
	},
	persist: {
		storage: AppStorage,
	},
})

export const useFormStore = defineStore('form', {
	state: () => ({ formState: {} }),
	getters: {
		getFormState: (state) => state.formState,
	},
	actions: {
		setFormState(formState) {
			this.formState = merge(this.formState, formState)
		},
		resetForm() {
			this.formState = {}
		},
	},
})

const setupPinia = () => {
	const pinia = createPinia()
	pinia.use(createORM())
	pinia.use(PersistedState)

	//@ts-ignore
	if (import.meta.webpackHot) {
		//@ts-ignore
		import.meta.webpackHot.accept(acceptHMRUpdate(useFormStore, import.meta.webpackHot))
		//@ts-ignore
		import.meta.webpackHot.accept(acceptHMRUpdate(useSettingsStore, import.meta.webpackHot))
		//@ts-ignore
		import.meta.webpackHot.accept(acceptHMRUpdate(useUserStore, import.meta.webpackHot))
	}

	return pinia
}

export default setupPinia
