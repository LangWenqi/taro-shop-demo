import Taro from '@tarojs/taro'

export const programId = {
  [Taro.ENV_TYPE.WEAPP]:{
    mainAppId: "wx276fe2e255ae9c68"
  },
  [Taro.ENV_TYPE.ALIPAY]:{
    mainAppId: "2018121462518911"
  },
  [Taro.ENV_TYPE.SWAN]:{
    mainAppId:'15168119'
  },
  [Taro.ENV_TYPE.TT]:{},
};
export const getGlobal = () =>{
  switch (Taro.getEnv()) {
    case Taro.ENV_TYPE.WEAPP:
      return wx;
    case Taro.ENV_TYPE.ALIPAY:
      return my;
    case Taro.ENV_TYPE.SWAN:
      return swan;
    case Taro.ENV_TYPE.TT:
      return tt;
    default:
      return {}
  }
}
export const getQrKey = () =>{
  switch (Taro.getEnv()) {
    case Taro.ENV_TYPE.ALIPAY:
      return 'qrCode';
    default:
      return 'q'
  }
}
