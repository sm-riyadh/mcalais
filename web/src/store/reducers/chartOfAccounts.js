// import { COA } from '../index'

const initialState = [
	{
		code: '11100',
		name: 'Cash',
		checkable: true,
		debit: 0,
		credit: 0,

		stack: [
			{
				code: '11101',
				name: 'Cash-in-Hand',
				checkable: true,
				debit: 0,
				credit: 0,
			},
		],
	},
	{
		code: '11200',
		name: 'Bank',
		checkable: true,
		debit: 0,
		credit: 0,

		stack: [
			{
				code: '11101',
				name: 'A Bank',
				checkable: true,
				debit: 0,
				credit: 0,
			},
			{
				code: '11101',
				name: 'B Bank',
				checkable: true,
				debit: 0,
				credit: 0,
			},
		],
	},
	{
		code: '11300',
		name: 'Receivable',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '11400',
		name: 'Inventory',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '12100',
		name: 'Property',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '12200',
		name: 'Utility',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '21100',
		name: 'Payable',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '21200',
		name: 'Wages',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '22100',
		name: 'Loan',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '22200',
		name: 'Mortage',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '31100',
		name: 'Capital',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '31200',
		name: 'Wages',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '32100',
		name: 'Earnings',
		debit: 0,
		credit: 0,

		stack: [],
	},
	{
		code: '32200',
		name: 'Reserves',
		debit: 0,
		credit: 0,

		stack: [],
	},
]

const chartOfAccounts = (state = initialState, action) => {
	return state
	// switch (action.type) {
	// 	case COA.LOAD:
	// 		return {
	// 			...state,
	// 			[action.id]: {
	// 				isLoading: true,
	// 				downloads: null,
	// 				error: false,
	// 			},
	// 		}
	// 	default:
	// 		return state
	// }
}

export default chartOfAccounts
