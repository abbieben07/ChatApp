import { NativeScriptConfig } from '@nativescript/core'

//@ts-ignore
export default {
	id: 'com.nasrda.chat',
	appPath: 'app',
	appResourcesPath: 'App_Resources',
	android: {
		v8Flags: '--expose_gc',
		markingMode: 'none',
	},
	projectName: 'Chat360',
	cli: {
		packageManager: 'bun',
	},
	hooks: [],
	additionalPathsToClean: ['./bun.lock'],
} as NativeScriptConfig
