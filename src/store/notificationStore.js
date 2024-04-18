
import axios from "@axios";


export default {

    state: {
        notifications: [],

        loading: false,

    },

    mutations: {


        setNotifications(state, data) {
            state.notifications = data
        },


    },
    actions: {
        listNotifications({ commit, state }) {

            axios
                .get(`notification/list`)
                .then((response) => {
                    console.log(response)

                    commit('setNotifications', response.data.data)
                })
                .catch((err) => {
                    console.log(err);

                });
        },
    },
    getters: {

        getnotification(state) {
            return state.notifications
        },


    },
}
