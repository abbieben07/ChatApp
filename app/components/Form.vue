<template>
    <slot />
</template>
<script lang="ts">
import { useForm } from 'vee-validate'
import { Component, Setup, Vue, toNative } from 'vue-facing-decorator'

@Component
class Form extends Vue {

    @Setup(() => useForm())
    readonly form!: ReturnType<typeof useForm>
}

export default toNative(Form)
</script>