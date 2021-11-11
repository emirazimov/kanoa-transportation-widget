import { authApi } from "../api/api"

const SET_HOURLY = "/redux/companyTokenReducer/SET_HOURLY"
const SET_SAFETY_SEAT_COUNT = "/redux/companyTokenReducer/SET_SAFETY_SEAT_COUNT"
const SET_BOOSTER_SEAT_COUNT =
  "/redux/companyTokenReducer/SET_SAFETY_SEAT_COUNT"

let initialState = {
  hourlyRedux: false,
  safetySeat: false,
  boosterSeat: false,
}

const setHourlyReducerAndSeats = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOURLY:
      return {
        ...state,
        hourlyRedux: action.payload,
      }
    case SET_SAFETY_SEAT_COUNT:
      return {
        ...state,
        safetySeat: action.payload,
      }
    case SET_BOOSTER_SEAT_COUNT:
      return {
        ...state,
        boosterSeat: action.payload,
      }
    default:
      return state
  }
}

export const setHourlyActionCreator = (flag) => ({
  type: SET_HOURLY,
  payload: flag,
})
export const setSafetySeatActionCreator = (flag) => ({
  type: SET_SAFETY_SEAT_COUNT,
  payload: flag,
})
export const setBoosterSeatRActionCreator = (flag) => ({
  type: SET_BOOSTER_SEAT_COUNT,
  payload: flag,
})

export const setHourlyRedux = (flag) => {
  return (dispatch) => {
    dispatch(setHourlyActionCreator(flag))
  }
}
export const setSafetySeatRedux = (flag) => {
  return (dispatch) => {
    dispatch(setHourlyActionCreator(flag))
  }
}
export const setBoosterSeatRedux = (flag) => {
  return (dispatch) => {
    dispatch(setHourlyActionCreator(flag))
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

export default setHourlyReducerAndSeats
