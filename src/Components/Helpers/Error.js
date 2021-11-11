// import { CircularProgress } from "@material-ui/core"
import React from "react"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { ErrorIcon } from "../../assets/icons"
import { Grid, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import { setError } from "../../Redux/car-reducer"
import { setGotAddressError } from "../../Redux/company-profile-reducer"

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#4F4F4F",
    },
  },
})
const Error = ({ error, setActiveStep, setError, setGotAddressError }) => {
  return (
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        // height: "100%",
        display: "flex",
        flexDirection: "row ",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        paddingTop: "40%",
        paddingRight: "20px",
        paddingLeft: "20px",
      }}
    >
      <MuiThemeProvider theme={theme}>
        {/* <CircularProgress color="secondary" /> */}
        <Grid container direction="column" alignItems="center">
          <ErrorIcon />
          <Typography
            style={{ fontWeight: "700", fontSize: "19px", marginTop: "15px" }}
          >
            Oops!
          </Typography>
          <Typography
            style={{ textAlign: "center", marginTop: "15px", color: "#BCBCBC" }}
          >
            {error}
          </Typography>
          <Button
            // color="primary"
            variant="contained"
            onClick={() => {
              setActiveStep(0)
              setError("")
              setGotAddressError(true)
            }}
            style={{ marginTop: "17px", background: "#c9c9c9" }}
          >
            Back
          </Button>
        </Grid>
      </MuiThemeProvider>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.cars.error,
  }
}

export default connect(mapStateToProps, { setGotAddressError, setError })(Error)
// export default Error

//#region styled-components

// const Container = styled.div`
//     margin: 0 auto;
//     width: 100%;
//     /* @media (max-width: 500px) {
//         width: 94%;
//     } */
// `;
