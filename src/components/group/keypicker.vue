<template>
	<div
		class="keypicker"
		:class="{ active: $attrs.show, searched: options.isSearched }"
		:style="{ '--color': options.color }"
	>
		<p
			@click.stop="click"
			v-if="!isLoading"
			class="keypicker__title"
			:style="{ color: options.isSearched ? 'var(--dark-text)' : 'var(--main-text)' }"
		>
			{{ $attrs.modelValue || options.defaultValue }}
		</p>
		<div v-else class="loader__dance small">
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div
			class="keypicker__list"
			:class="{
				keypicker__list__up: direction === 'up',
				keypicker__list__down: direction === 'down',
				open: $attrs.show,
			}"
			:style="{ '--h': height }"
		>
			<p
				@click="sendInfo(item.title)"
				class="keypicker__item"
				:class="{ keypicker__item__show: $attrs.show, keypicker__item__clear: item.title === 'очистить' }"
				v-for="item in list"
			>
				{{ item.title }}
			</p>
		</div>
	</div>
</template>

<script>
import { keyListSelect, lvlListSelect } from '@/assets/constants'
import { API } from '@/axios/API'

export default {
	data() {
		return {
			keyListSelect,
			lvlListSelect,
			direction: 'down',
			isLoading: false,
		}
	},
	methods: {
		click(e) {
			const { y } = e
			const { innerHeight } = window
			const { show } = this.$attrs
			if (innerHeight - y < 350) {
				this.direction = 'up'
			} else {
				this.direction = 'down'
			}
			this.$emit('changeVisible', { type: this.options.type, visible: show })
			this.$emit('update:show', !show)
		},
		async sendInfo(value) {
			this.$emit('update:show', !this.$attrs.show)
			const payload = { id: this.id, type: this.characterType, [this.options.type]: value }
			this.isLoading = true
			const res = await API.post('/users/character', payload)
			this.isLoading = false
			if (res.status === 200 && res.data.success) {
				this.$store.commit('players/setPlayers', { data: res.data.data, groupList: res.data.groupList })
				this.$emit('updateData')
			}
		},
	},
	computed: {
		list() {
			switch (this.options.type) {
				case 'key':
					return this.direction === 'up' ? [...this.keyListSelect].reverse() : this.keyListSelect
				case 'lvl':
					return this.direction === 'up' ? [...this.lvlListSelect].reverse() : this.lvlListSelect
				default:
					return null
			}
		},
		height() {
			switch (this.options.type) {
				case 'key':
					return '280px'
				case 'lvl':
					return '380px'
				default:
					return null
			}
		},
	},
	props: {
		id: { type: Number },
		characterType: { type: String },
		options: { type: Object },
	},
}
</script>

<style scoped>
.keypicker {
	position: relative;
	width: 100%;
	height: 100%;
	cursor: pointer;
	transition: var(--fast-transition);
}
.keypicker__title,
.keypicker__item {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	color: var(--main-text);
}
.keypicker__title {
	width: 100%;
	height: 100%;
	transition: var(--fast-transition);
}
.keypicker__title:hover {
	background: var(--bg-blue);
	font-size: 26px;
	color: var(--dark-text) !important;
}
.keypicker__item {
	width: 75px;
	height: 40px;
	background: var(--dark-text);
	border-radius: 5px;
	transform: scale(0);
}
.keypicker__item__clear {
	width: 150px;
}
.keypicker__item:hover {
	background: var(--main-text);
	color: var(--dark-text);
}
.keypicker__item__show {
	transform: scale(1);
	transition: transform var(--fast-transition) 0.2s, background-color var(--fast-transition) 0s;
}
.keypicker__list {
	position: absolute;
	top: 0;
	left: 0;
	width: 200px;
	height: 0;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	row-gap: 10px;
	background: var(--bg-blue);
	transition: var(--fast-transition);
	z-index: 1000;
}
.keypicker__list__down {
	transform: translate(-60px, 50px);
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
}
.keypicker__list__up {
	transform: translate(-60px, calc(-100% - 1px));
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
}
.open {
	height: var(--h);
	padding: 25px 0px;
}
.active {
	background: var(--bg-blue);
}
.searched {
	background: var(--color);
}
.small {
	transform: scale(0.5);
}
</style>
