<template>
  <div>

    <!-- Title and Logo -->
    <div class="auth-logo d-flex align-start gap-x-3">
      <!-- <VNodeRenderer :nodes="logo" /> -->
      <img :src="logo" alt="" width="130" />

      <h1 class="font-weight-medium leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
      </h1>
    </div>

    <VRow no-gutters class="auth-wrapper">
      <VCol lg="8" class="d-none d-lg-flex align-center justify-center position-relative">
        <VImg max-width="768px" :src="authThemeImg" class="auth-illustration" />
        <VImg :width="276" :src="tree" class="auth-footer-start-tree" />
        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </VCol>

      <VCol cols="12" lg="4" class="auth-card-v2 d-flex align-center justify-center">
        <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
          <VCardText>
            <h5 class="text-h5 mb-1">Welcome to Tavolo Influencer 👋🏻</h5>
            <p class="mb-0">
              Welcome back to Tavolo! Ready to showcase your talent and connect with clients through captivating videos?
            </p>
          </VCardText>

          <VCardText>
            <VForm ref="refVForm" @submit.prevent="onSubmit">
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTextField v-model="email" label="Email" type="email" :rules="[requiredValidator, emailValidator]"
                    :error-messages="errors.email" />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField v-model="password" label="Password" :rules="[requiredValidator]"
                    :type="isPasswordVisible ? 'text' : 'password'" :error-messages="errors.password"
                    :append-inner-icon="isPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                      " @click:append-inner="isPasswordVisible = !isPasswordVisible" />

                  <div class="d-flex align-center flex-wrap justify-space-between mt-1 mb-4">
                    <VCheckbox v-model="rememberMe" label="Remember me" />
                    <RouterLink class="text-primary ms-2 mb-1" :to="{ name: 'forgot-password' }">
                      Forgot Password?
                    </RouterLink>
                  </div>

                  <VBtn block type="submit" :loading="loading"> Login </VBtn>
                </VCol>

                <!-- create account -->
                <VCol cols="12" class="text-center">
                  <span>New on our platform?</span>
                  <RouterLink class="text-primary ms-2" :to="{ name: 'register' }">
                    Create an account
                  </RouterLink>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <v-dialog v-model="dialog" width="auto">
    <v-card width="500" height="400" class="d-flex align-center text-center justify-center">
      <div>
        <v-card-title> Welcome to Tavolo! </v-card-title>
        <v-card-subtitle class="my-3">
          Please sign up to your account and start the adventure
        </v-card-subtitle>
        <v-card-text>
          <p class="my-3">Start your journey at Tavolo as an Influencer</p>
          <VBtn class="my-3" @click="checkUser('business')">
            LOG IN AS A BUSINESS
          </VBtn>
          <p class="my-3">OR</p>
          <p class="my-3">Start your journey at Tavolo as a Business</p>

          <VBtn class="my-3" @click="checkUser('influencer')">
            LOG IN AS AN INFLUENCER
          </VBtn>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
// import { useAppAbility } from '@/plugins/casl/useAppAbility'
import logo from "@/assets/images/logos/Tavolo.png";
import store from "@/store/index.js";
import axios from "@axios";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import authV2LoginIllustrationBorderedDark from "@images/pages/auth-v2-login-illustration-bordered-dark.png";
import authV2LoginIllustrationBorderedLight from "@images/pages/auth-v2-login-illustration-bordered-light.png";
import authV2LoginIllustrationDark from "@images/pages/auth-v2-login-illustration-dark.png";
import authV2LoginIllustrationLight from "@images/pages/auth-v2-login-illustration-light.png";
import authV2MaskDark from "@images/pages/auth-v2-mask-dark.png";
import authV2MaskLight from "@images/pages/auth-v2-mask-light.png";
import tree from "@images/pages/tree.png";
import { themeConfig } from "@themeConfig";
import { emailValidator, requiredValidator } from "@validators";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VForm } from "vuetify/components/VForm";
import { useToast } from "vue-toastification";


const toast = useToast()
const isPasswordVisible = ref(false);
const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const route = useRoute();
const router = useRouter();
// const ability = useAppAbility()

const errors = ref({
  email: undefined,
  password: undefined,
});

const refVForm = ref();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);


let dialog = ref(false);
let userType = ref(null);
const login = () => {
  loading.value = true;
  axios
    .post("/login", {
      email: email.value,
      password: password.value,
      role: 'influencer'
    })
    .then((res) => {
      // console.log(res.data);
      toast.success("User Loggedin Successfully!", { timeout: 2010, });
      const userData = res.data;
      loading.value = false;
      // localStorage.setItem('userAbilities', JSON.stringify(userAbilities))

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);

      store.dispatch("getProfile");

      // localStorage.setItem('accessToken', JSON.stringify(accessToken))
      if (res.status == 200) {
        router.replace(route.query.to ? String(route.query.to) : "/");
      }
      // Redirect to `to` query if exist or redirect to index route
      // router.replace(route.query.to ? String(route.query.to) : '/')
    })
    .catch((err) => {
      loading.value = false;
      toast.error(err.response.data.message, { timeout: 2010, });


    });
};

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) login();
  });
};
const checkUser = (type) => {
  userType.value = type;
  dialog.value = false;
};
</script>
<style lang="scss" scoped>
@use "@core/scss/template/pages/page-auth.scss";

.v-img__img,
.v-img__picture,
.v-img__gradient,
.v-img__placeholder,
.v-img__error {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 24px;
  width: 100%;
  height: 100%;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
