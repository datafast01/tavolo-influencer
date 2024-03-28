<script setup>
import store from "@/store/index.js";
import ScrollToTop from "@core/components/ScrollToTop.vue";
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";
import { computed } from "vue";
import { useTheme } from "vuetify";
import Default from "./layouts/default.vue";
const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
  handleSkinChanges,
} = useThemeConfig();

const { global } = useTheme();

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme();
syncConfigThemeWithVuetifyTheme();
handleSkinChanges();
const userProfile = computed(() => {
  // console.log(store.getters);
  return store.getters.userProfile;
});
// onMounted(() => {
//   // Check for URL parameters after the component is mounted
//   store.dispatch("getProfile");
// });
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(
    global.current.value.colors.primary
  )}`">
      <template v-if="['login', 'register', 'forgot-password'].includes($route.name)">
        <RouterView />
      </template>
      <div v-show="!['login', 'register', 'forgot-password'].includes($route.name)">
        <Default />
        <ScrollToTop />
      </div>
    </VApp>
  </VLocaleProvider>
</template>

<style scoped>
.pos-alert {
  position: fixed;
  left: 40%;
  z-index: 999;
}
</style>
