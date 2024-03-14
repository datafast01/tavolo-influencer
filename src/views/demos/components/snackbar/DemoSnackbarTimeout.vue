<script setup>
const props = defineProps({
  message: {
    type: String,
    required: false,
  },
});
const isSnackbarVisible = ref(false);
const showSnackbar = () => {
  isSnackbarVisible.value = true;
};
</script>

<template>
  <!-- Snackbar -->
  <VSnackbar v-model="isSnackbarVisible" :timeout="2000">
    {{ message }}
  </VSnackbar>
</template>
