import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import players from '@/store/modules/players'
import websocket from '@/store/modules/websocket'
import error from '@/store/modules/error'

export default createStore({
	modules: {
		auth,
		players,
		websocket,
		error,
	},
})
