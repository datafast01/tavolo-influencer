
import Vuex from "vuex";

// Modules


import themeStore from "./themeStore";
import profileStore from './profileStore';
import notificationStore from "./notificationStore";




export default new Vuex.Store({
  modules: {
    profileStore,
    notificationStore,
    themeStore
  },
  strict: process.env.DEV,
});
