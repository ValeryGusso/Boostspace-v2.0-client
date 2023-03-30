<template>
	<div class="connectionlost">
		<div class="wrapper">
			<p class="text">
				Упсс... что-то пошло не так и сервер решил прилечь отдохнуть :( <br />
				Попробуй переподключиться или обновить страницу, если данное сообщение не пропадает
			</p>
			<div class="container">
				<inline-svg :class="{ svg: true, active }" :src="lostConnectionImage" />
				<button @click="reconnect" class="button">{{ active ? 'Ожидайте' : 'Подключиться' }}</button>
				<img src="@/assets/img/error_animate.gif" alt="error" />
			</div>
		</div>
	</div>
</template>

<script>
import inlineSvg from 'vue-inline-svg'
import lostConnectionImage from '@/assets/img/lost.svg'
export default {
	data() {
		return { lostConnectionImage, active: false }
	},
	methods: {
		reconnect() {
			if (this.active) {
				return
			}
			this.active = true
			setTimeout(() => {
				this.active = false
			}, 10_000)
			this.$store.commit('websocket/clear')
			this.connectToWS()
		},
		connectToWS() {
			this.$store.commit('websocket/connect', this.connectToWS.bind(this))
			this.$store.commit('websocket/setHandler', this.WShandler.bind(this))
		},
	},
	components: {
		inlineSvg,
	},
	props: {
		WShandler: { type: Function },
	},
}
</script>

<style scoped>
.connectionlost {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--bg-opacity-third);
	z-index: 1001;
}
.wrapper {
	width: 50vw;
	height: 50vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	background: rgba(0, 0, 0, 0.8);
	border: 5px solid var(--red-text);
	border-radius: 20px;
}
.text {
	width: 75%;
	text-align: center;
	font-size: 26px;
	color: var(--main-text);
}
.container {
	display: flex;
	align-items: center;
	column-gap: 50px;
}
.container > img {
	height: 200px;
}
.svg {
	height: 150px;
	width: 100px;
	fill: var(--red-text);
	transition: var(--fast-transition);
}
.svg:hover {
	fill: var(--main-text);
}
.active {
	animation: blink 3s 0s infinite;
}
@keyframes blink {
	0% {
		fill: var(--red-text);
		transform: scale(1);
	}
	50% {
		fill: var(--green-text);
		transform: scale(0.75);
	}
	100% {
		fill: var(--red-text);
		transform: scale(1);
	}
}
.button {
	width: 350px;
	padding: 25px 0;
	font-size: 32px;
	background: var(--active-text);
	transition: var(--fast-transition);
	border-radius: 15px;
	outline: none;
	cursor: pointer;
}
.button:hover {
	background: var(--main-text);
}
</style>
