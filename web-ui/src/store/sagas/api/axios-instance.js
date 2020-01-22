import Axios from 'axios'
import Cookie from 'js-cookie'

const instance = Axios.create({
  baseURL: `http://${window.location.hostname}/api`,
  // baseURL: `http://api.${window.location.hostname}`,
  headers: {
    'x-auth': Cookie.get('x-auth')
  }
})

export default instance
