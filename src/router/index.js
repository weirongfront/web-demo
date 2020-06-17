import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {pullToken} from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';
import {removeContextData} from '../utils/sessionData'

Vue.use(Router);

// 所有路由数组
const routes = [];
// 动态加载路由
const modulesFiles = require.context('./modules', true, /\.js$/);
modulesFiles.keys().map((modulePath) => {
	const value = modulesFiles(modulePath);
	//判断是否为数组路由
	if(value.default.length || value.default.length ===0){
		routes.push(...value.default);
	}else{
		routes.push(value.default);
	}
});

const createRouter = () => new Router({
	routes
});

const router = createRouter();

export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

NProgress.configure({showSpinner: false}) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start();
	// set page title
	document.title = getPageTitle(to.meta.title);
	// determine whether the user has logged in
	const hasToken = store.getters['user/token'];
	if (hasToken) {
		// determine whether the user has obtained his permission roles through getInfo
		const hasRoles = true;//store.getters.roles && store.getters.roles.length > 0
		if (hasRoles) {
			next()
		} else {
			try {
				// get user info
				// note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
				const {roles} = await store.dispatch('user/getInfo')

				// generate accessible routes map based on roles
				const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

				// dynamically add accessible routes
				router.addRoutes(accessRoutes)

				// hack method to ensure that addRoutes is complete
				// set the replace: true, so the navigation will not leave a history record
				next({...to, replace: true})
			} catch (error) {
				// remove token and go to login page to re-login
				await store.dispatch('user/resetToken')
				Message.error(error || 'Has Error')
				next(`/login?redirect=${to.path}`)
				NProgress.done()
			}
		}
	} else {
		/* has no token*/
		// 去获取token
		await pullToken();
		next(`/login?redirect=${to.path}`);
		NProgress.done()
	}
})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
});
router.beforeEach((to, from, next) => {
	if(to.path != '/institutional' && to.path != '/institutionalAdd'){
		removeContextData('idx')
        removeContextData('node')
	}
	next()
})
//export default router
export default router;
