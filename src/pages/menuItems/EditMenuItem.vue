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
      title="Edit Customer"
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
                  v-model="menuItemData.name"
                  :rules="[requiredValidator]"
                  label="Menu Item"
                />
              </VCol>

              <!-- 👉 Username -->
              <VCol cols="12">
                <VTextField
                  v-model="menuItemData.price"
                  :rules="[requiredValidator]"
                  label="Price"
                  type="number"
                />
              </VCol>

              <!-- 👉 Number of Customers -->
              <VCol cols="12">
                <VTextField
                  v-model="menuItemData.noOfCustomersOrdered"
                  :rules="[requiredValidator]"
                  label="Number of Customers"
                />
              </VCol>

              <!-- 👉 noOfTimesOrdered -->
              <VCol cols="12">
                <VTextField
                  v-model="menuItemData.noOfTimesOrdered"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Number of times ordered"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="menuItemData.percentageOfTotalRevenue"
                  type="number"
                  :rules="[requiredValidator]"
                  label="Percentage of total revenue"
                />
              </VCol>

              <!-- 👉 Status -->
              <VCol cols="12">
                <VCheckbox
                  label="Is Available"
                  v-model="menuItemData.available"
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
<script setup>
import { requiredValidator } from "@validators";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  menuItemData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["update:isDrawerOpen", "userData"]);

const isFormValid = ref(false);
const refForm = ref();

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit("update:isDrawerOpen", false);
};

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit("userData", props.menuItemData, emit("update:isDrawerOpen", false));

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
<style scoped>
.app-picker-field {
  width: 100% !important;
}
</style>
