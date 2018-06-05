import _ from 'lodash'

const createFetchConfig = (method = 'GET', body = {}) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body,
})

const Request = {
  // users
  getUser: async (filter = {}) => {
    let queryString = ''
    _.forEach(_.keys(filter), (key) => {
      queryString += `&${key}=${filter[key].toString()}`
    })
    return await window.fetch(`/api/users?${queryString.slice(1)}`)
  },
  signUp: async (values) => {
    const res = await window.fetch(
      '/api/users',
      createFetchConfig('PUT', JSON.stringify(values)),
    )
    return res
  },
  userUpdate: async (values) => {
    const res = await window.fetch(
      `/api/users/${values.id}`,
      createFetchConfig('POST', JSON.stringify(values)),
    )
    return res
  },
  logout: async () => {
    const res = await window.fetch(
      '/api/users',
      createFetchConfig('DELETE'),
    )
    return res
  },

  // sessions
  signIn: async (values = { id: null, password: null }) => {
    const res = await window.fetch(
      '/api/sessions',
      createFetchConfig('POST', JSON.stringify(values)),
    )
    return res
  },
  signOut: async () => {
    const res = await window.fetch(
      '/api/sessions',
      createFetchConfig('DELETE'),
    )
    return res
  },
}

export default Request
