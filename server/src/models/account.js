import mongoose from 'mongoose'
import Company from './company'

// const ObjectIdDate = date =>
//   mongoose.Types.ObjectId(
//     Math.floor(date / 1000).toString(16) + '0000000000000000'
//   )

const AccountSchema = new mongoose.Schema(
  {
    company      : {
      type     : String,
      required : true,
    },
    name         : {
      type     : String,
      trim     : true,
      required : true,
    },
    type         : {
      type     : String,
      required : true,
    },
    code         : {
      type     : Number,
      min      : 100000,
      max      : 999999,
      required : true,
    },
    balance      : {
      type     : Number,
      default  : 0,
      required : true,
    },
    path         : [
      {
        type : String,
      },
    ],
    intercompany : {
      to_company : {
        type     : String,
        trim     : true,
        required : false,
      },
      deposit    : {
        type     : Number,
        min      : 100000,
        max      : 999999,
        required : false,
      },
      due        : {
        type     : Number,
        min      : 100000,
        max      : 999999,
        required : false,
      },
    },
    canDisable   : {
      type     : Boolean,
      default  : true,
      required : true,
    },
    isDisabled   : {
      type     : Boolean,
      default  : false,
      required : true,
    },
    transaction  : [
      {
        journal_id : mongoose.Schema.ObjectId,
      },
    ],
  },
  { collection: 'account' }
)
AccountSchema.methods.toJSON = function() {
  const { _id, company, name, type, code, path, balance, intercompany, transaction } = this.toObject()
  return {
    id           : _id,
    company,
    name,
    type,
    code,
    path,
    balance,
    intercompany,
    transaction,
  }
}

AccountSchema.statics.fetch = (company, code) =>
  Account.findOne({
    company,
    code,
  })

AccountSchema.statics.fetchList = company => Account.find({ company, transaction: { $exists: true, $ne: [] } })

AccountSchema.statics.fetchAll = company => Account.find({ company })

AccountSchema.statics.checkInterCompany = (company, code) =>
  Account.find({ company, code, intercompany: { $exists: true } })

AccountSchema.statics.create = payload => Account(payload).save()

AccountSchema.statics.insertPreset = payload =>
  Account.findOneAndUpdate(
    { id: payload.account_id },
    {
      $push : {
        preset : { preset_id: payload.preset_id },
      },
    }
  )

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
AccountSchema.statics.addJournal = async (company, journalID, credit, debit, amount) => {
  await Account.findOneAndUpdate(
    { company, code: credit },
    {
      $push : {
        transaction : { journal_id: journalID },
      },
    }
  )
  await Account.update(
    { company, code: debit },
    {
      $push : {
        transaction : { journal_id: journalID },
      },
    }
  )

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
}
AccountSchema.statics.isExist = code => Account.exists({ code })
AccountSchema.statics.remove = async (company, code) => {
  const { transaction } = await Account.fetch(company, code)

  if (transaction.length === 0) await Account.deleteOne({ company, code })
  else await Account.updateOne({ company, code }, { $set: { isDisabled: true } })
}
AccountSchema.statics.disable = (company, code) => Account.updateOne({ company, code }, { $set: { isDisabled: true } })

const Account = mongoose.model('Account', AccountSchema)

export default Account
