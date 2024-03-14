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
            <!-- menu Item name  -->
            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="menuItem"
                label="Search Menu Item"
                density="compact"
              />
            </VCol>
            <!-- available  -->
            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Available"
                density="compact"
                :items="availableItems"
                v-model="available"
                item-value="value"
                item-title="name"
              ></v-select>
            </VCol>

            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Price Operator"
                density="compact"
                :items="rangeItems"
                v-model="priceOperator"
                item-value="value"
                item-title="name"
              ></v-select>
            </VCol>

            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="price"
                label="Price"
                density="compact"
                outline
                type="number"
              />
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Orders Operator"
                density="compact"
                :items="rangeItems"
                v-model="ordersOperator"
                item-value="value"
                item-title="name"
              ></v-select>
            </VCol>

            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="orders"
                label="No Of Orders"
                density="compact"
                outline
                type="number"
              />
            </VCol>
          </VRow>
          <div class="d-flex flex-row-reverse">
            <div class="mx-2">
              <VBtn @click="applyFilters()" prepend-icon="mdi-filter-outline">
                Apply Filters
              </VBtn>
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
        :items="menuItems"
        :items-length="totalUsers"
        :headers="headers"
        class="rounded-0"
        @update:options="options = $event"
        :loading="isLoading"
      >
        <!-- Email -->

        <template #item.employee="{ item }">
          {{ item.employee.id }}
        </template>

        <!-- price -->

        <!-- Status -->

        <template #item.createdTime="{ item }">
          {{ moment(item.createdTime).format("ll") }}
        </template>

        <!-- Actions -->
        <template #item.details="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem link>
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>View Details</VListItemTitle>
                </VListItem>

                <!-- <VListItem @click="deleteMenuItem(item.raw._id)">
                  <template #prepend>
                    <VIcon icon="mdi-delete-outline" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem> -->
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
  </section>
</template>

<script setup>
import store from "@/store/index.js";
import { VDataTableServer } from "vuetify/lib/components/index.mjs";
// import { paginationMeta } from '@/@fake-db/utils'
// import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import axios from "@axios";

import moment from "moment";

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
const repeated = ref(null);
const availableItems = ref([
  { name: "YES", value: "true" },
  { name: "NO", value: "false" },
  { name: "ALL", value: "all" },
]);
const rangeItems = ref([
  { name: "Greater than", value: "greater" },
  { name: "Less than", value: "smaller" },

  { name: "Equals To", value: "equals" },
]);
// Headers
const headers = [
  {
    title: "Date",
    key: "createdTime",
  },
  {
    title: "Line Items",
    key: "lineItems",
  },
  {
    title: "Total",
    key: "total",
  },
  {
    title: "Status",
    key: "state",
  },

  {
    title: "Employee",
    key: "employee",
  },
  // {
  //   title: "Tax",
  //   key: "defaultTaxRates",
  // },
  {
    title: "Details",
    key: "details",
  },
];

// filter veriables
let menuItem = ref("" || null);
let available = ref("all" || null);
let priceOperator = ref("" || null);
let price = ref("" || null);
let ordersOperator = ref("" || null);
let orders = ref("" || null);

const reset = () => {
  menuItem.value = "";
  price.value = "";
  available.value = null;
  ordersOperator.value = "";
  priceOperator.value = null;
  orders.value = null;

  fetchMenuItems();
};

// 👉 Fetching users
const fetchMenuItems = () => {
  isLoading.value = true;
  axios
    .get(`clover/orders`)
    .then((response) => {
      menuItems.value = response.data.data.elements;
      store.dispatch("getPackageHistory");
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err.response.status);
      isLoading.value = false;
    });
};

watchEffect(fetchMenuItems);

const isAddNewUserDrawerVisible = ref(false);
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
