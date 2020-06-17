/**
 * 项目级配置文件
 * @date 2019-7-8
 * @author zwr
 * @type {{baseUrl: string, title: string}}
 */
const env = process.env;

module.exports = {
	baseUrl: env.VUE_APP_BASE_URL,
	title: env.VUE_APP_TITLE,
	tokenKey: 'fsh-token',
	ugcUrl:env.VUE_APP_YT_UGC_URL+'/#/',
	h5Url: env.VUE_APP_H5_URL
}
