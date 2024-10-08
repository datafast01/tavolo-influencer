<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
// import chrome from '@images/logos/chrome.png'

const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const smsVerificationNumber = ref('+1(968) 819-2547')
const isTwoFactorDialogOpen = ref(false)

// Recent devices Headers
const recentDeviceHeader = [
  {
    title: 'BROWSER',
    key: 'browser',
  },
  {
    title: 'DEVICE',
    key: 'device',
  },
  {
    title: 'LOCATION',
    key: 'location',
  },
  {
    title: 'RECENT ACTIVITY',
    key: 'activity',
  },
]

const recentDevices = [
  {
    browser: 'Chrome on Windows',
    logo: '',
    device: 'Dell XPS 15',
    location: 'United States',
    activity: '10, Jan 2020 20:07',
  },
  {
    browser: 'Chrome on Android',
    logo: '',
    device: 'Google Pixel 3a',
    location: 'Ghana',
    activity: '11, Jan 2020 10:16',
  },
  {
    browser: 'Chrome on MacOS',
    logo: '',
    device: 'Apple iMac',
    location: 'Mayotte',
    activity: '11, Jan 2020 12:10',
  },
  {
    browser: 'Chrome on iPhone',
    logo: '',
    device: 'Apple iPhone XR',
    location: 'Mauritania',
    activity: '12, Jan 2020 8:29',
  },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- 👉 Change password -->
      <VCard title="Change Password">
        <VCardText>
          <VAlert
            variant="tonal"
            color="warning"
            class="mb-4"
          >
            <VAlertTitle>Ensure that these requirements are met</VAlertTitle>
            <span>Minimum 8 characters long, uppercase & symbol</span>
          </VAlert>

          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  label="New Password"
                  density="compact"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  label="Confirm Password"
                  density="compact"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <VBtn type="submit">
                  Change Password
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Two step verification -->
      <VCard
        title="Two-step verification"
        subtitle="Keep your account secure with authentication step."
      >
        <VCardText>
          <div>
            <h4 class="font-weight-medium mb-1">
              SMS
            </h4>
            <VTextField
              variant="underlined"
              density="compact"
              :model-value="smsVerificationNumber"
              readonly
            >
              <template #append-inner>
                <IconBtn variant="plain">
                  <VIcon
                    icon="mdi-square-edit-outline"
                    @click="isTwoFactorDialogOpen = true"
                  />
                </IconBtn>
                <IconBtn variant="plain">
                  <VIcon icon="mdi-delete-outline" />
                </IconBtn>
              </template>
            </VTextField>
          </div>

          <p class="mb-0 mt-4">
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >Learn more</a>.
          </p>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Recent devices -->
      <VCard title="Recent devices">
        <VDataTable
          :items="recentDevices"
          :headers="recentDeviceHeader"
          hide-default-footer
          class="text-sm rounded-0 text-no-wrap"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VAvatar
                :image="item.raw.logo"
                :size="22"
                class="me-3"
              />
              <span class="text-high-emphasis text-base">
                {{ item.raw.browser }}
              </span>
            </div>
          </template>
          <!-- TODO Refactor this after vuetify provides proper solution for removing default footer -->
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>

  <!-- 👉 Enable One Time Password Dialog -->
  <TwoFactorAuthDialog
    v-model:isDialogVisible="isTwoFactorDialogOpen"
    :sms-code="smsVerificationNumber"
  />
</template>
