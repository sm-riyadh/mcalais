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
  isDisabled   : {
    type     : Boolean,
    required : true,
    default  : false,
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

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

CompanySchema.statics.fetchOne = id => Company.findById(id)

CompanySchema.statics.fetch = payload => Company.find({ payload })

// CODE: Create

CompanySchema.statics.create = async ({ name }) => await Company({ name }).save()

// CODE: Modify

CompanySchema.statics.modify = (id, { name }) =>
  Company.findByIdAndUpdate(id, {
    $set : { name },
  })

CompanySchema.statics.updateCompanyCount = (id, account) =>
  Company.findByIdAndUpdate(id, { $inc: { ['accountCount.' + account]: 1 } })

CompanySchema.statics.updateCompanyBalance = (id, account, amount) =>
  Company.findByIdAndUpdate(id, { $inc: { ['balance.' + account]: amount } })
const Company = mongoose.model('Company', CompanySchema)

CompanySchema.statics.disable = id =>
  Company.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })
CompanySchema.statics.enable = id =>
  Company.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })

// CODE: Remove

CompanySchema.statics.remove = id => Company.findByIdAndRemove(id)

export default Company
