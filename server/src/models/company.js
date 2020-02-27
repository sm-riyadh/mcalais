import mongoose from 'mongoose'
import Journal from './journal'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  balance: {
    assets: {
      type: Number,
      default: 0,
      required: true,
    },
    liabilities: {
      type: Number,
      default: 0,
      required: true,
    },
    equities: {
      type: Number,
      default: 0,
      required: true,
    },
    expenses: {
      type: Number,
      default: 0,
      required: true,
    },
    incomes: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  account_count: {
    assets: {
      type: Number,
      default: 0,
      required: true,
    },
    liabilities: {
      type: Number,
      default: 0,
      required: true,
    },
    equities: {
      type: Number,
      default: 0,
      required: true,
    },
    expenses: {
      type: Number,
      default: 0,
      required: true,
    },
    incomes: {
      type: Number,
      default: 0,
      required: true,
    },
  },
})
CompanySchema.methods.toJSON = function() {
  const { _id, name } = this.toObject()
  return {
    id: _id,
    name,
  }
}
CompanySchema.statics.fetch = async name => await Company.find({ name })
CompanySchema.statics.fetchOne = async name => await Company.findOne({ name })

CompanySchema.statics.updateAccountCount = async (name, account) =>
  await Company.findOneAndUpdate(
    { name },
    { $inc: { ['account_count.' + account]: 1 } }
  )

CompanySchema.statics.updateAccountBalance = async (name, account, amount) =>
  await Company.findOneAndUpdate(
    { name },
    { $inc: { ['balance.' + account]: amount } }
  )

CompanySchema.statics.create = async payload => await Company(payload).save()

const Company = mongoose.model('Company', CompanySchema)

export default Company
