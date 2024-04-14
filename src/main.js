/* eslint-disable import/order */
// import '@/@fake-db/db'
import '@/@iconify/icons-bundle'
import App from '@/App.vue'

import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import store from './store'


// import { abilitiesPlugin } from '@casl/vue'
import '@core/scss/template/index.scss'
import '@styles/font_size.css'
import '@styles/styles.scss'

import { createPinia } from 'pinia'


import { createApp } from 'vue'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import Loader from './components/Loader.vue'

loadFonts()


// Create vue app
const app = createApp(App)

const options = {
    draggable: false
}
app.use(Toast, options);
app.use(Loader, 'Loader')


// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)

app.use(store)




// Mount vue app
app.mount('#app')
