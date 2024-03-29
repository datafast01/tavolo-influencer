<template>
  <div>
    <VRow>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <!-- <VCol class="align-self-center">
        <div class="d-flex align-center justify-center">
          <v-btn @click="bioEditDialog">Edit Profile Details</v-btn>
        </div>
      </VCol> -->
    </VRow>

    <div class="my-8">
      <div class="d-flex">
        <span class="ml-2"> About</span>
        <button class="ml-2" @click="isEditable('isAbout')" v-if="!detailsActions.isAbout">
          <v-icon>mdi-pencil</v-icon>
        </button>
        <div v-else>
          <button class="ml-2" @click="updateDetails">
            Save
          </button>
          <button class="ml-2" @click="detailsActions.isAbout = false">
            Cancel
          </button>
        </div>

      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions.isAbout" v-model="details.about"></v-textarea>
        <v-card-text v-else>
          {{ details.about }}
        </v-card-text>

        <!-- <v-card-text v-if="bio.accounts">
          <div class="d-flex justify-space-between my-5" v-for="account in bio.accounts" :key="account">
            <div>
              <v-icon>{{
                account.account == "Facebook"
                ? "mdi-facebook"
                : account.account == "Instagram"
                ? "mdi-instagram"
                : "mdi-music-note"
                }}</v-icon>
              {{ account.account }}
            </div>
            <div>
              <VBtn icon variant="outlined" size="small" color="secondary" class="rounded">
                <VIcon size="24" icon="mdi-link-variant
                        " />
              </VBtn>
            </div>
          </div>
        </v-card-text>
        <v-card-text v-else>
          {{ bio.desc }}
        </v-card-text> -->
      </v-card>
    </div>
    <div class="my-8">
      <div class="d-flex ">
        <span class="ml-2"> Profession</span>
        <button class="ml-2" @click="isEditable('isProfession')" v-if="!detailsActions.isProfession">
          <v-icon>mdi-pencil</v-icon>
        </button>
        <div v-else>
          <button class="ml-2" @click="saveDetails">
            Save
          </button>
          <button class="ml-2" @click="detailsActions.isProfession = false">
            Cancel
          </button>
        </div>
      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions.isProfession" v-model="details.profession"></v-textarea>
        <v-card-text v-else>
          {{ details.profession }}
        </v-card-text>

      </v-card>
    </div>
    <div class="my-8">
      <div class="d-flex ">
        <span class="ml-2"> Education</span>
        <button class="ml-2" @click="isEditable('isEducation')" v-if="!detailsActions.isEducation">
          <v-icon>mdi-pencil</v-icon>
        </button>
        <div v-else>
          <button class="ml-2" @click="saveDetails">
            Save
          </button>
          <button class="ml-2" @click="detailsActions.isEducation = false">
            Cancel
          </button>
        </div>
      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions.isEducation" v-model="details.education"></v-textarea>
        <v-card-text v-else>
          {{ details.education }}
        </v-card-text>

      </v-card>
    </div>
    <div class="my-8">
      <div class="d-flex ">
        <span class="ml-2"> Expecience</span>
        <button class="ml-2" @click="isEditable('isExperience')" v-if="!detailsActions.isExperience">
          <v-icon>mdi-pencil</v-icon>
        </button>
        <div v-else>
          <button class="ml-2" @click="saveDetails">
            Save
          </button>
          <button class="ml-2" @click="detailsActions.isExperience = false">
            Cancel
          </button>
        </div>
      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions.isExperience" v-model="details.experience"></v-textarea>
        <v-card-text v-else>
          {{ details.experience }}
        </v-card-text>

      </v-card>
    </div>
    <div class="my-8">
      <div class="d-flex ">
        <span class="ml-2"> Intrests</span>
        <button class="ml-2" @click="isEditable('isIntrest')" v-if="!detailsActions.isIntrest">
          <v-icon>mdi-pencil</v-icon>
        </button>
        <div v-else>
          <button class="ml-2" @click="saveDetails">
            Save
          </button>
          <button class="ml-2" @click="detailsActions.isIntrest = false">
            Cancel
          </button>
        </div>
      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions.isIntrest" v-model="details.intrests"></v-textarea>
        <v-card-text v-else>
          {{ details.intrests }}
        </v-card-text>

      </v-card>
    </div>
    <div class="my-8">
      <div class="d-flex ">
        <span class="ml-2"> Achievements</span>
        <button class="ml-2" @click="isEditable('isAchievement')" v-if="!detailsActions.isAchievement">
          <v-icon>mdi-pencil</v-icon>
        </button>
        <div v-else>
          <button class="ml-2" @click="saveDetails">
            Save
          </button>
          <button class="ml-2" @click="detailsActions.isAchievement = false">
            Cancel
          </button>
        </div>
      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions.isAchievement" v-model="details.achievements"></v-textarea>
        <v-card-text v-else>
          {{ details.achievements }}
        </v-card-text>
      </v-card>
    </div>
    <BioEditDialog v-model:isDialogVisible="bioEditDialogVisible" />
  </div>
</template>

<script>
import BioEditDialog from "./BioEditDialog.vue"
import axios from "@axios";
export default {
  components: { BioEditDialog },
  props: {
    details: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      bioEditDialogVisible: false,
      details: {
        about: '',
        profession: '',
        education: '',
        achievements: '',
        intrests: '',
        experience: ''


      },
      detailsActions: {
        isAbout: false,
        isProfession: false,
        isEducation: false,
        isExperience: false,
        isIntrest: false,
        isAchievement: false
      }
    }
  },

  methods: {
    bioEditDialog() {
      this.bioEditDialogVisible = true;
    },
    isEditable(type) {
      this.detailsActions[type] = true
    },
    updateDetails() {
      axios
        .post("/influencer/update-content/", {
          about: this.details.about,
          experience: this.details.experience,
          education: this.details.education,
          profession: this.details.profession,
          intrests: this.details.intrests,
          achievements: this.details.achievements,
          images: []
        })
        .then((res) => {
          console.log(res.data);
          show.value = true;
          snkMsg.value = "Successfully logged in";
          const userData = res.data;
          loading.value = false;

        })
        .catch((err) => {
          loading.value = false;
          console.error(err);
          show.value = true;

          snkMsg.value = err.response.data.message;

          color.value = "error";
        });
    }
  },
};
</script>

<style></style>
