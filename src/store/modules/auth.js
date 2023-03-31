import { API } from '@/axios/API'

export default {
	state: () => ({
		user: null,
		isAuth: false,
	}),
	mutations: {
		setUser(state, payload) {
			if (payload) {
				state.user = payload
				state.isAuth = true
			} else {
				state.user = null
				state.isAuth = false
			}
		},
		logout(state) {
			state.user = null
			state.isAuth = false
		},
	},
	actions: {
		async updateMe({ commit }) {
			const res = await API.get('/auth/me')
			if (res.status === 200) {
				commit('setUser', res.data.player)
			} else {
				commit('logout')
			}
		},
	},
	namespaced: true,
}
