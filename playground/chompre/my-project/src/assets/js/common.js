import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://121.40.91.157/zl_shopping/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;
import '../lib/public.less'
import Myheader from '../../components/Header'
import Myfooter from '../../components/Footer'
import loading from '../../components/Loading'

var validatorMixin = {
	methods:{
		isNum(val){
			return !isNaN(val);
		},
		required(val){
			return val;
		},
		handleValidate(field) {
			let checked = true;
			for(var rule in field.validators){
				if(!this[rule](field.val) && checked) {
					field.error = true;
					field.msg = field.validators[rule].msg;
					checked = false;
					break;
				}
			}
			return checked?true:false;
		},
		fieldFocus(field){
			field.focus = true;
			field.error = false;
		},
		fieldBlur(field){
			this.handleValidate(field);
			field.focus = false;
		}
	}
}

var interceptors = function(vm){
	Vue.http.interceptors.push((request, next) => {
	    vm.showLoading = true
	    next((response) => {
	        vm.showLoading = false
	         console.log(vm.showLoading)
	        return response;
	    });
	});
}

export default{
	VueRouter: VueRouter,
	Vue: Vue,
	myHeader: Myheader,
	myFooter: Myfooter,
	loading: loading,
	validatorMixin: validatorMixin,
	interceptors: interceptors
}