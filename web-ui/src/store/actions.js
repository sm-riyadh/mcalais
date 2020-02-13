import { MAIN, JOURNAL, COA } from './index'

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
const saveJournal = payload => ({
  type: JOURNAL.REPLACE._,
  payload,
})

const fetchJournalMore = payload => ({
  type: JOURNAL.FETCH.MORE,
  payload,
})
const saveJournalMore = payload => ({
  type: JOURNAL.ADD._,
  payload,
})

/*
 * COA
 */
const fetchCoa = payload => ({
  type: COA.FETCH._,
  payload,
})
const saveCoa = payload => ({
  type: COA.REPLACE._,
  payload,
})
const fetchCoaList = payload => ({
  type: COA.FETCH.LIST,
  payload,
})
const saveCoaList = payload => ({
  type: COA.REPLACE.LIST,
  payload,
})

export {
  // Main
  updateMain,
  // JOURNAL
  fetchJournal,
  saveJournal,
  fetchJournalMore,
  saveJournalMore,
  // COA
  fetchCoa,
  saveCoa,
  fetchCoaList,
  saveCoaList,
}
