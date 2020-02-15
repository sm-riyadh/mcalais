import mongoose from 'mongoose'
import Journal from './journal'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const CoaSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    id: {
      type: String,
      required: false,
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
      required: false,
    },
    preset: [{ type: Object }],
    transaction: [
      {
        journal_id: mongoose.Schema.ObjectId,
      },
    ],
  },
  { collection: 'coa' }
)
CoaSchema.methods.toJSON = function() {
  return this.toObject()
}

CoaSchema.statics.fetchOneByCode = async code =>
  await Coa.findOne({
    code,
  })

CoaSchema.statics.fetchList = async () =>
  await Coa.find({ transaction: { $exists: true, $ne: [] } })

CoaSchema.statics.fetchAll = async company =>
  await Coa.find({ company: { $eq: company } })

CoaSchema.statics.create = async payload => await Coa(payload).save()

CoaSchema.statics.insertPreset = async payload =>
  await Coa.findOneAndUpdate(
    { id: payload.coa_id },
    {
      $push: {
        preset: { preset_id: payload.preset_id },
      },
    }
  )

CoaSchema.statics.addJournal = async (journalID, credit, debit, amount) => {
  await Coa.findOneAndUpdate(
    { code: credit },
    {
      $push: {
        transaction: { journal_id: journalID },
      },
    }
  )
  await Coa.update(
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
    await Coa.findOneAndUpdate({ code: credit }, { $inc: { balance: -amount } })
    await Coa.findOneAndUpdate({ code: debit }, { $inc: { balance: amount } })
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
    await Coa.findOneAndUpdate({ code: credit }, { $inc: { balance: amount } })
    await Coa.findOneAndUpdate({ code: debit }, { $inc: { balance: -amount } })
  } else {
    await Coa.findOneAndUpdate({ code: credit }, { $inc: { balance: amount } })
    await Coa.findOneAndUpdate({ code: debit }, { $inc: { balance: amount } })
  }
}
CoaSchema.statics.isExist = async code => await Coa.exists({ code })

CoaSchema.statics.remove = async id => {
  return await Coa.findByIdAndRemove(id)
}

const Coa = mongoose.model('Coa', CoaSchema)

export default Coa
