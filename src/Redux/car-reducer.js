import { fleetApi } from "../api/api"
import { setFormData } from "./form-reducer"

const SET_CARS_BY_TYPE = "./car-reducer/SET_CARS_BY_TYPE"
const SET_CARS_WITH_PRICE = "./car-reducer/SET_CARS_WITH_PRICE"
const TOGGLE_IS_FETCHING = "./car-reducer/TOGGLE_IS_FETCHING"
export const SET_ERROR = "./car-reducer/SET_ERROR"

let initialState = {
  cars: [],
  pageSize: 1,
  isFetching: false,
  error: "",
}

const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARS_WITH_PRICE:
    case SET_CARS_BY_TYPE:
      return {
        ...state,
        cars: [...action.cars],
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export const setCarsByType = (cars) => ({ type: SET_CARS_BY_TYPE, cars })

export const setCarsWithPrice = (cars) => ({ type: SET_CARS_WITH_PRICE, cars })

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
})

export const getCarsByType = (carType, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))

    let data = await fleetApi.getCarsByType(carType, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setCarsByType(data))
  }
}

export const getCompanyCars = (dataForm) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    console.log(dataForm)
    let data = await fleetApi.getCompanyCars(dataForm)
    console.log(data)
    if (data.status == 400) {
      dispatch(setError(data.data[0]))
    }

    dispatch(toggleIsFetching(false))
    dispatch(setFormData(dataForm))
    if (data.status == 200) {
      dispatch(setCarsWithPrice(data.data))
    }
  }
}

export default carsReducer

// ByDistance = 1,
// ByHour = 2,
// AirportTransfer = 3
