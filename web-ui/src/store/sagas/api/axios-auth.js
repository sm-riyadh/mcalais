import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${window.location.hostname}/api`,
  // baseURL: `http://api.${window.location.hostname}`,
})

export default instance
