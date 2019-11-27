import Router from 'express'
import validator from 'validator'
// import { Types } from 'mongoose'
import sudoData from '../sudoLedger'

// Express > Router
const app = Router()
// Ledger

app.get('/ledger', (req, res) => {
  // const { size } = req.query
  // try {
  //   if (!validator.isNumeric(size)) throw e
  // } catch (e) {
  //   return res.send('LOL')
  // }

  return res.send(sudoData)
})
// date >= +e.data - daySub(1)
// app.post('/journal', (req, res) => {
//   const { time, debit, credit, amount } = req.body

//   // Validation
//   try {
//     if (
//       !(
//         validator.isNumeric(time) &&
//         validator.isNumeric(debit) &&
//         validator.isNumeric(credit) &&
//         validator.isNumeric(amount)
//       )
//     )
//       throw e
//   } catch (e) {
//     return res.send('LOL')
//   }

//   let data = { id: 999, time, debit: +debit, credit: +credit, amount: +amount }
//   data = [data, ...sudoData]

//   return res.send(trimData(data))
// })

// app.delete('/journal', (req, res) => {
//   const { id } = req.query
//   try {
//     if (!validator.isNumeric(id)) throw e
//   } catch (e) {
//     return res.send('LOL')
//   }

//   let data = [...sudoData]
//   data = trimData(data, 0, 10)
//   data = data.filter(item => item.id !== +id)

//   return res.send(trimData(data, 0, 10))
// })

export default app
