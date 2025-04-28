/**
 * This optionally provides typehints
 * this requires "@nativescript/webpack" to be a dependency (dev)
 *
 * @param {typeof import("@nativescript/webpack")} webpack
 *
 */

const webpack = require('@nativescript/webpack')
//const { resolve } = require('path')
const { addBootstrapIcons, addFontAwesomeIcons } = require('./libs/fonticon')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
//const Dotenv = require('dotenv-webpack')

module.exports = (env) => {
	webpack.init(env)
	webpack.useConfig('vue')

	env.appComponents = (env.appComponents || []).concat(['./app/activity.android'])
	webpack.chainWebpack((config) => {
		if (webpack.Utils.platform.getPlatformName() === 'android') {
			config.entry('application').add('./app/application.android')
		}

		// change the "@" alias to "app/libs"
		//config.resolve.alias.set('vue', resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm-bundler.js'))
		// config.plugin('DefinePlugin').tap((definitions) => {
		// 	Object.assign(definitions[0], {
		// 		__VUE_OPTIONS_API__: 'true',
		// 		__VUE_PROD_DEVTOOLS__: 'false',
		// 		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
		// 	})
		// 	return definitions
		// })
		//config.plugin('Dotenv').use(Dotenv)
		config.plugin('polyfills').use(new NodePolyfillPlugin({ excludeAliases: ['console'] }))
		config.resolve.alias.set('process', require.resolve('process/browser'))
		config.resolve.alias.set('fs', false)
		config.resolve.alias.set('os', require.resolve('os-browserify/browser'))

		config.set('ignoreWarnings', (config.get('ignoreWarnings') || []).concat([/export '(UserData||Money|Dinero)' \(imported as '\1'\) was not found/]))
		config.set('ignoreWarnings', (config.get('ignoreWarnings') || []).concat([/WARNING in DefinePlugin/]))
		config.set('ignoreWarnings', (config.get('ignoreWarnings') || []).concat([/The legacy JS API is deprecated/]))
		config.set('ignoreWarnings', (config.get('ignoreWarnings') || []).concat([/Global built-in functions are deprecated/]))
		config.set('ignoreWarnings', (config.get('ignoreWarnings') || []).concat([/Module Warning/]))
		config.set('ignoreWarnings', (config.get('ignoreWarnings') || []).concat([/Conflicting values/]))
	})

	addFontAwesomeIcons(env.production)
	//addBootstrapIcons(true)

	return webpack.resolveConfig()
}
