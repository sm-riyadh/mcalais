import { MAIN, JOURNAL, ACCOUNT, COMPANY } from './index'
import { JOURNAL } from './index'

// const updateMain = (name, payload) => ({
//   type    : MAIN.SET,
//   name,
//   payload,
// })

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
    remove     : payload => ({
      type    : JOURNAL.SEND.REMOVE,
      payload,
    }),
  },
  save   : {
    replace   : payload => ({
      type    : JOURNAL.SAVE.FETCH,
      payload,
    }),
    addTop    : payload => ({
      type    : JOURNAL.SAVE.ADDTOP,
      payload,
    }),
    addBottom : payload => ({
      type    : JOURNAL.SAVE.ADDBOTTOM,
      payload,
    }),
    modify    : payload => ({
      type    : JOURNAL.SAVE.MODIFY,
      payload,
    }),
    remove    : payload => ({
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

// CODE: Account

const account = {
  send   : {
    fetch      : payload => ({
      type    : ACCOUNT.SEND.FETCH,
      payload,
    }),
    create     : payload => ({
      type    : ACCOUNT.SEND.CREATE,
      payload,
    }),
    modify     : payload => ({
      type    : ACCOUNT.SEND.MODIFY,
      payload,
    }),
    activate   : payload => ({
      type    : ACCOUNT.SEND.ACTIVATE,
      payload,
    }),
    deactivate : payload => ({
      type    : ACCOUNT.SEND.DEACTIVATE,
      payload,
    }),
    remove     : payload => ({
      type    : ACCOUNT.SEND.REMOVE,
      payload,
    }),
  },
  save   : {
    replace   : payload => ({
      type    : ACCOUNT.SAVE.FETCH,
      payload,
    }),
    addTop    : payload => ({
      type    : ACCOUNT.SAVE.ADDTOP,
      payload,
    }),
    addBottom : payload => ({
      type    : ACCOUNT.SAVE.ADDBOTTOM,
      payload,
    }),
    modify    : payload => ({
      type    : ACCOUNT.SAVE.MODIFY,
      payload,
    }),
    remove    : payload => ({
      type    : ACCOUNT.SAVE.REMOVE,
      payload,
    }),
  },
  status : {
    request : payload => ({
      type    : ACCOUNT.STATUS.REQUEST,
      payload,
    }),
    success : payload => ({
      type    : ACCOUNT.STATUS.SUCCESS,
      payload,
    }),
    failed  : payload => ({
      type    : ACCOUNT.STATUS.FAILED,
      payload,
    }),
  },
}

// CODE: Company

const company = {
  send   : {
    fetch      : payload => ({
      type    : COMPANY.SEND.FETCH,
      payload,
    }),
    create     : payload => ({
      type    : COMPANY.SEND.CREATE,
      payload,
    }),
    modify     : payload => ({
      type    : COMPANY.SEND.MODIFY,
      payload,
    }),
    activate   : payload => ({
      type    : COMPANY.SEND.ACTIVATE,
      payload,
    }),
    deactivate : payload => ({
      type    : COMPANY.SEND.DEACTIVATE,
      payload,
    }),
    remove     : payload => ({
      type    : COMPANY.SEND.REMOVE,
      payload,
    }),
  },
  save   : {
    replace   : payload => ({
      type    : COMPANY.SAVE.FETCH,
      payload,
    }),
    addTop    : payload => ({
      type    : COMPANY.SAVE.ADDTOP,
      payload,
    }),
    addBottom : payload => ({
      type    : COMPANY.SAVE.ADDBOTTOM,
      payload,
    }),
    modify    : payload => ({
      type    : COMPANY.SAVE.MODIFY,
      payload,
    }),
    remove    : payload => ({
      type    : COMPANY.SAVE.REMOVE,
      payload,
    }),
  },
  status : {
    request : payload => ({
      type    : COMPANY.STATUS.REQUEST,
      payload,
    }),
    success : payload => ({
      type    : COMPANY.STATUS.SUCCESS,
      payload,
    }),
    failed  : payload => ({
      type    : COMPANY.STATUS.FAILED,
      payload,
    }),
  },
}

export { journal, account, company }
