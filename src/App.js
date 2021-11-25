import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Card from "@material-ui/core/Card"
import CssBaseline from "@material-ui/core/CssBaseline"
import Slide from "@material-ui/core/Slide"
import { ThemeProvider } from "@material-ui/styles"
// import { isMobile } from 'react-device-detect';
import React, { useEffect } from "react"
import Draggable from "react-draggable"
import { connect } from "react-redux"
import {
  BookinglaneIcon,
  BookinglaneIconForMobile,
  CloseWidgetIcon,
} from "./assets/icons"
import CheckOut from "./Components/CheckoutForm/CheckOut/CheckOut"
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile"
import {
  getCompanyProfile,
  initializing,
} from "./Redux/company-profile-reducer"
import { getCompanyToken } from "./Redux/company-token-reducer"
import theme from "./Theme"

import { userScreenHeight, userScreenWidth, useStyles } from "./AppStyles"
import { AppBar, useMediaQuery } from "@material-ui/core"
import { useRef } from "react"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

let xOrdinate = 0
let yOrdinate = 0
// const cardHeight = document.getElementById("mainContent").clientHeight

const App = (props) => {
  const classes = useStyles(props)

  const [activeStep, setActiveStep] = React.useState(0)
  let position = React.useRef({ x: userScreenWidth - 300, y: 10 })
  const [expanded, setExpanded] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [disabledWidget, setDisabledWidget] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [heightOfCard, setHeightOfCard] = React.useState(0)
  const refOfCard = useRef(null)
  const [heightOfBookNow, setHeightOfBookNow] = React.useState(0)
  const [backgroundScrollStop, setBackgroundScrollStop] = React.useState(false)
  const [
    backgroundScrollStopForTimePicker,
    setBackgroundScrollStopForTimePicker,
  ] = React.useState(false)
  const [draggable, setDraggable] = React.useState(false)

  const refOfBookNow = useRef(null)

  const handleClose = () => {
    setExpanded(false)
    document.body.style.overflowY = "unset"
    position.current.y = 10

    if (userScreenWidth - xOrdinate < 500) {
      position.current.x = userScreenWidth - 300
    }
  }
  {
    /* Этот обработчик для того чтобы при закрытии виджета кнопка book now стояла в самом краю без этого она сдвигаетсяв лево */
  }

  const handleChange = (panel) => (event, isExpanded) => {
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    position.current.y = -10
    if (userScreenWidth - xOrdinate < 500) {
      position.current.x = userScreenWidth - 390
    }
    if (xOrdinate < -20) {
      position.current.x = 0
    }
    setExpanded(isExpanded ? panel : false)
  }

  const enableAccordionButton = (e) => {
    setTimeout(() => {
      setDisabled(false)
    }, 200)

    {
      /*Этот обработчик чтобы сам раскрывшийся виджет не выходил за рамки экрана если перетаскивается за пределы то он возвращается */
    }
    if (expanded) {
      yOrdinate = position.current.y
      xOrdinate = position.current.x
      if (xOrdinate + 500 > userScreenWidth) {
        position.current.x = userScreenWidth - 380
      }
      if (xOrdinate < -20) {
        position.current.x = 0
      }
      if (yOrdinate - heightOfCard < -userScreenHeight) {
        position.current.y = -userScreenHeight + heightOfCard
      }
      if (yOrdinate > 0) {
        position.current.y = 0
      }
    }
    {
      /*Тот же обратчик только для иконки Book Now! с пульсацией до раскрытой иконке*/
    }
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    if (xOrdinate < 0) {
      position.current.x = -60
    }
    if (xOrdinate + 300 > userScreenWidth) {
      position.current.x = userScreenWidth - 300
    }
    if (yOrdinate - 215 < -userScreenHeight) {
      position.current.y = -userScreenHeight + 240
    }

    if (yOrdinate > 0) {
      position.current.y = 0
    }
    // console.log(position.current.y)
    // console.log(userScreenHeight)
  }

  React.useEffect(() => {
    if (backgroundScrollStop) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [backgroundScrollStop])

  const settingHeight = () => {
    setHeightOfCard(refOfCard.current?.clientHeight)
  }

  React.useEffect(() => {
    settingHeight()
    setHeightOfBookNow(refOfBookNow.current.clientHeight)
  }, [heightOfBookNow])
  props.getCompanyToken()
  React.useEffect(() => {
    if (props.loading) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [props.loading])
  // console.log(props.loading)
  const handleDrag = (e, ui) => {
    position.current.x = ui.x
    position.current.y = ui.y
    if (!expanded)
      setTimeout(() => {
        setDisabled(true)
      }, 200)
  }

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const jwtToken = localStorage.getItem("Authorization")

  // useEffect(() => {
  //   if (jwtToken) {
  //     return
  //   }

  //   props.getCompanyToken()
  // }, [jwtToken])

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const isMobile = useMediaQuery("(max-width:530px)")
  const isiPad = useMediaQuery("(max-width:1024px)")
  const forBostonLimousineToDisplayIconOnTheLeft =
    useMediaQuery("(max-width:500px)")

  let stylesForBody = `
    z-index: 1000000000; 
    position: absolute;
  `
  document.getElementById("widget-by-bookinglane").style = stylesForBody

  return (
    <>
      {/* {props.getCompanyToken() && ( */}
      <>
        {forBostonLimousineToDisplayIconOnTheLeft ? (
          <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <div className={classes.mainMobile}>
                {/* <Draggable
                onStart={disableAccordionButtonMobile}
                onDrag={handleDragForMobile}
                onStop={enableAccordionButtonMobile}
                position={position.current}
                // disabled={true}
                cancel="#mainest "
                onClick={() => {
                  console.log("hello drag")
                }}
                // bounds="body"
                // handle="#panel1a-header"
                // allowAnyClick={false}
                // enableUserSelectHack={false}
              > */}
                <Accordion
                  elevation={0}
                  disabled={disabled}
                  classes={{
                    root: classes.MuiAccordionroot,
                    disabled: classes.disabledButton,
                  }}
                  TransitionProps={{
                    timeout: 0,
                  }}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    className={classes.accordionMobile}
                    expandIcon={<BookinglaneIconForMobile />}
                    aria-controls="panel1a-content"
                    id="panel1a-header-mobile"
                    ref={refOfBookNow}
                    onClick={() => {
                      setBackgroundScrollStop(true)
                    }}
                  >
                    {/* <div
                      id="mainest"
                      className={classes.accordionMobile}
                      style={{
                        // position: "absolute",
                        // zIndex: "2",
                        width: "100px",
                        height: "100px",
                        background: "green",
                        marginTop: "-50px",
                        marginLeft: "34px",
                      }}
                    ></div> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    {jwtToken && (
                      <Card
                        className={
                          backgroundScrollStopForTimePicker
                            ? classes.contentMobileWithoutScroll
                            : classes.contentMobile
                        }
                        style={{ bottom: userScreenHeight - yOrdinate }}
                        style={
                          activeStep === 1
                            ? { overflowY: "hidden" }
                            : { overflowY: "auto" }
                        }
                        style={{
                          width: userScreenWidth,
                        }} /* ширину уже раскрывшегося карда пишу сдезь потому-что через makestyles не сетает*/
                        ref={refOfCard}
                      >
                        <CompanyProfile
                          setExpanded={handleClose}
                          initializing={props.initializing}
                          expanded={expanded}
                          setActiveStep={setActiveStep}
                          setBackgroundScrollStop={setBackgroundScrollStop}
                        />

                        {props.initializing ? (
                          <CheckOut
                            isFetching={props.isFetching}
                            setExpanded={handleClose}
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                            nextStep={nextStep}
                            backStep={backStep}
                            backgroundScrollStopForTimePicker={
                              backgroundScrollStopForTimePicker
                            }
                            setBackgroundScrollStopForTimePicker={
                              setBackgroundScrollStopForTimePicker
                            }
                            setBackgroundScrollStop={setBackgroundScrollStop}
                          />
                        ) : null}
                      </Card>
                    )}
                    {!jwtToken && null}
                  </AccordionDetails>
                </Accordion>
                {/* </Draggable> */}
              </div>
            </ThemeProvider>
          </>
        ) : (
          <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <div className={classes.main}>
                {forBostonLimousineToDisplayIconOnTheLeft && (
                  <Accordion
                    elevation={0}
                    disabled={disabled}
                    classes={{
                      root: classes.MuiAccordionroot,
                      disabled: classes.disabledButton,
                    }}
                    TransitionProps={{
                      timeout: 0,
                    }}
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      className={
                        classes.accordionforBostonLimousineToDisplayIconOnTheLeft
                      }
                      expandIcon={<BookinglaneIconForMobile />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      ref={refOfBookNow}
                      onClick={() => {
                        setBackgroundScrollStop(true)
                      }}
                    ></AccordionSummary>
                    <AccordionDetails>
                      {jwtToken && (
                        <div className="mainContent">
                          <Card
                            className={classes.content}
                            style={{ bottom: userScreenHeight - yOrdinate }}
                            style={
                              activeStep === 1
                                ? { overflowY: "hidden auto" }
                                : { overflowY: "auto" }
                            }
                            ref={refOfCard}
                            // style={{ borderRadius: "10px" }}
                          >
                            <AppBar position="sticky" color=" #101020">
                              <div className="companyProfileClassForDrag">
                                {/* этот класс c div-oм для реакт драга чтобы можно было перетаскивать по шапке виджета*/}
                                <div className={classes.companyProfile}>
                                  {/* это для pointer cursora */}
                                  <CompanyProfile
                                    setExpanded={handleClose}
                                    initializing={props.initializing}
                                    expanded={expanded}
                                    setActiveStep={setActiveStep}
                                    setBackgroundScrollStop={
                                      setBackgroundScrollStop
                                    }
                                  />
                                </div>
                              </div>
                            </AppBar>

                            {props.initializing ? (
                              <CheckOut
                                isFetching={props.isFetching}
                                setExpanded={handleClose}
                                activeStep={activeStep}
                                setActiveStep={setActiveStep}
                                nextStep={nextStep}
                                backStep={backStep}
                                setBackgroundScrollStop={
                                  setBackgroundScrollStop
                                }
                              />
                            ) : null}
                          </Card>
                        </div>
                      )}
                      {!jwtToken && null}
                    </AccordionDetails>
                  </Accordion>
                )}
                {isiPad && (
                  // <Draggable
                  //   onDrag={handleDrag}
                  //   onStop={enableAccordionButton}
                  //   position={position.current}
                  //   // defaultPosition={{ x: userScreenWidth, y: 25 }}

                  //   // disabled={false}
                  //   // bounds="body"
                  //   handle=".companyProfileClassForDrag"
                  // >
                  <Accordion
                    elevation={0}
                    disabled={disabled}
                    classes={{
                      root: classes.MuiAccordionroot,
                      disabled: classes.disabledButton,
                    }}
                    TransitionProps={{
                      timeout: 0,
                    }}
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      className={classes.accordionIpad}
                      expandIcon={<BookinglaneIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      ref={refOfBookNow}
                      onClick={() => {
                        setBackgroundScrollStop(true)
                      }}
                    ></AccordionSummary>

                    <AccordionDetails>
                      {jwtToken && (
                        <div className="mainContent">
                          <Card
                            className={classes.contentIpad}
                            style={{ bottom: userScreenHeight - yOrdinate }}
                            style={
                              activeStep === 1
                                ? { overflowY: "hidden auto" }
                                : { overflowY: "auto" }
                            }
                            ref={refOfCard}
                            // style={{ borderRadius: "10px" }}
                          >
                            <AppBar position="sticky" color=" #101020">
                              <div className="companyProfileClassForDrag">
                                {/* этот класс c div-oм для реакт драга чтобы можно было перетаскивать по шапке виджета*/}
                                <div className={classes.companyProfile}>
                                  {/* это для pointer cursora */}
                                  <CompanyProfile
                                    setExpanded={handleClose}
                                    initializing={props.initializing}
                                    expanded={expanded}
                                    setActiveStep={setActiveStep}
                                    setBackgroundScrollStop={
                                      setBackgroundScrollStop
                                    }
                                  />
                                </div>
                              </div>
                            </AppBar>

                            {props.initializing ? (
                              <CheckOut
                                isFetching={props.isFetching}
                                setExpanded={handleClose}
                                activeStep={activeStep}
                                setActiveStep={setActiveStep}
                                nextStep={nextStep}
                                backStep={backStep}
                                setBackgroundScrollStop={
                                  setBackgroundScrollStop
                                }
                              />
                            ) : null}
                          </Card>
                        </div>
                      )}
                      {!jwtToken && null}
                    </AccordionDetails>
                  </Accordion>
                  // </Draggable>
                )}

                {!isiPad && (
                  <Draggable
                    onDrag={handleDrag}
                    onStop={enableAccordionButton}
                    position={position.current}
                    // defaultPosition={{ x: userScreenWidth, y: 25 }}

                    // disabled={false}
                    // bounds="body"
                    handle=".companyProfileClassForDrag, #panel1a-header"
                  >
                    <Accordion
                      elevation={0}
                      disabled={disabled}
                      classes={{
                        root: classes.MuiAccordionroot,
                        disabled: classes.disabledButton,
                      }}
                      TransitionProps={{
                        timeout: 0,
                      }}
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        className={classes.accordion}
                        expandIcon={<BookinglaneIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        ref={refOfBookNow}
                        onClick={() => {
                          setBackgroundScrollStop(true)
                        }}
                      ></AccordionSummary>
                      <AccordionDetails>
                        {jwtToken && (
                          <div className="mainContent">
                            {/* <div
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  // background: "red",
                                  // color: "white",
                                  // border: "1px solid white",
                                  position: "absolute",
                                  top: "-765px",
                                  right: "-373px",
                                }}
                                className={classes.closeIcon}
                                onClick={() => {
                                  setExpanded()
                                  setActiveStep(0)
                                  setBackgroundScrollStop(false)
                                }}
                              >
                                <CloseWidgetIcon />
                              </div> */}
                            <Card
                              className={classes.content}
                              style={{ bottom: userScreenHeight - yOrdinate }}
                              style={
                                activeStep === 1
                                  ? { overflowY: "hidden auto" }
                                  : { overflowY: "auto" }
                              }
                              ref={refOfCard}
                              // style={{ borderRadius: "10px" }}
                            >
                              <AppBar position="sticky" color=" #101020">
                                <div className="companyProfileClassForDrag">
                                  {/* этот класс c div-oм для реакт драга чтобы можно было перетаскивать по шапке виджета*/}
                                  <div className={classes.companyProfile}>
                                    {/* это для pointer cursora */}
                                    <CompanyProfile
                                      setExpanded={handleClose}
                                      initializing={props.initializing}
                                      expanded={expanded}
                                      setActiveStep={setActiveStep}
                                      setBackgroundScrollStop={
                                        setBackgroundScrollStop
                                      }
                                    />
                                  </div>
                                </div>
                              </AppBar>

                              {props.initializing ? (
                                <CheckOut
                                  isFetching={props.isFetching}
                                  setExpanded={handleClose}
                                  activeStep={activeStep}
                                  setActiveStep={setActiveStep}
                                  nextStep={nextStep}
                                  backStep={backStep}
                                  setBackgroundScrollStop={
                                    setBackgroundScrollStop
                                  }
                                />
                              ) : null}
                            </Card>
                          </div>
                        )}
                        {!jwtToken && null}
                      </AccordionDetails>
                    </Accordion>
                  </Draggable>
                )}
              </div>
            </ThemeProvider>
          </>
        )}
      </>
      {/* )} */}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.cars.isFetching,
    companyName: state.companyProfile.profile.companyName,
    initializing: state.companyProfile.initializing,
    loading: state.companyToken.loading,
  }
}

export default connect(mapStateToProps, { getCompanyProfile, getCompanyToken })(
  App
)
