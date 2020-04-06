import Tree from '../models/tree'

const fetch = async ({ company }) => {
  const tree = await Tree.fetchOne(company)

  return tree
}
const create = async ({}) => {}
const replace = async ({ company, tree }) => {
  const updatedTree = await Tree.update(company, tree)

  return updatedTree
}
const modify = async ({}) => {}

const remove = async ({}) => {}

export default { fetch, create, replace, modify, remove }
