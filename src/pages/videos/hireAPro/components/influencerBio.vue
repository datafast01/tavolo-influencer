<template>
  <div>
    <div class="my-8" v-for="bio in details" :key="bio">
      <span class="ml-2"> {{ bio.heading }}</span>
      <v-card class="mt-4" elevation="16">
        <v-card-text v-if="bio.accounts">
          <div
            class="d-flex justify-space-between my-5"
            v-for="account in bio.accounts"
            :key="account"
          >
            <div>
              <v-icon>{{
                account.account == "Facebook"
                  ? "mdi-facebook"
                  : account.account == "Instagram"
                  ? "mdi-instagram"
                  : "mdi-music-note"
              }}</v-icon>
              {{ account.account }}
            </div>
            <div>
              <VBtn
                icon
                variant="outlined"
                size="small"
                color="secondary"
                class="rounded"
              >
                <VIcon
                  size="24"
                  icon="mdi-link-variant
                        "
                />
              </VBtn>
            </div>
          </div>
        </v-card-text>
        <v-card-text v-else>
          {{ bio.desc }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: {},
    },
  },
  data() {},
};
</script>

<style></style>
