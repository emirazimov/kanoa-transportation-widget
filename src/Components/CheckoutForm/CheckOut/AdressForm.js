import DateFnsUtils from "@date-io/date-fns"
import { ListItem, TextField, useMediaQuery } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import { makeStyles } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import Typography from "@material-ui/core/Typography"
// import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { connect } from "react-redux"
import { placesApi } from "../../../api/api"
import {
  ClockIcon,
  DateIcon,
  // ForwardArrowIcon,
  HourlyIcon,
  LeftArrowForAdressForm,
  MeetAndGreetIcon,
  NumberOfPassengersIcon,
  PlaneIcon,
  RightArrowForAdressForm,
  SafetySeatIcon,
  Ticket,
} from "../../../assets/icons"
import { getCarsByType } from "../../../Redux/car-reducer"
import GoogleMap from "../../GoogleMap/GoogleMap"
import { getCompanyCars } from "./../../../Redux/car-reducer"
import {
  CustomFormInput,
  // CustomMaskInput,
  // DataInputControl,
  DateInputControl,
  // TimeInputControl,
  // TimeInputControlNewOne,
} from "./CustomFormInput"
import Hours from "./Hours"
import PassengerQuantity from "./PassengerQuantity"
import { withStyles } from "@material-ui/styles"
// import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import Carousel, { consts } from "react-elastic-carousel"
// import Carousel from "react-material-ui-carousel";
// import Tooltip from "@material-ui/core/Tooltip"
import {
  setBoosterSeatCount,
  setDateForDefaultValue,
  setTimeForDefaultValue,
  setTimeForDefaultValueAMPM,
  setTimeForDefaultValueAlignment,
  setPassengersQuantityForBackStep,
  setFormData,
  setSafetySeatCount,
} from "./../../../Redux/form-reducer"
// import "@brainhubeu/react-carousel/lib/style.css"
// import { createMuiTheme } from "@material-ui/core"
// import { ThemeProvider } from "@material-ui/styles"
// import Blue from "@material-ui/core/colors/blue"
// import lime from "@material-ui/core/colors/lime"
// import { Popover, TimePicker } from "antd"
// import "antd/dist/antd.css"
import "./index.css"
import { setHourlyRedux } from "../../../Redux/hourly-reducer"
import { setGateMeetingRedux } from "../../../Redux/gate-meeting-reducer"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import SafetySeat from "./SafetySeat"
import ReactInputMask from "react-input-mask"
import Luggage from "./Luggage"

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: theme.spacing(2),
    paddingTop: "0px",
    paddingBottom: "0px",
    background: "#000000",
  },

  carItem: {
    backgroundColor: "#000000",
    marginTop: theme.spacing(1),
    padding: 0,
    width: "100%",
    height: "80%",
    boxShadow: "4px 5px 30px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    border: "1px solid #C6AD99",
    "&:hover": {
      background: "#54595F",
      color: "white",
      transition: "400ms",
    },
  },
  carFont: {
    textTransform: "uppercase",
    fontSize: "11px",
    // marginLeft: "-5px",
    color: "white",
  },
  carImageContainer: {
    width: "63px",
    textAlign: "center",
  },
  carImage: {
    width: "100%",
    height: "30px",
    objectFit: "cover",
    // padding: "5px",
    // paddingLeft: "4px",
    userDrag: "none",
    userSelect: "none",
    mozUserSelect: "none",
    webkitUserDrag: "none",
    webkitUserSelect: "none",
    msUserSelect: "none",
  },
  carImageStylesForBiggerTypeOfImage: {
    width: "90%",
    height: "30px",
    objectFit: "contain",
    // padding: "2px",

    // paddingBottom: "5px",
    // paddingTop: "10px",
    userDrag: "none",
    userSelect: "none",
    mozUserSelect: "none",
    webkitUserDrag: "none",
    webkitUserSelect: "none",
    msUserSelect: "none",
  },
  carItemContainer: {
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2),

    "&:hover": {
      color: "white",
    },
  },
  preferences: {
    color: "black",
    marginLeft: "10px",
    fontSize: "14px",
    marginTop: "-5px",
  },
  submitButton: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  active: {
    // color: '#392BAA',
    background: "#1B1837",
  },
  input: {
    "&::placeholder": {
      color: "white",
      opacity: "1",
      fontSize: "14px",
    },
    "&:-webkit-autofill": {
      height: "0px",
      border: "none",
      borderRadius: "0px",
      WebkitBoxShadow: "0 0 0 1000px white inset",
      WebkitTextFillColor: "white",
    },
  },
  listRoot: {
    "&:hover": {
      background: "#54595F",
      "& $carFont": {
        color: "white ",
      },
    },
    "&.MuiListItem-root.Mui-selected, &.MuiListItem-root.Mui-selected:hover": {
      background: "#54595F",
      "& $carFont": {
        color: "white ",
      },
    },
  },
  carouselRoot: {
    background: "black",
    boxShadow: "4px 5px 30px rgba(0, 0, 0, 0.1)",
    minWidth: "30px",
    height: "66px",
    marginTop: "8px",
    cursor: "pointer",
    borderRadius: "0",
    border: "1px solid #C6AD99",
    "&:hover": {
      backgroundColor: "#bdbdbd",
    },
  },
  noBorderDefault: {
    border: "1px solid #C6AD99",
    borderRadius: "0px",
    "&:hover": {
      border: "1px solid white",
    },
  },
  noBorderRed: {
    borderRadius: "0px",
    border: "1px solid #db5858",
  },
  redBorderForAirlines: {
    border: "1px solid #db5858",
  },
  redBorderForAirlinesDefault: {
    borderTop: "2px solid #C6AD99",
  },
  inputDateTime: {
    height: "40px",
    fontSize: "14px",
    "&-webkit-autofill": {
      "&-webkit-box-shadow": "0 0 0 1000px red inset",
    },

    "&:hover": {
      transition: "400ms",
    },
    color: "white",
    "&.MuiIconButton-root": {
      color: "white",
    },
    // ":-webkit-autofill": {
    //   WebkitBoxShadow: "0 0 0 1000px white inset",
    //   backgroundColor: "red !important",
    // },
  },
  carTypeWithRed: {
    border: "1px solid #db5858",
  },
  carContainerRed: {
    // paddingTop: "20px",
    marginTop: "10px",
    marginBottom: "10px",
    paddingBottom: "6px",
    border: "1px solid #db5858",
  },
  carContainerDefault: {
    border: "none",
  },
  carTypeDefault: {
    border: "none",
  },
  inputTimehover: {
    border: "1px solid white",
  },
  inputTimehover2: {
    border: "1px solid white",
  },
  redBorderForPassengers: {
    paddingTop: "4px",
    border: "1px solid #db5858",
  },
  redBorderForPassengersNone: {
    border: "none",
  },
  noBorder: {
    border: "none",
  },
  buttonSelf: {
    background: "black",
    border: "1px solid #C6AD99",
    "&:hover": {
      background: "#C6AD99",
      "& $typographyForButton": {
        color: "black",
      },
    },
  },
  popupIndicator: {
    color: "white",
  },
  typographyForButton: {
    fontSize: "14px",
    color: "#C6AD99",
  },
  option: {
    fontSize: "15px",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#C6AD99",
    },
  },
  airLinesInput: {
    border: "1px solid #C6AD99",
    "&:hover": {
      border: "1px solid white",
    },
  },
  flightNumberInput: {
    "&:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0 100px #000 inset",
      "-webkit-text-fill-color": "#fff",
    },
    border: "1px solid #C6AD99",
    "&:hover": {
      border: "1px solid white",
    },
  },
  selectedOption: {
    backgroundColor: "#C6AD99",
    "&$selected": {
      backgroundColor: "#C6AD99",
    },
  },
  rootToggleButton: {
    color: "#F8D9C1",
    borderRadius: "0px",
    "&.MuiToggleButton-root.Mui-selected": {
      background: "#F8D9C1",
      color: "black",
    },
    "&:hover": {
      background: "#F8D9C1",
      color: "black",
    },
  },
}))

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 38,
    height: 21,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    "&:hover": {
      paddingRight: "2.7px",
      paddingBottom: "3px",
      backgroundColor: "#c7c7c7",
    },
    padding: 2,
    paddingTop: "2.2px",
    color: "#675005",

    "&$checked": {
      transform: "translateX(16px)",
      color: "#C19815",

      "& + $track": {
        opacity: 1,
        backgroundColor: "white",
        borderColor: "black",
      },
    },
  },
  thumb: {
    width: 14,
    height: 14,
    boxShadow: "none",
    marginTop: "1.5px",
    marginLeft: "2px",
  },
  track: {
    border: `1px solid black`,
    borderRadius: 19,
    opacity: 1,
    backgroundColor: "white",
  },
  checked: {},
}))(Switch)

