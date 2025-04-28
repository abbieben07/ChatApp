<template>
	<NSImg :showProgressBar="true" progressBarColor="#0e9517" stretch="centerCrop" fadeDuration="500" :progressiveRenderingEnabled="true" />
</template>
<script lang="ts">
import { Component, toNative, Vue } from 'vue-facing-decorator'

@Component
class XImage extends Vue {
	// ...
}
export default toNative(XImage)
</script>
