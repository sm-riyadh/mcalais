import Validator from 'validator'

import Account from '../../models/account'

// CODE: Fetch

const fetch = async ({ company, nonempty = false } = {}) => {
  if (!Validator.isMongoId(company)) throw 'Wrong company ID'
  if (nonempty && !await Validator.isBoolean(nonempty)) throw 'Non-Empty must be a boolean'
}

const fetchDetails = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Create

const create = async ({ company, type, name, path, intercompany } = {}) => {
  if (!Validator.isMongoId(company)) throw 'Wrong company ID'
  if (!Validator.isAlphanumeric(name.split(' ').join(''))) throw 'Only letters and numbers are allowed for name'

  if (type !== 'assets' && type !== 'liabilities' && type !== 'equities' && type !== 'expenses' && type !== 'incomes')
    throw 'Account type must be one of this: assets, liabilities, equities, expenses or incomes'
}

// CODE: Modify

const modify = async ({ id, name, path, intercompany } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (!Validator.isAlphanumeric(name.split(' ').join(''))) throw 'Only letters and numbers are allowed for name'
}

const activate = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

const deactivate = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Remove

const remove = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'

  const account = await Account.fetchOne(id)

  if (!account) throw 'Account does not exist'
  if (account.transaction.length === 0) throw 'Account can not be removed'
}

export default { fetch, fetchDetails, create, modify, activate, deactivate, remove }
