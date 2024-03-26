<template>
  <div>
    <VSnackbar v-model="show" :timeout="2000" :color="color">
      {{ snkMsg }}
    </VSnackbar>
    <!-- Title and Logo -->
    <div class="auth-logo d-flex align-start gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />

      <h1 class="font-weight-medium leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
        {{ userType }}
      </h1>
    </div>

    <VRow no-gutters class="auth-wrapper">
      <VCol
        lg="8"
        class="d-none d-lg-flex align-center justify-center position-relative"
      >
        <div class="d-flex align-center justify-center w-100 pa-10 pe-0">
          <VImg
            max-width="768px"
            :src="imageVariant"
            class="auth-illustration"
          />
        </div>

        <VImg :width="150" :src="tree2" class="auth-footer-start-tree" />

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </VCol>

      <VCol
        cols="12"
        lg="4"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
          <VCardText>
            <h5 class="text-h5 mb-1">Adventure starts here 🚀</h5>
            <p class="mb-0">Make your resturant management easy and fun!</p>
          </VCardText>

          <VCardText>
            <VForm ref="refVForm" @submit.prevent="onSubmit">
              <VRow>
                <!-- Username -->
                <VCol cols="12">
                  <VTextField
                    v-model="firstName"
                    :rules="[requiredValidator]"
                    label="First Name"
                    type="text"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="lastName"
                    :rules="[requiredValidator]"
                    label="Last Name"
                    type="text"
                  />
                </VCol>

                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="email"
                    :rules="[requiredValidator, emailValidator]"
                    label="Email"
                    type="email"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="phoneNo"
                    :rules="[requiredValidator]"
                    label="Phone Number"
                    type="text"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="restaurantName"
                    :rules="[requiredValidator]"
                    label="Resturant Name"
                    type="text"
                  />
                </VCol>
                <VCol cols="12" v-if="userType == 'influencer'">
                  <VTextField
                    v-model="socialMediaUserName"
                    :rules="[requiredValidator]"
                    label="Social Media User Name"
                    type="text"
                  />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="password"
                    :rules="[requiredValidator]"
                    label="Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isPasswordVisible
                        ? 'mdi-eye-off-outline'
                        : 'mdi-eye-outline'
                    "
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="confirmPassword"
                    :rules="[requiredValidator]"
                    label="Confirm Password"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="
                      isConfirmPasswordVisible
                        ? 'mdi-eye-off-outline'
                        : 'mdi-eye-outline'
                    "
                    @click:append-inner="
                      isConfirmPasswordVisible = !isConfirmPasswordVisible
                    "
                  />
                </VCol>

                <VCol cols="12">
                  <VBtn block type="submit"> Sign up </VBtn>
                </VCol>

                <!-- create account -->
                <VCol cols="12" class="text-center text-base">
                  <span>Already have an account?</span>
                  <RouterLink class="text-primary ms-2" :to="{ name: 'login' }">
                    Sign in instead
                  </RouterLink>
                </VCol>

                <!-- auth providers -->
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup>
import authV2MaskDark from "@images/pages/auth-v2-mask-dark.png";
import authV2MaskLight from "@images/pages/auth-v2-mask-light.png";
import authV2RegisterIllustrationBorderedDark from "@images/pages/auth-v2-register-illustration-bordered-dark.png";
import authV2RegisterIllustrationBorderedLight from "@images/pages/auth-v2-register-illustration-bordered-light.png";
import authV2RegisterIllustrationDark from "@images/pages/auth-v2-register-illustration-dark.png";
import authV2RegisterIllustrationLight from "@images/pages/auth-v2-register-illustration-light.png";
import tree2 from "@images/pages/tree-2.png";
import { VForm } from "vuetify/components/VForm";
// import { useAppAbility } from '@/plugins/casl/useAppAbility'
// import router from '@/router'
import axios from "@axios";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import { emailValidator, requiredValidator } from "@validators";

const refVForm = ref();
const firstName = ref("");
const lastName = ref("");
const phoneNo = ref("");
const restaurantName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

let show = ref(false);
let snkMsg = ref("");
let color = ref("#9575CD");
// Router
// const route = useRoute()
const router = useRouter();

// Ability
// const ability = useAppAbility()

// Form Errors
const errors = ref({
  email: undefined,
  password: undefined,
});

var dialog = ref(true);

const register = () => {
  axios
    .post("/signup", {
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNo: phoneNo.value,
      confirmPassword: confirmPassword.value,
      email: email.value,
      password: password.value,
      restaurantName: restaurantName.value,
    })
    .then((res) => {
      // console.log(res, "here is the response");
      show.value = true;
      snkMsg.value = "User registred successfully!";
      // const { accessToken, userData, userAbilities } = r.data

      // localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
      // ability.update(userAbilities)
      // localStorage.setItem('userData', JSON.stringify(userData))
      // localStorage.setItem('accessToken', JSON.stringify(accessToken))

      // Redirect to `to` query if exist or redirect to index route
      router.replace("/login");

      return null;
    })
    .catch((err) => {
      // console.log(err, "err here");
      console.error(err);
      show.value = true;
      if (err.response.status == 400) {
        snkMsg.value = err.response.data.message;
      } else {
        snkMsg.value = "Something went wrong";
      }
      color.value = "error";
    });
};
let userType = ref(null);
const checkUser = (type) => {
  userType.value = type;
  dialog.value = false;
};
const imageVariant = useGenerateImageVariant(
  authV2RegisterIllustrationLight,
  authV2RegisterIllustrationDark,
  authV2RegisterIllustrationBorderedLight,
  authV2RegisterIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) register();
  });
};
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
