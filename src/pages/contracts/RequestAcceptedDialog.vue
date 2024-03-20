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

      <VCardText class="text-center text-h5"
        ><div class="text-h4 pb-2">Revision Request Accepted!</div>

        <span class="text-body-2"
          >For File ‘Lorem Ipsum’</span
        >
      </VCardText>
    </VCard>
  </VDialog>
</template>
