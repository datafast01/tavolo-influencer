<template>
  <div class="text-center pa-4" max-width="400">
    <v-dialog
      v-model="dialog"
      max-width="400"
      max-height="500"
      transition="dialog-bottom-transition"
      persistent
      scrollable
    >
      <v-card class="chatdialog">
        <v-toolbar>
          <div>
            <v-img
              class="rounded-circle ml-3"
              :src="avatar"
              height="40"
              width="40"
              alt="John"
            ></v-img>
          </div>
          <v-toolbar-title>Name Surname</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn
              color="#9155FD"
              icon="mdi-minus"
              @click="dialog = false"
            ></v-btn>
            <v-btn
              color="#9155FD"
              icon="mdi-crop-square"
              @click="dialog = false"
            ></v-btn>
            <v-btn
              color="#9155FD"
              icon="mdi-close"
              @click="dialog = false"
            ></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <Chat />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import avatar from "../../../assets/images/avatars/avatar-1.png";
import Chat from "./chat.vue";
export default {
  components: { Chat },
  data() {
    return {
      avatar: avatar,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
};
</script>

<style scoped>
::v-deep .v-overlay__scrim,
::v-deep .v-navigation-drawer__scrim {
  background: rgb(44 41 66 / 0%) !important;
  opacity: 1 !important;
  width: 0px !important;
}

.v-dialog {
  align-items: center;
  justify-content: end !important;
  margin-left: auto;
}
.v-overlay {
  top: 195px;
}
.v-toolbar {
  background: none;
  color: none;
}
.chatdialog {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}
::v-deep .vac-room-header {
  background: #f8f9fa00;
}
.vac-col-messages .vac-container-scroll {
  background: #f8f9fa00;
}
.vac-room-header {
  background: #f8f9fa00;
}
</style>
