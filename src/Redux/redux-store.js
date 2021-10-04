import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import companyTokenReducer from "./company-token-reducer"
import companyProfileReducer from "./company-profile-reducer"
import formReducer from "./form-reducer"
import carsReducer from "./car-reducer"
import resetWidgetInputsReducer from "./reset-widget-inputs-reducer"
import setHourlyReducer from "./hourly-reducer"

let rootReducer = combineReducers({
  companyToken: companyTokenReducer,
  companyProfile: companyProfileReducer,
  formData: formReducer,
  cars: carsReducer,
  resetWidgetInputs: resetWidgetInputsReducer,
  setHourlyRedux: setHourlyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
