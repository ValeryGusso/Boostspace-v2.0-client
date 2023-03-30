export default {
	state: () => ({
		socket: null,
		connection: false,
		reconnect: null,
	}),
	getters: {},
	mutations: {
		connect(state, payload) {
			state.socket = new WebSocket(process.env.VUE_APP_WS)

			state.socket.onopen = () => {
				state.connection = true
			}

			state.socket.onclose = () => {
				state.connection = false
				payload()
			}

			state.socket.onerror = () => {
				state.connection = false
				payload()
			}
		},
		clear(state) {
			if (state.socket) {
				state.socket.close()
			}
			state.socket = null
			state.connection = false
		},
		setHandler(state, payload) {
			state.socket.onmessage = payload
		},
	},
	namespaced: true,
}
