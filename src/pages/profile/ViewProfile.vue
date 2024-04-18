<template>
  <div>
    <div v-if="loading">
      <Loader />

    </div>

    <VCard variant="tonal" class="mt-4" v-else>
      <VCardText>
        <div class="d-flex justify-space-between align-center">

          <div class="d-flex align-center">
            <div>
              <div class="relative" style="position: relative">
                <div v-if="userProfile.avatar">
                  <v-avatar :image="'http://16.171.214.197:8081/' + userProfile.avatar" size="180"
                    class="custom-avatar"></v-avatar>
                </div>
                <div v-else>

                  <v-avatar size="180" class="custom-avatar">
                    <img :src="avatar" alt="Default Image" />
                  </v-avatar>
                </div>
                <!-- <div class="edit-profile" @click="openFileInput">
                  <v-icon>mdi-pencil</v-icon>
                </div> -->
                <v-btn class="edit-profile" @click="openFileInput" icon="mdi-pencil" variant="outlined"
                  :loading="profileImageLoader"></v-btn>
              </div>

              <div class="file-upload-form">
                <input ref="fileInput" type="file" @change="previewImage" accept="image/*" style="display: none" />
              </div>
            </div>

            <div class="d-flex flex-column">

              <span>
                <span class="f-22"> {{ userProfile.firstName }} {{ userProfile.lastName }} </span>

                <img :src="verified" alt="" srcset="" />
              </span>
              <span> @socialmediausername </span>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div>
              <span style="color: #9155fd"> 2.7k </span>
              <span> Followers </span>
            </div>
            <div>
              <v-rating :model-value="3.5" color="yellow-darken-3" half-increments density="compact"
                readonly></v-rating>
            </div>
          </div>
        </div>
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="space-between">
          <v-tab value="0">Bio</v-tab>
          <v-tab value="1">Projects</v-tab>

          <v-tab value="2">Pricing</v-tab>

          <v-tab value="3">Testimonials</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="0">
            <InfluencerBio :details="details" />
          </v-window-item>
          <v-window-item value="1">
            <Projects />
          </v-window-item>

          <v-window-item value="2">
            <InfuPricing />
          </v-window-item>
          <v-window-item value="3">
            <Testemonials />
          </v-window-item>
        </v-window>
      </VCardText>
    </VCard>
  </div>
</template>

<script>


import { ref, watch } from "vue";
import avatar from "@/assets/images/avatars/avatar-1.png";
import verified from "@/assets/images/svg/verified.svg";

import InfluencerBio from "./InfuBio.vue";

import InfuPricing from "./InfuPricing.vue";

import Testemonials from "./Testemonials.vue";
import Projects from "./Projects.vue";
import axios from '@axios'
import store from "@/store/index.js";
import { useToast } from "vue-toastification";



export default {
  components: { InfluencerBio, InfuPricing, Testemonials, Projects },
  data() {
    return {
      tab: 0,
      location: 'California',
      toast: useToast(),
      avatar: avatar,
      profileImageLoader: false

    }
  },
  computed: {
    userProfile() {
      return store.getters.userProfile;
    },
    loading() {
      return store.getters.profileLoading
    }
  },
  methods: {
    openFileInput() {
      // Programmatically trigger the click event of the file input
      const fileInput = document.querySelector('input[type="file"]');
      fileInput.click();
    },
    previewImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {

        let data = new FormData();
        data.append("file", input.files[0]);
        this.profileImageLoader = true
        axios
          .post(`update-profile-image`, data)
          .then(response => {
            console.log("user", response.data.avatar);
            this.profileImageLoader = false
            this.userProfile.avatar = response.data.avatar
            this.toast.success("Profile Image Changed Successfully!");

          })
          .catch(err => {
            console.log(err);
            this.profileImageLoader = false
          });

      }
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
  },
  mounted() {

    if (this.isEmpty(this.userProfile)) {

      store.dispatch("getProfile");
      store.dispatch("listNotifications");


    }
  }

}





</script>

<style scoped>
.custom-avatar {
  border: 5px solid #9155fd;
  /* Set the border width and color as per your requirements */
  box-sizing: content-box;
  /* Adjust box-sizing if needed */
  margin: 20px;
}

.edit-profile {
  border: 2px solid #8d53f6;
  padding: 7px;
  border-radius: 37px;
  position: absolute;
  bottom: 22px;
  right: 21px;
  color: #8d53f6;
  z-index: 20;
}

::v-deep .v-slide-group__content {
  justify-content: space-between;
}
</style>
