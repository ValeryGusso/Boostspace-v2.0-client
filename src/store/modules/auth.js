export default {
	state: () => ({
		user: null,
		isAuth: false,
	}),
	getters: {},
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
	namespaced: true,
}
