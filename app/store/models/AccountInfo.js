import to from 'await-to'

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
      log('getFollowingIds ', userId)
      const [err, text] = await to(Request.getFollowerFollowings({
        follower_id: userId,
      }).then(res => res.text))
      if (!err) {
        const data = JSON.parse(text)
        log('getFollowingIds res ', err, data)
        this.updateAccountInfo({
          followingIds: _.reduce(data, (r, v) => {
            r.push(v.following_id)
            return r
          }, []),
        })
      }
    },
    async updateUserMajors(majors) {
      log('updateUserMajors ', majors)
      return await Request.createMajors(majors).then(() => {
        log('createMajors success')
      })
    },
  },
}

export default AccountInfo
