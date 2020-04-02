import mongoose from 'mongoose'
import Account from './account'
import { subDays, startOfDay, endOfDay } from 'date-fns'

const ObjectIdDate = date => mongoose.Types.ObjectId(Math.floor(date / 1000).toString(16) + '0000000000000000')

const JournalSchema = new mongoose.Schema({
  date        : {
    type     : Date,
    default  : Date.now,
    required : true,
  },
  company     : {
    type     : String,
    required : true,
  },
  debit       : {
    code : {
      type     : Number,
      min      : 100001,
      max      : 999999,
      required : true,
    },
    name : {
      type     : String,
      trim     : true,
      required : true,
    },
    note : {
      type : String,
    },
  },
  credit      : {
    code : {
      type     : Number,
      min      : 100001,
      max      : 999999,
      required : true,
    },
    name : {
      type     : String,
      trim     : true,
      required : true,
    },
    note : {
      type : String,
    },
  },
  amount      : {
    type     : Number,
    min      : 1,
    required : true,
  },
  description : {
    type : String,
    trim : true,
  },
  comment     : {
    type : String,
    trim : true,
  },
})
JournalSchema.methods.toJSON = function() {
  const { _id, date, company, credit, debit, description, amount, comment } = this.toObject()
  const entry_date = _id.getTimestamp()
  return { id: _id, date, company, entry_date, credit, debit, description, amount, comment }
}
// FETCH
JournalSchema.statics.fetch = (
  company,
  type = 'journal',
  size = 1000,
  page = 0,
  startDate = subDays(new Date(), 2000),
  endDate = new Date()
) => {
  if (startDate) startDate = startOfDay(new Date(startDate))
  if (endDate) endDate = endOfDay(new Date(endDate))

  let lowerRangeCode, higherRangeCode

  switch (type) {
    case 'journal': {
      lowerRangeCode = 100000
      higherRangeCode = 500000
      break
    }
    case 'liabilities': {
      lowerRangeCode = 200000
      higherRangeCode = 300000
      break
    }
    case 'equities': {
      lowerRangeCode = 300000
      higherRangeCode = 400000
      break
    }
    case 'expenses': {
      lowerRangeCode = 400000
      higherRangeCode = 500000
      break
    }
    case 'incomes': {
      lowerRangeCode = 500000
      higherRangeCode = 600000
      break
    }
    default: {
      lowerRangeCode = 100000
      higherRangeCode = 500000
    }
  }

  const journal = Journal.find({
    company,
    $or     : [
      {
        'debit.code' : {
          $gte : lowerRangeCode,
          $lt  : higherRangeCode,
        },
      },
      {
        'credit.code' : {
          $gte : lowerRangeCode,
          $lt  : higherRangeCode,
        },
      },
    ],
    date    : {
      $gte : startDate.getTime(),
      $lt  : endDate.getTime(),
    },
  })
    .skip(+size * +page)
    .limit(+size)
    .sort({ date: -1 })
  // .sort({ _id: -1 })
  // const journal = Journal.find({
  //   company,
  //   _id     : {
  //     $gte : ObjectIdDate(startDate),
  //     $lt  : ObjectIdDate(endDate),
  //   },
  // })
  //   .skip(+size * +page)
  //   .limit(+size)
  //   .sort({ date: -1 })
  // // .sort({ _id: -1 })

  return journal
}
JournalSchema.statics.fetchOne = id => Journal.findById(id)

// TODO: Please change out we store credit. just take the code not the name
JournalSchema.statics.create = async payload => {
  const debitAccount = await Account.fetchOneByCode(debit)
  const creditAccount = await Account.fetchOneByCode(credit)

  const { _id, date, company, credit, debit, description, amount, comment } = await Journal({
    date        : payload.date,
    company     : payload.company,
    credit      : {
      code : creditAccount.code,
      name : creditAccount.name,
      note : payload.credit_note,
    },
    debit       : {
      code : debitAccount.code,
      name : debitAccount.name,
      note : payload.debit_note,
    },
    description : payload.description,
    amount      : payload.amount,
    comment     : payload.comment,
  }).save()

  await Account.addJournal(company, _id, credit.code, debit.code, amount)

  const account = await Account.checkInterCompany(company, debit.code)

  if (account.length !== 0) {
    const { to_company, deposit, due } = account[0].intercompany

    interCompanyJournalCreator(to_company, deposit, due, payload)
  }

  return { id: _id, date, company, credit, debit, description, amount, comment }
}
const interCompanyJournalCreator = async (company, deposit, due, account) => {
  const { _id, credit, debit, amount } = await Journal({
    company,
    credit      : {
      name : `${due}`,
      code : due,
    },
    debit       : {
      name : `${deposit}`,
      code : deposit,
    },
    description : `From: ${account.credit.name}, to: ${account.debit.name}`,
    amount      : account.amount,
    comment     : '...',
  }).save()

  await Account.addJournal(company, _id, credit.code, debit.code, amount)
}

JournalSchema.statics.remove = id => {
  const journal = Journal.findById(id)

  Account.update(
    { code: journal.destination },
    {
      $pull : {
        transaction : { journalId: id },
      },
    }
  )
  Account.update(
    { code: journal.source },
    {
      $pull : {
        transaction : { journalId: id },
      },
    }
  )
  Journal.findByIdAndRemove(id)

  return null
}

const Journal = mongoose.model('Journal', JournalSchema)
export default Journal
