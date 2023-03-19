<template>
	<!-- @mouseenter="isActive = true"
	@mouseleave="isActive = false" -->
	<!-- :class="{ container__header: true, container__header__show: isActive }" -->
	<div class="container__header" :style="{ '--offset': `${offset}vh` }">
		<menu-nav :list="getMenuList()" :isActive="offset > 5" />
		<div v-if="$store.state.auth.isAuth" class="user__menu">
			<img draggable="false" src="@/assets/img/default_ava.jpg" alt="avatar" />
			<p class="name">{{ $store.state.auth.user?.name || 'Unnamed user' }}</p>
			<p v-if="!loading" @click="logout" class="logout">Logout</p>
			<div v-else class="loader__dance logout__samesize">
				<div></div>
				<div></div>
				<div></div>
			</div>
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
			loading: false,
			// isActive: false,
		}
	},
	methods: {
		logout() {
			this.loading = true
			API.get('/auth/logout')
				.then(res => {
					if (res.status === 200 && res.data?.success) {
						this.$store.commit('auth/logout')
						localStorage.removeItem('accessToken')
						this.$router.push('/welcome')
					}
				})
				.finally(() => {
					this.loading = false
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
	props: {
		offset: { type: Number },
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
	/* background: var(--active-text); */
	/* border-bottom: 3px solid transparent; */
	background: rgba(0, 0, 0, 0.75);
	transform: translateY(-9vh);
	transform: translateY(calc(-10vh + var(--offset)));
	transition: var(--fast-transition);
	/* transition: transform var(--fast-transition) 0s, background-color var(--fast-transition) var(--fast-transition),
		border-bottom var(--fast-transition) var(--fast-transition); */
	z-index: 1000;
}
/* .container__header__show {
	border-bottom: 3px solid var(--main-text);
	transition: transform var(--fast-transition), border-bottom var(--fast-transition);
	transform: translateY(0);
} */
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
	cursor: default;
	user-select: none;
}
.logout {
	width: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 50px;
	background: none;
	border: none;
	text-decoration: 3px var(--active-text) underline;
	color: var(--main-text);
	font-size: 28px;
	cursor: pointer;
	transition: var(--fast-transition);
}
.logout:hover {
	color: var(--dark-text);
	background: var(--active-text);
	border-radius: 5px;
	text-decoration: none;
}
.logout__samesize {
	width: 150px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: translateX(30px);
}
</style>
