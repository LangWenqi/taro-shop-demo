// 用户信息
export const TokenKeys = {
  ACCESS_TOKEN: 'access-token',
  SESSION_TOKEN: 'session-Token',
  SESSION_TIME:10*60*60*1000,
  SOCKET_TIME:60*60*1000,
  USER_ID:'userId',
  API_SIGN:'api_sign',
  PRODUCT_ENV:process.env.NODE_ENV,
  companyId:10001,
  ENV_VERSION:process.env.NODE_ENV==='development'?'trial':'release',
  SALT:'XIJKIEJDJ9J098#$JH3H0001//22P'
};
export const canvasType={
  PNG: 'png',
  JPG: 'jpg'
};
