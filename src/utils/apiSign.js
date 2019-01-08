import {TokenKeys} from './variable'
import md5 from './md5'

 const getApiSign = (params = {}) => {
  const data =  Object.assign({}, params);
  const queryString = Object.keys(data).sort().map(key => `${key}=${data[key]}`).join('&');
  const signStr = `${TokenKeys.SALT}${queryString}${TokenKeys.SALT}`;
  return md5(signStr);
};
export {getApiSign}

