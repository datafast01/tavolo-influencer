<script setup>
import { requiredValidator } from "@validators";

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
        <VForm class="mt-6">
          <VRow>
            <VCol cols="12">
              <span class="text-h6">Pricing </span>
            </VCol>
            <VCol cols="12">
              <label class="text-body-2" for="">Packages</label>
              <VTextField
                Value="Lorem Ipsum"
                :rules="[requiredValidator, alphaValidator, isNameValid]"
              />
            </VCol>

            <VCol cols="12">
              <label class="text-body-2" for="">Pricing</label>
              <VTextField
                Value="Lorem Ipsum"
                :rules="[requiredValidator, alphaValidator, isNameValid]"
              />
            </VCol>

            <VCol cols="12">
              <label class="text-body-2" for="">Discription</label>
              <VTextField
                Value="Lorem Ipsum"
                :rules="[requiredValidator, alphaValidator, isNameValid]"
              />
            </VCol>
            <VCol>
              <div class="d-flex justify-center flex-wrap ga-2">
                <v-chip  closable @click="ship" color="primary"> Good Engagement </v-chip>
                <v-chip  closable @click="ship" color="primary"> Post and Story </v-chip>
                <v-chip  closable @click="ship" color="primary"> Instagram </v-chip>
                <v-chip  closable @click="ship" color="primary"> Usage Rights </v-chip>
                <v-chip  closable @click="ship" color="primary"> 10 Recordings Per Month </v-chip>
                <v-chip  closable @click="ship" color="primary"> Usage Rights </v-chip>
              </div>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
