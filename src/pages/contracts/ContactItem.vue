<template>
  <v-row no-gutters>
    <v-col
      cols="12"
      v-for="index in data.actions.slice(0, data.countsnum)"
      :key="index.id"
    >
      <div class="me-3 border-t py-2 d-flex align-center justify-space-between">
        <div rounded class="d-flex align-center justifycenter">
          <div class="bg-darken2">
            <v-img :src="play1" height="20" width="20" alt="John"></v-img>
          </div>
          <div class="text-left">
            <span class="font-12">Yesterday</span>
            <h4 class="l-h">{{ index.name }}</h4>
            <span class="font-12">{{ index.size }}</span>
          </div>
        </div>
        <div>
          <div class="d-flex align-center justify-center">
            <!-- <v-img :src="index.image" height="30" width="30" alt="John"></v-img> -->
            <!-- <v-btn
              class="ml-2"
              @click="executeSendRequest"
              elevation="24"
              size="large"
              >Ask for revision</v-btn
            > -->
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" class="text-center">
      <v-btn
        v-if="data.countsnum < data.actions.length"
        @click="loadMore"
        color="grey-darken-2 "
        size="small"
        class="btn btn-sm btn-danger"
      >
        View More
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { reactive } from "vue";
import download from "@/assets/images/cards/download.png";
import play1 from "@/assets/images/cards/folder.png";
export default {
  props: ["sendRequest"],
  data() {
    return {
      data: reactive({
        actions: [
          {
            id: 0,
            name: "Iphone 12",
            size: "3.8 GB",
            image: download,
          },
          {
            id: 1,
            name: "Samsung s10",
            size: "1.8 GB",
            image: download,
          },
          {
            id: 2,
            name: "Samsung Tv",
            size: "2.8 GB",
            image: download,
          },
          {
            id: 3,
            name: "Huwawei Mate",
            size: "1.8 GB",
            image: download,
          },
          {
            id: 4,
            name: "Samsung s10",
            size: "2.8 GB",
            image: download,
          },
          {
            id: 5,
            name: "Samsung Tv",
            size: "2.8 GB",
            image: download,
          },
          {
            id: 6,
            name: "Huwawei Mate",
            size: "0.8 GB",
            image: download,
          },
        ],
        countsnum: 2,
      }),
      download: download,
      play1: play1,
    };
  },
  methods: {
    loadMore() {
      if (this.data.countsnum >= this.data.actions.length) {
        return;
      } else {
        this.data.countsnum += 2;
      }
    },
    executeSendRequest() {
      this.sendRequest(); // Call the sendRequest function passed from the parent
    },
  },
};
</script>
<style></style>

<!-- 
<template>
  <div class="row my-4">
    <div
      class="col-md-4 mb-2"
      v-for="product in data.products.slice(0, data.productToShow)"
      :key="product.id"
    >
      <div class="card" style="width: 18rem">
        <img :src="product.image" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button class="btn btn-primary">
            <i class="bi bi-cart-check"></i> add to cart
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-12 d-flex justify-content-center my-5">
      <button
        v-if="data.productToShow < data.products.length"
        @click="loadMoreProducts"
        class="btn btn-sm btn-danger"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  data() {
    return {
      data: reactive({
        products: [
          {
            id: 1,
            name: "Iphone 12",
            price: 700,
            image:
              "https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202__480.jpg",
          },
          {
            id: 2,
            name: "Samsung s10",
            price: 400,
            image:
              "https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938__340.jpg",
          },
          {
            id: 3,
            name: "Samsung Tv",
            price: 1200,
            image:
              "https://cdn.pixabay.com/photo/2019/06/30/18/19/tv-4308538__480.jpg",
          },
          {
            id: 4,
            name: "Huwawei Mate",
            price: 900,
            image:
              "https://cdn.pixabay.com/photo/2017/08/11/14/19/honor-2631271__340.jpg",
          },
          {
            id: 5,
            name: "Samsung s10",
            price: 400,
            image:
              "https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938__340.jpg",
          },
          {
            id: 6,
            name: "Samsung Tv",
            price: 1200,
            image:
              "https://cdn.pixabay.com/photo/2019/06/30/18/19/tv-4308538__480.jpg",
          },
          {
            id: 7,
            name: "Huwawei Mate",
            price: 900,
            image:
              "https://cdn.pixabay.com/photo/2017/08/11/14/19/honor-2631271__340.jpg",
          },
          // Other product data...
        ],
        productToShow: 2,
      }),
    };
  },
  methods: {
    loadMoreProducts() {
      if (this.data.productToShow >= this.data.products.length) {
        return;
      } else {
        this.data.productToShow += 2;
      }
    },
  },
};
</script>

 -->
