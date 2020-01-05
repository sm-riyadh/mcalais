const URL = `http://localhost:8080/ledger`

const fetchLedger = async payload => {
  const startDate = payload[0].start_date
  const endDate = payload[0].end_date

  const res = await fetch(`${URL}?startDate=${startDate}&endDate=${endDate}`)
  const data = await res.json()
  if (res.status >= 400) {
    throw new Error(data.errors)
  }
  return data
}

export default { fetchLedger }
