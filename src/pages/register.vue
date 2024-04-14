<template>
  <div>

    <!-- Title and Logo -->
    <div class="auth-logo d-flex align-start gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />

      <h1 class="font-weight-medium leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
        {{ userType }}
      </h1>
    </div>

    <VRow no-gutters class="auth-wrapper">
      <VCol lg="8" class="d-none d-lg-flex align-center justify-center position-relative">
        <div class="d-flex align-center justify-center w-100 pa-10 pe-0">
          <VImg max-width="768px" :src="imageVariant" class="auth-illustration" />
        </div>

        <VImg :width="150" :src="tree2" class="auth-footer-start-tree" />

        <VImg class="auth-footer-mask" :src="authThemeMask" />
      </VCol>

      <VCol cols="12" lg="4" class="auth-card-v2 d-flex align-center justify-center">
        <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
          <VCardText>
            <h5 class="text-h5 mb-1">Join Tavolo - Your Gateway to Freelance Success 🚀</h5>
            <p class="mb-0">At Tavolo, we empower influencers to monetize their content and attract clients through
              Instagram videos.</p>
          </VCardText>

          <VCardText>
            <VForm ref="refVForm" @submit.prevent="onSubmit">
              <VRow>
                <!-- Username -->
                <VCol cols="12">
                  <VTextField v-model="firstName" :rules="[requiredValidator]" label="First Name" type="text" />
                </VCol>
                <VCol cols="12">
                  <VTextField v-model="lastName" :rules="[requiredValidator]" label="Last Name" type="text" />
                </VCol>

                <!-- email -->
                <VCol cols="12">
                  <VTextField v-model="email" :rules="[requiredValidator, emailValidator]" label="Email" type="email" />
                </VCol>
                <VCol cols="12">
                  <VTextField v-model="phoneNo" :rules="[requiredValidator]" label="Phone Number" type="text" />
                </VCol>

                <VCol cols="12">
                  <VTextField v-model="socialMediaUserName" :rules="[requiredValidator]" label="Social Media User Name"
                    type="text" />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField v-model="password" :rules="[requiredValidator]" label="Password"
                    :type="isPasswordVisible ? 'text' : 'password'" :append-inner-icon="isPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                      " @click:append-inner="isPasswordVisible = !isPasswordVisible" />
                </VCol>
                <VCol cols="12">
                  <VTextField v-model="confirmPassword" :rules="[requiredValidator]" label="Confirm Password"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'" :append-inner-icon="isConfirmPasswordVisible
                      ? 'mdi-eye-off-outline'
                      : 'mdi-eye-outline'
                      " @click:append-inner="
                        isConfirmPasswordVisible = !isConfirmPasswordVisible
                        " />
                </VCol>

                <VCol cols="12">
                  <VBtn block type="submit" :loading="loading"> Sign up </VBtn>
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
import { useToast } from "vue-toastification";
const toast = useToast()
const refVForm = ref();
const firstName = ref("");
const lastName = ref("");
const phoneNo = ref("");
const restaurantName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const socialMediaUserName = ref("")
const loading = ref(false)


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
  loading.value = true
  axios
    .post("/signup", {
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNo: phoneNo.value,
      confirmPassword: confirmPassword.value,
      email: email.value,
      password: password.value,
      socialMediaUserName: socialMediaUserName.value,
      role: 'influencer'

    })
    .then((res) => {
      // console.log(res, "here is the response");

      console.log(res)
      toast.success("User Registerted Successfully!", { timeout: 2010, });
      loading.value = false

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
      loading.value = false

      console.error(err);

      if (err.response.status == 400) {

        toast.error(err.response.data.message, { timeout: 2010, });
      } else {
        toast.error("Something Went Wrong", { timeout: 2010, });
      }

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
