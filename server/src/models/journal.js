import mongoose from 'mongoose'
import Coa from './coa'
import { subDays, endOfDay } from 'date-fns'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const JournalSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
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
  const {
    _id,
    company,
    credit,
    debit,
    description,
    amount,
    comment,
  } = this.toObject()
  const date = _id.getTimestamp()
  return { id: _id, company, date, credit, debit, description, amount, comment }
}
// FETCH
JournalSchema.statics.fetch = async (
  company,
  coa,
  size = 10,
  page = 0,
  startDate = subDays(new Date(), 100),
  endDate = endOfDay(new Date())
) => {
  if (startDate) startDate = new Date(startDate)
  if (endDate) endDate = new Date(endDate)

  if (!coa) {
    const journal = await Journal.find({
      company: { $eq: company },
      _id: {
        $gte: ObjectIdDate(startDate),
        $lt: ObjectIdDate(endDate),
      },
    })
      .skip(+size * +page)
      .limit(+size)
      .sort({ _id: -1 })

    return journal
  } else {
    const { transaction } = await Coa.fetchOneByCode(+coa)

    if (!transaction) return []

    let journalID = transaction.map(({ journal_id }) => {
      if (journal_id >= ObjectIdDate(startDate)) return journal_id

      if (
        journal_id >= ObjectIdDate(startDate) &&
        journal_id <= ObjectIdDate(endDate)
      )
        return journal_id
    })
    journalID = journalID.filter(id => id != null)

    const journal = await Promise.all(
      journalID.map(async id => await Journal.fetchOne(id))
    )

    return journal
  }
}
JournalSchema.statics.fetchOne = async id => await Journal.findById(id)

JournalSchema.statics.create = async payload => {
  const {
    _id,
    company,
    credit,
    debit,
    description,
    amount,
    comment,
  } = await Journal(payload).save()

  await Coa.addJournal(_id, credit.code, debit.code, amount)
  return { _id, company, credit, debit, description, amount, comment }
}

JournalSchema.statics.remove = async id => {
  const journal = await Journal.findById(id)

  await Coa.update(
    { code: journal.destination },
    {
      $pull: {
        transaction: { journal_id: id },
      },
    }
  )
  await Coa.update(
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
