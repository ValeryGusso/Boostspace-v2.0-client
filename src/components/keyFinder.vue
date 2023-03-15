<template>
	<div class="finder">
		<p>
			Поиск <br />
			ключа:
		</p>
		<ul>
			<li @click="setSearched(item)" v-for="item in keysList" :style="{ background: setColor(item) }" :key="item">
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
	/* border: 2px solid var(--main-text); */
	/* border-radius: 15px; */
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--main-text);
	cursor: pointer;
	filter: drop-shadow(0 0 2px var(--main-text));
	background: linear-gradient(0deg, var(--bg-dark), var(--bg-second));
	transition: var(--fast-transition);
}
.finder > ul > li:hover {
	filter: drop-shadow(0 0 5px var(--active-text));
	background: linear-gradient(45deg, var(--bg-dark), var(--bg-second));
}
</style>
