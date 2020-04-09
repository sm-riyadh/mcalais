import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  company      : {
    type     : mongoose.Schema.ObjectId,
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
    to_company : mongoose.Schema.ObjectId,
    deposit    : mongoose.Schema.ObjectId,
    due        : mongoose.Schema.ObjectId,
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
})

AccountSchema.methods.toJSON = function() {
  const { _id, company, name, type, code, path, balance, intercompany, isDisabled, transaction } = this.toObject()

  return {
    id           : _id,
    company,
    name,
    type,
    code,
    path,
    balance,
    intercompany,
    isDisabled,
    transaction,
  }
}

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

AccountSchema.statics.fetchOne = id => Account.findById(id)

AccountSchema.statics.fetch = (company, payload) => Account.find({ company, ...payload })

AccountSchema.statics.fetchNonEmpty = (id, payload) =>
  Account.find({ _id: id, ...payload, transaction: { $exists: true, $ne: [] } })

AccountSchema.statics.fetchInterCompany = id => Account.findOne({ _id: id, intercompany: { $exists: true } })

// CODE: Create

AccountSchema.statics.create = ({ company, type, name, code, path, intercompany }) =>
  Account({ company, type, name, code, path, intercompany }).save()

// CODE: Modify

AccountSchema.statics.modify = (id, payload) =>
  Account.findByIdAndUpdate(id, {
    $set : {
      ...payload,
    },
  })

AccountSchema.statics.modifyBalance = (id, amount) => Account.findByIdAndUpdate(id, { $inc: { balance: amount } })

AccountSchema.statics.addJournal = (id, journal_id) =>
  Account.findByIdAndUpdate(id, {
    $push : {
      transaction : { journal_id },
    },
  })

AccountSchema.statics.disable = id =>
  Account.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })

AccountSchema.statics.enable = id =>
  Account.findByIdAndUpdate(id, {
    $set : {
      isDisabled : false,
    },
  })

// CODE: Remove

AccountSchema.statics.remove = id => Account.findByIdAndRemove(id)

const Account = mongoose.model('Account', AccountSchema)

export default Account
