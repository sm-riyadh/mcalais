import mongoose from 'mongoose'
import _ from 'lodash'

const Schema = mongoose.Schema

const DraftSchema = new mongoose.Schema({
  buyer: {
    type: String,
    minlength: 1,
    required: true,
  },
  order_no: {
    type: String,
    trim: true,
    minlength: 1,
    required: true,
  },
  style_no: {
    type: String,
    trim: true,
    minlength: 1,
    required: true,
  },
  shipment_date: {
    type: Number,
    default: new Date().getTime(),
    required: true,
  },
  item: {
    type: String,
    trim: true,
    minlength: 1,
  },
  quantity: {
    type: Number,
    trim: true,
    minlength: 1,
  },
  createdBy: {
    type: Schema.ObjectId,
    required: true,
  },
  company: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Number,
    default: new Date().getTime(),
  },
  tabledata: {
    type: Object,
  },
})
DraftSchema.methods.toJSON = function() {
  const draft = this
  return _.pick(draft, [
    'id',
    'buyer',
    'order_no',
    'style_no',
    'shipment_date',
    'item',
    'quantity',
    'createdBy',
    'company',
    'tabledata',
  ])
}

DraftSchema.statics.fetchDrafts = function(userId) {
  const draft = this
  return draft.find({ createdBy: userId }).sort({ createdAt: -1 })
}

DraftSchema.statics.fetchDraft = function(id) {
  const draft = this
  return draft.findById(id)
}

const Draft = mongoose.model('Draft', DraftSchema)

export default Draft
