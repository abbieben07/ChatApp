const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const BACKUP_DIR = './misc/backup'
const CONFIG_DIR = './config'
const APP_RESOURCES_DIR = './App_Resources'

module.exports = function ($logger, $projectData, hookArgs) {
	const platform = (hookArgs.platform || hookArgs.prepareData.platform).toLowerCase()

	// Load environment variables from .env file
	const envFile = typeof hookArgs.prepareData.env.env != 'undefined' ? `.env.${hookArgs.prepareData.env.env}` : '.env'
	const envPath = path.join($projectData.projectDir, envFile)
	if (fs.existsSync(envPath)) {
		dotenv.config({ path: envPath })
	} else {
		$logger.error(`${envFile} file not found`)
		return
	}

	// Ensure backup directory exists
	if (!fs.existsSync(BACKUP_DIR)) {
		fs.mkdirSync(BACKUP_DIR)
	}

	if (platform === 'android') {
		backupAndReplaceAndroidResources($projectData, $logger)
	} else if (platform === 'ios') {
		backupAndReplaceIOSResources($projectData, $logger)
	}
}

function backupAndReplaceAndroidResources($projectData, $logger) {
	const placeholders = process.env

	// Handle app.gradle
	const gradleFilePath = path.join($projectData.projectDir, CONFIG_DIR, 'Android', 'app.gradle')
	const gradleBackupFilePath = path.join(BACKUP_DIR, 'app.gradle.bak')
	const gradleDestinationFilePath = path.join($projectData.projectDir, APP_RESOURCES_DIR, 'Android', 'app.gradle')

	if (fs.existsSync(gradleFilePath)) {
		// Create a backup copy
		fs.copyFileSync(gradleFilePath, gradleBackupFilePath)

		// Replace placeholders with environment variables
		let gradleContent = fs.readFileSync(gradleFilePath, 'utf8')
		Object.keys(placeholders).forEach((key) => {
			const placeholder = `__${key}__`
			const regex = new RegExp(placeholder, 'g')
			gradleContent = gradleContent.replace(regex, placeholders[key])
		})

		// Write modified content to the destination file
		fs.writeFileSync(gradleDestinationFilePath, gradleContent, 'utf8')
		$logger.info('\x1b[36m%s\x1b[0m', `Updated app.gradle with environment variables.`)
	} else {
		$logger.error(`app.gradle not found at ${gradleFilePath}`)
	}

	// Handle AndroidManifest.xml
	const manifestFilePath = path.join($projectData.projectDir, CONFIG_DIR, 'Android', 'AndroidManifest.xml')
	const manifestBackupFilePath = path.join(BACKUP_DIR, 'AndroidManifest.xml.bak')
	const manifestDestinationFilePath = path.join($projectData.projectDir, APP_RESOURCES_DIR, 'Android/src/main', 'AndroidManifest.xml')

	if (fs.existsSync(manifestFilePath)) {
		// Create a backup copy
		fs.copyFileSync(manifestFilePath, manifestBackupFilePath)

		// Replace placeholders with environment variables
		let manifestContent = fs.readFileSync(manifestFilePath, 'utf8')
		Object.keys(placeholders).forEach((key) => {
			const placeholder = `__${key}__`
			const regex = new RegExp(placeholder, 'g')
			manifestContent = manifestContent.replace(regex, placeholders[key])
		})

		// Write modified content to the destination file
		fs.writeFileSync(manifestDestinationFilePath, manifestContent, 'utf8')
		$logger.info('\x1b[36m%s\x1b[0m', `Updated AndroidManifest.xml with environment variables.`)
	} else {
		$logger.error(`AndroidManifest.xml not found at ${manifestFilePath}`)
	}

	// Revert back to the original files
	if (fs.existsSync(gradleBackupFilePath)) {
		fs.copyFileSync(gradleBackupFilePath, gradleFilePath)
		//fs.unlinkSync(gradleDestinationFilePath)
	}

	if (fs.existsSync(manifestBackupFilePath)) {
		fs.copyFileSync(manifestBackupFilePath, manifestFilePath)
		//fs.unlinkSync(manifestDestinationFilePath)
	}
}

function backupAndReplaceIOSResources($projectData, $logger) {
	const configFilePath = path.join($projectData.projectDir, CONFIG_DIR, 'iOS', 'Info.plist')
	const backupFilePath = path.join(BACKUP_DIR, 'Info.plist.bak')
	const destinationFilePath = path.join($projectData.projectDir, APP_RESOURCES_DIR, 'iOS', 'Info.plist')
	const placeholders = process.env

	if (fs.existsSync(configFilePath)) {
		// Create a backup copy
		fs.copyFileSync(configFilePath, backupFilePath)

		// Replace placeholders with environment variables
		let fileContent = fs.readFileSync(configFilePath, 'utf8')
		Object.keys(placeholders).forEach((key) => {
			const placeholder = `__${key}__`
			const regex = new RegExp(placeholder, 'g')
			fileContent = fileContent.replace(regex, placeholders[key])
		})

		// Write modified content to the destination file
		fs.writeFileSync(destinationFilePath, fileContent, 'utf8')
		$logger.info('\x1b[36m%s\x1b[0m', `Updated Info.plist with environment variables.`)
	} else {
		$logger.error(`Info.plist not found at ${configFilePath}`)
	}
}
