import Vue from 'vue';
import vuecircle from './Circle.vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import '../../assets/h5Common.js'

new Vue({
	el:'#app',
	components:{vuecircle}
})