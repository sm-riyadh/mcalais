const daySub = day => 25 * 60 * 60 * 1000 * day
const trim = (data, start = 0, end = 50) => {
  const trimmed = []

  for (let i = start; i < end; i++) trimmed.push(data[i])

  return trimmed
}

export default { daySub, trim }
