import {APP_QUERY} from '../constants/app'

export const getQrCodeQueryAction = (appQuery) => {
  return {
    type: APP_QUERY,
    appQuery
  }
}

// 异步的action
// export const asyncAdd = ()=> dispatch => {
//   setTimeout(() => {
//     dispatch(add(1))
//   }, 2000)
// }
