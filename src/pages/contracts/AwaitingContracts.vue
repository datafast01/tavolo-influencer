<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>

    <!-- <v-row justify="end" class="pb-3">
      <v-col cols="3" class="float-right">
        <v-text-field style="width: 200px" label="Search" append-inner-icon="mdi-magnify" variant="solo-filled"
          class="float-right"></v-text-field>
      </v-col>
      <v-col cols="3">
        <dropdown />
      </v-col>
    </v-row> -->


    <!-- SECTION data table -->

    <VDataTableServer v-model:items-per-page="options.itemsPerPage" v-model:page="options.page" :items="contracts"
      :headers="headers" class="" :loading="isLoading" item-key="key">
      <!-- Seegments -->
      <!-- <template #item.profilePhoto="{ item }">
          <div class="py-3">fullName</div>
        </template> -->

      <template #item.title="{ item }">
        <span class="text-sm">
          {{ item.contractDetails.title }}
        </span>
      </template>
      <template #item.status="{ item }">
        <VChip :color="item.status == 'pending' ? 'primary' : item.status == 'active' ? 'success' : 'error'"
          :class="`text-${item.status == 'pending' ? 'primary' : item.status == 'active' ? 'success' : 'error'}`"
          size="small" class="font-weight-medium">
          {{ item.status == 'pending' ? 'Pending' : item.status == 'active' ? 'Active' : 'Cancelled' }}
        </VChip>
      </template>
      <template #item.restaurantName="{ item }">
        <span class="text-sm">
          {{ item.resturantOwnerId.restaurantName }}
        </span>
      </template>

      <template #item.contractDetails="{ item }">
        <span class="text-sm">
          {{ item.contractDetails.dateOfAgreement }}
        </span>
      </template>

      <template #item.paymentPlan="{ item }">
        <div class="d-flex flex-column">
          <span class="text-sm">
            {{ item.contractDetails.paymentPlan }}
          </span>
          <small>
            {{ item.pricing }}
          </small>
        </div>
      </template>

      <template #item.details="{ item }"><v-btn elevation="24" size="small">
          DETAILS
          <v-icon>mdi-chevron-down</v-icon>
          <VMenu activator="parent">
            <VList>

              <VListItem @click="sendRequest()">
                <VListItemTitle>Chat</VListItemTitle>
              </VListItem>
              <VListItem @click="viewDetails(item)">
                <template #prepend>
                  <!-- <VIcon icon="mdi-delete-outline" /> -->
                </template>
                <VListItemTitle>Details</VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </v-btn>
      </template>

      <!-- Pagination -->
      <template #bottom>
        <!-- <VDivider /> -->

        <div class="d-flex justify-end gap-x-6 pa-2 flex-wrap">
          <div class="d-flex align-center gap-x-2 text-sm">
            Rows Per Page:
            <VSelect v-model="options.itemsPerPage" class="per-page-select text-high-emphasis" variant="plain"
              density="compact" :items="[10, 20, 25, 50, 100]" />
          </div>

          <div class="d-flex gap-x-2 align-center me-2">
            <VBtn icon="mdi-chevron-left" class="flip-in-rtl" variant="text" density="comfortable" color="default"
              :disabled="options.page <= 1" @click="options.page <= 1 ? (options.page = 1) : options.page--" />

            <VBtn icon="mdi-chevron-right" class="flip-in-rtl" density="comfortable" variant="text" color="default"
              :disabled="options.page >= Math.ceil(totalUsers / options.itemsPerPage)
                " @click="
                    options.page >= Math.ceil(totalUsers / options.itemsPerPage)
                      ? (options.page = Math.ceil(
                        totalUsers / options.itemsPerPage
                      ))
                      : options.page++
                    " />
          </div>
        </div>
      </template>
    </VDataTableServer>

    <!-- SECTION -->

    <VDialog v-model="showModal" max-width="700">
      <!-- Dialog Activator -->

      <!-- Dialog Content -->
      <VCard class="pa-3">
        <DialogCloseBtn variant="text" size="small" @click="showModal = false" />
        <VCardText class="text-center text-h5">Send Revision Request<br />
          <span class="text-body-2">For File ‘Lorem Ipsum’</span>
        </VCardText>
        <VCardText>
          <VRow>
            <VCol cols="2"></VCol>
            <VCol cols="8">
              <VCard class="pa-3">
                <div class="me-3 py-1 d-flex align-center justify-space-between">
                  <div rounded class="d-flex align-center justifycenter">
                    <div class="bg-darken2">
                      <v-img :src="play1" height="20" width="20" alt="John"></v-img>
                    </div>
                    <div>
                      <h4 class="text-subtitle-1 l-h">File Name</h4>
                      <span class="font-12">2.8 GB</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-body-2">Yesterday</div>
                  </div>
                </div>
              </VCard>
              <v-textarea v-model="text" label="Comments" row-height="25" rows="5" variant="outlined" auto-grow shaped
                class="pt-8"></v-textarea>

              <div class="text-center pt-6">
                <VBtn color="primary mr-4 " @click="sendCampaign">
                  SEND
                </VBtn>
                <VBtn color="secondary" @click="showModal = false">
                  Cancel
                </VBtn>
              </div>
            </VCol>
            <VCol cols="2"></VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>


  </section>
</template>

<script setup>
import moment from "moment";
import { VDataTableServer } from "vuetify/lib/components/index.mjs";
import play1 from "@/assets/images/cards/folder.png";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import { useRouter } from "vue-router";
import dropdown from "./dropdown.vue";
import axios from '@axios'

const showModal = ref(false);
const userListStore = useUserListStore();
const searchQuery = ref("");
let isLoading = ref(false);
const totalUsers = ref(0);
const menuItems = ref([]);
const refInputEl = ref();
let isUserInfoEditDialogVisible = ref(false);
let myMenuItem = ref({});
let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");
const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
});
const sendRequest = () => {
  showModal.value = true;
};
// Headers
const headers = [
  {
    id: 0,
    title: "Business Name",
    key: "restaurantName",
  },
  {
    id: 1,
    title: "Social Media Username",
    key: "socialMediaUsername",
  },
  {
    id: 2,
    title: "Contract Title",
    key: "title",
  },
  {
    id: 3,
    title: "Date of Agreement",
    key: "contractDetails",
  },
  {
    id: 4,
    title: "Payment Plan",
    key: "paymentPlan",
  },
  {
    id: 5,
    title: "Status",
    key: "status",
  },
  {
    id: 6,
    title: "Details",
    key: "details",
  },
];

const contracts = ref([])

const router = useRouter();
const route = useRoute();
const listContracts = () => {
  isLoading.value = true
  axios
    .get(`influencer/contracts/list?sortBy=createdAt`)
    .then((response) => {
      console.log("user", response.data);
      contracts.value = response.data.data
      isLoading.value = false


    })
    .catch((err) => {
      console.log(err);
      isLoading.value = true

    });
}
listContracts()
const viewDetails = (item) => {

  router.push({ path: `/contract-details/${item._id}` });
};
</script>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.blue-darke {
  background-color: #9155fd;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
