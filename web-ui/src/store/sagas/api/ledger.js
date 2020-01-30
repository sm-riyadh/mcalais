import Axios from './axios-instance'

const fetchLedgerList = async () => {
  try {
    const { data } = await Axios({
      method: 'get',
      url: '/account/list',
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}

export default { fetchLedgerList }
