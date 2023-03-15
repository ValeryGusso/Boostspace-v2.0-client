<template>
	<div class="container">
		<inline-svg @click="copy" :class="{ active: showCopied }" :src="showCopied ? copyImage : options.image" />
		<p>{{ showCopied ? 'Скопировано!' : options.value }}</p>
	</div>
</template>

<script>
import inlineSvg from 'vue-inline-svg'
import copyImage from '@/assets/img/copy.svg'

export default {
	data() {
		return {
			copyImage,
			showCopied: false,
		}
	},
	methods: {
		copy() {
			navigator.clipboard.writeText(this.options.value)
			this.showCopied = true
			setTimeout(() => {
				this.showCopied = false
			}, 3000)
		},
	},
	components: {
		inlineSvg,
	},
	props: {
		options: { type: Object },
	},
}
</script>

<style scoped>
.container {
	width: 300px;
	display: grid;
	align-items: center;
	grid-template-columns: 50px 1fr;
	column-gap: 10px;
}
.container > svg {
	width: 45px;
	height: 45px;
	filter: grayscale(1);
	cursor: pointer;
	transition: var(--fast-transition);
}
.active {
	filter: grayscale(0) !important;
}
.container > svg:hover {
	filter: grayscale(0);
}
.container > p {
	font-size: 20px;
	color: var(--main-text);
	transition: var(--fast-transition);
}
.container > p:hover {
	color: #fff;
}
</style>
