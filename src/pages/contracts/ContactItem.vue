<template>
  <v-row no-gutters>
    <v-col cols="12" v-for="files in projectFiles" :key="files">
      <div class="me-3 border-t py-2 d-flex align-center justify-space-between"
        @click="downloadVideo(files.videoFilePath)">
        <div rounded class="d-flex align-center justifycenter">
          <div class="bg-darken2">
            <v-img :src="play1" height="20" width="20" alt="John"></v-img>
          </div>
          <div class="text-left">
            <span class="font-12">{{ moment(files.createdAt).fromNow() }}</span>
            <h4 class="l-h">File Name</h4>
            <span class="font-12">{{ bytesToMB(files.videoFileSize) }}MB</span>
          </div>
        </div>

      </div>
    </v-col>
    <!-- <v-col cols="12" class="text-center">
      <v-btn color="grey-darken-2 " size="small" class="btn btn-sm btn-danger">
        View More
      </v-btn>
    </v-col> -->
  </v-row>
</template>
<script>
import { reactive } from "vue";
import download from "@/assets/images/cards/download.png";
import play1 from "@/assets/images/cards/folder.png";
import axios from 'axios'
import moment from "moment";

export default {
  props: {
    projectFiles: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      moment: moment,
      download: download,
      play1: play1,
    };
  },
  methods: {

    bytesToMB(bytes) {
      return (bytes / (1024 * 1024)).toFixed(2);
    },
    downloadVideo(url) {
      const s3Url = url; // Replace with your S3 URL
      const fileName = 'video.mp4'; // Replace with the desired filename

      axios({
        method: 'get',
        url: s3Url,
        responseType: 'blob',
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error('Error downloading video:', error);
        });
    }
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
