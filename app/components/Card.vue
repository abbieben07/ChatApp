<template>
	<FlexboxLayout class="w-full p-[24dp] rounded-[24px] shadow-xl">
		<slot />
	</FlexboxLayout>
</template>

<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component({})
class Card extends Vue {}

export default toNative(Card)
</script>
