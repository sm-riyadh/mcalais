const URL = `http://localhost:8080/ledger/`

const fetchLedger = async () => {
  const res = await fetch(`${URL}`)
  const data = await res.json()
  if (res.status >= 400) {
    throw new Error(data.errors)
  }
  return data
}

export default { fetchLedger }
