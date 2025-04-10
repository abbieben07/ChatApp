<template>
    <FlexboxLayout class="flex-col justify-center items-center w-full h-full">
        <LottieView src="~/assets/lottie/empty.json" :loop="true" :autoPlay="true" class="h-[250dp] w-[250dp]" />
        <Label class="font-axiforma text-[15px] text-gray-600">{{ label }}</Label>
    </FlexboxLayout>
</template>
<script lang="ts">
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component
class Empty extends Vue {

    @Prop({ type: String })
    readonly label!: string
}

export default toNative(Empty)
</script>