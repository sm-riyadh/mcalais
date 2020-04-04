import { startOfDay, endOfDay } from 'date-fns'

// CODE: Fetch

const fetch = async ({ company, size, page, type = 'journal', start_date, end_date } = {}) => {
  startDate = startOfDay(new Date(startDate))
  endDate = endOfDay(new Date(endDate))

  let lowerRangeCode, higherRangeCode

  switch (type) {
    case 'journal': {
      lowerRangeCode = 100000
      higherRangeCode = 500000
      break
    }
    case 'liabilities': {
      lowerRangeCode = 200000
      higherRangeCode = 300000
      break
    }
    case 'equities': {
      lowerRangeCode = 300000
      higherRangeCode = 400000
      break
    }
    case 'expenses': {
      lowerRangeCode = 400000
      higherRangeCode = 500000
      break
    }
    case 'incomes': {
      lowerRangeCode = 500000
      higherRangeCode = 600000
      break
    }
    default: {
      lowerRangeCode = 100000
      higherRangeCode = 500000
    }
  }

  const journal = await Journal.fetch(company, { size, page, lowerRangeCode, higherRangeCode, start_date, end_date })

  return journal
}

const fetchDetail = async ({ id }) => {
  const journal = await Journal.fetchOne(id)

  return journal
}

// CODE: Create

const create = async ({ date, company, credit, credit_note, debit, debit_note, description, amount, comment } = {}) => {
  const debitAccount = await Account.fetchOneByCode(debit)
  const creditAccount = await Account.fetchOneByCode(credit)

  const newJournal = await Journal.create({
    date,
    company,
    creditAccount,
    credit_note,
    debitAccount,
    debit_note,
    description,
    amount,
    comment,
  })
  const { id } = newJournal

  await Account.addJournal(company, id, { credit: creditAccount.code, debit: debitAccount.code, amount })

  // CAVEAT: Adds journal entry in account collection
  await Account.findOneAndUpdate(
    { company, code: creditAccount.code },
    {
      $push : {
        transaction : { journal_id: id },
      },
    }
  )
  await Account.update(
    { company, code: debitAccount.code },
    {
      $push : {
        transaction : { journal_id: id },
      },
    }
  )

  // CAVEAT: Adjusts balance according to transaction type
  if (
    (assets(debit) && liabilities(credit)) ||
    (assets(debit) && incomes(credit)) ||
    (assets(debit) && equities(credit)) ||
    (expenses(debit) && liabilities(credit))
  ) {
    await Account.findOneAndUpdate({ company, code: credit }, { $inc: { balance: amount } })
    await Account.findOneAndUpdate({ company, code: debit }, { $inc: { balance: amount } })

    await Company.updateAccountBalance(company, typeFinder(credit), +amount)
    await Company.updateAccountBalance(company, typeFinder(debit), +amount)
  } else if ((liabilities(debit) && assets(credit)) || (equities(debit) && assets(credit))) {
    await Account.findOneAndUpdate({ company, code: credit }, { $inc: { balance: -amount } })
    await Account.findOneAndUpdate({ company, code: debit }, { $inc: { balance: -amount } })

    await Company.updateAccountBalance(company, typeFinder(credit), -amount)
    await Company.updateAccountBalance(company, typeFinder(debit), -amount)
  } else if (
    (assets(debit) && assets(credit)) ||
    (expenses(debit) && assets(credit)) ||
    (assets(debit) && expenses(credit)) ||
    (assets(debit) && incomes(credit)) ||
    (incomes(debit) && assets(credit))
  ) {
    await Account.findOneAndUpdate({ company, code: credit }, { $inc: { balance: -amount } })
    await Account.findOneAndUpdate({ company, code: debit }, { $inc: { balance: +amount } })

    await Company.updateAccountBalance(company, typeFinder(credit), -amount)
    await Company.updateAccountBalance(company, typeFinder(debit), +amount)
  }

  // CAVEAT: Checks for inter company capability
  const interCompanyAccount = await Account.isInterCompany(debitAccount.id)

  if (interCompanyAccount) {
    const { to_company, deposit, due } = interCompanyAccount.intercompany

    interCompanyJournalCreator(to_company, deposit, due, payload)
  }

  return newJournal
}

// CODE: Modify

const modify = async (id, { date, credit_note, debit_note, description, comment } = {}) => {
  const modifiedJournal = await Journal.modify(id, {
    date,
    credit_note,
    debit_note,
    description,
    comment,
  })

  return modifiedJournal
}

const activate = async ({ id }) => {
  const activatedJournal = await Journal.enable(id)

  return activatedJournal
}

const deactivate = async ({ id }) => {
  const deactivatedJournal = await Journal.disable(id)

  return deactivatedJournal
}

/* -------------------------------- UTILITIES ------------------------------- */

const interCompanyJournalCreator = async (company, deposit, due, account) => {
  const { _id, credit, debit, amount } = await Journal({
    company,
    credit      : {
      name : `${due}`,
      code : due,
    },
    debit       : {
      name : `${deposit}`,
      code : deposit,
    },
    description : `From: ${account.credit.name}, to: ${account.debit.name}`,
    amount      : account.amount,
    comment     : '...',
  }).save()

  await Account.addJournal(company, _id, credit.code, debit.code, amount)
}

const assets = type => type > 100000 && type < 200000
const liabilities = type => type > 200000 && type < 300000
const equities = type => type > 300000 && type < 400000
const expenses = type => type > 400000 && type < 500000
const incomes = type => type > 500000 && type < 600000

const typeFinder = code => {
  switch (+('' + code)[0]) {
    case 1:
      return 'assets'
    case 2:
      return 'liabilities'
    case 3:
      return 'equities'
    case 4:
      return 'expenses'
    case 5:
      return 'incomes'
  }
}

export { fetch, fetchDetail, create, modify, activate, deactivate }
