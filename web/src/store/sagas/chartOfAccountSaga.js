import { put, takeLatest } from 'redux-saga/effects'

import { COA } from '../index'
import { saveCoa, saveNewCoa } from '../actions'

const sudoData = [
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

function* handleCoaFetch() {
	try {
		// const user = yield call(Api.fetchUser, action.payload.userId);
		yield put(saveCoa(sudoData))
	} catch (e) {
		yield put({ type: 'COA.SAVE', message: e.message })
	}
}

function* handleCoaNew(payload) {
	try {
		yield put(saveNewCoa(payload))
	} catch (e) {
		yield put({ type: 'COA.NEW_SAVE', message: e.message })
	}
}

function* watchCoa() {
	yield takeLatest(COA.FETCH, handleCoaFetch)
	yield takeLatest(COA.NEW, handleCoaNew)
}

export default watchCoa
