<template>
	<div v-if="periods" class="container">
		<div v-if="data" class="period__payments">
			<div class="leftblock">
				<div class="period">
					<p>Расчётный период:</p>
					<select-bar
						v-model="searchedPeriod"
						:options="{
							list: periodsList,
							placeholder: '',
							defaultValue: 'за всё время',
							width: 450,
							columns: 2,
							dontShowColor: true,
						}"
					/>
				</div>
				<ul>
					<div class="period__payments__title">
						<li class="table__title">
							<p>Игрок</p>
							<p>Выплата</p>
							<p>Выплачено</p>
						</li>
					</div>
					<div class="period__payments__data table table__scrollbar">
						<li data-stopscroll="true" v-for="player in data" :key="player.name">
							<p data-stopscroll="true">{{ player.name }}</p>
							<p data-stopscroll="true">{{ setPaymentOverall(player) }}</p>
							<p data-stopscroll="true">{{ calculatePaid(player) }}</p>
						</li>
					</div>
				</ul>
			</div>
			<div class="rightblock">
				<div v-if="ordersLoading" class="loader">
					<p>Идёт загрузка...</p>
					<load-spinner />
				</div>
				<div v-else-if="!error" class="period__orders">
					<div class="period__orders__title table__title">
						<p>Дата</p>
						<p>Заказ</p>
						<p>Группа</p>
						<p>Цена</p>
						<p>Доля</p>
						<p>%</p>
					</div>
					<div class="period__orders__data table table__scrollbar">
						<small-row v-for="row in orders" :key="row.row" :row="row" />
					</div>
				</div>
				<div v-else>
					<error-message />
				</div>
			</div>
		</div>
	</div>
	<div v-else class="loader">
		<p>Идёт загрузка...</p>
		<load-spinner />
	</div>
</template>

<script>
import loadSpinner from '@/components/UI/loader.vue'
import smallRow from '@/components/payment/smallRow.vue'
import errorMessage from '@/components/UI/errorMessage.vue'
import selectBar from '@/components/UI/select.vue'
import { API } from '@/axios/API'

export default {
	data() {
		return {
			data: null,
			periods: null,
			periodsList: null,
			orders: null,
			ordersLoading: false,
			searchedPeriod: 'за всё время',
			showList: false,
			error: false,
		}
	},
	components: {
		loadSpinner,
		smallRow,
		errorMessage,
		selectBar,
	},
	methods: {
		showListTogle() {
			this.showList = !this.showList
		},
		setPeriod(period) {
			this.showList = false
			this.searchedPeriod = period
		},
		calculatePaid(player) {
			if (this.searchedPeriod === 'за всё время') {
				return player.paid.usd.toFixed(2) + '$'
			} else {
				return player.payments[this.searchedPeriod]?.paid || 0
			}
		},
		async fetchPeriods() {
			const res = await API.get('/data/payment').catch(err => {
				this.$store.commit('error/setError', err)
			})

			if (res?.status === 500) {
				this.error = true
			} else {
				this.error &&= false
			}

			if (res?.status === 200) {
				this.periods = res.data.periods
				this.data = res.data.data

				const list = []

				list.push({ title: 'за всё время', color: 'var(--active-text)' })
				res.data.periods.forEach(el => {
					list.push({ title: el, color: 'var(--active-text)' })
				})

				this.periodsList = list
			}
		},
		setPaymentOverall(player) {
			if (this.searchedPeriod === 'за всё время') {
				return player.total.usd.toFixed(2) + '$'
			}
			return player.payments[this.searchedPeriod]?.overall || 0
		},
	},
	watch: {
		async searchedPeriod(newVal) {
			this.ordersLoading = true

			const [from, to] = newVal.split(/\s*-\s/g)

			const res = await API.get('/data', {
				params:
					this.searchedPeriod !== 'за всё время'
						? {
								from,
								to,
						  }
						: null,
			})
				.catch(err => {
					this.$store.commit('error/setError', err)
				})
				.finally(() => {
					this.ordersLoading = false
				})

			if (res?.status === 200) {
				this.orders = res.data.data
			}
		},
	},
	mounted() {
		this.fetchPeriods()
		this.ordersLoading = true
		API.get('/data')
			.then(res => {
				this.orders = res.data.data
			})
			.catch(err => {
				this.$store.commit('error/setError', err)
			})
			.finally(() => {
				this.ordersLoading = false
			})
	},
}
</script>

<style scoped>
.container {
	height: 100vh;
	padding-top: 1vh;
}
.period__payments {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 100px;
}
.leftblock {
	width: 500px;
	height: calc(99vh - 3px - 1vh);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.rightblock {
	min-width: calc(50vw + 15px);
	height: calc(99vh - 3px - 1vh);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}
.period {
	width: 450px;
	height: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--main-text);
	font-size: 26px;
}
.period > p {
	cursor: default;
}
.period__payments ul {
	max-height: calc(100% - 100px);
	display: flex;
	flex-direction: column;
	border-radius: 15px;
	row-gap: 5px;
}
.period__payments__data {
	overflow-y: auto;
}
.period__payments ul > div > li {
	width: 450px;
	display: grid;
	grid-template-columns: 1fr 150px 150px;
	transition: var(--fast-transition);
	overflow: hidden;
	border-bottom: 1px solid var(--main-text);
}
.period__payments ul > div > li > p {
	max-width: calc(450px / 3);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px 0;
	font-size: 24px;
	color: var(--main-text);
	border-right: 1px solid var(--main-text);
}
.period__payments ul > div > li:last-child {
	border-bottom: none !important;
}
.period__payments ul > div > li > p:last-child {
	border-right: none;
}
.period__orders {
	display: flex;
	flex-direction: column;
	row-gap: 5px;
}
.period__orders__title {
	width: 50vw;
	height: 60px;
	display: grid;
	grid-template-columns: 100px 150px 1fr repeat(2, 100px) 50px;
	color: var(--main-text);
}
.period__orders__title > p {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 10px 20px;
	cursor: default;
	font-size: 32px;
	border-right: 1px solid var(--main-text);
}
.period__orders__title > p:last-child {
	border: none;
}
.period__orders__data {
	max-height: calc(99vh - 65px);
	width: calc(50vw + 15px);
	display: flex;
	flex-direction: column;
	overflow-y: auto;
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
</style>
