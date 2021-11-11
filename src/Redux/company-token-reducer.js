import { authApi } from "../api/api"

const SET_TOKEN = "/redux/companyTokenReducer/SET_TOKEN"
const SET_LOADING = "/redux/companyTokenReducer/SET_LOADING"

let initialState = {
  token: {
    jwtToken: "",
    rtToken: "",
    identityUserId: 0,
  },
  loading: true,
}

const companyTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

export const setToken = (token) => ({ type: SET_TOKEN, payload: token })

export const setLoading = (flag) => ({ type: SET_LOADING, payload: flag })

export const getCompanyToken = () => {
  return async (dispatch) => {
    let response = await authApi.getToken()
    dispatch(setLoading(false))
    if (response.status === 200) {
      dispatch(setToken(response.data))
      console.log(response.data)
      window.localStorage.setItem("Authorization", response.data.jwtToken)

      return true
    } else {
      dispatch(setToken(null))
      window.localStorage.clear()
      return false
    }
  }
}

export default companyTokenReducer
