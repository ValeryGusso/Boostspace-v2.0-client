<template>
	<div class="row">
		<div :class="{ done: row.done }">
			<p>{{ row.date }}</p>
		</div>
		<div :class="{ done: row.done, searched: match(row.type) }">
			<p>{{ row.type }}</p>
		</div>
		<div :class="{ done: row.done, searched: match(row.group) }">
			<p>{{ row.group }}</p>
		</div>
		<div :class="{ done: row.done, searched: match(row.price) }">
			<p>{{ row.price || '---' }}</p>
		</div>
		<div :class="{ done: row.done, searched: match(part) }">
			<p>{{ part }}</p>
		</div>
		<div :class="{ done: row.done, searched: match(row.number) }">
			<p>{{ row.number || '---' }}</p>
		</div>
		<div :class="{ done: row.done, searched: match(row.description) }">
			<p>{{ row.description || '---' }}</p>
		</div>
		<div>
			<strong>
				<p>{{ tax }}</p></strong
			>
		</div>
	</div>
</template>

<script>
import TextCell from '@/components/orders/TextCell.vue'
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
	components: {
		TextCell,
	},
}
</script>

<style scoped>
.row {
	width: 85vw;
	display: grid;
	grid-template-columns: 100px 150px 1fr repeat(2, 100px) repeat(2, 300px) 50px;
	color: var(--main-text);
}
.row > div {
	max-width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 20px;
	border-right: var(--main-text) solid 1px;
	border-bottom: var(--main-text) solid 1px;
	cursor: default;
}
.row > div > p {
	width: 100%;
	padding: 10px 10px;
	word-wrap: break-word;
}
.row > div:last-child {
	border-right: none;
}
.done {
	color: var(--green-text);
}
.searched {
	background: #4d83b5;
	/* background: var(--active-text); */
}
</style>
