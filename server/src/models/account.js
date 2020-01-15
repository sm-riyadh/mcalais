import mongoose from 'mongoose'
import Journal from './journal'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  id: {
    type: String,
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
  under: {
    type: String,
    required: true,
  },
  preset: [{ type: Object }],
  transaction: [
    {
      journal_id: mongoose.Schema.ObjectId,
    },
  ],
})

AccountSchema.statics.fetchAll = async () =>
  await Account.find().sort({ code: 1 })

AccountSchema.statics.fetchLedger = async (
  startDate = new Date() - 24 * 60 * 60 * 1000 * 7,
  endDate = new Date()
) => {
  if (startDate) startDate = new Date(startDate)
  if (endDate) endDate = new Date(endDate)

  const account = JSON.parse(JSON.stringify(await Account.find()))

  const ledger = await Promise.all(
    account.map(async account => {
      const { _id, name, code, balance, transaction } = account
      if (transaction.length == 0)
        return { _id, name, code, balance, transaction }

      let journalID = transaction.map(journalID => {
        const id = journalID.journal_id

        if (startDate && id >= ObjectIdDate(startDate)) return id
        if (
          startDate &&
          endDate &&
          id >= ObjectIdDate(startDate) &&
          id <= ObjectIdDate(endDate)
        )
          return id
      })
      journalID = journalID.filter(id => id != null)

      const journal = await Promise.all(
        journalID.map(async journalID => {
          const {
            _id,
            credit,
            debit,
            particular,
            amount,
          } = await Journal.fetchSpecific(journalID)
          const date = _id.getTimestamp()

          if (code === debit) {
            return {
              _id,
              date,
              particular,
              account: credit,
              debit: amount,
              credit: 0,
            }
          } else if (code === credit) {
            return {
              _id,
              date,
              particular,
              account: debit,
              debit: 0,
              credit: amount,
            }
          }
        })
      )

      return { _id, name, code, balance, transaction: journal }
    })
  )
  return ledger
}
AccountSchema.statics.create = async payload => {
  return await Account(payload).save()
}
AccountSchema.statics.insertPreset = async payload =>
  await Account.findOneAndUpdate(
    { id: payload.account_id },
    {
      $push: {
        preset: { preset_id: payload.preset_id },
      },
    }
  )

AccountSchema.statics.addJournal = async (journalID, credit, debit, amount) => {
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
    400000 <= debit &&
    debit < 500000 &&
    100000 <= credit &&
    credit < 200000 &&
    400000 <= credit &&
    credit < 500000
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
    500000 <= debit &&
    debit < 600000 &&
    200000 <= credit &&
    credit < 400000 &&
    500000 <= credit &&
    credit < 600000
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
AccountSchema.statics.isExist = async code => await Account.exists({ code })

AccountSchema.statics.remove = async id => {
  return await Account.findByIdAndRemove(id)
}

const Account = mongoose.model('Account', AccountSchema)

export default Account
