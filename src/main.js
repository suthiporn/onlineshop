// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueFire from 'vuefire'
Vue.use(VueFire)

require('./assets/bootstrap/css/bootstrap.css')
require('./assets/bootstrap/css/bootstrap.min.css')
require('./assets/bootstrap/css/bootstrap-responsive.css')
//require('./assets/bootstrap/css/bootstrap-responsive.min.css')
//require('./assets/themes/css/bootstrappage.css')


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
