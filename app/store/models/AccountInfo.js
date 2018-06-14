import to from 'await-to'
import _ from 'lodash'

import { updateState, Request } from '../../utils'

const AccountInfo = {
  state: {
    id: null,
    name: null,
    gender: null,
    mobilephone: null,
    email: null,
    role_id: 2,
    place: 'both',
    school_id: null,
    country: null,
    majors: [],
    degree_id: null,
    cost: null,
    followingIds: [], // 已关注用户的 id
    avatar_id: null,
    tags: [],
    available: 0,
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
      const [err, text] = await to(Request.getFollowerFollowings({
        follower_id: userId,
      }).then(res => res.text))
      if (!err) {
        const data = JSON.parse(text)
        this.updateAccountInfo({
          followingIds: _.reduce(data, (r, v) => {
            r.push(v.following_id)
            return r
          }, []),
        })
      }
    },
    updateUserIfo(data = { userId: null, field: null, value: null }) {
      const { userId, field, value } = data
      const requestData = {
        [field]: value,
      }
      // 发请求更新
      return Request.updateUserInfo(userId, requestData).then(() => {
        // 更新本地数据
        this.updateAccountInfo(requestData)
      })
    },
    async updateUserMajors(majors) {
      return await Request.createMajors(majors).then((res) => {
        this.updateAccountInfo({
          majors: res.body,
        })
      })
    },
  },
}

export default AccountInfo
