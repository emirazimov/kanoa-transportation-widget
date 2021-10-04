import { authApi } from "../api/api"

const SET_HOURLY = "/redux/companyTokenReducer/SET_HOURLY"

let initialState = {
  hourly: false,
}

const setHourlyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOURLY:
      return {
        ...state,
        hourly: action.payload,
      }
    default:
      return state
  }
}

export const setHourlyActionCreator = (flag) => ({
  type: SET_HOURLY,
  payload: flag,
})

export const setHourlyRedux = () => {
  return (dispatch) => {
    dispatch(setHourlyActionCreator(true))
  }
}

// export const getCompanyToken = () => {
//   return async (dispatch) => {
//     let response = await authApi.getToken()
//     if (response.status === 200) {
//       dispatch(setToken(response.data))
//       window.localStorage.setItem("Authorization", response.data.jwtToken)
//       return true
//     } else {
//       dispatch(setToken(null))
//       window.localStorage.clear()
//       return false
//     }
//   }
// }

export default setHourlyReducer
