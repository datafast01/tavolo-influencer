<script setup>
import { requiredValidator } from "@validators";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isDrawerOpen", "userData"]);

const isFormValid = ref(false);
const refForm = ref();
const name = ref("");
const price = ref("");
const noOfCustomersOrdered = ref("");
const noOfTimesOrdered = ref("");
const percentageOfTotalRevenue = ref("");
const available = ref(false);

// const totalVisits = ref("");

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit("update:isDrawerOpen", false);
  nextTick(() => {
    refForm.value?.reset();
    refForm.value?.resetValidation();
  });
};

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit(
        "userData",
        {
          name: name.value,
          price: price.value,

          noOfCustomersOrdered: noOfCustomersOrdered.value,
          noOfTimesOrdered: noOfTimesOrdered.value,
          percentageOfTotalRevenue: percentageOfTotalRevenue.value,
          available: available.value,
        },
        emit("update:isDrawerOpen", false)
      );

      nextTick(() => {
        refForm.value?.reset();
        refForm.value?.resetValidation();
      });
    }
  });
};

const handleDrawerModelValueUpdate = (val) => {
  emit("update:isDrawerOpen", val);
};
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add New Customer"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 Full name -->
              <VCol cols="12">
                <VTextField
                  v-model="name"
                  :rules="[requiredValidator]"
                  label="Menu Item"
                />
              </VCol>

              <!-- 👉 Username -->
              <VCol cols="12">
                <VTextField
                  v-model="price"
                  :rules="[requiredValidator]"
                  label="Price"
                  type="number"
                />
              </VCol>

              <!-- 👉 Number of Customers -->
              <VCol cols="12">
                <VTextField
                  v-model="noOfCustomersOrdered"
                  :rules="[requiredValidator]"
                  label="Number of Customers"
                />
              </VCol>

              <!-- 👉 noOfTimesOrdered -->
              <VCol cols="12">
                <VTextField
                  v-model="noOfTimesOrdered"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Number of times ordered"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="percentageOfTotalRevenue"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Percentage of total revenue"
                />
              </VCol>

              <!-- 👉 Status -->
              <VCol cols="12">
                <VCheckbox
                  label="Is Available"
                  v-model="available"
                  class="ml-3"
                ></VCheckbox>
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn type="submit" class="me-3"> Submit </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style scoped>
.app-picker-field {
  width: 100% !important;
}
</style>
