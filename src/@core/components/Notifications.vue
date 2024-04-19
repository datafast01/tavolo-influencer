<template>
  <IconBtn id="notification-btn">
    <VBadge dot :model-value="props.notifications.some((n) => n.status == 'unread')" color="error" bordered offset-x="1"
      offset-y="1">
      <VIcon icon="mdi-bell-outline" />
    </VBadge>

    <VMenu activator="parent" width="380px" :location="props.location" offset="14px" :close-on-content-click="false">
      <VCard class="d-flex flex-column">
        <!-- 👉 Header -->
        <VCardItem class="notification-section">
          <VCardTitle class="text-lg"> Notifications </VCardTitle>

          <template #append>
            <IconBtn v-show="props.notifications.length" @click="markAllReadOrUnread">
              <VIcon :icon="!isAllMarkRead
                ? 'mdi-email-outline'
                : 'mdi-email-open-outline'
                " />

              <VTooltip activator="parent" location="start">
                {{ !isAllMarkRead ? "Mark all as unread" : "Mark all as read" }}
              </VTooltip>
            </IconBtn>
          </template>
        </VCardItem>

        <VDivider />

        <!-- 👉 Notifications list -->
        <PerfectScrollbar :options="{ wheelPropagation: false }" style="max-block-size: 23.75rem">

          <VList class="py-0">
            <template v-for="(notification, index) in props.notifications" :key="index">
              <VDivider v-if="index > 0" />
              <VListItem link lines="one" min-height="66px" class="list-item-hover-class"
                @click="$emit('click:notification', notification)">
                <!-- Slot: Prepend -->
                <!-- Handles Avatar: Image, Icon, Text -->


                <VListItemTitle>{{ notification.title }}</VListItemTitle>
                <VListItemSubtitle>{{
                  notification.message
                }}</VListItemSubtitle>
                <span class="text-xs text-disabled">{{
                  notification.updatedAt
                }}</span>

                <!-- Slot: Append -->
                <template #append>
                  <div class="d-flex flex-column align-center gap-4">
                    <VBadge dot :color="notification.status == 'unread' ? 'primary' : '#a8aaae'" :class="`${notification.status == 'unread' ? 'visible-in-hover' : ''
                      } ms-1`" @click.stop="
                        changeStatus(notification._id, notification.status)
                        " />

                    <div style="block-size: 28px; inline-size: 28px">
                      <IconBtn size="x-small" class="visible-in-hover" @click="removeNotification(notification._id)">
                        <VIcon size="20" icon="mdi-close" />
                      </IconBtn>
                    </div>
                  </div>
                </template>
              </VListItem>

            </template>

            <VListItem v-show="!props.notifications.length" class="text-center text-medium-emphasis"
              style="block-size: 56px">
              <VListItemTitle>No Notification Found!</VListItemTitle>
            </VListItem>
          </VList>
        </PerfectScrollbar>

        <VDivider />


        <VCardText v-show="props.notifications.length" class="notification-footer">
          <VBtn block> VIEW ALL NOTIFICATIONS </VBtn>
        </VCardText>
      </VCard>
    </VMenu>
  </IconBtn>



</template>

<script setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { avatarText } from "@core/utils/formatters";
import play1 from "@/assets/images/cards/folder.png";
import RequestAcceptedDialog from "@/pages/contracts/RequestAcceptedDialog.vue";
import moment from "moment";



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


const emit = defineEmits(["read", "unread", "remove", "click:notification"]);

const isAllMarkRead = computed(() =>
  props.notifications.some((item) => item.status === false)
);

const markAllReadOrUnread = () => {
  const allNotificationsIds = props.notifications.map((item) => item.id);
  if (!isAllMarkRead.value) emit("unread", allNotificationsIds);
  else emit("read", allNotificationsIds);
};

const removeNotification = (notificationId) => {

  props.notifications.forEach((item, index) => {
    if (notificationId === item._id) {

      props.notifications.splice(index, 1)
    }
  });
};
const changeStatus = (notificationId) => {
  props.notifications.forEach((item) => {
    if (notificationId === item._id && item.status == 'unread') {
      item.status = 'read'
    } else if
      (notificationId === item._id && item.status == 'read') {
      item.status = 'unread'
    }


  });
};



</script>

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
