import * as axios from "axios"

const jwtToken = localStorage.getItem("Authorization")

const axiosInstance = axios.create({
  baseURL: `https://api.bookinglane.com/api/`,
  headers: {
    Authorization: "Bearer " + jwtToken,
    "App-Version": "1.2.01",
  },
})

export const authApi = {
  getToken() {
    const company0Key = "bc5ebb93-db90-4341-a4de-169ad9f350d0"
    return axios
      .post(
        "https://api.bookinglane.com/api/companywidget/company-widget-auth",
        { accessKey: "bc5ebb93-db90-4341-a4de-169ad9f350d0" }
      )
      .then((response) => {
        return response
      })
  },

  getCompanyProfile() {
    const jwtToken = localStorage.getItem("Authorization")

    const headers = {
      Authorization: "Bearer " + jwtToken,
      "App-Version": "1.2.01",
    }

    return axiosInstance
      .get("companywidget/company-widget-info", { headers: headers })
      .then((response) => {
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response.status
        }
      })
  },
}

export const fleetApi = {
  getCarsByType(carType, pageSize) {
    return axiosInstance
      .get(`car/company-cars?typeId=${carType}&page=${pageSize}`)
      .then((response) => {
        return response.data
      })
  },

  getCompanyCars(dataForm) {
    const jwtToken = localStorage.getItem("Authorization")
    return axiosInstance
      .post(
        "car/companycars-withprice",
        { ...dataForm },
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
            "App-Version": "1.2.01",
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      })
  },
}

export const placesApi = {
  getStates() {
    return axiosInstance.get(`place/states`).then((response) => {
      return response.data
    })
  },

  getCities(id) {
    return axiosInstance.get(`place/cities/${id}`).then((response) => {
      return response.data
    })
  },

  getAirlines() {
    return axiosInstance.get(`place/airlines`).then((response) => {
      return response.data
    })
  },
}

export const formApi = {
  createReservation(form) {
    const jwtToken = localStorage.getItem("Authorization")
    return axiosInstance
      .post(
        `reservation/web`,
        { ...form },
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
            "App-Version": "1.2.01",
          },
        }
      )
      .then((response) => {
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      })
  },
}

export const termsApi = {
  getTermOfUse() {
    return axiosInstance.get(`home/term-of-use`).then((response) => {
      return response.data
    })
  },
  getPrivacyPolicy() {
    return axiosInstance.get(`home/privacy-policy`).then((response) => {
      return response.data
    })
  },
}
