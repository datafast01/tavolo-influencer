<template>
  <div>
    <VRow>
      <VCol cols="12" md="3">
        <v-select
          :items="[
            'California',
            'Colorado',
            'Florida',
            'Georgia',
            'Texas',
            'Wyoming',
          ]"
          variant="solo-filled"
          dense
          v-model="location"
        >
          <template #prepend-inner>
            <v-icon color="#9155FD"> mdi-map-marker </v-icon>
          </template>
        </v-select>
      </VCol>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <VCol>
        <v-btn drak class="mr-3">
          <v-icon size="x-large">mdi-message-outline</v-icon>
        </v-btn>
        <v-btn>Hire</v-btn>
      </VCol>
    </VRow>
    <VCard variant="tonal" class="mt-4">
      <VCardText>
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <v-avatar
              :image="avatar"
              size="180"
              class="custom-avatar"
            ></v-avatar>
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
          <v-tab value="3">Performance</v-tab>
          <v-tab value="4">Pricing</v-tab>

          <v-tab value="5">Testimonials</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="1">
            <InfluencerBio :details="details" />
          </v-window-item>
          <v-window-item value="2"> Projects component </v-window-item>
          <v-window-item value="3"> <Performance /> </v-window-item>
          <v-window-item value="4"> <InfuPricing /> </v-window-item>
          <v-window-item value="5"> <Testemonials /> </v-window-item>
        </v-window>
      </VCardText>
    </VCard>
  </div>
</template>

<script>
import avatar from "@/assets/images/avatars/avatar-1.png";
import verified from "@/assets/images/svg/verified.svg";

import InfluencerBio from "./components/influencerBio.vue";

import InfuPricing from "./components/infuPricing.vue";
import Performance from "./components/performance.vue";
import Testemonials from "./components/testemonials.vue";
export default {
  components: { InfluencerBio, Testemonials, InfuPricing, Performance },
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
};
</script>

<style scoped>
.custom-avatar {
  border: 5px solid #9155fd; /* Set the border width and color as per your requirements */
  box-sizing: content-box; /* Adjust box-sizing if needed */
  margin: 20px;
}

::v-deep .v-slide-group__content {
  justify-content: space-between;
}
</style>
