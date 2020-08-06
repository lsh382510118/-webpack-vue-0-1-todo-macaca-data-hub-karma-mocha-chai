import Vue from 'vue'
import App from './app.vue'
import router from './router/index';
import store from './store'
import './assets/styles/global.scss';

new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#root")
