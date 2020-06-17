import {service, fileService, getNewService} from '@/data/index';

function service1(param) {
  param.baseURL = 'http://192.168.20.181:8040/';
  return fileService(param);
}

// 获取用户列表
export function getUserList(data) {
  return service({
    url: '/admin/user/list',
    method: 'get',
    params: data
  });
}

// 启用停用
export function updateEnable(data) {
  return service({
    url: '/admin/user/enable',
    method: 'get',
    params: data
  });
}

// 新增修改用户
export function addNewUser(data) {
  return service({
    url: '/admin/user/save',
    method: 'post',
    data: data
  });
}

// 重置密码
export function resetUserPwd(data) {
  return service({
    url: '/admin/user/resetPassword',
    method: 'post',
    data: data
  });
}

// 下载账号
export function downLoadUserFn(data) {
  return service({
    url: 'admin/user/userDownLoad',
    method: 'get',
    params: data,
    responseType: 'blob'
  });
}

// 下载导入模板
export function downLoadUserTempFn(data) {
  return service({
    url: '/admin/user/downLoadExcelTemplate',
    method: 'get',
    params: data,
    responseType: 'blob'
  });
}

// 删除用户
export function delUserById(data) {
  return service({
    url: '/admin/user/delete',
    method: 'post',
    data: data
  });
}

// 用户查看
export function getUserInfo(data) {
  return service({
    url: '/admin/user/getById',
    method: 'get',
    params: data
  });
}

// .账号验证
export function validateAccount(data) {
  return service({
    url: '/admin/user/validateAccount',
    method: 'get',
    params: data
  });
}

// 根据setCode获取下一级子代码
export function getChildCode(data) {
  return service({
    url: '/sys/code/sysCodeInfoItem',
    method: 'get',
    params: data
  });
}

// 批量导入运营用户
export function importSysUser(data) {
  return fileService({
    url: '/admin/user/importSysUser',
    method: 'post',
    data: data
  });
}




// 用户登录
export function login(data) {
  return service({
    url: 'login',
    method: 'post',
    data
  });
}

// 用户退出
export function logOut(data) {
  return service({
    url: '/logout',
    method: 'get',
    data
  });
}

// 登录用户信息
export function getLogUserInfo(data) {
  return service({
    url: '/admin/profile/getUserInfo',
    method: 'get',
    params: data
  });
}

// 登录用户密码修改
export function updatePassword(data) {
  return service({
    url: '/admin/profile/savePassword',
    method: 'post',
    data
  });
}

// 登录用户头像修改
export function updateAvatar(data) {
  return fileService({
    url: '/admin/profile/uploadPhoto',
    method: 'post',
    data
  });
}

// 登录用户头像保存
export function savePhoto(data) {
  return service({
    url: '/admin/profile/savePhoto',
    method: 'post',
    data
  });
}
/*
* 获取token
 */
export function getToken() {
  return service({
    url: 'login',
    method: 'get'
  });
}
