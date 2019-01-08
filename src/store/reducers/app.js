import { APP_QUERY } from '../constants/app'

const INITIAL_STATE = {
  appQuery:{}
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case APP_QUERY:
      return {
        ...state,
        appQuery:action.appQuery
      }
    default:
      return state
  }
}
