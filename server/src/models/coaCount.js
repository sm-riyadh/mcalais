import mongoose from 'mongoose'
import Journal from './journal'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const CoaCountSchema = new mongoose.Schema({
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

CoaCountSchema.statics.fetch = async name => await CoaCount.findOne({ name })

CoaCountSchema.statics.add = async name =>
  await CoaCount.findOneAndUpdate(
    { name },
    { $inc: { count: 1, abs_count: 1 } },
    { upsert: true }
  )

const CoaCount = mongoose.model('CoaCount', CoaCountSchema)

export default CoaCount
