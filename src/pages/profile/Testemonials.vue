<template>
  <div class="mt-8">
    <div class="d-flex justify-space-between align-center">
      <div>TESTIMONIALS</div>
      <div><v-btn variant="outlined"> View All </v-btn></div>
    </div>
    <VRow>
      <VCol
        cols="12"
        md="6"
        v-for="testemonial in testemonials"
        :key="testemonial"
      >
        <v-card class="mt-4" elevation="16" min-height="245">
          <v-card-text>
            <div
              class="d-flex justify-space-between my-3"
              style="min-height: 100px"
            >
              <div>
                {{ testemonial.review }}
              </div>
              <div>
                <v-rating
                  :model-value="testemonial.rating"
                  color="yellow-darken-3"
                  half-increments
                  density="compact"
                  readonly
                ></v-rating>
              </div>
            </div>
            <div class="d-flex justify-space-between my-3">
              <div class="d-flex align-center">
                <div>
                  <v-avatar :image="avatar" class="custom-avatar"></v-avatar>
                </div>
                <div class="d-flex flex-column ml-3">
                  <div class="font-weight-bold">
                    {{ testemonial.businessName }}
                  </div>
                  <div class="font-weight-light f-12">
                    {{ testemonial.date }}
                  </div>
                </div>
              </div>
              <div>
                <img src="@images/svg/quotation-marks.svg" alt="" srcset="" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </VCol>
    </VRow>
  </div>
</template>

<script>
import avatar from "@/assets/images/avatars/avatar-1.png";

export default {
  data() {
    return {
      avatar: avatar,

      testemonials: [
        {
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt efficitur urna, quis scelerisque orci imperdiet non. Nulla lectus ligula, egestas quis dapibus in, dictum a sapien. Fusce et dui ultricies.",
          rating: 4,
          businessName: "Tavolo",
          date: "October 17, 2019",
        },
        {
          review: "Lorem ipsum dolor sit amet, ",
          rating: 5,
          businessName: "Google",
          date: "October 17, 2019",
        },
        {
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          rating: 2.5,
          businessName: "Microsoft",
          date: "October 17, 2019",
        },
        {
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt efficitur urna, quis scelerisque orci imperdiet non. Nulla lectus ligula, egestas quis dapibus in, dictum a sapien. Fusce et dui ultricies.",
          rating: 4,
          businessName: "Tavolo",
          date: "October 17, 2019",
        },
      ],
    };
  },
};
</script>

<style></style>
