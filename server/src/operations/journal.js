import { subDays, startOfDay, endOfDay } from 'date-fns'

import Journal from '../models/journal'
import Account from '../models/account'
import Company from '../models/company'

// CODE: Fetch

const fetch = async ({ company, size, page, type = 'journal', start_date, end_date } = {}) => {
  const startDate = start_date && startOfDay(new Date(start_date))
  const endDate = end_date && endOfDay(new Date(end_date))

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

  const journal = await Journal.fetch(company, { size, page, lowerRangeCode, higherRangeCode, startDate, endDate })

  return journal
}

const fetchDetails = async ({ id }) => {
  const journal = await Journal.fetchOne(id)

  return journal
}

// CODE: Create

const create = async ({ date, company, credit, credit_note, debit, debit_note, description, amount, comment } = {}) => {
  const debitAccount = (await Account.fetch(company, { code: debit }))[0]
  const creditAccount = (await Account.fetch(company, { code: credit }))[0]

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

  // await Account.addJournal(company, id, { credit: creditAccount.code, debit: debitAccount.code, amount )

  // CAVEAT: Adds journal entry in account collection
  await Account.addJournal(company, creditAccount.code, id)
  await Account.addJournal(company, debitAccount.code, id)

  // CAVEAT: Adjusts balance according to transaction type
  if (
    (assets(debit) && liabilities(credit)) ||
    (assets(debit) && incomes(credit)) ||
    (assets(debit) && equities(credit)) ||
    (expenses(debit) && liabilities(credit))
  ) {
    await Account.modifyBalance(company, credit, amount)
    await Account.modifyBalance(company, debit, amount)

    await Company.modifyBalance(company, typeFinder(credit), +amount)
    await Company.modifyBalance(company, typeFinder(debit), +amount)
  } else if ((liabilities(debit) && assets(credit)) || (equities(debit) && assets(credit))) {
    await Account.modifyBalance(company, credit, -amount)
    await Account.modifyBalance(company, debit, -amount)

    await Company.modifyBalance(company, typeFinder(credit), -amount)
    await Company.modifyBalance(company, typeFinder(debit), -amount)
  } else if (
    (assets(debit) && assets(credit)) ||
    (expenses(debit) && assets(credit)) ||
    (assets(debit) && expenses(credit)) ||
    (assets(debit) && incomes(credit)) ||
    (incomes(debit) && assets(credit))
  ) {
    await Account.modifyBalance(company, credit, -amount)
    await Account.modifyBalance(company, debit, +amount)

    await Company.modifyBalance(company, typeFinder(credit), -amount)
    await Company.modifyBalance(company, typeFinder(debit), +amount)
  }

  // CAVEAT: Checks for inter company capability
  const interCompanyAccount = await Account.isInterCompany(debitAccount.id)

  if (interCompanyAccount) {
    const { to_company, deposit, due } = interCompanyAccount.intercompany

    interCompanyJournalCreator({
      date,
      company,
      to_company,
      deposit,
      due,
      amount,
      credit     : creditAccount,
      debit      : debitAccount,
    })
  }

  return newJournal
}

// CODE: Modify

const modify = async ({ id, date, credit_note, debit_note, description, comment } = {}) => {
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

const interCompanyJournalCreator = async ({
  date,
  company,
  debit = deposit,
  credit = due,
  amount,
  dueAccountCredit,
  dueAccountDebit,
}) => {
  const creditAccount = (await Account.fetch(company, { code: credit }))[0]
  const debitAccount = (await Account.fetch(company, { code: debit }))[0]

  const { id } = await Journal.create({
    date,
    company,
    creditAccount,
    // credit_note   : '',
    debitAccount,
    // debit_note    : '',
    description   : `From: ${dueAccountCredit.name}, to: ${dueAccountDebit.name}`,
    amount,
    // comment,
  })

  await Account.addJournal(company, creditAccount.code, id)
  await Account.addJournal(company, debitAccount.code, id)
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

export default { fetch, fetchDetails, create, modify, activate, deactivate }
