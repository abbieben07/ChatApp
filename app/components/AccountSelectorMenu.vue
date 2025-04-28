<template>
	<FlexboxLayout>
		<CollectionView :items="items" class="max-h-[300dp] w-full" v-slot="{ item }" @itemTap="onSelectItem" :width="width" :height="height">
			<StackLayout class="p-[10dp] border-[3px] border-gray-200">
				<Label class="font-axiforma-medium text-[14px] text-gray-600 mb-[3dp]">{{ item.account?.name }}</Label>
				<StackLayout orientation="horizontal">
					<Label class="font-axiforma text-[14px] text-gray-400">{{ item.account?.number }}</Label>
					<Label class="fas mx-[5dp] text-[5px] text-gray-400" :text="$fonticon.font('fa-circle')" />
					<Label class="font-axiforma text-[14px] text-gray-400">{{ item.account?.bank }}</Label>
				</StackLayout>
			</StackLayout>
		</CollectionView>
	</FlexboxLayout>
</template>
<script lang="ts">
import { ObservableArray } from '@nativescript/core'
import { useRepo } from 'pinia-orm'
import { Component, Setup, Vue, toNative } from 'vue-facing-decorator'
import Account from '~/models/location'

@Component
class AccountSelectorMenu extends Vue {

	@Setup(() => useRepo(Account))
	readonly accounts !: ReturnType<typeof useRepo>

	width = 344.72727272727275;

	get height() {
		return this.items.length < 3 ? '100%' : 200
	}

	get items() {
		return new ObservableArray<Item>(this.accounts.all().map((account) => ({
			account: {
				name: account.name,
				number: account.number,
				bank: account.bank
			},
			value: account.id
		})))
	}

	onSelectItem({ index }) {
		this.$emitter.emit('accountSelected', this.items.getItem(index))
	}

	created() {
		this.$emitter.on('dropdownWidth', (value) => {
			this.width = value
			console.log(value)
		})
	}
}

export interface Item {
	account: {
		name: string
		number: string
		bank: number
	}
	value: number
}

export default toNative(AccountSelectorMenu)
</script>

<style scoped lang="scss"></style>
