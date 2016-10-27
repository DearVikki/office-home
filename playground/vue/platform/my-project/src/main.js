import Vue from 'vue'

import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import 'expose?$!expose?jQuery!jquery'
import '../node_modules/semantic-ui-css/semantic.min.css'
import '../node_modules/semantic-ui-css/semantic.min.js'
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
import VuetablePaginationDropdown  from 'vuetable-2/src/components/VuetablePaginationDropdown.vue';

//import vueUI from 'vue-ui'
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('custom-actions', {
        template: [
        '<div>',
        '<button class="ui red button" @click="onClick(\'view-item\', rowData)"><i class="zoom icon"></i></button>',
        '<button class="ui blue button" @click="onClick(\'edit-item\', rowData)"><i class="edit icon"></i></button>',
        '<button class="ui green button" @click="onClick(\'delete-item\', rowData)"><i class="delete icon"></i></button>',
        '</div>'
        ].join(''),
        props: {
          rowData: {
            type: Object,
            required: true
          }
        },
        methods: {
          onClick: function(action, data) {
            console.log('actions: on-click', data.name)
          },
        }
      })
//Vue.component('vuetable', Vuetable);
//Vue.component('vuetable-pagination', VuetablePagination)
//Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown)

//Vue.use(vueUI);
//Vue.http.options.emulateJSON = true;
//Vue.http.options.root = 'http://mozhishi.com/shopping/php/PcApi'
const router = new VueRouter({
	routes:[{
		path:'',
		component: App
	}],
	mode:'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router
})
	