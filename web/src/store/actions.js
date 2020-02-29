import { MAIN, JOURNAL, COA, COMPANY } from './index'

/*
 * Main
 */
const updateMain = (name, payload) => ({
  type: MAIN.SET,
  name,
  payload,
})

/*
 * JOURNAL
 */
const fetchJournal = payload => ({
  type: JOURNAL.FETCH._,
  payload,
})
const fetchJournalMore = payload => ({
  type: JOURNAL.FETCH.MORE,
  payload,
})

const sendJournal = payload => ({
  type: JOURNAL.SEND,
  payload,
})

const saveJournal = payload => ({
  type: JOURNAL.REPLACE._,
  payload,
})
const saveJournalOnTop = payload => ({
  type: JOURNAL.ADD.TOP,
  payload,
})
const saveJournalOnBottom = payload => ({
  type: JOURNAL.ADD.BOTTOM,
  payload,
})

/*
 * COA
 */
const fetchCoa = payload => ({
  type: COA.FETCH._,
  payload,
})
const fetchCoaList = payload => ({
  type: COA.FETCH.LIST,
  payload,
})
const sendCoa = payload => ({
  type: COA.SEND,
  payload,
})
const saveCoa = payload => ({
  type: COA.REPLACE._,
  payload,
})
const saveCoaList = payload => ({
  type: COA.REPLACE.LIST,
  payload,
})

/*
 * COMPANY
 */
const fetchCompany = () => ({
  type: COMPANY.FETCH,
})
const sendCompany = payload => ({
  type: COMPANY.SEND,
  payload,
})
const saveCompany = payload => ({
  type: COMPANY.REPLACE,
  payload,
})

export {
  // Main
  updateMain,
  // JOURNAL
  fetchJournal,
  fetchJournalMore,
  sendJournal,
  saveJournal,
  saveJournalOnTop,
  saveJournalOnBottom,
  // COA
  fetchCoa,
  saveCoa,
  fetchCoaList,
  sendCoa,
  saveCoaList,
  // COMPANY
  fetchCompany,
  sendCompany,
  saveCompany,
}
