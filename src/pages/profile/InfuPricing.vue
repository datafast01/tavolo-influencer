<template>
  <div class="mt-8">
    <div v-if="mainLoading">
      <v-card class="mt-4 cursor-pointer selected-card" min-height="400" variant="outlined" color="black"
        max-width="300">
        <Loader />
      </v-card>
    </div>
    <div v-else>
      <div class="d-flex justify-end " v-if="packages.length == 0">
        <v-btn @click="createPackage">Create Package</v-btn>
      </div>

      <div class="d-flex justify-space-between align-center">
        <div>Create Your Plan</div>


      </div>

      <VRow class="ml-4" v-if="packages.length > 0">
        <VCol cols="12" md="4" v-for="pkg in packages" :key="pkg">
          <v-card class="mt-4 cursor-pointer selected-card" min-height="400" variant="outlined" color="black"
            max-width="300">
            <v-card-text>
              <div>
                <span class="f-18 d-flex justify-space-between selected-card-text">
                  {{ pkg.title }}

                </span>
                <div class="my-3">
                  <span class="font-weight-bold f-24">{{ pkg.currency }}{{ pkg.price }}</span>/Recording
                </div>
                <div>{{ pkg.description }}</div>
                <VList class="card-list my-3 transparent" min-height="200">
                  <VListItem v-for="benifits in pkg.features" :key="benifits">
                    <template #prepend>
                      <VIcon icon="mdi-check-circle" :class="pkg.id != currentPkg ? '' : 'selected-card-text'" />
                    </template>

                    <VListItemTitle class="text-body-2">{{ benifits }}</VListItemTitle>
                  </VListItem>
                </VList>
              </div>
            </v-card-text>
            <v-card-actions>
              <VBtn @click="editPackage(pkg)" class="ml-2" variant="tonal">
                Update
              </VBtn>

            </v-card-actions>
          </v-card>
        </VCol>
      </VRow>
      <VRow class="mt-4" v-else>
        <VCol cols="12">
          <v-card>

            <v-card-text>
              <div>
                <span class="f-18 d-flex justify-center">

                  No plans are available
                </span>



              </div>
            </v-card-text>
          </v-card>
        </VCol>
      </VRow>
    </div>

    <pricingEditDialog ref="pricing" :edit-mode="editMode" :pricing-plan="selectedPricingPlan"
      @refresh="listPackages()" />
  </div>
</template>

<script>
import pricingEditDialog from "./pricingEditDialog.vue";
import axios from "@axios";
import Loader from "@/components/Loader.vue";
export default {
  components: { pricingEditDialog, Loader },
  data() {
    return {
      toggle: "single",
      bioEditDialogVisible: false,
      singlePackages: [],
      packages: [],
      currentPkg: 0,
      editMode: false,
      selectedPricingPlan: null,
      mainLoading: false,

    };
  },
  methods: {
    selectPkg(pkg) {
      this.currentPkg = pkg;
      console.log(this.currentPkg);
    },
    editPackage(pkg) {
      this.editMode = true;
      this.selectedPricingPlan = pkg;
      this.$refs.pricing.openDialog();
    },
    createPackage() {



      this.editMode = false;
      this.$refs.pricing.openDialog();
    },
    updatePricingProp(pricing) {
      this.selectedPricingPlan = pricing;
    },
    listPackages() {
      const influencer = JSON.parse(localStorage.getItem("userData"));

      const influencerId = influencer.id;
      this.mainLoading = true
      axios
        .get(`influencer/packages/${influencerId}`)
        .then(response => {
          console.log("user", response.data.data);
          this.packages = response.data.data
          this.mainLoading = false

          // packages.forEach(item => {
          //   if (item.monthly === false) {
          //     this.singlePackages.push(item);
          //   } else if (item.monthly === true) {
          //     this.monthlyPackages.push(item);
          //   }
          // });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  computed: {
    // selectedPkg() {
    //   let pkg = this.singlePackages;
    //   if (this.toggle == "single") {
    //     pkg = this.singlePackages;
    //   } else {
    //     pkg = this.monthlyPackages;
    //   }
    //   return pkg;
    // }
    // currentPkg() {
    //   return this.singlePackages[0].id;
    // },
  },

  mounted() {
    this.listPackages();
  }
};
</script>

<style scoped>
.pricing-card {
  border: 1px solid #9155fd !important;
  border-radius: 12px;
  display: block !important;
}

.d-none {
  display: none;
}

.selected-card-text {
  color: #9155fd;
}

.large-1 {
  width: 100% !important;
  margin-top: 42px;
}

.transparent {
  background-color: rgba(255, 0, 0, 0);
}
</style>
