import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
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

// CODE: Check

AccountSchema.statics.isInterCompany = id => Account.findById({ _id: id, intercompany: { $exists: true } })

AccountSchema.statics.isExist = code => Account.exists({ code })

// CODE: Fetch

AccountSchema.statics.fetchOne = id => Account.findById(id)

AccountSchema.statics.fetch = (company, payload) => Account.find({ company, ...payload })

AccountSchema.statics.fetchNonEmpty = (company, payload) =>
  Account.find({ company, ...payload, transaction: { $exists: true, $ne: [] } })

// CODE: Create

AccountSchema.statics.create = ({ company, type, name, code, path, intercompany }) =>
  Account({ company, type, name, code, path, intercompany }).save()

AccountSchema.statics.addJournal = (company, code, journal_id) =>
  Account.findOneAndUpdate(
    { company, code },
    {
      $push : {
        transaction : { journal_id },
      },
    }
  )
// AccountSchema.statics.addJournal = (id, journal_id) =>
//   Account.findByIdAndUpdate(id, {
//     $push : {
//       transaction : { journal_id },
//     },
//   })

// CODE: Modify

AccountSchema.statics.modify = (id, payload) =>
  Account.findByIdAndUpdate(id, {
    $set : {
      ...payload,
    },
  })

AccountSchema.statics.modifyBalance = (company, code, amount) =>
  Account.findOneAndUpdate({ company, code }, { $inc: { balance: amount } })

// AccountSchema.statics.modifyBalance = (id, amount) =>
// Account.findByIdAndUpdate(id, { $inc: { balance: amount } })

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
