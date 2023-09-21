import { createApp } from 'vue'
import AuthContainer from './AuthContainer.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'

loadFonts()

createApp(AuthContainer)
  .use(router)
  .use(vuetify)
  .mount('#app')
