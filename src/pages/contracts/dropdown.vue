<template>
  <v-card id="menu-activator">
    <div
      class="pa-4 selected d-flex align-center justify-space-between"
      @click="toggle"
    >
      <span>Sort By</span>
      <v-img :src="sort" class="flex-grow-0" height="20" width="20" alt="John">
      </v-img></div
  ></v-card>

  <v-menu activator="#menu-activator">
    <v-list>
      <v-list lines="three" select-strategy="classic">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="primary"
          class="pt-0 pb-0"
          min-height="30"
        >
          <template v-slot:prepend>
            <v-radio value="rounded-0"></v-radio>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-list>
  </v-menu>
</template>

<script>

import sort from "@/assets/images/cards/sort.png";
export default {
  data: () => ({
    sort: sort,
    favorites: [],
    items: [
      { title: "Date: Old to New" },
      { title: "Date: New to Old" },
      { title: "Alphabetically (A - Z)" },
      { title: "Alphabetically (Z - A)" },
    ],
  }),
};
</script>

<!-- <template>
  <div class="my-dropdown">
    <v-card>
      <div
        class="card selected d-flex align-center justify-space-between"
        @click="toggle"
      >
        <span>Sort By</span>
        <v-img
          :src="sort"
          class="flex-grow-0"
          height="20"
          width="20"
          alt="John"
        ></v-img></div
    ></v-card>
    <v-card class="options" v-show="isOpen">
      <div>
        <div class="option" v-for="option in options" @click="set(option)">
          {{ option }}
        </div>
      </div>
    </v-card>
  </div>
</template> -->

<!-- <script>
import sort from "../../../assets/images/cards/sort.png";

export default {
  data() {
    return {
      favorites: [],
      isOpen: false,
      selected: "Select your favourite beer",
      options: ["Heineken", "Amstel", "Dommelsch"],
      sort: sort,
    };
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    show() {
      this.isOpen = true;
    },
    hide() {
      this.isOpen = false;
    },
    set(option) {
      this.selected = option;
      this.hide();
    },
  },
};
</script>

<style scoped>


.my-dropdown {
  position: relative;
}
.selected {
 
  z-index: 200;
  display: block;
  width: 100%;
  height: 56px;
  padding: 0 20px;

  border-radius: 10px;
  font: 1.25rem/40px "Ubuntu", Helvetica, Arial, sans-serif;
  
}


.selected:after {
  opacity: 0.5;
  display: inline-block;
  margin-left: 10px;
  
}


.selected:hover:after {
  opacity: 1;
}


.options {
  position: absolute;
  left: 0;

  z-index: 1;
  width: 100%;
  margin-top: 3px;
 
  border-radius: 10px;
}


.option {
  padding: 5px 20px;
  
}


.option:hover {
  background-color: rgba(0, 0, 0, 0.05);
}


.option:last-child {
  border-bottom: none;
}


.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}
</style> -->
./dropdown.vue
