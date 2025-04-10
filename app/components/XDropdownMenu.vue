<template>
	<FlexboxLayout class="border-[2px] border-gray-300">
		<CollectionView testID="dropdown-menu" :items="items" v-slot="{ item }" :height="height" :width="width" @itemTap="handleSelection">
			<FlexboxLayout class="p-[10dp] border-b-[2px] border-gray-300 bg-white">
				<Label class="font-axiforma text-[14px] text-gray-400 grow" :text="item.label" />
			</FlexboxLayout>
		</CollectionView>
	</FlexboxLayout>
</template>

<script lang="ts">
import { ObservableArray } from '@nativescript/core'
import { Component, Prop, Vue, toNative } from 'vue-facing-decorator'

@Component({
	emits: ['selected']
})
class XDropdownMenu extends Vue {

	width = 352

	@Prop({ type: String })
	readonly id!: string

	@Prop({ type: [Array, Object] })
	readonly items!: ObservableArray<Item>

	get height() {
		return this.items.length < 3 ? '100%' : 200
	}

	handleSelection({ index }) {
		this.$emitter.emit('dropdownSelected', { value: this.items.getItem(index).value, id: this.id })
	}

	created() {
		this.$emitter.on('dropdownWidth', (value) => this.width = value)
	}
}

export interface Item {
	label: string
	value: string | object | any[]
}

export default toNative(XDropdownMenu)
</script>
