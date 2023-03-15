<template>
	<header>
		<header-bar />
	</header>
	<div class="content">
		<router-view v-if="$store.state.auth.isAuth && $store.state.auth.user.isAdmin" name="admin" />
		<router-view v-if="$store.state.auth.isAuth && !$store.state.auth.user.isAdmin" name="auth" />
		<router-view v-if="!$store.state.auth.isAuth" name="unauth" />
	</div>
	<footer>
		<footer-block />
	</footer>
</template>

<script>
import HeaderBar from '@/components/header/Header.vue'
import loginPage from '@/pages/Login.vue'
import registrationPage from '@/pages/Registration.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import footerBlock from './components/footer/footer.vue'
import { API } from '@/axios/API'

export default {
	data() {
		return {}
	},
	components: {
		HeaderBar,
		loginPage,
		registrationPage,
		SettingsPage,
		footerBlock,
	},
	mounted() {
		API.get('/auth/me').then(res => {
			if (res.status === 200) {
				this.$store.commit('auth/setUser', res.data.player)
				this.$router.push('/home')
			} else {
				this.$store.commit('auth/setUser', null)
				this.$router.push('/welcome')
			}
		})
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
	--green-text: #7fe760;
	--red-text: #d84848;
	--active-text: #32a4d5;
	--bg-dark: #151915;
	--bg-second: #555150;
	--bg-blue: #4d9ec3;
	--bg-red: #eb6b4e;
	--bg-yellow: #e8ca55;
	--bg-green: #52e081;
	--error: #ec412b;
	--fast-transition: 0.3s;
}
::-webkit-scrollbar {
	width: 10px;
}
::-webkit-scrollbar-track {
	background: #5f5f5f;
}
::-webkit-scrollbar-thumb {
	background: rgb(189, 188, 188);
	border-radius: 5px;
}
body {
	min-height: 100vh;
	background: url('@/assets/img/bg.svg');
	overflow-x: hidden;
}
header {
	position: fixed;
	top: 0;
	width: 100%;
	max-height: 10vh;
	z-index: 1000;
	background: var(--bg-dark);
}
.content {
	width: 100%;
	min-height: 90vh;
	margin-top: 10vh;
}
footer {
	width: 100%;
	height: 15vh;
	background: rgba(0, 0, 0, 0.5);
}
.table > *:nth-child(2n) {
	background: linear-gradient(45deg, var(--bg-second), var(--bg-dark));
}
.table > *:nth-child(2n + 1) {
	background: linear-gradient(45deg, var(--bg-dark), var(--bg-second));
}
</style>
