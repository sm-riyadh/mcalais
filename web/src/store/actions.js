import { LEDGER, JOURNAL, ACCOUNT } from './index'

/*
 * Chart of Accounts
 */
const fetchAccount = () => ({
  type: ACCOUNT.FETCH,
})
const saveAccount = payload => ({
  type: ACCOUNT.SAVE,
  data: payload,
})
const addAccount = payload => ({
  type: ACCOUNT.ADD,
  data: payload,
})
const sumbitChange = payload => ({
  type: ACCOUNT.CHANGE,
  data: payload,
})
/*
 * Journal
 */
const fetchJournal = payload => ({
  type: JOURNAL.FETCH,
  data: payload,
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
const fetchLedger = payload => ({
  type: LEDGER.FETCH,
  data: payload,
})
const saveLedger = payload => ({
  type: LEDGER.SAVE,
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
  // Chart of accounts
  fetchAccount,
  saveAccount,
  addAccount,
  sumbitChange,
}
