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

  const { id } = newCompany
  // Creates Pre-made Accounts

  const cashAccount = await accountOps.create({
    company : id,
    type    : 'assets',
    name    : 'Cash',
    path    : [ 'assets' ],
  })
  // await Tree.update(id, {
  //   assets      : [
  //     {
  //       type     : 'account',
  //       path     : [ 'assets' ],
  //       location : [ 0 ],
  //       name     : 'Cash',
  //       children : [],
  //     },
  //     {
  //       type     : 'folder',
  //       path     : [ 'assets' ],
  //       location : [ 1 ],
  //       name     : 'Bank',
  //       children : [],
  //     },
  //     {
  //       type     : 'folder',
  //       path     : [ 'assets' ],
  //       location : [ 2 ],
  //       name     : 'Due To',
  //       children : [],
  //     },
  //   ],
  //   liabilities : [
  //     {
  //       type     : 'folder',
  //       path     : [ 'liabilities' ],
  //       location : [ 0 ],
  //       name     : 'Due From',
  //       children : [],
  //     },
  //   ],
  //   equities    : [],
  //   expenses    : [],
  //   incomes     : [],
  // })

  await interCompanyDueAccounts(id, name, cashAccount.id)

  return newCompany
}

// CODE: Modify

const modify = async ({ id, name }) => {
  const modifiedCompany = await Company.modify(id, { name })

  return modifiedCompany
}

const activate = async ({ id }) => {
  await Company.enable(id)
}

const deactivate = async ({ id }) => {
  await Company.disable(id)
}

// CODE: Remove

const remove = async ({ id }) => {
  await Company.remove(id)
}

/* -------------------------------- Utilities ------------------------------- */

const interCompanyDueAccounts = async (id, name, cashAccountId) => {
  let companies = await Company.find()
  companies = companies.filter(e => e.id != id)

  // HACK: Map is not waiting for await
  // let newTree = (await Tree.fetchOne(newCompany.name)).tree

  for (let i = 0; i < companies.length; i++) {
    // let { tree } = await Tree.fetchOne(companies[i].name)

    const remoteDue = await accountOps.create({
      company : id,
      type    : 'liabilities',
      name    : companies[i].name,
      path    : [ 'liabilities', 'due from' ],
    })
    // newTree = treeAccountInserter(newTree, 'liabilities', 'Due From', companies[i].name)

    await accountOps.create({
      company      : companies[i].id,
      type         : 'assets',
      name         : name,
      path         : [ 'assets', 'due to' ],
      intercompany : {
        to_company : id,
        deposit    : cashAccountId,
        due        : remoteDue.id,
      },
    })
    // tree = treeAccountInserter(tree, 'assets', 'Due To', name)

    const localDue = await accountOps.create({
      company : companies[i].id,
      type    : 'liabilities',
      name    : name,
      path    : [ 'liabilities', 'due from' ],
    })
    // tree = treeAccountInserter(tree, 'liabilities', 'Due From', name)

    await accountOps.create({
      company      : id,
      type         : 'assets',
      name         : companies[i].name,
      path         : [ 'assets', 'due to' ],
      intercompany : {
        to_company : companies[i].id,
        deposit    : localDue.id,
        due        : cashAccountId,
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
