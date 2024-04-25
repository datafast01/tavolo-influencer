<template>
    <div>
        <div>
            <VRow>
                <VCol cols="12">
                    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="space-between">
                        <v-tab value="1">
                            <div class="text-h6 mb-5">Awaiting Contracts</div>
                        </v-tab>
                        <v-tab value="2">
                            <div class="text-h6 mb-5">Active Contracts</div>
                        </v-tab>
                    </v-tabs>
                </VCol>
                <VCol>
                    <v-window v-model="tab">
                        <v-window-item value="1">


                            <AwaitingContracts />


                        </v-window-item>
                        <v-window-item value="2">
                            <ActiveContracts />
                        </v-window-item>
                    </v-window>
                </VCol>
            </VRow>
        </div>
        <div>


        </div>



    </div>
</template>

<script>
import axios from '@axios'
import store from "@/store/index.js";
import AwaitingContracts from './AwaitingContracts.vue'
import ActiveContracts from './ActiveContracts.vue'


export default {
    components: { AwaitingContracts, ActiveContracts },

    data() {
        return {
            tab: null,





            selectedPaymentMethod: "relaunch",
            isCardEditDialogVisible: false,
            sequenceType: '',
        };
    },
    computed: {

    },
    methods: {




    },

};
</script>

<style>
.pricing-card {
    border: 2px solid #9155fd;
    border-radius: 10px;
}
</style>
