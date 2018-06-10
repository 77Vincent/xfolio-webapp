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
      try {
        const data = await Request.getFollowerFollowings({
          follower_id: userId,
        }).then(res => JSON.parse(res.text))
        log('getFollowingIds res ', data)
        this.updateAccountInfo({
          followingIds: _.reduce(data, (r, v) => {
            r.push(v.following_id)
            return r
          }, []),
        })
      } catch (e) {
        log('getFollowingIds e ', e)
      }
    },
  },
}

export default AccountInfo
