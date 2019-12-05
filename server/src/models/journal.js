import mongoose from 'mongoose'
import Account from './account'

const journalSchema = new mongoose.Schema({
  debit: {
    type: Number,
    min: 100001,
    max: 999999,
    required: true,
  },
  credit: {
    type: Number,
    min: 100001,
    max: 999999,
    required: true,
  },
  amount: {
    type: Number,
    min: 1,
    required: true,
  },
})

// journalSchema.statics.fetchAll = async () => await Journal.find()
journalSchema.statics.fetch = async size => await Journal.find().limit(+size)
journalSchema.statics.fetchSpecific = async id => await Journal.findById(id)
journalSchema.statics.create = async payload => {
  const { _id, credit, debit, amount } = await Journal(payload).save()

  await Account.addJournal(_id, credit, debit, amount)
  return { _id, credit, debit, amount }
}
journalSchema.statics.remove = async id => {
  const journal = await Journal.findById(id)

  await Account.update(
    { code: journal.destination },
    {
      $pull: {
        transaction: { journal_id: id },
      },
    }
  )
  await Account.update(
    { code: journal.source },
    {
      $pull: {
        transaction: { journal_id: id },
      },
    }
  )
  await Journal.findByIdAndRemove(id)

  return null
}

const Journal = mongoose.model('Journal', journalSchema)
export default Journal
