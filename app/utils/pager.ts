export default {
	//@ts-ignore
	install(Vue) {
		Vue.registerElement('NativePager', () => require('@nativescript-community/ui-pager').Pager)
		Vue.registerElement('PagerItem', () => require('@nativescript-community/ui-pager').PagerItem)
		Vue.component('Pager', require('@nativescript-community/ui-pager/vue/pager').default)
	},
}
