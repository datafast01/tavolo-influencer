
import Vuex from "vuex";

// Modules


import themeStore from "./themeStore";



export default new Vuex.Store({
  modules: {
   
  
   themeStore
  },
  strict: process.env.DEV,
});
