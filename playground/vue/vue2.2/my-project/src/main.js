import Vue from 'vue'
import App from './App'
import App2 from './App2'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
new Vue({
  el: '#app2',
  template: '<App2/>',
  components: { App2 }
})
