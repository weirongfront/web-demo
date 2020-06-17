import { getToken, setToken, removeToken } from '@/utils/auth';
const state = {
	token: getToken(),
	name: ''
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
	},
	SET_NAME: (state, name) => {
		state.name = name;
	},
	REMOVE_TOKEN: (state, name) => {
		state.token = '';
		state.name = '';
	}
}
const getters = {
	token:state => state.token,
	name:state => state.name
};
const actions = {
	setToken({commit},token){
		setToken(token);
		commit('SET_TOKEN', token);
	},
	async logOut({commit}) {
		commit('REMOVE_TOKEN', '');
		return await removeToken();
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
