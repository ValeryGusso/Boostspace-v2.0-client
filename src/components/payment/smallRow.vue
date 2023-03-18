<template>
	<div class="row">
		<div :class="{ done: row.done }">{{ row.date }}</div>
		<div :class="{ done: row.done, searched: match(row.type) }">{{ row.type }}</div>
		<div :class="{ done: row.done, searched: match(row.group) }">{{ row.group }}</div>
		<div :class="{ done: row.done, searched: match(row.price) }">{{ row.price || '---' }}</div>
		<div :class="{ done: row.done, searched: match(part) }">{{ part }}</div>
		<div class="noselect">
			<strong> {{ tax }}</strong>
		</div>
	</div>
</template>

<script>
import { getPart } from '@/utils/calculate'

export default {
	data() {
		return {}
	},
	methods: {
		match(str) {
			if (!str || !this.search) {
				return false
			} else {
				return str.toLowerCase().includes(this.search.toLowerCase())
			}
		},
	},
	computed: {
		part() {
			if (!this.row.price) {
				return '---'
			}
			return `${getPart(this.row.price, this.row.group, this.row.tax).toString().replace('.', ',')}${
				this.row.currency === 'usd' ? '$' : '₽'
			}`
		},
		price() {
			return parseFloat(this.row.price) + this.row.currency === 'usd' ? '$' : '₽'
		},
		tax() {
			return this.row.tax ? '✓' : '✘'
		},
	},
	props: {
		row: { type: Object, required: true },
		search: { type: String },
	},
}
</script>

<style scoped>
.row {
	width: 50vw;
	display: grid;
	grid-template-columns: 100px 150px 1fr repeat(2, 100px) 50px;
	color: var(--main-text);
}
.row > div {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 10px 20px;
	border: none;
	border-bottom: 1px solid var(--main-text);
	border-right: 1px solid var(--main-text);
	cursor: default;
	font-size: 20px;
}
.row > div:last-child {
	border-right: none;
}
.row > p {
	color: var(--main-text);
}
.done {
	color: var(--green-text);
}
.searched {
	background: #4d83b5;
}
.noselect {
	user-select: none;
}
</style>
