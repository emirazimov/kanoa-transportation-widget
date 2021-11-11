import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import { HourlyIcon, MinusIcon, PlusIcon } from "../../../assets/icons"
import "./index.css"

const Hours = ({
  hoursState,
  setHourly,
  hoursAddressForm,
  setHoursAddressForm,
}) => {
  const { register } = useFormContext()

  //   const [hoursAddressForm, setHoursAddressForm] = useState(0)

  const onDecrease = () => {
    if (hoursAddressForm === 1) {
      return
    }
    setHoursAddressForm((hoursAddressForm) => hoursAddressForm - 1)
  }
  const onIncrease = () => {
    setHoursAddressForm((hoursAddressForm) => hoursAddressForm + 1)
  }

  //   React.useEffect(() => {
  //     if (hoursState !== 0) {
  //       setHourly(true)
  //       setHoursAddressForm(parseInt(hoursState))
  //     }
  //   }, [hoursState])

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{ marginTop: "-4px" }}
    >
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <HourlyIcon />
          <Typography
            style={{ color: "white", fontSize: "14px", marginTop: "4px" }}
          >
            Hours
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
            <span onClick={onDecrease} style={{ marginRight: "5px" }}>
              <MinusIcon />
            </span>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <input
              ref={register}
              name="hours"
              onChange={(e) => {
                setHoursAddressForm(e.target.value)
              }}
              value={hoursAddressForm}
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
}

export default Hours
