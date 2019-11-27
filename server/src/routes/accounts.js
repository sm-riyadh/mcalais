import Router from 'express'
import validator from 'validator'
import util from './utility'
import Accounts from '../models/accounts'

// Express > Router
const app = Router()

// Route
const url = 'accounts'

// Fetch
app.get(`/${url}`, async (req, res) => {
	try {
		// Fetch all
		const accounts = await Accounts.fetchAll()

		return res.send(accounts)
	} catch (err) {
		return res.send('Error: ' + err)
	}
})

// Push new
app.post(`/${url}`, async (req, res) => {
	const { name, type } = req.body

	try {
		if (type !== 'Asset' && type !== 'Liability' && type !== 'Equity') throw 'Wrong Type'

		// Generating Code
		let code
		if (type === 'Asset') code = 100000
		else if (type === 'Liability') code = 200000
		else if (type === 'Equity') code = 300000

		const accounts = await Accounts.create({ name, type, code })

		return res.send(accounts)
	} catch (err) {
		return res.send('Error: ' + err)
	}
})

// Delete
app.delete(`/${url}`, async (req, res) => {
	const id = req.params.id
	console.log('$: id', req.params)

	try {
		const accounts = await Accounts.remove(id)
		return res.send()
	} catch (err) {
		return res.send('Error: ' + err)
	}
})

export default app
