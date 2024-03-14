<template>
  <VRow>
    <!-- 👉 Current Plan -->
    <VCol cols="12">
      <VCard title="Current Plan">
        <VCardText>
          <!-- {{ currentPkg }} -->
          <VRow>
            <VCol cols="12" md="6">
              <div>
                <div class="mb-6">
                  <h3 class="text-base font-weight-medium mb-1">
                    Your Current Plan is {{ currentPkg?.packageId?.title }}
                  </h3>
                  <p class="text-base">A simple start for everyone</p>
                </div>

                <div class="mb-6">
                  <h3 class="text-base font-weight-medium mb-1">
                    Active until
                    {{ moment(currentPkg?.expiryDate).format("MMMM Do YYYY") }}
                  </h3>
                  <p class="text-base">
                    We will send you a notification upon Subscription expiration
                  </p>
                </div>

                <div>
                  <h3 class="text-base font-weight-medium mb-1">
                    <span class="me-3"
                      >${{ currentPkg?.packageId?.price }} Per Month</span
                    >
                    <VChip color="primary" density="comfortable">
                      Popular
                    </VChip>
                  </h3>
                  <p class="text-base mb-0">
                    Standard plan for small to medium businesses
                  </p>
                </div>
              </div>
            </VCol>

            <VCol cols="12" md="6">
              <!-- <VAlert variant="tonal" type="warning">
                <template #prepend>
                  <VIcon icon="mdi-alert-outline" size="22" color="warning" />
                </template>
                <VAlertTitle class="mb-1">
                  We need your attention!
                </VAlertTitle>

                <span>Your plan requires update</span>
              </VAlert> -->

              <!-- progress -->
              <!-- <div
                class="d-flex font-weight-medium text-sm text-high-emphasis mt-8 mb-2"
              >
                <span>Days</span>
                <VSpacer />
                <span>24 of 30 Days</span>
              </div>
              <VProgressLinear
                color="primary"
                rounded
                height="8"
                model-value="75"
              />
              <p class="text-xs mt-2">
                6 days remaining until your plan requires update
              </p> -->
            </VCol>

            <VCol cols="12">
              <div class="d-flex flex-wrap gap-y-4">
                <VBtn class="me-3" @click="isPricingPlanDialogVisible = true">
                  upgrade plan
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="outlined"
                  @click="cancelSubscription"
                >
                  Cancel Subscription
                </VBtn>
              </div>
            </VCol>
          </VRow>

          <!-- 👉 Confirm Dialog -->
          <ConfirmDialog
            v-model:isDialogVisible="isConfirmDialogVisible"
            confirmation-question="Are you sure to cancel your subscription?"
            cancel-msg="Unsubscription Cancelled!!"
            cancel-title="Cancelled"
            confirm-msg="Your subscription cancelled successfully."
            confirm-title="Unsubscribed!"
          />

          <!-- 👉 plan and pricing dialog -->
          <PricingPlanDialog
            v-model:is-dialog-visible="isPricingPlanDialogVisible"
          />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 👉 Payment Methods -->
    <VCol cols="12">
      <VCard title="Payment Methods">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- 👉 Saved Cards -->
              <VCol cols="12" md="6">
                <h6 class="text-base font-weight-medium mb-6">My Cards</h6>

                <div class="d-flex flex-column gap-y-4">
                  <VCard
                    v-for="card in creditCards"
                    :key="card.name"
                    class="bg-var-theme-background"
                    flat
                  >
                    <VCardText class="d-flex flex-sm-row flex-column">
                      <div class="text-no-wrap">
                        <VImg :src="card.image" width="46" />
                        <h4 class="text-base font-weight-medium my-3">
                          <span class="me-4">
                            {{ card.name }}
                          </span>
                          <VChip
                            v-if="card.isPrimary"
                            label
                            color="primary"
                            density="comfortable"
                          >
                            Primary
                          </VChip>
                        </h4>
                        <span class="text-sm"
                          >**** **** ****
                          {{
                            card.number.substring(card.number.length - 4)
                          }}</span
                        >
                      </div>

                      <VSpacer />

                      <div class="d-flex flex-column text-sm-end">
                        <div class="d-flex flex-wrap gap-4 order-sm-0 order-1">
                          <VBtn
                            variant="outlined"
                            @click="openEditCardDialog(card)"
                          >
                            Edit
                          </VBtn>
                          <VBtn color="secondary" variant="outlined">
                            Delete
                          </VBtn>
                        </div>
                        <span class="mt-sm-auto mb-sm-0 my-5 order-sm-1 order-0"
                          >Card expires at {{ card.expiry }}</span
                        >
                      </div>
                    </VCardText>
                  </VCard>
                </div>

                <!-- 👉 Add Edit Card Dialog -->
                <CardAddEditDialog
                  v-model:isDialogVisible="isCardEditDialogVisible"
                  :card-details="currentCardDetails"
                />
              </VCol>

              <!-- 👉 Payment method action button -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit"> Save changes </VBtn>
                <VBtn
                  color="secondary"
                  variant="outlined"
                  @click="resetPaymentForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<script>
// Images
import store from "@/store/index.js";
import axios from "@axios";
import mastercard from "@images/icons/payments/mastercard.png";
import visa from "@images/icons/payments/visa.png";
import moment from "moment";

export default {
  data() {
    return {
      moment: moment,
      selectedPaymentMethod: "credit-debit-atm-card",
      isConfirmDialogVisible: false,
      isPricingPlanDialogVisible: false,
      isCardEditDialogVisible: false,
      isCardDetailSaveBilling: false,

      creditCards: [
        {
          name: "Tom McBride",
          number: "5531234567899856",
          expiry: "12/23",
          isPrimary: true,
          type: "visa",
          cvv: "456",
          image: visa,
        },
        {
          name: "Mildred Wagner",
          number: "4851234567895896",
          expiry: "10/27",
          isPrimary: false,
          type: "mastercard",
          cvv: "123",
          image: mastercard,
        },
      ],

      countryList: [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "New Zealand",
        "India",
        "Russia",
        "China",
        "Japan",
      ],

      currentCardDetails: "",
      cardNumber: 135632156548789,
      cardName: "john Doe",
      cardExpiryDate: "05/24",
      cardCvv: 420,
    };
  },
  computed: {
    currentPkg() {
      return store.getters.getCurrentPkg;
    },
  },
  methods: {
    openEditCardDialog(cardDetails) {
      this.currentCardDetails = cardDetails;
      this.isCardEditDialogVisible = true;
    },

    resetPaymentForm() {
      this.cardNumber = 135632156548789;
      this.cardName = "john Doe";
      this.cardExpiryDate = "05/24";
      this.cardCvv = 420;
      this.selectedPaymentMethod = "credit-debit-atm-card";
    },
    cancelSubscription() {
      axios
        .get(`cancel-subscription`)
        .then((response) => {
          console.log("user", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    calculateDateDifference(createdAt, expiryDate) {
      // Parse the date strings into Date objects
      const createdDate = new Date(createdAt);
      const expiryDateObj = new Date(expiryDate);

      // Calculate the time difference in milliseconds
      const timeDifference = expiryDateObj - createdDate;

      // Convert the time difference to days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Return the difference as an object
      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    },
  },
  mounted() {
    store.dispatch("getPackageHistory");
  },
};
</script>

<style lang="scss">
.pricing-dialog {
  .pricing-title {
    font-size: 1.5rem !important;
  }

  .v-card {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    box-shadow: none;
  }
}
</style>
