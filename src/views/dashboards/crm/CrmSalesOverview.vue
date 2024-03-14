<script setup>
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";

const props = defineProps({
  dashboard: {
    type: Array,
    default: [{ name: "", sales: 0 }],
  },
  totalSales: {
    type: String,
    default: "0",
  },
});

console.log(props);
const menuItems = props.dashboard.map((item) => item.name);
const prices = props.dashboard.map((item) => item.sales);

const vuetifyTheme = useTheme();
const { theme } = useThemeConfig();

const options = controlledComputed(theme, () => {
  const currentTheme = ref(vuetifyTheme.current.value.colors);
  const variableTheme = ref(vuetifyTheme.current.value.variables);
  const secondaryTextColor = `rgba(${hexToRgb(
    currentTheme.value["on-surface"]
  )},${variableTheme.value["medium-emphasis-opacity"]})`;
  const primaryTextColor = `rgba(${hexToRgb(
    currentTheme.value["on-surface"]
  )},${variableTheme.value["high-emphasis-opacity"]})`;

  return {
    chart: { sparkline: { enabled: true } },
    colors: [
      currentTheme.value.primary,
      `rgba(${hexToRgb(currentTheme.value.primary)}, 0.7)`,
      `rgba(${hexToRgb(currentTheme.value.primary)}, 0.5)`,
      currentTheme.value["grey-100"],
    ],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: menuItems,
    states: {
      hover: { filter: { type: "none" } },
      active: { filter: { type: "none" } },
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              offsetY: 25,
              color: secondaryTextColor,
            },
            value: {
              offsetY: -15,
              fontWeight: 600,
              fontSize: "24px",
              color: primaryTextColor,
              formatter: (value) => `${value}k`,
            },
            total: {
              show: true,
              label: "Total Sales",
              fontSize: "12px",
              color: secondaryTextColor,
              formatter: (value) =>
                `${value.globals.seriesTotals.reduce(
                  (total, num) => total + num
                )}k`,
            },
          },
        },
      },
    },
  };
});

const series = prices;

const formatCurrency = (number, currencyCode = "USD") => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: currencyCode,
  });
};
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Sales Overview</VCardTitle>

      <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template>
    </VCardItem>

    <VCardText class="pt-4">
      <VRow>
        <VCol sm="6" cols="12">
          <VueApexCharts
            type="donut"
            :options="options"
            :series="series"
            :height="220"
          />
        </VCol>

        <VCol cols="12" sm="6">
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar rounded color="primary" variant="tonal">
                <VIcon icon="mdi-currency-usd" />
              </VAvatar>
            </div>

            <div>
              <p class="mb-0">Number of Sales</p>
              <h6 class="text-h6">{{ formatCurrency(totalSales, "USD") }}</h6>
            </div>
          </div>

          <VDivider class="my-3" />

          <VRow>
            <VCol v-for="sale in dashboard" :key="sale" cols="6">
              <p class="mb-1">
                <VIcon
                  icon="mdi-checkbox-blank-circle"
                  color="primary"
                  size="12"
                  class="me-2"
                />
                <span>{{ sale.name }}</span>
              </p>
              <p class="text-base font-weight-medium mb-0">
                {{ formatCurrency(sale.sales, "USD") }}
              </p>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
