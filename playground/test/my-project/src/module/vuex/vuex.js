import Vue from 'vue';
import vvuex from './Vvuex.vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
	    count: 0
	  },
	  computed:{
	  	counta(){
	  		return store.state.count + 'a'
	  	}
	  },
	  mutations: {
	    increment (state) {
	      state.count++
	    }
	  }
})

console.log(store)
new Vue({
	el:'#app',
	store,
	components:{vvuex}
})