import Axios from 'axios'
// import Cookie from 'js-cookie'

const instance = Axios.create({
  baseURL: `http://${window.location.hostname}:8080/api`,
  // timeout: 1000,
  // headers: {
  //   'x-auth': Cookie.get('x-auth'),
  // },
})

export default instance
