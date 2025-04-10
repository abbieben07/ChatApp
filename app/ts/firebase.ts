// @ts-nocheck
import '@nativescript/firebase-analytics'
//import { AppCheck } from '@nativescript/firebase-app-check'
import '@nativescript/firebase-app-check'
import { Firebase, firebase } from '@nativescript/firebase-core'
import '@nativescript/firebase-crashlytics'
import '@nativescript/firebase-in-app-messaging'
import '@nativescript/firebase-messaging'
import { AuthorizationStatus } from '@nativescript/firebase-messaging-core'
import '@nativescript/firebase-performance'
import '@nativescript/firebase-remote-config'
//import { useSettingsStore } from './store'

const setupFirebase = () => {
	//AppCheck.setProviderFactory() // call before the fb app is initialized
	firebase()
		.initializeApp()
		.then((firebaseApp) => {
			firebase().appCheck().activate(true)
			firebase()
				.remoteConfig()
				.setDefaults({
					android_min_version: '0.0.1',
					ios_min_version: '0.0.1',
				})
				.then(() => firebase().remoteConfig().fetchAndActivate())
				.catch((e) => error(e))

			setupMessaging(firebase())
		})
		.catch((e) => error(e))
}

function setupMessaging(app: Firebase) {
	firebase()
		.messaging()
		.requestPermission({
			ios: {
				alert: true,
				sound: true,
			},
		})
		.then((authStatus) => {
			const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL

			if (enabled) {
				firebase()
					.messaging()
					.registerDeviceForRemoteMessages()
					.catch((e) => error(e))
			}
		})
		.catch((e) => error(e))
}

export function useCrashlytics() {
	return firebase().crashlytics()
}

export function useAnalytics() {
	return firebase().analytics()
}

export function useRemoteConfig() {
	return firebase().remoteConfig()
}

export function useMessaging() {
	return firebase().messaging()
}

export default setupFirebase
