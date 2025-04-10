<template>
	<Switch class="switch" v-model="value" />
</template>

<script lang="ts">
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component({
	emits: ['update:modelValue'],
})
class XSwitch extends Vue {
	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object, Function], default: '' })
	readonly rules!: string

	@Model({ type: Boolean })
	value!: boolean

	@Setup((props) => useField<string>(props.name, props.rules, { initialValue: props.modelValue, label: props.label, type: 'checkbox' }))
	field!: ReturnType<typeof useField>

	@Watch('value')
	onValueChange(value) {
		this.field.handleChange(value)
	}

	onChange({ value }) {
		this.value = value
	}

	resetField() {
		this.field.resetField()
	}
}

export default toNative(XSwitch)
</script>
<style scoped lang="scss">
.switch {
	ripple-colour: #333333;
	height: 24dp;
	off-background-color: #e0e0e0;
	@apply bg-primary;
}
</style>
