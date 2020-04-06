import Account from '../models/account'
import Company from '../models/company'
import Tree from '../models/tree'
import accountOps from './account'

// CODE: Fetch
const fetch = async () => {
  const company = await Company.fetch()

  return company
}

const fetchDetails = async ({ id }) => {
  const company = await Company.fetchOne(id)

  return company
}

// CODE: Create

const create = async ({ name }) => {
  const newCompany = await Company.create({ name })

  name = newCompany.name
  // Creates Pre-made Accounts

  await accountOps.create({ company: name, type: 'assets', name: 'Cash', path: [ 'assets' ] })
  await Tree.update(name, {
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
  const modifiedCompany = await Company.modify(id, { name })

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

  if ((await Account.fetchNonEmpty(name)).length === 0) {
    const removedCompany = await Company.remove(id)

    return removedCompany
  } else {
    const deactivatedCompany = await deactivate({ id })

    return deactivatedCompany
  }
}

/* -------------------------------- Utilities ------------------------------- */

const interCompanyDueAccounts = async name => {
  let companies = await Company.find()
  companies = companies.filter(e => e.name != name)

  // HACK: Map is not waiting for await
  // let newTree = (await Tree.fetchOne(newCompany.name)).tree

  for (let i = 0; i < companies.length; i++) {
    // let { tree } = await Tree.fetchOne(companies[i].name)

    const remoteDue = await accountOps.create({
      company : name,
      type    : 'liabilities',
      name    : companies[i].name,
      path    : [ 'liabilities', 'due from' ],
    })
    // newTree = treeAccountInserter(newTree, 'liabilities', 'Due From', companies[i].name)

    await accountOps.create({
      company      : companies[i].name,
      type         : 'assets',
      name         : name,
      path         : [ 'assets', 'due to' ],
      intercompany : {
        to_company : name,
        deposit    : 100001,
        due        : remoteDue.code,
      },
    })
    // tree = treeAccountInserter(tree, 'assets', 'Due To', name)

    const localDue = await accountOps.create({
      company : companies[i].name,
      type    : 'liabilities',
      name    : name,
      path    : [ 'liabilities', 'due from' ],
    })
    // tree = treeAccountInserter(tree, 'liabilities', 'Due From', name)

    await accountOps.create({
      company      : name,
      type         : 'assets',
      name         : companies[i].name,
      path         : [ 'assets', 'due to' ],
      intercompany : {
        to_company : companies[i].name,
        deposit    : 100001,
        due        : localDue.code,
      },
    })

    // newTree = treeAccountInserter(newTree, 'assets', 'Due To', companies[i].name)

    // await Tree.update(companies[i].name, tree)
  }
}

/*
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
 */

export default { fetch, fetchDetails, create, modify, activate, deactivate, remove }
