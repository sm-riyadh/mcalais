import mongoose from 'mongoose'
import Company from './company'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const CoaSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      min: 100000,
      max: 999999,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
      required: true,
    },
    path: [
      {
        type: String,
      },
    ],
    intercompany: {
      to_company: {
        type: String,
        trim: true,
        required: false,
      },
      deposit: {
        type: Number,
        min: 100000,
        max: 999999,
        required: false,
      },
      due: {
        type: Number,
        min: 100000,
        max: 999999,
        required: false,
      },
    },
    transaction: [
      {
        journal_id: mongoose.Schema.ObjectId,
      },
    ],
  },
  { collection: 'coa' }
)
CoaSchema.methods.toJSON = function() {
  const {
    _id,
    company,
    name,
    type,
    code,
    path,
    balance,
    intercompany,
    transaction,
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
    transaction,
  }
}

CoaSchema.statics.fetchOneByCode = async code =>
  await Coa.findOne({
    code,
  })

CoaSchema.statics.fetchList = async company =>
  await Coa.find({ company, transaction: { $exists: true, $ne: [] } })

CoaSchema.statics.fetchAll = async company => await Coa.find({ company })

CoaSchema.statics.checkInterCompany = async (company, code) =>
  await Coa.find({ company, code, intercompany: { $exists: true } })

CoaSchema.statics.create = async payload => await Coa(payload).save()

CoaSchema.statics.insertPreset = async payload =>
  await Coa.findOneAndUpdate(
    { id: payload.coa_id },
    {
      $push: {
        preset: { preset_id: payload.preset_id },
      },
    }
  )

const assets = type => 100000 < type && type < 200000
const liabilities = type => 200000 < type && type < 300000
const equities = type => 300000 < type && type < 400000
const expenses = type => 400000 < type && type < 500000
const incomes = type => 500000 < type && type < 600000
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
CoaSchema.statics.addJournal = async (
  company,
  journalID,
  credit,
  debit,
  amount
) => {
  await Coa.findOneAndUpdate(
    { company, code: credit },
    {
      $push: {
        transaction: { journal_id: journalID },
      },
    }
  )
  await Coa.update(
    { company, code: debit },
    {
      $push: {
        transaction: { journal_id: journalID },
      },
    }
  )

  if (
    (assets(debit) && liabilities(credit)) ||
    (assets(debit) && incomes(credit)) ||
    (assets(debit) && equities(credit))
  ) {
    await Coa.findOneAndUpdate(
      { company, code: credit },
      { $inc: { balance: amount } }
    )
    await Coa.findOneAndUpdate(
      { company, code: debit },
      { $inc: { balance: amount } }
    )
    await Company.updateAccountBalance(company, typeFinder(credit), +amount)
    await Company.updateAccountBalance(company, typeFinder(debit), +amount)
  } else if (
    (liabilities(debit) && assets(credit)) ||
    (equities(debit) && assets(credit))
  ) {
    await Coa.findOneAndUpdate(
      { company, code: credit },
      { $inc: { balance: -amount } }
    )
    await Coa.findOneAndUpdate(
      { company, code: debit },
      { $inc: { balance: -amount } }
    )
    await Company.updateAccountBalance(company, typeFinder(credit), -amount)
    await Company.updateAccountBalance(company, typeFinder(debit), -amount)
  } else if (
    (assets(debit) && assets(credit)) ||
    (expenses(debit) && assets(credit)) ||
    (assets(debit) && expenses(credit)) ||
    (assets(debit) && incomes(credit)) ||
    (incomes(debit) && assets(credit))
  ) {
    await Coa.findOneAndUpdate(
      { company, code: credit },
      { $inc: { balance: -amount } }
    )
    await Coa.findOneAndUpdate(
      { company, code: debit },
      { $inc: { balance: +amount } }
    )
    await Company.updateAccountBalance(company, typeFinder(credit), -amount)
    await Company.updateAccountBalance(company, typeFinder(debit), +amount)
  }
}
CoaSchema.statics.isExist = async code => await Coa.exists({ code })

CoaSchema.statics.remove = async id => {
  return await Coa.findByIdAndRemove(id)
}

const Coa = mongoose.model('Coa', CoaSchema)

export default Coa
