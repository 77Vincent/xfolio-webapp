import { updateState } from '../../utils'

const AccountInfo = {
  state: {
    id: -1,
    mobilephone: null,
    roleId: null,
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
