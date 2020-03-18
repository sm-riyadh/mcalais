import Axios from './axios-instance'

const fetchTree = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company } = payload

    const { data } = await Axios({
      method : 'get',
      url    : '/tree',
      params : {
        company,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}
const sendTree = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company, tree } = payload

    const { data } = await Axios({
      method : 'post',
      url    : '/tree',
      data   : {
        company,
        tree,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}

export default { fetchTree, sendTree }
