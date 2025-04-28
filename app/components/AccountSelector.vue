<template>
	<StackLayout ref="container" class="p-[16dp] border-[2px] border-gray-200 mt-[10dp]" @tap="onOpenDialog">
		<Label class="font-axiforma-medium text-[14px] text-gray-600 mb-[8dp]">{{ account?.name }}</Label>
		<StackLayout orientation="horizontal">
			<Label class="font-axiforma text-[14px] text-gray-400">{{ account?.number }}</Label>
			<Label class="fas mx-[5dp] text-[5px] text-gray-400" :text="$fonticon.font('fa-circle')" />
			<Label class="font-axiforma text-[14px] text-gray-400">{{ account?.bank }}</Label>
		</StackLayout>
	</StackLayout>
</template>
<script lang="ts">
import { HorizontalPosition, VerticalPosition } from '@nativescript-community/ui-popover'
import { ObservableArray } from '@nativescript/core'
import { useRepo } from 'pinia-orm'
import { useField } from 'vee-validate'
import { Component, Model, Prop, Ref, Setup, Vue, Watch, toNative } from 'vue-facing-decorator'
import Account from '~/models/location'
import { usePopover } from '~/ts/popover'
import { useUserStore } from '~/ts/store'
import AccountSelectorMenu, { Item } from './AccountSelectorMenu.vue'

@Component({
	components: {
		AccountSelectorMenu
	},
	emits: ['update:modelValue', 'input']
})
class AccountSelector extends Vue {
	items = new ObservableArray<Item>([]);

	@Setup(() => usePopover(AccountSelectorMenu, { vertPos: VerticalPosition.ABOVE, horizPos: HorizontalPosition.CENTER, x: 0, y: 0 }))
	readonly popover!: ReturnType<typeof usePopover>

	@Setup(() => useUserStore())
	readonly userStore !: ReturnType<typeof useUserStore>

	@Setup(() => useRepo(Account))
	readonly accounts !: ReturnType<typeof useRepo>

	@Setup((props) => useField(props.name, props.rules, { label: props.label }))
	readonly field!: ReturnType<typeof useField>

	@Prop({ type: String })
	readonly name!: string

	@Prop({ type: [String, Object, Function], default: '' })
	readonly rules!: string

	@Model({ type: Number })
	value!: number

	@Watch('value')
	onValueChange(value) {
		this.field.handleChange(value)
	}

	account !: any

	@Ref
	readonly container!: any

	get user() {
		return this.userStore.getUser
	}

	created() {
		this.account = this.user.account
		this.accounts.flush()
		this.$http.get("/accounts")
			.then((data) => this.accounts.save(data.accounts))
			.catch((e) => this.$error(e))

		this.$emitter.on('accountSelected', (item: Item) => {
			this.$emit('input', item.value)
			this.value = item.value
			this.account = item.account
			this.popover.close()
		})
	}

	onOpenDialog() {
		this.popover.open(this.container.nativeView)
	}
}

export default toNative(AccountSelector)
</script>

<style scoped lang="scss"></style>
