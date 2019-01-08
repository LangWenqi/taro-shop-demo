import {COMPANY_MSG} from '../constants/company'
import {getCompanyInfo} from '../../api/apis/common'

export const setCompanyMsg = (companyMsg) => {
  return {
    type: COMPANY_MSG,
    companyMsg
  }
}

// 异步的action
export const getCompanyMsg = ()=> dispatch => {
  getCompanyInfo().then(res=>{
    const {code,data} = res;
    if(code == 200){
      dispatch(setCompanyMsg(data))
    }
  })
}
