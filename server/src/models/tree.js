import mongoose from 'mongoose'

const TreeSchema = new mongoose.Schema([
  {
    company : {
      type     : String,
      required : true,
    },
    tree    : {
      assets      : [],
      liabilities : [],
      equities    : [],
      expenses    : [],
      incomes     : [],
    },
  },
])
TreeSchema.methods.toJSON = function() {
  const { tree } = this.toObject()
  return tree
}
TreeSchema.statics.fetchOne = company => Tree.findOne({ company })

TreeSchema.statics.update = (company, payload) =>
  Tree.replaceOne({ company }, { company, tree: payload }, { upsert: true })

const Tree = mongoose.model('Tree', TreeSchema)

export default Tree
