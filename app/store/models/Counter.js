const Counter = {
  state: {
    value: 0,
    userInfo: {
      name: 'xx',
      age: 12,
    },
  },
  reducers: {
    increment(state, payload) {
      state += payload
      return state
    },
    updateUserAge(state, newAge) {
      state.userInfo.age = newAge
      return state
    },
  },
  effects: {
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    },
  },
}

export default Counter
