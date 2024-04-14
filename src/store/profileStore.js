
import axios from "@axios";


export default {

    state: {
        cloverClientId: null,
        cloverCode: null,
        cloverMerchantId: null,
        userProfile: {},
        loading: false,

    },

    mutations: {


        setUserProfile(state, data) {
            state.userProfile = data
        },
        setLoading(state, loading) {
            state.loading = loading
        }

    },
    actions: {
        getProfile({ commit, state }) {
            commit('setLoading', true)
            axios
                .get(`getProfile`)
                .then((response) => {
                    commit('setUserProfile', response.data)
                    commit('setLoading', false)
                })
                .catch((err) => {
                    console.log(err);
                    commit('setLoading', false)
                });
        },
    },
    getters: {

        userProfile(state) {
            return state.userProfile
        },
        profileLoading(state) {
            return state.loading
        }

    },
}
