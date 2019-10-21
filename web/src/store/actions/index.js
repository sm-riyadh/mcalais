import { LEDGERS, JOURNALS, COA } from '../'

const sendCoa = payload => {
	return {
		type: COA.SEND,
		data: payload,
	}
}
const loadCoa = payload => ({
	type: COA.LOAD,
	data: payload,
})

const sendLedgers = payload => {
	return {
		type: LEDGERS.SEND,
		data: payload,
	}
}
const loadLedgers = payload => ({
	type: LEDGERS.LOAD,
	data: payload,
})

const sendJournals = payload => {
	return {
		type: JOURNALS.SEND,
		data: payload,
	}
}
const loadJournals = payload => ({
	type: JOURNALS.LOAD,
	data: payload,
})

export { sendJournals, loadJournals, sendLedgers, loadLedgers, sendCoa, loadCoa }
