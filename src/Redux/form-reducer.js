import { formApi } from "../api/api"
import { toggleIsFetching } from "./car-reducer"
import { failMessage, isSuccess } from "./company-profile-reducer"

export const SET_FORM_DATA = "./form-reducer/SET_FORM_DATA"
const SET_NOTE = "./form-reducer/SET_NOTE"
const LOGOUT = "./form-reducer/LOGOUT"
const SET_CAR_ID = "./form-reducer/SET_CAR_ID"
const SET_ORDER_SUM = "./form-reducer/SET_ORDER_SUM"
const SET_PAYMENT_FORM = "./form-reducer/SET_PAYMENT_FORM"
const SET_SAFETY_SEAT_COUNT = "./form-reducer/SET_SAFETY_SEAT_COUNT"
const SET_BOOSTER_SEAT_COUNT = "./form-reducer/SET_SAFETY_SEAT_COUNT"
const SET_DATE_DEFAULT_VALUE = "./form-reducer/SET_DATE_DEFAULT_VALUE"
const SET_TIME_DEFAULT_VALUE = "./form-reducer/SET_TIME_DEFAULT_VALUE"
const SET_TIME_DEFAULT_VALUE_AMPM = "./form-reducer/SET_TIME_DEFAULT_VALUE_AMPM"
const SET_TIME_DEFAULT_VALUE_ALIGNMENT =
  "./form-reducer/SET_TIME_DEFAULT_VALUE_ALIGNMENT"
const SET_PASSENGERS_QUANTITY_FOR_BACKSTEP =
  "./form-reducer/SET_PASSENGERS_QUANTITY_FOR_BACKSTEP"

const SET_IS_AIRPORT_PICKUP_INCLUDED =
  "./form-reducer/SET_IS_AIRPORT_PICKUP_INCLUDED"

let initialState = {
  orderType: 3,
  bookingType: 0,
  orderSum: 0,
  orderStartDateTime: "",
  dateForDefaultValue: "",
  timeForDefaultValue: "",
  timeForDefaultValueAMPMalignment: {
    ampm: "",
    alignment: "web",
  },
  passengersQuantity: 0,
  passengersQuantityForBackStep: 0,
  carInfo: {
    id: 0,
  },
  orderAddressDetails: [
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
  ],
  orderNotes: "",
  hours: 0,
  paymentInfo: {
    cardNumber: "",
    month: null,
    year: null,
    cvc: "",
    amount: 0,
  },
  client: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    zip: "",
    cityId: 0,
    stateId: 0,
  },
  greetClientInfo: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  },
  isAirportPickupIncluded: false,
  flightNumber: "",
  airlines: {
    id: 0,
  },
  safetySeatCount: 0,
  boosterSeatCount: 0,
}

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        ...action.dataForm,
      }
    case SET_NOTE:
      return {
        ...state,
        orderNotes: action.note,
      }
    case SET_CAR_ID:
      return {
        ...state,
        carInfo: { id: action.id },
      }
    case SET_ORDER_SUM:
      return {
        ...state,
        orderSum: action.sum,
      }
    case LOGOUT:
      return {
        orderType: 3,
        bookingType: 0,
        orderSum: 0,
        orderStartDateTime: "",
        passengersQuantity: 0,
        carInfo: {
          id: 0,
        },
        orderAddressDetails: [
          {
            rideCheckPoint: "",
            latitude: 0,
            longitude: 0,
            placeType: 0,
            placeId: "",
          },
          {
            rideCheckPoint: "",
            latitude: 0,
            longitude: 0,
            placeType: 0,
            placeId: "",
          },
        ],
        orderNotes: "",
        hours: 0,
        paymentInfo: {
          cardNumber: "",
          month: null,
          year: null,
          cvc: "",
          amount: 0,
        },
        client: {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          address: "",
          zip: "",
          cityId: 0,
          stateId: 0,
        },
        greetClientInfo: {
          id: 0,
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        },
        isAirportPickupIncluded: false,
        flightNumber: "",
        airlines: {
          id: 0,
        },
      }
    case SET_PAYMENT_FORM:
      return {
        ...state,
        greetClientInfo: { ...action.form.greetClientInfo },
        paymentInfo: {
          ...action.form.paymentInfo,
          month: action.date[0],
          year: action.date[1],
        },
        client: {
          ...action.form.client,
          cityId: action.cityId,
          stateId: action.stateId,
        },
      }
    case SET_SAFETY_SEAT_COUNT:
      return {
        ...state,
        safetySeatCount: action.payload,
      }

    case SET_BOOSTER_SEAT_COUNT:
      return {
        ...state,
        boosterSeatCount: action.payload,
      }

    case SET_DATE_DEFAULT_VALUE:
      return {
        ...state,
        dateForDefaultValue: action.payload,
      }
    case SET_TIME_DEFAULT_VALUE:
      return {
        ...state,
        timeForDefaultValue: action.payload,
      }
    case SET_TIME_DEFAULT_VALUE_AMPM:
      return {
        ...state,
        timeForDefaultValueAMPM: { ampm: action.payload },
      }
    case SET_TIME_DEFAULT_VALUE_ALIGNMENT:
      return {
        ...state,
        timeForDefaultValueAMPM: { alignment: action.payload },
      }
    case SET_PASSENGERS_QUANTITY_FOR_BACKSTEP:
      return {
        ...state,
        passengersQuantityForBackStep: action.payload,
      }
    case SET_IS_AIRPORT_PICKUP_INCLUDED:
      return {
        ...state,
        isAirportPickupIncluded: action.payload,
      }

    default:
      return state
  }
}

