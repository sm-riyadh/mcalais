const MAIN = {
  SET: 'MAIN_SET',
}
const JOURNAL = {
  SEND: 'JOURNAL_SEND',
  FETCH: {
    _: 'JOURNAL_FETCH',
    MORE: 'JOURNAL_FETCH_MORE',
  },
  REPLACE: {
    _: 'JOURNAL_REPLACE',
  },
  ADD: {
    TOP: 'JOURNAL_ADD_TOP',
    BOTTOM: 'JOURNAL_ADD_BOTTOM',
  },
}
const COA = {
  SEND: 'COA_SEND',
  FETCH: {
    _: 'COA_FETCH',
    LIST: 'COA_FETCH_LIST',
  },
  REPLACE: {
    _: 'COA_REPLACE',
    LIST: 'COA_REPLACE_LIST',
  },
}

export { MAIN, JOURNAL, COA }
