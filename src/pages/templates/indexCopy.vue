<script setup>
const topLogoUrl = ref(
  "https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/00b6209c-e9a1-3888-6b52-a083c0508494.png"
);
const topLogoFile = ref(null);

const mainImageUrl = ref(
  "https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/00b6209c-e9a1-3888-6b52-a083c0508494.png"
);
const mainImageFile = ref(null);

const bottomImageUrl = ref(
  "https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/00b6209c-e9a1-3888-6b52-a083c0508494.png"
);
const bottomImageFile = ref(null);

const subject = ref("Apple Crisp Pre-Sale Is Here! 📣");
const message = ref(
  "This Sunday, on Mother's Day, we're giving all moms a free glass of rosé or mimosa when they dine in. \nJoin us at any Urban Skillet location.Our tables are set and we can't wait to celebrate!\nWe can't wait to serve you soon.\nBest regards,\nUrban Skillet Team!"
);

let isFacebookUrl = ref(false);
let isInstakUrl = ref(false);

let isTiktokUrl = ref(false);

const facebookURL = ref("");
const instaUrl = ref("");
const tiktokUrl = ref("");

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    topLogoFile.value = selectedFile;
    topLogoUrl.value = URL.createObjectURL(selectedFile);
  }
};

const handleMainImage = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    mainImageFile.value = selectedFile;
    mainImageUrl.value = URL.createObjectURL(selectedFile);
  }
};

const handleBottomLogo = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    bottomImageFile.value = selectedFile;
    bottomImageUrl.value = URL.createObjectURL(selectedFile);
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="3">
      <img
        src="../../assets/images/email-templates/template01.png"
        alt=""
        style="height: 275px; width: 258px"
      />
    </v-col>
    <v-divider :thickness="3" vertical></v-divider>
    <v-col cols="12" md="8" class="">
      <div>
        <div class="d-flex justify-center ml-10 my-8">
          <img
            :src="topLogoUrl"
            v-if="topLogoUrl"
            alt="Uploaded Image"
            style="width: 101.52509652509649px; height: auto; max-width: 100%"
          />
          <input
            type="file"
            @change="handleFileChange"
            accept="image/*"
            class="pl-4 mt-3"
          />
        </div>

        <VSpacer />
        <!-- <h1 class="last-child">
          <span style="font-size: 26px">Apple Crisp Pre-Sale Is Here! 📣</span>
        </h1> -->
        <VTextField
          v-model="subject"
          label="Subject"
          density="compact"
          class="my-4"
        >
        </VTextField>
        <div class="d-flex justify-center ml-10 align-center my-8">
          <img
            data-block-id="4"
            width="248.99999999999997"
            height="auto"
            style="
              width: 248.99999999999997px;
              height: auto;
              max-width: 100%;
              display: block;
            "
            alt=""
            :src="mainImageUrl"
            role="presentation"
            class="imageDropZone"
          />
          <input
            type="file"
            @change="handleMainImage"
            accept="image/*"
            class="pl-4"
          />
        </div>

        <div>
          <VTextarea v-model="message" placeholder="Message" auto-grow />
        </div>
        <v-divider :thickness="3" class="mb-4"></v-divider>

        <div class="d-flex justify-center my-8">
          <span
            style="padding-left: 24px; padding-top: 0; padding-right: 24px"
            data-breakpoint="29"
            valign="top"
            class="mobileClass-29"
          >
            <img
              width="40"
              height="auto"
              style="
                border: 0;
                width: 40px;
                height: auto;
                max-width: 100%;
                display: block;
              "
              alt="Facebook icon"
              src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/facebook-filled-dark-40.png"
              class=""
            />
          </span>
          <span
            style="padding-left: 24px; padding-top: 0; padding-right: 24px"
            data-breakpoint="29"
            valign="top"
            class="mobileClass-29"
          >
            <img
              width="40"
              height="auto"
              style="
                border: 0;
                width: 40px;
                height: auto;
                max-width: 100%;
                display: block;
              "
              alt="Instagram icon"
              src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/instagram-filled-dark-40.png"
              class=""
            />
          </span>
          <span
            style="padding-left: 24px; padding-top: 0; padding-right: 24px"
            data-breakpoint="29"
            valign="top"
            class="mobileClass-29"
          >
            <img
              width="40"
              height="auto"
              style="
                border: 0;
                width: 40px;
                height: auto;
                max-width: 100%;
                display: block;
              "
              alt="TikTok icon"
              src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/tiktok-filled-dark-40.png"
              class=""
            />
          </span>
        </div>
        <!-- facebook URL  -->
        <VTextField
          v-model="facebookURL"
          label="Subject"
          density="compact"
          class="my-4"
          v-if="isFacebookUrl"
        >
        </VTextField>
        <!-- instagram URL  -->
        <VTextField
          v-model="instaUrl"
          label="Subject"
          density="compact"
          class="my-4"
          v-if="isInstakUrl"
        >
        </VTextField>
        <!-- tiktok url  -->
        <VTextField
          v-model="tiktokUrl"
          label="Subject"
          density="compact"
          class="my-4"
          v-if="isTiktokUrl"
        >
        </VTextField>
        <div class="d-flex justify-center align-center ml-10 my-8">
          <img
            data-block-id="15"
            width="126"
            height="auto"
            style="width: 126px; height: auto; max-width: 100%; display: block"
            alt=""
            :src="bottomImageUrl"
            role="presentation"
            class="imageDropZone"
          />
          <input
            type="file"
            @change="handleBottomLogo"
            accept="image/*"
            class="ml-4"
          />
        </div>
        <div data-block-id="9" class="d-flex justify-center">
          <p class="last-child">
            <em
              ><span style="font-size: 12px"
                >Copyright (C) 2023 Two Mixed Up. All rights reserved.</span
              ></em
            ><br /><span style="font-size: 12px"
              >Want to change how you receive these emails?</span
            ><br /><span style="font-size: 12px">You can </span
            ><a
              href="https://tavoloapp.us14.list-manage.com/profile?u=32b84976f7f4821b8b04627e7&amp;id=e837488ab0&amp;e=2430a218e0"
              ><span style="font-size: 12px">update your preferences</span></a
            ><span style="font-size: 12px"> or </span
            ><a
              href="https://tavoloapp.us14.list-manage.com/unsubscribe?u=32b84976f7f4821b8b04627e7&amp;id=e837488ab0&amp;e=2430a218e0&amp;c=fb808175c4"
              ><span style="font-size: 12px">unsubscribe</span></a
            >
          </p>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<style></style>
