import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(
  // "mongodb://test:abc1234@ds032887.mlab.com:32887/cardinal-ms",
  'mongodb://localhost:27017/cardinal',
  { useNewUrlParser: true },
)

export default mongoose
