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
				console.log('WebSocket UP')
			}

			state.socket.onclose = () => {
				state.connection = false
				console.log('WebSocket DOWN')
			}

			state.socket.onerror = () => {
				state.connection = false
				console.log('WebSocket ERROR')
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
