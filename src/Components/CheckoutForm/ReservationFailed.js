import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

const ReservationFailed = ({ setActiveStep, failMessage }) => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      style={{ height: '80vh', backgroundColor: 'black' }}
    >
      <Grid item>
        <Typography
          style={{
            textAlign: 'center',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '30px',
            color: 'white',
          }}
        >
          {failMessage}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color='primary'
          variant='contained'
          onClick={() => setActiveStep(3)}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    failMessage: state.companyProfile.failMessage,
  }
}

export default connect(mapStateToProps)(ReservationFailed)
