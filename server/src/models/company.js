import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
  name         : {
    type     : String,
    trim     : true,
    required : true,
  },
  balance      : {
    assets      : {
      type     : Number,
      default  : 0,
      required : true,
    },
    liabilities : {
      type     : Number,
      default  : 0,
      required : true,
    },
    equities    : {
      type     : Number,
      default  : 0,
      required : true,
    },
    expenses    : {
      type     : Number,
      default  : 0,
      required : true,
    },
    incomes     : {
      type     : Number,
      default  : 0,
      required : true,
    },
  },
  accountCount : {
    assets      : {
      type     : Number,
      default  : 0,
      required : true,
    },
    liabilities : {
      type     : Number,
      default  : 0,
      required : true,
    },
    equities    : {
      type     : Number,
      default  : 0,
      required : true,
    },
    expenses    : {
      type     : Number,
      default  : 0,
      required : true,
    },
    incomes     : {
      type     : Number,
      default  : 0,
      required : true,
    },
  },
})
CompanySchema.methods.toJSON = function() {
  const { _id, name, balance, accountCount } = this.toObject()
  return {
    id           : _id,
    name,
    balance,
    accountCount,
  }
}
CompanySchema.statics.fetch = () => Company.find()
CompanySchema.statics.fetchOne = name => Company.findOne({ name })

CompanySchema.statics.updateAccountCount = (name, account) =>
  Company.findOneAndUpdate({ name }, { $inc: { ['accountCount.' + account]: 1 } })

CompanySchema.statics.updateAccountBalance = (name, account, amount) =>
  Company.findOneAndUpdate({ name }, { $inc: { ['balance.' + account]: amount } })

CompanySchema.statics.create = async payload => {
  const newCompany = await Company(payload).save()
  /**
 * Create Pre-made Accounts
 */
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

const Company = mongoose.model('Company', CompanySchema)

export default Company
