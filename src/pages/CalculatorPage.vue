<template>
	<div class="calculator">
		<div class="calculator__header">
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
		</div>
		<div v-if="!loading" class="calculator__content" data-scroll="true">
			<div v-if="data" class="calculator__info">
				<p>
					За указанный период я сходил в <span>{{ totalMyOrders }}</span> заказ(а/ов) и заработал
					<span>{{ data.players[$store.state.auth.user?.nickname]?.toFixed(2) || '0.00' }} $</span>
				</p>
			</div>
			<div v-if="data" class="calculator__tables">
				<div class="calculator__payments">
					<div class="calculator__payments__title calculator__payments__row table__title">
						<p>Игрок</p>
						<p>Выплата</p>
					</div>
					<div class="calculator__tables__scroll__wrapper table table__scrollbar">
						<div class="calculator__payments__row" v-for="player in payments">
							<p data-stopscroll="true">{{ player.name }}</p>
							<p data-stopscroll="true">{{ player.summ.toFixed(2) }}$</p>
						</div>
					</div>
				</div>
				<div class="calculator__orders">
					<div class="calculator__orders__title table__title">
						<p>Дата</p>
						<p>Заказ</p>
						<p>Группа</p>
						<p>Цена</p>
						<p>Доля</p>
						<p>%</p>
					</div>
					<div class="calculator__tables__scroll__wrapper table table__scrollbar">
						<small-row v-for="row in myOrders" :key="row.row" :row="row" />
					</div>
				</div>
			</div>
		</div>
		<div v-else class="calculator__loader">
			<p>Выполняется расчёт, подожди немного</p>
			<loader />
		</div>
	</div>
</template>

<script>
import datepicker from '@vuepic/vue-datepicker'
import loader from '@/components/UI/loader.vue'
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
				})
				.catch(err => {
					this.$store.commit('error/setError', err)
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
}
.calculator__header {
	height: 80px;
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 100px;
}
.calculator__date {
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 15px;
	color: var(--main-text);
	font-size: 32px;
}
.calculator__content {
	height: calc(99vh - 80px);
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.calculator__info {
	height: 5vh;
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
	width: calc(100% - 15px);
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
.calculator__tables {
	width: 100%;
	height: calc(100% - 5vh);
	display: flex;
	justify-content: space-around;
	column-gap: 100px;
}
.calculator__tables__scroll__wrapper {
	height: calc(100% - 5vh - 15px);
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
}
/* Datepicker */
.dp__theme_light {
	--dp-background-color: var(--main-text);
	--dp-text-color: var(--dark-text);
	--dp-hover-color: var(--active-text);
	--dp-hover-text-color: var(--dark-text);
	--dp-hover-icon-color: var(--main-text);
	--dp-primary-color: #1976d2;
	--dp-primary-text-color: var(--main-text);
	--dp-secondary-color: #6c6060;
	--dp-border-color: var(--main-text);
	--dp-menu-border-color: var(--main-text);
	--dp-border-color-hover: #aaaeb7;
	--dp-disabled-color: #f6f6f6;
	--dp-scroll-bar-background: #f3f3f3;
	--dp-scroll-bar-color: #959595;
	--dp-success-color: var(--green-text);
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
/* Loader */
.calculator__loader {
	height: calc(99vh - 80px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 50px;
	user-select: none;
}
.calculator__loader > p {
	font-size: 32px;
	color: var(--main-text);
}
.calculator__loader > div {
	transform: scale(2);
}
</style>
