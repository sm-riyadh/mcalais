import { put, takeLatest } from 'redux-saga/effects'

import { LEDGER } from '../index'
import { saveLedger, saveNewLedger } from '../actions'

const sudoData = [
	{
		code: '100001',
		name: 'Cash-in-Hand',
		checkable: true,
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},

		transactions: [],
	},
	{
		code: '100002',
		name: 'Bank',
		checkable: true,
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},

		transactions: [],
	},
	{
		code: '100003',
		name: 'Receivable',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},

		transactions: [],
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
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},

		transactions: [],
	},
	{
		code: '150002',
		name: 'Utility',
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},

		transactions: [],
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
		debit: 0,
		credit: 0,
		attributes: {
			isCheckable: true,
		},

		transactions: [],
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

function* handleLedgerFetch() {
	try {
		// const user = yield call(Api.fetchUser, action.payload.userId);
		yield put(saveLedger(sudoData))
	} catch (e) {
		yield put({ type: 'LEDGER.SAVE', message: e.message })
	}
}

function* handleLedgerNew(payload) {
	console.log('object')
	try {
		yield put(saveNewLedger(payload))
	} catch (e) {
		yield put({ type: 'LEDGER.SAVE', message: e.message })
	}
}

function* watchLedger() {
	yield takeLatest(LEDGER.FETCH, handleLedgerFetch)
	yield takeLatest(LEDGER.NEW_SAVE, handleLedgerNew)
}

export default watchLedger
