import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import players from '@/store/modules/players'

export default createStore({
	modules: {
		auth,
		players
	},
})
