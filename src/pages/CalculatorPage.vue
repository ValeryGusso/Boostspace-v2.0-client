<template>
	<div class="calculator">
		<div class="calculator__date">
			<p>Выбери период:</p>
			<datepicker
				v-model="range"
				range
				locale="ru"
				cancelText="отмена"
				selectText="выбрать"
				format="dd/MM/yy"
				calendar-class-name="datepicker__calendar"
				menu-class-name="datepicker__calendar__menu"
				input-class-name="datepicker__calendar__input"
				:enable-time-picker="false"
				:min-date="'12.05.2022'"
				:max-date="new Date()"
			/>
		</div>
		<button-submit
			v-if="range"
			:options="{
				width: 600,
				defaultWidth: 350,
				tabindex: 1,
				handler: fetchData,
				prevent: true,
				fontSize: 32,
				text: 'Посчитать!',
				loadingText: 'Загружаю данные...',
				isLoading: this.loading,
			}"
		/>
		<div v-if="!loading" class="calculator__content">
			<div v-if="data" class="calculator__info">
				<p>
					За указанный период я сходил в <span>{{ totalMyOrders }}</span> заказ(а/ов) и заработал
					<span>{{ data.players[$store.state.auth.user?.nickname]?.toFixed(2) || '0.00' }} $</span>
				</p>
			</div>
			<!-- <div v-if="data" class="calculator__buttons">
				<button @click="showOrders = !showOrders">{{ showOrders ? 'Скрыть' : 'Показать' }} заказы</button>
				<button @click="showPayments = !showPayments">{{ showPayments ? 'Скрыть' : 'Показать' }} сводку</button>
			</div> -->
			<div v-if="data" class="calculator__tables">
				<div class="calculator__payments table">
					<div class="calculator__payments__title calculator__payments__row">
						<p>Игрок</p>
						<p>Выплата</p>
					</div>
					<div class="calculator__tables__scroll__wrapper table">
						<div class="calculator__payments__row" v-for="player in payments">
							<p>{{ player.name }}</p>
							<p>{{ player.summ.toFixed(2) }}$</p>
						</div>
					</div>
				</div>
				<div class="calculator__orders table">
					<div class="calculator__orders__title">
						<p>Дата</p>
						<p>Заказ</p>
						<p>Группа</p>
						<p>Цена</p>
						<p>Доля</p>
						<p>%</p>
					</div>
					<div class="calculator__tables__scroll__wrapper table">
						<small-row v-for="row in myOrders" :key="row.row" :row="row" />
					</div>
				</div>
			</div>
		</div>
		<div v-else class="calculator__loader"><loader /></div>
	</div>
</template>

<script>
import datepicker from '@vuepic/vue-datepicker'
import loader from '@/components/loader.vue'
import smallRow from '@/components/payment/smallRow.vue'
import buttonSubmit from '@/components/UI/buttonSubmit.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { API } from '@/axios/API'

export default {
	data() {
		return {
			range: [new Date('12.05.2022'), new Date()],
			data: null,
			payments: null,
			loading: false,
			error: null,
			showOrders: false,
			showPayments: false,
		}
	},
	components: {
		datepicker,
		loader,
		smallRow,
		buttonSubmit,
	},
	methods: {
		fetchData() {
			this.loading = true
			this.error = null
			this.data = null
			API.get('/data/calculate', {
				params: { from: this.range[0].toLocaleDateString(), to: this.range[1].toLocaleDateString() },
			})
				.then(res => {
					if (res.status === 200) {
						this.data = res.data

						const payments = []
						for (let key in res.data.players) {
							payments.push({ name: key, summ: res.data.players[key] })
						}
						payments.sort((a, b) => (a.name > b.name ? 1 : -1))
						const percent = payments.shift()
						payments.push(percent)
						this.payments = payments
					} else {
						this.error = res.message
					}
					console.log(res)
				})
				.finally(() => {
					this.loading = false
				})
		},
	},
	computed: {
		totalMyOrders() {
			if (!this.data) return 0
			let count = 0
			this.data.orders.forEach(el => {
				if (el.group.includes(this.$store.state.auth.user?.nickname)) {
					count++
				}
			})
			return count
		},
		myOrders() {
			if (!this.data) return null
			return this.data.orders.filter(el => el.group.includes(this.$store.state.auth.user?.nickname))
		},
	},
}
</script>

