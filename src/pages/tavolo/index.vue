<template>
  <div class="d-flex flex-column">
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <VCheckbox
      label="Search From Tavolo Customers"
      v-model="isCustomer"
      @change="handleChange"
      class="ml-3"
    ></VCheckbox>

    <VLayout class="chat-app-layout bg-surface ml-3" style="height: 505px">
      <VNavigationDrawer
        v-model="isActiveChatUserProfileSidebarOpen"
        width="374"
        absolute
        temporary
        location="end"
        touchless
        class="active-chat-user-profile-sidebar"
      >
        <ChatActiveChatUserProfileSidebarContent
          @close="isActiveChatUserProfileSidebarOpen = false"
        />
      </VNavigationDrawer>

      <!-- 👉 Left sidebar   -->
      <VNavigationDrawer
        v-if="isCustomer"
        v-model="isLeftSidebarOpen"
        absolute
        touchless
        location="start"
        width="370"
        :temporary="$vuetify.display.smAndDown"
        class="chat-list-sidebar"
        :permanent="$vuetify.display.mdAndUp"
      >
        <VDivider />
        <PerfectScrollbar
          tag="ul"
          class="chat-contacts-list px-3"
          :options="{ wheelPropagation: false }"
        >
          <div v-if="isCustomer">
            <span
              class="chat-contact-header d-block text-primary text-xl font-weight-medium my-3"
              >Example Prompts</span
            >
            <li
              v-for="prompt in promptsListing"
              :key="prompt.key"
              class="chat-contact cursor-pointer d-flex align-center"
              :class="isActive == prompt.key ? 'chat-contact-active' : ''"
              @click="active(prompt)"
            >
              <div class="flex-grow-1 ms-4 overflow-hidden">
                <span>{{ prompt.value }}</span>
              </div>
            </li>
          </div>
        </PerfectScrollbar>
      </VNavigationDrawer>

      <!-- 👉 Chat content -->
      <VMain class="chat-content-container">
        <!-- 👉 Right content: Active Chat -->
        <div class="d-flex flex-column h-100">
          <VDivider />

          <!-- Chat log -->
          <PerfectScrollbar
            ref="chatLogPS"
            tag="ul"
            :options="{ wheelPropagation: false }"
            class="flex-grow-1"
          >
            <div class="chat-log pa-5">
              <div class="chat-group d-flex justify-space-between">
                <div
                  class="chat-body d-inline-flex flex-column align-start"
                  style="max-width: 358px"
                  v-if="isResponse"
                >
                  <span
                    class="chat-content text-sm py-3 px-4 elevation-1 bg-surface chat-left mt-5"
                  >
                    <div style="white-space: break-spaces" v-if="isCustomer">
                      <div v-if="AiResponse.length > 0">
                        <div v-for="(items, index) in AiResponse" :key="index">
                          <div class="d-flex flex-column mb-3">
                            {{ index + 1 }}:
                            <span>
                              Customer Name: {{ items.firstname }}
                              {{ items.lastname }}
                            </span>

                            <span> Email: {{ items.email }} </span>
                            <span> Phone: {{ items.phone }} </span>
                            <span>
                              Repeated: {{ items.repeated ? "YES" : "NO" }}
                            </span>
                            <span>
                              Last Visited Date: {{ items?.lastVisitedDate }}
                            </span>
                            <span>
                              Total Visites: {{ items?.totalVisits }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span v-else> No Data Available </span>
                    </div>
                    <div style="white-space: break-spaces" v-else>
                      {{ AiResponse }}
                    </div>
                  </span>
                </div>
                <div
                  class="chat-body d-inline-flex flex-column align-end"
                  v-if="isPrompt"
                >
                  <p
                    class="chat-content text-sm py-3 px-4 elevation-1 bg-primary text-white chat-right mb-1"
                  >
                    {{ msgValue }}
                  </p>
                </div>
              </div>
            </div>
          </PerfectScrollbar>

          <!-- Message form -->
          <VForm
            class="chat-log-message-form mb-5 mx-5"
            @submit.prevent="sendMessage"
          >
            <VTextField
              v-model="msgValue"
              variant="solo"
              class="chat-message-input"
              placeholder="Type your message..."
              autofocus
              :readonly="isCustomer"
            >
              <template #append-inner>
                <VBtn @click="sendMessage" :loading="loading">
                  Send

                  <template v-slot:loader>
                    <v-progress-linear indeterminate></v-progress-linear>
                  </template>
                </VBtn>
              </template>
            </VTextField>
          </VForm>
        </div>

        <!-- 👉 Start conversation -->
      </VMain>
    </VLayout>
  </div>
</template>

<script setup>
import store from "@/store/index.js";

import axios from "@axios";
import { useResponsiveLeftSidebar } from "@core/composable/useResponsiveSidebar";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { useDisplay } from "vuetify";
const vuetifyDisplays = useDisplay();

const { isLeftSidebarOpen } = useResponsiveLeftSidebar(
  vuetifyDisplays.smAndDown
);
//snakebar
let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");
//ask tavolo
let isCustomer = ref(false);
let prompt = ref("");
let AiResponse = ref("");
const loading = ref(false);
const isPrompt = ref(false);
const isResponse = ref(false);
let isActive = ref("");
// Perfect scrollbar
const chatLogPS = ref();
let promptsListing = ref([]);

const scrollToBottomInChatLog = () => {
  const scrollEl = chatLogPS.value.$el || chatLogPS.value;

  scrollEl.scrollTop = scrollEl.scrollHeight;
};

// Search query

// Open Sidebar in smAndDown when "start conversation" is clicked

// Chat message
const msg = ref("");

const sendMessage = async () => {
  isPrompt.value = true;
  prompt.value = msg.value;
  loading.value = true;

  const payload = {
    customer: isCustomer.value,
    text: isCustomer.value ? msg.value : msgValue.value,
  };
  try {
    await axios.post("ask-tavolo", payload).then((res) => {
      console.log(res);
      AiResponse.value = res.data.data;
      loading.value = false;
      isResponse.value = true;
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    loading.value = false;
    show.value = true;
    snkMsg.value = error.response.data.message;
  }

  // Reset message input
  msg.value = "";

  // Scroll to bottom
  nextTick(() => {
    scrollToBottomInChatLog();
  });
};

// get prompts
const getPrompts = async () => {
  try {
    await axios.get("list-prompts").then((res) => {
      console.log(res);
      promptsListing.value = res.data.data;
    });
  } catch (error) {
    console.error("Error uploading file:", error);
  }

  // Reset message input
  msg.value = "";

  // Scroll to bottom
  nextTick(() => {
    scrollToBottomInChatLog();
  });
};

const msgValue = ref("");
getPrompts();

const active = (prompt) => {
  isActive.value = prompt.key;
  msg.value = prompt.key;
  msgValue.value = prompt.value;
};

const handleChange = () => {
  if (isCustomer.value == false) {
    isResponse.value = false;
    isPrompt.value = false;
    msgValue.value = "";
  }
};
// Active chat user profile sidebar
const isActiveChatUserProfileSidebarOpen = ref(false);

// file input

//checking permissions
const userHistory = computed(() => {
  return store.getters.getCurrentPkg;
});
onMounted(() => {
  // Check for URL parameters after the component is mounted
  store.dispatch("getPackageHistory");
});
</script>

<route lang="yaml">
meta:
  layoutWrapperClasses: layout-content-height-fixed
</route>

<style lang="scss">
@use "@styles/variables/_vuetify.scss";
@use "@core/scss/base/_mixins.scss";
@use "@layouts/styles/mixins" as layoutsMixins;

// Variables
$chat-app-header-height: 68px;

// Placeholders
%chat-header {
  display: flex;
  align-items: center;
  min-block-size: $chat-app-header-height;
  padding-inline: 1rem;
}

.chat-app-layout {
  border-radius: vuetify.$card-border-radius;

  @include mixins.elevation(vuetify.$card-elevation);

  $sel-chat-app-layout: &;

  @at-root {
    .skin--bordered {
      @include mixins.bordered-skin($sel-chat-app-layout);
    }
  }

  .active-chat-user-profile-sidebar,
  .user-profile-sidebar {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }

  .chat-list-header,
  .active-chat-header {
    @extend %chat-header;
  }

  .chat-list-search {
    .v-field__outline__start {
      flex-basis: 20px !important;
      border-radius: 28px 0 0 28px !important;
    }

    .v-field__outline__end {
      border-radius: 0 28px 28px 0 !important;
    }

    @include layoutsMixins.rtl {
      .v-field__outline__start {
        flex-basis: 20px !important;
        border-radius: 0 28px 28px 0 !important;
      }

      .v-field__outline__end {
        border-radius: 28px 0 0 28px !important;
      }
    }
  }

  .chat-list-sidebar {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }
}

.chat-content-container {
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));

  // Adjust the padding so text field height stays 48px
  .chat-message-input {
    .v-field__append-inner {
      align-items: center;
      padding-block-start: 0;
    }

    .v-field--appended {
      padding-inline-end: 6px;
    }
  }
}

.chat-user-profile-badge {
  .v-badge__badge {
    /* stylelint-disable liberty/use-logical-spec */
    min-width: 12px !important;
    height: 0.75rem;
    /* stylelint-enable liberty/use-logical-spec */
  }
}

.chat-contact {
  border-radius: vuetify.$border-radius-root;
  margin-block-end: 6px;
  padding-block: 12px;
  padding-inline: var(--chat-content-spacing-x);

  @include mixins.before-pseudo;

  &.chat-contact-active {
    background: linear-gradient(
      270deg,
      rgb(var(--v-theme-primary)) 0%,
      #fff 300%
    );
    color: #fff;

    --v-theme-on-background: #fff;

    .v-avatar {
      background: #fff;
    }
  }

  .v-badge--bordered .v-badge__badge::after {
    color: #fff;
  }
}
</style>
