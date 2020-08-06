const app = {
  state: {
    theme:"#85a",
    // theme:"#1576c5",
  },
  mutations: {
    SET_THEME: (state, theme) => {
      state.theme = theme
    }
  },
  actions: {
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme)
    }
  }
}

export default app
