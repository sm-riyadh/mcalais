import mongoose from 'mongoose'
import _ from 'lodash'

const Schema = mongoose.Schema

const OrderSchema = new mongoose.Schema({
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
		minlength: 1,
		required: true,
	},
	createdAt: {
		type: Number,
		default: new Date().getTime(),
	},
	tabledata: {
		type: Object,
		required: true,
	},
})
OrderSchema.index({
	order_no: 'text',
})
OrderSchema.methods.toJSON = function() {
	const order = this
	return _.pick(order, [
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

OrderSchema.statics.fetchOrders = function(company, skips = 0, recent) {
	const order = this
	if (recent === 'true') {
		return order
			.find()
			.sort({ createdAt: -1 })
			.limit(20)
	}
	skips = skips * 30
	return order
		.find({ company })
		.sort({ createdAt: -1 })
		.skip(skips)
		.limit(30)
}
OrderSchema.statics.searchOrders = function(query, feild) {
	const order = this
	const findOption = {}
	findOption[feild] = {
		$regex: query,
		$options: 'im',
	}
	console.log(findOption)
	return order.find(findOption).sort({ createdAt: -1 })
}
OrderSchema.statics.fetchOrder = function(id) {
	const order = this
	return order.findById(id)
}

const Order = mongoose.model('Order', OrderSchema)

export default Order
