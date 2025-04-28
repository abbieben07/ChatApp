<template>
	<StackLayout>
		<FlexboxLayout class="justify-between">
			<!-- <TextField v-for="i in count" :key="i" :ref="(e) => fields.push(e)" class="codefield" :maxLength="1" :returnKeyType="i == count ? 'done' : 'next'" keyboardType="number" @textChange="onTextChange($event, i)" @returnPress="onReturnPress(i)" :closeOnReturn="i == count" :class="style" :text="getText(i)" /> -->

			<TextField :testID="$attrs.testID" v-model="value" @textChange="onTextChange" keyboardType="number" :maxLength="length" class="codefield" />
		</FlexboxLayout>
		<Label v-if="error" :text="error" class="info" :class="hasErrors ? 'error' : ''" />
	</StackLayout>
</template>
<script lang="ts">
import { PropertyChangeData, TextField } from '@nativescript/core'
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class CodeField extends Vue {

	declare $attrs: {
		testID: string
	}

	fields = [] as any[]

	@Prop({ type: [Number, String], default: 6 })
	readonly length!: number

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object, Function], default: '' })
	readonly rules!: string

	@Setup((props) => useField<string>(props.name, props.rules, { label: props.label, initialValue: props.modelValue }))
	readonly field!: ReturnType<typeof useField>

	@Model({ type: String, default: '' })
	value!: string

	@Watch('value')
	onValueChange(value) {
		this.field.handleChange(value)
	}

	get error() {
		return this.field.errorMessage?.value
	}

	get hasErrors() {
		return this.field.errors.value.length > 0
	}

	get style() {
		return this.hasErrors ? 'error' : ''
	}

	getText(n) {
		const text = this.value.split('')
		return n <= text.length ? text[--n] : ''
	}

	//onTextChange({ value }: PropertyChangeData, i) {
	// console.log(this.fields.length, i)
	// if (typeof this.fields[i] === 'undefined') return
	// if (i < this.count && value.length === 1) {
	// 	(this.fields[i]._nativeView as TextField).focus()
	// }
	//this.value += value
	//}

	onTextChange({ value }: PropertyChangeData) {
		this.value += value
	}

	onReturnPress(i) {
		if (i < this.length) {
			(this.fields[i]._nativeView as TextField).focus()
		}
	}

	//onLoaded(e: LoadEventData) {
	//const textField = e.object as TextField
	// if (__ANDROID__) {
	// 	//console.log(Object.keys(textField))
	// 	const EditText = textField.nativeViewProtected as android.widget.EditText
	// 	EditText.setKeyListener(new android.text.method.KeyListener({
	// 		onKeyDown: (_view, _text, keyCode, _event) => {
	// 			if (keyCode === android.view.KeyEvent.KEYCODE_DEL) {
	// 				this.value = this.value.slice(0, -1)
	// 				this.field.handleChange(this.value)
	// 			}
	// 			return true
	// 		},
	// 		onKeyUp: (_view, _text, keyCode, _event) => {
	// 			if (keyCode === android.view.KeyEvent.KEYCODE_DEL) {
	// 				this.value = this.value.slice(0, -1)
	// 				this.field.handleChange(this.value)
	// 			}
	// 			return true
	// 		},
	// 		onKeyOther: (_view, _text, _event) => {
	// 			return true
	// 		},
	// 		onTakeFocus: (_view, _direction) => {
	// 			return true
	// 		},
	// 		getInputType: () => {
	// 			return android.text.InputType.TYPE_CLASS_NUMBER
	// 		},
	// 	}))
	// }
	//}

	setErrors(errors: string[]) {
		this.field.setErrors(errors)
	}

	resetField() {
		this.field.resetField()
	}
}

export default toNative(CodeField)
</script>
<style scoped lang="scss">
.codefield {
	@apply font-axiforma border-0 bg-gray-100 text-black text-[14px] w-full px-[19dp] py-[13dp] mx-0;

	&:active {
		@apply border-green-100 border-2;
	}

	&.error {
		@apply text-red-500;
	}
}

.info {
	font-weight: 400;
	@apply text-gray-400 font-axiforma text-[12px];

	&.error {
		@apply text-red-400;
	}
}
</style>
