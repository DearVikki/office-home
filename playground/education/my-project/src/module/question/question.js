import common from '../../assets/js/common.js'
import question from './Question.vue'

const myheader = common.myHeader;
new common.Vue({
  el: '#app',
  components:{question,myheader}
})