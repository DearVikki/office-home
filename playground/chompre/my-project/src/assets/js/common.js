import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://www.chompre.cl/zl_shopping/php/index.php/PcApi';
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;
import '../lib/public.less'
import Myheader from '../../components/Header'
import Myfooter from '../../components/Footer'
import loading from '../../components/Loading'
var validatorMixin = {
    methods: {
        isNum(val) {
            return !isNaN(val);
        },
        required(val) {
            return val;
        },
        isEmail(val){
            return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(val);
        },
        minlen(val, extra) {
            return val.length >= extra.len;
        },
        maxlen(val, extra) {
            return val.length <= extra.len;
        },
        checkAll(fields){
        	let checked = true;
        	Object.values(fields).forEach((e) => {
        		if(!this.handleValidate(e)) checked = false;
        	})
        	return checked;
        },
        handleValidate(field) {
            let checked = true;
            for (var ruleName in field.validators) {
                var rule = field.validators[ruleName];
                if (!this[ruleName](field.val, rule.extra) && checked) {
                    field.error = true;
                    field.msg = rule.msg;
                    checked = false;
                    break;
                }
            }
            if(checked) field.error = false;
            return checked ? true : false;
        },
        fieldFocus(field) {
            field.focus = true;
            field.error = false;
        },
        fieldBlur(field) {
            this.handleValidate(field);
            field.focus = false;
        }
    }
}
var interceptors = function(vm) {
    Vue.http.interceptors.push((request, next) => {
        vm.showLoading = true
        next((response) => {
            vm.showLoading = false;
            return response;
        });
    });
}
// 判断是否是登录状态
// let isLogin = true;
// Vue.http.post('',{
//     name:'zl.shopping.sys.shop.cart'
// }).then((response) => {
//     if(response.body.code === 1004) {
//         isLogin = false;
//         localStorage.removeItem('userInfo');
//     }
// })
export default {
    VueRouter: VueRouter,
    Vue: Vue,
    myHeader: Myheader,
    myFooter: Myfooter,
    loading: loading,
    validatorMixin: validatorMixin,
    interceptors: interceptors
}