import Validator from 'validator'

import Company from '../../models/company'
import Account from '../../models/account'

// CODE: Fetch

const fetchDetails = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Create

const create = async ({ name } = {}) => {
  if (!Validator.isAlphanumeric(name.split(' ').join(''))) throw 'Only letters and numbers are allowed for name'
}

// CODE: Modify

const modify = async ({ id, name } = {}) => {
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

  const company = Company.fetchOne(id)

  if (!company) throw 'Company does not exist'
  if ((await Account.fetchNonEmpty(company.name)).length !== 0) throw 'Company can not be removed'
}

export default { fetchDetails, create, modify, activate, deactivate, remove }
