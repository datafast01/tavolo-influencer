<template>
  <VCard>
    <VRow>
      <!-- 👉 Connected Accounts -->

      <!-- 👉 Social Accounts -->

      <VCol cols="12" md="6">
        <VCard flat title="Social Accounts">
          <template #subtitle>
            <span class="text-base"
              >Display content from social accounts on your site</span
            >
          </template>

          <VCardText>
            <VList class="card-list">
              <VListItem v-for="item in socialAccounts" :key="item.logo">
                <template #prepend>
                  <VAvatar start :image="item.logo" size="36" />
                </template>

                <VListItemTitle>
                  <span class="font-weight-medium">{{ item.name }}</span>
                </VListItemTitle>

                <VListItemSubtitle
                  v-if="item.connected"
                  tag="a"
                  :href="'https://www.instagram.com/' + instagram.username"
                  style="opacity: 1"
                  class="text-primary"
                >
                  @{{ item?.links?.username }}
                </VListItemSubtitle>

                <VListItemSubtitle v-else class="text-xs">
                  Not Connected
                </VListItemSubtitle>

                <template #append>
                  <VListItemAction>
                    <VBtn
                      icon
                      variant="outlined"
                      size="small"
                      :color="item.connected ? 'error' : 'secondary'"
                      class="rounded"
                      @click="connectTo(item)"
                    >
                      <VIcon
                        size="24"
                        :icon="
                          item.connected
                            ? 'mdi-delete-outline'
                            : 'mdi-link-variant'
                        "
                      />
                    </VBtn>
                  </VListItemAction>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VCard>
</template>

<script>
import axios from "@axios";
import facebook from "@images/icons/brands/facebook1.png";
import intagram from "@images/icons/brands/instagram.png";
import twitter from "@images/icons/brands/twitter.png";

export default {
  props: {
    instagram: {
      type: Object,
      default: {},
    },
    igAccessToken: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      socialAccounts: [
        {
          logo: facebook,
          name: "Facebook",
          connected: false,
        },

        {
          logo: intagram,
          name: "Instagram",
          links: {
            username: "",
            link: "https://www.instagram.com/themeselection/",
          },
          connected: false,
        },
        {
          logo: twitter,
          name: "TikTok",
          connected: false,
        },
      ],
      instagramToken: null,
    };
  },
  watch: {
    instagram: {
      handler(val) {
        console.log(val, "========");
        if (val.username) {
          this.socialAccounts[1].links.username = val.username;
          this.socialAccounts[1].links.link =
            "https://www.instagram.com/" + val.username;
        }
      },
    },
    igAccessToken: {
      handler(val) {
        if (val) {
          this.socialAccounts[1].connected = true;
        }
      },
    },
  },

  methods: {
    connectTo(item) {
      console.log(item.name);
      if (item.name == "Instagram") {
        if (item.connected) {
          axios
            .get(`instagram/disconnect`)
            .then((response) => {
              console.log("user", response.status);
              item.connected = false;
              this.$emit("refresh-data");
            })
            .catch((err) => {
              console.log(err.response.status);
            });
        } else {
          window.open(
            "https://api.instagram.com/oauth/authorize?client_id=1010878180143016&redirect_uri=https://web.tavolo.ai/instagram/callback/&scope=user_profile,user_media&response_type=code"
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.625rem;
}
</style>
