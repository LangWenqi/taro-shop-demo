import Taro from '@tarojs/taro'
import {transformObjectString} from '../utils'
import {TokenKeys} from '../utils/variable'
import {programId} from '../utils/appId'
import {programLogin,getSessionToken,toLogin} from '../utils/auth'
import domainsFuc from '../api/domains'
import {getApiSign} from '../utils/apiSign'

const request = (path,params = {},method='GET',config={}) => {
  if((!config.unPrivate)&&(!getSessionToken())){
    return programLogin().then(res=>{
      const {code,data} =res;
      if(code == 200){
        return doRequest(path,params,method,config);
      }else{
        return res;
      }
    }).catch(res=>{
     return res;
    });
  }else{
    return doRequest(path,params,method,config);
  }
};
const doRequest=(path,params,method,config)=>{
  if(config.loading){
    Taro.showLoading({
      title:'数据加载中...',
      icon:'loading',
      mask:config.mask
    });
  };
  let requestMethod=method.toUpperCase();
  let appId=programId[Taro.getEnv()].mainAppId;
  let newParams = Object.assign({},params,{appId},{companyId:TokenKeys.companyId});
  let signKey = getApiSign(newParams);
  let resultParams = Object.assign({}, config.transform?transformObjectString(newParams):newParams,{signKey});
  let url=config.selfDomain?path:domainsFuc(TokenKeys.PRODUCT_ENV).domain+path;
  let header={
    "Content-Type":requestMethod==='POST'?"application/json":"application/x-www-form-urlencoded",
  };
  if(!config.unPrivate){
    header[TokenKeys.ACCESS_TOKEN]=Taro.getStorageSync(TokenKeys.ACCESS_TOKEN);
  }
  return Taro.request({
    url,
    data: resultParams,
    method:requestMethod,
    header:header
  }).then(res=>{
    if(res.data.code==200){

    }else if([10002,20003].indexOf(res.data.code)>-1){
      // const list = [10002,20003];
      // toLogin(res.data.code,list);
    }else{
      if(res.data.msg){
        Taro.showToast({
          title: res.data.msg,
          duration: 1000,
          icon: 'none'
        });
      }

    }
    setTimeout(()=>{
      Taro.hideLoading();
    },500);
    return res.data;
  }).catch(err=>{
    setTimeout(()=>{
      Taro.hideLoading();
    },500);
    return err;
  });
};
export default request
