import Validator from 'validator'

const fetch = async ({ company, nonempty = false }) => {
  // if (!Validator.isMongoId(company_id)) throw 'Wrong company ID'
  if (nonempty && !Validator.isBoolean(nonempty)) throw 'Non-Empty must be a boolean or empty'
}

const create = async ({ company, type, name, path, intercompany }) => {
  // if (!Validator.isMongoId(company_id)) throw 'Wrong company ID'
  if (!Validator.isAlphanumeric(name)) throw 'Only letters and numbers are allowed for name'

  if (type !== 'assets' || type !== 'liabilities' || type !== 'equities' || type !== 'expenses' || type !== 'incomes')
    throw 'Account type must be one of this: assets, liabilities, equities, expenses or incomes'
}

const modify = async ({ id, name, path, intercompany }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (!Validator.isAlphanumeric(name)) throw 'Only letters and numbers are allowed for name'
}

const remove = async ({ company, id }) => {
  // if (!Validator.isMongoId(company_id)) throw 'Wrong company ID'
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

export { fetch, create, modify, remove }
