import { authApi } from "../api/api"

const SET_GATE_MEETING = "/redux/companyTokenReducer/SET_GATE_MEETING"

let initialState = {
  isGateMeeting: false,
}

const gateMeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GATE_MEETING:
      return {
        ...state,
        isGateMeeting: action.payload,
      }
    default:
      return state
  }
}

export const setGateMeetingActionCreator = (flag) => ({
  type: SET_GATE_MEETING,
  payload: flag,
})

export const setGateMeetingRedux = (flag) => {
  return (dispatch) => {
    dispatch(setGateMeetingActionCreator(flag))
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

export default gateMeetingReducer
