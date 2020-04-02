import Axios from './axios-instance'

const fetchAccount = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company } = payload

    const { data } = await Axios({
      method : 'get',
      url    : '/account',
      params : {
        company,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}
const fetchAccountList = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company } = payload

    const { data } = await Axios({
      method : 'get',
      url    : '/account/list',
      params : {
        company,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}
const sendAccount = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company, name, path, type } = payload

    const { data } = await Axios({
      method : 'post',
      url    : '/account',
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
const removeAccount = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company, code } = payload

    const { data } = await Axios({
      method : 'delete',
      url    : '/account',
      data   : {
        company,
        code,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}

export default { fetchAccount, fetchAccountList, sendAccount, removeAccount }
