import Taro from '@tarojs/taro'
import {createUser, login, getCurrentUser} from '../api/apis/auth'
import {qs} from '../utils'
import {TokenKeys} from "./variable";

export const programLogin = (userInfo) => {
  return Taro.login().then((res) => {
    let params = {
      code: res.code
    };
    if (userInfo) {
      params.userInfo = userInfo;
    }
    const newLogin = userInfo ? createUser : login;

    return newLogin(params).then(rs => {
      let {code, data} = rs;
      if (code == 200) {
        Taro.setStorageSync(TokenKeys.ACCESS_TOKEN, data.accessToken);
        Taro.setStorageSync(TokenKeys.SESSION_TOKEN, new Date().getTime());
        Taro.setStorageSync(TokenKeys.USER_ID, data.userId);
      }
      return rs
    }).catch(er => {
      return er
    });
  }).catch(err => {
    return err
  })
};

export const onGetUserInfo = (e) => {
  let {signature, userInfo} = e.detail;
  if (!userInfo) {
    return new Promise((resolve, reject) => {
      reject('获取用户信息失败');
    })
  }
  return programLogin(JSON.stringify(e.detail));
};
export const getSessionToken = () => {
  return Taro.getStorageSync(TokenKeys.SESSION_TOKEN) && (new Date().getTime() - Taro.getStorageSync(TokenKeys.SESSION_TOKEN) <= TokenKeys.SESSION_TIME);
};
export const toLogin = (code,list = [10002, 20003]) => {
  let pages = Taro.getCurrentPages();
  let page = pages[pages.length - 1];
  if (list.indexOf(code) > -1 && page.route != 'packageLogin/login/login') {
    Taro.navigateTo({url: `/packageLogin/login/login?${qs.stringify({loginType: code})}`});
  }
};
export const getUserDetail = (params,save) =>{
  return getCurrentUser(params).then(res=>{
    console.log(res);
    const {code,data} = res;
    if(save&&code == 200){
      Taro.setStorageSync(TokenKeys.USER_ID, data.id);
    }
    return res;
  })
}
