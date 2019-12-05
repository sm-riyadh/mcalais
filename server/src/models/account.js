import mongoose from 'mongoose'
import Journal from './journal'

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
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
  transaction: [
    {
      journal_id: mongoose.Schema.ObjectId,
    },
  ],
})

accountSchema.statics.fetchAll = async () => await Account.find()

accountSchema.statics.fetchLedger = async () => {
  const account = JSON.parse(JSON.stringify(await Account.find()))

  const ledger = await Promise.all(
    account.map(async account => {
      const { _id, name, code, balance, transaction } = account
      if (transaction.length == 0)
        return { _id, name, code, balance, transaction }

      const journalID = transaction.map(journalID => journalID.journal_id)

      const journal = await Promise.all(
        journalID.map(async journalID => {
          const { _id, credit, debit, amount } = await Journal.fetchSpecific(
            journalID
          )

          if (code === debit) {
            return { _id, account: credit, debit: amount, credit: 0 }
          } else if (code === credit) {
            return { _id, account: debit, debit: 0, credit: amount }
          }
        })
      )

      return { _id, name, code, balance, transaction: journal }
    })
  )
  return ledger
}
accountSchema.statics.create = async payload => await Account(payload).save()
accountSchema.statics.addJournal = async (journalID, credit, debit, amount) => {
  await Account.findOneAndUpdate(
    { code: credit },
    {
      $push: {
        transaction: { journal_id: journalID },
      },
    }
  )
  await Account.update(
    { code: debit },
    {
      $push: {
        transaction: { journal_id: journalID },
      },
    }
  )

  if (
    100000 <= debit &&
    debit < 200000 &&
    100000 <= credit &&
    credit < 200000
  ) {
    await Account.findOneAndUpdate(
      { code: credit },
      { $inc: { balance: -amount } }
    )
    await Account.findOneAndUpdate(
      { code: debit },
      { $inc: { balance: amount } }
    )
  } else if (
    200000 <= debit &&
    debit < 400000 &&
    200000 <= credit &&
    credit < 400000
  ) {
    await Account.findOneAndUpdate(
      { code: credit },
      { $inc: { balance: amount } }
    )
    await Account.findOneAndUpdate(
      { code: debit },
      { $inc: { balance: -amount } }
    )
  } else {
    await Account.findOneAndUpdate(
      { code: credit },
      { $inc: { balance: amount } }
    )
    await Account.findOneAndUpdate(
      { code: debit },
      { $inc: { balance: amount } }
    )
  }
}
accountSchema.statics.isExist = async code => await Account.exists({ code })

accountSchema.statics.remove = async id => {
  return await Account.findByIdAndRemove(id)
}

const Account = mongoose.model('Account', accountSchema)

export default Account
