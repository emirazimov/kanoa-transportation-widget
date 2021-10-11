import { authApi } from '../api/api'

const SET_TOKEN = '/redux/companyTokenReducer/SET_TOKEN'

let initialState = {
  token: {
    jwtToken: '',
    rtToken: '',
    identityUserId: 0,
  },
}

const companyTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    default:
      return state
  }
}

export const setToken = (token) => ({ type: SET_TOKEN, payload: token })

export const getCompanyToken = () => {
  return async (dispatch) => {
    let response = await authApi.getToken()

    if (response.status === 200) {
      dispatch(setToken(response.data))
      console.log(response.data)
      window.localStorage.setItem('Authorization', response.data.jwtToken)

      return true
    } else {
      dispatch(setToken(null))
      window.localStorage.clear()
      return false
    }
  }
}

export default companyTokenReducer
