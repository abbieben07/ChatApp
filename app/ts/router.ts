import { getProperty } from 'dot-prop'
import { $navigateBack, $navigateTo } from 'nativescript-vue'
import { NavigateBackOptions, NavigateToOptions } from 'nativescript-vue/dist/plugins/navigation'

export const routes = {}

const router = {
	// @ts-ignore
	push: (path: string, options?: NavigateToOptions) => $navigateTo(getProperty(routes, path), options),
	back: (options?: NavigateBackOptions) => $navigateBack(options),
}

export default router
