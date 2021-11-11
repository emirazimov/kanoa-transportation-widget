import { createMuiTheme } from "@material-ui/core/styles"
import React, { useState } from "react"

// const darkPurple = '#101020';
// const containerColor = '#16162E';
// const purplePrimary = '#3E1CB8';

const darkState = true
// export default function Dashboard() {
// const [darkState, setDarkState] = useState(false)
const palletType = darkState ? "dark" : "light"
const mainPrimaryColor = darkState ? "#2E2E98" : "#2E2E98"
const darkPaper = darkState ? "#101020" : "#FFFFFF"
const containerColor = darkState ? "#16162E" : "#EEEEEE"
const carContainer = darkState ? "#191929" : "#191929"

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#bfbfbf",
    },
    background: {
      paper: "#FFFFFF",
    },
    container: {
      color: "black",
    },
    carContainer: {
      color: "black",
    },
  },
  overrides: {
    // MuiPickersModal: {
    //   dialog: {
    //     zIndex: "1000000000000000000",
    //   },
    // },

    MuiDialogActions: {
      root: {
        display: "none",
      },
    },
    MuiTextField: {
      root: {
        // borderRadius: "12px",
        backgroundColor: "black",
        color: "black",
      },
    },
    MuiDialogActions: {
      root: {
        backgroundColor: "black",
      },
    },
    MuiButton: {
      textPrimary: { color: "white" },
    },
    MuiPickersBasePicker: {
      pickerView: {
        backgroundColor: "black",
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: { backgroundColor: "#C6AD99" },
    },
    MuiPickersDay: {
      day: {
        color: "white",
        fontFamily: '"Do Hyeon", sans-serif',
        backgroundColor: "transparent",
        borderRadius: "4px",
      },
      dayHover: {
        background: "#C19815",
        color: "black",
      },
      container: {
        backgroundColor: "black",
      },
      daySelected: {
        backgroundColor: "#C6AD99",
        color: "black",
      },

      dayDisabled: {
        color: "grey",
      },
      current: {
        color: "",
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "#C19815",
      },
    },

    MuiDialog: {
      root: { zIndex: "1000000001 !important" },
    },
    MuiOutlinedInput: {
      input: {
        "&:-webkit-autofill": {
          "-webkit-box-shadow": "0 0 0 100px #000 inset !important",
          "-webkit-text-fill-color": "#fff",
        },
      },
    },
  },
  shape: {
    // borderRadius: "8px",
  },

  typography: {
    body1: {
      fontFamily: "Roboto",
      textTransform: "none",
      fontWeight: "400",
      fontSize: "1.2rem",
      color: "white",
    },
    body2: {
      fontFamily: "Roboto",
      textTransform: "none",
      fontWeight: "400",
      fontSize: "1.2rem",
      lineHeight: "24px",
      color: "white",
    },
  },
})
