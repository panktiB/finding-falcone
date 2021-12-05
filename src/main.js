import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import Vuesax from 'vuesax';
import Router from 'vue-router';
import 'animate.css/animate.min.css';
import './assets/font-awesome/css/all.min.css';
import './assets/globalStyles.scss';
import 'vuesax/dist/vuesax.css';
import router from './routes/routes';
import globalMixins from './mixins/globalMixins';

Vue.use(Vuesax);
Vue.use(Vuex);
Vue.use(Router);
Vue.mixin(globalMixins);

Vue.config.productionTip = false;

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
