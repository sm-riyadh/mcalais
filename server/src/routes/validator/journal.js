import Validator from 'validator'

import Account from '../../models/account'

// CODE: Fetch

const fetch = async ({ company, size, page, type, start_date, end_date } = {}) => {
  if (!company) throw 'Company is required'

  if (!Validator.isMongoId(company)) throw 'Wrong company ID'
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
  if (!Validator.isMongoId(company)) throw 'Wrong company ID'
  if (!company) throw 'Company is required'
  if (!credit) throw 'Credit is required'
  if (!debit) throw 'Debit is required'
  if (!amount) throw 'Amount is required'

  if (!Validator.isISO8601(date)) throw 'Invalid date'
  if (!Validator.isNumeric(amount + '')) throw 'Invalid amount'
  if (!Validator.isMongoId(credit)) throw 'Invalid credit'
  if (!Validator.isMongoId(debit)) throw 'Invalid debit'

  if (!Validator.isAlphanumeric(credit_note.split(' ').join('')))
    throw 'Only letters and numbers are allowed for credit note'
  if (!Validator.isAlphanumeric(debit_note.split(' ').join('')))
    throw 'Only letters and numbers are allowed for debit note'
  if (!Validator.isAlphanumeric(description.split(' ').join('')))
    throw 'Only letters and numbers are allowed for description'
  if (!Validator.isAlphanumeric(comment.split(' ').join(''))) throw 'Only letters and numbers are allowed for comment'

  if (!await Account.fetchOne(credit)) throw error('Credit does not exist')
  if (!await Account.fetchOne(debit)) throw error('Debit does not exist')

  // NOTE: Checks transaction possiblity

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

  const assets = async id => (await Account.fetchOne(id)).type === 'assets'
  const liabilities = async id => (await Account.fetchOne(id)).type === 'liabilities'
  const equities = async id => (await Account.fetchOne(id)).type === 'equities'
  const expenses = async id => (await Account.fetchOne(id)).type === 'expenses'
  const incomes = async id => (await Account.fetchOne(id)).type === 'incomes'

  if ((await incomes(debit)) && (await assets(credit))) {
    throw 'Can not make transactions between Assets and Incomes'
  }
  if ((await assets(debit)) && (await expenses(credit))) {
    throw 'Can not make transactions between Assets and Expenses'
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
