<template>
	<div v-if="options.show" class="edit__menu" :style="{ left: options.x + 'px', top: options.y + 'px' }">
		<ul>
			<li v-for="item in list" :key="item" :style="{ width: setSizeItem, background: setClassColor(item) }">
				{{ item }}
			</li>
		</ul>
		<inline-svg @click="closeEditMenu" class="edit__menu__close" :src="cross" />
	</div>
</template>

<script>
import { classColors, keysList, lvlList } from '@/assets/constants'
import cross from '@/assets/img/cross.svg'
import inlineSvg from 'vue-inline-svg'

export default {
	data() {
		return {
			list: null,
			cross,
		}
	},
	components: {
		inlineSvg,
	},
	methods: {
		closeEditMenu() {
			this.$emit('closeEditMenu')
		},
		setList() {
			switch (this.options.type) {
				case 'character':
					const classes = []
					classColors.forEach(el => classes.push(el.title))
					this.list = classes
					break
				case 'dungeon':
					this.list = keysList
					break
				case 'lvl':
					this.list = lvlList
					break
				default:
					this.list = null
					break
			}
		},
		setClassColor(name) {
			for (let i = 0; i < classColors.length; i++) {
				if (classColors[i].title === name) {
					return classColors[i].color
				}
			}
		},
	},
	computed: {
		setSize() {
			switch (this.options.type) {
				case 'character':
					return ''
				case 'dungeon':
					return ''
				case 'lvl':
					return ''
				default:
					return ''
			}
		},
		setSizeItem() {
			switch (this.options.type) {
				case 'character':
					return 'calc(25% - 20px)'
				case 'dungeon':
					return 'calc(25% - 20px)'
				case 'lvl':
					return 'calc(20% - 25px)'
				default:
					return ''
			}
		},
	},
	beforeUpdate() {
		this.setList()
	},
	props: {
		options: { type: Object },
	},
}
</script>

<style scoped>
.edit__menu {
	position: fixed;
	padding: 50px;
	/* border: 2px solid var(--main-text); */
	border-radius: 25px;
	background: #3f3f3f;
}
.edit__menu__close {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 50px;
	height: 50px;
	fill: var(--main-text);
	cursor: pointer;
	transition: var(--fast-transition);
}
.edit__menu__close:hover {
	fill: #e64040;
}
.edit__menu > ul {
	width: 520px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	row-gap: 10px;
	column-gap: 10px;
}
.edit__menu > ul > li {
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #d1cd62;
	border-radius: 10px;
	color: var(--dark-text);
	list-style: none;
	cursor: pointer;
	transition: var(--fast-transition);
}
.edit__menu > ul > li:hover {
	transform: scale(1.1);
	background: olivedrab;
}
</style>
