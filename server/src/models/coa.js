import mongoose from 'mongoose'
import Company from './company'

// const ObjectIdDate = date =>
//   mongoose.Types.ObjectId(
//     Math.floor(date / 1000).toString(16) + '0000000000000000'
//   )

const CoaSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    code: {
      type: Number,
      min: 100000,
      max: 999999,
      required: true
    },
    balance: {
      type: Number,
      default: 0,
      required: true
    },
    path: [
      {
        type: String
      }
    ],
    intercompany: {
      to_company: {
        type: String,
        trim: true,
        required: false
      },
      deposit: {
        type: Number,
        min: 100000,
        max: 999999,
        required: false
      },
      due: {
        type: Number,
        min: 100000,
        max: 999999,
        required: false
      }
    },
    transaction: [
      {
        journal_id: mongoose.Schema.ObjectId
      }
    ]
  },
  { collection: 'coa' }
)
CoaSchema.methods.toJSON = function () {
  const {
    _id,
    company,
    name,
    type,
    code,
    path,
    balance,
    intercompany,
    transaction
  } = this.toObject()
  return {
    id: _id,
    company,
    name,
    type,
    code,
    path,
    balance,
    intercompany,
    transaction
  }
}

CoaSchema.statics.fetchOneByCode = code =>
  Coa.findOne({
    code
  })

CoaSchema.statics.fetchList = company =>
  Coa.find({ company, transaction: { $exists: true, $ne: [] } })

CoaSchema.statics.fetchAll = company => Coa.find({ company })

CoaSchema.statics.checkInterCompany = (company, code) =>
  Coa.find({ company, code, intercompany: { $exists: true } })

CoaSchema.statics.create = payload => Coa(payload).save()

CoaSchema.statics.insertPreset = payload =>
  Coa.findOneAndUpdate(
    { id: payload.coa_id },
    {
      $push: {
        preset: { preset_id: payload.preset_id }
      }
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
CoaSchema.statics.addJournal = (
  company,
  journalID,
  credit,
  debit,
  amount
) => {
  Coa.findOneAndUpdate(
    { company, code: credit },
    {
      $push: {
        transaction: { journal_id: journalID }
      }
    }
  )
  Coa.update(
    { company, code: debit },
    {
      $push: {
        transaction: { journal_id: journalID }
      }
    }
  )

  if (
    (assets(debit) && liabilities(credit)) ||
    (assets(debit) && incomes(credit)) ||
    (assets(debit) && equities(credit))
  ) {
    Coa.findOneAndUpdate(
      { company, code: credit },
      { $inc: { balance: amount } }
    )
    Coa.findOneAndUpdate(
      { company, code: debit },
      { $inc: { balance: amount } }
    )
    Company.updateAccountBalance(company, typeFinder(credit), +amount)
    Company.updateAccountBalance(company, typeFinder(debit), +amount)
  } else if (
    (liabilities(debit) && assets(credit)) ||
    (equities(debit) && assets(credit))
  ) {
    Coa.findOneAndUpdate(
      { company, code: credit },
      { $inc: { balance: -amount } }
    )
    Coa.findOneAndUpdate(
      { company, code: debit },
      { $inc: { balance: -amount } }
    )
    Company.updateAccountBalance(company, typeFinder(credit), -amount)
    Company.updateAccountBalance(company, typeFinder(debit), -amount)
  } else if (
    (assets(debit) && assets(credit)) ||
    (expenses(debit) && assets(credit)) ||
    (assets(debit) && expenses(credit)) ||
    (assets(debit) && incomes(credit)) ||
    (incomes(debit) && assets(credit))
  ) {
    Coa.findOneAndUpdate(
      { company, code: credit },
      { $inc: { balance: -amount } }
    )
    Coa.findOneAndUpdate(
      { company, code: debit },
      { $inc: { balance: +amount } }
    )
    Company.updateAccountBalance(company, typeFinder(credit), -amount)
    Company.updateAccountBalance(company, typeFinder(debit), +amount)
  }
}
CoaSchema.statics.isExist = code => Coa.exists({ code })

CoaSchema.statics.remove = id => {
  return Coa.findByIdAndRemove(id)
}

const Coa = mongoose.model('Coa', CoaSchema)

export default Coa
