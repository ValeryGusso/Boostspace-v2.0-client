export default {
	state: () => ({
		socket: null,
		connection: false,
	}),
	getters: {},
	mutations: {
		connect(state) {
			state.socket = new WebSocket(process.env.VUE_APP_WS)

			state.socket.onopen = () => {
				state.connection = true
			}

			state.socket.onclose = () => {
				state.connection = false
			}

			state.socket.onerror = () => {
				state.connection = false
			}
		},
		clear(state) {
			state.socket.close()
			state.socket = null
			state.connection = false
		},
	},
	namespaced: true,
}
