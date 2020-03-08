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
    required: true
  },
  debit: {
    code: {
      type: Number,
      min: 100001,
      max: 999999,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    }
  },
  credit: {
    code: {
      type: Number,
      min: 100001,
      max: 999999,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    }
  },
  amount: {
    type: Number,
    min: 1,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  comment: {
    type: String,
    trim: true
  }
})
JournalSchema.methods.toJSON = function () {
  const {
    _id,
    company,
    credit,
    debit,
    description,
    amount,
    comment
  } = this.toObject()
  const date = _id.getTimestamp()
  return { id: _id, company, date, credit, debit, description, amount, comment }
}
// FETCH
JournalSchema.statics.fetch = (
  company,
  coa,
  size = 100,
  page = 0,
  startDate = subDays(new Date(), 50),
  endDate = endOfDay(new Date())
) => {
  if (startDate) startDate = new Date(startDate)
  if (endDate) endDate = new Date(endDate)

  if (!coa) {
    const journal = Journal.find({
      company,
      _id: {
        $gte: ObjectIdDate(startDate),
        $lt: ObjectIdDate(endDate)
      }
    })
      .skip(+size * +page)
      .limit(+size)
      .sort({ _id: -1 })

    return journal
  } else {
    const { transaction } = Coa.fetchOneByCode(+coa)

    if (!transaction) return []

    let journalID = transaction.map(({ journalId }) => {
      if (journalId >= ObjectIdDate(startDate)) return journalId

      if (
        journalId >= ObjectIdDate(startDate) &&
        journalId <= ObjectIdDate(endDate)
      ) { return journalId }
    })
    journalID = journalID.filter(id => id != null)

    const journal = Promise.all(
      journalID.map(id => Journal.fetchOne(id))
    )

    return journal
  }
}
JournalSchema.statics.fetchOne = id => Journal.findById(id)

// TODO: Please change out we store credit. just take the code not the name
JournalSchema.statics.create = async payload => {
  const {
    _id,
    company,
    credit,
    debit,
    description,
    amount,
    comment
  } = await Journal(payload).save()

  await Coa.addJournal(company, _id, credit.code, debit.code, amount)

  const account = await Coa.checkInterCompany(company, debit.code)

  if (account.length !== 0) {
    const { toCompany, deposit, due } = account[0].intercompany

    interCompanyJournalCreator(toCompany, deposit, due, payload)
  }

  return { _id, company, credit, debit, description, amount, comment }
}
const interCompanyJournalCreator = async (company, deposit, due, account) => {
  const { _id, credit, debit, amount } = await Journal({
    company,
    credit: {
      name: `${due}`,
      code: due
    },
    debit: {
      name: `${deposit}`,
      code: deposit
    },
    description: `From: ${account.credit.name}, to: ${account.debit.name}`,
    amount: account.amount,
    comment: '...'
  }).save()

  await Coa.addJournal(company, _id, credit.code, debit.code, amount)
}

JournalSchema.statics.remove = id => {
  const journal = Journal.findById(id)

  Coa.update(
    { code: journal.destination },
    {
      $pull: {
        transaction: { journalId: id }
      }
    }
  )
  Coa.update(
    { code: journal.source },
    {
      $pull: {
        transaction: { journalId: id }
      }
    }
  )
  Journal.findByIdAndRemove(id)

  return null
}

const Journal = mongoose.model('Journal', JournalSchema)
export default Journal
