import { COMPANY } from '../index'

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
    replace    : payload => ({
      type    : COMPANY.SAVE.REPLACE,
      payload,
    }),
    addTop     : payload => ({
      type    : COMPANY.SAVE.ADDTOP,
      payload,
    }),
    addBottom  : payload => ({
      type    : COMPANY.SAVE.ADDBOTTOM,
      payload,
    }),
    modify     : payload => ({
      type    : COMPANY.SAVE.MODIFY,
      payload,
    }),
    activate   : payload => ({
      type    : COMPANY.SAVE.ACTIVATE,
      payload,
    }),
    deactivate : payload => ({
      type    : COMPANY.SAVE.DEACTIVATE,
      payload,
    }),
    remove     : payload => ({
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

export default company
