import to from 'await-to'
import _ from 'lodash'

import { updateState, Request } from '../../utils'

const AccountInfo = {
  state: {
    id: null,
    name: null,
    gender: null,
    bio: null,
    mobilephone: null,
    email: null,
    role_id: 2,
    degree_id: null,
    avatar_id: null,
    city: null,
    places: [],
    countries: [],
    schools: [],
    majors: [],
    cost: null,
    followingIds: [], // 已关注用户的 id
    tags: [],
    available: 0,
    students: null,
    students_onboard: null,
  },
  reducers: {
    updateAccountInfo(state, payload) {
      return updateState(state, payload)
    },
    removeFollowingId(state, id) {
      const index = _.indexOf(state.followingIds, id)
      if (index !== -1) {
        state.followingIds.splice(index, 1)
      }
      return state
    },
    addFollowingId(state, id) {
      const index = _.indexOf(state.followingIds, id)
      if (index === -1) {
        state.followingIds.push(id)
      }
      return state
    },
  },
  effects: {
    async getFollowingIds(userId) {
      const [err, body] = await to(Request.getFollowerFollowings({
        follower_id: userId,
      }).then(res => res.text))
      if (!err) {
        this.updateAccountInfo({
          followingIds: _.reduce(body, (r, v) => {
            r.push(v.following_id)
            return r
          }, []),
        })
      }
    },
    async updateUserIfo(data = { userId: null, field: null, value: null }) {
      const { userId, field, value } = data
      const requestData = {
        [field]: value,
      }
      // 发请求更新
      const res = await Request.updateUserInfo(userId, requestData)
      // 更新本地数据
      this.updateAccountInfo(res.body)
    },
    async updateUserCountries(idList) {
      return await Request.createCountries(idList).then((res) => {
        this.updateAccountInfo({
          countries: res.body,
        })
      })
    },
    async updateUserSchools(idList) {
      return await Request.createSchools(idList).then((res) => {
        this.updateAccountInfo({
          schools: res.body,
        })
      })
    },
    async updateUserMajors(idList) {
      return await Request.createMajors(idList).then((res) => {
        this.updateAccountInfo({
          majors: res.body,
        })
      })
    },
    async updateUserPlaces(idList) {
      return await Request.createPlaces(idList).then((res) => {
        this.updateAccountInfo({
          places: res.body,
        })
      })
    },
  },
}

export default AccountInfo
