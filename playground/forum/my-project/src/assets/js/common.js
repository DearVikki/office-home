import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import h5Common from './h5Common.js'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://121.40.91.157/xwlt/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;
import '../lib/public.less'

var validatorMixin = {
	methods:{
		isNum(val){
			return !isNaN(val);
		},
		isPhone(val){
			return /^1[34578]\d{9}$/.test(val);
		},
		required(val){
			return val;
		},
		handleValidate(field) {
			let checked = true;
			field.error = false;
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

export default{
	validatorMixin: validatorMixin,
	VueRouter: VueRouter,
	Vue: Vue
}