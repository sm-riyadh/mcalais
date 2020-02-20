import Axios from './axios-instance'

const fetchJournal = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company, size, page, coa, start_date, end_date } = payload

    const { data } = await Axios({
      method: 'get',
      url: '/journal',
      params: {
        company,
        size,
        page,
        coa,
        start_date,
        end_date,
      },
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}
const sendJournal = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company, credit, debit, description, amount, comment } = payload

    const { data } = await Axios({
      method: 'post',
      url: '/journal',
      data: {
        company,
        credit,
        debit,
        description,
        amount,
        comment,
      },
    })

    return data
  } catch (err) {
    return { ERROR: err }
  }
}
export default { fetchJournal, sendJournal }
