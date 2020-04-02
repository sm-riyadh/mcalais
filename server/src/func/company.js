import Company from '../models/company'
import Tree from '../models/tree'

const fetch = async ({}) => {
  const company = await Company.fetch()

  return company
}
const create = async ({ name }) => {
  const newCompany = await Company.create({ name })

  await Tree.update(newCompany.name, newTree)

  return newCompany
}
const modify = async ({ id, name }) => {
  const modifiedCompany = await Company.modify(id, name)

  return modifiedCompany
}
const remove = async ({ id }) => {
  const disabledCompany = await Company.disable(id)
  // const removedCompany = await Company.remove(id)

  return disabledCompany
  // return removedCompany
}

export { fetch, create, modify, remove }
