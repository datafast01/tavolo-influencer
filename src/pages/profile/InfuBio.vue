<template>
  <div>
    <VRow>



      <VCol class="align-self-center">
        <div class="d-flex  justify-end">

          <v-btn class="mt-3" @click="isEditable" v-if="!detailsActions" icon="mdi-pencil" variant="outlined"
            :loading="profileImageLoader"></v-btn>
        </div>
      </VCol>
    </VRow>

    <div class="my-8">
      <div class="d-flex">
        <span class="ml-2"> About</span>



      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions" v-model="details.about"></v-textarea>
        <v-card-text v-else>
          {{ details.about }}
        </v-card-text>


      </v-card>
    </div>

    <div class="my-8">
      <div class="d-flex">
        <span class="ml-2"> Social Media Username</span>



      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions" v-model="details.socialMediaUsername"></v-textarea>
        <v-card-text v-else>
          {{ details.socialMediaUsername }}
        </v-card-text>


      </v-card>
    </div>
    <div class="my-8">
      <div class="d-flex ">
        <span class="ml-2"> Profession</span>


      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions" v-model="details.profession"></v-textarea>
        <v-card-text v-else>
          {{ details.profession }}
        </v-card-text>

      </v-card>
    </div>

    <div class="my-8">
      <div class="d-flex ">
        <span class="ml-2"> Expecience</span>


      </div>
      <v-card class="mt-4" elevation="16">
        <v-textarea v-if="detailsActions" v-model="details.experience"></v-textarea>
        <v-card-text v-else>
          {{ details.experience }}
        </v-card-text>

      </v-card>
    </div>

    <div class="my-8">


      <div class="mt-4 d-flex justify-end" v-if="detailsActions">
        <v-btn @click="detailsActions = false" variant="outlined" class="mr-2">Cancel</v-btn>

        <v-btn @click="updateDetails" :loading="updateLoading">Save</v-btn>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "@axios";
import { useToast } from "vue-toastification";

export default {
  components: {},
  props: {
    details: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      toast: useToast(),
      bioEditDialogVisible: false,
      updateLoading: false,
      details: {
        about: '',
        profession: '',

        experience: ''


      },

      detailsActions: false
    }
  },

  methods: {
    bioEditDialog() {
      this.bioEditDialogVisible = true;
    },
    isEditable() {
      this.detailsActions = true
    },
    updateDetails() {
      this.updateLoading = true
      axios
        .post("/influencer/update-content/", {
          about: this.details.about,
          experience: this.details.experience,

          profession: this.details.profession,


        })
        .then((res) => {
          console.log(res.data);

          const userData = res.data;

          this.updateLoading = false
          this.detailsActions = false
          this.toast.success("Details Updated Successfully!");


        })
        .catch((err) => {
          this.updateLoading = false


        });
    },
    getUserProfile() {
      // console.log("submit form", ApiService);
      axios
        .get(`influencer/content`)
        .then((response) => {
          console.log("user", response.data.data);
          if (response.data.data == null) {
            this.details = {
              about: '',
              profession: '',
              education: '',
              achievements: '',
              interests: '',
              experience: ''


            }
          } else {
            this.details = response.data.data
          }



        })
        .catch((err) => {
          console.log(err);
        });
    }



  },
  mounted() {
    this.getUserProfile()
  }
};
</script>

<style></style>
