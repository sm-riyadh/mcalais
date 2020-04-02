import { MAIN, JOURNAL, ACCOUNT, COMPANY } from './index'

/*
 * Main
 */
const updateMain = (name, payload) => ({
  type    : MAIN.SET,
  name,
  payload,
})

/*
 * JOURNAL
 */
const fetchJournal = payload => ({
  type    : JOURNAL.FETCH._,
  payload,
})
const fetchJournalMore = payload => ({
  type    : JOURNAL.FETCH.MORE,
  payload,
})

const sendJournal = payload => ({
  type    : JOURNAL.SEND,
  payload,
})

const saveJournal = payload => ({
  type    : JOURNAL.REPLACE._,
  payload,
})
const updateJournal = payload => ({
  type    : JOURNAL.UPDATE.INPUT,
  payload,
})
const saveJournalOnTop = payload => ({
  type    : JOURNAL.ADD.TOP,
  payload,
})
const saveJournalOnBottom = payload => ({
  type    : JOURNAL.ADD.BOTTOM,
  payload,
})

/*
 * ACCOUNT
 */
const fetchAccount = payload => ({
  type    : ACCOUNT.FETCH._,
  payload,
})
const fetchAccountList = payload => ({
  type    : ACCOUNT.FETCH.LIST,
  payload,
})
const sendAccount = payload => ({
  type    : ACCOUNT.SEND,
  payload,
})
const removeAccount = payload => ({
  type    : ACCOUNT.REMOVE,
  payload,
})

const saveAccount = payload => ({
  type    : ACCOUNT.REPLACE._,
  payload,
})
const saveAccountList = payload => ({
  type    : ACCOUNT.REPLACE.LIST,
  payload,
})

/*
 * COMPANY
 */
const fetchCompany = () => ({
  type : COMPANY.FETCH,
})
const sendCompany = payload => ({
  type    : COMPANY.SEND,
  payload,
})
const saveCompany = payload => ({
  type    : COMPANY.REPLACE,
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
  removeAccount,
  updateJournal,
  saveJournalOnTop,
  saveJournalOnBottom,
  // ACCOUNT
  fetchAccount,
  saveAccount,
  fetchAccountList,
  sendAccount,
  saveAccountList,
  // COMPANY
  fetchCompany,
  sendCompany,
  saveCompany,
}
