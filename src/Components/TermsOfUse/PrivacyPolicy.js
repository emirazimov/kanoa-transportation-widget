import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { termsApi } from "../../api/api"
import { Typography } from "@material-ui/core"

export default function PrivacyPolicy() {
  const [open, setOpen] = React.useState(false)
  const [privacyPolicy, setPrivacyPolicy] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    let componentMounted = true
    const fetchPrivacyPolicy = async () => {
      const data = await termsApi.getPrivacyPolicy()
      if (componentMounted) {
        setPrivacyPolicy(data)
      }
      fetchPrivacyPolicy()
    }
    return () => {
      componentMounted = false
    }
  }, [])

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <>
      <Button
        onClick={handleClickOpen}
        disableRipple
        style={{
          height: "50px",
          textTransform: "none",
          padding: 0,
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        Privacy Policy
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{ height: "55px", backgroundColor: "black" }}
        >
          <Typography variant="h6" color="textPrimary" paragraph={true}>
            Privacy Policy
          </Typography>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "black" }}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ backgroundColor: "black" }}
          >
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Privacy Policy of Bookinglane
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              Bookinglane collects some Personal Data from its Users.
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Personal Data collected for the following purposes and using the
              following services:
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Analytics
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "7px" }}>&#9679;</span>Google
              Analytics
              <br />
              <span style={{ marginRight: "7px" }}>&#9679;</span>Personal Data:
              Tracker; Usage Data
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Beta Testing
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "7px" }}>&#9679;</span>App Center
              <br />
              <span style={{ marginRight: "7px" }}>&#9679;</span>Personal Data:
              Data communicated while using the service; email address; various
              types of Data as specified in the privacy policy of the service
              <br />
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Displaying content from external platforms
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "7px" }}>&#9679;</span>Google Maps
              widget and Instagram widget
              <br />
              <span style={{ marginRight: "7px" }}>&#9679;</span>Personal Data:
              Tracker; Usage Data
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Handling payments
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "7px" }}>&#9679;</span>Stripe
              <br />
              Personal Data: billing address; email address; first name; last
              name; purchase history; various types of Data as specified in the
              privacy policy of the service Apple Pay Personal Data: billing
              address; email address; first name; last name; payment info; phone
              number; purchase history; various types of Data as specified in
              the privacy policy of the service
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Payments processed via the Google Play Store
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              Personal Data: billing address; email address; first name; last
              name; payment info; phone number; purchase history
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Hosting and backend infrastructure
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              Amazon Web Services (AWS) Personal Data: various types of Data as
              specified in the privacy policy of the service
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Interaction with external social networks and platforms
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "7px" }}>&#9679;</span>LinkedIn button
              and social widgets and Twitter Tweet button and social widgets
              Personal Data: Tracker; Usage Data <br />
              <span style={{ marginRight: "7px" }}>&#9679;</span>Buffer button
              and social widgets Personal Data:Usage Data
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Interaction with live chat platforms
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "7px" }}>&#9679;</span>ClickDesk
              Widget <br />
              Personal Data: Data communicated while using the service; Tracker;
              Usage Data
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Platform services and hosting
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "7px" }}>&#9679;</span>Apple App Store
              and Google Play Store <br />
              Personal Data: Usage Data
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Contact information
            </Typography>
            <Typography
              color="textPrimary"
              paragraph={true}
              style={{ fontSize: "14px" }}
            >
              <span style={{ marginRight: "7px" }}>&#9679;</span>Owner and Data
              Controller <br />
              Bookinglane LLC 1905 Concord Blvd, Concord, 94520, CA, USA
            </Typography>
            <Typography variant="h6" color="textPrimary" paragraph={true}>
              Owner contact email: info@bookinglane.com
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
