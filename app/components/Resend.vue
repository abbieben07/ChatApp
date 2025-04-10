<template>
	<Label :class="style" class="text" @tap="onTap">{{ label }}</Label>
</template>
<script lang="ts">
import { Utils } from "@nativescript/core"
import { Component, Prop, Vue, Watch, toNative } from 'vue-facing-decorator'

@Component
class Resend extends Vue {
	active = true
	timer = 60

	timeout = 0
	interval = 0

	@Prop({ type: String })
	readonly url!: string

	@Prop({ type: String })
	readonly phone!: string

	get label() {
		return this.active ? `Resend in.... ${this.timer} secs` : 'Resend'
	}

	get style() {
		return this.active ? 'active' : 'normal'
	}

	@Watch('active')
	onActiveChange(value) {
		if (!value) {
			Utils.clearInterval(this.interval)
			Utils.clearTimeout(this.timeout)
			this.timer = 0
		}
	}

	created() {
		this.activate()
	}

	onTap() {
		if (this.active) return
		this.$http.post(this.url, { phone: this.phone })
			.then(() => this.activate())
			.catch(e => this.$error(e))
	}

	async activate() {
		await this.$nextTick()
		this.active = true
		this.timer = 60
		this.timeout = Utils.setTimeout(() => this.active = false, 60000)
		this.interval = Utils.setInterval(() => this.timer--, 1000)
	}
}

export default toNative(Resend)
</script>

<style scoped lang="scss">
.text {
	@apply font-axiforma text-[12px] rounded-full px-[6dp];

	&.normal {
		@apply bg-green-20 text-green-100
	}

	&.active {
		@apply bg-gray-100 text-gray-300
	}
}
</style>
