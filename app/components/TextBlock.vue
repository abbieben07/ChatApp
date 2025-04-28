<template>
    <StackLayout>
        <Label :text="label" class="text-secondary text-[15pt]" />
        <FlexboxLayout class="justify-end">
            <Label :text class="text-gray-800 mb-5 text-[25px]">
                <slot />
            </Label>
        </FlexboxLayout>
    </StackLayout>
</template>
<script lang="ts">
import { Component, Prop, toNative, Vue } from 'vue-facing-decorator'

@Component
class TextBlock extends Vue {

    @Prop({ type: String, required: true })
    readonly label!: string

    @Prop({ type: String, required: false })
    readonly text!: string
}

export default toNative(TextBlock)
</script>