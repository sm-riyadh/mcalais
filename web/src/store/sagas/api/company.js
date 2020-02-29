import Axios from './axios-instance'

const fetchCompany = async () => {
  try {
    const { data } = await Axios({
      method: 'get',
      url: '/company',
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}
const sendCompany = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { name } = payload

    const { data } = await Axios({
      method: 'post',
      url: '/company',
      data: {
        name,
      },
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}
export default { fetchCompany, sendCompany }
