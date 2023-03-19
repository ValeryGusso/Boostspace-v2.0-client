<template>
	<div class="finder">
		<p>
			Поиск <br />
			ключа:
		</p>
		<ul>
			<li
				@click="setSearched(item)"
				v-for="item in keysList"
				:style="{ background: setColor(item) }"
				:class="{ searched: setColor(item) }"
				:key="item"
			>
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<script>
import { keysList, searchedColors } from '@/assets/constants'

export default {
	data() {
		return {
			keysList,
		}
	},
	props: {
		searched: { type: Array },
	},
	methods: {
		setSearched(item) {
			this.$emit('setSearched', item)
		},
		setColor(item) {
			if (!this.searched) {
				return null
			}
			for (let i = 0; i < this.searched.length; i++) {
				if (this.searched[i] === item) {
					return searchedColors[i]
				}
			}
		},
	},
}
</script>

<style>
.finder > p {
	margin-bottom: 15px;
	font-size: 52px;
	font-weight: bold;
	font-style: italic;
	text-align: center;
	color: var(--main-text);
}
.finder > ul {
	width: 200px;
	display: flex;
	flex-wrap: wrap;
	column-gap: 10px;
	row-gap: 10px;
}
.finder > ul > li {
	width: calc(50% - 5px);
	height: 75px;
	font-size: 30px;
	font-weight: bold;
	font-style: italic;
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--main-text);
	cursor: pointer;
	border-radius: 10px;
	border: 2px solid var(--main-text);
	transition: var(--fast-transition);
}
.finder > ul > li:hover {
	background: var(--bg-opacity-third);
	color: var(--active-text);
	border: 2px solid transparent !important;
}
.finder > ul > li:nth-child(2n):hover {
	transform: translateX(10px);
}
.finder > ul > li:nth-child(2n + 1):hover {
	transform: translateX(-10px);
}
.searched {
	color: var(--dark-text) !important;
	border: 2px solid transparent !important;
}
</style>
