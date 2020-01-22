const URL = `http://192.168.0.100/api/account/`

const fetchCatagory = async () => {
  const response = await fetch('http://192.168.0.100/api/catagory/')
  const data = await response.json()

  if (response.status >= 400) {
    throw new Error(data.errors)
  }
  return data
}

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
const changeAccount = async payload => {
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

export default { fetchCatagory, fetchAccount, addAccount, changeAccount }
