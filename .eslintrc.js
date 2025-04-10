module.exports = {
	extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier', 'plugin:@nativescript/recommended'],
	parser: 'vue-eslint-parser',
	ignorePatterns: ['**/theme/**'],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		ecmaFeatures: {
			legacyDecorators: true,
		},
		ecmaVersion: 'latest',
	},

	env: {
		browser: true,
		node: true,
		es6: true,
	},

	globals: {
		__static: true,
		__DEV__: 'readonly',
		__IOS__: 'readonly',
		__ANDROID__: 'readonly',
		android: 'readonly',
		java: 'readonly',
		androidx: 'readonly',
	},

	plugins: ['vue', '@nativescript'],

	rules: {
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: {
					max: 30,
				},
				multiline: {
					max: 30,
				},
			},
		],
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: [],
			},
		],
		'vue/singleline-html-element-content-newline': [
			'error',
			{
				ignoreWhenNoAttributes: true,
				ignoreWhenEmpty: true,
				ignores: ['pre', 'textarea', 'button', 'span', 'a', 'router-link', 'Input', 'p', 'h1', 'h4', 'option'],
			},
		],
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'any',
					normal: 'any',
					component: 'any',
				},
				svg: 'always',
				math: 'always',
			},
		],
		'vue/comment-directive': [
			'error',
			{
				reportUnusedDisableDirectives: false,
			},
		],
		'vue/multiline-html-element-content-newline': 'off',
		'vue/attribute-hyphenation': [
			'error',
			'never',
			{
				ignore: [],
			},
		],
		'no-unused-vars': 'off' /* [
			'error',
			{
				vars: 'all',
				args: 'after-used',
				ignoreRestSiblings: false,
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
			},
		], */,
	},

	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
}
