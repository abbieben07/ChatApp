const plugin = require('tailwindcss/plugin')
const variables = require('./misc/variables')

console.log(variables)

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{css,scss,xml,html,vue,svelte,ts,tsx}'],
	// use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) is not supported.
	darkMode: ['class', '.ns-dark'],
	theme: {
		fontFamily: {
			'dm-serif-display': ['DM Serif Display', 'DMSerifDisplay-Regular'],
			axiforma: ['Axiforma', 'Axiforma-Regular'],
			'axiforma-semibold': ['Axiforma SemiBold', 'Axiforma-SemiBold'],
			'axiforma-bold': ['Axiforma', 'Axiforma-Bold'],
			'axiforma-medium': ['Axiforma Medium', 'Axiforma-Medium'],
		},
		extend: {
			colors: {
				primary: '#0e9517',
				secondary: '#556575',
				info: '#e0a8a9',
				success: '#09b613',
				warning: '#fcc708',
				danger: '#f9034c',
				light: '#dbdde2',
				dark: '#211912',
				faint: '#e4f0ff',
				gray: {
					600: '#333333',
					500: '#4F4F4F',
					400: '#828282',
					300: '#BDBDBD',
					200: '#E0E0E0',
					100: '#F2F2F2',
					50: '#F9F9F9',
				},
				red: {
					100: '#EA3F18',
					80: '#EE6546',
					60: '#F28C74',
					40: '#F7B2A3',
					20: '#FBD9D1',
					5: '#FEF5F4',
				},
				blue: {
					100: '#9AD3F4',
					80: '#4B9BFF',
					60: '#C2E5F8',
					40: '#D7EDFB',
					20: '#EBF6FD',
					5: '#FAFDFF',
				},
				green: {
					100: '#599943',
					80: '#7AAD69',
					60: '#9BC28E',
					40: '#BDD6B4',
					20: '#DEEBD9',
					5: '#F7FAF6',
				},
				yellow: {
					100: '#FFB41F',
					80: '#FFCF70',
					60: '#FFD279',
					40: '#FFE1A5',
					20: '#FFF0D2',
					5: '#FFFBF4',
				},
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('android', '.ns-android &')
			addVariant('ios', '.ns-ios &')
			addVariant('small', breakpoints([320, 240, 360]))
			addVariant('medium', breakpoints([600, 540, 480, 400]))
			addVariant('large', breakpoints([1280, 1024, 800]))
		}),
	],
	corePlugins: {
		preflight: false, // disables browser-specific resets
	},
}

const breakpoints = (data) => data.map((value) => `.screen${value} &`)
