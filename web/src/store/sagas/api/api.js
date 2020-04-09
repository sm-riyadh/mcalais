import Axios from './axios-instance'

// CODE: FETCH

const fetch = async payload => {
  try {
    const url = payload[0]
    const { params = '', query } = payload[1]

    const { data } = await Axios({
      method : 'GET',
      url    : `/${url}/${params.join('/')}`,
      params : {
        ...query,
      },
    })

    return { data }
  } catch (error) {
    return { error: error }
  }
}

// CODE: Create

const create = async payload => {
  try {
    const url = payload[0]
    const { body } = payload[1]

    const { data } = await Axios({
      method : 'POST',
      url    : `/${url}`,
      data   : {
        ...body,
      },
    })

    return { data }
  } catch (error) {
    return { error: error }
  }
}

// CODE: Modify

const modify = async payload => {
  try {
    const url = payload[0]
    const { params = '', body } = payload[1]

    const { data } = await Axios({
      method : 'PATCH',
      url    : `/${url}/${params.join('/')}`,
      data   : {
        ...body,
      },
    })

    return { data }
  } catch (error) {
    return { error: error }
  }
}

// CODE: Replace

const replace = async payload => {
  try {
    const url = payload[0]
    const { params = '', body } = payload[1]

    const { data } = await Axios({
      method : 'PUT',
      url    : `/${url}/${params.join('/')}`,
      data   : {
        ...body,
      },
    })

    return { data }
  } catch (error) {
    return { error: error }
  }
}

// CODE: Activate

const activate = async payload => {
  try {
    const url = payload[0]
    const { params = '' } = payload[1]

    const { data } = await Axios({
      method : 'PATCH',
      url    : `/${url}/${params.join('/')}/activate`,
    })

    return { data }
  } catch (error) {
    return { error: error }
  }
}

// CODE: Deactivate

const deactivate = async payload => {
  try {
    const url = payload[0]
    const { params = '' } = payload[1]

    const { data } = await Axios({
      method : 'patch',
      url    : `/${url}/${params.join('/')}/deactivate`,
    })

    return { data }
  } catch (error) {
    return { error: error }
  }
}

// CODE: Remove

const remove = async payload => {
  try {
    const url = payload[0]
    const { params = '' } = payload[1]

    const { data } = await Axios({
      method : 'DELETE',
      url    : `/${url}/${params.join('/')}`,
    })

    return { data }
  } catch (error) {
    return { error: error }
  }
}

export default { fetch, create, modify, replace, activate, deactivate, remove }
