export default {
	state: () => ({
		error: null,
		isError: false,
	}),
	mutations: {
		setError(state, payload) {
			state.error = payload
			state.isError = true
		},
		clear(state) {
			state.error = null
			state.isError = false
		},
	},
	namespaced: true,
}