<style>
.calculator {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 10px;
}
.calculator__date {
	/* width: 500px; */
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 15px;
	color: var(--main-text);
	font-size: 32px;
	margin-top: 2vh;
}

.calculator__content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	row-gap: 2vh;
}
.calculator__info {
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--main-text);
	font-size: 26px;
}
.calculator__info span {
	font-size: 32px;
	font-style: italic;
	color: var(--green-text);
}
.calculator__orders__title {
	width: 50vw;
	margin-bottom: 5px;
	display: grid;
	grid-template-columns: 100px 150px 1fr repeat(2, 100px) 50px;
	color: var(--main-text);
	background: linear-gradient(0deg, var(--bg-dark), var(--bg-second)) !important;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
}
.calculator__orders__title > p {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 10px 20px;
	cursor: default;
	font-size: 32px;
	border-right: 1px solid var(--main-text);
}
.calculator__orders__title > p:last-child {
	border: none;
}
.calculator__payments {
	width: 450px;
	font-size: 24px;
	color: var(--main-text);
}
.calculator__payments__title {
	background: linear-gradient(0deg, var(--bg-dark), var(--bg-second)) !important;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	border-bottom: none !important;
	margin-bottom: 5px;
	margin-right: 10px;
}
.calculator__payments__title > p {
	font-size: 32px;
}
.calculator__payments__row {
	display: flex;
	align-items: center;
	justify-content: center;
}
.calculator__payments__row > p {
	width: 50%;
	text-align: center;
	padding: 10px 0;
}
.calculator__payments__row {
	border-bottom: 1px solid var(--main-text);
}
.calculator__payments__row:last-child {
	border-bottom: none;
}
.calculator__payments__row > p:first-child {
	border-right: 1px solid var(--main-text);
}
.calculator__buttons {
	display: flex;
	/* justify-content: space-between; */
	column-gap: 20px;
}
.calculator__buttons > button {
	padding: 10px 35px;
	font-size: 24px;
	background: var(--main-text);
	border: none;
	color: var(--dark-text);
	cursor: pointer;
	/* box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.75); */
	border-radius: 5px;
	transition: var(--fast-transition);
}
.calculator__buttons > button:hover {
	/* box-shadow: 5px 5px 2px rgba(255, 255, 255, 0.75); */
	background: var(--active-text);
}
.calculator__tables {
	width: 100%;
	display: flex;
	justify-content: space-around;
	column-gap: 100px;
}
.calculator__tables__scroll__wrapper {
	max-height: 62vh;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
}
/* .calculator__tables__scroll__wrapper::-webkit-scrollbar {
	width: 20px; */
/* } */
/* Datepicker */
.dp__theme_light {
	--dp-background-color: var(--main-text);
	--dp-text-color: var(--dark-text);
	--dp-hover-color: var(--active-text);
	--dp-hover-text-color: var(--dark-text);
	--dp-hover-icon-color: var(--main-text);
	--dp-primary-color: #1976d2;
	--dp-primary-text-color: var(--main-text);
	--dp-secondary-color: #c0c4cc;
	--dp-border-color: var(--main-text);
	--dp-menu-border-color: var(--main-text);
	--dp-border-color-hover: #aaaeb7;
	--dp-disabled-color: #f6f6f6;
	--dp-scroll-bar-background: #f3f3f3;
	--dp-scroll-bar-color: #959595;
	--dp-success-color: #76d275;
	--dp-success-color-disabled: #a3d9b1;
	--dp-icon-color: #959595;
	--dp-danger-color: #ff6f60;
	--dp-highlight-color: rgba(25, 118, 210, 0.1);
}
.datepicker__calendar__menu * {
	font-size: 20px;
}
.datepicker__calendar__input {
	font-style: italic;
	font-size: 22px;
}
</style>
