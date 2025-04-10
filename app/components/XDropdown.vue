<template>
	<StackLayout class="mb-[20dp]">
		<Label v-if="label" class="label" :text="label" :class="hasErrors ? 'error' : ''" />
		<TextField ref="textfield" class="textfield" v-bind="$attrs" :class="hasErrors ? 'error' : ''" :text="getLabel(value)" @tap="openDropdown" :editable="false" />
		<Label v-if="error" :text="error" class="info" :class="hasErrors ? 'error' : ''" />
	</StackLayout>
</template>

<script lang="ts">
import { HorizontalPosition } from '@nativescript-community/ui-popover'
import { ObservableArray } from '@nativescript/core'
import { useField } from 'vee-validate'
import { Component, Model, Prop, Ref, Setup, Vue, Watch, toNative } from 'vue-facing-decorator'
import { usePopover } from '~/ts/popover'
import XDropdownMenu, { Item } from './XDropdownMenu.vue'

@Component({
	components: {
		XDropdownMenu
	}
})
class Dropdown extends Vue {
	@Setup((props) => useField<string>(props.name, props.rules, { initialValue: props.modelValue, label: props.label }))
	field!: ReturnType<typeof useField>

	//@ts-ignore
	@Setup((props) => usePopover(XDropdownMenu, { horizPos: HorizontalPosition.CENTER, x: 0, y: 0 }))
	readonly dropdown!: ReturnType<typeof usePopover>

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object, Function], default: '' })
	readonly rules!: string

	@Prop({ default: false })
	readonly info!: string

	@Model({ type: [String, Array, Object] })
	value!: string

	@Prop({ type: [Array, Object] })
	items!: ObservableArray<Item>

	@Ref('textfield')
	readonly textfield!: any

	@Watch('value')
	onValueChange(value) {
		this.field.handleChange(value)
	}

	get error() {
		return this.field.errorMessage?.value ?? this.info
	}

	get hasErrors() {
		return this.field.errors.value.length > 0
	}

	onChange(value) {
		this.value = value
	}

	handleBlur() {
		this.field.handleBlur()
	}

	setErrors(errors: string[]) {
		this.field.setErrors(errors)
	}

	resetField() {
		this.field.resetField()
	}

	openDropdown() {
		this.dropdown.open(this.textfield.nativeView, { items: this.items, id: this.name })
	}

	getLabel(value) {
		return this.items.find((item) => item.value === value)?.label
	}

	created() {
		this.$emitter.on('dropdownSelected', async ({ value, id }) => {
			if (id !== this.name) return
			this.onChange(value)
			this.dropdown.close()
		})
	}
}

export default toNative(Dropdown)
</script>
<style scoped lang="scss">
.label {
	font-weight: 400;
	@apply text-gray-600 font-axiforma text-[14px];

	&.error {
		@apply text-red-400;
	}
}

.info {
	font-weight: 400;
	@apply text-gray-400 font-axiforma text-[12px];

	&.error {
		@apply text-red-400;
	}
}

.textfield {
	padding: 11.5dp 16dp;
	margin: 8dp;
	placeholder-color: #9CA3AF;

	@apply border-4 border-gray-100 rounded-none text-gray-600 w-full text-[16px] font-axiforma;

	&:focus {
		@apply border-green-100;
		box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.14);
	}

	&.error {
		@apply border-red-400;
	}

	&:disabled {
		@apply border-gray-200 bg-gray-100 text-gray-400 border-[1px];
	}
}
</style>
