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

/* --------------------------------- PARSING --------------------------------- */

CompanySchema.methods.toJSON = function() {
  const { _id, name, balance, accountCount, isDisabled } = this.toObject()
  return {
    id           : _id,
    name,
    balance,
    accountCount,
    isDisabled,
  }
}

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

CompanySchema.statics.fetchOne = id => Company.findById(id)

CompanySchema.statics.fetch = payload => Company.find({ ...payload })

// CODE: Create

CompanySchema.statics.create = ({ name }) => Company({ name }).save()

// CODE: Modify

CompanySchema.statics.modify = (id, payload) =>
  Company.findByIdAndUpdate(id, {
    $set : { ...payload },
  })

CompanySchema.statics.modifyBalance = (name, account, amount) =>
  Company.findOneAndUpdate({ name }, { $inc: { ['balance.' + account]: amount } })

// CompanySchema.statics.modifyBalance = (id, amount) =>
// Company.findByIdAndUpdate(id, { $inc: { ['balance.' + account]: amount } })

CompanySchema.statics.modifyCount = (name, account) =>
  Company.findOneAndUpdate({ name }, { $inc: { ['accountCount.' + account]: 1 } })

// CompanySchema.statics.modifyCount = (id, account) =>
//   Company.findByIdAndUpdate(id, { $inc: { ['accountCount.' + account]: 1 } })

CompanySchema.statics.enable = id =>
  Company.findByIdAndUpdate(id, {
    $set : {
      isDisabled : false,
    },
  })

CompanySchema.statics.disable = id =>
  Company.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })
// CODE: Remove

CompanySchema.statics.remove = id => Company.findByIdAndRemove(id)

const Company = mongoose.model('Company', CompanySchema)

export default Company
