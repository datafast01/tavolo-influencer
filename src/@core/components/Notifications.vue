<script setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { avatarText } from "@core/utils/formatters";
import play1 from "@/assets/images/cards/folder.png";
import RequestAcceptedDialog from "@/pages/contracts/RequestAcceptedDialog.vue";

const props = defineProps({
  notifications: {
    type: Array,
    required: true,
  },
  badgeProps: {
    type: null,
    required: false,
    default: undefined,
  },
  location: {
    type: null,
    required: false,
    default: "bottom end",
  },
});

const showModal = ref(false);
const emit = defineEmits(["read", "unread", "remove", "click:notification"]);

const isAllMarkRead = computed(() =>
  props.notifications.some((item) => item.isSeen === false)
);

const markAllReadOrUnread = () => {
  const allNotificationsIds = props.notifications.map((item) => item.id);
  if (!isAllMarkRead.value) emit("unread", allNotificationsIds);
  else emit("read", allNotificationsIds);
};

const isCardEditDialogVisible = ref(false);
const openEditCardDialog = () => {
  isCardEditDialogVisible.value = true;
};

const sendRequest = () => {
  showModal.value = true;
};
</script>

<template>
  <IconBtn id="notification-btn">
    <VBadge
      dot
      v-bind="props.badgeProps"
      :model-value="props.notifications.some((n) => !n.isSeen)"
      color="error"
      bordered
      offset-x="1"
      offset-y="1"
    >
      <VIcon icon="mdi-bell-outline" />
    </VBadge>

    <VMenu
      activator="parent"
      width="380px"
      :location="props.location"
      offset="14px"
      :close-on-content-click="false"
    >
      <VCard class="d-flex flex-column">
        <!-- 👉 Header -->
        <VCardItem class="notification-section">
          <VCardTitle class="text-lg"> Notifications </VCardTitle>

          <template #append>
            <IconBtn
              v-show="props.notifications.length"
              @click="markAllReadOrUnread"
            >
              <VIcon
                :icon="
                  !isAllMarkRead
                    ? 'mdi-email-outline'
                    : 'mdi-email-open-outline'
                "
              />

              <VTooltip activator="parent" location="start">
                {{ !isAllMarkRead ? "Mark all as unread" : "Mark all as read" }}
              </VTooltip>
            </IconBtn>
          </template>
        </VCardItem>

        <VDivider />

        <!-- 👉 Notifications list -->
        <PerfectScrollbar
          :options="{ wheelPropagation: false }"
          style="max-block-size: 23.75rem"
        >
          <VList class="py-0">
            <template
              v-for="(notification, index) in props.notifications"
              :key="notification.title"
            >
              <VDivider v-if="index > 0" />
              <VListItem
                link
                lines="one"
                min-height="66px"
                class="list-item-hover-class"
                @click="$emit('click:notification', notification)"
              >
                <!-- Slot: Prepend -->
                <!-- Handles Avatar: Image, Icon, Text -->
                <template #prepend>
                  <VListItemAction start>
                    <VAvatar
                      size="40"
                      :color="
                        notification.color && notification.icon
                          ? notification.color
                          : undefined
                      "
                      :image="notification.img || undefined"
                      :icon="notification.icon || undefined"
                      :variant="notification.img ? undefined : 'tonal'"
                    >
                      <span v-if="notification.text">{{
                        avatarText(notification.text)
                      }}</span>
                    </VAvatar>
                  </VListItemAction>
                </template>

                <VListItemTitle>{{ notification.title }}</VListItemTitle>
                <VListItemSubtitle>{{
                  notification.subtitle
                }}</VListItemSubtitle>
                <span class="text-xs text-disabled">{{
                  notification.time
                }}</span>

                <!-- Slot: Append -->
                <template #append>
                  <div class="d-flex flex-column align-center gap-4">
                    <VBadge
                      dot
                      :color="!notification.isSeen ? 'primary' : '#a8aaae'"
                      :class="`${
                        notification.isSeen ? 'visible-in-hover' : ''
                      } ms-1`"
                      @click.stop="
                        $emit(notification.isSeen ? 'unread' : 'read', [
                          notification.id,
                        ])
                      "
                    />

                    <div style="block-size: 28px; inline-size: 28px">
                      <IconBtn
                        size="x-small"
                        class="visible-in-hover"
                        @click="$emit('remove', notification.id)"
                      >
                        <VIcon size="20" icon="mdi-close" />
                      </IconBtn>
                    </div>
                  </div>
                </template>
              </VListItem>
              <VCardText
                v-show="props.notifications.length"
                class="notification-footer"
              >
                <v-row>
                  <v-col>
                    <VBtn color="#3D3759" variant="outlined" class="w-100">
                      <span class="text-white"> LATER</span>
                    </VBtn>
                  </v-col>
                  <v-col>
                    <VBtn @click="sendRequest()" class="w-100"> OPEN </VBtn>
                  </v-col>
                </v-row>
              </VCardText>
            </template>

            <VListItem
              v-show="!props.notifications.length"
              class="text-center text-medium-emphasis"
              style="block-size: 56px"
            >
              <VListItemTitle>No Notification Found!</VListItemTitle>
            </VListItem>
          </VList>
        </PerfectScrollbar>

        <VDivider />

        <!-- 👉 Footer -->
        <VCardText
          v-show="props.notifications.length"
          class="notification-footer"
        >
          <VBtn block> VIEW ALL NOTIFICATIONS </VBtn>
        </VCardText>
      </VCard>
    </VMenu>
  </IconBtn>

  <VDialog v-model="showModal" max-width="700">
    <!-- Dialog Activator -->

    <!-- Dialog Content -->
    <VCard class="pa-3">
      <DialogCloseBtn variant="text" size="small" @click="showModal = false" />
      <VCardText class="text-center text-h5"
        >Send Revision Request<br />
        <span class="text-body-2">For File ‘Lorem Ipsum’</span>
      </VCardText>
      <VCardText>
        <VRow>
          <VCol cols="2"></VCol>
          <VCol cols="8">
            <VCard class="pa-3">
              <div class="me-3 py-1 d-flex align-center justify-space-between">
                <div rounded class="d-flex align-center justifycenter">
                  <div class="bg-darken2">
                    <v-img
                      :src="play1"
                      height="20"
                      width="20"
                      alt="John"
                    ></v-img>
                  </div>
                  <div>
                    <h4 class="text-subtitle-1 l-h">File Name</h4>
                    <span class="font-12">2.8 GB</span>
                  </div>
                </div>
                <div>
                  <div class="text-body-2">Yesterday</div>
                </div>
              </div>
            </VCard>
            <v-textarea
              v-model="text"
              label="Comments"
              row-height="25"
              rows="5"
              variant="outlined"
              auto-grow
              shaped
              class="pt-8"
            ></v-textarea>

            <div class="text-center pt-6">
              <VBtn color="primary mr-4 " @click="openEditCardDialog()"> accept </VBtn>
              <VBtn color="secondary" @click="showModal = false"> deny </VBtn>
            </div>
          </VCol>
          <VCol cols="2"></VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>

  <RequestAcceptedDialog v-model:isDialogVisible="isCardEditDialogVisible" />
</template>

<style lang="scss">
.notification-section {
  padding: 14px !important;
}
.bg-darken2 {
  background-color: #524d6b;
  height: 52px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 12px;
}
.notification-footer {
  padding-block: 0.9375rem !important;
}

.list-item-hover-class {
  .visible-in-hover {
    display: none;
  }

  &:hover {
    .visible-in-hover {
      display: block;
    }
  }
}

.text-white {
  color: #b1acc7 !important;
}
</style>
