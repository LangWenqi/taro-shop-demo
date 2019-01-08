import { COMPANY_MSG } from '../constants/company'

const INITIAL_STATE = {
  companyMsg:{}
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMPANY_MSG:
      return {
        ...state,
        companyMsg:action.companyMsg
      }
    default:
      return state
  }
}
