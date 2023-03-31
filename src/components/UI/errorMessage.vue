<template>
	<div class="container" @click="close" data-close="true" data-stopscroll="true">
		<div class="wrapper" data-stopscroll="true">
			<p class="text" data-stopscroll="true">Упс... что-то пошло не так! Попробуй пвторить попытку немного позже</p>
			<img src="@/assets/img/error.png" draggable="false" data-stopscroll="true" />
			<p class="text" data-stopscroll="true">{{ $store.state.error.error?.message }}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		close(e) {
			if (e.target.dataset.close) {
				this.$store.commit('error/clear')
			}
		},
	},
}
</script>

<style scoped>
.container {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg-opacity-third);
	user-select: none;
}
.wrapper {
	width: 60%;
	height: 75%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 5px solid var(--error);
	border-radius: 25px;
	background: var(--bg-opacity-second);
}
.wrapper > img {
	height: 50%;
	filter: drop-shadow(5px 5px 5px var(--main-text));
}
.text {
	color: var(--main-text);
	font-size: 24px;
	cursor: default;
}
</style>
