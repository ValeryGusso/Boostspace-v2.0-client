<template>
	<div class="row">
		<div data-stopscroll="true" :class="{ done: row.done }">
			<p data-stopscroll="true">{{ row.date }}</p>
		</div>
		<div data-stopscroll="true" :class="{ done: row.done, searched: match(row.type) }">
			<p data-stopscroll="true">{{ row.type }}</p>
		</div>
		<div data-stopscroll="true" :class="{ done: row.done, searched: match(row.group) }">
			<p data-stopscroll="true">{{ row.group }}</p>
		</div>
		<div data-stopscroll="true" :class="{ done: row.done, searched: match(row.price) }">
			<p data-stopscroll="true">{{ row.price || '---' }}</p>
		</div>
		<div data-stopscroll="true" :class="{ done: row.done, searched: match(part) }">
			<p data-stopscroll="true">{{ part }}</p>
		</div>
		<div data-stopscroll="true" :class="{ done: row.done, searched: match(row.number) }">
			<p data-stopscroll="true">{{ row.number || '---' }}</p>
		</div>
		<div data-stopscroll="true" :class="{ done: row.done, searched: match(row.description) }">
			<p data-stopscroll="true">{{ row.description || '---' }}</p>
		</div>
		<div data-stopscroll="true" class="noselect">
			<strong>
				<p data-stopscroll="true">{{ tax }}</p></strong
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
	background: var(--bg-blue);
	border-right: var(--main-text) solid 1px !important;
	border-bottom: var(--main-text) solid 1px !important;
}
.noselect {
	user-select: none;
}
</style>
