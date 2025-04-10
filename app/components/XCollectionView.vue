<template>
    <ListView v-bind="$attrs" :items="items" v-slot="{ item }" class="h-full w-full">
        <slot :item="item" />
    </ListView>
</template>
<script lang="ts">
import { ObservableArray } from '@nativescript/core'
import moment from 'moment'
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'
import TransactionIcon from '~/components/TransactionIcon.vue'

@Component({
    inheritAttrs: false,
    emits: ["refresh"],
    components: {
        TransactionIcon
    }
})
class XCollectionView extends Vue {
    @Prop({ type: [Array, Object] })
    readonly items!: ObservableArray<any>

    //@Ref
    //readonly refresher!:

    onRefreshDone() {
        //this.refresher.refreshing = false
    }

    getTime(date: string) {
        return moment(date).format('HH:mm')
    }
}

export default toNative(XCollectionView)
</script>