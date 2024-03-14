<template>
  <div>
    <VCard title="AVERAGE ENGAGEMENT RATE">
      <ChartJsLineChart :colors="chartJsCustomColors" />
    </VCard>

    <VRow class="mt-6">
      <VCol
        v-for="statistics in statisticsWithImages"
        :key="statistics.title"
        cols="12"
        md="4"
        sm="6"
        class="d-flex flex-column align-self-end"
      >
        <VCard class="overflow-visible">
          <div class="d-flex position-relative">
            <VCardText>
              <div class="d-flex justify-space-between">
                <span class="mb-6">
                  {{ statistics.title }}
                </span>
                <span>
                  <v-icon class="text--primary">{{ statistics.icon }}</v-icon>
                </span>
              </div>

              <div class="d-flex align-center flex-wrap mb-3">
                <h1>
                  {{ statistics.stats }}
                </h1>
              </div>
              <div class="d-flex align-center justify-space-between mt-6">
                <div class="text--success font-weight-bold">
                  <v-icon>mdi-arrow-top-right</v-icon> {{ statistics.change }}%
                </div>
                <div>Followers Growth</div>
              </div>
            </VCardText>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import ChartJsLineChart from "./performanceChart.vue";
export default {
  components: { ChartJsLineChart },
  data() {
    return {
      chartJsCustomColors: {
        white: "#fff",
        yellow: "#ffe802",
        primary: "#836af9",
        areaChartBlue: "#2c9aff",
        barChartYellow: "#ffcf5c",
        polarChartGrey: "#4f5d70",
        polarChartInfo: "#299aff",
        lineChartYellow: "#d4e157",
        polarChartGreen: "#28dac6",
        lineChartPrimary: "#9e69fd",
        lineChartWarning: "#ff9800",
        horizontalBarInfo: "#26c6da",
        polarChartWarning: "#ff8131",
        scatterChartGreen: "#28c76f",
        warningShade: "#ffbd1f",
        areaChartBlueLight: "#84d0ff",
        areaChartGreyLight: "#edf1f4",
        scatterChartWarning: "#ff9f43",
      },
      statisticsWithImages: [
        {
          title: "Followers (Last 30 days)",

          stats: "15.3k",
          change: 15.6,
          icon: "mdi-facebook",
          color: "primary",
        },
        {
          title: "Followers (Last 30 days)",

          stats: "38k",
          change: 22,

          color: "secondary",
          icon: "mdi-instagram",
        },

        {
          title: "Followers (Last 30 days)",

          stats: "3.2k",
          change: 22,

          color: "secondary",
          icon: "mdi-music-note",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#chartjs-wrapper {
  .v-card-item__append {
    padding-inline-start: 0;
  }
}
</style>

<!-- <script setup>
import ChartJsLineChart from "./performanceChart.vue";

const chartJsCustomColors = {
  white: "#fff",
  yellow: "#ffe802",
  primary: "#836af9",
  areaChartBlue: "#2c9aff",
  barChartYellow: "#ffcf5c",
  polarChartGrey: "#4f5d70",
  polarChartInfo: "#299aff",
  lineChartYellow: "#d4e157",
  polarChartGreen: "#28dac6",
  lineChartPrimary: "#9e69fd",
  lineChartWarning: "#ff9800",
  horizontalBarInfo: "#26c6da",
  polarChartWarning: "#ff8131",
  scatterChartGreen: "#28c76f",
  warningShade: "#ffbd1f",
  areaChartBlueLight: "#84d0ff",
  areaChartGreyLight: "#edf1f4",
  scatterChartWarning: "#ff9f43",
};
</script>

<template>
  <VRow id="chartjs-wrapper">
    <VCol cols="12">
      <VCard title="Statistics" subtitle="Commercial networks and enterprises">
        <VCardText>
          <ChartJsLineChart :colors="chartJsCustomColors" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
.date-picker-wrapper {
  inline-size: 10.5rem;
}

#chartjs-wrapper {
  .v-card-item__append {
    padding-inline-start: 0;
  }
}
</style> -->
