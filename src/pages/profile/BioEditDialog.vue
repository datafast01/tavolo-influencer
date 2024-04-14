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

  }),

};
</script>

<template>
  <VDialog :width="$vuetify.display.smAndDown ? 'auto' : 860" :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)">
    <VCard class="pa-5 pa-sm-8">
      <DialogCloseBtn variant="text" size="small" @click="$emit('update:isDialogVisible', false)" />

      <VCardText class="text-h5">
        <VForm class="mt-6">
          <VRow>
            <VCol cols="12">
              <span class="text-h6">Bio </span>
            </VCol>
            <VCol cols="12">
              <label class="text-body-2" for="">ABOUT</label>
              <VTextField Value="Lorem Ipsum" :rules="[requiredValidator, alphaValidator, isNameValid]" />
            </VCol>

            <VCol cols="12">
              <label class="text-body-2" for="">PROFESSION</label>
              <VTextField Value="Lorem Ipsum" :rules="[requiredValidator, alphaValidator, isNameValid]" />
            </VCol>

            <VCol cols="12">
              <label class="text-body-2" for="">EDUCATION</label>
              <VTextField Value="Lorem Ipsum" :rules="[requiredValidator, alphaValidator, isNameValid]" />
            </VCol>
            <VCol cols="12">
              <label class="text-body-2" for="">EXPERIENCE</label>
              <VTextField Value="Lorem Ipsum" :rules="[requiredValidator, alphaValidator, isNameValid]" />
            </VCol>
            <VCol cols="12">
              <label class="text-body-2" for="">INTERESTS</label>
              <VTextField Value="Lorem Ipsum" :rules="[requiredValidator, alphaValidator, isNameValid]" />
            </VCol>
            <VCol cols="12">
              <label class="text-body-2" for="">ACHIEVEMENTS</label>
              <VTextField Value="Lorem Ipsum" :rules="[requiredValidator, alphaValidator, isNameValid]" />
            </VCol>
            <VCol cols="12">
              <label class="text-body-2" for="">SOCIAL ACCOUNTS</label>
              <VTextField Value="Lorem Ipsum" :rules="[requiredValidator, alphaValidator, isNameValid]" />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
