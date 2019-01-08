import fetch from '../request'
//登录
export const login = (params) => fetch('/login', params, 'GET', {
  unPrivate: true
});
//注册
export const createUser = (params) => fetch('/register', params, 'POST', {
  unPrivate: true
});
//获取用户信息
export const getCurrentUser = (params) => fetch('/user/current', params, 'GET');
