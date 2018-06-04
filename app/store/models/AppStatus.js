const AppStatus = {
  state: {
    teacherFilterInited: true,
    alreadySignIn: true,
  },
  reducers: {
    updateTeacherFilterInitStatus(state, inited) {
      state.teacherFilterInited = inited
      return state
    },
    updateUserSignInStatus(state, signin) {
      state.alreadySignIn = signin
      return state
    },
  },
  effects: {
  },
}

export default AppStatus
