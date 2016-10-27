<template>
 <div id="app" class="ui vertical stripe segment">
  <div class="ui container">
    <div id="content" class="ui basic segment">
      <h3 class="ui header">List of Users</h3>
      <vuetable
      api-url="http://vuetable.ratiw.net/api/users"
      table-wrapper="#content"
      pagination-path="pagination"
      :fields="columns"
      :item-actions="itemActions"
      :per-page="perPage"
      ></vuetable>
      <div class="vuetable-pagination ui bottom attached segment grid">
        <vuetable-pagination-info ref="paginationInfo"
        :pagination-info-template="paginationInfoTemplate"
        ></vuetable-pagination-info>
        <component :is="paginationComponent" ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
        ></component>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Vuetable from 'vuetable-2/src/components/Vuetable.vue'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue'
  import VuetablePaginationDropdown from 'vuetable-2/src/components/VuetablePaginationDropdown.vue'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo.vue'

  export default {
    name: 'app',
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationDropdown,
      VuetablePaginationInfo,
    },
    data(){
      return{
        columns: [
        {
          name: 'id',
          title: '',
          dataClass: 'center aligned'
        },
        {
          name: 'name',
          title: 'Full Name',
          sortField: 'name'
        },
        {
          name: 'email',
          sortField: 'email',
          visible: true
        },
        {
          name: 'nickname',
          sortField: 'nickname',
        },
        {
          name: 'birthdate',
          sortField: 'birthdate'
        },
        {
          name: 'gender',
          sortField: 'gender',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        },
        {
          name: '__component:custom-actions',
          dataClass: 'center aligned',
          title: 'Actions'
        }
        ],
        itemActions: [
        { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
        { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button'},
        { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
        ],
        perPage: 10,
        paginationComponent: 'vuetable-pagination',
        paginationInfoTemplate: 'Showing record: {from} to {to} from {total} item(s)'
      }
    },
    mounted(){
      console.log($(document).width())
    },
    methods:{
     transform: function(data) {
      let transformed = {}
      transformed.pagination = {
        total: data.total,
        per_page: data.per_page,
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        from: data.from,
        to: data.to
      }

      transformed.data = []
      data = data.data
      for (let i = 0; i < data.length; i++) {
        transformed['data'].push({
          id: data[i].id,
          name: data[i].name,
          nickname: data[i].nickname,
          email: data[i].email,
          birthdate: data[i].birthdate,
          gender: data[i].gender,
          address: data[i].address.line1 + ' ' + data[i].address.line2 + ' ' + data[i].address.zipcode
        })
      }

      return transformed
    },
    viewProfile() {
      console.log('view profile with id:', id)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
  },
  events:{
    'vuetable:action': function(action, data) {
      console.log('vuetable:action', action, data)
      if (action == 'view-item') {
        this.viewProfile(data.id)
      }
    },
    'vuetable:load-error': function(response) {
     console.log('Load Error: ', response)
   }
 },
 watch: {
  'paginationComponent' (val, oldVal) {
    this.$nextTick(function() {
      this.$refs.pagination.setPaginationData(this.$refs.vuetable.tablePagination)
    })
  },
  'perPage': function(val, oldVal) {
    this.$broadcast('vuetable:refresh')
  },
}
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
