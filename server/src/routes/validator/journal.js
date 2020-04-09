import Validator from 'validator'

import Account from '../../models/account'

// CODE: Fetch

const fetch = async ({ company, size, page, type, start_date, end_date } = {}) => {
  // if (!Validator.isMongoId(company_id)) throw 'Wrong company ID'
  if (!company) throw 'Company is required'

  if (size && !await Validator.isNumeric(size + '')) throw 'Invalid date'
  if (page && !await Validator.isNumeric(page + '')) throw 'Invalid date'
  if (start_date && !await Validator.isISO8601(start_date)) throw 'Invalid starting date'
  if (end_date && !await Validator.isISO8601(end_date)) throw 'Invalid ending date'

  if (
    type &&
    type !== 'journal' &&
    type !== 'assets' &&
    type !== 'liabilities' &&
    type !== 'equities' &&
    type !== 'expenses' &&
    type !== 'incomes'
  )
    throw 'Account type must be one of this: journal, assets, liabilities, equities, expenses or incomes'
}

const fetchDetails = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}
// CODE: Create

const create = async ({ date, company, credit, credit_note, debit, debit_note, description, amount, comment } = {}) => {
  // if (!Validator.isMongoId(company_id)) throw 'Wrong company ID'
  if (!company) throw 'Company is required'

  if (!Validator.isISO8601(date)) throw 'Invalid date'
  if (!Validator.isNumeric(amount + '')) throw 'Invalid date'
  if (!Validator.isNumeric(credit + '')) throw 'Invalid credit'
  if (!Validator.isNumeric(debit + '')) throw 'Invalid debit'
  if (!Validator.isAlphanumeric(credit_note.split(' ').join('')))
    throw 'Only letters and numbers are allowed for credit note'
  if (!Validator.isAlphanumeric(debit_note.split(' ').join('')))
    throw 'Only letters and numbers are allowed for debit note'
  if (!Validator.isAlphanumeric(description.split(' ').join('')))
    throw 'Only letters and numbers are allowed for description'
  if (!Validator.isAlphanumeric(comment.split(' ').join(''))) throw 'Only letters and numbers are allowed for comment'

  // FIXIT: transform code into ids
  if ((await Account.fetch(company, { code: credit })).length === 0) throw 'Invalid credit'
  if ((await Account.fetch(company, { code: debit })).length === 0) throw 'Invalid debit'

  // NOTE: Checks transaction possiblity

  const assets = type => type > 100000 && type < 200000
  // const liabilities = type => type > 200000 && type < 300000
  // const equities = type => type > 300000 && type < 400000
  const expenses = type => type > 400000 && type < 500000
  const incomes = type => type > 500000 && type < 600000

  if (!await Account.isExist(credit) || !await Account.isExist(debit)) {
    throw error('Invilid account code')
  }

  // const debitAccount = await Account.fetchOneByCode(debit)
  // const creditAccount = await Account.fetchOneByCode(credit)

  // if ((liabilities(debit) && assets(credit)) || (equities(debit) && assets(credit))) {
  //   if (amount > debitAccount.balance && amount > creditAccount.balance) {

  //     return res.send()
  //   }
  // }
  // if (
  //   (assets(debit) && assets(credit)) ||
  //   (expenses(debit) && assets(credit)) ||
  //   (assets(debit) && expenses(credit))
  // ) {
  //   if (debit.balance - amount < 0) {

  //     return res.send()
  //   }
  // }

  if (incomes(debit) && assets(credit)) {
    throw "Can't make transactions between Assets and Incomes"
  }
  if (assets(debit) && expenses(credit)) {
    throw "Can't make transactions between Assets and Expenses"
  }
}

// CODE: Modify

const modify = async ({ id, date, credit_note, debit_note, description, comment } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
  if (!Validator.isISO8601(date)) throw 'Invalid date'
  if (!Validator.isAlphanumeric(credit_note.split(' ').join('')))
    throw 'Only letters and numbers are allowed for credit note'
  if (!Validator.isAlphanumeric(debit_note.split(' ').join('')))
    throw 'Only letters and numbers are allowed for debit note'
  if (!Validator.isAlphanumeric(description.split(' ').join('')))
    throw 'Only letters and numbers are allowed for description'
  if (!Validator.isAlphanumeric(comment.split(' ').join(''))) throw 'Only letters and numbers are allowed for comment'
}

const activate = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

const deactivate = async ({ id } = {}) => {
  if (!Validator.isMongoId(id)) throw 'Wrong ID'
}

export default { fetch, fetchDetails, create, modify, activate, deactivate }
