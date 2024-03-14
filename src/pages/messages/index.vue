<template>
  <div class="d-flex flex-column">
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <div class="autoDatePicker">
      <VTextField
        v-model="scheduleDate"
        label="Schedule Date"
        clear-icon="mdi-close"
        clearable
        type="date"
      />
      <VRadioGroup v-model="selectedSchedule" :inline="true">
        <VRadio label="Auto Sending" value="notSchedule" color="primary" />
        <VRadio label="Scheduled" value="schedule" color="primary" />
      </VRadioGroup>
    </div>
    <VCard class="email-compose-dialog" elevation="24">
      <VCardItem class="py-3 px-5">
        <div class="d-flex align-center">
          <span class="font-weight-medium">Write a message</span>
          <VSpacer />
        </div>
      </VCardItem>
      <div class="px-4">
        <div class="mt-4">
          <VSelect
            v-model="segment"
            :items="segments"
            density="compact"
            item-title="name"
            item-value="_id"
            single-line
          >
            <template #prepend-inner>
              <div class="text-disabled" style="width: max-content">
                Select Segment:
              </div>
            </template>
          </VSelect>
        </div>

        <VSelect
          v-model="sampleMessage"
          :items="sampleMessages"
          density="compact"
          single-line
          class="my-4"
        >
          <template #prepend-inner>
            <div class="text-disabled" style="width: max-content">
              Select Sample Message:
            </div>
          </template>
        </VSelect>

        <VDivider />

        <VTextarea v-model="sampleMessage" placeholder="Message" />
      </div>

      <VDivider />

      <div class="d-flex align-center px-5 py-4">
        <VBtnGroup color="primary" divided density="comfortable">
          <VBtn @click="sendEmail">Send</VBtn>
          <VBtn icon @click="() => (isMenuOpen = !isMenuOpen)">
            <VIcon
              :icon="isMenuOpen ? 'mdi-menu-up' : 'mdi-menu-down'"
              size="24"
            />
            <VMenu activator="parent">
              <VList :items="['Schedule Mail']" />
            </VMenu>
          </VBtn>
        </VBtnGroup>

        <VSpacer />
      </div>
    </VCard>
  </div>
</template>

<script setup>
import store from "@/store/index.js";
import axios from "@axios";
const emit = defineEmits(["close"]);

const segment = ref("650e0f5b6df52a436ca3f12e");
let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");
const message = ref("");
const isMenuOpen = ref(false);
const scheduleDate = ref(
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
);
const selectedSchedule = ref("schedule");

const resetValues = () => {
  to.value = subject.value = message.value = "";
};
const sampleMessage = ref("");
const sampleMessages = ref([
  "Mother’s Day Special this week. Get 20% off all drinks on Sunday!",
  "Who doesn’t love loaded fries? Get loaded fries with any burger order this week!",
  "We haven’t seen you stop by in a while. We’d love to have you try some of our new menu items!",
  "Have an anniversary or birthday coming up? Book now and receive a complimentary bottle of champagne!",
]);
const segments = ref([]);
const getEmailSegmnts = () => {
  axios
    .get(`dashboard/segmant`)
    .then((res) => {
      segments.value = res.data.data;
      store.dispatch("getPackageHistory");
    })
    .catch((err) => {
      console.log(err);
    });
};
getEmailSegmnts();

const sendEmail = () => {
  let payload = {
    segmantId: segment.value,

    message: sampleMessage.value,
    schedule: selectedSchedule.value == "schedule" ? "true" : "false",
    scheduleDate: scheduleDate.value,
  };
  axios
    .post(`dashboard/message`, payload)
    .then((res) => {
      show.value = true;
      snkMsg.value = "Message sent successfully";
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

<style lang="scss" scoped>
.autoDatePicker {
  margin-bottom: 30px;
  width: 300px;
}

.email-compose-dialog {
  z-index: 910 !important;

  .v-field--prepended {
    padding-inline-start: 20px;
  }

  .v-card-item {
    background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
  }

  .v-textarea .v-field {
    --v-field-padding-start: 20px;
  }

  .v-field__outline {
    display: none;
  }
}
</style>
