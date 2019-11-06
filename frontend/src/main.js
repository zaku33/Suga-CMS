import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from './router'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import BootstrapVue from 'bootstrap-vue'

import './plugins/element.js'

Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
