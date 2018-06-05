const AppStatus = {
  state: {
    teacherFilterInited: false,
    alreadySignIn: false,
  },
  reducers: {
    updateTeacherFilterInitStatus(state, inited) {
      state.teacherFilterInited = inited
      return state
    },
    updateUserSignInStatus(state, signin) {
      state.alreadySignIn = signin === true
      return state
    },
  },
  effects: {
  },
}

export default AppStatus
