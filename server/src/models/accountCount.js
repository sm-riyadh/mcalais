import mongoose from 'mongoose'
import Journal from './journal'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const AccountCountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
    required: true,
  },
  abs_count: {
    type: Number,
    default: 0,
    required: true,
  },
})

AccountCountSchema.statics.fetch = async name =>
  await AccountCount.findOne({ name })

AccountCountSchema.statics.add = async name =>
  await AccountCount.findOneAndUpdate(
    { name },
    { $inc: { count: 1, abs_count: 1 } },
    { upsert: true }
  )

const AccountCount = mongoose.model('AccountCount', AccountCountSchema)

export default AccountCount
