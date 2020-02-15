import mongoose from 'mongoose'
import Journal from './journal'

const ObjectIdDate = date =>
  mongoose.Types.ObjectId(
    Math.floor(date / 1000).toString(16) + '0000000000000000'
  )

const CoaCountSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
    required: true,
  },
})

CoaCountSchema.statics.fetch = async (company, type) =>
  await CoaCount.findOne({ company, type })

CoaCountSchema.statics.add = async (company, type) =>
  await CoaCount.findOneAndUpdate(
    { company, type },
    { $inc: { count: 1 } },
    { upsert: true }
  )

const CoaCount = mongoose.model('CoaCount', CoaCountSchema)

export default CoaCount
