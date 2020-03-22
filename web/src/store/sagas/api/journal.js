import Axios from './axios-instance'

const fetchJournal = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { company, size, page, coa, type, start_date, end_date } = payload

    const { data } = await Axios({
      method : 'get',
      url    : '/journal',
      params : {
        company,
        type,
        size,
        page,
        coa,
        start_date,
        end_date,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}
const sendJournal = async payload => {
  try {
    if (payload[0]) payload = payload[0]

    const { date, company, credit, credit_note, debit, debit_note, description, amount, comment } = payload

    const { data } = await Axios({
      method : 'post',
      url    : '/journal',
      data   : {
        date,
        company,
        credit,
        credit_note,
        debit,
        debit_note,
        description,
        amount,
        comment,
      },
    })

    return { data }
  } catch (err) {
    return { error: err }
  }
}
export default { fetchJournal, sendJournal }
