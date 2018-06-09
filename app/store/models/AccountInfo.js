import { updateState } from '../../utils'

const AccountInfo = {
  state: {
    id: null,
    name: null,
    gender: null,
    mobilephone: null,
    email: null,
    role_id: 2,
    place: 'both',
    school: null,
    country: null,
    majors: [],
    degree_id: null,
    cost: null,
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
