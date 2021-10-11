import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, useFormContext } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'
import React, { forwardRef, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import {
  AddLocIcon,
  DeleteLocIcon,
  EndLocationIcon,
  StartLocationIcon,
} from '../../assets/icons'
import rideCheckPointErrors from './../CheckoutForm/CheckOut/AdressForm'
import MapStyles from './mapStyles'
import { connect } from 'react-redux'

var redBorder = null

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    width: '91.3%',
    height: '210px',
    position: 'relative',
    marginTop: '20px',
    // marginLeft: "17px",
    // paddingRight: "50px",
    // paddingRight: "10px",
    // marginRight: "10px",
    paddingLeft: '15.5px',
    borderRadius: '20px',
    zIndex: '10',
    [theme.breakpoints.down('769')]: {
      width: '95.7%',
    },
    [theme.breakpoints.down('730')]: {
      width: '95.3%',
    },
    [theme.breakpoints.down('700')]: {
      width: '95%',
    },
    [theme.breakpoints.down('600')]: {
      width: '94%',
    },
    [theme.breakpoints.down('500')]: {
      width: '93%',
    },
    [theme.breakpoints.down('400')]: {
      width: '92%',
    },
    [theme.breakpoints.down('350')]: {
      width: '91%',
    },
  },
  // mapContainer2: {
  //   width: "50%",
  //   // position: "relative",
  //   paddingLeft: "10px",
  //   paddingRight: "120px",

  //   marginTop: "20px",
  // },
  destinationContainer: {
    marginTop: '-24px',
    // padding: theme.spacing(1),
    paddingTop: '7px',
    paddingLeft: '8px',
    paddingRight: '8px',
    padding: '9px',
    background: 'black',
    zIndex: '12',
  },
  destinationText: {
    padding: theme.spacing(1),
  },
  dropDown: {
    position: 'absolute',
    zIndex: 1000,
    justifyContent: 'center',
    width: '500px',
  },
  destinationInputFrom: {},
  inputRoot: {
    border: '1px solid #C6AD99',
    borderRadius: '0px',
    height: '40px',
    backgroundColor: 'black',
    '&::placeholder': {
      color: 'white',
    },
    '&:hover': {
      border: '1px solid white',
    },
    fontSize: '14px',
    color: 'white',
  },
  noBorderDefault: {
    border: 'none',
  },
  noBorderRed: {
    paddingTop: '4px',
    border: '1px solid #db5858',
  },
  input: {
    // "&::-webkit-input-placeholder": {
    //   /* Chrome/Opera/Safari */ color: "white",
    //   opacity: "1",
    // },
    // "&::-moz-placeholder": {
    //   /* Firefox 19+ */ color: "white",
    //   opacity: "1",
    // },
    // "&:-ms-input-placeholder": {
    //   /* IE 10+ */ color: "white",
    //   opacity: "1",
    // },
    // "&:-moz-placeholder": {
    //   /* Firefox 18- */ color: "white",
    //   opacity: "1",
    // },
    '&::placeholder': {
      color: 'white',
      opacity: '1',
      fontSize: '14px',
    },
    // menuItem: {
    //   backgroundColor: "black",
    //   "&:hover": {
    //     backgroundColor: "red",
    //   },
    // },
  },
}))

