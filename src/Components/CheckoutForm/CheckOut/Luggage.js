import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { useFormContext } from "react-hook-form"
import {
  HourlyIcon,
  LuggageIcon,
  MinusIcon,
  PlusIcon,
} from "../../../assets/icons"
import "./index.css"

const Luggage = ({ luggage, setLuggage }) => {
  const { register } = useFormContext()

  //   const [hoursAddressForm, setHoursAddressForm] = useState(0)

  const onDecrease = () => {
    if (luggage === 0) {
      return
    }
    setLuggage((luggage) => luggage - 1)
  }
  const onIncrease = () => {
    setLuggage((luggage) => luggage + 1)
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
      style={{ marginBottom: "4px", marginTop: "4px" }}
    >
      <Grid item>
        <Grid container direction="row" alignItems="center">
          <LuggageIcon />

          <Typography
            style={{ color: "white", fontSize: "14px", marginTop: "4px" }}
          >
            Luggage Count
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
              className="passenger"
              onChange={(e) => {
                setLuggage(e.target.value)
              }}
              value={luggage}
              size="1"
              style={{
                // pointerEvents: "none",
                minWidth: "30px",
                maxWidth: "30px",
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
              type="number"
            />
          </Grid>
          <Grid item>
            <span
              onClick={onIncrease}
              style={{ marginLeft: "4px", marginRight: "7px" }}
            >
              <PlusIcon />
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Luggage
