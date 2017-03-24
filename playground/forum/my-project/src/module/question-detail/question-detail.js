import common from '../../assets/js/common.js'
import h5common from '../../assets/js/h5Common.js'
import questiondetail from './Question-detail.vue'
import {myAlert} from '../../assets/js/utils.js';
common.Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if(response.body.code !== 1000) {
        	 myAlert.small(response.body.msg);
        	 response.loveU = false;
        } else response.loveU = true;
    })
})

var vm = new common.Vue({
  el: '#app',
  data: {
  	msg:''
  },
  components:{questiondetail}
})