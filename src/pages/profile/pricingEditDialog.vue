<template>
  <v-dialog :width="$vuetify.display.smAndDown ? 'auto' : 860" v-model="dialog">
    <v-card class="pa-5 pa-sm-8">
      <v-card-text class="text-h5">
        <v-form class="mt-0" ref="pricingForm">
          <v-row>

            <v-col cols="12" class="text-center">
              <span class="text-h5">{{ editMode ? 'Edit' : 'Create' }} your pricing plan</span>
            </v-col>


            <VCol cols="12" class="mt-3">
              <VTextField v-model="title" label="Title" :rules="[requiredValidator]" />
            </VCol>

            <VCol cols="12">
              <VTextField v-model="description" label="Description" :rules="[requiredValidator]" />
            </VCol>

            <VCol cols="12">
              <v-combobox chips label="Key Points" multiple closable-chips flat v-model="features"
                hint="Maximum of 5 tags"
                :items="['Better Engagement', 'Post and Story', 'Instagram and Facebook', 'Usage Rights']"
                :rules="[requiredValidator]">


              </v-combobox>
            </VCol>

            <VCol cols="8">
              <VTextField v-model="price" prefix="$" label="Price" type="number" :rules="[requiredValidator]" />
            </VCol>
            <!-- <VCol cols="4">
              <v-select :items="currencies" item-value="value" item-text="name" dense v-model="currency"
                label="Currency" :rules="[requiredValidator]">
              </v-select>
            </VCol> -->
            <v-col cols="12" class="text-center">
              <span class="text-h5">{{ editMode ? 'Edit' : 'Add' }} payment details</span>
            </v-col>
            <VCol cols="12">
              <VTextField v-model="cardNumber" label="Card Number" :rules="[requiredValidator]" />
            </VCol>

            <!-- 👉 Card Name -->
            <VCol cols="12" md="6">
              <VTextField v-model="cardHolderName" label="Card Holder Name" />
            </VCol>

            <!-- 👉 Card Expiry -->
            <VCol cols="6" md="3">
              <VTextField v-model="expiry" :rules="[requiredValidator, expiredateValidator]" label="Expiry" />
            </VCol>

            <!-- 👉 Card CVV -->
            <VCol cols="6" md="3">
              <VTextField v-model="cvv" label="CVV" />
            </VCol>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" @click="submitForm" :loading="loading">{{ editMode ? 'Save' : 'Create' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import done from "@/assets/images/cards/done2.png";
import axios from '@axios'
import { requiredValidator } from "@/@core/utils/validators";
import { vMaska } from "maska";
import { masking } from "@core/utils/masking";

export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    pricingPlan: {
      type: Object,
      default: () => ({})
    }
  },
  directives: { maska: vMaska },
  data() {
    return {
      requiredValidator: requiredValidator,
      done: done,
      dialog: false,
      packageTypes: [
        { name: 'Silver', value: 'silver' },
        { name: 'Gold', value: 'gold' },
        { name: 'Platinum', value: 'platinum' }
      ],
      currencies: [{ name: 'US Dollar ($)', value: '$' }],
      loading: false,
      features: [],
      selectedPackage: null,
      packageType: 'monthly',
      currency: null,
      price: '',
      title: '',
      description: '',
      cardNumber: ''
    }
  },
  watch: {
    pricingPlan: {
      handler(val) {
        // Update form fields if in edit mode
        if (this.editMode) {
          this.selectedPackage = val.packageType;

          this.title = val.title;
          this.description = val.description;
          this.features = val.features;
          this.price = val.price;
          this.currency = val.currency
        }
      },
      deep: true
    },
    features(val) {
      if (val.length > 5) {
        this.features.pop();
      }
    }
  },
  methods: {
    openDialog() {
      if (!this.editMode) {

        // Reset form values only if in create mode
        this.selectedPackage = null;
        this.packageType = 'monthly';
        this.selectedCurrency = null;
        this.price = '';
        this.title = '';
        this.description = '';
        this.features = [];
      }
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async submitForm() {

      const payload = {
        title: this.title,
        description: this.description,
        price: this.price,
        features: this.features,
        monthly: this.packageType === 'monthly'
      };
      const { valid } = await this.$refs.pricingForm.validate()
      if (valid) {
        if (this.editMode) {
          payload.packageId = this.pricingPlan._id
          this.loading = true
          // If in edit mode, add additional logic to update existing pricing plan
          axios.post(`/influencer/update-influencer-package`, payload)
            .then(res => {
              console.log(res.data.package);
              this.loading = false
              this.$emit('refresh');
              // this.closeDialog()

            })
            .catch(err => {
              console.error(err);
              // Handle error
            })
        } else {
          // If in create mode, add logic to create new pricing plan
          this.loading = true
          axios.post("/influencer/influencer-package", payload)
            .then(res => {
              console.log(res.data);
              this.$emit('refresh')
            })
            .catch(err => {
              console.error(err);
              // Handle error
            })
        }

        // Close the dialog after form submission
        this.closeDialog();
      }

    }
  }
};
</script>
