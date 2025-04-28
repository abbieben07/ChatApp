<template>
	<StackLayout class="mb-[20dp]">
		<Label v-if="label" class="label" :text="label" :class="hasErrors ? 'error' : ''" />
		<DatePickerField v-bind="$attrs" class="textfield" :class="hasErrors ? 'error' : ''" :date="value" @textChange="onTextChange" @blur="onBlur" :dateFormat="format" :pickerTitle="label" />
		<Label v-if="error" :text="error" class="info" :class="hasErrors ? 'error' : ''" />
	</StackLayout>
</template>


<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
	emits: ['update:modelValue']
})
class XDateField extends Vue {

	@Setup((props) => useField<string>(props.name, props.rules, { initialValue: props.modelValue, label: props.label }))
	field!: ReturnType<typeof useField>

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object, Function], default: '' })
	readonly rules!: string

	@Prop({ default: false })
	readonly info!: string

	@Prop({ type: String, default: 'MMM dd, yyyy' })
	readonly format !: string

	@Model({ type: String })
	value!: string

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

	onTextChange({ value }) {
		this.value = value
	}

	onBlur() {
		this.field.handleBlur()
	}

	setErrors(errors: string[]) {
		this.field.setErrors(errors)
	}

	resetField() {
		this.field.resetField()
	}
}

export default toNative(XDateField)
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
	font-family: "Axiforma", "Axiforma-Regular";
	font-weight: 400;
	font-size: 16px;
	font-style: normal;
	padding: 11.5dp 16dp;
	line-height: 153.9%;
	margin: 8dp 0;
	placeholder-color: #9CA3AF;


	@apply border-4 border-gray-100 rounded-none text-gray-600;

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
