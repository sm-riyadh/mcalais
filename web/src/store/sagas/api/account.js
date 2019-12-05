const URL = `http://localhost:8080/account/`

const fetchAccount = async () => {
  const response = await fetch(`${URL}`)
  const data = await response.json()
  if (response.status >= 400) {
    throw new Error(data.errors)
  }
  return data
}
const addAccount = async payload => {
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

export default { fetchAccount, addAccount }
