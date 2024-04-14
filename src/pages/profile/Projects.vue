<!-- ReelsDialog.vue -->
<template>
    <div>
        No Projects available
        <!-- <v-dialog v-model="dialog" fullscreen hide-overlay>
            <v-carousel v-model="currentIndex" hide-delimiters hide-controls>
                <v-carousel-item v-for="(video, index) in videos" :key="index">
                    <video :src="video.url" class="reel-video" controls preload="auto"></video>
                </v-carousel-item>
            </v-carousel>

        </v-dialog>
        <v-btn @click="dialog = true" color="primary">Open Reels</v-btn> -->
    </div>

</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            currentIndex: 0,
            videos: [
                { url: 'video1.mp4' }, // Replace with your video URLs
                { url: 'video2.mp4' },
                { url: 'video3.mp4' }
            ]
        };
    }
};
</script>

<style scoped>
.reel-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
