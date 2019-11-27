import mongoose from 'mongoose'

const ledgerSchema = new mongoose.Schema({
  code: {
    type: Number,
    min: 100001,
    max: 999999,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    minlength: 2,
    required: true,
  },
})

ledgerSchema.statics.findJournal = async () => await Ledger.find()

const Ledger = mongoose.model('Ledger', ledgerSchema)
export default Ledger
