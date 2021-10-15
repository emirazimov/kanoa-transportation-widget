import { makeStyles } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {
  DatePicker,
  DateTimePicker,
  // TimePicker,
  // KeyboardTimePicker,
} from "@material-ui/pickers"
import "date-fns"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import InputMask from "react-input-mask"
import { PlacesAutocomplete } from "react-places-autocomplete"
import { TimePicker } from "antd"
import "antd/dist/antd.css"
import "./index.css"

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    height: "40px",
    background: "black",
    fontSize: "14px",

    "& input::placeholder": {
      color: "grey",
    },
    borderRadius: "0",
    boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.1)",
    color: "white",
    // "&:-webkit-autofill": {
    //   height: "0px",
    //   border: "none",
    //   borderRadius: "0px",
    //   WebkitBoxShadow: "0 0 0 1000px black inset",
    //   WebkitTextFillColor: "white",
    // },
    // "MuiOutlinediput-input:-webkit-autofill": {
    //   WebkitTextFillColor: "white",
    // },
  },
  noBorder: {
    border: "none",
    // "&:-webkit-autofill": {
    //   height: "0px",
    //   border: "none",
    //   borderRadius: "0px",
    //   WebkitBoxShadow: "0 0 0 1000px black inset",
    //   WebkitTextFillColor: "white",
    // },
    // "MuiOutlinediput-input:-webkit-autofill": {
    //   WebkitTextFillColor: "white",
    // },
  },

  input: {
    "&::placeholder": {
      color: "grey",
      opacity: "1",
      fontSize: "14px",
    },
    "&:-webkit-autofill": {
      height: "0px",
      border: "none",
      borderRadius: "0px",
      WebkitBoxShadow: "0 0 0 1000px black inset",
      WebkitTextFillColor: "white",
    },
    "MuiOutlinediput-input:-webkit-autofill": {
      WebkitTextFillColor: "white",
    },
  },

  "&.MuiDialog-paper .MuiPickersModal-dialogRoot .MuiDialog-paperScrollPaper .MuiDialog-paperWidthSm .MuiPaper-elevation24 .MuiPaper-rounded":
    {
      zIndex: "1000000000000000000",
    },
  modalRoot: {
    zIndex: "1000000000000000000",
  },
}))

export const CustomFormInput = ({ defaultValue, name, required, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={TextField}
      control={control}
      name={name}
      required={required}
      defaultValue={defaultValue}
      {...props}
    />
  )
}

export const CustomFormInputForPayment = ({
  defaultValue,
  name,
  required,
  ...props
}) => {
  const { control } = useFormContext()
  const classes = useStyles()
  const inputStyle = {
    // WebkitBoxShadow: "0 0 0 1000px black inset",
    // height: "0px",
    // WebkitTextFillColor: "white",
  }
  return (
    <Controller
      as={TextField}
      control={control}
      name={name}
      required={required}
      defaultValue={defaultValue}
      inputProps={{ style: inputStyle }}
      InputProps={{
        classes: {
          root: classes.inputRoot,
          notchedOutline: classes.noBorder,
          input: classes.input,
        },
      }}
      style={{ height: "40px" }}
      {...props}
    />
  )
}

export const FormInput = ({ defaultValue, name, required, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={TextField}
      control={control}
      name={name}
      required={required}
      defaultValue={defaultValue}
      {...props}
    />
  )
}

export const CustomMaskInput = ({
  defaultValue,
  name,
  required,
  mask,
  ...props
}) => {
  const { control } = useFormContext()
  const classes = useStyles()

  return (
    <Controller
      as={InputMask}
      control={control}
      name={name}
      required={required}
      mask={mask}
      defaultValue={defaultValue}
      {...props}
    />
  )
}

export const CustomAutocomplete = ({
  defaultValue,
  name,
  required,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={PlacesAutocomplete}
      control={control}
      name={name}
      required={required}
      {...props}
    />
  )
}

export const DateInputControl = ({ name, required, ...props }) => {
  const { control } = useFormContext()
  const classes = useStyles()
  return (
    <Controller
      as={DatePicker}
      name={name}
      required={required}
      DialogProps={{
        classes: {
          dialogRoot: classes.modalRoot,
        },
      }}
      style={{ cursor: "pointer" }}
      {...props}
      control={control}
    ></Controller>
  )
}
export const TimeInputControl = ({ name, required, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={TimePicker}
      name={name}
      required={required}
      style={{ cursor: "pointer" }}
      {...props}
      control={control}
    ></Controller>
  )
}

export const TimeInputControlNewOne = ({
  defaultValue,
  name,
  required,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={TextField}
      name={name}
      required={required}
      style={{ cursor: "pointer" }}
      defaultValue={defaultValue}
      {...props}
      control={control}
    ></Controller>
  )
}
