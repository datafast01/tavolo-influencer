<script setup>
import { getLineChartConfig } from "@core/libs/chartjs/chartjsConfig";
import LineChart from "@core/libs/chartjs/components/LineChart";
import { useTheme } from "vuetify";

const props = defineProps({
  colors: {
    type: null,
    required: true,
  },
});

const vuetifyTheme = useTheme();

const data = {
  labels: [
    "post 1",
    "post 2",
    "post 3",
    "post 4",
    "post 5",
    "post 6",
    "post 7",
    "post 8",
  ],
  datasets: [
    {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: "Likes",
      pointHoverRadius: 5,
      pointStyle: "circle",
      borderColor: props.colors.primary,
      backgroundColor: props.colors.primary,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: props.colors.white,
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: props.colors.primary,
      data: [
        80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360,
        375,
      ],
    },
    {
      fill: false,
      tension: 0.5,
      label: "Comments",
      pointRadius: 1,
      pointHoverRadius: 5,
      pointStyle: "circle",
      borderColor: props.colors.warningShade,
      backgroundColor: props.colors.warningShade,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: props.colors.white,
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: props.colors.warningShade,
      data: [
        8, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200, 280,
      ],
    },
    {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: "Shares",
      pointHoverRadius: 5,
      pointStyle: "circle",
      borderColor: props.colors.yellow,
      backgroundColor: props.colors.yellow,
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: props.colors.white,
      pointBorderColor: "transparent",
      pointHoverBackgroundColor: props.colors.yellow,
      data: [
        10, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180,
      ],
    },
  ],
};

const chartConfig = computed(() =>
  getLineChartConfig(vuetifyTheme.current.value)
);
</script>

<template>
  <VRow>
    <VCol cols="12" md="4">
      <div id="chartjs-wrapper">
        <LineChart
          :chart-options="chartConfig"
          :height="400"
          :chart-data="data"
        />
      </div>
    </VCol>
    <VCol cols="12" md="4">
      <div id="chartjs-wrapper">
        <LineChart
          :chart-options="chartConfig"
          :height="400"
          :chart-data="data"
        />
      </div>
    </VCol>
    <VCol cols="12" md="4">
      <div id="chartjs-wrapper">
        <LineChart
          :chart-options="chartConfig"
          :height="400"
          :chart-data="data"
        />
      </div>
    </VCol>
  </VRow>

  <!-- <LineChart :chart-options="chartConfig" :height="400" :chart-data="data" /> -->
</template>

<style lang="scss">
#chartjs-wrapper {
  .v-card-item__append {
    padding-inline-start: 0;
  }
}
</style>
