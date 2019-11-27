import mongoose from 'mongoose'

const AccountsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    required: true,
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
})

AccountsSchema.statics.fetchAll = async () => await Accounts.find()

AccountsSchema.statics.create = async payload => await Accounts(payload).save()

AccountsSchema.statics.remove = async id => {
  console.log('$: id', id)
  return await Accounts.findByIdAndRemove(id)
}

const Accounts = mongoose.model('Accounts', AccountsSchema)

export default Accounts
