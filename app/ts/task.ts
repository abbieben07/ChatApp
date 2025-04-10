import { ApplicationSettings, CoreTypes, Utils } from '@nativescript/core'
import { getCurrentLocation, Location } from '@nativescript/geolocation'
import { LocalNotifications, ScheduleOptions } from '@nativescript/local-notifications'
import { geojsonToWKT } from '@terraformer/wkt'
import { Toasty } from '@triniwiz/nativescript-toasty'
import { DateTime } from 'luxon'
import { getActivePinia } from 'pinia'
import { useLocationRepo } from '~/models/location'
import { error } from '~/utils/misc'
import { insertOrUpdate, lastRecord } from './sqlite'

export const KEY = 'validated_at'

export const processTask = async (task?: BGTask) => {
	const origin = new Location()
	origin.latitude = process.env.OFFICE_LATITUDE
	origin.longitude = process.env.OFFICE_LONGITUDE

	Utils.executeOnUIThread(() => {
		getCurrentLocation({
			desiredAccuracy: CoreTypes.Accuracy.high,
			maximumAge: 15000,
			updateDistance: 0.1,
			updateTime: 3000,
			timeout: 60000,
			iosAllowsBackgroundLocationUpdates: true,
			iosPausesLocationUpdatesAutomatically: false,
			openSettingsIfLocationHasBeenDenied: true,
		})
			.then((location) => processLocation(origin, location))
			.then(() => processNotification())
			.catch((e) => error(e))
			.finally(() => task?.setTaskCompletedWithSuccess(true))
	})
}

export const getDistance = (location1, location2) => {
	const R = 6371e3 // Earth radius in meters
	const toRadians = (degrees) => degrees * (Math.PI / 180) // Helper function to convert degrees to radians

	const φ1 = toRadians(location1.latitude)
	const φ2 = toRadians(location2.latitude)
	const Δφ = toRadians(location2.latitude - location1.latitude)
	const Δλ = toRadians(location2.longitude - location1.longitude)

	const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	return R * c // Distance in meters
}

const processLocation = (origin: Location, location: Location) => {
	const distance = getDistance(origin, location)

	console.info('Distance:', distance.toFixed(2), 'm')

	if (distance > process.env.OFFICE_RADIUS && process.env.APP_ENV !== 'local') {
		return Promise.reject('Outside of Office')
	}

	if (!ApplicationSettings.hasKey(KEY)) {
		console.warn('Attendance Not Validated')
		return Promise.resolve()
	}

	const json: GeoJSON.Point = {
		type: 'Point',
		coordinates: [location.latitude, location.longitude],
	}

	const record = {
		point: geojsonToWKT(json),
		recorded_at: DateTime.now(),
	}

	if (!!getActivePinia()) {
		Utils.executeOnUIThread(() => saveWithPinia(record))
		return Promise.resolve()
	} else {
		return saveWithSqlite(record)
	}
}

export const processNotification = () => {
	if (ApplicationSettings.hasKey(KEY)) {
		let value = ApplicationSettings.getString(KEY)
		let date = DateTime.fromISO(value)
		if (date.plus({ hours: process.env.OFFICE_INTERVAL }) > DateTime.now()) {
			return Promise.resolve()
		}
	}

	const notification: ScheduleOptions = {
		id: 1,
		title: 'Attendance Alert',
		body: 'Click on notification bubble to validate your attendance',
		payload: {
			tag: 'attendance',
		},
		displayImmediately: true,
		forceShowWhenInForeground: true,
		silhouetteIcon: 'res://ic_launcher',
		icon: 'res://ic_launcher',
		notificationLed: true,
	}

	LocalNotifications.addOnMessageReceivedCallback((notification) => {
		if (notification.payload?.tag === 'attendance') {
			ApplicationSettings.setString(KEY, DateTime.now().toISO())
			new Toasty({ text: 'Attendance Validated', backgroundColor: '#04567c', textColor: '#ffffff' }).show()
		}
	})

	LocalNotifications.schedule([notification]).then(() => ApplicationSettings.remove(KEY))

	return Promise.resolve()
}

const saveWithPinia = (record) => {
	let lastRecord = useLocationRepo().orderBy('recorded_at', 'desc').first()

	if (lastRecord) {
		let lastTime = typeof lastRecord.recorded_at === 'string' ? DateTime.fromISO(lastRecord.recorded_at) : lastRecord.recorded_at

		console.warn(record.recorded_at, lastTime)
		if (record.recorded_at < lastTime.plus({ minute: 10 })) {
			console.warn('Record Came too Soon')
			return
		}
	}

	console.log('Saving to Pinia')

	useLocationRepo().save(record)
}

const saveWithSqlite = (record) => {
	let data = lastRecord('locations')

	if (data) {
		//@ts-ignore
		let lastTime = typeof data.recorded_at === 'string' ? DateTime.fromISO(data.recorded_at) : data.recorded_at

		console.warn(record.recorded_at, lastTime)
		if (record.recorded_at < lastTime.plus({ minute: 10 })) {
			console.warn('Record Came too Soon')
			return
		}
	}

	console.log('Saving to SQLite')

	insertOrUpdate('locations', record)
}
