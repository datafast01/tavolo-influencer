<template>
  <div class="mt-8">
    <div class="d-flex justify-space-between align-center">
      <div>CHOOSE YOUR PLAN</div>
      <div>
        <v-btn-toggle
          v-model="toggle"
          color="primary"
          variant="outlined"
          mandatory
        >
          <v-btn value="single">Single</v-btn>
          <v-btn value="monthly">Monthly</v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <VRow class="ml-4">
      <VCol cols="12" md="4" v-for="pkg in selectedPkg" :key="pkg">
        <v-card
          class="mt-4 cursor-pointer"
          :class="pkg.id != currentPkg ? 'selected-card' : 'pricing-card'"
          min-height="400"
          variant="outlined"
          color="black"
          max-width="300"
          v-model="currentPkg"
          @click="selectPkg(pkg.id)"
        >
          <v-card-text>
            <div>
              <span
                class="f-18"
                :class="pkg.id != currentPkg ? '' : 'selected-card-text'"
              >
                {{ pkg.name }}
              </span>
              <div class="my-3">
                <span class="font-weight-bold f-24">{{ pkg.price }}</span
                >/Recording
              </div>
              <div>{{ pkg.description }}</div>
              <VList class="card-list my-3">
                <VListItem v-for="benifits in pkg.benifits" :key="benifits">
                  <template #prepend>
                    <VIcon
                      icon="mdi-check-circle"
                      :class="pkg.id != currentPkg ? '' : 'selected-card-text'"
                    />
                  </template>

                  <VListItemTitle class="text-body-2">
                    {{ benifits.name }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </div>
          </v-card-text>
        </v-card>
      </VCol>
    </VRow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: "single",

      singlePackages: [
        {
          id: 0,
          name: "BASIC",
          price: "$20",
          description: "For new businesses that want to boost their sales",
          benifits: [
            {
              name: "Good Engagement",
              isAvailable: true,
            },
            {
              name: "Post and Story",
              isAvailable: true,
            },
            {
              name: "Instagram",
              isAvailable: true,
            },
            {
              name: "Usage Rights",
              isAvailable: true,
            },
          ],
        },
        {
          id: 1,
          name: "POPULAR",
          price: "$75",
          description: "For new businesses that want to boost their sales",
          benifits: [
            {
              name: "Good Engagement",
              isAvailable: true,
            },
            {
              name: "Post and Story",
              isAvailable: true,
            },
            {
              name: "Instagram",
              isAvailable: true,
            },
            {
              name: "Usage Rights",
              isAvailable: true,
            },
          ],
        },
        {
          id: 2,
          name: "ENTERPRISE",
          price: "$100",
          description: "For new businesses that want to boost their sales",
          benifits: [
            {
              name: "Good Engagement",
              isAvailable: true,
            },
            {
              name: "Post and Story",
              isAvailable: true,
            },
            {
              name: "Instagram",
              isAvailable: true,
            },
            {
              name: "Usage Rights",
              isAvailable: true,
            },
          ],
        },
      ],
      monthlyPackages: [
        {
          id: 0,
          name: "BASIC",
          price: "$75",
          description: "For new businesses that want to boost their sales",
          benifits: [
            {
              name: "Good Engagement",
              isAvailable: true,
            },
            {
              name: "10 Recordings Per Month",
              isAvailable: true,
            },
            {
              name: "Post and Story",
              isAvailable: true,
            },
            {
              name: "Instagram",
              isAvailable: true,
            },
            {
              name: "Usage Rights",
              isAvailable: true,
            },
          ],
        },
        {
          id: 1,
          name: "POPULAR",
          price: "$100",
          description: "For new businesses that want to boost their sales",
          benifits: [
            {
              name: "Good Engagement",
              isAvailable: true,
            },
            {
              name: "10 Recordings Per Month",
              isAvailable: true,
            },
            {
              name: "Post and Story",
              isAvailable: true,
            },
            {
              name: "Instagram",
              isAvailable: true,
            },
            {
              name: "Usage Rights",
              isAvailable: true,
            },
          ],
        },
        {
          id: 2,
          name: "ENTERPRISE",
          price: "$150",
          description: "For new businesses that want to boost their sales",
          benifits: [
            {
              name: "Good Engagement",
              isAvailable: true,
            },
            {
              name: "10 Recordings Per Month",
              isAvailable: true,
            },
            {
              name: "Post and Story",
              isAvailable: true,
            },
            {
              name: "Instagram",
              isAvailable: true,
            },
            {
              name: "Usage Rights",
              isAvailable: true,
            },
          ],
        },
      ],
      currentPkg: 0,
    };
  },
  methods: {
    selectPkg(pkg) {
      this.currentPkg = pkg;
      console.log(this.currentPkg);
    },
  },

  computed: {
    selectedPkg() {
      let pkg = this.singlePackages;
      if (this.toggle == "single") {
        pkg = this.singlePackages;
      } else {
        pkg = this.monthlyPackages;
      }
      return pkg;
    },
    // currentPkg() {
    //   return this.singlePackages[0].id;
    // },
  },
};
</script>

<style scoped>
.pricing-card {
  border: 1px solid #9155fd !important;
  border-radius: 12px;
}
.selected-card-text {
  color: #9155fd;
}
</style>
