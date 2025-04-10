import { PopoverOptions, VerticalPosition, showPopover } from '@nativescript-community/ui-popover'
import { Screen, View } from '@nativescript/core'
import mitt from 'mitt'
import { createNativeView, ref } from 'nativescript-vue'

const popovers: any[] = []

export function usePopover(component?: any, options?: Omit<PopoverOptions, 'anchor'>) {
	const isOpen = ref()
	const isPresented = ref()

	function open(viewTarget: View, props?: any) {
		if (!isOpen.value) {
			const node = createNativeView(component, props)
			node.mount()
			const view = node.nativeView as View
			mitt().emit('dropdownWidth', viewTarget.getActualSize().width)
			//const stackLayout = new StackLayout()
			//stackLayout.addChild(view)
			isOpen.value, (isPresented.value = true)

			let verticalPosition = VerticalPosition.BELOW
			if (viewTarget.getLocationOnScreen().y > Screen.mainScreen.heightDIPs / 2) {
				verticalPosition = VerticalPosition.ABOVE
			}

			const { close } = showPopover(
				//stackLayout,
				view,
				Object.assign(
					{
						anchor: viewTarget,
						onDismiss: () => (isOpen.value, (isPresented.value = false)),
						onTapOutside: () => (isPresented.value = false),
						transparent: true,
						vertPos: verticalPosition,
					},
					options
				)
			)
			popovers.push(close)
		}
	}

	function close() {
		if (popovers.length > 0) {
			popovers[popovers.length - 1]()
			popovers.pop()
		}
	}

	return {
		isOpen,
		isPresented,
		open,
		close,
	}
}
