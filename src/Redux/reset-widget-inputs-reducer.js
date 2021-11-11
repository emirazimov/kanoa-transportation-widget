import { authApi } from "../api/api"

const SET_RESET_INPUTS = "/redux/companyTokenReducer/SET_RESET_INPUTS"

let initialState = {
  resetInputs: false,
}

const resetWidgetInputsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESET_INPUTS:
      return {
        ...state,
        resetInputs: action.payload,
      }
    default:
      return state
  }
}

export const setResetWidgetInputsActionCreator = (flag) => ({
  type: SET_RESET_INPUTS,
  payload: flag,
})

export const setResetWidgetInputs = (flag) => {
  return (dispatch) => {
    dispatch(setResetWidgetInputsActionCreator(flag))
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

export default resetWidgetInputsReducer
