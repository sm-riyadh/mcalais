const fetch = async ({ company, size, page, type, start_date, end_date }) => {
  const journal = await Journal.fetch(company, type, size, page, start_date, end_date)

  return journal
}
const create = async ({ date, company, credit, credit_note, debit, debit_note, description, amount, comment }) => {
  const newJournal = await Journal.create({
    date,
    company,
    credit,
    credit_note,
    debit,
    debit_note,
    description,
    amount,
    comment,
  })

  return newJournal
}
const modify = async ({ id, date, credit_note, debit_note, description, comment }) => {
  const modifiedJournal = await Journal.modify(id, {
    date,
    credit_note,
    debit_note,
    description,
    comment,
  })

  return modifiedJournal
}
const remove = async ({ id }) => {
  const disabledJournal = await Journal.disable(id)

  return disabledJournal
}

export { fetch, create, modify, remove }
