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
  const creditAccount = await Account.fetchOne(credit)
  const debitAccount = await Account.fetchOne(debit)

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
  const creditType = creditAccount.type
  const debitType = debitAccount.type

  // CAVEAT: Adds journal entry in account collection
  await Account.addJournal(credit, id)
  await Account.addJournal(debit, id)

  // NOTE: Adjusts balance according to transaction type

  // CAVEAT: Liabilities, Equities, Incomes --> Asset, Expenses
  if (
    (assets(debitType) && liabilities(creditType)) ||
    (assets(debitType) && incomes(creditType)) ||
    (assets(debitType) && equities(creditType)) ||
    (expenses(debitType) && liabilities(creditType))
  ) {
    await Account.modifyBalance(company, amount)
    await Account.modifyBalance(company, amount)

    await Company.modifyBalance(company, creditType, +amount)
    await Company.modifyBalance(company, debitType, +amount)

    // CAVEAT: Asset, Expenses --> Liabilities, Equities, Incomes
  } else if ((liabilities(debitType) && assets(creditType)) || (equities(debitType) && assets(creditType))) {
    await Account.modifyBalance(company, -amount)
    await Account.modifyBalance(company, -amount)

    await Company.modifyBalance(company, creditType, -amount)
    await Company.modifyBalance(company, debitType, -amount)

    // CAVEAT: Transaction between same type of account
  } else if (
    (assets(debitType) && assets(creditType)) ||
    (expenses(debitType) && assets(creditType)) ||
    (assets(debitType) && expenses(creditType)) ||
    (assets(debitType) && incomes(creditType)) ||
    (incomes(debitType) && assets(creditType))
  ) {
    await Account.modifyBalance(company, -amount)
    await Account.modifyBalance(company, +amount)

    await Company.modifyBalance(company, creditType, -amount)
    await Company.modifyBalance(company, debitType, +amount)
  }

  // NOTE: Checks for inter company capability
  // const interCompanyAccount = await Account.isInterCompany(debitAccount.id)

  // if (interCompanyAccount) {
  //   const { to_company, deposit, due } = interCompanyAccount.intercompany

  //   interCompanyJournalCreator({
  //     date,
  //     company,
  //     to_company,
  //     deposit,
  //     due,
  //     amount,
  //     credit     : creditAccount,
  //     debit      : debitAccount,
  //   })
  // }

  return newJournal
}

// CODE: Modify

const modify = async ({ id, date, credit_note, debit_note, description, comment } = {}) => {
  await Journal.modify(id, {
    date,
    credit_note,
    debit_note,
    description,
    comment,
  })

  const modifiedJournal = await Journal.fetchOne(id)

  return modifiedJournal
}

const activate = async ({ id }) => {
  await Journal.enable(id)
}

const deactivate = async ({ id }) => {
  await Journal.disable(id)
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
  const creditAccount = await Account.fetch(credit)
  const debitAccount = await Account.fetch(debit)

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

  await Account.addJournal(credi, id)
  await Account.addJournal(debit, id)
}

const assets = type => type === 'assets'
const liabilities = type => type === 'liabilities'
const equities = type => type === 'equities'
const expenses = type => type === 'expenses'
const incomes = type => type === 'incomes'

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
