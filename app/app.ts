//import BugsnagPluginVue from '@bugsnag/plugin-vue'
import { initialize as initImage, shutDown } from '@nativescript-community/ui-image'
import { themer } from '@nativescript-community/ui-material-core'
import { init as initBackgroundHTTP } from '@nativescript/background-http'
import { Application, ApplicationEventData } from '@nativescript/core'
import Theme from '@nativescript/theme'
import mitt from 'mitt'
import { createApp, h } from 'nativescript-vue'
import { setActivePinia } from 'pinia'
import setupElements from '~/ts/elements'
import http from '~/ts/http'
import router from '~/ts/router'
import setupPinia, { useSettingsStore } from '~/ts/store'
import setupVeeValidate from '~/ts/validation'
import { checkAppVersionForUpdate, error, renderer, startup, submit } from '~/utils/misc'
import setupPlatformCSS from './utils/platform'

// if (process.env.APP_ENV === 'local' && __DEV__) {
// 	const { initDevtools } = await import('@nativescript/devtools')
// 	initDevtools()
// }

initBackgroundHTTP()
setupPlatformCSS()
initImage({ isDownscaleEnabled: true })

export const emitter = mitt<any>()

const app = createApp({
	render: () => h('Frame', h(startup())),
})

setupVeeValidate()
setupElements(app)
const pinia = setupPinia()
app.use(pinia)
setActivePinia(pinia)

app.config.globalProperties.$router = router
app.config.globalProperties.$http = http
app.config.globalProperties.$emitter = emitter
app.config.globalProperties.$submit = submit
app.config.globalProperties.$settings = useSettingsStore()
app.config.globalProperties.$error = error
app.config.globalProperties.$render = renderer

app.config.errorHandler = (err, _vm, _info) => error(err, null)
app.config.warnHandler = (msg, _vm, _info) => error(msg, null)

//app.config.performance = __DEV__

if (__ANDROID__) {
	Application.android.on('activityCreated', function activityCreated(_args) {
		android.os.StrictMode.setThreadPolicy(new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build())
	})
}
if (__APPLE__) {
	Application.ios.delegate = require('./application.ios').default

	themer.setPrimaryColor('#04567c')
	themer.setAccentColor('#e4f0ff')
	themer.setSecondaryColor('#556575')
}

//if (process.env.APP_ENV !== 'local') {
//Bugsnag.start({
//apiKey: process.env.BUGSNAG_API_KEY as string,
//plugins: [new BugsnagPluginVue()],
//releaseStage: process.env.APP_ENV,
//})
//@ts-ignore
//app.use(Bugsnag.getPlugin('vue'))
//}

app.start()

Theme.setMode(Theme.Light)

let interval = 0

Application.on(Application.resumeEvent, (_e: ApplicationEventData) => {
	checkAppVersionForUpdate()
})

Application.on(Application.exitEvent, (_e: ApplicationEventData) => {
	//sessionOut()
	shutDown()
	clearInterval(interval)
})
