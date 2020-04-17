import { ACCOUNT } from '../index'

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
    replace    : payload => ({
      type    : ACCOUNT.SAVE.REPLACE,
      payload,
    }),
    addTop     : payload => ({
      type    : ACCOUNT.SAVE.ADDTOP,
      payload,
    }),
    addBottom  : payload => ({
      type    : ACCOUNT.SAVE.ADDBOTTOM,
      payload,
    }),
    modify     : payload => ({
      type    : ACCOUNT.SAVE.MODIFY,
      payload,
    }),
    activate   : payload => ({
      type    : ACCOUNT.SAVE.ACTIVATE,
      payload,
    }),
    deactivate : payload => ({
      type    : ACCOUNT.SAVE.DEACTIVATE,
      payload,
    }),
    remove     : payload => ({
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

export default account
