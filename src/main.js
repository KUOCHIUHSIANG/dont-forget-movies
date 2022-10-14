import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vClickOutside from 'v-click-outside'
import './assets/scss/main.scss'

/* import the fontawesome somethings... */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMagnifyingGlass,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faMagnifyingGlass, faCaretLeft, faCaretRight);

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(vClickOutside);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
