<template>
	<StackLayout class="mb-[20dp]">
		<Label v-if="label" class="label" :text="label" :class="style" />
		<TextField v-bind="$attrs" variant="text" class="textfield" :class="style" :hint v-model="value" @blur="onBlur" />
		<Label v-if="error" :text="error" class="info" :class="style" />
	</StackLayout>
</template>
<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, toNative } from 'vue-facing-decorator'

@Component({
	inheritAttrs: false,
	emits: ['update:modelValue'],
})
class XTextField extends Vue {
	@Setup((props) => useField<string>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, syncVModel: true }))
	field!: ReturnType<typeof useField>

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object, Function], default: '' })
	readonly rules!: string

	@Prop({ default: false })
	readonly info!: string

	@Model({ type: [String, Number] })
	value!: string

	get error() {
		return this.field.errorMessage?.value ?? this.info
	}

	get hasErrors() {
		return this.field.errors.value.length > 0
	}

	get hint() {
		return this.$attrs.hint ? this.$attrs.hint : this.label
	}

	get style() {
		return this.hasErrors ? 'error' : ''
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

export default toNative(XTextField)
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
	font-family: 'Axiforma', 'Axiforma-Regular';
	font-weight: 400;
	font-size: 16px;
	font-style: normal;
	padding: 11.5dp 16dp;
	line-height: 153.9%;
	margin: 8dp 0;
	placeholder-color: #9ca3af;

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
