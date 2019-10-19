import { JOURNAL, COA } from '../'

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

const sendJournals = payload => {
	return {
		type: JOURNAL.SEND,
		data: payload,
	}
}
const loadJournals = payload => ({
	type: JOURNAL.LOAD,
	data: payload,
})

export { sendJournals, loadJournals, sendCoa, loadCoa }
