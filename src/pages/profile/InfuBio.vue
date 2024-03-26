<template>
  <div>
    <div class="my-8" v-for="bio in details" :key="bio">
      <div class="d-flex justify-space-between">
        <span class="ml-2"> {{ bio.heading }}</span>
        <button @click="bioEditDialog" class="ml-2">
          <v-icon>mdi-pencil</v-icon>
        </button>
      </div>
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
    <BioEditDialog v-model:isDialogVisible="bioEditDialogVisible" />
  </div>
</template>

<script>
import BioEditDialog from "./BioEditDialog.vue"
export default {
  components:{BioEditDialog},
  props: {
    details: {
      type: Object,
      default: {},
    },
  },
  data() {
    return{
      bioEditDialogVisible:false,
    }
  },

  methods: {
    bioEditDialog() {
      this.bioEditDialogVisible = true;
    },
  },
};
</script>

<style></style>
