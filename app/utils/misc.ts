import { alert } from '@nativescript-community/ui-material-dialogs'
import { BiometricAuth } from '@nativescript/biometrics'
import { Application, Utils } from '@nativescript/core'
import { create } from '@nativescript/imagepicker'
import { SecureStorage } from '@nativescript/secure-storage'
import { compareVersions } from 'compare-versions'
import { toDecimal } from 'dinero.js'
import { NumberFormat } from 'intl'
import { $navigateTo } from 'nativescript-vue'
import { emitter } from '~/app'
import Login from '~/pages/auth/Login.vue'
import Home from '~/pages/Home.vue'
import { useCrashlytics, useRemoteConfig } from '~/ts/firebase'
import { useSettingsStore } from '~/ts/store'

export const submit = ({ valid, errors }) => (valid ? Promise.resolve(valid) : Promise.reject(errors))

export const error = (error: any, context?: any, banner: boolean = false) => {
	if (banner) {
		emitter.emit('showBanner', { message: error?.message, style: 'warning' })
	}

	if (__DEV__) {
		console.error(error?.message ?? error)
	}

	if (__ANDROID__) {
		com.bugsnag.android.Bugsnag.notify(error)
	} else if (__APPLE__) {
		Bugsnag.notifyError(error)
	}

	if (context) {
		context.message = error?.message
		// @ts-ignore
		context.form.setErrors(error?.errors)
	}

	try {
		const crashlytics = useCrashlytics()
		crashlytics.log(error?.message)
		//crashlytics.recordError(error)
	} catch (e) {
		console.error(e)
	}
}

Application.on(Application.uncaughtErrorEvent, (e) => {
	if (__APPLE__ && process.env.APP_ENV === 'local') return
	try {
		const crashlytics = useCrashlytics()
		crashlytics.recordError(e.error)

		if (__ANDROID__) {
			com.bugsnag.android.Bugsnag.notify(e.android)
			crashlytics.recordError(e.android)
		}

		if (__APPLE__) {
			// @ts-ignore
			Bugsnag.notifyError(e.ios)
			crashlytics.recordError(e.ios)
		}
	} catch (e) {
		error(e)
	}
})

export const startup = () => {
	const storage = new SecureStorage()
	const settings_data = storage.getSync({ key: 'settings' })
	if (!Utils.isNullOrUndefined(settings_data)) {
		const settings = JSON.parse(settings_data)
		if (!Utils.isNullOrUndefined(settings.token)) {
			return Home
		}
	}

	return Login
}

export const sessionOut = () => {
	useSettingsStore().removeToken()
}

export const logOut = () => {
	sessionOut()
	try {
		$navigateTo(Login, { clearHistory: true })
	} catch (e) {
		error(e)
	}
}

export function createFormatter(transformer) {
	return function formatter(dineroObject) {
		return toDecimal(dineroObject, transformer)
	}
}

export const renderer = {
	money: createFormatter(({ value, currency }) => new NumberFormat('en-NG', { style: 'currency', currency: currency.code }).format(value)),
}

export function parseMoney(money: string): number {
	// Extract currency code and amount using regular expressions
	money = money.replace(/[,\.]/g, '')
	const matches = money.match(/\d+/)
	if (!matches || matches.length !== 1) {
		throw new Error('Invalid money string format: ' + money)
	}

	return parseInt(matches[0])
}

export function useBiometric() {
	return new BiometricAuth()
}

export function usePicker(config) {
	return create(config)
}

