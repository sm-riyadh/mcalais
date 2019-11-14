import Router from 'express'
import validator from 'validator'
// import { Types } from 'mongoose'

// Express > Router
const app = Router()
// CHECK SERVER STATUS
app.get('/', (req, res) => res.send('Server is working :}'))

// Journal
const sudoData = [
	{
		date: 1573720806213,
		destination: '21100',
		source: '100002',
		amount: 234234,
	},
	{
		date: 1573720802301,
		destination: '100001',
		source: '100003',
		amount: 324,
	},
	{
		date: 1573720800014,
		destination: '100001',
		source: '100005',
		amount: 234,
	},
	{
		date: 1573720800014,
		destination: '100002',
		source: '31100',
		amount: 10000,
	},
]

const sudoDataLedge = [
	{
		code: '100001',
		name: 'Cash-in-Hand',
		checkable: true,
		debit: 0,
		credit: 47094,
		attributes: {
			isCheckable: true,
		},
		transactions: [
			{
				journalEntry: 4,
				date: 1573734555831,
				particular: '100003',
				debit: null,
				credit: 23434,
			},
			{
				journalEntry: 3,
				date: 1573734553375,
				particular: '100003',
				debit: null,
				credit: 23423,
			},
			{
				journalEntry: 2,
				date: 1573734551023,
				particular: '100003',
				debit: null,
				credit: 24,
			},
			{
				journalEntry: 1,
				date: 1573734548479,
				particular: '100002',
				debit: null,
				credit: 213,
			},
		],
	},
	{
		code: '100002',
		name: 'Bank',
		checkable: true,
		debit: 213,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [
			{
				journalEntry: 1,
				date: 1573734548479,
				particular: '100001',
				debit: 213,
				credit: null,
			},
		],
	},
	{
		code: '100003',
		name: 'Receivable',
		debit: 46881,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [
			{
				journalEntry: 3,
				date: 1573734555831,
				particular: '100001',
				debit: 23434,
				credit: null,
			},
			{
				journalEntry: 2,
				date: 1573734553375,
				particular: '100001',
				debit: 23423,
				credit: null,
			},
			{
				journalEntry: 1,
				date: 1573734551022,
				particular: '100001',
				debit: 24,
				credit: null,
			},
		],
	},
	{
		code: '100005',
		name: 'Inventory',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [],
	},
	{
		code: '150001',
		name: 'Property',
		debit: 2342353,
		credit: 324324,
		attributes: {
			isCheckable: true,
		},
		transactions: [
			{
				journalEntry: 2,
				date: 1573734566951,
				particular: '150002',
				debit: 2342353,
				credit: null,
			},
			{
				journalEntry: 1,
				date: 1573734560118,
				particular: '21200',
				debit: null,
				credit: 324324,
			},
		],
	},
	{
		code: '150002',
		name: 'Utility',
		debit: 0,
		credit: 2342353,
		attributes: {
			isCheckable: true,
		},
		transactions: [
			{
				journalEntry: 1,
				date: 1573734566951,
				particular: '150001',
				debit: null,
				credit: 2342353,
			},
		],
	},
	{
		code: '21100',
		name: 'Payable',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [],
	},
	{
		code: '21200',
		name: 'Wages',
		debit: 324324,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [
			{
				journalEntry: 1,
				date: 1573734560118,
				particular: '150001',
				debit: 324324,
				credit: null,
			},
		],
	},
	{
		code: '22100',
		name: 'Loan',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [],
	},
	{
		code: '22200',
		name: 'Mortage',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [],
	},
	{
		code: '31100',
		name: 'Capital',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [],
	},
	{
		code: '31200',
		name: 'Wages',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [],
	},
	{
		code: '32100',
		name: 'Earnings',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [],
	},
	{
		code: '32200',
		name: 'Reserves',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},
		transactions: [],
	},
]
const daySub = day => 25 * 60 * 60 * 1000 * day

app.get('/journal', (req, res) => {
	let journal = sudoDataLedge.filter(e => e.transactions.length !== 0)
	let p = []
	journal.map(r => {
		r.transactions.map(e => {
			const jo = {
				journalEntry,
				date,
				debit_ac: r.name,
				credit_ac: e.name,
				amount,
			}
			p = [ ...p, jo ]
		})
	})

	return res.send(p)
})
// date >= +e.data - daySub(1)
app.post('/journal/new', (req, res) => {
	const { date, destination, source, amount } = req.body
	const data = { date, destination, source, amount }

	// Validation
	try {
		if (
			!(
				validator.isNumeric(data.amount) &&
				validator.isNumeric(data.amount) &&
				validator.isNumeric(data.destination) &&
				validator.isNumeric(data.destination)
			)
		)
			throw e
	} catch (e) {
		return res.send('LOL')
	}

	const addedData = [ data, ...sudoData ]

	return res.send(addedData)
})

export default app
