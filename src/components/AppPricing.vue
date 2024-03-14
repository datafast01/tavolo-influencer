<template>
  <!-- 👉 Title and subtitle -->

  <div class="text-center">
    <h4 class="text-h4 mb-2">
      {{ title ? title : "Pricing Plans" }}
    </h4>

    <p class="text-sm mb-1">
      All plans include 40+ advanced tools and features to boost your product.
    </p>
    <p>Choose the best plan to fit your needs.</p>
  </div>
  <!-- {{ yearlyPkgs }} --{{ monthlyPkgs }} -->
  <!-- 👉 Annual and monthly price toggler -->
  <div class="d-flex align-center justify-center mx-auto py-10">
    <VLabel for="pricing-plan-toggle" class="me-2 text-sm"> Monthly </VLabel>

    <div class="position-relative">
      <div class="pricing-save-chip position-absolute d-sm-block d-none">
        <VIcon
          start
          icon="mdi-arrow-down-left"
          size="24"
          class="text-disabled flip-in-rtl mt-1"
        />
        <VChip size="small" color="primary"> Save up to 10% </VChip>
      </div>

      <VSwitch
        id="pricing-plan-toggle"
        v-model="annualMonthlyPlanPriceToggler"
        label="Annual"
      />
    </div>
  </div>

  <!-- SECTION pricing plans -->
  <VRow v-if="!annualMonthlyPlanPriceToggler">
    <VCol
      v-for="(plan, index) in monthlyPkgs"
      :key="index"
      v-bind="props"
      cols="12"
      md="4"
    >
      <!-- 👉  Card -->
      <VCard flat border class="border-primary border-opacity-100">
        <VCardText style="block-size: 4.125rem" class="text-end">
          <!-- 👉 Popular -->
          <VChip v-show="plan.isPopular" color="primary" size="small">
            Popular
          </VChip>
        </VCardText>

        <!-- 👉 Plan logo -->
        <VCardText class="text-center">
          <VImg
            :height="120"
            :src="pricingPlans[index].logo"
            class="mx-auto mb-5"
          />

          <!-- 👉 Plan name -->
          <h5 class="text-h5 mb-2">
            {{ plan.title }}
          </h5>
          <p class="mb-0">
            <!-- {{ plan.tagLine }} -->
          </p>
        </VCardText>

        <!-- 👉 Plan price  -->
        <VCardText class="position-relative text-center">
          <div class="d-flex justify-center align-center">
            <sup class="text-sm font-weight-medium me-1">$</sup>
            <h1 class="text-5xl font-weight-medium text-primary">
              {{ plan.price }}
            </h1>
            <sub class="text-sm font-weight-medium ms-1 mt-4">/month</sub>
          </div>
        </VCardText>

        <!-- 👉 Plan features -->
        <VCardText class="pt-2">
          <VList class="card-list">
            <VListItem
              v-for="feature in pricingPlans[index].features"
              :key="feature"
            >
              <template #prepend>
                <VIcon :size="14" icon="mdi-circle-outline" class="me-3" />
              </template>

              <VListItemTitle class="text-body-2">
                {{ feature }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Plan actions -->
        <VCardActions>
          <VBtn
            block
            :color="plan._id === currentPkgId ? 'success' : 'primary'"
            :variant="plan._id !== currentPkgId ? 'elevated' : 'tonal'"
            @click="checkout(plan)"
          >
            {{ plan._id === currentPkgId ? "Your Current Plan" : "Upgrade" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>

  <VRow v-else>
    <VCol
      v-for="(plan, index) in yearlyPkgs"
      :key="index"
      v-bind="props"
      cols="12"
      md="4"
    >
      <!-- 👉  Card -->
      <VCard flat border class="border-primary border-opacity-100">
        <VCardText style="block-size: 4.125rem" class="text-end">
          <!-- 👉 Popular -->
          <VChip v-show="plan.isPopular" color="primary" size="small">
            Popular
          </VChip>
        </VCardText>

        <!-- 👉 Plan logo -->
        <VCardText class="text-center">
          <VImg
            :height="120"
            :src="pricingPlans[index].logo"
            class="mx-auto mb-5"
          />

          <!-- 👉 Plan name -->
          <h5 class="text-h5 mb-2">
            {{ plan.title }}
          </h5>
          <p class="mb-0">
            <!-- {{ plan.tagLine }} -->
          </p>
        </VCardText>

        <!-- 👉 Plan price  -->
        <VCardText class="position-relative text-center">
          <div class="d-flex justify-center align-center">
            <sup class="text-sm font-weight-medium me-1">$</sup>
            <h1 class="text-5xl font-weight-medium text-primary">
              {{ plan.price }}
            </h1>
            <sub class="text-sm font-weight-medium ms-1 mt-4">/year</sub>
          </div>
        </VCardText>

        <!-- 👉 Plan features -->
        <VCardText class="pt-2">
          <VList class="card-list">
            <VListItem
              v-for="feature in pricingPlans[index].features"
              :key="feature"
            >
              <template #prepend>
                <VIcon :size="14" icon="mdi-circle-outline" class="me-3" />
              </template>

              <VListItemTitle class="text-body-2">
                {{ feature }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Plan actions -->
        <VCardActions>
          <VBtn
            block
            :color="plan._id === currentPkgId ? 'success' : 'primary'"
            :variant="plan._id != currentPkgId ? 'elevated' : 'tonal'"
            @click="checkout(plan, currentPkgId)"
          >
            {{ plan._id === currentPkgId ? "Your Current Plan" : "Upgrade" }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>

  <!-- !SECTION  -->
</template>

<script>
import axios from "@axios";
import tree1 from "@images/misc/pricing-tree-1.png";
import tree2 from "@images/misc/pricing-tree-2.png";
import tree3 from "@images/misc/pricing-tree-3.png";

export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    xs: {
      type: [Number, String],
      required: false,
    },
    sm: {
      type: [Number, String],
      required: false,
    },
    md: {
      type: [String, Number],
      required: false,
    },
    lg: {
      type: [String, Number],
      required: false,
    },
    xl: {
      type: [String, Number],
      required: false,
    },
    monthlyPkgs: {
      type: Array,
      default: [],
    },
    yearlyPkgs: {
      type: Array,
      default: [],
    },
    currentPkg: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      annualMonthlyPlanPriceToggler: false,
      pricingPlans: [
        {
          name: "Basic",
          tagLine: "A simple start for everyone",
          logo: tree1,
          monthlyPrice: 0,
          yearlyPrice: 0,
          isPopular: false,
          current: true,
          features: [
            "100 responses a month",
            "Unlimited forms and surveys",
            "Unlimited fields",
            "Basic form creation tools",
            "Up to 2 subdomains",
          ],
        },
        {
          name: "Standard",
          tagLine: "For small to medium businesses",
          logo: tree2,
          monthlyPrice: 42,
          yearlyPrice: 460,
          isPopular: true,
          current: false,
          features: [
            "Unlimited responses",
            "Unlimited forms and surveys",
            "Instagram profile page",
            "Google Docs integration",
            "Custom “Thank you” page",
          ],
        },
        {
          name: "Enterprise",
          tagLine: "Solution for big organizations",
          logo: tree3,
          monthlyPrice: 84,
          yearlyPrice: 690,
          isPopular: false,
          current: false,
          features: [
            "PayPal payments",
            "Logic Jumps",
            "File upload with 5GB storage",
            "Custom domain support",
            "Stripe integration",
          ],
        },
      ],
    };
  },
  computed: {
    currentPkgId() {
      return this.currentPkg?.packageId?._id;
    },
  },

  methods: {
    checkout(plan) {
      // console.log(plan._id, "=====", this.currentPkgId);
      if (plan._id != this.currentPkgId) {
        axios
          .post(`create-checkout`, {
            priceId: plan.stripePriceId,
          })
          .then((response) => {
            // console.log("user", response.data.data);
            window.open(response.data.data);
          })
          .catch(() => {
            // console.log(err);
          });
      }
      // console.log("submit form", plan.stripePriceId);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1rem;
}

.pricing-save-chip {
  display: flex;
  inset-block-start: -1.5rem;
  inset-inline-end: -6.5rem;
}
</style>
