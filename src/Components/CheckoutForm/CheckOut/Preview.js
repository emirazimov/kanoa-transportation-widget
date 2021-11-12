import { useMediaQuery } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { AspectRatio } from "react-aspect-ratio"
import Carousel from "react-material-ui-carousel"
import { connect } from "react-redux"
import { BackArrowIcon, ForwardArrowIcon } from "../../../assets/icons"
import { toggleIsFetching } from "../../../Redux/car-reducer"
import { setNoteRedux, setOrderSum } from "../../../Redux/form-reducer"
import Directions from "../../GoogleMap/Directions"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
    borderRadius: "8px",
  },
  contentContainer: {
    padding: theme.spacing(2),
    paddingTop: "8px",
    paddingBottom: "8px",
    overflow: "visible",
    backgroundColor: "black",
  },
  carInfoCont: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      // padding: theme.spacing(2),
      paddingRight: "16px",
    },
  },
  priceBox: {
    backgroundColor: "#851EDF",
    padding: theme.spacing(1),
  },
  notes: {
    height: "100%",
    backgroundColor: "black",
    marginTop: "-10px",
    color: "white",
    border: "white",

    "& .MuiFormLabel-root": {
      color: "white", // or black
      fontSize: "16px",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#C6AD99", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#C6AD99", // Solid underline on focus
    },
  },
  backButtonSelf: {
    border: "1px solid #C6AD99",
    backgroundColor: "black",
    color: "#C6AD99",
    "&:hover": {
      backgroundColor: "#C6AD99",
      color: "black",
    },
  },
  nextButtonSelf: {
    border: "1px solid #C6AD99",
    backgroundColor: "black",
    color: "#C6AD99",
    "&:hover": {
      backgroundColor: "#C6AD99",
      color: "black",
    },
  },
  directionsContainer: {
    // paddingTop: "30px",
    // backgroundColor: "blue",
    zIndex: "3",
  },
}))

