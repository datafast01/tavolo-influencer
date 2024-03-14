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
      <VCardText class="d-flex flex-wrap gap-4">
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center gap-6">
          <!-- 👉 Search  -->
          <VTextField
            v-model="searchQuery"
            placeholder="Search User"
            density="compact"
          />

          <!-- 👉 Add user button -->
          <VBtn @click="isAddNewUserDrawerVisible = true"> Add Menu Item </VBtn>
        </div>
      </VCardText>

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
        <template #item.price="{ item }">
          <span class="text-sm" v-if="item.priceType == 'VARIABLE'">
            Veriable
            <!-- {{ formatCurrency(parseFloat(item.price), "USD") }} -->
          </span>
          <span v-else> ${{ item.price }} </span>
        </template>
        <template #item.percentageOfTotalRevenue="{ item }">
          <span class="text-sm"> {{ item?.percentageOfTotalRevenue }}% </span>
        </template>
        <template #item.cost="{ item }">
          <span class="text-sm"> {{ item.cost == 0 ? "" : item.cost }}</span>
        </template>

        <!-- price -->

        <!-- Status -->
        <template #item.available="{ item }">
          <VIcon
            icon="mdi-check-outline"
            color="primary"
            v-if="item.available"
          />
        </template>
        <template #item.modifiedTime="{ item }">
          {{ moment(item.modifiedTime).format("ll") }}
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem link @click="editMenuItemData(item.raw)">
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>Edit</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteMenuItem(item.raw._id)">
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
    <AddMenuItem
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addMenuItem"
    />

    <EditMenuItem
      v-model:isDrawerOpen="isUserInfoEditDialogVisible"
      :menuItemData="myMenuItem"
      @user-data="updateMenuItem"
    />
  </section>
</template>

<script setup>
import store from "@/store/index.js";
import { VDataTableServer } from "vuetify/lib/components/index.mjs";
// import { paginationMeta } from '@/@fake-db/utils'
// import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import axios from "@axios";
import AddMenuItem from "./AddMenuItem.vue";
import EditMenuItem from "./EditMenuItem.vue";

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
    title: "Menu Item",
    key: "name",
  },
  {
    title: "Item ID",
    key: "id",
  },
  {
    title: "Price",
    key: "price",
  },
  {
    title: "Cost",
    key: "cost",
  },

  {
    title: "Availability",
    key: "available",
  },
  // {
  //   title: "Tax",
  //   key: "defaultTaxRates",
  // },
  {
    title: "SKU",
    key: "sku",
  },
  {
    title: "Last edited",
    key: "modifiedTime",
  },

  {
    title: "ACTION",
    key: "actions",
    sortable: false,
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
    .get(`food-item/list?pageNo=1&pageSize=50`)
    .then((response) => {
      menuItems.value = response.data.data;
      store.dispatch("getPackageHistory");
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
      `food-item/list?pageSize=${options.value.itemsPerPage}&page=${options.value.page}&name=${menuItem.value}&available=${available.value}&price=${price.value}&priceOperator=${priceOperator.value}&noOfTimesOrdered=${orders.value}&noOfTimesOrderedOperator=${ordersOperator.value}`
    )
    .then((response) => {
      menuItems.value = response.data.data;
      isLoading.value = false;
    })
    .catch((err) => {
      console.log(err.response.status);
    });
};

const editMenuItemData = (data) => {
  isUserInfoEditDialogVisible.value = true;
  myMenuItem.value = data;
};
watchEffect(fetchMenuItems);

const isAddNewUserDrawerVisible = ref(false);

const addMenuItem = (userData) => {
  axios
    .post(`food-item/create`, userData)
    .then((response) => {
      show.value = true;
      snkMsg.value = "Menu Item has been added successfully";
      menuItems.value.push(userData);

      fetchMenuItems();
    })
    .catch((err) => {
      console.log(err.response);
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.error;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
    });
};

const updateMenuItem = (userData) => {
  let payload = {
    name: userData.name,
    price: userData.price,
    noOfCustomersOrdered: userData.noOfCustomersOrdered,
    noOfTimesOrdered: userData.noOfTimesOrdered,
    percentageOfTotalRevenue: userData.percentageOfTotalRevenue,
    available: userData.available,
  };
  axios
    .post(`food-item/update/${userData._id}`, payload)
    .then((response) => {
      show.value = true;
      snkMsg.value = "Menu Item has been updated successfully";
      fetchMenuItems();
    })
    .catch((err) => {
      console.log(err.response);
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.error;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
    });
};
const deleteMenuItem = (id) => {
  axios
    .get(`food-item/delete/${id}`)
    .then((response) => {
      show.value = true;
      snkMsg.value = "Menu Item has been deleted successfully";
      fetchMenuItems();
    })
    .catch((err) => {
      console.log(err.response);
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.error;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
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
