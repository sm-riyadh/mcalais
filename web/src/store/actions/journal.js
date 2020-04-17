import { JOURNAL } from '../index'

// CODE: Journal

const journal = {
  send   : {
    fetch      : payload => ({
      type    : JOURNAL.SEND.FETCH,
      payload,
    }),
    create     : payload => ({
      type    : JOURNAL.SEND.CREATE,
      payload,
    }),
    modify     : payload => ({
      type    : JOURNAL.SEND.MODIFY,
      payload,
    }),
    activate   : payload => ({
      type    : JOURNAL.SEND.ACTIVATE,
      payload,
    }),
    deactivate : payload => ({
      type    : JOURNAL.SEND.DEACTIVATE,
      payload,
    }),
  },
  save   : {
    replace    : payload => ({
      type    : JOURNAL.SAVE.REPLACE,
      payload,
    }),
    addTop     : payload => ({
      type    : JOURNAL.SAVE.ADDTOP,
      payload,
    }),
    addBottom  : payload => ({
      type    : JOURNAL.SAVE.ADDBOTTOM,
      payload,
    }),
    modify     : payload => ({
      type    : JOURNAL.SAVE.MODIFY,
      payload,
    }),
    activate   : payload => ({
      type    : JOURNAL.SAVE.ACTIVATE,
      payload,
    }),
    deactivate : payload => ({
      type    : JOURNAL.SAVE.DEACTIVATE,
      payload,
    }),
    remove     : payload => ({
      type    : JOURNAL.SAVE.REMOVE,
      payload,
    }),
  },
  status : {
    request : payload => ({
      type    : JOURNAL.STATUS.REQUEST,
      payload,
    }),
    success : payload => ({
      type    : JOURNAL.STATUS.SUCCESS,
      payload,
    }),
    failed  : payload => ({
      type    : JOURNAL.STATUS.FAILED,
      payload,
    }),
  },
}

export default journal
