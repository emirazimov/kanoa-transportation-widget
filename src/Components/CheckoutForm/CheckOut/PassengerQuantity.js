import { useMediaQuery } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React, { memo, useState } from "react"
import { useFormContext } from "react-hook-form"
import {
  MinusIcon,
  NumberOfPassengers,
  NumberOfPassengersIcon,
  PlusIcon,
} from "../../../assets/icons"

export default React.memo(function PassengerQuantity({
  passengersqState,
  setPassengers,
  passengers,
}) {
  const { register } = useFormContext()

  const onDecrease = () => {
    if (passengers === 0) {
      return
    }
    setPassengers((passengers) => passengers - 1)
  }
  const onIncrease = () => {
    if (passengers === 14) {
      return
    }
    setPassengers((passengers) => passengers + 1)
  }

  //   React.useEffect(() => {
  //     setPassengers(parseInt(passengersqState))
  //   }, [passengersqState])
  const isMobile = useMediaQuery("(max-width:340px)")
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <Grid container direction="row">
          <NumberOfPassengersIcon
            style={{ paddingLeft: "30px" }}
          ></NumberOfPassengersIcon>
          <Typography
            style={{
              color: "white",
              fontSize: "14px",
              wordWrap: "break-word",

              width: isMobile ? "130px" : "none",
            }}
          >
            Number of passengers
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <span
              onClick={onDecrease}
              style={{
                marginRight: "5px",
              }}
            >
              <MinusIcon />
            </span>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <input
              ref={register}
              name="passengersQuantity"
              onChange={(e) => {
                setPassengers(e.target.value)
              }}
              value={passengers}
              size="1"
              style={{
                // pointerEvents: "none",
                minWidth: "30px",
                marginRight: "3px",
                marginBottom: "4px",
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                textAlign: "center",
                fontFamily: "Roboto",
                textTransform: "none",
                fontWeight: "400",
                fontSize: "14px",
              }}
            />
          </Grid>
          <Grid item>
            <span onClick={onIncrease} style={{ marginLeft: "4px" }}>
              <PlusIcon />
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})
