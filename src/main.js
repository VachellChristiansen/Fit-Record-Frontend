import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

console.log(process.env.API_URL)
createApp(App).use(router).mount('#app')
