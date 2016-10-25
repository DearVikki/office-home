import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.config.debug = true;
/* eslint-disable no-new */

Vue.use(VueRouter);
Vue.use(VueResource);
//import Incre from './components/Incre'
import Hello from './components/Hello'
const Incre = {
	template:'<div>{{$route.params.id}}<router-view></router-view></div>',
    watch:{
    '$route'(to,from){
      console.log('to: ',to,',from: ',from)
    }
}
}
const Profile = {
	template:'<div>This is a profile</div>'
}
const Foo2 = {
	template:'This is foo2'
}
const Hello2 = {
	template:'<transition name="fade"><p>Hello!!</p></transition>'
}

const router = new VueRouter({
    routes: [{
        path: '/first',
        components: {
        	default: Hello,
        	a: Hello2
        }
    }, {
        path: '/foo/:id',
        component: Incre,
        children:[{
        	path:'',
        	component: Profile,
        	children:[{
        		path:'foo2',
        		component: Foo2
        	}]
        }]
    }],
     mode: 'history',
})
const app = new Vue({
	el:'#app2',
    router: router
})
new Vue({
    el: '#app1',
    template: '<App/>',
    components: {
        App
    }
})