<template>
  <v-container class="contact pa-0">
    <v-row class="pa-0 ma-0 pb-3">
      <v-col cols="6" class="pa-0">
        <div class="d-flex align-center justify-space-between">
          <v-card width="200" class="py-2 px-3">
            <v-radio-group v-model="details.status">
              <div class="d-flex align-center justify-space-between" :class="details.status == 'pending' ? 'blue-1'
                : details.status == 'reject' ? 'red-1' : 'green-1'">
                <span class="mr-5" :class="details.status == 'pending' ? 'blue-1'
                  : details.status == 'completed' ? '#3CB22B' : 'success'">{{ details.status == 'pending' ? 'Pending' :
                    details.status == 'reject' ?
                      'Rejected' : 'Accepted' }}</span>
                <v-radio class="flex-grow-0" :color="details.status == 'pending' ? 'blue'
                  : details.status == 'reject' ? 'red' : 'success'" :value="details.status"></v-radio>
              </div>
            </v-radio-group>
          </v-card>


        </div>
      </v-col>

      <v-col cols="6" class="pa-0 d-flex align-center justify-end">
        <div class="float-right">
          <v-btn color="#312D4B" size="large" class="mr-4" @click="showChat">
            <v-img :src="chat" class="flex-grow-0" height="30" width="30" alt="John"></v-img></v-btn>
          <v-btn elevation="24" size="large">
            OPTIONS
            <v-icon>mdi-chevron-down</v-icon>
            <VMenu activator="parent">
              <VList>
                <VListItem @click="changeStatus('accept')">

                  <VListItemTitle class="text-uppercase">Accept</VListItemTitle>
                </VListItem>
                <VListItem @click="changeStatus('reject')">

                  <VListItemTitle class="text-uppercase">Reject</VListItemTitle>
                </VListItem>

              </VList>
            </VMenu>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-card>
    <v-container class="contact">
      <v-row class="pa-5">
        <v-col cols="12">
          <div class="">
            <h2>{{ details?.contractDetails?.title }}</h2>
          </div>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Business Name </v-card-subtitle>
              <v-card-title> Lorem Ipsum </v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle class="pb-2"> Status </v-card-subtitle>
              <div class="d-flex align-center">
                <v-progress-linear v-model="slider" color="#9155FD" hide-details class="mr-3"
                  style="height: 7px; left: 0%; transform: translateX(0%)">
                </v-progress-linear>
                <span class="purple">45%</span>
              </div>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Payment Plan </v-card-subtitle>
              <v-card-title>{{ details?.contractDetails?.paymentPlan }}</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Date of Agreement </v-card-subtitle>
              <v-card-title>{{ details?.contractDetails?.dateOfAgreement }}</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Start Date</v-card-subtitle>
              <v-card-title>{{ details?.contractDetails?.startDate }}</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> End Date </v-card-subtitle>
              <v-card-title>{{ details?.contractDetails?.endDate }}</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Goals and Key Points </v-card-subtitle>
              <!-- <ul class="ul pt-3">
                <li>Lorem ipsum dolor sit amet sed ante</li>
                <li>consectetur adipiscing elit dolor sit</li>
                <li>Praesent sed ante nec</li>
              </ul> -->
              <p class="pt-3 ma-0">
                {{ details?.targetAudience?.keyPoints }}
              </p>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="">
            <v-card-item>
              <v-card-subtitle> Description </v-card-subtitle>
              <p class="pt-3 ma-0">
                {{ details?.projectDetails?.description }}
              </p>
            </v-card-item>
          </v-card>
        </v-col>

        <v-col cols="12">
          <VCard>
            <v-card-subtitle class="pt-5"> Activity Timeline </v-card-subtitle>
            <VCardText>
              <VTimeline density="compact" :align="start" line-inset="8" truncate-line="both">
                <VTimelineItem dot-color="error" size="x-small">
                  <div class="d-flex justify-space-between align-center flex-wrap">
                    <h4 class="app-timeline-title me-1 mb-2">
                      Project Awaiting Completion
                    </h4>
                    <small class="app-timeline-meta text-no-wrap">Yesterday</small>
                  </div>
                  <p class="mb-0 app-timeline-text">
                    Project is in progress and will be completed once you do it.
                  </p>
                </VTimelineItem>

                <VTimelineItem dot-color="primary" size="x-small">
                  <div class="d-flex justify-space-between align-center flex-wrap">
                    <h4 class="app-timeline-title me-1 mb-2">
                      Contract Approval 😎
                    </h4>
                    <small class="app-timeline-meta text-no-wrap">Wednesday</small>
                  </div>

                  <p class="mb-1 app-timeline-text">
                    The contract has been approved by both parties.
                  </p>
                </VTimelineItem>

                <VTimelineItem dot-color="info" size="x-small">
                  <div class="d-flex justify-space-between align-center flex-wrap">
                    <h4 class="app-timeline-title me-1 mb-2">
                      Contract Initiation
                    </h4>
                    <small class="app-timeline-meta text-no-wrap">Yesterday</small>
                  </div>
                  <p class="mb-0 app-timeline-text">
                    The contract has been accepted and initiated by the
                    influencer.
                  </p>
                </VTimelineItem>
              </VTimeline>
            </VCardText>
          </VCard>
        </v-col>

        <VCol cols="12">
          <v-card>
            <v-card-subtitle class="pt-5"> Submissions </v-card-subtitle>
            <div class="d-flex align-center justify-center">
              <VRadioGroup class="pl-4" v-model="selectedSchedule" :inline="true">
                <VRadio label="Original" value="notSchedule" color="primary" />
                <VRadio label="Revised" value="schedule" color="primary" />
              </VRadioGroup>
              <v-btn class="mr-5" @click="sendRequest" elevation="24" size="large">UPLOAD NEW FILE</v-btn>
            </div>
            <v-card-item>
              <v-row no-gutters>
                <v-col cols="12" class="text-center">
                  <ContactItem :send-request="sendRequest" />
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </VCol>

        <v-responsive width="100%"></v-responsive>
      </v-row>
    </v-container>
    <CustomChat ref="chat_dialog" />
  </v-card>

  <ReviewDialog v-model:isDialogVisible="isCardEditDialogVisible" />
  <PauseDialog v-model:isDialogVisible="isCardEditDialogVisibles" />



  <VDialog v-model="showModal" max-width="700">
    <!-- Dialog Activator -->

    <!-- Dialog Content -->
    <VCard class="pa-3">
      <DialogCloseBtn variant="text" size="small" @click="showModal = false" />
      <VCardText class="text-center text-h5">Upload New File<br /> </VCardText>
      <VCardText>
        <VRow>
          <VCol cols="2"></VCol>
          <VCol cols="8">
            <div class="py-3" style="border: 1px dashed; border-radius: 6px">
              <div class="me-3 py-1 flex-column d-flex align-center justify-space-between">
                <div>
                  <v-img :src="uploadFile" class="flex-grow-0" height="90" width="90" alt="John"></v-img>
                </div>
                <div class="text-center">
                  <p class="mb-0 text-uppercase">Drag and drop files here</p>
                  <div class="pt-2" style="font-size: 10px">File name.mp4</div>
                </div>
                <div class="pt-3 pb-1">
                  <VBtn color="primary" @click="refInputEl?.click()">
                    <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                    <span class="d-none d-sm-block">BROWSE</span>
                  </VBtn>
                  <input ref="refInputEl" type="file" name="file" accept=".csv" hidden @input="uploadCustomerCsv" />
                </div>
              </div>
            </div>
            <div>
              <VCard class="mt-5">
                <div class="d-flex align-center justify-space-between pa-3">
                  <div>
                    <p class="ma-0">Completed</p>
                    <div class="pt-0" style="font-size: 10px">
                      File name.mp4
                    </div>
                  </div>
                  <div>
                    <v-img :src="clickicon" class="flex-grow-0" height="20" width="20" alt="John"></v-img>
                  </div>
                </div>
              </VCard>
            </div>

            <div class="text-center pt-6">
              <VBtn color="primary mr-4 " @click="sendCampaign"> SEND </VBtn>
              <VBtn color="secondary" @click="showModal = false"> Cancel </VBtn>
            </div>
          </VCol>
          <VCol cols="2"></VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>

