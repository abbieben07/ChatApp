<template>
	<StackLayout>
		<FlexboxLayout class="justify-center my-4 small:my-1">
			<Label v-for="j in value.length" :key="j" class="bg-gray-600 pin" />
			<Label v-for="i in (length - value.length)" :key="i" class="bg-gray-100 pin" />
		</FlexboxLayout>
		<GridLayout columns="*,*,*" rows="auto, auto, auto, auto">
			<Label v-for="i in 9" :key="i" :testID="`numpad-${i}-key`" :row="row(i)" :col="col(i)" :text="i" class="key" @tap="onTap(i)" rippleColor="#333333" />

			<Label v-if="hasBiometric" row="3" col="0" :text="$fonticon.font('fa-fingerprint')" class="fas icon" @tap="onBiometricTap" rippleColor="#333333" />
			<Label row="3" col="1" text="0" testID="numpad-0-key" class="key" @tap="onTap('0')" rippleColor="#333333" />
			<Label row="3" col="2" :text="$fonticon.font('fa-angle-left')" class="fas icon" @tap="onBack" rippleColor="#333333" />
		</GridLayout>
		<Label v-if="error" :text="error" class="info text-center" :class="hasErrors ? 'error' : ''" />
	</StackLayout>
</template>

<script lang="ts">
import { BiometricAuth, BiometricIDAvailableResult, BiometricResult, ERROR_CODES } from '@nativescript/biometrics'
import { HapticImpactType, Haptics } from '@nativescript/haptics'
import { useField } from 'vee-validate'
import { Component, Model, Prop, Setup, Vue, Watch, toNative } from 'vue-facing-decorator'
import { useSettingsStore } from '~/ts/store'

@Component({
	emits: ['update:modelValue', 'submit'],
})
class NumPad extends Vue {

	biometricAuth !: BiometricAuth

	isBiometricAvailable = true

	@Setup((props) => useField(props.name, props.rules, { initialValue: props.modelValue, label: props.label }))
	readonly field!: ReturnType<typeof useField>

	@Setup(() => useSettingsStore())
	readonly settingsStore!: ReturnType<typeof useSettingsStore>

	@Prop({ type: Boolean, default: false })
	readonly biometric!: boolean

	@Prop({ type: Number, default: 4 })
	readonly length!: number

	@Prop({ type: String })
	readonly label!: string

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object, Function], default: '' })
	readonly rules!: string

	@Model({ type: String })
	value!: string

	@Watch('value')
	onValueChange(value: string) {
		this.field.handleChange(value)
		if (value.length === this.length) {
			this.$emit('submit')
		}
	}

	get error() {
		return this.field.errorMessage?.value
	}

	get hasErrors() {
		return this.field.errors.value.length > 0
	}

	get hasBiometric() {
		return this.biometric && this.settingsStore.options.biometric && this.isBiometricAvailable && __IOS__
	}

	created() {

		if (__IOS__) {
			this.biometricAuth = new BiometricAuth()

			this.biometricAuth.available()
				.then((result: BiometricIDAvailableResult) => {
					console.log(result)
					this.isBiometricAvailable = result.any ?? false
					this.isBiometricAvailable = true
				})
				.catch(e => this.$error(e))
		}
	}

	row(i) {
		return Math.floor((i - 1) / 3)
	}

	col(i) {
		return ((i - 1) % 3)
	}

	onTap(value) {
		Haptics.impact(HapticImpactType.LIGHT)
		if (this.value.length < this.length)
			this.value += value
	}

	onBack() {
		Haptics.impact()
		if (this.value.length > 0)
			this.value = this.value.slice(0, -1)
	}

	onBiometricTap() {
		Haptics.impact(HapticImpactType.HEAVY)
		this.biometricAuth.verifyBiometric({
			title: 'Android title', // optional title (used only on Android)
			message: 'Scan your finger', // optional (used on both platforms) - for FaceID on iOS see the notes about NSFaceIDUsageDescription
			fallbackMessage: 'Enter your PIN', // this will be the text to show for the "fallback" button on the biometric prompt
			pinFallback: true// allow fall back to pin/password
		})
			.then((result?: BiometricResult) => {
				console.log(result)
				if (result?.code === ERROR_CODES.SUCCESS) {
					this.$emitter.emit("biometric", true)
				}
			})
			.catch(e => this.$error(e))
	}

	setErrors(errors: string[]) {
		this.field.setErrors(errors)
	}

	resetField() {
		this.field.resetField()
	}
}

export default toNative(NumPad)
</script>

<style scoped lang="scss">
.key {
	font-family: "Axiforma", "Axiforma-Regular";
	font-weight: 500;
	@apply w-[40dp] h-[40dp] small:w-[24p] small:h-[24dp];
}

.key,
.icon {
	ripple-color: rgba(0, 0, 0, 0.2);
	font-style: normal;
	line-height: normal;
	@apply text-[#4A4A4A] text-[32px] small:text-[20px] text-center w-full my-6 p-0;
}

.pin {
	@apply w-[20dp] h-[20dp] mx-4 small:mx-3 my-[20dp] small:my-[10dp] rounded-full;
}

.info {
	font-weight: 400;
	@apply text-gray-400 font-axiforma text-[12px];

	&.error {
		@apply text-red-400;
	}
}
</style>
