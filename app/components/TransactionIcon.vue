<template>
	<Label :text="fonticon(icon)" class="bi icon" :class="style" />
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({})
class TransactionIcon extends Vue {
	@Prop({ default: 'debit' })
	type!: string

	get icon(): string {
		return this.type === 'debit' ? 'bi-arrow-up-right' : 'bi-arrow-down-left'
	}

	get style(): string {
		return this.type === 'debit' ? 'debit' : 'credit'
	}

	fonticon(icon) {
		return this?.$fonticon?.font(icon)
	}
}

export default toNative(TransactionIcon)
</script>

<style scoped lang="scss">
.icon {

	@apply border-[2px] text-center text-[18px];

	&.debit {
		@apply text-red-80 bg-red-5 border-red-20;
	}

	&.credit {
		@apply text-green-80 bg-green-5 border-green-20;
	}
}
</style>
