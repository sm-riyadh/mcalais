import Account from '../models/account'

// CODE: Fetch

const fetch = async ({ company, nonempty } = {}) => {
  let account

  if (nonempty) account = await Account.fetch(company)
  else account = await Account.fetchNonEmpty(company)

  const { balance } = await Company.fetchOne(company)

  const sortedAccount = { balance, ...accountSorter(account) }

  return sortedAccount
}

const fetchDetail = async ({ id }) => {
  const account = await Account.fetchOne(id)

  return account
}

//  CODE: Create

const create = async ({ company, type, name, path, intercompany } = {}) => {
  //  Generate Account Code
  const { accountCount } = await Company.fetchOne(company)
  const code = codeGen(type, accountCount[type])

  const newAccount = await Account.create({ company, type, name, code, path, intercompany })

  // Increase Account Count
  await Company.updateAccountCount(company, type)

  return newAccount
}

// CODE: Modify

const modify = async ({ id, name, path, intercompany } = {}) => {
  const modifiedAccount = await Account.modify({ id, name, path, intercompany })

  return modifiedAccount
}

// CODE: State

const activate = async ({ id }) => {
  const activatedAccount = await Account.enable(id)

  return activatedAccount
}

const deactivate = async ({ id }) => {
  const deactivatedAccount = await Account.disable(id)

  return deactivatedAccount
}

// CODE: Remove

const remove = async id => {
  if (!await Account.fetchNonEmpty(id)) {
    const removedAccount = await removedAccount.remove(id)

    return removedAccount
  } else {
    state(id, 'deactivate')
  }
}

/* -------------------------------- Utilities ------------------------------- */

const codeGen = (name, count = 0) => {
  switch (name) {
    case 'assets':
      return 100000 + count + 1
    case 'liabilities':
      return 200000 + count + 1
    case 'equities':
      return 300000 + count + 1
    case 'expenses':
      return 400000 + count + 1
    case 'incomes':
      return 500000 + count + 1
  }
}
const accountSorter = () => {
  const sortedAccount = {
    assets      : [],
    liabilities : [],
    equities    : [],
    expenses    : [],
    incomes     : [],
  }
  sortedAccount.assets = account.filter(({ code }) => code > 100000 && code < 200000)
  sortedAccount.liabilities = account.filter(({ code }) => code > 200000 && code < 300000)
  sortedAccount.equities = account.filter(({ code }) => code > 300000 && code < 400000)
  sortedAccount.expenses = account.filter(({ code }) => code > 400000 && code < 500000)
  sortedAccount.incomes = account.filter(({ code }) => code > 500000 && code < 600000)

  return sortedAccount
}

export { fetch, fetchDetail, create, modify, activate, deactivate, remove }
