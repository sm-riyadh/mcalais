import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  balance: {
    assets: {
      type: Number,
      default: 0,
      required: true
    },
    liabilities: {
      type: Number,
      default: 0,
      required: true
    },
    equities: {
      type: Number,
      default: 0,
      required: true
    },
    expenses: {
      type: Number,
      default: 0,
      required: true
    },
    incomes: {
      type: Number,
      default: 0,
      required: true
    }
  },
  accountCount: {
    assets: {
      type: Number,
      default: 0,
      required: true
    },
    liabilities: {
      type: Number,
      default: 0,
      required: true
    },
    equities: {
      type: Number,
      default: 0,
      required: true
    },
    expenses: {
      type: Number,
      default: 0,
      required: true
    },
    incomes: {
      type: Number,
      default: 0,
      required: true
    }
  }
})
CompanySchema.methods.toJSON = function () {
  const { _id, name, balance, accountCount } = this.toObject()
  return {
    id: _id,
    name,
    balance,
    accountCount
  }
}
CompanySchema.statics.fetch = () => Company.find()
CompanySchema.statics.fetchOne = name => Company.findOne({ name })

CompanySchema.statics.updateAccountCount = (name, account) =>
  Company.findOneAndUpdate(
    { name },
    { $inc: { ['accountCount.' + account]: 1 } }
  )

CompanySchema.statics.updateAccountBalance = (name, account, amount) =>
  Company.findOneAndUpdate(
    { name },
    { $inc: { ['balance.' + account]: amount } }
  )

CompanySchema.statics.create = payload => Company(payload).save()

const Company = mongoose.model('Company', CompanySchema)

export default Company
