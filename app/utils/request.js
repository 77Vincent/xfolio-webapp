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
  getTeachers: (query = {}) => {
    return agent.get('/api/users?role_id=1').query(query)
  },

  // student
  getStudents(teacherId, options = {}) {
    return agent.get(`/api/users/${teacherId}/students`).query(options)
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

  // avatars
  uploadAvatar(data = { content: null, mime: null }) {
    return agent.put('/api/avatars').send(data)
  },
  updateAvatar(avatarId, data = { content: null, mime: null }) {
    return agent.post(`/api/avatars/${avatarId}`).send(data)
  },

  // orders
  createOrder(data) {
    return agent.post('/api/orders').send(data)
  },

  // Countries
  getCountries(query = {}) {
    return agent.get('/api/countries').query(query)
  },
  createCountries(idList) {
    return agent.put('/api/users_countries').send({ country_id: idList })
  },

  // Schools
  getSchools(query = {}) {
    return agent.get('/api/schools').query(query)
  },
  createSchools(idList) {
    return agent.put('/api/users_schools').send({ school_id: idList })
  },

  // Majors
  getMajors(query = {}) {
    return agent.get('/api/majors').query(query)
  },
  createMajors(idList) {
    return agent.put('/api/users_majors').send({ major_id: idList })
  },

  // Places
  getPlaces(query = {}) {
    return agent.get('/api/places').query(query)
  },
  createPlaces(idList) {
    return agent.put('/api/users_places').send({ place_id: idList })
  },

  // Cities
  getCities(query = {}) {
    return agent.get('/api/districts').query(query)
  },
  createCity(userId, cityId) {
    return agent.post(`/api/users/${userId}`).send({ city: cityId })
  },

  // tags
  createTag(content) {
    return agent.put('/api/tags').send({ content })
  },
  removeTag(tagId) {
    return agent.delete(`/api/tags/${tagId}`)
  },

  // schedules
  getSchedules(values = {
    teacher_id: undefined, student_id: undefined, page: 1, search: undefined,
  }) {
    return agent.get('/api/schedules').query(values)
  },

  // classes
  getClasses(values = {
    schedule_id: undefined,
  }) {
    return agent.get('/api/classes').query(values)
  },
  createClass(values = {
    schedule_id: undefined,
  }) {
    return agent.put('/api/classes').send(values)
  },
  deleteClass(classId) {
    return agent.delete(`/api/classes/${classId}`)
  },
  updateClass(classId, values = {}) {
    return agent.post(`/api/classes/${classId}`).send(values)
  },

  // courses
  searchCourse(values = {
    user_id: null,
    search: null,
  }) {
    return agent.get('/api/courses').query(values)
  },
  updateCourse(courseId, values = {}) {
    return agent.post(`/api/courses/${courseId}`).send(values)
  },

  // classes courses
  addCourseForClass(value = {
    class_id: undefined,
    course_id: undefined,
  }) {
    return agent.put('/api/classes_courses').send(value)
  },
}

window.agent = agent
export default Request
export { agent }
