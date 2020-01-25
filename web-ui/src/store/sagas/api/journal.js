import Axios from './axios-instance'

const fetchJournalInit = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { size, start_date, end_date } = payload
    const res = await Axios({
      method: 'get',
      url: '/journal',
      params: {
        size,
        start_date,
        end_date,
      },
    })

    const data = await res.data
    if (res.status >= 400) {
      throw new Error(data.errors)
    }
    return data
  } catch (err) {
    return { ERROR: err }
  }
}
const fetchJournalMore = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { size, page } = payload
    const res = await Axios({
      method: 'get',
      url: '/journal/more',
      params: {
        size,
        page,
      },
    })

    const data = await res.data
    if (res.status >= 400) {
      throw new Error(data.errors)
    }
    return data
  } catch (err) {
    return { ERROR: err }
  }
}
const fetchJournalOfAccount = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { account, size, start_date, end_date } = payload
    const res = await Axios({
      method: 'get',
      url: '/journal/account',
      params: {
        account,
        size,
        start_date,
        end_date,
      },
    })

    const data = await res.data
    if (res.status >= 400) {
      throw new Error(data.errors)
    }
    return data
  } catch (err) {
    return { ERROR: err }
  }
}

export default { fetchJournalInit, fetchJournalMore, fetchJournalOfAccount }
