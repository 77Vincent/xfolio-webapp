import { USER_ROLE } from '../../Consts'
import { updateState } from '../../utils'

const AccountInfo = {
  state: {
    nickName: 'default',
    mobileNumber: 13000000000,
    userRole: USER_ROLE.TEACHER,
  },
  reducers: {
    updateAccountInfo(state, payload) {
      return updateState(state, payload)
    },
  },
  effects: {
  },
}

export default AccountInfo
