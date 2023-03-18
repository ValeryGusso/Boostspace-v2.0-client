<template>
	<div class="search__panel">
		<select-bar
			v-model="activeSearchQuery"
			:options="{
				list: searchQuery,
				placeholder: 'Поиск по:',
				defaultValue: 'всем полям',
				width: 500,
				columns: 1,
				dontShowColor: true,
			}"
		/>
		<validated-input
			v-model:value="search.value"
			:options="{
				type: 'text',
				placeholder: 'Что ищем?',
				tabindex: 1,
				isError: search.error,
				errorMessage: search.errorMessage,
				image: search.image,
			}"
		/>
		<select-bar
			v-model="activeOrderQuery"
			:options="{
				list: orderQuery,
				placeholder: 'Показывать: ',
				defaultValue: orderQuery[0].title,
				width: 500,
				columns: 1,
				dontShowColor: true,
			}"
		/>
		<div class="search__panel__myorders">
			<p>
				Только <br />
				мои заказы
			</p>
			<checkbox v-model="showMyOrders" />
		</div>
	</div>
</template>

<script>
import { searchQuery, orderQuery } from '@/assets/constants'
import selectBar from '../UI/select.vue'
import validatedInput from '../UI/validatedInput.vue'
import searchImage from '@/assets/img/search.svg'
import checkbox from '../UI/checkbox.vue'

export default {
	data() {
		return {
			searchQuery,
			orderQuery,
			activeSearchQuery: searchQuery[0].title,
			activeOrderQuery: orderQuery[0].title,
			showMyOrders: false,
			search: {
				value: '',
				error: false,
				errorMessage: '',
				image: searchImage,
			},
		}
	},
	components: { selectBar, validatedInput, checkbox },
	methods: {},
	watch: {
		['search.value'](newVal) {
			this.$emit('setSearch', {
				type: this.activeSearchQuery,
				search: newVal,
				order: this.activeOrderQuery,
				showMyOrders: this.showMyOrders,
			})
		},
		activeSearchQuery(newVal) {
			this.$emit('setSearch', {
				type: newVal,
				search: this.search.value,
				order: this.activeOrderQuery,
				showMyOrders: this.showMyOrders,
			})
		},
		activeOrderQuery(newVal) {
			this.$emit('setSearch', {
				type: this.activeSearchQuery,
				search: this.search.value,
				order: newVal,
				showMyOrders: this.showMyOrders,
			})
		},
		showMyOrders(newVal) {
			this.$emit('setSearch', {
				type: this.activeSearchQuery,
				search: this.search.value,
				order: this.activeOrderQuery,
				showMyOrders: newVal,
			})
		},
	},
}
</script>

<style scoped>
.search__panel {
	min-width: 100%;
	display: flex;
	align-items: end;
	justify-content: center;
	column-gap: 20px;
}
.search__panel__myorders {
	width: 230px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 24px;
	color: var(--main-text);
}
.search__panel__myorders > p {
	width: calc(100% - 60px);
}
</style>
