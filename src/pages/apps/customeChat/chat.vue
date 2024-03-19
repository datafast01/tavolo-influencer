<template>
  <div>
    <vue-advanced-chat
      height="calc(50vh - 10px)"
      :current-user-id="currentUserId"
      :rooms="JSON.stringify(rooms)"
      :rooms-loaded="true"
      :messages="JSON.stringify(messages)"
      :single-room="true"
      :messages-loaded="messagesLoaded"
      @send-message="sendMessage($event.detail[0])"
      @fetch-messages="fetchMessages($event.detail[0])"
      style="
        background: #383452;
        --chat-header-bg-color: #383452;
        --chat-content-bg-color: #383452;
        --chat-footer-bg-color: #383452;
        --chat-message-bg-color: #3d3759;
        --chat-bg-color-input: #3d3759;
        --chat-color: #fff;
        --chat-message-color: #ffffff;
        --chat-header-color-name: #ffffff;
        --chat-dropdown-bg-color: #3d3759;
        --chat-message-bg-color-date: #3d3759;
        --chat-message-bg-color-me: #3d3759;
        --chat-dropdown-bg-color-hover: #312d4b;
        --chat-bg-scroll-icon: #312d4b;
        --chat-message-bg-color-selected: #3a345f;
      "
    />
  </div>
</template>

<script>
import { register } from "vue-advanced-chat";
// import { register } from '../../vue-advanced-chat/dist/vue-advanced-chat.es.js'
register();

export default {
  data() {
    return {
      currentUserId: "1234",
      rooms: [
        {
          roomId: "1",
          roomName: "Name",
          avatar: "https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj",
          users: [
            { _id: "1234", username: "John Doe" },
            { _id: "4321", username: "John Snow" },
          ],
        },
      ],
      messages: [],
      messagesLoaded: false,
    };
  },

  methods: {
    fetchMessages({ options = {} }) {
      setTimeout(() => {
        if (options.reset) {
          this.messages = this.addMessages(true);
        } else {
          this.messages = [...this.addMessages(), ...this.messages];
          this.messagesLoaded = true;
        }
        // this.addNewMessage()
      });
    },

    addMessages(reset) {
      const messages = [];

      for (let i = 0; i < 30; i++) {
        messages.push({
          _id: reset ? i : this.messages.length + i,
          content: `${reset ? "" : "paginated"} message ${i + 1}`,
          senderId: "4321",
          username: "John Doe",
          date: "13 November",
          timestamp: "10:20",
        });
      }

      return messages;
    },

    sendMessage(message) {
      this.messages = [
        ...this.messages,
        {
          _id: this.messages.length,
          content: message.content,
          senderId: this.currentUserId,
          timestamp: new Date().toString().substring(16, 21),
          date: new Date().toDateString(),
        },
      ];
    },

    addNewMessage() {
      setTimeout(() => {
        this.messages = [
          ...this.messages,
          {
            _id: this.messages.length,
            content: "NEW MESSAGE",
            senderId: "1234",
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString(),
          },
        ];
      }, 2000);
    },
  },
};
</script>

<style>
.vac-room-header {
  background: #f8f9fa00;
}
::v-deep .vac-col-messages .vac-container-scroll {
  background: #f8f9fa00 !important;
}

.v-toolbar {
  color: blue;
}
</style>
