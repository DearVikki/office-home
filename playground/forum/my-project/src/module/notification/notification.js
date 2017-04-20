import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'

import switchtab from '../../components/Switchtab.vue'
import myfooter from '../../components/Footer.vue'
import notice from './Notice.vue'
import msg from './Msg.vue'

const router = new common.VueRouter({
	routes:[{
		path:'/notice',
		component: notice
	},{
		path:'/msg',
		component:msg
	}]
})

var vm = new common.Vue({
  el: '#app',
  data:{
  	tabs:[{
  		content:'通知',
  	},{
  		content:'私信'
  	}],
    initialtab:0,
    iosVersion:10
  },
  router:router,
  methods:{
  	clicktab(i){
  		if(i) {
        this.$router.push('msg');
        document.title = '私信';
      }
      else {
        this.$router.push('notice');
        document.title = '通知';
      }
      if(this.iosVersion < 10) location.reload();
  	}
  },
  mounted(){
    if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      this.iosVersion = parseInt(v[1], 10);  
    }
    if(location.hash === '#/msg') {
        this.initialtab = 1;
        document.title = '私信';
      } else {
        document.title = '通知';
      }
  },
  components:{notice,msg,switchtab,myfooter}
})