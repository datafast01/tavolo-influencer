


export default {
  
  state: {
    currentTheme: localStorage.getItem('-theme')
    

  },

  mutations: {
    changeTheme(state, val){
        state.currentTheme = val
    }
  
  },
 
    getters: {
      getTheme(state) {
        console.log(state, 'this is state')
      return state.currentTheme
    }
    },
}
