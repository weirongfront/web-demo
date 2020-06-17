/**
 * 基于axios封装请求类
 * @date:2019-7-9
 * @author:zwr
 */

import axios from 'axios';
import router from "@/router/index";
import config from '@/config/index';
import {getToken, pullToken} from '@/utils/auth';
import { Message } from 'element-ui';
import qs from 'qs';

let defaultConfig = {
	baseURL: config.baseUrl,
	withCredentials: false, // send cookies when cross-domain requests
	timeout: 20 * 1000 // request timeout
};
const contentType = {
	form:'application/x-www-form-urlencoded;charset=utf-8;',
	file:'multipart/form-data;charset=utf-8;'
};

function getService(config) {
	let servi = axios.create(config);
	// request interceptor
	servi.interceptors.request.use(
		conf => {
			// 默认向 header 中添加 token 字段
			let token = getToken();
			if(token !== null){
				if(conf.headers){
					conf.headers['Authorization'] = 'Bearer '+token;
				}else{
					conf.headers = {'Authorization':'Bearer '+token};
				}
			}
			// 判断 POST 请求 formData 数据提交
			if(conf.method === 'post' && conf.headers['Content-Type'] === contentType.form){
				conf.data = qs.stringify(conf.data);
			}else if(conf.method === 'post' && conf.headers['Content-Type'] === contentType.file){
				let params = new FormData();
				Object.keys(conf.data).map(key => {
					params.append(key,conf.data[key]);
				});
				conf.data = params;
			}
			// 对 GET 请求进行参数转换
			if(conf.method === 'get'){
				if(conf.data && !conf.data.params){
					conf.data = {params:conf.data};
				}
			}
			return conf;
		},
		error => {
			return Promise.reject(error);
		}
	);
	// response interceptor
	servi.interceptors.response.use(
		response => {
			let res = response.data;
			if(res.type == 'application/vnd.ms-excel'||res.type == 'application/x-zip-compressed'){
				let fileName = response.headers['content-disposition']?response.headers['content-disposition'].split('=')[1]:'';
				return {
					fileName: fileName,
					file: res
				}
			} else {
				// if the custom code is not 20000, it is judged as an error.
				if (res.code  && res.code !== 200) {
					if (res.code === 498) {
						// 返回 498 token失效 清除token信息并跳转到登录页面
						pullToken().then(() => {
							router.replace({
								path: '/login'
							})
						});
					} else {
						Message({
							message: res.message || 'Error',
							type: 'error',
							offset:80,
							duration: 3 * 1000
						});
					}
					return Promise.reject(res);
				} else {
					return res.data || res;
				}
			}
		},
		error => {
			return Promise.reject(error);
		}
	);
	return servi;
}

const service = getService(defaultConfig);

/*
*   获取新的封装请求类
 */
function getNewService(param) {
	return getService(Object.assign({},defaultConfig,param))
}
/*
*   获取 CONTENT-TYPE:X-WWW-FORM-URLENCODED  的service
 */
const formService = getNewService({
	headers:{
		'Content-Type':contentType.form
	}
});

/*
*   获取 CONTENT-TYPE:X-WWW-FORM-URLENCODED  的service
 */
const fileService = getNewService({
	headers:{
		'Content-Type':contentType.file
	}
});

export {
	service,
	formService,
	fileService,
	getNewService
};
