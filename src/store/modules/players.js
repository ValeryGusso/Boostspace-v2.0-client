import { API } from '@/axios/API'

export default {
	state: () => ({
		data: null,
		groupList: null,
		isLoading: false,
		status: 'init',
	}),
	mutations: {
		setPlayers(state, payload) {
			if (payload === null) {
				state.data = null
				state.groupList = null
			}
			state.data = payload.data
			state.groupList = payload.groupList
		},
		setLoading(state, payload) {
			state.isLoading = payload.isLoading
			state.status = payload.status
		},
		clear(state) {
			state.data = null
			state.groupList = null
			state.isLoading = false
			state.status = 'init'
		},
	},
	actions: {
		async getPlayers({ commit }) {
			commit('setLoading', { isLoading: true, status: 'pending' })
			const res = await API.get('/users')
			if (res.status === 200) {
				commit('setPlayers', { data: res.data.data, groupList: res.data.groupList })
				commit('setLoading', { isLoading: false, status: 'fulfilled' })
			} else {
				commit('setPlayers', null)
				commit('setLoading', { isLoading: false, status: 'error' })
			}
		},
	},
	namespaced: true,
}
