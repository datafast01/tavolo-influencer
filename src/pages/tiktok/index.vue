<template>
  <div>
    <div>
      <div class="d-flex flex-column">
        <video
          ref="videoPlayer"
          width="200"
          height="300"
          controls
          class="video"
        >
          <source src="./tiktok.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <span class="mb-2">@junnorthloop</span>
      </div>

      <div class="username mt-1">
        <div class="d-flex justify-space-between">
          <span class="mb-1">Reach</span>
          <span class="d-flex justify-end">20</span>
        </div>

        <div>
          <div class="d-flex align-center">
            <v-progress-linear
              model-value="20"
              color="primary"
              :height="8"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div class="username my-2">
        <div class="d-flex justify-space-between">
          <span class="mb-1">Imressions</span>
          <span class="d-flex justify-end">50</span>
        </div>

        <div>
          <div class="d-flex align-center">
            <v-progress-linear
              model-value="50"
              color="primary"
              :height="8"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div class="username my-2">
        <div class="d-flex justify-space-between">
          <span class="mb-1">Engagement</span>
          <span class="d-flex justify-end">80</span>
        </div>

        <div>
          <div class="d-flex align-center">
            <v-progress-linear
              model-value="80"
              color="primary"
              :height="8"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>
      <div class="username my-2">
        <div class="d-flex justify-space-between">
          <span class="mb-1">Shares</span>
          <span class="d-flex justify-end">10</span>
        </div>

        <div>
          <div class="d-flex align-center">
            <v-progress-linear
              model-value="10"
              color="primary"
              :height="8"
              rounded
            ></v-progress-linear>
          </div>
        </div>
      </div>

      <!-- <div class="overlay">
        <button @click="togglePlayPause">
          {{ isPlaying ? "Pause" : "Play" }}
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.video {
  border-radius: 24px;
}
.username {
  height: 30px;
  width: 200px;
  margin-top: 2px;
  margin-bottom: 2px;
}
</style>
