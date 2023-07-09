import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {books} from './stores/index'
import "nprogress/nprogress.css"



const app = createApp(App)

app.use(createPinia())
app.provide('books', books)
app.use(router)

app.mount('#app')
