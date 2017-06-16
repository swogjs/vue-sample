// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Promise from 'es6-promise'
window.Promise = Promise

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$baseURI = process.env.serverURI
Vue.prototype.$contextPath = process.env.contextPath


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})