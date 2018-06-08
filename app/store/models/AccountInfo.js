import { updateState } from '../../utils'

const AccountInfo = {
  state: {
    id: 8,
    name: 'xx',
    gender: 1,
    mobilephone: '18511870271',
    email: 'xxx@xx.com',
    roleId: 3,
    place: 'both',
    school: null,
    country: null,
    majors: [],
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
