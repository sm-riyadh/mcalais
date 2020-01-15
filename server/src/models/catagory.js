import mongoose from 'mongoose'

const CatagorySchema = new mongoose.Schema({ catagory: [] })

CatagorySchema.statics.fetchAll = async () => await Catagory.find()

CatagorySchema.statics.update = async payload =>
  await Catagory.replaceOne({}, { catagory: payload }, { upsert: true })

const Catagory = mongoose.model('Catagory', CatagorySchema)

export default Catagory
