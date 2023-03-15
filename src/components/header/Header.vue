<template>
	<div class="container__header">
		<menu-nav :list="getMenuList()" />
		<div v-if="$store.state.auth.isAuth" class="user__menu">
			<img draggable="false" src="@/assets/img/default_ava.jpg" alt="avatar" />
			<p class="name">{{ $store.state.auth.user?.name || 'Unnamed user' }}</p>
			<p @click="logout" class="logout">Logout</p>
		</div>
	</div>
</template>

<script>
import MenuNav from '@/components/header/Menu.vue'
import { menuAuthList, menuUnauthList, menuAdminList, menuBannedList } from '@/assets/constants'
import { API } from '@/axios/API'

export default {
	data() {
		return {
			menuAuthList,
			menuUnauthList,
		}
	},
	methods: {
		logout() {
			API.get('/auth/logout').then(res => {
				if (res.data?.success) {
					this.$store.commit('auth/logout')
					localStorage.removeItem('accessToken')
					this.$router.push('/login')
				}
			})
		},
		getMenuList() {
			if (this.$store.state.auth.isAuth) {
				if (this.$store.state.auth.user.isAdmin) {
					return menuAdminList
				}
				if (this.$store.state.auth.user.isBanned) {
					return menuBannedList
				}

				return menuAuthList
			} else {
				return menuUnauthList
			}
		},
	},
	components: {
		MenuNav,
	},
}
</script>

<style scoped>
.container__header {
	height: 10vh;
	display: flex;
	justify-content: space-between;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1000;
}
.user__menu {
	display: flex;
	padding-right: 50px;
	column-gap: 50px;
	color: var(--main-text);
	align-items: center;
	justify-content: center;
}
.user__menu > img {
	width: 8vh;
	height: 8vh;
	border-radius: 50%;
}
.name {
	width: 200px;
	text-align: center;
	font-size: 24px;
}
.logout {
	padding: 10px 50px;
	background: none;
	border: none;
	text-decoration: 5px var(--active-text) underline;
	color: var(--main-text);
	font-size: 28px;
	cursor: pointer;
	transition: var(--fast-transition);
}
.logout:hover {
	color: var(--dark-text);
	background: var(--active-text);
	border-radius: 10px;
	text-decoration: none;
}
</style>
