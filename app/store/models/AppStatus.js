const AppStatus = {
  state: {
    teacherFilterInited: false,
  },
  reducers: {
    updateTeacherFilterInitStatus(state, inited) {
      state.teacherFilterInited = inited
      return state
    },
  },
  effects: {
  },
}

export default AppStatus
