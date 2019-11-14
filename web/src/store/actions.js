import { LEDGER, JOURNAL, COA } from './index'

/*
* Chart of Accounts
*/
const fetchCoa = () => ({
	type: COA.FETCH,
})
const saveCoa = payload => {
	return {
		type: COA.SAVE,
		data: payload,
	}
}
const addNewCoa = payload => {
	return {
		type: COA.NEW,
		data: payload,
	}
}
const saveNewCoa = payload => {
	return {
		type: COA.NEW_SAVE,
		data: payload,
	}
}

/*
* Journal
*/
const fetchJournal = () => ({
	type: JOURNAL.FETCH,
})
const saveJournal = payload => ({
	type: JOURNAL.SAVE,
	data: payload,
})
const addNewJournal = payload => ({
	type: JOURNAL.NEW,
	data: payload,
})
const saveNewJournal = payload => ({
	type: JOURNAL.NEW_SAVE,
	data: payload,
})

/*
* Ledger
*/
const fetchLedger = () => ({
	type: LEDGER.FETCH,
})
const saveLedger = payload => {
	return {
		type: LEDGER.SAVE,
		data: payload,
	}
}
const saveNewLedger = payload => ({
	type: LEDGER.NEW_SAVE,
	data: payload,
})

export {
	// Journal
	fetchJournal,
	saveJournal,
	addNewJournal,
	saveNewJournal,
	// Ledger
	fetchLedger,
	saveLedger,
	saveNewLedger,
	// Chart of accounts
	fetchCoa,
	saveCoa,
	addNewCoa,
	saveNewCoa,
}
