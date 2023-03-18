<template>
	<div
		:class="{ container: true, loading: options.isLoading }"
		:style="{ '--w': options.width + 'px', '--d': options.defaultWidth + 'px' }"
	>
		<button @click="click" :style="{ '--fsz': options.fontSize + 'px' }" :tabindex="options.tabindex">
			{{ options.isLoading ? options.loadingText : options.text }}
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		click(e) {
			if (this.options.prevent) {
				e.preventDefault()
			}
			this.options.handler()
		},
	},
	props: {
		options: { type: Object },
	},
}
</script>

<style scoped>
.container {
	position: relative;
	width: var(--w);
	height: 100%;
	display: flex;
	justify-content: center;
}
.container > button {
	width: var(--d);
	height: 100%;
	padding-top: 15px;
	padding-bottom: 5px;
	font-size: var(--fsz);
	color: var(--main-text);
	background: none;
	border: none;
	border-bottom: 4px solid var(--main-text);
	cursor: pointer;
	transition: var(--fast-transition);
}
.container > button:hover {
	width: var(--w);
	border-radius: 5px;
	background: var(--main-text);
	color: var(--dark-text);
}
.loading {
	position: relative;
	background: var(--main-text);
}
.loading > button {
	color: var(--dark-text) !important;
}
.loading::after {
	content: '';
	position: absolute;
	top: -18px;
	left: -18px;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	border: 2px solid var(--dark-text);
	animation: move 5s infinite linear;
	z-index: 1001;
}
.loading::before {
	content: '';
	position: absolute;
	top: -18px;
	left: -18px;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	border: 2px solid var(--dark-text);
	animation: move2 5s infinite linear;
	z-index: 1001;
}
@keyframes move {
	0% {
		top: -18px;
		left: -18px;
		transform: scale(1);
		background: var(--main-text);
	}
	25% {
		top: -18px;
		left: calc(100% - 18px);
	}
	50% {
		top: calc(100% - 18px);
		left: calc(100% - 18px);
		transform: scale(0.25);
		background: var(--active-text);
	}
	75% {
		top: calc(100% - 18px);
		left: -18px;
	}
	100% {
		top: -18px;
		left: -18px;
		transform: scale(1);
		background: var(--main-text);
	}
}
@keyframes move2 {
	0% {
		top: calc(100% - 18px);
		left: calc(100% - 18px);
		transform: scale(0.25);
		background: var(--active-text);
	}
	25% {
		top: calc(100% - 18px);
		left: -18px;
	}
	50% {
		top: -18px;
		left: -18px;
		transform: scale(1);
		background: var(--main-text);
	}
	75% {
		top: -18px;
		left: calc(100% - 18px);
	}
	100% {
		top: calc(100% - 18px);
		left: calc(100% - 18px);
		transform: scale(0.25);
		background: var(--active-text);
	}
}
</style>
