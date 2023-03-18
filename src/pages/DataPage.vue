<template>
	<div v-if="!isLoading" class="container">
		<search-panel @setSearch="setSearch" />
		<div class="data__title table__title">
			<p>Дата</p>
			<p>Заказ</p>
			<p>Группа</p>
			<p>Цена</p>
			<p>Доля</p>
			<p>Номер</p>
			<p>Описание</p>
			<p>%</p>
		</div>
		<div class="data__orders table table__scrollbar">
			<transition-group name="flip-list">
				<data-row v-for="row in sortedData" :row="row" :search="searchOptions.search" :key="row.row" />
			</transition-group>
			<div class="data__orders__notfound" v-if="sortedData?.length === 0">
				<img src="@/assets/img/notsearched.webp" alt="nosearched" draggable="false" />
				<p>К сожалению по твоему запросу ничего не найдено! Пропробуй уточнить запрос и повторить попытку.</p>
			</div>
		</div>
	</div>
	<div v-else class="loader">
		<p>Идёт загрузка...</p>
		<load-spinner />
	</div>
</template>

<script>
import DataRow from '@/components/orders/Row.vue'
import SearchPanel from '@/components/orders/SearchPanel.vue'
import loadSpinner from '@/components/UI/loader.vue'
import { searchQuery, orderQuery } from '@/assets/constants'
import { API } from '@/axios/API'
import { getPart } from '@/utils/calculate'

export default {
	data() {
		return {
			data: null,
			isLoading: true,
			timer: null,
			searchOptions: {
				type: searchQuery[7],
				search: '',
				order: '',
				showMyOrders: false,
			},
		}
	},
	components: {
		DataRow,
		SearchPanel,
		loadSpinner,
	},
	methods: {
		async fetchData() {
			const res = await API.get('/data').finally(() => {
				this.isLoading = false
			})
			if (res.status === 200) {
				this.data = res.data.data
			}
		},
		setSearch(search) {
			if (this.timer) {
				clearTimeout(this.timer)
			}
			this.timer = setTimeout(() => {
				this.searchOptions = search
				this.timer = null
			}, 350)
		},
	},
	computed: {
		sortedData() {
			if (!this.data) {
				return null
			}
			const dataForSort = this.searchOptions.showMyOrders
				? [
						...this.data.filter(el =>
							el.group.toLowerCase().includes(this.$store.state.auth.user?.nickname.toLowerCase())
						),
				  ]
				: [...this.data]

			switch (this.searchOptions.order) {
				case orderQuery[1].title:
					dataForSort.sort((a, b) => {
						return +a.date.split('.').reverse().join('') - +b.date.split('.').reverse().join('')
					})
					break
				case orderQuery[2].title:
					dataForSort.sort((a, b) => {
						return +b.date.split('.').reverse().join('') - +a.date.split('.').reverse().join('')
					})
					break
			}

			if (!this.searchOptions.search) {
				return dataForSort
			}

			switch (this.searchOptions.type) {
				case searchQuery[1].title:
					return dataForSort.filter(el => el.type.toLowerCase().includes(this.searchOptions.search.toLowerCase()))
				case searchQuery[2].title:
					return dataForSort.filter(el => el.group.toLowerCase().includes(this.searchOptions.search.toLowerCase()))
				case searchQuery[3].title:
					return dataForSort.filter(el => parseFloat(el.price) >= parseFloat(this.searchOptions.search))
				case searchQuery[4].title:
					return dataForSort.filter(el => parseFloat(el.price) <= parseFloat(this.searchOptions.search))
				case searchQuery[5].title:
					return dataForSort.filter(el => getPart(el.price, el.group, el.tax) >= parseFloat(this.searchOptions.search))
				case searchQuery[6].title:
					return dataForSort.filter(el => getPart(el.price, el.group, el.tax) <= parseFloat(this.searchOptions.search))
				case searchQuery[7].title:
					return dataForSort.filter(el =>
						el.description.toLowerCase().includes(this.searchOptions.search.toLowerCase())
					)
				case searchQuery[0].title:
					return dataForSort.filter(
						el =>
							el.type.toLowerCase().includes(this.searchOptions.search.toLowerCase()) ||
							el.group.toLowerCase().includes(this.searchOptions.search.toLowerCase()) ||
							el.price.toLowerCase().includes(this.searchOptions.search.toLowerCase()) ||
							getPart(el.price, el.group, el.tax).toLowerCase().includes(this.searchOptions.search.toLowerCase()) ||
							el.description.toLowerCase().includes(this.searchOptions.search.toLowerCase())
					)
				default:
					return dataForSort
			}
		},
	},
	mounted() {
		this.fetchData()
	},
	unmounted() {
		this.data = null
	},
}
</script>

<style scoped>
.container:only-of-type {
	height: 100%;
	padding-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 5px;
}
.data__title {
	width: 85vw;
	display: grid;
	margin-top: 5px;
	justify-self: start;
	margin-right: 15px;
	grid-template-columns: 100px 150px 1fr repeat(2, 100px) repeat(2, 300px) 50px;
	user-select: none;
}
.data__title > p {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 26px;
	border-right: 1px solid var(--main-text);
	color: var(--main-text);
}
.data__title > p:first-child {
	border-top-left-radius: 15px;
}
.data__title > p:last-child {
	border-right: none;
	border-top-right-radius: 15px;
}
.data__orders {
	width: calc(85vw + 15px);
	height: calc((99vh - 100px));
	overflow-y: auto;
	display: flex;
	flex-direction: column;
}
.flip-list-move {
	transition: transform var(--fast-transition);
}
.loader {
	width: 100%;
	height: 50vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	user-select: none;
}
.loader > p {
	font-size: 32px;
	color: var(--main-text);
}
.loader > div {
	margin-top: 100px;
	transform: scale(2);
}
.data__orders__notfound {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: none !important;
}
.data__orders__notfound > p {
	width: 50vw;
	text-align: center;
	font-style: italic;
	font-size: 32px;
	color: var(--main-text);
	cursor: default;
	user-select: none;
}
.data__orders__notfound > img {
	height: 50vh;
}
</style>
