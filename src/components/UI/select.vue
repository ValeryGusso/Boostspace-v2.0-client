<template>
	<div class="container" :style="{ '--w': options.width + 'px' }">
		<ul class="list">
			<div
				@mouseleave="close"
				class="list__bg"
				:style="{ '--h': bgHeight() + 'px' }"
				:class="{ list__bg__open: isOpen }"
			></div>
			<p @click="toggle" class="list__title" :class="{ active: isOpen }">
				{{ options.placeholder }}
				<span :style="{ color: getColor() }">
					{{ selected }}
				</span>
			</p>
			<li
				v-for="(option, i) in options.list"
				@click="setSelected(option.title)"
				@mouseenter="resetTimer"
				:key="i"
				class="list__item"
				:class="{ open: isOpen }"
				:style="{ '--y': `${offsetY(i)}px`, '--bg': option.color, '--x': `${offsetX(i)}px`, '--size': size() }"
			>
				{{ option.title }}
			</li>
		</ul>
	</div>
</template>

<script>
let counter = 0
let row = 1
let col = -1

export default {
	data() {
		return {
			selected: this.options.defaultValue || '',
			isOpen: false,
			timer: null,
		}
	},
	methods: {
		toggle() {
			this.resetTimer()
			this.isOpen = !this.isOpen
			if (this.isOpen) {
				this.close()
			}
		},
		close() {
			this.timer = setTimeout(() => {
				this.isOpen = false
			}, 2000)
		},
		resetTimer() {
			clearTimeout(this.timer)
		},
		setSelected(value) {
			this.selected = value
			this.isOpen = false
			this.$emit('update:modelValue', value)
		},
		getColor() {
			let color = ''
			if (this.options.dontShowColor) {
				// return 'var(--main-text)'
				return ''
			}
			this.options.list.forEach(item => {
				if (item.title === this.selected) {
					color = item.color
				}
			})
			return color
		},
		offsetX(index) {
			switch (this.options.columns) {
				case 1:
					return 0
				case 2:
					if (index === this.options.list.length - 1 && this.options.list.length % 2 !== 0) {
						return 0
					}
					return index % 2 === 0 ? (this.options.width / 4) * -1 : this.options.width / 4
				case 3:
					let result
					if (col < 2) {
						result = (this.options.width / 3) * col
						col++
					} else {
						col = -1
						result = (this.options.width / 3) * col
					}

					// Центрирование неполной последней строки
					if (this.options.list.length % this.options.columns === 1 && index === this.options.list.length - 1) {
						result = 0
					}

					if (this.options.list.length % this.options.columns === 2 && index === this.options.list.length - 2) {
						result = (this.options.width / 6) * -1
					}

					if (this.options.list.length % this.options.columns === 2 && index === this.options.list.length - 1) {
						result = this.options.width / 6
					}

					// Обнуление переменной колонки для нового цикла
					if (col > 1 || index === this.options.list.length - 1) {
						col = -1
					}
					return result
				default:
					return 0
			}
		},
		offsetY(index) {
			switch (this.options.columns) {
				case 1:
					return (index + 1) * 60
				case 2:
					return index % 2 === 0 ? (index + 1) * 30 + 30 : index * 30 + 30
				case 3:
					let result = 0
					const amount = Math.ceil(this.options.list.length / this.options.columns)

					if (counter >= this.options.columns) {
						row++
						counter = 0
					}

					if (row <= amount) {
						result = row * 60
					} else {
						result = row * 60
					}
					counter++

					// Обнуление вспомогательных переменных для нового цикла
					if (index === this.options.list.length - 1) {
						counter = 0
						row = 1
					}
					return result
				default:
					return (row + 1) * 60
			}
		},
		size() {
			switch (this.options.columns) {
				case 1:
					return `95%`
				case 2:
					return `50%`
				case 3:
					return `33%`
				default:
					return '100%'
			}
		},
		bgHeight() {
			return Math.ceil(this.options.list.length / this.options.columns) * 60
		},
	},
	props: {
		options: { type: Object },
	},
}
</script>

<style scoped>
.container {
	width: var(--w);
	height: 50px;
}
.container > ul {
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.list__bg {
	position: absolute;
	top: 53px;
	width: 10px;
	height: 10px;
	background: transparent;
	transition: var(--fast-transition);
}
.list__bg__open {
	width: calc(var(--w) + 25px);
	height: calc(var(--h) + 15px);
	background: var(--main-text);
	/* background: var(--bg-gray); */
	/* background: #c6ccce; */
	border-radius: 10px;
	z-index: 100;
}
.list__title {
	width: 75%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 0.3em;
	border-bottom: 5px solid var(--main-text);
	border-top: none;
	color: var(--main-text);
	user-select: none;
	cursor: pointer;
	font-size: 26px;
	z-index: 10;
	transition: 0.5s;
}
.list__title:hover,
.active {
	width: 100%;
	border-bottom: 5px solid var(--active-text);
}
.container > ul > li {
	position: absolute;
	top: 53px;
	width: calc(var(--size) - 5px);
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	list-style: none;
	background: var(--dark-text);
	color: var(--main-text);
	/* background: var(--main-text);
	color: var(--dark-text); */
	border-radius: 5px;
	user-select: none;
	cursor: pointer;
	transition: 0.5s;
	font-size: 22px;
	font-style: italic;
	font-weight: bold;
	filter: opacity(0);
	transform: translate(0, -50px);
	z-index: -1;
}
.open {
	filter: opacity(1) !important;
	transform: translate(var(--x), calc(var(--y) - 53px)) scale(1) !important;
	z-index: 1001 !important;
}
.open:hover {
	color: var(--bg);
	transform: translate(var(--x), calc(var(--y) - 53px)) scale(1) !important;
}
</style>
