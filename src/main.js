import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import 'vue-material-slider/dist/vue-material-slider.css';
import VueMaterialSlider from 'vue-material-slider';
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.use(VueMaterial)
Vue.use(VueMaterialSlider);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const oneKValidators = Vue.component('oneKValidators', require('./pages/oneThousandValidators/1kValidatorPage.vue').default);
const validatorStatus = Vue.component('validatorStatus', require('./pages/oneThousandValidators/ValidatorDashboard.vue').default);
const landingPage = Vue.component('landingPage', require('./components/LandingPage.vue').default);
const toolPage = Vue.component('toolPage', require('./components/ToolPage.vue').default);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/tools/oneKValidators', component: oneKValidators, name: 'oneKValidator' },
    { path: '/', component: landingPage, name: 'landingPage'},
    { path: '/tools', component: toolPage, name: 'toolPage'},
    { path: '/tools/validatorStatus', component: validatorStatus, name: 'validatorStatusPage'}
  ],
});

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
