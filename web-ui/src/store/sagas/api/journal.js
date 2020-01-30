import Axios from './axios-instance'

const fetchJournal = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { size, page, ledger, start_date, end_date } = payload

    const { data } = await Axios({
      method: 'get',
      url: '/journal',
      params: {
        size,
        page,
        ledger,
        start_date,
        end_date,
      },
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}
export default { fetchJournal }
