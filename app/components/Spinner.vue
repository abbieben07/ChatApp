<template>
	<FlexboxLayout class="spinner-bg" :isUserInteractionEnabled="false" :isPassThroughParentEnabled="false">
		<ActivityIndicator testID="spinner" :busy="true" />
	</FlexboxLayout>
</template>
<script lang="ts">
import { Component, Vue, toNative } from 'vue-facing-decorator'

@Component
class Spinner extends Vue {
}
export default toNative(Spinner)
</script>

<style scoped lang="scss">
.spinner-bg {
	background-color: rgba(0, 0, 0, 0.5);
	@apply w-full h-full flex-col text-center z-50 justify-center items-center fixed top-0 left-0;
}
</style>
