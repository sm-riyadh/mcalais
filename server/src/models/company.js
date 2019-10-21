import mongoose from 'mongoose'

// Schema Declearation
const CompanySchema = new mongoose.Schema({
	name   : {
		type      : String,
		minlength : 1,
		trim      : true,
		unique    : true,
		required  : true
	},
	buyers : [
		{
			type      : String,
			trim      : true,
			minlength : 1
		}
	]
})

// ----- Basic Methods ----- //

// Fetch All Companys
CompanySchema.statics.fetchCompanies = function() {
	const company = this
	return company.find()
}
// Fetch Coresponding Buyers
CompanySchema.statics.fetchBuyers = function(userCompany) {
	const company = this
	return company.findOne({ name: userCompany })
}
// Fetch Company
CompanySchema.statics.fetchCompany = function(id) {
	const company = this
	return company.findById(id)
}

// Model Declearation
const Company = mongoose.model('Company', CompanySchema)

export default Company
