<script setup>
import avatar5 from "@images/avatars/avatar-5.png";
const date = new Date();
const month = date.getMonth();
const day = date.getDay();
const notifications = ref([
  // {
  //   id: 1,
  //   img: avatar4,
  //   title: 'Congratulation Flora! 🎉',
  //   subtitle: 'Won the monthly best seller badge',
  //   time: 'Today',
  //   isSeen: true,
  // },
  // {
  //   id: 2,
  //   text: 'Tom Holland',
  //   title: 'New user registered.',
  //   subtitle: '5 hours ago',
  //   time: 'Yesterday',
  //   isSeen: false,
  // },
  {
    id: 3,
    img: avatar5,
    title: "New account registered 👋🏻",
    subtitle: "Welcome to Tavolo.ai",
    time: "Today",
    isSeen: true,
  },
  // {
  //   id: 4,
  //   img: paypal,
  //   title: 'Paypal',
  //   subtitle: 'Received Payment',
  //   time: '25 May',
  //   isSeen: false,
  //   color: 'error',
  // },
  // {
  //   id: 5,
  //   img: avatar3,
  //   title: 'Received Order 📦',
  //   subtitle: 'New order received from john',
  //   time: '19 Mar',
  //   isSeen: true,
  // },
]);

const removeNotification = (notificationId) => {
  notifications.value.forEach((item, index) => {
    if (notificationId === item.id) notifications.value.splice(index, 1);
  });
};

const markRead = (notificationId) => {
  notifications.value.forEach((item) => {
    notificationId.forEach((id) => {
      if (id === item.id) item.isSeen = true;
    });
  });
};

const markUnRead = (notificationId) => {
  notifications.value.forEach((item) => {
    notificationId.forEach((id) => {
      if (id === item.id) item.isSeen = false;
    });
  });
};

const handleNotificationClick = (notification) => {
  if (!notification.isSeen) markRead([notification.id]);
};
</script>

<template>
  <Notifications
    :notifications="notifications"
    @remove="removeNotification"
    @read="markRead"
    @unread="markUnRead"
    @click:notification="handleNotificationClick"
  />
</template>
