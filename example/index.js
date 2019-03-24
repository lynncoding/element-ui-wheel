import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Components from '../'
import routerConfig from './router.config.js'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Components)

Vue.http.options.emulateJSON = false

let router = new VueRouter(routerConfig)

new Vue({
  router
}).$mount('#app')