export const setFormData = (dataForm) => ({ type: SET_FORM_DATA, dataForm })

export const logOut = () => ({ type: LOGOUT })

export const setNoteRedux = (note) => ({ type: SET_NOTE, note })

export const setCarId = (id) => ({ type: SET_CAR_ID, id })

export const setOrderSum = (sum) => ({ type: SET_ORDER_SUM, sum })

export const setDateForDefaultValue = (date) => ({
  type: SET_DATE_DEFAULT_VALUE,
  payload: date,
})

export const setTimeForDefaultValue = (time) => ({
  type: SET_TIME_DEFAULT_VALUE,
  payload: time,
})

export const setTimeForDefaultValueAMPM = (ampm) => ({
  type: SET_TIME_DEFAULT_VALUE_AMPM,
  payload: ampm,
})
export const setTimeForDefaultValueAlignment = (alignment) => ({
  type: SET_TIME_DEFAULT_VALUE_ALIGNMENT,
  payload: alignment,
})

export const setPassengersQuantityForBackStep = (quantity) => ({
  type: SET_PASSENGERS_QUANTITY_FOR_BACKSTEP,
  payload: quantity,
})

export const setIsAirportPickupIncluded = (flag) => ({
  type: SET_IS_AIRPORT_PICKUP_INCLUDED,
  payload: flag,
})

export const setPaymentForm = (form, cityId, stateId, date) => ({
  type: SET_PAYMENT_FORM,
  form,
  cityId,
  stateId,
  date,
})

export const setSafetySeatCount = (count) => ({
  type: SET_SAFETY_SEAT_COUNT,
  payload: count,
})
export const setBoosterSeatCount = (count) => ({
  type: SET_BOOSTER_SEAT_COUNT,
  payload: count,
})

export const createReservation = (formSummary) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await formApi.createReservation(formSummary)

    if (response.status === 200) {
      dispatch(isSuccess(true))
    } else {
      dispatch(isSuccess(false))

      dispatch(
        response.data[0]
          ? failMessage(response.data[0])
          : failMessage(response.status)
      )
    }
    dispatch(toggleIsFetching(false))
  }
}

export default formReducer

// ByDistance = 1,
// ByHour = 2,
// AirportTransfer = 3
