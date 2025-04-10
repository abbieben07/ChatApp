/* eslint-disable no-undef */
// @ts-nocheck
import { isAndroid } from '@nativescript/core'
import Theme from '@nativescript/theme'

const theme = () => {
	switch ('') {
		default:
		case 'auto':
			Theme.setMode(Theme.Auto)
			if (isAndroid) {
				androidx.appcompat.app.AppCompatDelegate.setDefaultNightMode(androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
			}
			break
		case 'light':
			Theme.setMode(Theme.Light)
			if (isAndroid) {
				androidx.appcompat.app.AppCompatDelegate.setDefaultNightMode(androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_NO)
			}
			break
		case 'dark':
			Theme.setMode(Theme.Dark)
			if (isAndroid) {
				androidx.appcompat.app.AppCompatDelegate.setDefaultNightMode(androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_YES)
			}
			break
	}
}

export default theme
