import Router from 'express'
import validator from 'validator'
// import { Types } from 'mongoose'
import sudoData from '../sudoLedger'

// Express > Router
const app = Router()
// CHECK SERVER STATUS
app.get('/', (req, res) => res.send('Server is working :}'))

// LEDGER

const trimData = (data, start = 0, end = 50 ) => {
	const trimmedData = []

	for(let i = start; i < end; i++)
		trimmedData.push(data[i])

	return trimmedData
} 


app.get('/ledger', (req, res) => {
	const {size} = req.query
	try {
		if (!(validator.isNumeric(size)))
			throw e
	} catch (e) {
		return res.send('LOL')
	}

	return res.send(trimData(sudoData, undefined, req.query.size))
})
// date >= +e.data - daySub(1)
app.post('/ledger', (req, res) => {
	const { time, debit, credit, amount } = req.body
	
	// Validation	
	try {
		if (
			!(
				validator.isNumeric(time) &&
				validator.isNumeric(debit) &&
				validator.isNumeric(credit) &&
				validator.isNumeric(amount)
			)
		)
			throw e
	} catch (e) {
		return res.send('LOL')
	}

	let data = { id: 999, time, debit: +debit, credit: +credit, amount: +amount }
	data = [ data, ...sudoData ]

	return res.send(trimData(data))
})

app.delete('/ledger', (req, res) => {
	const {id} = req.query
	try {
		if (!(validator.isNumeric(id)))
			throw e
	} catch (e) {
		return res.send('LOL')
	}

	let data = [ ...sudoData ]
	data = trimData(data, 0, 10)
	data = data.filter(item => item.id !== +id)

	return res.send(trimData(data, 0, 10))
})

export default app
