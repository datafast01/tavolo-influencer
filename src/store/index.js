
import Vuex from "vuex";

// Modules


import themeStore from "./themeStore";
import profileStore from './profileStore';




export default new Vuex.Store({
  modules: {
    profileStore,

    themeStore
  },
  strict: process.env.DEV,
});
