import request from 'superagent'

import constDataHolder from '../store/constDataHolder'

function autoSetAuthHeader(req) {
  req.set('authorization', `Bearer ${constDataHolder.apiToken}`)
}

const agent = request.agent().use(autoSetAuthHeader).accept('json')


const Request = {
  // users
  signUp: (values = {}) => {
    return agent.put('/api/users').send(values)
  },
  getUserInfo: (id) => {
    return agent.get(`/api/users/${id}`)
  },
  updateUserInfo: (id, values = {}) => {
    return agent.post(`/api/users/${id}`).send(values)
  },

  // teachers
  getTeachers: (options = {}) => {
    return agent.get('/api/users?role_id=1').query(options)
  },

  // student
  getStudents(teacherId) {
    return agent.get(`/api/users/${teacherId}/students`)
  },

  // follower following
  getFollowerFollowings(options = {}) {
    return agent.get('/api/followers_followings').query(options)
  },
  removeFollowing(followingId) {
    return agent.delete(`/api/followers_followings/${followingId}`)
  },
  addFollowing(followingId) {
    return agent.put('/api/followers_followings').send({
      following_id: followingId,
    })
  },

  // sessions
  signIn: (values = { id: null, password: null }) => {
    return agent.post('/api/sessions').send(values)
  },
  signOut: () => {
    return agent.delete('/api/sessions')
  },

  // avatar
  uploadAvatar(data = { content: null, mime: null }) {
    return agent.put('/api/avatars').send(data)
  },
  updateAvatar(avatarId, data = { content: null, mime: null }) {
    return agent.post(`/api/avatars/${avatarId}`).send(data)
  },

  // order
  createOrder(data) {
    return agent.post('/api/orders').send(data)
  },

  // major
  createMajors(majors) {
    return agent.put('/api/users_majors').send({
      major_id: majors,
    })
  },

  // tag
  createTag(content) {
    return agent.put('/api/tags').send({ content })
  },
  removeTag(tagId) {
    return agent.delete(`/api/tags/${tagId}`)
  },

  /**
   * Get all schools by default, filter or search with querystring
   * @param {string} [id=''] Filter by school ID
   * @param {string} [country_code=''] Filter by country_code
   * @param {string} [search=''] Search
   * @returns {object[]} school(s)
   */
  getSchools(id = '', country_code = '', search = '') {
    return agent.get('/api/schools').query({ id, country_code, search })
  },

  // schedule
  getSchedules(values = {
    teacher_id: undefined, student_id: undefined, page: 1, search: undefined,
  }) {
    return agent.get('/api/schedules').query(values)
  },
}

window.agent = agent
export default Request
export { agent }
