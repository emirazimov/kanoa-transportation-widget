import { makeStyles } from "@material-ui/core"

const userScreenHeight = window.innerHeight
const userScreenWidth = window.innerWidth

const useStyles = makeStyles((theme) => ({
  "@keyframes pulse": {
    "10%": {
      "-moz-box-shadow": "0 0 0 0 #C6AD99",
      "box-shadow": "0 0 0 0 #C6AD99",
    },
    "38%": {
      "-moz-box-shadow": "0 0 0 0 #C6AD99",
      "box-shadow": "0 0 3px 4.5px #C6AD99",
    },
    "100%": {
      "-moz-box-shadow": "0 0 0 0 #C6AD99",
      "box-shadow": "0 0 0 0 tranparent",
    },
  },
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0px",
    },
    "& .MuiAccordionSummary-expandIcon": {
      transition: "0ms",
      animationName: "$pulse",
      animationIterationCount: "infinite",
      animationDuration: "2s",
      backgroundColor: "black",
    },
    "& .MuiButtonBase-root": {
      disableRipple: true,
      disableFocusRipple: true,
      // disableElevation: true,
    },
    "& .MuiButtonBase-root.Mui-disabled": {
      backgroundColor: "none",
    },
  },

  main: {
    position: "fixed",
    bottom: "1px",
    webkitUserSelect: "none",
    mozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  mainMobile: {
    position: "fixed",
    bottom: "-1px",
    webkitUserSelect: "none",
    mozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    height: "100%",
  },
  accordion: {
    width: "120px",
    height: "120px",
    bottom: "50px",
    left: "130px",
    background: "none",
    // padding: theme.spacing(1),
    position: "fixed",
    [theme.breakpoints.down("xs")]: {
      left: "10px",
    },
  },
  accordionIpad: {
    width: "120px",
    height: "120px",
    bottom: "50px",
    left: userScreenWidth - 200,

    background: "none",
    // padding: theme.spacing(1),
    position: "fixed",
    [theme.breakpoints.down("xs")]: {
      left: "10px",
    },
  },
  accordionMobile: {
    width: "120px",
    height: "120px",
    bottom: "5px",
    marginLeft: userScreenWidth - 137,
    marginBottom: -10,
    background: "none",
    // padding: theme.spacing(1),
    position: "fixed",
    // zIndex: "1",
    [theme.breakpoints.down("xs")]: {
      left: "10px",
    },
  },
  accordionforBostonLimousineToDisplayIconOnTheLeft: {
    width: "120px",
    height: "120px",
    bottom: "5px",
    marginLeft: -30,
    marginBottom: -10,
    background: "none",
    // padding: theme.spacing(1),
    position: "fixed",
    // zIndex: "1",
    [theme.breakpoints.down("xs")]: {
      left: "10px",
    },
  },
  content: {
    position: "absolute",
    cursor: "default",
    height: "80vh",
    width: "356px",
    backgroundColor: "black",
    border: "1px solid #C6AD99",
    // borderTopRightRadius: '30px',
    // borderTopLeftRadius: '30px',
    // borderBottomRight: '0px',
    // borderBottomLeft: '0px',

    bottom: "-1px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.20em",
      top: "100px",
      borderRadius: "3px",
      backgroundColor: "black",
    },
    "&::-webkit-scrollbar-track": {
      marginTop: "78px",
      // marginBottom: "300px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#c7c7c7",
      // borderRadius: "40px",
      borderRadius: "2px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#bfaf82",
    },
    [theme.breakpoints.down("xs")]: {
      width: userScreenWidth,
      height: userScreenHeight,
    },
    // left: '-20px',
  },
  contentIpad: {
    position: "absolute",
    cursor: "default",
    height: "67vh",
    width: "356px",
    border: "1px solid #C6AD99",
    // borderTopRightRadius: '30px',
    // borderTopLeftRadius: '30px',
    // borderBottomRight: '0px',
    // borderBottomLeft: '0px',
    left: userScreenWidth - 370,
    bottom: "16px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.20em",
      top: "100px",
      backgroundColor: "black",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-track": {
      marginTop: "78px",
      // marginBottom: "300px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "2px",
      // borderRadius: "40px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#c5cde3",
    },
    [theme.breakpoints.down("xs")]: {
      width: userScreenWidth,
      height: userScreenHeight,
    },
  },
  checkOut: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.20em",
      top: "100px",
      backgroundColor: "black",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-track": {
      marginTop: "78px",
      // marginBottom: "300px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "2px",
      // borderRadius: "20px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#c5cde3",
    },
  },
  contentMobile: {
    position: "fixed",
    cursor: "default",

    height: "100%",
    // borderTopRightRadius: '30px',
    // borderTopLeftRadius: '30px',
    // borderBottomRight: '0px',
    // borderBottomLeft: '0px',
    bottom: "1px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.20em",
      top: "100px",
      backgroundColor: "black",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-track": {
      marginTop: "78px",
      // marginBottom: "300px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "2px",
      // borderRadius: "40px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#c5cde3",
    },
    [theme.breakpoints.down("xs")]: {
      width: userScreenWidth,
      height: userScreenHeight,
    },
    // left: '-20px',
  },
  contentMobileWithoutScroll: {
    position: "fixed",
    cursor: "default",
    height: "100%",

    // borderTopRightRadius: '30px',
    // borderTopLeftRadius: '30px',
    // borderBottomRight: '0px',
    // borderBottomLeft: '0px',
    bottom: "1px",
    overflowY: "none",
    // left: '-20px',
  },
  companyProfile: {
    cursor: "move",
    // position: 'sticky',
  },
  closeIcon: {
    textAlign: "center",
    verticalAlign: "sub",
    width: "28px",
    height: "28px",
    paddingTop: "7px",
    cursor: "pointer",
  },
}))

export { useStyles, userScreenWidth, userScreenHeight }
