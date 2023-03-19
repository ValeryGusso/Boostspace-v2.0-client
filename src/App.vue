<template>
	<header v-if="isLoaded">
		<header-bar @menuClick="menuClick" :offset="offset" />
	</header>
	<div v-if="isLoaded" :class="{ content: true, stopscroll: offset !== 10 }" data-scroll="true">
		<router-view
			@updateData="updateData"
			v-if="$store.state.auth.isAuth && $store.state.auth.user?.isAdmin"
			name="admin"
		/>
		<router-view
			@updateData="updateData"
			v-if="$store.state.auth.isAuth && !$store.state.auth.user?.isAdmin"
			name="auth"
		/>
		<router-view
			@updateData="updateData"
			v-if="$store.state.auth.isAuth && $store.state.auth.user?.isBanned"
			name="banned"
		/>
		<router-view v-if="!$store.state.auth.isAuth" name="unauth" />
	</div>
	<footer v-if="isLoaded">
		<footer-block />
	</footer>
	<div v-if="!isLoaded" class="app__loading">
		<img class="app__loading__img first" src="@/assets/img/loading.gif" alt="loading" draggable="false" />
		<img class="app__loading__img second" src="@/assets/img/loading.gif" alt="loading" draggable="false" />
		<p class="app__loading__text">Идёт загрузка пользователя, ожидайте...</p>
	</div>
	<connection-lost v-if="isLoaded && !$store.state.websocket.connection" />
	<!-- <connection-lost v-if="true" /> -->
</template>

<script>
import HeaderBar from '@/components/header/Header.vue'
import loginPage from '@/pages/Login.vue'
import registrationPage from '@/pages/Registration.vue'
import connectionLost from './components/UI/connectionLost.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import footerBlock from './components/footer/footer.vue'
import { API } from '@/axios/API'
import { debounce } from './utils/debounce'

export default {
	data() {
		return {
			isLoaded: false,
			socket: null,
			connectionLost: true,
			offset: 0,
		}
	},
	methods: {
		updateData() {
			this.$store.state.websocket.socket.send('updated')
		},
		menuClick() {
			this.offset = 0
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
			document.body.style.overflow = 'hidden'
		},
		scroll(e) {
			const dy = e.wheelDeltaY

			if (dy > 0) {
				if (this.offset !== 0) {
					this.offset = 0
					if (window.scrollY > 0) {
						window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
					}
					document.body.style.overflow = 'hidden'
				}
			} else {
				if (e.target.dataset.stopscroll) {
					return
				}
				if (this.offset < 10) {
					this.offset = 10
					document.body.style.overflow = null
				}
			}
		},
	},
	mounted() {
		document.body.style.overflow = 'hidden'

		window.addEventListener('wheel', e => {
			debounce(() => this.scroll(e), 100)
		})

		this.$store.commit('websocket/connect')

		this.$store.state.websocket.socket.onmessage = msg => {
			switch (msg.data) {
				case 'updated':
					this.$store.dispatch('players/getPlayers')
					break
				case 'ban':
					this.$store.dispatch('auth/updateMe')
					break
			}
		}

		if (localStorage.getItem('accessToken')) {
			API.get('/auth/me')
				.then(res => {
					this.isLoaded = true
					if (res.status === 200) {
						this.$store.commit('auth/setUser', res.data.player)
						this.$router.push('/home')
					} else {
						this.$store.commit('auth/setUser', null)
						this.$router.push('/welcome')
					}
				})
				.finally(() => {
					this.isLoaded = true
				})
		} else {
			this.$router.push('/welcome')
			this.isLoaded = true
		}
	},
	components: {
		HeaderBar,
		loginPage,
		registrationPage,
		SettingsPage,
		footerBlock,
		connectionLost,
	},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Ubuntu', sans-serif;
}
:root {
	--main-text: #efefef;
	--dark-text: #232523;
	--green-text: #45c679;
	--red-text: #d84848;
	--active-text: #32a4d5;
	--bg-dark: #333537;
	--bg-second: #555150;
	--bg-blue: #4d9ec3;
	--bg-red: #eb6b4e;
	--bg-yellow: #e8ca55;
	--bg-green: #52e081;
	--bg-gray: #808b90;
	--bg-opacity-first: rgba(0, 0, 0, 0.35);
	--bg-opacity-second: rgba(0, 0, 0, 0.5);
	--bg-opacity-third: rgba(0, 0, 0, 0.5);
	--error: #ec412b;
	--fast-transition: 0.3s;
}
::-webkit-scrollbar {
	width: 0px;
}
::-webkit-scrollbar-track {
	background: #5f5f5f;
}
::-webkit-scrollbar-thumb {
	background: rgb(189, 188, 188);
	border-radius: 5px;
}
body {
	height: 115vh;
	background: url('@/assets/img/bg (2).svg');
	overflow-x: hidden;
}
header {
	position: fixed;
	top: 0;
	width: 100%;
	height: 1vh;
	z-index: 1000;
}
.content {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 1vh;
}
footer {
	width: 100%;
	height: 15vh;
	background: rgba(0, 0, 0, 0.5);
}
.stopscroll {
	overflow: hidden;
}
.table > *:nth-child(2n) {
	background: var(--bg-opacity-first);
}
.table > *:nth-child(2n + 1) {
	background: var(--bg-opacity-first);
}
.table__title {
	background: var(--bg-opacity-third);
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
}
.table__scrollbar::-webkit-scrollbar {
	width: 15px;
}
.table__scrollbar::-webkit-scrollbar-track {
	background: #5f5f5f;
}
.table__scrollbar::-webkit-scrollbar-thumb {
	background: rgb(189, 188, 188);
	border-radius: 5px;
}
.app__loading {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	user-select: none;
}
.app__loading__img {
	width: 50vw;
	transform: translateX(-50vw);
}
.first {
	transform: translateX(-50vw);
	animation: movefirst linear 6s infinite;
}
.second {
	transform: translateX(-100vw);
	animation: movesecond linear 6s infinite;
	animation-delay: 3s;
}
@keyframes movefirst {
	0% {
		transform: translateX(-50vw) rotateY(180deg);
	}
	100% {
		transform: translateX(100vw) rotateY(180deg);
	}
}
@keyframes movesecond {
	0% {
		transform: translateX(-100vw) rotateY(180deg);
	}
	100% {
		transform: translateX(50vw) rotateY(180deg);
	}
}
.app__loading__text {
	position: absolute;
	top: 70vh;
	font-size: 62px;
	color: var(--main-text);
	cursor: default;
	user-select: none;
}
.loader__dance {
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
}
.loader__dance div {
	display: inline-block;
	position: absolute;
	left: 8px;
	width: 16px;
	animation: loader__dance 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.loader__dance div:nth-child(1) {
	left: 8px;
	animation-delay: -0.24s;
}
.loader__dance div:nth-child(2) {
	left: 32px;
	animation-delay: -0.12s;
}
.loader__dance div:nth-child(3) {
	left: 56px;
	animation-delay: 0;
}
@keyframes loader__dance {
	0% {
		top: 8px;
		height: 64px;
		background: var(--active-text);
	}
	50%,
	100% {
		top: 24px;
		height: 32px;
		background: var(--main-text);
	}
}
</style>
