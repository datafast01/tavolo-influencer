<template>
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
                                    <v-img :src="uploadFile" class="flex-grow-0" height="90" width="90"
                                        alt="John"></v-img>
                                </div>
                                <div class="text-center">
                                    <p class="mb-0 text-uppercase">Drag and drop files here</p>

                                </div>
                                <div class="pt-3 pb-1">
                                    <VBtn color="primary" @click="refInputEl?.click()">
                                        <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                                        <span class="d-none d-sm-block">BROWSE</span>
                                    </VBtn>
                                    <input ref="refInputEl" type="file" name="file"
                                        accept="video/mp4,video/x-m4v,video/*" hidden @input="uploadFiles" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <VCard class="mt-5" v-if="selectedFiles != null">
                                <div class="d-flex align-center justify-space-between pa-3">
                                    <div>

                                        <div class="pt-0" style="font-size: 10px">
                                            {{ selectedFiles.name }}
                                        </div>
                                    </div>

                                    <v-icon @click="removeFile(index)">mdi-trash</v-icon>

                                </div>
                            </VCard>
                        </div>

                        <div class="text-center pt-6" v-if="selectedFiles != null">
                            <VBtn color="primary mr-4 " @click="sendFiles" :loading="loading"> SEND </VBtn>
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
import uploadFile from "@/assets/images/cards/uploadFile.png";
import clickicon from "@/assets/images/cards/click-icons.png";


export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showModal: false,
            uploadFile: uploadFile,
            clickicon: clickicon,
            selectedFiles: null



        }
    },
    setup() {
        const refInputEl = ref(null); // Initialize ref with null

        return { refInputEl };
    },
    methods: {
        uploadFiles(event) {
            console.log(this.$refs.refInputEl.files[0].name)
            this.selectedFiles = this.$refs.refInputEl.files[0]
        },
        removeFile(index) {
            this.selectedFiles.splice(index, 1);
        },
        sendFiles() {
            this.$emit('upload-file', this.selectedFiles)
        }
    }

}
</script>

<style></style>