import request from 'superagent'

import constDataHolder from '../store/constDataHolder'

const agent = request.agent().accept('json')

const Request = {
  // users
  signUp: (values = {}) => {
    return agent.put('/api/users').send(values)
  },
  getUserInfo: (id) => {
    return agent.get(`/api/users/${id}`)
  },
  updateUserInfo: (id, values = {}) => {
    return agent.post(`/api/users/${id}`).send(values).set('authorization', `Bearer ${constDataHolder.apiToken}`)
  },

  // teachers
  getTeachers: (options = {}) => {
    return agent.get('/api/users?role_id=1').query(options)
  },

  // follower following
  getFollowerFollowings(options = {}) {
    return agent.get('/api/followers_followings').query(options)
  },
  removeFollowing(followingId) {
    return agent.delete(`/api/followers_followings/${followingId}`).set('authorization', `Bearer ${constDataHolder.apiToken}`)
  },
  addFollowing(followingId) {
    return agent.put('/api/followers_followings').send({
      following_id: followingId,
    }).set('authorization', `Bearer ${constDataHolder.apiToken}`)
  },

  // sessions
  signIn: (values = { id: null, password: null }) => {
    return agent.post('/api/sessions').send(values)
  },
  signOut: () => {
    return agent.delete('/api/sessions')
  },
}

window.agent = agent
export default Request
export { agent }
