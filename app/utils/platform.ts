//@ts-nocheck
import { Device, Observable, Page, Screen } from '@nativescript/core'

const setup = () => {
	let groupings = [1280, 1024, 800, 600, 540, 480, 400, 360, 320, 240]

	const getSize = (size) => {
		let foundSize = -1
		let currentDiff = -1

		for (let curSize of groupings) {
			const diff = Math.abs(curSize - size)

			if (currentDiff === -1 || diff <= currentDiff) {
				currentDiff = diff
				foundSize = curSize
			}
		}

		return foundSize
	}

	const generateClasses = () => {
		const platform = Device.os.toLowerCase()
		let classes = [platform]

		// Add size of screen
		const size = Screen.mainScreen.widthDIPs < Screen.mainScreen.heightDIPs ? Screen.mainScreen.widthDIPs : Screen.mainScreen.heightDIPs
		classes.push(`${platform}${getSize(size)}`)
		classes.push(`screen${getSize(size)}`)

		// Add device name
		const deviceName = Device.manufacturer.toLowerCase().replace(/\s/g, '') + Device.model.toLowerCase().replace(/\s/g, '')
		classes.push(deviceName)

		return classes
	}

	let classes = generateClasses()
	global.platformClass = classes

	const onPageLoad = (args) => {
		const currentPage = args.object

		classes = generateClasses()
		global.platformClass = classes

		if (currentPage) {
			currentPage.className += ' ' + classes.join(' ')
		}

		//console.log(`[Platform CSS] Injected classes: ${classes} into Page`)
	}

	// Setup Events
	Observable.on(Page.navigatingToEvent, onPageLoad)
	Observable.on(Page.showingModallyEvent, onPageLoad)
}

export default setup
