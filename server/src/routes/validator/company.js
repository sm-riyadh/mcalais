import Validator from 'validator'

const fetch = async ({}) => {}

const create = async ({ name }) => {
  if (!Validator.isAlphanumeric(name)) throw 'Only letters and numbers are allowed for name'
}

const modify = async ({ id, name }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (!Validator.isAlphanumeric(name)) throw 'Only letters and numbers are allowed for name'
}

const remove = async ({ id }) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

export { fetch, create, modify, remove }
