<template>
  <section>
    <VRow class="match-height">
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
    </VRow>
  </section>
</template>

<script setup>
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import illustration2 from "@images/cards/illustration-2.png";
import miscMaskDark from "@images/pages/misc-mask-dark.png";
import miscMaskLight from "@images/pages/misc-mask-light.png";
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);

const statisticsWithImages = [
  {
    title: "Revenue",
    subtitle: "This week",
    stats: "15.3k",
    change: 15.6,
    icon: "mdi-currency-usd",
    color: "primary",
  },
  {
    title: "Registered Resturants",
    subtitle: "This Week",
    stats: "382",
    change: 22,
    image: illustration2,
    color: "secondary",
    icon: "mdi-currency-usd",
  },
  {
    title: "Registered Influencers",
    subtitle: "This Week",
    stats: "382",
    change: 22,
    image: illustration2,
    color: "secondary",
    icon: "mdi-currency-usd",
  },
];

// refernce variables
let dashboard = ref(null);
let totalSales = ref(0);
let tableData = ref([]);
let isDasboard = ref(false);
const refInputEl = ref();
let data = ref(null);
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

.misc-footer-tree {
  inline-size: 18rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 2rem;
}
</style>
