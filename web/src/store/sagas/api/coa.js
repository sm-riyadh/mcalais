import Axios from './axios-instance'

const fetchCoa = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company } = payload

    const { data } = await Axios({
      method : 'get',
      url    : '/coa',
      params : {
        company,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}
const fetchCoaList = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company } = payload

    const { data } = await Axios({
      method : 'get',
      url    : '/coa/list',
      params : {
        company,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}
const sendCoa = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company, name, path, type } = payload

    const { data } = await Axios({
      method : 'post',
      url    : '/coa',
      data   : {
        company,
        name,
        type,
        path,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}

export default { fetchCoa, fetchCoaList, sendCoa }
