import mongoose from 'mongoose'
import { subDays, startOfDay, endOfDay } from 'date-fns'

const ObjectIdDate = date => mongoose.Types.ObjectId(Math.floor(date / 1000).toString(16) + '0000000000000000')

const JournalSchema = new mongoose.Schema({
  company     : {
    type     : String,
    required : true,
  },
  date        : {
    type     : Date,
    default  : Date.now,
    required : true,
  },
  debit       : {
    id   : {
      type     : mongoose.Schema.ObjectId,
      required : true,
    },
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
  },
  debit_note  : {
    type : String,
  },
  credit      : {
    id   : {
      type     : mongoose.Schema.ObjectId,
      required : true,
    },
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
  },
  credit_note : {
    type : String,
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
  isDisabled  : {
    type     : Boolean,
    required : true,
    default  : false,
  },
})

JournalSchema.methods.toJSON = function() {
  const { _id, date, company, credit, debit, description, amount, comment, isDisabled } = this.toObject()
  const entry_date = _id.getTimestamp()
  return { id: _id, date, company, entry_date, credit, debit, description, amount, comment, isDisabled }
}

/* --------------------------------- METHODS -------------------------------- */

// CODE: Fetch

JournalSchema.statics.fetchOne = id => Journal.findById(id)

JournalSchema.statics.fetch = (
  company,
  {
    size = 50,
    page = 0,
    lowerRangeCode = 100000,
    higherRangeCode = 500000,
    startDate = startOfDay(subDays(new Date(), 1)),
    endDate = endOfDay(new Date()),
  }
) =>
  Journal.find({
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
    //   _id     : {
    //     $gte : ObjectIdDate(startDate),
    //     $lt  : ObjectIdDate(endDate),
    //   },
  })
    .skip(+size * +page)
    .limit(+size)
    .sort({ date: -1 })
// .sort({ _id: -1 })

// CODE: Create

JournalSchema.statics.create = (
  { date, company, credit, credit_note, debit, debit_note, description, amount, comment } = {}
) =>
  Journal({
    date,
    company,
    credit      : {
      id   : credit.id,
      code : credit.code,
      name : credit.name,
    },
    credit_note,
    debit       : {
      id   : debit.id,
      code : debit.code,
      name : debit.name,
    },
    debit_note,
    description,
    amount,
    comment,
  }).save()

// CODE: Modify

JournalSchema.statics.modify = (id, payload) =>
  Journal.findByIdAndUpdate(
    id,
    {
      $set : {
        ...payload,
      },
    },
    { upsert: true }
  )

JournalSchema.statics.enable = id =>
  Journal.findByIdAndUpdate(id, {
    $set : {
      isDisabled : false,
    },
  })

JournalSchema.statics.disable = id =>
  Journal.findByIdAndUpdate(id, {
    $set : {
      isDisabled : true,
    },
  })

// CODE: Remove

JournalSchema.statics.remove = id => Journal.findByIdAndRemove(id)

const Journal = mongoose.model('Journal', JournalSchema)

export default Journal
