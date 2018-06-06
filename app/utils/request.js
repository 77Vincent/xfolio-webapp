import request from 'superagent'

const Request = {
  // users
  signUp: (values = {}) => {
    return request.put('/api/users').send(values)
  },
  getUserInfo: (id) => {
    return request.get(`/api/users/${id}`)
  },

  // sessions
  signIn: (values = { id: null, password: null }) => {
    return request.post('/api/sessions').send(values)
  },
  signOut: () => {
    return request.delete('/api/sessions')
  },
}

export default Request
