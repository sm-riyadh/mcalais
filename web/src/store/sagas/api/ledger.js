const URL = `http://localhost:8080/ledger/`

const fetchLedger = async () => {
  const response = await fetch(`${URL}?size=50`)
  const data = await response.json()
  if (response.status >= 400) {
    throw new Error(data.errors)
  }
  return data
}

export default { fetchLedger }
