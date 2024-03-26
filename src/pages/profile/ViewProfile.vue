<template>
  <div>
    <VRow>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <VCol class="align-self-center">
        <div class="d-flex align-center justify-center">
          <v-btn>Edit Profile Details</v-btn>
        </div>
      </VCol>
    </VRow>
    <VCard variant="tonal" class="mt-4">
      <VCardText>
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <div>
              <div class="relative" style="position: relative">
                <div v-if="imageData.length > 0">
                  <v-avatar
                    :image="imageData"
                    size="180"
                    class="custom-avatar"
                  ></v-avatar>
                </div>
                <div v-else>
                  <!-- Show default image or placeholder if no image uploaded -->
                  <v-avatar size="180" class="custom-avatar">
                    <img :src="avatar" alt="Default Image" />
                  </v-avatar>
                </div>
                <div class="edit-profile" @click="openFileInput">
                  <v-icon>mdi-pencil</v-icon>
                </div>
              </div>

              <div class="file-upload-form">
                <input
                  ref="fileInput"
                  type="file"
                  @change="previewImage"
                  accept="image/*"
                  style="display: none"
                />
              </div>
            </div>

            <div class="d-flex flex-column">
              <span>
                <span class="f-22"> Name Surname </span>

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
              <v-rating
                :model-value="3.5"
                color="yellow-darken-3"
                half-increments
                density="compact"
                readonly
              ></v-rating>
            </div>
          </div>
        </div>
        <v-tabs
          v-model="tab"
          color="deep-purple-accent-4"
          align-tabs="space-between"
        >
          <v-tab value="1">Bio</v-tab>
          <v-tab value="2">Projects</v-tab>

          <v-tab value="3">Pricing</v-tab>

          <v-tab value="4">Testimonials</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="1">
            <InfluencerBio :details="details" />
          </v-window-item>
          <v-window-item value="2"> Projects component </v-window-item>

          <v-window-item value="3">
            <InfuPricing />
          </v-window-item>
          <v-window-item value="4">
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
export default {
  components: { InfluencerBio, Testemonials, InfuPricing },
  data() {
    return {
      verified: verified,
      avatar: avatar,
      location: "California",
      tab: null,
      details: [
        {
          heading: "ABOUT",
  
          desc: "Biography: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nulla eget ipsum feugiat feugiat. Sed semper libero metus, sit amet commodo magna pulvinar a. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor.",
        },
        {
          heading: "PROFESSION",
          desc: "PROFESSION: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nulla eget ipsum feugiat feugiat. Sed semper libero metus, sit amet commodo magna pulvinar a. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor.",
        },
        {
          heading: "EDUCATION",
          desc: "EDUCATION: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nulla eget ipsum feugiat feugiat. Sed semper libero metus, sit amet commodo magna pulvinar a. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor.",
        },
        {
          heading: "EXPERIENCE",
          desc: "EXPERIENCE: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nulla eget ipsum feugiat feugiat. Sed semper libero metus, sit amet commodo magna pulvinar a. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor.",
        },
        {
          heading: "INTERESTS",
          desc: "INTERESTS: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nulla eget ipsum feugiat feugiat. Sed semper libero metus, sit amet commodo magna pulvinar a. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor.",
        },
        {
          heading: "ACHIEVEMENTS",
          desc: "ACHIEVEMENTS: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nulla eget ipsum feugiat feugiat. Sed semper libero metus, sit amet commodo magna pulvinar a. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor.",
        },
        {
          heading: "SOCIAL ACCOUNTS",
          accounts: [
            { account: "Facebook", connected: false },
            { account: "Instagram", connected: false },
            { account: "Tiktok", connected: false },
          ],
          desc: "Biography: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis nulla eget ipsum feugiat feugiat. Sed semper libero metus, sit amet commodo magna pulvinar a. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor. Suspendisse nec varius dui, sit amet elementum sem. Duis ut elit sed elit iaculis venenatis eu eu sem. Vestibulum vitae ipsum tortor.",
        },
      ],
    };
  },
  setup() {
    const imageData = ref("");

    const previewImage = (event) => {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageData.value = e.target.result;
          // Store the image data in local storage
          localStorage.setItem("imageData", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    };

    const openFileInput = () => {
      // Programmatically trigger the click event of the file input
      const fileInput = document.querySelector('input[type="file"]');
      fileInput.click();
    };

    // Retrieve the image data from local storage when the component is mounted
    onMounted(() => {
      const storedImageData = localStorage.getItem("imageData");
      if (storedImageData) {
        imageData.value = storedImageData;
      }
    });

    return {
      imageData,
      previewImage,
      openFileInput,
    };
  },
};
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
