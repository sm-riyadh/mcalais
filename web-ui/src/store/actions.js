import { JOURNAL, LEDGER } from './index'

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
const saveJournal = payload => ({
  type: JOURNAL.REPLACE._,
  payload,
})
const saveJournalMore = payload => ({
  type: JOURNAL.ADD._,
  payload,
})

/*
 * LEDGER
 */
const fetchLedgerList = () => ({
  type: LEDGER.FETCH.LIST,
})
const saveLedgerList = payload => ({
  type: LEDGER.REPLACE.LIST,
  payload,
})

export {
  // JOURNAL
  fetchJournal,
  fetchJournalMore,
  saveJournal,
  saveJournalMore,
  saveLedgerList,
  // LEDGER
  fetchLedgerList,
}
