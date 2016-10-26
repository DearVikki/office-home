<template>
 <div id="app" class="ui vertical stripe segment">
        <div class="ui container">
            <div id="content" class="ui basic segment">
                <h3 class="ui header">List of Users</h3>
                <vuetable
                    api-url="http://example.app:8000/api/users"
                    table-wrapper="#content"
                    :fields="columns"
                    :item-actions="itemActions"
                ></vuetable>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      columns: [
                'name',
                'nickname',
                'email',
                'birthdate',
                'gender',
                '__actions'
                ],
      itemActions: [
                { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
                { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button'},
                { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
                ]
    }
  },
  mounted(){
    console.log($(document).width())
  },
  methods:{
    viewProfile() {
      console.log('view profile with id:', id)
    }
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
  components:['vuetable']
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
