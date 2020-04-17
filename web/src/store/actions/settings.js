import { SETTINGS } from '../index'

// CODE: Settings

const settings = {
  send   : {
    fetch  : payload => ({
      type    : SETTINGS.SEND.FETCH,
      payload,
    }),
    modify : payload => ({
      type    : SETTINGS.SEND.MODIFY,
      payload,
    }),
  },
  save   : {
    replace : payload => ({
      type    : SETTINGS.SAVE.REPLACE,
      payload,
    }),
    modify  : payload => ({
      type    : SETTINGS.SAVE.MODIFY,
      payload,
    }),
  },
  status : {
    request : payload => ({
      type    : SETTINGS.STATUS.REQUEST,
      payload,
    }),
    success : payload => ({
      type    : SETTINGS.STATUS.SUCCESS,
      payload,
    }),
    failed  : payload => ({
      type    : SETTINGS.STATUS.FAILED,
      payload,
    }),
  },
}

export default settings
