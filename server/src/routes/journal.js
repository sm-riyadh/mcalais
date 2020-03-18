import Router from 'express'
// import validator from 'validator'
import Journal from '../models/journal'
import Coa from '../models/coa'
// import { Types } from 'mongoose'

// Express > Router
const app = Router()

// Route
const url = 'api/journal'

app.get(`/${url}`, async (req, res) => {
  try {
    const { company, size, page, coa, startDate, endDate } = req.query

    if (!coa) {
      const journal = await Journal.fetch(company, null, size, page, startDate, endDate)
      return res.send(journal)
    } else {
      const journal = await Journal.fetch(company, coa, size, page, startDate, endDate)
      return res.send(journal)
    }
  } catch (err) {
    return res.send('Error: ' + err)
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
      throw Error('Invilid coa code')
    }

    const debitCoa = await Coa.fetchOneByCode(debit)
    const creditCoa = await Coa.fetchOneByCode(credit)

    // if ((liabilities(debit) && assets(credit)) || (equities(debit) && assets(credit))) {
    //   if (amount > debitCoa.balance && amount > creditCoa.balance) {
    //     console.log('Balance Low')

    //     return res.send()
    //   }
    // }
    // if (
    //   (assets(debit) && assets(credit)) ||
    //   (expenses(debit) && assets(credit)) ||
    //   (assets(debit) && expenses(credit))
    // ) {
    //   if (debit.balance - amount < 0) {
    //     console.log('Can not go minus')

    //     return res.send()
    //   }
    // }

    if (incomes(debit) && assets(credit)) {
      console.log('You can not return income silly')

      return res.send()
    }
    if (assets(debit) && expenses(credit)) {
      console.log('You can not take from expenses silly')

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
    return res.send('Error: ' + err)
  }
})

export default app