const Preview = ({
  carId,
  cars,
  formData,
  next,
  back,
  setNoteRedux,
  setOrderSum,
  hourlyAndSeatsRedux,
  gateMeeting,
}) => {
  const classes = useStyles()
  const selectedCar = cars.find((car) => car.id === carId)

  const [note, setNote] = React.useState("")
  const [distance, setDistance] = React.useState(0)

  const sendNote = (note) => {
    setNoteRedux(note)
  }

  const handleChange = (event) => {
    setNote(event.target.value)
  }
  const [carCard, setCarCard] = React.useState(0)
  const [carModal, setCarModal] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (id) => {
    setCarModal(true)
    setOpen(true)
  }

  const handleClose = () => {
    setCarModal(null)
    setOpen(false)
  }

  const handleClick = (id) => {
    setCarCard(id)
  }

  let result = null
  if (carModal) {
    result = cars.find((cars) => carModal === cars.id)
  }

  React.useEffect(() => {
    setNote(formData.orderNotes)
  }, [formData.orderNotes])

  const round = (n, dp) => {
    const h = +"1".padEnd(dp + 1, "0") // 10 or 100 or 1000 or etc
    return Math.round(n * h) / h
  }
  console.log(hourlyAndSeatsRedux)
  const isMobile = useMediaQuery("(max-width:500px)")
  console.log(selectedCar.boosterSeatPrice, selectedCar.safetySeatPrice)

  const showCarAmount = () => {
    if (selectedCar.boosterSeatPrice || selectedCar.safetySeatPrice) {
      return `$${
        selectedCar.price -
        selectedCar.boosterSeatPrice -
        selectedCar.safetySeatPrice
      }`
    } else {
      return `$${selectedCar.price}`
    }
  }

  return (
    <>
      <Grid container spacing={1} className={classes.contentContainer}>
        <Grid item>
          <Typography
            variant="body2"
            style={{
              fontFamily: "Roboto",
              fontWeight: 500,
              color: "white",
              fontSize: "22px",
              lineHeight: "36px",
            }}
          >
            Preview
          </Typography>
        </Grid>
      </Grid>
      <Grid item className={classes.directionsContainer}>
        <Directions
          destinations={formData.orderAddressDetails}
          setDistance={setDistance}
          // style={{ height: "250px" }}
        />
      </Grid>
      <Grid container justify="center">
        <Grid
          container
          direction="column"
          spacing={2}
          className={classes.contentContainer}
          style={{ zIndex: "4", marginTop: "-25px", paddingTop: "0px" }}
        >
          <Grid
            item
            style={{
              // height: "135px",
              paddingRight: !isMobile ? "14.5px" : "0px",
              marginTop: "10px",
              marginBottom: "5px",
            }}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item style={{ width: "48.80%" }}>
                <Carousel
                  autoPlay={false}
                  animation="slide"
                  navButtonsProps={{
                    style: {
                      width: "1em",
                      height: "1em",
                    },
                  }}
                  indicatorIconButtonProps={{
                    style: {
                      "&:hover": {
                        "& $button": {
                          backgroundColor: "#10B7EC",
                          filter: "brightness(120%)",
                          opacity: "0.4",
                        },
                      },
                      marginTop: "-80px",
                      color: "grey",
                    },
                  }}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  indicatorContainerProps={{
                    style: { height: "0px" },
                  }}
                >
                  {selectedCar.imageUrls.length !== 0 ? (
                    selectedCar.imageUrls.map((url) => (
                      <span
                        key={url.id}
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClickOpen()}
                      >
                        <div
                          style={{
                            position: "absolute",
                            width: "75px",
                            height: "20px",
                            backgroundColor: "#C6AD99",
                            color: "black",
                            fontSize: "13px",
                            paddingLeft: "10px",
                          }}
                        >
                          or similar
                        </div>
                        <AspectRatio
                          // ratio="560/315"
                          style={{
                            display: "block",
                            width: !isMobile ? "100%" : "100%",
                            height: !isMobile ? "112px" : "116px",
                            // borderRadius: "8px",
                            cursor: "zoom-in",
                          }}
                        >
                          <img
                            src={url.path}
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            alt="car"
                          />
                        </AspectRatio>
                      </span>
                    ))
                  ) : (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          width: "75px",
                          height: "20px",
                          backgroundColor: "#C6AD99",
                          color: "black",
                          fontSize: "13px",
                          paddingLeft: "12px",
                        }}
                      >
                        or similar
                      </span>
                      <img
                        src={
                          "https://fl-1.cdn.flockler.com/embed/not-found.png"
                        }
                        style={{
                          width: !isMobile ? "100%" : "100%",
                          height: !isMobile ? "118px" : "116px",
                        }}
                        alt="car"
                      />
                    </>
                  )}
                </Carousel>
                {carModal && (
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    // style={{
                    //   width: !isMobile ? "600px" : "238px",
                    //   height: !isMobile ? "450px" : "150px",
                    // }}
                  >
                    <DialogActions>
                      <Carousel
                        autoPlay={false}
                        animation="slide"
                        swipe={true}
                        navButtonsAlwaysVisible={true}
                        navButtonsProps={{
                          style: {
                            width: "1em",
                            height: "1em",
                          },
                        }}
                        indicatorIconButtonProps={{
                          style: {
                            "&:hover": {
                              "& $button": {
                                backgroundColor: "#10B7EC",
                                filter: "brightness(120%)",
                                opacity: "0.4",
                              },
                            },
                          },
                        }}
                        activeIndicatorIconButtonProps={{
                          style: {
                            color: "#10B7EC",
                          },
                        }}
                        indicatorContainerProps={{
                          style: {},
                        }}
                      >
                        {carModal &&
                          selectedCar.imageUrls.map((url) => (
                            <AspectRatio
                              ratio="4/3"
                              style={{
                                width: !isMobile ? "550px" : "257px",
                                height: !isMobile ? "400px" : "170px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                // display: "block",
                                // width: !isMobile ? "170px" : "100%",
                                // height: !isMobile ? "107px" : "116px",
                                // // borderRadius: "8px",
                                // cursor: "zoom-in",
                                // width: "100%",
                                // height: "100%",
                                // userDrag: "none",
                                // userSelect: "none",
                                // mozUserSelect: "none",
                                // webkitUserDrag: "none",
                                // webkitUserSelect: "none",
                                // msUserSelect: "none",
                                // maxWidth: "500px",
                              }}
                            >
                              <img
                                src={url.path}
                                style={{
                                  borderRadius: "8px",
                                  maxWidth: "100%",
                                  maxHeight: "100%",
                                }}
                                alt="car"
                                key={`${url.id}${url.path}`}
                              />
                            </AspectRatio>
                          ))}
                      </Carousel>
                    </DialogActions>
                  </Dialog>
                )}
              </Grid>
              <Grid item style={{ width: "45.2%" }}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  className={classes.carInfoCont}
                >
                  <Typography variant="body2" style={{ fontSize: "18px" }}>
                    {selectedCar.make} {selectedCar.model}
                  </Typography>

                  {/* <Typography
                            variant='body2'
                            style={{ fontSize: '18px' }}
                          ></Typography> */}

                  <Grid
                    container
                    justify="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        Type
                      </Typography>
                    </Grid>
                    <Grid item style={{ flexGrow: 1 }}>
                      <Box
                        style={{
                          marginTop: "13px",
                          backgroundColor: "transparent",
                          marginLeft: "2px",
                          marginRight: "3px",
                          borderBottom: "2px dotted white",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        {selectedCar.type}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justify="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        Capacity
                      </Typography>
                    </Grid>
                    <Grid item style={{ flexGrow: 1 }}>
                      <Box
                        style={{
                          marginTop: "13px",
                          backgroundColor: "transparent",
                          marginLeft: "2px",
                          marginRight: "3px",
                          borderBottom: "2px dotted white",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        {selectedCar.capacity}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container justify="row">
                    <Grid item>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        Color
                      </Typography>
                    </Grid>
                    <Grid item style={{ flexGrow: 1 }}>
                      <Box
                        style={{
                          marginTop: "13px",
                          backgroundColor: "transparent",
                          marginLeft: "2px",
                          marginRight: "3px",
                          borderBottom: "2px dotted white",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        {selectedCar.color}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container justify="row">
                    <Grid item>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                      >
                        Amount
                      </Typography>
                    </Grid>
                    <Grid item style={{ flexGrow: 1 }}>
                      <Box
                        style={{
                          marginTop: "13px",
                          backgroundColor: "transparent",
                          marginLeft: "2px",
                          marginRight: "3px",
                          borderBottom: "2px dotted white",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{
                          color: "white",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {gateMeeting
                          ? `$${
                              selectedCar.price -
                              selectedCar.greetAndMeetPrice -
                              selectedCar.boosterSeatPrice -
                              selectedCar.safetySeatPrice
                            }`
                          : showCarAmount()}
                        {/* {{}()} */}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={8}>
                            <Paper className={classes.priceBox}>
                              <Grid container justify="center">
                                <Typography variant="body2">
                                  ${car.price}
                                </Typography>
                              </Grid>
                            </Paper>
                          </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  Date
                </Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "8px",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    marginRight: "3px",
                    borderBottom: "2px dotted white",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginRight: "-3px",
                  }}
                >
                  {formData.orderStartDateTime.match(
                    /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  Time
                </Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "8px",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    marginRight: "3px",
                    borderBottom: "2px dotted white",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  {new Date(formData.orderStartDateTime).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
              wrap="nowrap"
            >
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  From
                </Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    // minWidth: "40px",
                    marginTop: "16px",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    marginRight: "3px",
                    borderBottom: "2px dotted white",
                  }}
                />
              </Grid>
              <Grid
                item
                style={{
                  display: "inline",
                  maxWidth: "60%",
                  textAlign: "right",
                }}
              >
                <Typography
                  style={{
                    display: "inline",
                    // wordWrap: "break-word",
                    color: "white",
                    fontSize: "16px",
                    width: "100%",
                    // textAlign: "right",
                  }}
                >
                  {formData.orderAddressDetails[0].rideCheckPoint}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  To
                </Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    // width: "100%",
                    marginTop: "8px",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    marginRight: "3px",
                    borderBottom: "2px dotted white",
                  }}
                />
              </Grid>
              <Grid
                item
                style={{
                  display: "inline",
                  maxWidth: "60%",
                  textAlign: "right",
                }}
              >
                <Typography
                  style={{
                    display: "inline",
                    // wordWrap: "break-word",
                    color: "white",
                    fontSize: "16px",
                    width: "100%",
                    // textAlign: "right",
                  }}
                >
                  {
                    formData.orderAddressDetails[
                      formData.orderAddressDetails.length - 1
                    ].rideCheckPoint
                  }
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  Vehicle
                </Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "8px",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    marginRight: "3px",
                    borderBottom: "2px dotted white",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  {selectedCar.type}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  Total distance
                </Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "8px",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    marginRight: "3px",
                    borderBottom: "2px dotted white",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  {distance} miles
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  Number of Passengers
                </Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "8px",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    marginRight: "3px",
                    borderBottom: "2px dotted white",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  {formData.passengersQuantity}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {hourlyAndSeatsRedux && (
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography style={{ color: "white", fontSize: "16px" }}>
                    Hours
                  </Typography>
                </Grid>
                <Grid item style={{ flexGrow: 1 }}>
                  <Box
                    style={{
                      marginTop: "8px",
                      backgroundColor: "transparent",
                      marginLeft: "3px",
                      marginRight: "3px",
                      borderBottom: "2px dotted white",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography style={{ color: "white", fontSize: "16px" }}>
                    {formData.hours}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          {selectedCar.boosterSeatPrice !== 0 &&
          selectedCar.boosterSeatPrice !== undefined ? (
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography style={{ color: "white", fontSize: "16px" }}>
                    Youth Booster Seat
                  </Typography>
                </Grid>
                <Grid item style={{ flexGrow: 1 }}>
                  <Box
                    style={{
                      marginTop: "8px",
                      backgroundColor: "transparent",
                      marginLeft: "3px",
                      marginRight: "3px",
                      borderBottom: "2px dotted white",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography style={{ color: "white", fontSize: "16px" }}>
                    {`$${selectedCar.boosterSeatPrice}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <>
              {selectedCar.boosterSeatPrice == undefined ? null : (
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={{ color: "white", fontSize: "16px" }}>
                        Youth Booster Seat
                      </Typography>
                    </Grid>
                    <Grid item style={{ flexGrow: 1 }}>
                      <Box
                        style={{
                          marginTop: "8px",
                          backgroundColor: "transparent",
                          marginLeft: "3px",
                          marginRight: "3px",
                          borderBottom: "2px dotted white",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography style={{ color: "white", fontSize: "16px" }}>
                        {`$${0}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </>
          )}
          {selectedCar.safetySeatPrice !== 0 &&
          selectedCar.safetySeatPrice !== undefined ? (
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography style={{ color: "white", fontSize: "16px" }}>
                    {"Infant & Child Safety Seat"}
                  </Typography>
                </Grid>
                <Grid item style={{ flexGrow: 1 }}>
                  <Box
                    style={{
                      marginTop: "8px",
                      backgroundColor: "transparent",
                      marginLeft: "3px",
                      marginRight: "3px",
                      borderBottom: "2px dotted white",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography style={{ color: "white", fontSize: "16px" }}>
                    {`$${selectedCar.safetySeatPrice}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <>
              {selectedCar.safetySeatPrice == undefined ? null : (
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography style={{ color: "white", fontSize: "16px" }}>
                        {"Infant & Child Safety Seat"}
                      </Typography>
                    </Grid>
                    <Grid item style={{ flexGrow: 1 }}>
                      <Box
                        style={{
                          marginTop: "8px",
                          backgroundColor: "transparent",
                          marginLeft: "3px",
                          marginRight: "3px",
                          borderBottom: "2px dotted white",
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography style={{ color: "white", fontSize: "16px" }}>
                        {`$${0}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </>
          )}
          {gateMeeting && (
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography style={{ color: "white", fontSize: "16px" }}>
                    {"Meet & Greet/Luggage Assist"}
                  </Typography>
                </Grid>
                <Grid item style={{ flexGrow: 1 }}>
                  <Box
                    style={{
                      marginTop: "8px",
                      backgroundColor: "transparent",
                      marginLeft: "3px",
                      marginRight: "3px",
                      borderBottom: "2px dotted white",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    {`$${selectedCar.greetAndMeetPrice}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography style={{ color: "white", fontSize: "16px" }}>
                  Total
                </Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "8px",
                    backgroundColor: "transparent",
                    marginLeft: "3px",
                    marginRight: "3px",
                    borderBottom: "2px dotted white",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {/* {`$${selectedCar.price}`}{" "} */}
                  {`$${round(selectedCar.price, 2)}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-flexible"
              label="Notes / Itinerary"
              multiline
              fullWidth
              rows={3}
              value={note}
              onChange={handleChange}
              className={classes.notes}
            />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={1}
              className={classes.buttonGroup}
            >
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={back}
                  startIcon={<BackArrowIcon />}
                  className={classes.backButtonSelf}
                  style={{
                    height: "50px",
                    borderRadius: "0",
                    textTransform: "none",
                  }}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    next()
                    sendNote(note)
                    setOrderSum(selectedCar.price)
                  }}
                  color="primary"
                  endIcon={<ForwardArrowIcon />}
                  className={classes.nextButtonSelf}
                  style={{
                    height: "50px",
                    borderRadius: "0",
                    textTransform: "none",
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars.cars,
    formData: state.formData,
    carId: state.formData.carInfo.id,
    hourlyAndSeatsRedux: state.hourlyAndSeatsRedux.hourlyRedux,
    gateMeeting: state.gateMeeting.isGateMeeting,
  }
}

export default connect(mapStateToProps, {
  setNoteRedux,
  setOrderSum,
})(Preview)
