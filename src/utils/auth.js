import {tokenKey} from '@/config/index';
import {getToken as getUserToken, logOut} from "../data/modules/user";
import store from '@/store/index'

export function getToken() {
	return localStorage.getItem(tokenKey);
}

export function setToken(token) {
	localStorage.setItem(tokenKey, token);
}

export function removeToken() {
	return new Promise((resolve,reject)=>{
		logOut().then(res => {
			if(res.code == 200){
				localStorage.removeItem(tokenKey);
				resolve(res)
			} else {
				reject('error')
			}
		})
	})
}

export function pullToken() {
	return new Promise(async resolve => {
		let token = await getUserToken();
		await store.dispatch('user/setToken',token);
		resolve(token);
	})
}
