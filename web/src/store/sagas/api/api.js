import Axios from './axios-instance'

// CODE: FETCH

const fetch = async payload => {
  try {
    const url = payload[0]
    const { params, query } = payload[1]

    const { data } = await Axios({
      method : 'get',
      url    : `/${url}/${params}`,
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
      method : 'post',
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
    const { params, body } = payload[1]

    const { data } = await Axios({
      method : 'patch',
      url    : `/${url}${params}`,
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
    const { params, body } = payload[1]

    const { data } = await Axios({
      method : 'put',
      url    : `/${url}${params}`,
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
    const { params } = payload[1]

    const { data } = await Axios({
      method : 'patch',
      url    : `/${url}/${params}/activate`,
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
    const { params } = payload[1]

    const { data } = await Axios({
      method : 'patch',
      url    : `/${url}/${params}/deactivate`,
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
    const { params } = payload[1]

    const { data } = await Axios({
      method : 'delete',
      url    : `/${url}/${params}`,
    })

    return { data }
  } catch (error) {
    return { error: error }
  }
}

export default { fetch, create, modify, replace, activate, deactivate, remove }
