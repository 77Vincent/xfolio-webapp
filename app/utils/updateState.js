import _ from 'lodash'

export default function updateState(state, payload) {
  _.forEach(_.entries(payload), ([key, value]) => {
    if (key in state) {
      state[key] = value
    }
  })
  return state
}
