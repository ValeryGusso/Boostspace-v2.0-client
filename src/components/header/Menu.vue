<template>
	<div class="container" :style="{ background: isOpen ? 'black' : 'transparent' }">
		<inline-svg @click="isOpen = !isOpen" class="menu__icon" :src="isOpen ? menuClose : menuOpen"></inline-svg>
		<p class="menu__logo">Boostspace {{ $store.state.auth.msg }}</p>
		<ul class="menu__list" :class="isOpen && isActive ? 'open' : 'close'">
			<li @click="click" v-for="item in list" :key="item.path">
				<router-link :to="item.path">
					<inline-svg class="menu__list__svg" :src="item.image"></inline-svg>
					{{ item.title }}</router-link
				>
			</li>
		</ul>
	</div>
</template>

<script>
import menuOpen from '@/assets/img/menu_open.svg'
import menuClose from '@/assets/img/menu_close.svg'
import inlineSvg from 'vue-inline-svg'

export default {
	data() {
		return {
			menuOpen,
			menuClose,
			isOpen: false,
		}
	},
	methods: {
		click() {
			this.isOpen = false
			this.$emit('menuClick')
		},
	},
	props: {
		list: { type: Object, required: true },
		isActive: { type: Boolean },
	},
	components: {
		inlineSvg,
	},
}
</script>

<style scoped>
.container {
	display: flex;
	transition: var(--fast-transition);
	z-index: 100;
}
.menu__icon {
	position: absolute;
	top: 2vh;
	left: 20px;
	width: 6vh;
	height: 6vh;
	fill: var(--main-text);
	cursor: pointer;
}
.menu__logo {
	top: calc(5vh - 35px);
	left: 100px;
	position: absolute;
	font-size: 60px;
	color: var(--main-text);
	user-select: none;
}
.menu__icon:hover {
	transform: scale(1.05);
	fill: var(--active-text);
}
.menu__list {
	position: absolute;
	left: 100px;
	display: flex;
	flex-direction: column;
	padding: 20px 75px;
	/* padding-left: 15px; */
	row-gap: 25px;
	user-select: none;
	transition: var(--fast-transition);
	background: black;
	/* border: 2px solid var(--main-text); */
}
.open {
	top: 0;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	transform: none;
}
.close {
	top: -50vh;
}
.menu__list > li {
	position: relative;
	list-style: none;
	cursor: pointer;
}
.menu__list > li > a {
	display: flex;
	align-items: center;
	column-gap: 10px;
	padding-bottom: 10px;
	font-size: 32px;
	color: var(--main-text);
	text-decoration: none;
	transition: var(--fast-transition);
}
.menu__list__svg {
	width: 35px;
	height: 35px;
	fill: var(--main-text);
	transition: var(--fast-transition);
}
.menu__list li:hover .menu__list__svg {
	fill: var(--active-text);
}
.menu__list li:hover a {
	color: var(--active-text);
}
.menu__list > li::after {
	content: '';
	position: absolute;
	width: 1%;
	border-bottom: 5px solid transparent;
	filter: blur(0);
	transition: 0.5s;
}
.menu__list > li:hover::after {
	width: 100%;
	border-bottom: 5px solid var(--active-text);
	filter: blur(2px);
}
</style>
