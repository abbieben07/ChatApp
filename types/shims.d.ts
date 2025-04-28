import { Emitter } from 'mitt'
import { $navigateBack } from 'nativescript-vue'
import { map } from '~/ts/elements'
import { error } from '~/ts/firebase'
import http from '~/ts/http'
import router from '~/ts/router'
import { useSettingsStore } from '~/ts/store'
import { renderer, submit } from '~/utils/misc'

declare module 'vue' {
	export interface ComponentCustomProperties {
		$http: typeof http
		$router: typeof router
		$fonticon: typeof map
		$navigateBack: typeof $navigateBack
		$error: typeof error
		$emitter: Emitter
		$submit: typeof submit
		$settings: ReturnType<typeof useSettingsStore>
		$render: typeof renderer
	}
}
