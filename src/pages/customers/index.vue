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
                v-model="emailSearch"
                label="Search Email"
                density="compact"
              />
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <v-select
                label="AOV Operator"
                density="compact"
                :items="rangeItems"
                v-model="aovOperator"
                item-value="value"
                item-title="name"
              ></v-select>
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="aov"
                type="number"
                label="AOV"
                density="compact"
              />
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Visis Operator"
                density="compact"
                :items="rangeItems"
                v-model="visitsOperator"
                item-value="value"
                item-title="name"
              ></v-select>
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <VTextField
                v-model="totalVisits"
                label="Total Visits"
                density="compact"
                outline
                type="number"
              />
            </VCol>
            <VCol cols="12" md="2" sm="4">
              <v-select
                label="Repeated"
                :items="availableItems"
                item-title="name"
                item-value="value"
                density="compact"
                v-model="repeated"
              ></v-select>
            </VCol>
          </VRow>
          <div class="d-flex flex-row-reverse">
            <div class="mx-2">
              <!-- <VBtn
                @click="filterCustomers()"
                prepend-icon="mdi-filter-outline"
              >
                Apply Filters
              </VBtn> -->
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
        <VBtn color="primary" @click="refInputEl?.click()">
          <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
          <span class="d-none d-sm-block">Upload Customers</span>
        </VBtn>
        <input
          ref="refInputEl"
          type="file"
          name="file"
          accept=".csv"
          hidden
          @input="uploadCustomerCsv"
        />

        <VSpacer />
        <VSpacer />
        <div class="">
          <!-- 👉 Add user button -->
          <VBtn @click="addCustomer"> Add Customer </VBtn>
        </div>
      </VCardText>

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
        <!-- Email -->
        <!-- <template #item.email="{ item }">
          <span class="text-sm">
            {{ item.email }}
          </span>
        </template> -->

        <!-- Status -->
        <template #item.email="{ item }">
          {{ item.email }}
        </template>
        <template #item.phone="{ item }">
          {{ item.phone }}
        </template>
        <template #item.dobDay="{ item }">
          {{ numberToMonth(item?.metadata?.dobMonth) }}
          {{ item?.metadata?.dobDay }}
        </template>

        <template #item.marketingAllowed="{ item }">
          {{ item?.marketingAllowed ? "YES" : "NO" }}
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem link @click="editCustomerData(item)">
                  <template #prepend>
                    <VIcon icon="mdi-pencil-outline" />
                  </template>
                  <VListItemTitle>Edit</VListItemTitle>
                </VListItem>

                <VListItem @click="deleteUser(item._id)">
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
                @click="options.page <= 1 ? (options.page = 1) : options.page"
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
    <AddNewCustomer
      v-model:isCreateDialog="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />

    <EditCustomer
      v-model:isDialogVisible="isUserInfoEditDialogVisible"
      :customerData="myCustomer"
      @customerData="updateCustomer"
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
// import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import AddNewCustomer from "./AddCustomer.vue";

import EditCustomer from "./EditCustomer.vue";

const userListStore = useUserListStore();
const searchQuery = ref("");
let isLoading = ref(false);
const totalUsers = ref(0);
const customers = ref([]);
const refInputEl = ref();
let isUserInfoEditDialogVisible = ref(false);
let myCustomer = ref({});
let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");

// filters veriables
let emailSearch = ref("" || null);
let totalVisits = ref("" || null);
let repeated = ref("all");
let aov = ref("" || null);
let aovOperator = ref(null);
let visitsOperator = ref(null);
const rangeItems = ref([
  { name: "Greater than", value: "greater" },
  { name: "Less than", value: "smaller" },

  { name: "Equals To", value: "equals" },
]);
const availableItems = ref([
  { name: "YES", value: "true" },
  { name: "NO", value: "false" },
  { name: "ALL", value: "all" },
]);
const reset = () => {
  emailSearch.value = "";
  totalVisits.value = "";
  repeated.value = null;
  aov.value = "";
  aovOperator.value = null;
  visitsOperator.value = null;

  fetchCustomers();
};
const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
});

// Headers
const headers = [
  {
    title: "First Name",
    key: "firstname",
    width: "130",
  },
  {
    title: "Last Name",
    key: "lastname",
    width: "130",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Phone",
    key: "phone",
  },
  {
    title: "Business Name",
    key: "phone",
  },

  {
    title: "Marketing Allowed",
    key: "marketingAllowed",
    width: "100",
  },
  {
    title: "Birthday",
    key: "dobDay",
  },

  {
    title: "ACTION",
    key: "actions",
    sortable: false,
  },
];

const uploadCustomerCsv = (file) => {
  const fileReader = new FileReader();
  const { files } = file.target;
  const myCSV = files[0];
  let data = new FormData();
  data.append("file", myCSV);
  axios
    .post(`upload-customers`, data)

    .then((res) => {
      // console.log(res);
      fetchCustomers();
    })
    .catch((error) => {});
  // if (files && files.length) {
  //   fileReader.readAsDataURL(files[0]);
  //   fileReader.onload = () => {
  //     if (typeof fileReader.result === "string")
  //       accountDataLocal.value.avatarImg = fileReader.result;
  //   };
  // }
};

//changing month in char
const numberToMonth = (number) => {
  if (number >= 1 && number <= 12) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[number - 1];
  } else {
    return "Date Not Available";
  }
};
// 👉 Fetching users
const fetchCustomers = () => {
  isLoading.value = true;
  axios
    .get(
      `list-customers?pageNo=${options.value.page}&pageSize=${options.value.itemsPerPage}`
    )
    .then((response) => {
      customers.value = response.data.data;
      isLoading.value = false;
      store.dispatch("getPackageHistory");
    })
    .catch((err) => {
      console.log(err.response.status);
      snkMsg.value = "Connect to Clover";
      isLoading.value = false;
    });
};

const editCustomerData = (data) => {
  isUserInfoEditDialogVisible.value = true;
  myCustomer.value = data;
};
watchEffect(fetchCustomers);

const isAddNewUserDrawerVisible = ref(false);

const addCustomer = () => {
  isAddNewUserDrawerVisible.value = true;
};

const addNewUser = (userData) => {
  axios
    .post(`add-customer`, userData)
    .then((response) => {
      show.value = true;
      snkMsg.value = "Customer has been added successfully";
      customers.value.push(userData);

      fetchCustomers();
    })
    .catch((err) => {
      console.log(err.response);
      show.value = true;

      snkMsg.value = err.response.data.message;

      color.value = "error";
    });
};

const updateCustomer = (userData) => {
  let payload = {
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    phone: userData.phone,
    aov: userData.aov,
    repeated: userData.repeated,
    customerId: userData._id,
  };
  axios
    .post(`edit-customers`, payload)
    .then((response) => {
      show.value = true;
      snkMsg.value = "Customer has been updated successfully";
      fetchCustomers();
    })
    .catch((err) => {
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.error;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
    });
};
const deleteUser = (id) => {
  axios
    .get(`delete-customers/${id}`)
    .then((response) => {
      show.value = true;
      snkMsg.value = "Customer has been deleted successfully";
      fetchCustomers();
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
