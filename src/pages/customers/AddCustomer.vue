<script setup>
import { emailValidator, requiredValidator } from "@validators";

const props = defineProps({
  isCreateDialog: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isCreateDialog", "userData"]);

const isFormValid = ref(false);
const refForm = ref();
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const aov = ref("");
const repeated = ref(false);
const phone = ref("");
const lastDiningBehaviour = ref("");

const totalVisits = ref("");
const lastVisitedDate = ref(
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10)
);
// console.log(lastVisitedDate.value);

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit(
        "userData",
        {
          firstname: firstname.value,
          lastname: lastname.value,
          repeated: repeated.value,
          email: email.value,
          aov: aov.value,
          phone: phone.value,
          totalVisits: totalVisits.value,
          lastDiningBehaviour: lastDiningBehaviour.value,
          lastVisitedDate: lastVisitedDate.value,
        },
        emit("update:isCreateDialog", false)
      );

      nextTick(() => {
        refForm.value?.reset();
        refForm.value?.resetValidation();
      });
    }
  });
};

const onFormReset = () => {
  emit("update:isCreateDialog", false);
};
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isCreateDialog"
    @update:model-value="dialogVisibleUpdate"
  >
    <VCard class="pa-sm-9 pa-5">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn variant="text" size="small" @click="onFormReset" />

      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-6">
          Create Customer Information
        </VCardTitle>
        <VCardSubtitle>
          Creating customer details will receive a privacy audit.
        </VCardSubtitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm class="mt-6" ref="refForm" @submit.prevent="onSubmit">
          <VRow>
            <!-- 👉 Full Name -->
            <VCol cols="12" md="6">
              <VTextField
                v-model="firstname"
                :rules="[requiredValidator]"
                label="First Name"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="lastname"
                :rules="[requiredValidator]"
                label="Last Name"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="email"
                :rules="[requiredValidator, emailValidator]"
                label="Email"
              />
            </VCol>

            <!-- 👉 company -->

            <!-- 👉 Contact -->
            <VCol cols="12" md="6">
              <VTextField
                v-model="phone"
                :rules="[requiredValidator]"
                label="Phone Number"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField v-model="aov" type="number" label="Customer's AOV" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="totalVisits"
                type="number"
                label="Total Visits"
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model="lastDiningBehaviour"
                label="Last Dining Behavior"
              />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="lastVisitedDate"
                :rules="[requiredValidator]"
                label="Last Visit Date"
                clearable
                type="date"
              />
            </VCol>

            <!-- 👉 Status -->
            <VCol cols="12" md="6">
              <VSelect
                v-model="repeated"
                label="Repeated Customer"
                :items="[
                  { title: 'YES', value: true },
                  { title: 'NO', value: false },
                ]"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol cols="12" class="d-flex flex-wrap justify-center gap-4">
              <VBtn type="submit"> Submit </VBtn>

              <VBtn color="secondary" variant="tonal" @click="onFormReset">
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
.app-picker-field {
  width: 100% !important;
}
</style>
