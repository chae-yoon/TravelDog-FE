import { LOGIN_USER } from '../_actions/types'

const user = function (state={}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loginSuccess: action.payload }
    default:
      return state
  }
}

export default user