const GoogleMap = React.memo(
  forwardRef(
    ({
      setDestinations,
      destinations,
      orderAddressDetails,
      ref,
      errors,
      redBorderOnSubmit,
      redBorderOnSubmit2,
      resetInputs,
      ...props
    }) => {
      const classes = useStyles(redBorderOnSubmit)

      const [condition, setCondition] = useState([])

      const handleChanger = (e) => {
        setCondition(e.event.target)
        console.log(condition)
      }
      const [markers, setMarkers] = useState([])
      const [mapCenter, setMapCenter] = useState({
        lat: 21.315603,
        lng: -157.858093,
      })

      const setUseHookState = (value, id) => {
        let newArr = [...destinations]
        newArr[id].rideCheckPoint = value
        setDestinations(newArr)
      }

      const handleChange = (value, id) => {
        setUseHookState(value, id)
      }

      let selectedArray = null

      const handleSelect = async (value, id) => {
        setUseHookState(value, id)
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        const placeId = results[0].place_id
        let placeType = 0
        if (results[0].types.some((types) => types === 'airport')) {
          placeType = 2
        }
        selectedArray = [...destinations]
        selectedArray[id] = {
          ...selectedArray[id],
          latitude: latLng.lat,
          longitude: latLng.lng,
          placeId: placeId,
          placeType: placeType,
        }

        setDestinations(selectedArray)

        setMapCenter({ lat: latLng.lat, lng: latLng.lng })
        if (markers.length >= 1) {
          markers.splice(0, 2)
          setMarkers([...markers, { lat: latLng.lat, lng: latLng.lng }])
        } else {
          setMarkers([...markers, { lat: latLng.lat, lng: latLng.lng }])
        }
      }

      const addEndPoint = () => {
        let newArr = [
          ...destinations,
          {
            rideCheckPoint: '',
            latitude: 0,
            longitude: 0,
            placeType: 0,
            placeId: '',
          },
        ]
        setDestinations(newArr)
      }

      const airportCenter =
        'Daniel K. Inouye International Airport (HNL), Rodgers Blvd, Honolulu, HI, USA'
      const airportCenter2 =
        'Honolulu Airport (HNL), Rodgers Blvd, Honolulu, HI, USA'

      const airportCenter3 =
        'Daniel K. Inouye International Airport (HNL), Rodgers Blvd, Honolulu, HI, USA'

      const airportCenter4 = [
        'Daniel K. Inouye International Airport (HNL), Rodgers Blvd, Honolulu, HI, USA',
        'Honolulu Airport (HNL), Rodgers Blvd, Honolulu, HI, USA',
      ]
      var nothing = null
      const removeEndPoint = (index) => {
        let newArr = [...destinations]
        newArr.splice(index, 1)
        setDestinations(newArr)
      }
      // const searchOptions = {
      //   location: new google.maps.LatLng(-34, 151),
      //   radius: 2000,
      //   types: ["address"],
      // }
      var copiedSuggestions = null
      var copiedLoading = null
      React.useEffect(() => {}, [orderAddressDetails])
      React.useEffect(() => {
        // console.log(destinations[0]?.rideCheckPoint.includes("Airport"))
      }, [])

      return (
        <>
          <Grid
            container
            direction='column'
            style={{
              backgroundColor: 'black',
              // alignText: "center",
            }}
          >
            <Grid item className={classes.mapContainer}>
              {/* <Grid className={classes.mapContainer2}> */}
              <Map
                google={props.google}
                disableDefaultUI={true}
                initialCenter={{
                  lat: mapCenter.lat,
                  lng: mapCenter.lng,
                }}
                center={{
                  lat: mapCenter.lat,
                  lng: mapCenter.lng,
                }}
                styles={MapStyles}
              >
                {markers.map((marker, id) => (
                  <Marker
                    key={`${id}${marker.lat}`}
                    lat={marker.lat}
                    lng={marker.lng}
                  />
                ))}
              </Map>
              {/* </Grid> */}
            </Grid>
            <Grid item className={classes.destinationContainer}>
              <Grid container direction='column'>
                {destinations.map((destination, id) => {
                  console.log(destinations)
                  if (!airportCenter4.includes(destination.rideCheckPoint)) {
                    nothing = destinations[id].rideCheckPoint
                  }

                  return (
                    <PlacesAutocomplete
                      value={nothing}
                      onChange={(value) => handleChange(value, id)}
                      onSelect={(value) => {
                        handleSelect(value, id)
                      }}
                      key={`${destination.id}${id}`}
                      // searchOptions={searchOptions}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => {
                        copiedSuggestions = [...suggestions].filter((item) => {
                          return !airportCenter4.includes(item.description)
                        })

                        return (
                          <div>
                            <Grid item className={classes.destinationText}>
                              <div
                                className={
                                  redBorderOnSubmit || redBorderOnSubmit2
                                    ? classes.noBorderRed
                                    : classes.noBorderDefault
                                }
                              >
                                <TextField
                                  position='start'
                                  style={{
                                    height: '40px',
                                    // border: "none",

                                    // marginTop: "-4px",
                                    boxShadow:
                                      '4px 5px 30px rgba(0, 0, 0, 0.1)',
                                  }}
                                  variant='outlined'
                                  name='rideCheckPoint'
                                  defaultValue={destinations[id].rideCheckPoint}
                                  fullWidth
                                  // inputRef={ref}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment
                                        style={{
                                          marginRight: '10px',
                                          // marginLeft: "15px",
                                        }}
                                      >
                                        {id === 0 && <StartLocationIcon />}
                                        {id === destinations.length - 1 && (
                                          <EndLocationIcon />
                                        )}
                                        {id > 0 &&
                                          id < destinations.length - 1 && (
                                            <span
                                              style={{
                                                borderRadius: '50%',
                                                width: '24px',
                                                height: '25px',
                                                backgroundColor: 'transparent',
                                                border: '2px solid #FFFFFF',
                                                textAlign: 'center',
                                                fontFamily: 'Roboto',
                                                fontWeight: '700',
                                                fontSize: '0.9rem',
                                                paddingTop: '2px',
                                                marginLeft: '-5px',
                                                marginRight: '-5px',
                                              }}
                                            >
                                              {id}
                                            </span>
                                          )}
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment
                                        style={{
                                          cursor: 'pointer',
                                          // marginRight: "10px",
                                        }}
                                        position='end'
                                      >
                                        {id === destinations.length - 1 && (
                                          <span
                                            onClick={addEndPoint}
                                            style={{
                                              marginTop: '5px',
                                            }}
                                          >
                                            <AddLocIcon />
                                          </span>
                                        )}
                                        {id > 0 &&
                                          id < destinations.length - 1 && (
                                            <span
                                              onClick={() => removeEndPoint(id)}
                                              style={{ marginBottom: '6px' }}
                                            >
                                              <DeleteLocIcon />
                                            </span>
                                          )}
                                      </InputAdornment>
                                    ),
                                    classes: {
                                      root: classes.inputRoot,
                                      notchedOutline:
                                        redBorderOnSubmit || redBorderOnSubmit2
                                          ? classes.noBorderRed
                                          : classes.noBorderDefault,
                                      input: classes.input,
                                    },
                                  }}
                                  {...getInputProps({
                                    placeholder: id === 0 ? 'From' : 'To',
                                    className: 'location-search-input',
                                  })}
                                />
                              </div>
                            </Grid>
                            <div className={classes.dropDown}>
                              {loading && (
                                <div style={{ alignItems: 'center' }}>
                                  Loading...
                                </div>
                              )}
                              {copiedSuggestions.map((suggestion, id) => {
                                console.log(copiedSuggestions)
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item'
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? {
                                      backgroundColor: '#bababa',
                                      cursor: 'pointer',
                                      textTransform: 'none',
                                      justifyContent: 'center',

                                      width: '380px',
                                    }
                                  : {
                                      backgroundColor: 'white',
                                      cursor: 'pointer',
                                      textTransform: 'none',
                                      width: '380px',

                                      justifyContent: 'center',
                                    }

                                return (
                                  <div
                                    key={`${id}${suggestion.description}`}
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <MenuItem
                                      onMouseEnter={(e) =>
                                        (e.target.style.backgroundColor =
                                          '#C6AD99')
                                      }
                                      onMouseLeave={(e) =>
                                        (e.target.style.backgroundColor =
                                          'black')
                                      }
                                      style={{
                                        backgroundColor: 'black',
                                        whiteSpace: 'pre-line',
                                        fontSize: '14px',
                                      }}
                                    >
                                      {suggestion.description}
                                    </MenuItem>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      }}
                    </PlacesAutocomplete>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </>
      )
    }
  )
)

const mapStateToProps = (state) => {
  return {
    // profile: state.companyProfile.profile,
    resetInputs: state.resetWidgetInputs.resetInputs,
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM',
  libraries: ['places', 'drawing', 'geometry'],
})(connect(mapStateToProps, {})(GoogleMap))