export function requestPermission() {
	if (__ANDROID__) {
		const context = Utils.android.getApplicationContext()
		const packageName = context.getPackageName()
		const activity = Application.android.foregroundActivity || Application.android.startActivity

		// Request IGNORE_BATTERY_OPTIMIZATIONS
		const PowerManager = context.getSystemService(android.content.Context.POWER_SERVICE)
		if (!PowerManager.isIgnoringBatteryOptimizations(packageName)) {
			const batteryIntent = new android.content.Intent(android.provider.Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, android.net.Uri.parse('package:' + packageName))

			activity.startActivity(batteryIntent)
		} else {
			console.log('✅ Battery optimization is already ignored.')
		}

		const AlarmManager = context.getSystemService(android.content.Context.ALARM_SERVICE)

		// Check if the permission is already granted
		if (android.os.Build.VERSION.SDK_INT >= 31) {
			// Android 12+
			if (!AlarmManager.canScheduleExactAlarms()) {
				const intent = new android.content.Intent(android.provider.Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM)
				intent.setData(android.net.Uri.parse('package:' + context.getPackageName()))
				activity.startActivity(intent)
			} else {
				console.log('✅ Exact Alarm permission already granted.')
			}
		} else {
			console.log('⚠️ Exact Alarm permission is not required below Android 12.')
		}

		if (android.os.Build.VERSION.SDK_INT >= 30) {
			const packageManager = context.getPackageManager()
			//const appOpsManager = context.getSystemService(android.content.Context.APP_OPS_SERVICE)

			try {
				//packageManager.setAutoRevokeWhitelisted(packageName, true)
				const autoRevokeEnabled = packageManager.isAutoRevokeWhitelisted(packageName)

				if (autoRevokeEnabled) {
					alert({
						title: 'Permissions Auto-Reset Detected',
						message: 'To ensure full app functionality, please disable "Remove permissions if unused" for this app.',
						okButtonText: 'Go to Settings',
					}).then(() => {
						const context = Utils.android.getApplicationContext()
						const intent = new android.content.Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS, android.net.Uri.parse('package:' + context.getPackageName()))
						intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
						activity.startActivity(intent)
					})
				}
			} catch (e) {
				console.error('Error checking auto-revoke status', e)
			}
		}
	}
}

export function getVersion(): string {
	if (__ANDROID__) {
		const context = Utils.android.getApplicationContext()
		const packageManager = context.getPackageManager()
		const packageInfo = packageManager.getPackageInfo(context.getPackageName(), 0)
		return packageInfo.versionName
	} else if (__APPLE__) {
		return NSBundle.mainBundle.objectForInfoDictionaryKey('CFBundleShortVersionString')
	} else {
		return ''
	}
}

export function checkAppVersionForUpdate() {
	//console.log('Checking for app update...', process.env.APP_NAME, __APPLE__)
	//if (process.env.APP_ENV === 'local' || __APPLE__) return

	useRemoteConfig()
		.fetch(1000)
		.then(() => {
			const version = getVersion()

			if (__ANDROID__) {
				const min_version = useRemoteConfig().getString('android_min_version')
				const result = compareVersions(version, min_version)

				if (result === -1) {
					alert({
						title: 'Google Play Update Required',
						message: 'Please update your app to the latest version to continue using the app.',
						okButtonText: 'Update',
						cancelable: false,
					}).then(() => {
						const context = Utils.android.getApplicationContext()
						const name = context.getPackageName()
						const activity = Application.android.foregroundActivity || Application.android.startActivity
						const intent = new android.content.Intent(android.content.Intent.ACTION_VIEW)
						intent.setData(android.net.Uri.parse(`https://play.google.com/store/apps/details?id=${name}`))
						intent.setPackage('com.android.vending')
						activity.startActivity(intent)
					})
				}
			} else {
				const min_version = useRemoteConfig().getString('ios_min_version')
				const result = compareVersions(version, min_version)

				if (result === -1) {
					alert({
						title: 'App Store Update Required',
						message: 'Please update your app to the latest version to continue using the app.',
						okButtonText: 'Update',
						cancelable: false,
					}).then(() => {
						const url = NSURL.URLWithString(`https://apps.apple.com/us/app/6741778466?mt=8`)
						UIApplication.sharedApplication.openURLOptionsCompletionHandler(url, NSDictionary.dictionary(), () => console.log('Opened'))
					})
				}
			}
		})
}
