<template>
  <Notifications :notifications="notifications" @remove="removeNotification" @read="markRead" @unread="markUnRead"
    @click:notification="handleNotificationClick" @click="listNotifications" />

</template>

<script>
import store from "@/store/index.js";

export default {
  data() {
    return {

    }
  },
  computed: {
    notifications() {
      return store.getters.getnotification
    }
  },
  methoths: {
    listNotifications() {
      store.dispatch('listNotifications')
    },
    // const removeNotification = (notificationId) => {
    //   notifications.value.forEach((item, index) => {
    //     if (notificationId === item.id) notifications.value.splice(index, 1);
    //   });
    // };
  }
}





// const markRead = (notificationId) => {
//   notifications.value.forEach((item) => {
//     notificationId.forEach((id) => {
//       if (id === item.id) item.isSeen = true;
//     });
//   });
// };

// const markUnRead = (notificationId) => {
//   notifications.value.forEach((item) => {
//     notificationId.forEach((id) => {
//       if (id === item.id) item.isSeen = false;
//     });
//   });
// };

// const handleNotificationClick = (notification) => {
//   if (!notification.isSeen) markRead([notification.id]);
// };
</script>
