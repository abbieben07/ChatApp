<template>
	<MDProgress :value class="progress" />
</template>
<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component
class XProgress extends Vue {
	@Prop({ default: 0, type: Number })
	readonly value!: number
}
export default toNative(XProgress)
</script>
<style scoped lang="scss">
.progress {
	@apply h-[4dp] bg-gray-200;
	ripple-color: green;
	elevation: 4;
}
</style>
