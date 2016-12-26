import common from '../../assets/js/common.js'
import trialframe from './trialFrame.vue'

const myheader = common.myHeader;
new common.Vue({
  el: '#app',
  components:{trialframe,myheader}
})