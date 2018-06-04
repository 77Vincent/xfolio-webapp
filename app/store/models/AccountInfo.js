import _ from 'lodash'

import { USER_ROLE } from '../../Consts'

const AccountInfo = {
  state: {
    nickName: 'default',
    mobileNumber: 13000000000,
    userRole: USER_ROLE.STUDENT,
  },
  reducers: {
    updateUserRole(state, role) {
      state.userRole = role
      return state
    },
    updateNickName(state, nickname) {
      state.nickName = nickname
      return state
    },
    updateMobileNumber(state, mobileNumber) {
      state.mobileNumber = mobileNumber
      return state
    },
    update(state, diff) {
      _.forEach(_.entries(diff), ([key, value]) => {
        if (key in state) {
          state[key] = value
        }
      })
      return state
    },
  },
  effects: {
  },
}

export default AccountInfo
