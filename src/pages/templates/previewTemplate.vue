<script setup>
const imageUrl = ref(
  "https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/00b6209c-e9a1-3888-6b52-a083c0508494.png"
);
const file = ref(null);

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
    imageUrl.value = URL.createObjectURL(selectedFile);
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
      <!-- <img
        src="../../assets/images/email-templates/template01.png"
        alt=""
        style="height: 275px; width: 258px"
      /> -->
    </v-col>
    <v-divider :thickness="3" vertical></v-divider>
    <v-col cols="12" md="8" class="" style="width: 35%">
      <div>
        <img
          :src="imageUrl"
          v-if="imageUrl"
          alt="Uploaded Image"
          style="width: 101.52509652509649px; height: auto; max-width: 100%"
        />
        <input type="file" @change="handleFileChange" accept="image/*" />

        <VSpacer />
        <h1 class="last-child">
          <span style="font-size: 26px">Apple Crisp Pre-Sale Is Here! 📣</span>
        </h1>
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
          src="https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/4256d6d0-0e5a-1e46-7c11-f7c2c737af6a.jpg"
          role="presentation"
          class="imageDropZone"
        />
        <div
          data-block-id="3"
          class="mceText"
          id="dataBlockId-3"
          style="width: 100%"
        >
          <p style="text-align: left">
            We're thrilled to announce our exclusive Apple Crisp Pre-Sale event
            happening next Friday, September 22, 2023!
          </p>
          <p><br /></p>
          <p style="text-align: left">
            🌟 Get ready to savor the warm, cinnamon-infused goodness of our
            delicious Apple Crisp! 🌟
          </p>
          <p><br /></p>
          <p style="text-align: left">
            📣 Here are the details: 📆 Date: Friday, September 22, 2023
          </p>
          <p style="text-align: left">
            📍 Location: 520 N 4th St, Minneapolis, MN 55401 (Graze Building)
          </p>
          <p><br /></p>
          <p style="text-align: left">
            Don't miss out on this delectable treat! Mark your calendars and set
            your alarms. 📅⏰
          </p>
          <p><br /></p>
          <p style="text-align: left">
            Remember, this pre-sale is for a limited time and available while
            supplies last. So, be sure to place your order early to secure your
            share of our irresistible Apple Crisp!
          </p>
          <p style="text-align: left">
            Stay tuned for more updates, and get ready to indulge in the flavors
            of fall.
          </p>
          <p class="last-child"><br /></p>
        </div>
        <v-divider :thickness="3" class="mb-4"></v-divider>
        <tbody class="pt-3">
          <tr>
            <td
              style="padding-left: 24px; padding-top: 0; padding-right: 24px"
              data-breakpoint="29"
              valign="top"
              class="mobileClass-29"
            >
              <a
                href="https://www.facebook.com/twomixedup/"
                style="display: block"
                target="_blank"
                data-block-id="-5"
                ><img
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
              /></a>
            </td>
            <td
              style="padding-left: 24px; padding-top: 0; padding-right: 24px"
              data-breakpoint="29"
              valign="top"
              class="mobileClass-29"
            >
              <a
                href="https://www.instagram.com/twomixedupmn/"
                style="display: block"
                target="_blank"
                data-block-id="-6"
                ><img
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
              /></a>
            </td>
            <td
              style="padding-left: 24px; padding-top: 0; padding-right: 24px"
              data-breakpoint="29"
              valign="top"
              class="mobileClass-29"
            >
              <a
                href="https://www.tiktok.com/@twomixedup"
                style="display: block"
                target="_blank"
                data-block-id="-7"
                ><img
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
              /></a>
            </td>
          </tr>
        </tbody>
        <img
          data-block-id="15"
          width="126"
          height="auto"
          style="width: 126px; height: auto; max-width: 100%; display: block"
          alt=""
          src="https://mcusercontent.com/32b84976f7f4821b8b04627e7/images/fbdb173e-54c2-fd46-7a1b-838fe2bac639.png"
          role="presentation"
          class="imageDropZone"
        />
        <tr>
          <td
            style="
              padding-top: 8px;
              padding-bottom: 8px;
              padding-right: 8px;
              padding-left: 8px;
            "
            class="mceLayoutContainer"
            valign="top"
          >
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              role="presentation"
              data-block-id="11"
              id="section_1a9436ffb896aa34e3e8e1e1a44b82a9"
              class="mceFooterSection"
            >
              <tbody>
                <tr class="mceRow">
                  <td
                    style="
                      background-position: center;
                      background-repeat: no-repeat;
                      background-size: cover;
                    "
                    valign="top"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="12"
                      width="100%"
                      role="presentation"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              padding-top: 0;
                              padding-bottom: 0;
                              margin-bottom: 12px;
                            "
                            class="mceColumn"
                            data-block-id="-3"
                            valign="top"
                            colspan="12"
                            width="100%"
                          >
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              role="presentation"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      padding-top: 12px;
                                      padding-bottom: 12px;
                                      padding-right: 16px;
                                      padding-left: 16px;
                                    "
                                    class="mceBlockContainer"
                                    align="center"
                                    valign="top"
                                  >
                                    <div
                                      data-block-id="9"
                                      class="mceText"
                                      id="dataBlockId-9"
                                      style="display: inline-block; width: 100%"
                                    >
                                      <p class="last-child">
                                        <em
                                          ><span style="font-size: 12px"
                                            >Copyright (C) 2023 Two Mixed Up.
                                            All rights reserved.</span
                                          ></em
                                        ><br /><span style="font-size: 12px"
                                          >Want to change how you receive these
                                          emails?</span
                                        ><br /><span style="font-size: 12px"
                                          >You can </span
                                        ><a
                                          href="https://tavoloapp.us14.list-manage.com/profile?u=32b84976f7f4821b8b04627e7&amp;id=e837488ab0&amp;e=2430a218e0"
                                          ><span style="font-size: 12px"
                                            >update your preferences</span
                                          ></a
                                        ><span style="font-size: 12px">
                                          or </span
                                        ><a
                                          href="https://tavoloapp.us14.list-manage.com/unsubscribe?u=32b84976f7f4821b8b04627e7&amp;id=e837488ab0&amp;e=2430a218e0&amp;c=fb808175c4"
                                          ><span style="font-size: 12px"
                                            >unsubscribe</span
                                          ></a
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="mceLayoutContainer"
                                    align="center"
                                    valign="top"
                                  >
                                    <table
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      role="presentation"
                                      data-block-id="-2"
                                    >
                                      <tbody>
                                        <tr class="mceRow">
                                          <td
                                            style="
                                              background-position: center;
                                              background-repeat: no-repeat;
                                              background-size: cover;
                                              padding-top: 0px;
                                              padding-bottom: 0px;
                                            "
                                            valign="top"
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="24"
                                              width="100%"
                                              role="presentation"
                                            >
                                              <tbody></tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </div>
    </v-col>
  </v-row>
</template>

<style></style>
