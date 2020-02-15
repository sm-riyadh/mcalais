import Axios from './axios-instance'

const fetchCoa = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { site } = payload

    const { data } = await Axios({
      method: 'get',
      url: '/coa',
      params: {
        site,
      },
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}
const fetchCoaList = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { site } = payload

    const { data } = await Axios({
      method: 'get',
      url: '/coa/list',
      params: {
        site,
      },
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}
const sendCoa = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { site, name, type } = payload

    const { data } = await Axios({
      method: 'post',
      url: '/coa',
      data: {
        site,
        name,
        type,
      },
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}

export default { fetchCoa, fetchCoaList, sendCoa }
