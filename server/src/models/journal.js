import mongoose from 'mongoose'
import Account from './account'
import { subDays, endOfDay } from 'date-fns'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const JournalSchema = new mongoose.Schema({
  debit: {
    code: {
      type: Number,
      min: 100001,
      max: 999999,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    // hierarchies: [
    //   {
    //     type: String,
    //     trim: true,
    //     required: true,
    //   },
    // ],
  },
  credit: {
    code: {
      type: Number,
      min: 100001,
      max: 999999,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    // hierarchies: [
    //   {
    //     type: String,
    //     trim: true,
    //     required: true,
    //   },
    // ],
  },
  amount: {
    type: Number,
    min: 1,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  comment: {
    type: String,
    trim: true,
  },
})
JournalSchema.methods.toJSON = function() {
  const { _id, credit, debit, description, amount, comment } = this.toObject()
  const date = _id.getTimestamp()
  return { id: _id, date, credit, debit, description, amount, comment }
}

JournalSchema.statics.fetch = async (
  size = 50,
  page = 0,
  account,
  startDate = subDays(new Date(), 5),
  endDate = endOfDay(new Date())
) => {
  size = 5
  if (startDate) startDate = new Date(startDate)
  if (endDate) endDate = new Date(endDate)

  if (!account)
    return await Journal.find({
      _id: {
        $gte: ObjectIdDate(startDate),
        $lt: ObjectIdDate(endDate),
      },
    })
      .skip(+size * +page)
      .limit(+size)
      .sort({ _id: -1 })
  else
    return await Journal.find({
      _id: {
        $gte: ObjectIdDate(startDate),
        $lt: ObjectIdDate(endDate),
      },
      $or: [
        { 'debit.code': { $eq: account } },
        { 'credit.code': { $eq: account } },
      ],
    })
      .skip(+size * +page)
      .limit(+size)
      .sort({ _id: -1 })
}
JournalSchema.statics.fetchSpecific = async id => await Journal.findById(id)
JournalSchema.statics.create = async payload => {
  console.log('TCL: payload', payload)
  const { _id, credit, debit, description, amount, comment } = await Journal(
    payload
  ).save()

  await Account.addJournal(_id, credit.code, debit.code, amount)
  return { _id, credit, debit, description, amount, comment }
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
