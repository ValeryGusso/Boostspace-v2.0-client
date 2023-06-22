export default {
	state: () => ({
		socket: null,
		handler: null,
		connection: false,
		reconnect: null,
	}),
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

			state.socket.onmessage = state.handler
		},
		clear(state) {
			if (state.socket) {
				state.socket.close()
			}
			state.socket = null
			state.connection = false
		},
		setHandler(state, payload) {
			state.handler = payload
		},
	},
	namespaced: true,
}
