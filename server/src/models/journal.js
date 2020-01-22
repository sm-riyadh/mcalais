import mongoose from 'mongoose'
import Account from './account'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const JournalSchema = new mongoose.Schema({
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
  particular: {
    type: String,
  },
  comment: {
    type: String,
  },
})
JournalSchema.methods.toJSON = function() {
  const { _id, credit, debit, particular, amount, comment } = this.toObject()
  const date = _id.getTimestamp()
  return { id: _id, date, credit, debit, particular, amount, comment }
}

JournalSchema.statics.fetch = async (
  size = 20,
  startDate = new Date() - 24 * 60 * 60 * 1000 * 100,
  endDate = new Date()
) => {
  if (startDate) startDate = new Date(startDate)
  if (endDate) endDate = new Date(endDate)

  return await Journal.find({
    _id: {
      $gte: ObjectIdDate(startDate),
      $lt: ObjectIdDate(endDate),
    },
  })
    .limit(+size)
    .sort({ _id: -1 })
}
JournalSchema.statics.fetchSpecific = async id => await Journal.findById(id)
JournalSchema.statics.create = async payload => {
  const { _id, credit, debit, particular, amount, comment } = await Journal(
    payload
  ).save()

  await Account.addJournal(_id, credit, debit, amount)
  return { _id, credit, debit, particular, amount, comment }
}
JournalSchema.statics.remove = async id => {
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

const Journal = mongoose.model('Journal', JournalSchema)
export default Journal