</template>

<script>
import download from "@/assets/images/cards/download.png";
import play1 from "@/assets/images/cards/folder.png";
import chat from "@/assets/images/iconify-svg/chat.svg";
import uploadFile from "@/assets/images/cards/uploadFile.png";
import CustomChat from "../apps/customeChat/chatDialog.vue";
import ContactItem from "./ContactItem.vue";
import ReviewDialog from "./ReviewDialog.vue";
import clickicon from "@/assets/images/cards/click-icons.png";
import PauseDialog from "./PauseDialog.vue";
import axios from '@axios'
import { useToast } from "vue-toastification";

export default {
  components: { CustomChat, ContactItem, ReviewDialog, PauseDialog },

  data() {
    return {
      toast: useToast(),
      ex7: null,
      ex8: null,
      chat: chat,
      play1: play1,
      download: download,
      selectedSchedule: "notSchedule",
      max: 90,
      slider: 45,
      currentStatus: "inProgress",
      showModal: false,
      uploadFile: uploadFile,
      isCardEditDialogVisible: false,
      isCardEditDialogVisibles: false,
      clickicon: clickicon,
      PauseDialog: PauseDialog,
      details: {}
    };
  },
  setup() {
    const refInputEl = ref(null); // Initialize ref with null

    return { refInputEl };
  },
  methods: {
    showChat() {
      this.$refs.chat_dialog.dialog = true;
    },

    sendRequest() {
      this.showModal = true;
    },

    openEditCardDialog() {
      this.isCardEditDialogVisible = true;
    },
    openPauseDialog() {
      this.isCardEditDialogVisibles = true;
    },
    getContractDetails() {
      const id = this.$route.params.id

      axios.get(`influencer/contract/${id}`)
        .then((response) => {
          console.log(response)
          this.details = response.data.data
        })
        .catch((err) => {
          console.log('err')
        })
    },
    changeStatus(status) {
      const payload = {
        contractId: this.$route.params.id,
        status: status
      }
      axios.post(`influencer/change-contract-status`, payload)
        .then((response) => {
          console.log(response)
          this.details.status = response.data.data.status
          if (response.data.data.status == 'active') {
            this.toast.success('Thanks for accepting the contract!')
          }
          if (response.data.data.status == 'reject') {
            this.toast.error('You rejected the contract!')
          }
        })
        .catch((err) => {
          console.log('err')
        })
    }
  },
  mounted() {
    this.getContractDetails()
  }
};
</script>

<style>
.ul {
  list-style: inside;
}

.contact .v-field {
  display: inline !important;
}

.font-12 {
  font-size: 10px;
}

.bg-darken2 {
  background-color: #524d6b;
  height: 52px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 12px;
}

.l-h {
  line-height: 14px;
}

/* ::v-deep .v-progress-linear {
  height: 4px;
  left: 0 !important;
  transform: translateX(0%) !important;
} */

.green-1 {
  color: #3cb22b;
}

.red-1 {
  color: #b22b2b;
}

.blue-1 {
  color: #1d42b9;
}

.purple {
  color: #9155FD;
}
</style>
