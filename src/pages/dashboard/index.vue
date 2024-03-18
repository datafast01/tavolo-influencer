<template>
  <section>
    <VRow class="match-height">
      <VCol cols="12" md="5">
        <div>
          <v-card class="pa-4">
            <div class="d-flex justify-space-between">
              <div style="width: 319px; height: 256px">
                <div class="mt-0 mb-2">Latest Post Performance</div>
                <BarChart :chart-data="data" :chart-options="chartOptions" />
              </div>
              <div class="pr-0">
                <VList class="card-list">
                  <div
                    class="mb-5 bg-icons"
                    v-for="item in socialAccounts"
                    :key="item.logo"
                  >
                    <div class="">
                      <VAvatar start :image="item.logo" size="36" class="pa-2" />
                    </div>
                  </div>
                </VList>
              </div>
            </div>
          </v-card>
        </div>

        <div v-for="testemonial in testemonials">
          <v-card class="mt-6" elevation="16" min-height="245">
            <v-card-text>
              <div
                class="d-flex justify-space-between my-3"
                style="min-height: 100px"
              >
                <div>
                  {{ testemonial.review }}
                </div>
                <div>
                  <v-rating
                    :model-value="testemonial.rating"
                    color="yellow-darken-3"
                    half-increments
                    density="compact"
                    readonly
                  ></v-rating>
                </div>
              </div>
              <div class="d-flex justify-space-between mt-3">
                <div class="d-flex align-center">
                  <div>
                    <v-avatar :image="avatar" class="custom-avatar"></v-avatar>
                  </div>
                  <div class="d-flex flex-column ml-3">
                    <div class="font-weight-bold">
                      {{ testemonial.businessName }}
                    </div>
                    <div class="font-weight-light f-12">
                      {{ testemonial.date }}
                    </div>
                  </div>
                </div>
                <div>
                  <img src="@images/svg/quotation-marks.svg" alt="" srcset="" />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div>
          <v-card class="mt-6">
            <v-textarea
              label="New Messages"
              row-height="20"
              rows="7"
              variant="filled"
              auto-grow
            ></v-textarea>
          </v-card>
        </div>
      </VCol>

      <VCol cols="7">
        <VRow>
          <VCol
            v-for="statistics in statisticsWithImages"
            :key="statistics.title"
            class="d-flex flex-column align-self-start"
          >
            <CardStatisticsWithImages v-bind="statistics" />
          </VCol>
          <VCol cols="12"
            ><div>
              <v-card class="pa-5" style="height: 107vh">
                <div>Activity Timeline</div>
              </v-card>
            </div>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
    <!-- <VRow class="match-height">
      <VCol
        v-for="statistics in statisticsWithImages"
        :key="statistics.title"
        cols="12"
        md="4"
        sm="6"
        class="d-flex flex-column align-self-end"
      >
        <CardStatisticsWithImages v-bind="statistics" />
      </VCol>
    </VRow> -->
  </section>
</template>

<script setup>
import { useTheme } from "vuetify";
import avatar from "@/assets/images/avatars/avatar-1.png";
import BarChart from "@/@core/libs/chartjs/components/BarChart";
import { getLatestBarChartConfig } from "@core/libs/chartjs/chartjsConfig";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import illustration2 from "@images/cards/illustration-2.png";
import miscMaskDark from "@images/pages/misc-mask-dark.png";
import miscMaskLight from "@images/pages/misc-mask-light.png";
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);
import axios from "@axios";
import facebook from "@images/icons/brands/facebook1.png";
import intagram from "@images/icons/brands/instagram.png";
import twitter from "@images/icons/brands/twitter.png";

const testemonials = [
  {
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt efficitur urna, quis scelerisque orci imperdiet non. Nulla lectus ligula, egestas quis dapibus in, dictum a sapien. Fusce et dui ultricies.",
    rating: 4,
    businessName: "Tavolo",
    date: "October 17, 2019",
  },
];

const socialAccounts = [
  {
    logo: facebook,
    name: "Facebook",
    connected: false,
  },

  {
    logo: intagram,
    name: "Instagram",
    connected: false,
  },
  {
    logo: twitter,
    name: "TikTok",
    connected: false,
  },
];

const statisticsWithImages = [
  {
    title: "Revenue",
    subtitle: "This week",
    stats: "3.7k",
    change: 2.4,
    icon: "mdi-currency-usd",
    color: "primary",
  },
  {
    title: "Profile Visits",
    subtitle: "This Week",
    stats: "100",
    change: 2.4,
    // image: illustration2,
    color: "primary",
    icon: "mdi-currency-usd",
  },
];
const vuetifyTheme = useTheme();
const chartOptions = computed(() =>
  getLatestBarChartConfig(vuetifyTheme.current.value)
);

const data = {
  labels: ["", "", ""],
  datasets: [
    {
      maxBarThickness: 51,
      backgroundColor: ["#9660FA", "#BE9BFF", "#BC98FE"],
      borderColor: "transparent",
      borderRadius: {
        topRight: 15,
        topLeft: 15,
      },
      data: [27, 90, 19, 1],
    },
  ],
};
// refernce variables
let dashboard = ref(null);
let totalSales = ref(0);
let tableData = ref([]);
let isDasboard = ref(false);
const refInputEl = ref();
// let data = ref(null);
let totalCustomers = ref(null);
let top3FoodItemsSold = ref([]);

let loading = ref(false);

// onMounted(async () => {
//   try {
//     loading.value = true;
//     axios.get(`dashboard`).then((res) => {
//       data.value = res.data;
//       top3FoodItemsSold.value = data.value.top3FoodItemsSold;
//       totalSales.value = data.value.totalSales;
//       totalCustomers.value = data.value.totalCustomers;
//       dashboard.value = res.data.data;
//       store.dispatch("getPackageHistory");
//       isDasboard.value = true;
//       loading.value = false;
//       let transaction = {
//         label: "Transactions",
//         statistics: [
//           {
//             title: "Sales",
//             stats: "1.2k",
//             icon: "mdi-trending-up",
//             color: "primary",
//           },
//           {
//             title: "Customers",
//             stats: totalCustomers.value,
//             icon: "mdi-account-outline",
//             color: "success",
//           },
//           {
//             title: "Online Conversions",
//             stats: "23%",
//             icon: "mdi-cellphone-link",
//             color: "warning",
//           },
//         ],
//       };
//       transactionData.value = transaction;
//       let email = {
//         label: "Email Stats",
//         statistics: [
//           {
//             title: "Total Emails",
//             stats: data.value.totalEmails,
//             icon: "mdi-email",
//             color: "primary",
//           },
//           {
//             title: "Pending Emails",
//             stats: data.value.noOfEmailsPending,
//             icon: "mdi-email-alert",
//             color: "success",
//           },
//           {
//             title: "Open Rate",
//             stats: data.value.noOfEmailsOpened,
//             icon: "mdi-email-open",
//             color: "warning",
//           },
//         ],
//       };
//       emailStates.value = email;
//     });
//   } catch (error) {
//     console.log(error);
//   }

// });
let transactionData = ref({});
let emailStates = ref({});
</script>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
@use "@core/scss/template/pages/misc.scss";


.bg-icons{
  background-color: #3B325E;
  border-radius: 50%;
}
.misc-footer-tree {
  inline-size: 18rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 2rem;
}
</style>
