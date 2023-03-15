export default {
	state: () => ({
		data: null,
		loading: false,
		status: 'fulfilled',
		error: null,
	}),
	getters: {},
	mutations: {
		setData(state, payload) {
			state.data = payload
		},
		setError(state, payload) {
			state.error = payload
		},
		setStatus(state, payload) {
			state.status = payload
		},
	},
	actions: {
		getUser({ state, commit }) {},
	},
	namespaced: true,
}
