import { LEDGER, JOURNAL, ACCOUNT } from './index'

/*
 * Chart of Accounts
 */
const fetchAccount = () => ({
  type: ACCOUNT.FETCH,
})
const saveAccount = payload => {
  return {
    type: ACCOUNT.SAVE,
    data: payload,
  }
}
const addAccount = payload => {
  return {
    type: ACCOUNT.ADD,
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
}
