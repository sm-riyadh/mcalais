import Router from 'express'
// import validator from 'validator'
import Journal from '../models/journal'
import Coa from '../models/coa'
// import { Types } from 'mongoose'

// Express > Router
const app = Router()

// Route
const url = 'api/journal'

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { company, size, page, coa, type, start_date, end_date } = req.query

    if (!coa) {
      const journal = await Journal.fetch(company, type, null, size, page, start_date, end_date)
      return res.send(journal)
    } else {
      const journal = await Journal.fetch(company, type, coa, size, page, start_date, end_date)
      return res.send(journal)
    }
  } catch (err) {
    return next(err)
  }
})

const assets = type => type > 100000 && type < 200000
const liabilities = type => type > 200000 && type < 300000
const equities = type => type > 300000 && type < 400000
const expenses = type => type > 400000 && type < 500000
const incomes = type => type > 500000 && type < 600000

app.post(`/${url}`, async (req, res) => {
  const { date, company, credit, credit_note, debit, debit_note, description = '', amount, comment = '' } = req.body

  try {
    if (!await Coa.isExist(credit) || !await Coa.isExist(debit)) {
      throw error('Invilid coa code')
    }

    const debitCoa = await Coa.fetchOneByCode(debit)
    const creditCoa = await Coa.fetchOneByCode(credit)

    // if ((liabilities(debit) && assets(credit)) || (equities(debit) && assets(credit))) {
    //   if (amount > debitCoa.balance && amount > creditCoa.balance) {

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
      return res.send()
    }
    if (assets(debit) && expenses(credit)) {
      return res.send()
    }

    const newJournal = await Journal.create({
      date,
      company,
      credit      : {
        code : creditCoa.code,
        name : creditCoa.name,
        note : credit_note,
      },
      debit       : {
        code : debitCoa.code,
        name : debitCoa.name,
        note : debit_note,
      },
      description,
      amount,
      comment,
    })

    return res.send(newJournal)
  } catch (err) {
    return res.send('error: ' + err)
  }
})

export default app
