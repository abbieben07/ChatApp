<template>
	<FlexboxLayout class="container" :isPassThroughParentEnabled="false" @tap="$emitter.emit('hideBanner')">
		<DockLayout :stretchLastChild="true" :class="style" class="banner">
			<Label dock="left" class="fas text-[20px]" :text="$fonticon.font(icon)" />
			<Label testID="close-btn" dock="right" class="fas text-[20px]" :text="$fonticon.font('fa-xmark')" @tap="$emitter.emit('hideBanner')" />
			<Label dock="left" class="font-axiforma text-[14px] grow mx-[5dp]" :text="message" :textWrap="true" />
		</DockLayout>
	</FlexboxLayout>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component
class Banner extends Vue {
	@Prop({ type: String })
	readonly message!: string

	@Prop({ type: String })
	readonly style!: string

	get icon() {
		switch (this.style) {
			case 'info':
				return 'fa-circle-info'
			case 'success':
				return 'fa-circle-check'
			case 'warning':
				return 'fa-circle-exclamation'
			case 'error':
				return 'fa-bug'
			default:
				return 'fa-bug'
		}
	}
}

export default toNative(Banner)
</script>

<style scoped lang="scss">
.container {
	@apply bg-transparent w-full h-full px-[5dp] flex-col;

	.banner {
		@apply rounded-none w-full border-0 text-white mx-[20dp] mt-[60dp] p-[15dp] z-40;
		box-shadow: 1dp 1dp 1dp #333333;
		android-elevation: 0;
		android-dynamic-elevation-offset: 0;

		&.info {
			@apply bg-blue-600;
		}

		&.success {
			@apply bg-green-600;
		}

		&.warning {
			@apply bg-yellow-600 text-black;
		}

		&.error {
			@apply bg-red-600;
		}
	}
}
</style>
