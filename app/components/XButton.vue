<template>
	<MDButton class="button uppercase" variant="flat" :class="style" :isEnabled="!spinner" />
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component
class XButton extends Vue {
	@Inject({ default: false })
	readonly spinner!: boolean

	@Prop({ default: 'primary' })
	readonly type!: 'primary' | 'secondary' | 'tertiary'

	@Prop({ default: 'medium' })
	readonly size!: 'small' | 'medium' | 'large'

	get style() {
		return `${this.type} ${this.size}` // primary small
	}

	created() {
		//this.$emitter.on('spinner', (value) => this.loading = value)
		//this.$emitter.on('sheetSpinner', (value) => this.loading = value)
	}
}

export default toNative(XButton)
</script>

<style lang="scss">
.button {
	width: 100%;
	@apply rounded-none font-axiforma-medium text-[14px] m-0 mb-[24dp];
	box-shadow: 0 0 0px #000000;
	android-elevation: 0;
	android-dynamic-elevation-offset: 0;

	&.small {
		padding: 10dp 10dp;
	}

	&.medium {
		padding: 15dp 10dp;
		@apply ios:h-[58dp];
	}

	&.large {
		padding: 20dp 10dp;
		height: 56dp;
	}

	&.primary {
		@apply bg-primary text-white border-0;

		&:hover {
			@apply bg-gray-500;
		}

		&:active {
			@apply bg-gray-600;
		}

		&:disabled {
			@apply bg-gray-300;
		}
	}

	&.secondary {
		@apply bg-transparent text-black border border-black;

		&:hover {
			@apply border-gray-500;
		}

		&:active {
			@apply border-gray-600;
		}

		&:disabled {
			@apply border-gray-200 opacity-90;
		}
	}

	&.tertiary {
		@apply bg-transparent text-black border-0;

		&:hover {
			@apply text-gray-500;
		}

		&:active {
			@apply text-gray-600;
		}

		&:disabled {
			@apply text-gray-200;
		}
	}
}
</style>
