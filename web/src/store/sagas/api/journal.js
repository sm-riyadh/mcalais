const URL = `http://localhost:8080/journal`

const fetchJournal = async payload => {
  payload = payload[0]

  const res = await fetch(
    `${URL}?size=50${
      payload && payload.start_date ? `&startDate=${payload.start_date}` : ''
    }${payload && payload.end_date ? `&endDate=${payload.end_date}` : ''}`
  )

  const data = await res.json()
  if (res.status >= 400) {
    throw new Error(data.errors)
  }
  return data
}
const createJournal = async payload => {
  const res = await fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload[0]),
  })
  const data = await res.json()
  if (res.status >= 400) {
    throw new Error(data.errors)
  }
  return data
}

export default { fetchJournal, createJournal }
