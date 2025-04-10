import { FontIcon, fonticon } from '@nativescript-community/fonticon'
import { installMixins as installSystemUI } from '@nativescript-community/systemui'
import { install as installChart } from '@nativescript-community/ui-chart'
import Image from '@nativescript-community/ui-image/vue'
import LottieView from '@nativescript-community/ui-lottie/vue'
import ButtonPlugin from '@nativescript-community/ui-material-button/vue'
import { installMixins } from '@nativescript-community/ui-material-core'
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue'
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue'
import { Application, XmlParser } from '@nativescript/core'
import { App, NSVElement } from 'nativescript-vue'

const setupElements = (App: App<NSVElement>) => {
	installMixins()
	//installBottomSheet()
	//installRichText()
	installChart()
	installSystemUI()

	//@ts-ignore
	FontIcon.debug = __DEV__
	FontIcon.paths = {
		fa: 'font-awesome/css/fontawesome.css',
		//bi: 'bootstrap-icons/bootstrap-icons.css',
	}
	FontIcon.loadCssSync()
	Application.setResources({ fonticon })

	App.config.globalProperties.$fonticon = map
	//App.config.globalProperties.$showBottomSheet = useBottomSheet().showBottomSheet
	//App.config.globalProperties.$closeBottomSheet = useBottomSheet().closeBottomSheet

	//App.use(SwitchPlugin)
	App.use(ButtonPlugin)
	//App.use(BottomNavigationBar)
	//App.use(BottomSheetPlugin)
	//App.use(TabsPlugin)
	//App.use(CollectionView)
	//App.use(Pager)
	//App.use(DateTimePicker)
	//App.use(TextFieldPlugin)
	App.use(LottieView)
	//App.use(PopoverPlugin)
	// @ts-ignore
	//App.use(PickerField)
	//App.use(RipplePlugin)
	App.use(FloatingActionButtonPlugin)
	//App.use(CardViewPlugin)
	App.use(Image)
	App.use(ProgressPlugin)

	App.registerElement('PreviousNext', () => require('@nativescript/iqkeyboardmanager').PreviousNextView)
	App.registerElement('PullToRefresh', () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh)
	//App.registerElement('PagerIndicator', () => require('@nativescript-community/ui-pager-indicator').PagerIndicator)
	//App.registerElement('HTMLLabel', () => require('@nativescript-community/ui-label').Label)

	// /App.registerElement('LineChart', () => require('@nativescript-community/ui-chart').LineChart)
	//App.registerElement('PieChart', () => require('@nativescript-community/ui-chart').PieChart)
	App.registerElement('BarChart', () => require('@nativescript-community/ui-chart').BarChart)
}

export const map = {
	font: fonticon,
	// @ts-ignore TODO: Fix this
	icon: (v: string) => XmlParser._dereferenceEntities(`font://&#x${fonticon(v).charCodeAt(0).toString(16)};`),
}

export default setupElements
