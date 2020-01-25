// import { LEDGER, JOURNAL, ACCOUNT, CATAGORY } from './index'
import { JOURNAL } from './index'
/*
 * Journal
 */
const fetchJournalInit = payload => ({
  type: JOURNAL.FETCH.INIT,
  payload,
})
const fetchJournalMore = payload => ({
  type: JOURNAL.FETCH.MORE,
  payload,
})
const fetchJournalOfAccount = payload => ({
  type: JOURNAL.FETCH.ACCOUNT,
  payload,
})
const saveJournalInit = payload => ({
  type: JOURNAL.SAVE.INIT,
  payload,
})
const saveJournalMore = payload => ({
  type: JOURNAL.SAVE.MORE,
  payload,
})
const saveJournalOfAccount = payload => ({
  type: JOURNAL.SAVE.ACCOUNT,
  payload,
})

export {
  // Journal
  fetchJournalInit,
  fetchJournalMore,
  fetchJournalOfAccount,
  saveJournalInit,
  saveJournalMore,
  saveJournalOfAccount,

  // Ledger
  // fetchLedger,
  // saveLedger,
  // // Chart of accounts
  // fetchCatagory,
  // saveCatagory,
  // fetchAccount,
  // saveAccount,
  // addAccount,
  // sumbitChange,
}
