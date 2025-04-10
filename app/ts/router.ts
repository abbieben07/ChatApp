import { getProperty } from 'dot-prop'
import { $navigateBack, $navigateTo } from 'nativescript-vue'
import { NavigateBackOptions, NavigateToOptions } from 'nativescript-vue/dist/plugins/navigation'
import Recover from '~/pages/auth/password/Recover.vue'
import Request from '~/pages/auth/password/Request.vue'
import Reset from '~/pages/auth/password/Reset.vue'
import Home from '~/pages/Home.vue'
import Password from '~/pages/Password.vue'
import Profile from '~/pages/Profile.vue'
import Settings from '~/pages/Settings.vue'

export const routes = {
	'/home': Home,
	'/settings': Settings,
	'/settings/profile': Profile,
	'/settings/password': Password,
	'/password/request': Request,
	'/password/recover': Recover,
	'/password/reset': Reset
}

const router = {
	// @ts-ignore
	push: (path: string, options?: NavigateToOptions) => $navigateTo(getProperty(routes, path), options),
	back: (options?: NavigateBackOptions) => $navigateBack(options),
}

export default router