const schema = yup.object().shape({
  destinations: yup.object().shape({
    rideCheckPoint: yup.object().required(),
  }),
  // carsValidation: yup.number().required(),
})
{
  /*компонента перед экспортом обернута в react.memo*/
}

const AdressFormwithoutReactMemo = ({
  next,
  carTypes,
  pageSize,
  getCompanyCars,
  setFormData,
  formData,
  setHourlyRedux,
  setGateMeetingRedux,
  gateMeeting,
  hourlyAndSeatsRedux,
  setSafetySeatCount,
  setBoosterSeatCount,
  backgroundScrollStopForTimePicker,
  setBackgroundScrollStopForTimePicker,
  resetInputs,
  setDateForDefaultValue,
  setTimeForDefaultValue,
  setTimeForDefaultValueAMPM,
  setTimeForDefaultValueAlignment,
  setPassengersQuantityForBackStep,
}) => {
  const classes = useStyles()
  console.log("AdressFrom")
  const [carSelectionID, setCarSelectionID] = useState(0)
  const [bookingType, setBookingType] = useState(1)
  const [passengers, setPassengers] = useState(0)
  const [hoursAddressForm, setHoursAddressForm] = useState(1)
  const [disableHourly, setDisableHourly] = useState(false)
  const [hourly, setHourly] = useState(false)
  // var hourly = false
  const [isGateMeeting, setIsGateMeeting] = useState(false)
  const [isAirline, setIsAirline] = useState(false)
  const [airlineId, setAirlineId] = useState(0)
  const [airlines, setAirlines] = useState([])
  const [timePickerOpened, setTimePickerOpened] = useState(false)

  const [selectedDate, handleDateChange] = useState(null)
  const [selectedTime, handleTimeChange] = useState(null)

  const [redBorderOnSubmit, setRedBorderOnSubmit] = useState(false)
  const [redBorderOnSubmit2, setRedBorderOnSubmit2] = useState(false)
  const [redBorderOnSubmitForDate, setRedBorderOnSubmitForDate] =
    useState(false)
  const [redBorderOnSubmitForTime, setRedBorderOnSubmitForTime] =
    useState(false)
  const [redBorderOnSubmitForTime2, setRedBorderOnSubmitForTime2] =
    useState(false)
  const [redBorderOnSubmitForTime3, setRedBorderOnSubmitForTime3] =
    useState(false)
  const [redBorderOnSubmitForTime4, setRedBorderOnSubmitForTime4] =
    useState(false)
  const [redBorderOnSubmitForTime5, setRedBorderOnSubmitForTime5] =
    useState(false)
  const [redBorderOnSubmitForTime6, setRedBorderOnSubmitForTime6] =
    useState(false)
  const [redBorderOnSubmitForCarType, setRedBorderOnSubmitForCarType] =
    useState(false)
  const [redBorderOnSubmitForPassengers, setRedBorderOnSubmitForPassengers] =
    useState(false)
  const [redBorderOnAirlines, setRedBorderOnAirlines] = useState(false)
  const [
    isAirportPickupIncludedLocalState,
    setIsAirportPickupIncludedLocalState,
  ] = useState(false)
  const [destinations, setDestinations] = useState([
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
  ])

  const handleClick = (id) => {
    setCarSelectionID(id)
  }

  const handleDateChangeFunc = (time) => {
    handleDateChange(time)
  }
  const [flightNumber, setFlightNumber] = useState(null)
  const { errors, register, handleSubmit, setValue, ...methods } = useForm({
    // mode: "onBlur",
    // resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
    // console.log(data.orderStartDate, data.orderStartTime)

    // if (
    //   destinations[0].rideCheckPoint &&
    //   destinations[1].rideCheckPoint &&
    //   data.orderStartDate &&
    //   data.orderStartTime &&
    //   carSelectionID &&
    //   passengers
    // ) {
    if (onSubmit2(data)) {
      getCompanyCars({
        hours: hourly ? hoursAddressForm : 0,
        isGateMeeting: isGateMeeting,
        airlines: { id: airlineId },
        orderAddressDetails: [...destinations],
        flightNumber: data.flightNumber,
        page: pageSize,
        typeId: carSelectionID,
        bookingType: bookingType,
        passengersQuantity: formData.passengersQuantityForBackStep,
        isAirportPickupIncluded: isAirportPickupIncludedLocalState,
        boosterSeatCount: boosterSeat,
        safetySeatCount: childSafetySeat,
        luggageCount: luggage,
      })
      setSafetySeatCount(childSafetySeat)
      setBoosterSeatCount(boosterSeat)
      setDateForDefaultValue(
        new Date(data.orderStartDate).toLocaleDateString("en-US")
      )
      // setTimeForDefaultValue(time)
      // setTimeForDefaultValueAMPM(AMPM)
      // setTimeForDefaultValueAlignment(alignment)

      const forRes = new Date(data.orderStartDate).toLocaleDateString("en-US")
      const forRes2 = time + ` ${AMPM}`

      // ._d.toLocaleTimeString("en-US", {
      //   hour: "numeric",
      //   minute: "numeric",
      // })

      // + ` ${AMPM}`
      const resData = {
        orderStartDate: `${forRes}`,
        orderStartTime: `${forRes2}`,
      }
      const resData2 = {
        orderStartDateTime: `${forRes} ` + `${forRes2}`,
      }

      setFormData(resData2)

      console.log(
        destinations[0].rideCheckPoint,
        destinations[1].rideCheckPoint,
        data.orderStartDate,
        data.orderStartTime + ` ${AMPM}`,
        {
          hours: hourly ? hoursAddressForm : 0,
          isGateMeeting: isGateMeeting,
          airlines: { id: airlineId },
          orderAddressDetails: [...destinations],
          flightNumber: data.flightNumber,
          page: pageSize,
          typeId: carSelectionID,
          bookingType: bookingType,
          passengersQuantity: passengers,
          boosterSeatCount: boosterSeat,
        }
      )
      next()
    }
    // } else {
    //   if (!destinations[0].rideCheckPoint) {
    //     setRedBorderOnSubmit(true)
    //   } else {
    //     setRedBorderOnSubmit(false)
    //   }
    //   if (!destinations[1].rideCheckPoint) {
    //     setRedBorderOnSubmit2(true)
    //   } else {
    //     setRedBorderOnSubmit2(false)
    //   }
    //   if (!data.orderStartDate?.toLocaleDateString("en-GB")) {
    //     setRedBorderOnSubmitForDate(true)
    //   } else {
    //     setRedBorderOnSubmitForDate(false)
    //   }
    //   if (!data.orderStartTime) {
    //     setRedBorderOnSubmitForTime(true)
    //   } else {
    //     setRedBorderOnSubmitForTime(false)
    //   }
    //   if (carSelectionID) {
    //     setRedBorderOnSubmitForCarType(false)
    //   } else {
    //     setRedBorderOnSubmitForCarType(true)
    //   }
    //   if (passengers) {
    //     setRedBorderOnSubmitForPassengers(false)
    //   } else {
    //     setRedBorderOnSubmitForPassengers(true)
    //   }
    // }
  }
  const onSubmit2 = (data) => {
    if (
      destinations[0].rideCheckPoint &&
      destinations[1].rideCheckPoint &&
      data.orderStartDate &&
      (time || formData.timeForDefaultValue) &&
      (firstTimeHalf?.[0] >= "0" || formData.timeForDefaultValue) &&
      (firstTimeHalf?.[1] >= "0" || formData.timeForDefaultValue) &&
      (secondTimeHalf?.[0] >= "0" || formData.timeForDefaultValue) &&
      (secondTimeHalf?.[1] >= "0" || formData.timeForDefaultValue) &&
      // false &&
      carSelectionID &&
      (passengers || formData.passengersQuantityForBackStep) &&
      (AMPM || formData?.timeForDefaultValueAMPM?.ampm)
    ) {
      if (isAirline) {
        if (!airlineId) {
          setRedBorderOnAirlines(true)
        } else {
          setRedBorderOnAirlines(false)
          return true
        }
      } else {
        return true
      }
    } else {
      if (!destinations[0].rideCheckPoint) {
        setRedBorderOnSubmit(true)
      } else {
        setRedBorderOnSubmit(false)
      }
      if (!destinations[1].rideCheckPoint) {
        setRedBorderOnSubmit2(true)
      } else {
        setRedBorderOnSubmit2(false)
      }
      if (!data?.orderStartDate && !formData?.dateForDefaultValue) {
        // if (
        //   !new Date(data.orderStartDate).toLocaleDateString("en-GB") &&
        //   !formData.dateForDefaultValue
        // ) {
        setRedBorderOnSubmitForDate(true)
        // }
      } else {
        setRedBorderOnSubmitForDate(false)
      }
      // if (!time) {
      //   setRedBorderOnSubmitForTime(true)
      // } else {
      //   setRedBorderOnSubmitForTime(false)
      // }
      if (
        (firstTimeHalf?.[0] <= "0" && firstTimeHalfRedux?.[0] <= "0") ||
        (firstTimeHalf?.[0] <= "" && firstTimeHalfRedux?.[0] <= "0") ||
        (firstTimeHalf?.[0] == undefined &&
          firstTimeHalfRedux?.[0] <= undefined)
      ) {
        setRedBorderOnSubmitForTime2(true)
      } else {
        setRedBorderOnSubmitForTime2(false)
      }
      if (
        (firstTimeHalf?.[1] <= "0" && firstTimeHalfRedux?.[1] <= "0") ||
        (firstTimeHalf?.[1] <= "" && firstTimeHalfRedux?.[1] <= "") ||
        (firstTimeHalf?.[1] == undefined &&
          firstTimeHalfRedux?.[1] <= undefined)
      ) {
        setRedBorderOnSubmitForTime6(true)
      } else {
        setRedBorderOnSubmitForTime6(false)
      }
      if (
        (secondTimeHalf2 <= "0" && secondTimeHalfRedux2 <= "0") ||
        (secondTimeHalf2 <= "" && secondTimeHalfRedux2 <= "")
      ) {
        setRedBorderOnSubmitForTime3(true)
      } else {
        setRedBorderOnSubmitForTime3(false)
      }

      if (
        (secondTimeHalf?.[0] <= "0" && secondTimeHalfRedux?.[0] <= "0") ||
        (secondTimeHalf?.[0] <= "" && secondTimeHalfRedux?.[0] <= "")
      ) {
        setRedBorderOnSubmitForTime4(true)
      } else {
        setRedBorderOnSubmitForTime4(false)
      }
      if (
        (secondTimeHalf?.[1] <= "0" && secondTimeHalfRedux?.[1] <= "0") ||
        (secondTimeHalf?.[1] <= "" && secondTimeHalfRedux?.[1] <= "") ||
        (secondTimeHalf?.[1] == undefined &&
          secondTimeHalfRedux?.[1] <= undefined)
      ) {
        setRedBorderOnSubmitForTime5(true)
      } else {
        setRedBorderOnSubmitForTime5(false)
      }
      if (!AMPM && !formData?.timeForDefaultValueAMPM?.ampm) {
        setRedBorderOnSubmitForTime(true)
      } else {
        setRedBorderOnSubmitForTime(false)
      }
      if (carSelectionID) {
        setRedBorderOnSubmitForCarType(false)
      } else {
        setRedBorderOnSubmitForCarType(true)
      }
      if (formData.passengersQuantityForBackStep) {
        setRedBorderOnSubmitForPassengers(false)
      } else {
        setRedBorderOnSubmitForPassengers(true)
      }
    }
  }
  const [openTimePicker, setOpenTimePicker] = useState(false)
  let firstAirline =
    destinations[0]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/)
  let firstAirline2 = destinations[0]?.rideCheckPoint.match(
    /(^|\W)300 Rodgers Boulevard, Honolulu, HI, USA($|\W)/
  )
  // let secondAirline =
  //   destinations[1]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/)
  // if (destinations[0]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/)) {
  //   console.log("true")
  // } else {
  //   console.log("false")
  // }

  const fetchAirlines = async () => {
    const data = await placesApi.getAirlines()
    const res = data.map((airline) => {
      return {
        id: `${airline.id}`,
        name: `${airline.code} ` + `${airline.name}`,
      }
    })
    setAirlines(res)
  }

  React.useEffect(() => {
    if (firstAirline || firstAirline2) {
      setIsAirline(true)
      setBookingType(3)
      fetchAirlines()
      // setDisableHourly(true)
    } else {
      setIsAirline(false)
      setDisableHourly(false)
    }
  }, [firstAirline, firstAirline2])
  React.useEffect(() => {
    if (hourly) {
      if (firstAirline || firstAirline2) {
        setBookingType(3)
      } else {
        setBookingType(2)
      }

      // setDisableHourly(true)
    } else {
      if (firstAirline || firstAirline2) {
        setBookingType(3)
      } else {
        setBookingType(1)
      }
    }
  })

  console.log(formData.dateForDefaultValue == true)
  console.log(formData.timeForDefaultValueAMPM?.alignment)
  console.log(formData.timeForDefaultValueAMPM?.ampm)
  console.log(formData.timeForDefaultValue)
  console.log(
    // (firstTimeHalf?.[0] <= "0" && firstTimeHalfRedux?.[0] <= "0") ||
    //   (firstTimeHalf?.[0] <= "" && firstTimeHalfRedux?.[0] <= "0") ||
    firstTimeHalf?.[0] == undefined && firstTimeHalfRedux?.[0] <= undefined
  )

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        <LeftArrowForAdressForm />
      ) : (
        <RightArrowForAdressForm />
      )
    return (
      <Button
        onClick={onClick}
        disabled={isEdge}
        className={classes.carouselRoot}
      >
        {pointer}
      </Button>
    )
  }

  const [safetySeat, setSafetySeat] = useState(false)

  const [boosterSeat, setBoosterSeat] = useState(0)
  const [childSafetySeat, setChildSafetySeat] = useState(0)
  const [alignment, setAlignment] = React.useState("web")
  const [AMPM, setAMPM] = React.useState("")

  const handleChangeAMPM = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
      setTimeForDefaultValueAlignment(newAlignment)
    }
    setAMPM(event.target.textContent)
    setTimeForDefaultValueAMPM(event.target.textContent)

    // console.log(event.target.textContent)
  }
  const [triggerToTimePicker, setTriggerToTimePicker] = useState(false)
  var eventCount = 0
  const inputStyle = {
    WebkitBoxShadow: "0 0 0 1000px black inset",
    height: "0px",
  }
  console.log(hourlyAndSeatsRedux)
  const isMobile = useMediaQuery("(max-width:530px)")

  const [time, setTime] = useState("")
  const startsWithTwo = time[0] === "2"

  const [timeMask, setTimeMask] = useState(false)

  const handleInput = (event) => {
    if (event.target.value == "0_:__") {
      setTimeMask(true)
    }
    if (event.target.value == "1_:__") {
      setTimeMask(false)
    }
    setTimeForDefaultValue(event.target.value)
    setTime(event.target.value)
    // const emir = "00:10"
    // console.log(event.target.value)
    // console.log(time)
    // console.log(regexp.test(emir))
    console.log(
      event.target.value.match(/\d+/),
      event.target.value.substr(event.target.value.indexOf(":")).match(/\d+/)
    )
  }

  const [luggage, setLuggage] = useState(0)

  var firstTimeHalf = time
    .substr(0, time.indexOf(":"))
    .match(/\d+/)
    ?.join()
    ?.split("")
  var secondTimeHalf = time
    .substr(time.indexOf(":"))
    .match(/\d+/)
    ?.join()
    ?.split("")
  var secondTimeHalf2 = time.substr(time.indexOf(":")).match(/\d+/)

  var firstTimeHalfRedux = formData?.timeForDefaultValue
    ?.substr(0, formData?.timeForDefaultValue?.indexOf(":"))
    ?.match(/\d+/)
    ?.join()
    ?.split("")
  var secondTimeHalfRedux = formData?.timeForDefaultValue
    ?.substr(formData?.timeForDefaultValue?.indexOf(":"))
    ?.match(/\d+/)
    ?.join()
    ?.split("")
  var secondTimeHalfRedux2 = formData?.timeForDefaultValue
    ?.substr(formData?.timeForDefaultValue?.indexOf(":"))
    ?.match(/\d+/)

  const mask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
  ]

  let formatChars = {
    7: "[0-1]",
    8: "[0-9]",
    9: "[0-5]",
    1: timeMask ? "[0-9]" : "[0-2]",
    a: "[A-Za-z]",
    "*": "[A-Za-z0-9]",
  }
  let formatChars2 = {
    7: "[0-1]",
    8: "[0-2]",
    9: "[0-5]",
    1: "[0-2]",
    a: "[A-Za-z]",
    "*": "[A-Za-z0-9]",
  }

  return (
    <Grid item>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item>
            <GoogleMap
              setDestinations={setDestinations}
              destinations={destinations}
              orderAddressDetails={formData.orderAddressDetails}
              setValue={setValue}
              redBorderOnSubmit={redBorderOnSubmit}
              redBorderOnSubmit2={redBorderOnSubmit2}
            />
          </Grid>
          <Grid container justify="center">
            <Grid
              container
              direction="column"
              spacing={2}
              className={classes.contentContainer}
            >
              {/* (isAirline || formData.isAirportPickupIncluded) &&
              (formData.bookingType===3 || bookingType === 3) */}
              {(isAirline || formData.isAirportPickupIncluded) &&
                (formData.bookingType === 3 || bookingType === 3) && (
                  <Grid
                    className={
                      redBorderOnAirlines
                        ? classes.redBorderForAirlines
                        : classes.redBorderForAirlinesDefault
                    }
                    style={{
                      marginLeft: "8px",
                      marginRight: "8px",
                      marginTop: "6px",
                    }}
                  >
                    <Grid item>
                      <Autocomplete
                        id="combo-box-demo"
                        options={airlines}
                        defaultValue={null}
                        autoHighlight
                        disablePortal
                        getOptionLabel={(option) => option.name}
                        classes={{
                          popupIndicator: classes.popupIndicator,
                          option: classes.option,
                          paper: classes.selectedOption,
                        }}
                        renderOption={(option) => (
                          <>
                            <span>{option.code}</span>
                            {option.name} ({option.code})
                          </>
                        )}
                        renderInput={(params) => {
                          params.InputProps.startAdornment = (
                            <InputAdornment position="start">
                              <PlaneIcon />
                            </InputAdornment>
                          )
                          return (
                            <TextField
                              {...params}
                              fullWidth
                              placeholder="Airlines"
                              className={classes.airLinesInput}
                              style={{
                                height: "40px",

                                backgroundColor: "black",
                                boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.1)",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                borderRadius: "0",
                              }}
                              InputProps={{
                                ...params.InputProps,
                                classes: {
                                  root: classes.inputDateTime,
                                  input: classes.input, // class name, e.g. `classes-nesting-root-x`
                                  notchedOutline: classes.noBorder,
                                },
                                disableUnderline: true,
                              }}
                            />
                          )
                        }}
                        onChange={(event, newValue) => {
                          newValue
                            ? setAirlineId(newValue.id)
                            : setAirlineId(null)
                        }}
                        name="airlines"
                      />
                    </Grid>
                    <Grid
                      item
                      style={{ marginTop: "17px", marginBottom: "9px" }}
                    >
                      {/* <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    > */}
                      <Grid item style={{ width: "100%" }}>
                        <CustomFormInput
                          name="flightNumber"
                          variant="outlined"
                          placeholder="Flight number"
                          className={classes.flightNumberInput}
                          style={{
                            height: "40px",
                            // border: "none",
                            backgroundColor: "black",
                            boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            marginBottom: "0px",
                            marginTop: "0px",
                            borderRadius: "0",
                          }}
                          defaultValue={null}
                          value={flightNumber}
                          onChange={(e) => setFlightNumber(e.target.value)}
                          inputProps={{ style: inputStyle }}
                          InputProps={{
                            classes: {
                              root: classes.inputDateTime,
                              input: classes.input, // class name, e.g. `classes-nesting-root-x`
                              notchedOutline: classes.noBorder,
                            },
                            startAdornment: (
                              <InputAdornment position="start">
                                <Ticket />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      {/* </Grid> */}
                    </Grid>
                  </Grid>
                )}
              <Grid item style={{ width: "100%" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    container
                    direction="row"
                    flexWrap="no-wrap"
                    justify="space-between"
                  >
                    <Grid
                      item
                      style={{ width: "47%" }}
                      className={
                        redBorderOnSubmitForDate
                          ? classes.noBorderRed
                          : classes.noBorderDefault
                      }
                    >
                      {/* <ThemeProvider theme={materialTheme}> */}
                      <DateInputControl
                        name="orderStartDate"
                        // inputVariant="primary"
                        // label="Pick up Date"
                        // inputVariant="outlined"
                        style={{
                          backgroundColor: "black",
                          paddingLeft: "15px",
                          boxShadow: "4px 5px 30px rgba(0, 0, 0, 0.1)",
                          borderRadius: "0",
                          // "&.MuiDialog-paper .MuiPickersModal-dialogRoot .MuiDialog-paperScrollPaper .MuiDialog-paperWidthSm .MuiPaper-elevation24 .MuiPaper-rounded":
                          //   {
                          //     zIndex: "1000000000000000000",
                          //   },
                        }}
                        // value={}
                        placeholder="Pick up Date"
                        defaultValue={
                          formData.dateForDefaultValue && !resetInputs
                            ? formData.dateForDefaultValue
                            : null
                        }
                        disablePast
                        fullWidth
                        // onChange={(event, x) => {
                        //   handleDateChange(event)
                        //   console.log(x)
                        // }}
                        // classes={{
                        //   root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        //   label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        // }}
                        autoOk={true}
                        InputProps={{
                          classes: {
                            root: classes.inputDateTime,
                            input: classes.input, // class name, e.g. `classes-nesting-root-x`
                            notchedOutline: redBorderOnSubmitForDate
                              ? classes.noBorderRed
                              : classes.noBorderDefault,
                          },
                          disableUnderline: true,
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              style={{
                                marginRight: "10px",
                                marginLeft: "-3px",
                              }}
                            >
                              <DateIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* </ThemeProvider> */}
                    </Grid>
                    <Grid
                      item
                      style={{ width: "47%" }}
                      InputProps={{
                        classes: {
                          root: classes.inputTimehover,
                          input: classes.inputTimehover2, // class name, e.g. `classes-nesting-root-x`
                        },
                      }}
                    >
                      <ReactInputMask
                        name="orderStartTime"
                        mask="71:98"
                        autoComplete="off"
                        maskChar="_"
                        // alwaysShowMask={false}
                        formatChars={formatChars}
                        // mask={mask}
                        onChange={(e) => handleInput(e)}
                        // onChange={(e) => console.log("EMIR")}
                        value={
                          !resetInputs ? formData.timeForDefaultValue : null
                        }
                      >
                        {(inputProps) => {
                          return (
                            <TextField
                              {...inputProps}
                              variant="outlined"
                              placeholder="hh:mm"
                              autoComplete="off"
                              fullWidth
                              // style={{ borderRadius: "5px" }}

                              InputProps={{
                                classes: {
                                  root: classes.inputDateTime,
                                  input: classes.input, // class name, e.g. `classes-nesting-root-x`
                                  notchedOutline:
                                    redBorderOnSubmitForTime ||
                                    redBorderOnSubmitForTime2 ||
                                    redBorderOnSubmitForTime3 ||
                                    redBorderOnSubmitForTime4 ||
                                    redBorderOnSubmitForTime5 ||
                                    redBorderOnSubmitForTime6
                                      ? classes.noBorderRed
                                      : classes.noBorderDefault,
                                },
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    style={{
                                      marginRight: "10px",
                                      marginLeft: "-3px",
                                    }}
                                  >
                                    <ClockIcon />
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <>
                                    <ToggleButtonGroup
                                      color="primary"
                                      value={
                                        formData.timeForDefaultValueAMPM
                                          ?.alignment ||
                                        formData.timeForDefaultValueAMPM?.ampm
                                          ? formData.timeForDefaultValueAMPM
                                              ?.ampm
                                          : alignment
                                      }
                                      exclusive
                                      onChange={handleChangeAMPM}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginRight: "-8px",
                                      }}
                                    >
                                      <ToggleButton
                                        value="AM"
                                        className={classes.rootToggleButton}
                                        style={{
                                          width: "26px",
                                          height: "20px",
                                          fontSize: "13px",
                                          paddingTop: "0px",
                                          paddingBottom: "0px",
                                        }}
                                        onClick={(e) => {}}
                                      >
                                        AM
                                      </ToggleButton>
                                      <ToggleButton
                                        value="PM"
                                        className={classes.rootToggleButton}
                                        style={{
                                          width: "26px",
                                          height: "20px",
                                          marginLeft: "2px",
                                          fontSize: "13px",
                                          paddingTop: "0px",
                                          paddingBottom: "0px",
                                        }}
                                      >
                                        PM
                                      </ToggleButton>
                                    </ToggleButtonGroup>
                                  </>
                                ),
                              }}
                            />
                          )
                        }}
                      </ReactInputMask>

                      {/* <div
                        style={{
                          position: "absolute",
                          marginTop: "10px",
                          marginLeft: "10px",
                          marginRight: "10px",
                          zIndex: "11",
                        }}
                      >
                        <ClockIcon />
                      </div>
                      <div className="scrolling">
                        <TimeInputControl
                          getPopupContainer={(trigger) => trigger.parentNode}
                          name="orderStartTime"
                          use12Hours={true}
                          placeholder="Pick up Time"
                          format="h:mm A"
                          allowClear={false}
                          inputReadOnly={isMobile ? true : false}
                          // open={timePickerOpened ? true : false}
                          needsConfirmation={false}
                          showNow={false}
                          showAction={["click", "focus"]}
                          dropdownStyle={{ position: "fixed" }}
                          onOpenChange={(isOpen) => {
                            setOpenTimePicker(true)
                            if (isOpen) {
                              setTimeout(() => {
                                const startInput = document.querySelector(
                                  ".ant-picker-content"
                                )
                                startInput.focus()
                              }, 100)
                            } else {
                              return null
                            }
                          }}
                          style={{
                            zIndex: "10",
                            paddingLeft: "36px",
                            border:
                              redBorderOnSubmitForTime && "1px solid #db5858",
                            borderRadius: "0",
                          }}
                        ></TimeInputControl>
                      </div> */}
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <div
                  className={
                    redBorderOnSubmitForPassengers
                      ? classes.redBorderForPassengers
                      : classes.redBorderForPassengersNone
                  }
                >
                  <PassengerQuantity
                    passengersqState={formData.passengersQuantity}
                    setPassengers={setPassengers}
                    passengers={passengers}
                    setPassengersQuantityForBackStep={
                      setPassengersQuantityForBackStep
                    }
                    passengersQuantityForBackStep={
                      formData.passengersQuantityForBackStep
                    }
                    resetInputs={resetInputs}
                  />
                </div>
              </Grid>
              {(isAirline || formData.isAirportPickupIncluded) &&
                (formData.bookingType === 3 || bookingType === 3) && (
                  <Grid
                    item
                    style={{
                      width: "100%",
                      marginTop: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          style={{ paddingLeft: "8px" }}
                        >
                          <MeetAndGreetIcon />
                          <Typography
                            style={{
                              color: "white",
                              fontSize: "15px",
                              marginLeft: "7px",
                            }}
                          >
                            {"Meet & Greet/Luggage Assist"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <AntSwitch
                          onClick={() => {
                            if (gateMeeting == false) {
                              // setIsGateMeeting(true)
                              setGateMeetingRedux(true)
                              setIsGateMeeting(true)
                              setIsAirportPickupIncludedLocalState(true)
                              console.log("true")
                            } else {
                              // setIsGateMeeting(false)
                              setGateMeetingRedux(false)
                              setIsGateMeeting(false)
                              setIsAirportPickupIncludedLocalState(false)
                              console.log("false")
                            }
                            // setIsGateMeeting(!isGateMeeting)
                            // setTimeout(() => {
                            //   console.log(isGateMeeting)
                            //   if (isGateMeeting == true) {
                            //     setGateMeetingRedux(true)
                            //   } else {
                            //     setGateMeetingRedux(false)
                            //   }
                            // }, 1500)
                          }}
                          color="primary"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              {destinations[1]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/) && (
                <Grid
                  item
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        style={{ paddingLeft: "8px" }}
                      >
                        <MeetAndGreetIcon />
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "15px",
                            marginLeft: "7px",
                          }}
                        >
                          {"Meet & Greet/Luggage Assist"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <AntSwitch
                        onClick={() => {
                          if (gateMeeting == false) {
                            // setIsGateMeeting(true)
                            setGateMeetingRedux(true)
                            setIsGateMeeting(true)
                            setIsAirportPickupIncludedLocalState(true)
                            console.log("true")
                          } else {
                            // setIsGateMeeting(false)
                            setGateMeetingRedux(false)
                            setIsGateMeeting(false)
                            setIsAirportPickupIncludedLocalState(false)
                            console.log("false")
                          }
                          // setIsGateMeeting(!isGateMeeting)
                          // setTimeout(() => {
                          //   console.log(isGateMeeting)
                          //   if (isGateMeeting == true) {
                          //     setGateMeetingRedux(true)
                          //   } else {
                          //     setGateMeetingRedux(false)
                          //   }
                          // }, 1500)
                        }}
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {isGateMeeting && (
                <Luggage luggage={luggage} setLuggage={setLuggage} />
              )}

              <Grid item style={{ width: "100%", marginTop: "6px" }}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ paddingLeft: "8px" }}
                    >
                      <SafetySeatIcon />
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "14px",
                          marginLeft: "9px",
                        }}
                      >
                        Safety Seat
                      </Typography>
                    </Grid>
                  </Grid>
                  <AntSwitch
                    color="primary"
                    // disabled={disableHourly}
                    checked={safetySeat}
                    onClick={() => {
                      // if (hourly == false) {
                      //   // // setIsGateMeeting(true)
                      //   // setGateMeetingRedux(true)
                      //   setHourly(true)
                      //   // hourly = true
                      //   console.log("true")
                      //   console.log(hourly)
                      // } else {
                      //   // setIsGateMeeting(false)
                      //   // setGateMeetingRedux(false)
                      //   setHourly(true)
                      //   // hourly = false
                      //   console.log("false")
                      //   console.log(hourly)
                      // }
                      setSafetySeat(!safetySeat)

                      // setHourlyRedux()
                      // hourly ? setBookingType(2) : setBookingType(1)
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                {safetySeat === true && (
                  <Grid item>
                    <SafetySeat
                      setBoosterSeat={setBoosterSeat}
                      setChildSafetySeat={setChildSafetySeat}
                      boosterSeat={boosterSeat}
                      childSafetySeat={childSafetySeat}
                      // hoursState={formData.hours}
                      // hourly={hourly}
                      // hoursAddressForm={hoursAddressForm}
                      // setHoursAddressForm={setHoursAddressForm}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      style={{ paddingLeft: "-12px" }}
                    >
                      <HourlyIcon></HourlyIcon>
                      <Typography style={{ color: "white", fontSize: "14px" }}>
                        Hourly
                      </Typography>
                    </Grid>
                  </Grid>
                  <AntSwitch
                    color="primary"
                    // disabled={disableHourly}
                    checked={hourly}
                    onClick={() => {
                      // if (hourly == false) {
                      //   // // setIsGateMeeting(true)
                      //   // setGateMeetingRedux(true)
                      //   setHourly(true)
                      //   // hourly = true
                      //   console.log("true")
                      //   console.log(hourly)
                      // } else {
                      //   // setIsGateMeeting(false)
                      //   // setGateMeetingRedux(false)
                      //   setHourly(true)
                      //   // hourly = false
                      //   console.log("false")
                      //   console.log(hourly)
                      // }
                      if (!hourlyAndSeatsRedux) {
                        // setIsGateMeeting(true)
                        setHourlyRedux(true)
                        // console.log("true")
                      } else {
                        // setIsGateMeeting(false)
                        setHourlyRedux(false)
                        // console.log("false")
                      }
                      setHourly(!hourly)

                      // setHourlyRedux()
                      // hourly ? setBookingType(2) : setBookingType(1)
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                {hourly === true && (
                  <Grid item>
                    <Hours
                      hoursState={formData.hours}
                      hourly={hourly}
                      hoursAddressForm={hoursAddressForm}
                      setHoursAddressForm={setHoursAddressForm}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item>
                <Grid item>
                  <Typography
                    className={classes.preferences}
                    style={{ color: "white" }}
                  >
                    Preferences
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ width: "100%" }}
                    className={
                      redBorderOnSubmitForCarType
                        ? classes.carContainerRed
                        : classes.carContainerDefault
                    }
                  >
                    <Carousel
                      // onClick={() => {}}
                      //   plugins={[
                      //     'clickToChange',
                      //     'infinite',
                      //     'arrows',
                      //     {
                      //       resolve: slidesToShowPlugin,
                      //       options: {
                      //        numberOfSlides: 3
                      //       }
                      //     },
                      //   ]}
                      // NextIcon={'asdf'}
                      // PrevIcon={'asdf'}
                      // navButtonsProps={{
                      //   // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                      //   style: {
                      //     backgroundColor: "cornflowerblue",
                      //     borderRadius: 0,
                      //   },
                      // }}
                      // navButtonsWrapperProps={{
                      //   // Move the buttons to the bottom. Unsetting top here to override default style.
                      //   style: {
                      //     bottom: "0",
                      //     top: "unset",
                      //   },
                      // }}
                      // NextIcon="next" // Change the "inside" of the next button to "next"
                      // PrevIcon="prev"
                      // IndicatorIcon={"dsafa"} // Previous Example
                      // indicatorIconButtonProps={{
                      //   style: {
                      //     padding: "10px", // 1
                      //     color: "blue", // 3
                      //   },
                      // }}
                      // activeIndicatorIconButtonProps={{
                      //   style: {
                      //     backgroundColor: "red", // 2
                      //   },
                      // }}
                      // indicatorContainerProps={{
                      //   style: {
                      //     marginTop: "50px", // 5
                      //     textAlign: "right", // 4
                      //   },
                      // }}
                      renderArrow={myArrow}
                      itemsToShow={3}
                      pagination={false}
                      transitionMs={300}
                    >
                      {carTypes.map((car, indexOfEachCar) => (
                        <>
                          <Grid item key={`${car.id}${car.name}`}>
                            <ListItem
                              className={classes.carItem}
                              onClick={() => handleClick(car.id)}
                              selected={car.id === carSelectionID}
                              classes={{
                                selected: classes.active,
                                root: classes.listRoot,
                              }}
                              name="carsValidation"
                            >
                              <Grid
                                container
                                direction="column"
                                // justify="center"
                                alignItems="center"
                                className={classes.carItemContainer}
                              >
                                <Grid item>
                                  <Typography
                                    className={classes.carFont}
                                    noWrap
                                    variant="body2"
                                  >
                                    {car.name}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  className={classes.carImageContainer}
                                >
                                  <img
                                    alt="carImage"
                                    src={car.imageUrl}
                                    className={
                                      indexOfEachCar !== 2
                                        ? classes.carImage
                                        : classes.carImageStylesForBiggerTypeOfImage
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </ListItem>
                          </Grid>
                        </>
                      ))}
                    </Carousel>
                  </Grid>
                </Grid>
                <Grid item className={classes.submitButton}>
                  <Grid container justify="center">
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      className={classes.buttonSelf}
                      style={{
                        height: "40px",
                        borderRadius: "0",
                      }}
                      // endIcon={<ForwardArrowIcon />}
                      // disabled={
                      //   destinations[0].rideCheckPoint &&
                      //   destinations[1].rideCheckPoint &&
                      //   carSelectionID &&
                      //   bookingType
                      //     ? false
                      //     : true
                      // }
                    >
                      <Typography
                        variant="body2"
                        className={classes.typographyForButton}
                      >
                        Next step
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  )
}

const AdressForm = React.memo(AdressFormwithoutReactMemo)

const mapStateToProps = (state) => {
  return {
    carTypes: state.companyProfile.profile.carTypes,
    pageSize: state.cars.pageSize,
    formData: state.formData,
    resetInputs: state.resetWidgetInputs.resetInputs,
    gateMeeting: state.gateMeeting.isGateMeeting,
    hourlyAndSeatsRedux: state.hourlyAndSeatsRedux.hourlyRedux,
  }
}

export default connect(mapStateToProps, {
  getCarsByType,
  getCompanyCars,
  setFormData,
  setHourlyRedux,
  setGateMeetingRedux,
  setSafetySeatCount,
  setBoosterSeatCount,
  setDateForDefaultValue,
  setTimeForDefaultValue,
  setTimeForDefaultValueAMPM,
  setTimeForDefaultValueAlignment,
  setPassengersQuantityForBackStep,
})(AdressForm)
