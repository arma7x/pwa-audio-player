// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue2-toast/lib/toast.css';
import Vue from 'vue';
import Toast from 'vue2-toast';
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import bFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio';
import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group';
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.component('b-navbar', bNavbar);
Vue.component('b-form-group', bFormGroup);
Vue.component('b-form-radio', bFormRadio);
Vue.component('b-form-radio-group', bFormRadioGroup);
Vue.component('b-list-group', bListGroup);

Vue.use(Toast, {
  type: 'bottom',
  duration: 3000,
  wordWrap: true,
  width: 'auto',
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
