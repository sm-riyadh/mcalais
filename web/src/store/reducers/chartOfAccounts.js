import { COA } from '..'

const initialState = [
	{
		code: '100001',
		name: 'Cash-in-Hand',
		checkable: true,
		debit: 0,
		credit: 0,
	},
	{
		code: '100002',
		name: 'Bank',
		checkable: true,
		debit: 0,
		credit: 0,
	},
	{
		code: '100003',
		name: 'Receivable',
		debit: 0,
		credit: 0,
	},
	{
		code: '100005',
		name: 'Inventory',
		debit: 0,
		credit: 0,
	},
	{
		code: '150001',
		name: 'Property',
		debit: 0,
		credit: 0,
	},
	{
		code: '150002',
		name: 'Utility',
		debit: 0,
		credit: 0,
	},
	{
		code: '21100',
		name: 'Payable',
		debit: 0,
		credit: 0,
	},
	{
		code: '21200',
		name: 'Wages',
		debit: 0,
		credit: 0,
	},
	{
		code: '22100',
		name: 'Loan',
		debit: 0,
		credit: 0,
	},
	{
		code: '22200',
		name: 'Mortage',
		debit: 0,
		credit: 0,
	},
	{
		code: '31100',
		name: 'Capital',
		debit: 0,
		credit: 0,
	},
	{
		code: '31200',
		name: 'Wages',
		debit: 0,
		credit: 0,
	},
	{
		code: '32100',
		name: 'Earnings',
		debit: 0,
		credit: 0,
	},
	{
		code: '32200',
		name: 'Reserves',
		debit: 0,
		credit: 0,
	},
]

const chartOfAccounts = (state = initialState, action) => {
	switch (action.type) {
		case COA.LOAD:
			let netAmount = 0
			action.data.amount.map(amount => (netAmount += +amount))
			console.log(netAmount)

			state.filter(e => e.code === action.data.destination)[0].debit += netAmount

			action.data.source.map((source, i) =>
				state.filter(e => e.code === source).map(data => (data.credit += +action.data.amount[i]))
			)

		// return [ action.data, ...state ]
		default:
			return state
	}
}

export default chartOfAccounts
