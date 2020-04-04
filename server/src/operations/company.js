import Company from '../models/company'
import Tree from '../models/tree'

// CODE: Fetch
const fetch = async ({}) => {
  const company = await Company.fetch()

  return company
}

const fetchDetail = async ({ id }) => {
  const company = await Company.fetchOne(id)

  return company
}

// CODE: Create

const create = async ({ name }) => {
  const newCompany = await Company.create({ name })

  // Creates Pre-made Accounts

  await newAccountCreator(newCompany.name, 'assets', 'Cash', [ 'assets' ])
  await Tree.update(newCompany.name, {
    assets      : [
      {
        type     : 'account',
        path     : [ 'assets' ],
        location : [ 0 ],
        name     : 'Cash',
        children : [],
      },
      {
        type     : 'folder',
        path     : [ 'assets' ],
        location : [ 1 ],
        name     : 'Bank',
        children : [],
      },
      {
        type     : 'folder',
        path     : [ 'assets' ],
        location : [ 2 ],
        name     : 'Due To',
        children : [],
      },
    ],
    liabilities : [
      {
        type     : 'folder',
        path     : [ 'liabilities' ],
        location : [ 0 ],
        name     : 'Due From',
        children : [],
      },
    ],
    equities    : [],
    expenses    : [],
    incomes     : [],
  })
  await interCompanyDueAccounts(name)

  return newCompany
}

// CODE: Modify

const modify = async ({ id, name }) => {
  const modifiedCompany = await Company.modify(id, name)

  return modifiedCompany
}

const activate = async ({ id }) => {
  const activatedCompany = await Company.enable(id)

  return activatedCompany
}

const deactivate = async ({ id }) => {
  const deactivatedCompany = await Company.disable(id)

  return deactivatedCompany
}

// CODE: Remove

const remove = async ({ id }) => {
  const { name } = Company.fetchOne(id)

  if ((await Account.fetchNonEmpty(name).length) === 0) {
    const removedAccount = await removedAccount.remove(id)

    return removedAccount
  } else deactivate({ id })
}

/* -------------------------------- Utilities ------------------------------- */

// Patch new
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
const newAccountCreator = async (company, type, name, path, intercompany) => {
  const { accountCount } = await Company.fetchOne(company)
  const code = codeGen(type, accountCount[type])

  const account = await Account.create({
    company,
    type,
    name,
    path,
    code,
    transaction  : [],
    intercompany,
  })
  await Company.updateAccountCount(company, type)

  return account
}
const treeAccountInserter = (tree, accountType, accountName, name) => {
  tree = { ...tree }
  let selectedBranch = tree[accountType]

  selectedBranch = selectedBranch.filter(e => e.name === accountName)[0]

  selectedBranch.children = [
    ...selectedBranch.children,
    {
      type     : 'account',
      path     : [ accountType, selectedBranch.name.toLowerCase() ],
      location : [ selectedBranch.location, selectedBranch.children.length ],
      name,
      children : [],
    },
  ]

  return tree
}
const interCompanyDueAccounts = async newCompanyName => {
  let companies = await Company.find()
  companies = companies.filter(e => e.name != newCompanyName)

  // HACK: Map is not waiting for await
  let newTree = (await Tree.fetchOne(newCompany.name)).tree

  for (let i = 0; i < companies.length; i++) {
    let { tree } = await Tree.fetchOne(companies[i].name)

    const remoteDue = await newAccountCreator(newCompany.name, 'liabilities', companies[i].name, [
      'liabilities',
      'due from',
    ])
    newTree = treeAccountInserter(newTree, 'liabilities', 'Due From', companies[i].name)

    await newAccountCreator(companies[i].name, 'assets', newCompany.name, [ 'assets', 'due to' ], {
      to_company : newCompany.name,
      deposit    : 100001,
      due        : remoteDue.code,
    })
    tree = treeAccountInserter(tree, 'assets', 'Due To', newCompany.name)

    const localDue = await newAccountCreator(companies[i].name, 'liabilities', newCompany.name, [
      'liabilities',
      'due from',
    ])
    tree = treeAccountInserter(tree, 'liabilities', 'Due From', newCompany.name)

    await newAccountCreator(newCompany.name, 'assets', companies[i].name, [ 'assets', 'due to' ], {
      to_company : companies[i].name,
      deposit    : 100001,
      due        : localDue.code,
    })
    newTree = treeAccountInserter(newTree, 'assets', 'Due To', companies[i].name)

    await Tree.update(companies[i].name, tree)
  }
}

export { fetch, fetchDetail, create, modify, activate, deactivate, remove }
