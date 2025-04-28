const { relative } = require('path')
const webpack = require('@nativescript/webpack')
const symbolsParser = require('scss-symbols-parser')
const fs = require('fs')
const { toSfnt } = require('woff-tools')
const Fontmin = require('@nativescript-community/fontmin')

function addFontAwesomeIcons(prod = false) {
	const pathsToFonts = []
	pathsToFonts.push(relative(webpack.Utils.project.getProjectFilePath('node_modules'), require.resolve('@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf')))
	pathsToFonts.push(relative(webpack.Utils.project.getProjectFilePath('node_modules'), require.resolve('@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf')))
	pathsToFonts.push(relative(webpack.Utils.project.getProjectFilePath('node_modules'), require.resolve('@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf')))
	const icons = getFontAwesomeStyleIconsByModule('@fortawesome/fontawesome-free/scss/_variables.scss', '$fa-var-')
	addFontsConfig(icons, 'fa-', pathsToFonts, prod)

	webpack.Utils.addCopyRule({
		from: '@fortawesome/fontawesome-free/css/fontawesome.css',
		to: 'font-awesome/css',
		context: webpack.Utils.project.getProjectFilePath('node_modules'),
		force: true,
	})
}
exports.addFontAwesomeIcons = addFontAwesomeIcons

function addBootstrapIcons(prod = false) {
	fs.writeFileSync('misc/bootstrap-icons.ttf', toSfnt(fs.readFileSync(webpack.Utils.project.getProjectFilePath('node_modules') + '/bootstrap-icons/font/fonts/bootstrap-icons.woff')))

	const pathsToFonts = []
	pathsToFonts.push(relative(webpack.Utils.project.getProjectFilePath('node_modules'), './misc/bootstrap-icons.ttf'))
	const icons = getMDIStyleIcons('bootstrap-icons/font/bootstrap-icons.scss', '$bootstrap-icons-map')
	addFontsConfig(icons, 'bi-', pathsToFonts, prod)
	webpack.Utils.addCopyRule({
		from: 'bootstrap-icons/font/bootstrap-icons.css',
		to: 'bootstrap-icons/',
		context: webpack.Utils.project.getProjectFilePath('node_modules'),
		force: true,
	})
}

exports.addBootstrapIcons = addBootstrapIcons

function addFontsConfigCustom(options) {
	if (!(0, fs.existsSync)(options?.pathToFont)) {
		throw new Error('Font file does not exist:' + options?.pathToFont)
	}
	let icons
	if (options.tokenScss) {
		icons = getFontAwesomeStyleIcons(options.tokenScss, options.tokenScssPrefix ? options.tokenScssPrefix : '$')
	}
	const pathToFont = relative(webpack.Utils.project.getProjectFilePath('node_modules'), options?.pathToFont)
	addFontsConfig(options.tokenValues ?? icons, options.tokenPrefix, [pathToFont], options?.stripCharactersFromFont, options?.extraCharacters)
}

exports.addFontsConfigCustom = addFontsConfigCustom

function addFontsConfig(iconsFromScss, inAppPrefix, fontLocation, forceStripFromFont, extraCharacters = '') {
	//webpack.Utils.. lo('Path to Fonts', fontLocation)
	webpack.chainWebpack((config) => {
		const iconsUsedInApp = []
		if (iconsFromScss) {
			config.module
				.rule('Process Font' + inAppPrefix)
				.test(/\.(ts|js|xml|html|vue)$/)
				.exclude.add(/node_modules/)
				.end()
				.use('string-replace-loader')
				.loader('string-replace-loader')
				.options({
					search: inAppPrefix + '([a-z-0-9]+)',
					replace: (match, p1) => {
						if (iconsFromScss[p1]) {
							const unicodeHex = iconsFromScss[p1]
							const numericValue = parseInt(unicodeHex, 16)
							const character = fixedFromCharCode(numericValue)
							iconsUsedInApp.push(character)
							return character
						}
						return match
					},
					flags: 'g',
				})
		}
		iconsUsedInApp.push(...extraCharacters)
		for (const fontPath of fontLocation) {
			config.plugin('CopyWebpackPlugin').tap((args) => {
				args[0].patterns.push({
					from: fontPath,
					to: 'fonts',
					transform: {
						transformer: (content) => {
							if (forceStripFromFont) {
								return processFont(iconsUsedInApp.join(''), content)
							} else {
								return content
							}
						},
					},
					context: webpack.Utils.project.getProjectFilePath('node_modules'),
				})
				return args
			})
		}
	})
}

function processFont(glyphs, content) {
	return new Promise((resolvePromise, reject) => {
		new Fontmin()
			.src(content)
			.use(Fontmin.glyph({ text: glyphs }))
			.run(function (err, files) {
				if (err) {
					reject(err)
				} else {
					resolvePromise(files[0].contents)
				}
			})
	})
}

function getFontAwesomeStyleIconsByModule(modulePath, variablesPrefix) {
	const variablesPath = require.resolve(modulePath)
	return getFontAwesomeStyleIcons(variablesPath, variablesPrefix)
}
function getFontAwesomeStyleIcons(variablesPath, variablesPrefix) {
	const fontAwesomeSymbols = symbolsParser.parseSymbols((0, fs.readFileSync)(variablesPath).toString())
	return fontAwesomeSymbols.variables.reduce(function (acc, value) {
		const fromSCSS = value.value.replace(/[^0-9a-fA-F]/g, '')
		acc[value.name.replace(variablesPrefix, '')] = fromSCSS
		return acc
	}, {})
}
function getMDIStyleIcons(variablesScss, variableName) {
	const result = {}
	const variablesPath = require.resolve(variablesScss)
	const fontAwesomeSymbols = symbolsParser.parseSymbols((0, fs.readFileSync)(variablesPath).toString())
	const variable = fontAwesomeSymbols.variables.find((value) => value.name === variableName)
	if (variable) {
		const v = variable.value.split(',\n')
		for (const value of v) {
			const entry = value.trimStart().split(' ')
			result[entry[0].replace('"', '').replace('"', '')] = entry[1] // fix this
		}
	}
	return result
}
function fixedFromCharCode(codePt) {
	if (codePt > 0xffff) {
		codePt -= 0x10000
		return String.fromCharCode(0xd800 + (codePt >> 10), 0xdc00 + (codePt & 0x3ff))
	} else {
		return String.fromCharCode(codePt)
	}
}
