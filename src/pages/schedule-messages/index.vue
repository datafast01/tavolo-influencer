<template>
  <section>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <v-expansion-panels class="mb-3">
      <v-expansion-panel>
        <v-expansion-panel-title>Advance Filters</v-expansion-panel-title>
        <v-expansion-panel-text>
          <VRow class="mb-3">
            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="message"
                label="Search message"
                density="compact"
              />
            </VCol>

            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Schecudled"
                :items="availableItems"
                item-title="name"
                item-value="value"
                density="compact"
                v-model="scheduled"
              ></v-select>
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Status"
                :items="statusItems"
                item-title="name"
                item-value="value"
                density="compact"
                v-model="status"
              ></v-select>
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Sent"
                :items="availableItems"
                item-title="name"
                item-value="value"
                density="compact"
                v-model="sent"
              ></v-select>
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="scheduledDate"
                type="date"
                label="Schedule Date"
                density="compact"
              />
            </VCol>
          </VRow>
          <div class="d-flex flex-row-reverse">
            <div class="mx-2">
              <VBtn @click="applyFilters()"> Apply Filters </VBtn>
            </div>
            <div>
              <VBtn @click="reset" color="secondary"> Clear Filters </VBtn>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <VCard>
      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="customers"
        :items-length="totalUsers"
        :headers="headers"
        class="rounded-0"
        @update:options="options = $event"
        :loading="isLoading"
      >
        <!-- Seegments -->
        <template #item.segmantId="{ item }">
          <span class="text-sm">
            {{ segmantName(item.segmantId) }}
          </span>
        </template>

        <template #item.sent="{ item }">
          <VChip
            :color="item.sent ? 'primary' : 'error'"
            :class="`text-${item.sent ? 'primary' : 'error'}`"
            size="small"
            class="font-weight-medium"
          >
            {{ item.sent ? "YES" : "NO" }}
          </VChip>
        </template>
        <template #item.scheduleDate="{ item }">
          <span class="text-sm">
            {{
              item.scheduleDate == null
                ? "Date Not Available"
                : moment(item.scheduleDate).format("MMMM Do YYYY, h:mm:ss a")
            }}
          </span>
        </template>
        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="item.status == 'active' ? 'success' : 'error'"
            :class="`text-${item.status == 'active' ? 'success' : 'error'}`"
            size="small"
            class="font-weight-medium"
          >
            {{ item.status == "active" ? "Active" : "Inactive" }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem @click="changeStatus(item.raw)">
                  <template #prepend>
                    <VIcon icon="mdi-recycle" />
                  </template>
                  <VListItemTitle>Change Status</VListItemTitle>
                </VListItem>
                <VListItem @click="deleteCampaign(item.raw._id)">
                  <template #prepend>
                    <VIcon icon="mdi-delete-outline" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex justify-end gap-x-6 pa-2 flex-wrap">
            <div class="d-flex align-center gap-x-2 text-sm">
              Rows Per Page:
              <VSelect
                v-model="options.itemsPerPage"
                class="per-page-select text-high-emphasis"
                variant="plain"
                density="compact"
                :items="[10, 20, 25, 50, 100]"
              />
            </div>

            <!-- <span class="d-flex align-center text-sm me-2 text-high-emphasis">{{ paginationMeta(options, totalUsers) }}</span> -->

            <div class="d-flex gap-x-2 align-center me-2">
              <VBtn
                icon="mdi-chevron-left"
                class="flip-in-rtl"
                variant="text"
                density="comfortable"
                color="default"
                :disabled="options.page <= 1"
                @click="options.page <= 1 ? (options.page = 1) : options.page--"
              />

              <VBtn
                icon="mdi-chevron-right"
                class="flip-in-rtl"
                density="comfortable"
                variant="text"
                color="default"
                :disabled="
                  options.page >= Math.ceil(totalUsers / options.itemsPerPage)
                "
                @click="
                  options.page >= Math.ceil(totalUsers / options.itemsPerPage)
                    ? (options.page = Math.ceil(
                        totalUsers / options.itemsPerPage
                      ))
                    : options.page++
                "
              />
            </div>
          </div>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>

    <!-- 👉 Add New User -->
  </section>
</template>

<script setup>
import moment from "moment";
import { VDataTableServer } from "vuetify/lib/components/index.mjs";

import axios from "@axios";

const totalUsers = ref(0);
const customers = ref([]);

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
let isLoading = ref(false);
// Headers
const headers = [
  {
    title: "Segment Name",
    key: "segmantId",
  },
  {
    title: "Message",
    key: "message",
  },
  {
    title: "Sent",
    key: "sent",
  },
  {
    title: "Schedule Date",
    key: "scheduleDate",
  },
  {
    title: "Status",
    key: "status",
  },

  {
    title: "ACTION",
    key: "actions",
    sortable: false,
  },
];

// filters veriables
const availableItems = ref([
  { name: "YES", value: "true" },
  { name: "NO", value: "false" },
  { name: "ALL", value: "all" },
]);

const statusItems = ref([
  { name: "Active", value: "active" },
  { name: "Inactive", value: "inActive" },
  { name: "All", value: "all" },
]);

let message = ref("" || null);
let scheduledDate = ref("" || null);
let scheduled = ref(null);
let status = ref(null);
let sent = ref(null);

const reset = () => {
  message.value = "";
  scheduledDate.value = "";
  scheduled.value = null;
  status.value = null;
  sent.value = null;

  fetchMessages();
};

const segments = [
  { id: "650e0f5b6df52a436ca3f12e", name: "All Customers" },
  { id: "650e0f896df52a436ca3f130", name: "Customers with AOV > 20" },

  { id: "650e0fc86df52a436ca3f132", name: "Customers with AOV < 20" },

  { id: "650e10236df52a436ca3f134", name: "Customers who haven't repeated" },
  { id: "650e106d6df52a436ca3f136", name: "Customers who repeated this week" },
];

const segmantName = (segmantId) => {
  const segmant = segments.find((seg) => seg.id == segmantId);

  return segmant.name;
};
// 👉 Fetching users
const fetchMessages = () => {
  isLoading.value = true;
  axios
    .get(
      `dashboard/list-schedule-message?pageSize=${options.value.itemsPerPage}&pageNo=${options.value.page}`
    )
    .then((response) => {
      console.log("user", response.data);
      customers.value = response.data.data;
      totalUsers.value = response.data.count;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

const applyFilters = () => {
  isLoading.value = true;
  axios
    .get(
      `dashboard/list-schedule-message?pageSize=${options.value.itemsPerPage}&pageNo=${options.value.page}&message=${message.value}&status=${status.value}&sent=${sent.value}&scheduledDate=${scheduledDate.value}`
    )
    .then((response) => {
      console.log("user", response.data);
      customers.value = response.data.data;
      totalUsers.value = response.data.count;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

watchEffect(fetchMessages);

const isAddNewUserDrawerVisible = ref(false);

const changeStatus = (item) => {
  console.log(item);

  axios
    .get(
      `dashboard/${
        item.status == "active"
          ? "pause-schedule-message"
          : "resume-schedule-message"
      }/${item._id}`
    )
    .then((response) => {
      console.log("user", response.data);
      show.value = true;
      snkMsg.value = `${
        item.status == "active"
          ? "Campaign Inactivated!"
          : "Campaing Activated!"
      }`;
      fetchMessages();
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

const deleteCampaign = (id) => {
  // console.log("submit form", ApiService);

  axios
    .get(`dashboard/delete-schedule-message/${id}`)
    .then((response) => {
      console.log("user", response.data);

      show.value = true;
      snkMsg.value = "Campaign deleted successfully!";
      fetchMessages();
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};
</script>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
