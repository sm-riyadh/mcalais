import Validator from 'validator'

// CODE: Fetch

const fetchDetails = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

// CODE: Create

const create = async ({ name } = {}) => {
  if (!Validator.isAlphanumeric(name)) throw 'Only letters and numbers are allowed for name'
}

// CODE: Modify

const modify = async ({ id, name } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (!Validator.isAlphanumeric(name.replace(' ', ''))) throw 'Only letters and numbers are allowed for name'
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
}

export default { fetchDetails, create, modify, activate, deactivate, remove }
