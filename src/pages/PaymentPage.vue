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
						<li>
							<p>Игрок</p>
							<p>Выплата</p>
							<p>Выплачено</p>
						</li>
					</div>
					<div class="period__payments__data">
						<li v-for="player in data" :key="player.name">
							<p>{{ player.name }}</p>
							<p>{{ setPaymentOverall(player) }}</p>
							<p>{{ calculatePaid(player) }}</p>
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
					<div class="period__orders__title">
						<p>Дата</p>
						<p>Заказ</p>
						<p>Группа</p>
						<p>Цена</p>
						<p>Доля</p>
						<p>%</p>
					</div>
					<div class="period__orders__data table">
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
import axios from 'axios'
import loadSpinner from '@/components/loader.vue'
import smallRow from '@/components/payment/smallRow.vue'
import errorMessage from '@/components/errorMessage.vue'
import selectBar from '@/components/UI/select.vue'

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
			const res = await axios.get('http://localhost:666/data/payment')
			if (res.status === 500) {
				this.error = true
			} else {
				this.error &&= false
			}
			this.periods = res.data.periods
			this.data = res.data.data
			const list = []
			list.push({ title: 'за всё время', color: '#6f8aec' })
			res.data.periods.forEach(el => {
				list.push({ title: el, color: '#6f8aec' })
			})
			this.periodsList = list
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
			const isAll = this.searchedPeriod !== 'за всё время'
			const { data } = await axios.get('http://localhost:666/data', {
				params: isAll
					? {
							from,
							to,
					  }
					: null,
			})
			this.orders = data.data
			this.ordersLoading = false
		},
	},
	mounted() {
		this.fetchPeriods()
		this.ordersLoading = true
		axios
			.get('http://localhost:666/data')
			.then(res => {
				this.orders = res.data.data
			})
			.finally(() => {
				this.ordersLoading = false
			})
	},
}
</script>

<style scoped>
.container {
	padding-top: 3vh;
}
.leftblock {
	min-width: 450px;
	height: 85vh;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
}
.rightblock {
	min-width: calc(50vw + 10px);
	min-height: 90vh;
}
.period {
	position: relative;
	top: -50px;
	width: 450px;
	display: flex;
	flex-direction: column;
	align-items: center;
	column-gap: 15px;
	color: var(--main-text);
	font-size: 26px;
}
.period > p {
	cursor: default;
}
.period > p > span {
	cursor: pointer;
	text-decoration: underline 2px solid var(--main-text);
	transition: var(--fast-transition);
}
.period > p > span:hover {
	cursor: pointer;
	text-decoration: underline 3px solid yellowgreen;
}
.periods__list {
	position: absolute;
	width: 500px;
	top: 75px;
	padding: 30px 50px;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	row-gap: 15px;
	list-style: none;
	background: black;
}
.periods__list > li {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 15px 25px;
	border: 2px solid var(--main-text);
	border-radius: 10px;
	cursor: pointer;
}
.period__payments {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	color: var(--main-text);
}
.period__payments ul {
	width: 460px;
	max-height: 70vh;
	display: flex;
	flex-direction: column;
	border-radius: 15px;
	row-gap: 5px;
}
.period__payments__title > li {
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
}
.period__payments__data {
	overflow-y: auto;
}
.period__payments__title > li > p {
	border-bottom: none !important;
}
.period__payments ul > div > li {
	width: 450px;
	display: grid;
	grid-template-columns: 1fr 150px 150px;
	transition: var(--fast-transition);
}
.period__payments ul > div > li:nth-child(2n) {
	background: linear-gradient(45deg, var(--bg-second), var(--bg-dark));
}
.period__payments ul > div > li:nth-child(2n + 1) {
	background: linear-gradient(45deg, var(--bg-dark), var(--bg-second));
}
.period__payments ul > div > li > p {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px 15px;
	font-size: 24px;
	color: var(--main-text);
	border-bottom: 1px solid var(--main-text);
	border-right: 1px solid var(--main-text);
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
	display: grid;
	grid-template-columns: 100px 150px 1fr repeat(2, 100px) 50px;
	color: var(--main-text);
	background: linear-gradient(0deg, var(--bg-dark), var(--bg-second));
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
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
	max-height: 80vh;
	width: calc(50vw + 10px);
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	/* border-radius: 15px; */
}
.period__orders > div > div:nth-child(2n) {
	background: linear-gradient(45deg, var(--bg-second), var(--bg-dark));
}
.period__orders > div > div:nth-child(2n + 1) {
	background: linear-gradient(45deg, var(--bg-dark), var(--bg-second));
}
.loader {
	width: 100%;
	height: 50vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
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
