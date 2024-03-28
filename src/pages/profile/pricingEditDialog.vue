<script setup>
import { requiredValidator } from "@validators";
import { ref } from "vue";
const props = defineProps({
  cardDetails: {
    type: Object,
    required: false,
    default: () => ({
      number: "",
      name: "",
      expiry: "",
      cvv: "",
      isPrimary: false,
      type: "",
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
});

// Define items array
const item = ref([
  "Better Engagement",
  "Post and Story",
  "Instagram and Facebook",
  "Usage Rights",
  "fizzbuzz",
  "foobar",
]);

// Define values array
const values = ref([
  "Better Engagement",
  "Post and Story",
  "Instagram and Facebook",
  "Usage Rights",
  "fizzbuzz",
]);

// Example function for chip click
const ship = () => {
  // Your logic here
};
const price = ref("$ 75.00");
const Description = ref(
  "For most businesses that want to optimize their sales"
);
const Popular = ref("Popular");
const toggle = ref("single");
const location = ref("Popular");
const locations = ref("US Dollar ($)");
const emit = defineEmits(["submit", "update:isDialogVisible"]);

const cardDetails = ref(structuredClone(toRaw(props.cardDetails)));

watch(props, () => {
  cardDetails.value = structuredClone(toRaw(props.cardDetails));
});

// const formSubmit = () => {
//   emit("submit", cardDetails.value);
// };
</script>
<script>
import done from "@/assets/images/cards/done2.png";
export default {
  data: () => ({
    done: done,
    ratingw: 0.5,
    ratingw1: 0.5,
    ratingw2: 0.5,
  }),
  computed: {
    computedTotalScore: function () {
      // Calculate the sum of the first two ratings
      let totalScore = (this.ratingw + this.ratingw1 + this.ratingw2) / 3;
      return totalScore.toFixed(1);
    },
  },
};
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 860"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <VCard class="pa-5 pa-sm-8">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('update:isDialogVisible', false)"
      />

      <VCardText class="text-h5">
        <VForm class="mt-0">
          <VRow>
            <VCol cols="12" class="text-center">
              <span class="text-h5">Edit Your Pricing </span>
            </VCol>
            <VCol cols="4">
              <v-select
                :items="[
                  'California',
                  'Colorado',
                  'Florida',
                  'Georgia',
                  'Texas',
                  'Wyoming',
                ]"
                variant="solo-filled"
                dense
                v-model="location"
              >
              </v-select>
            </VCol>
            <VCol cols="8">
              <v-btn-toggle
                class="w-100"
                style="height: 55px"
                v-model="toggle"
                color="primary"
                variant="outlined"
                mandatory
              >
                <v-btn class="w-50" value="single">Single</v-btn>
                <v-btn class="w-50" value="monthly">Monthly</v-btn>
              </v-btn-toggle>
            </VCol>

            <VCol cols="12" class="mt-3">
              <VTextField
                v-model="Popular"
                label="Title"
                Value="Lorem Ipsum"
                :rules="[requiredValidator, alphaValidator, isNameValid]"
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="Description"
                label="Description"
                Value="Lorem Ipsum"
                :rules="[requiredValidator, alphaValidator, isNameValid]"
              />
            </VCol>

            <VCol cols="12">
              <v-select
                v-model="values"
                :items="item"
                label="Select Item"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip
                    label
                    class="ma-1"
                    closable
                    @click="ship"
                    color="primary"
                  >
                    <span>{{ item.title }}</span>
                  </v-chip>
                </template>
              </v-select>
            </VCol>

            <VCol cols="8">
              <VTextField
                v-model="price"
                label="Price"
                Value="Lorem Ipsum"
                :rules="[requiredValidator, alphaValidator, isNameValid]"
              />
            </VCol>
            <VCol cols="4">
              <v-select
                :items="[
                  'US Dollar ($)',
                  'USA Dollar ($)',
                  ' Dollar ($)',
                  'US Dollar ($)',
                  'US Dollar ($)',
                  'US Dollar ($)',
                ]"
                dense
                v-model="locations"
              >
              </v-select>
            </VCol>
            <VCol>
              <div class="text-center mt-3">
                <VBtn color="secondary mr-4" @click="showModal = false">
                  Cancel
                </VBtn>
                <VBtn color="primary  " @click="sendCampaign">
                  UPDATE
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
