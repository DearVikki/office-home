<template>
  <div id="app">
    <!--<h2 class="ui header center aligned">
          <img class="ui image" src="/images/icons/school.png">
          <div class="content">
            初中习题库
          </div>
        </h2>-->
    <select class="ui dropdown" v-model="pageListAmount">
      <option value=20>每页20条</option>
      <option value=50>每页50条</option>
      <option value=100>每页100条</option>
      <option :value="allDataLen">全部</option>
    </select>
    <table class="ui celled table blue striped fixed single line sortable">
      <thead>
        <tr>
          <th class="two wide center aligned">id</th>
          <th class="two wide center aligned">pid</th>
          <th class="one wide grade center aligned">grade</th>
          <th class="two wide center aligned">title</th>
          <th class="three wide center aligned no-sort">content</th>
          <th class="two wide center aligned no-sort">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(list,index) in lists'>
          <td>
            {{list.id}}
          </td>
          <td>{{list.pid}}</td>
          <td>{{list.grade}}</td>
          <td>{{list.title}}</td>
          <td v-html="list.content">
          </td>
          <td class="center aligned">
            <button class="ui icon teal button" @click='zoom(list)'>
              <i class="zoom icon"></i>
            </button>
            <button class="ui icon orange button" @click='edit(list)'>
              <i class="edit icon"></i>
            </button>
            <button class="ui icon red button" @click='deleteList(list,index)'>
              <i class="delete icon"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>共{{allDataLen}}条数据</th>
          <th colspan="5" style="border-left:none">
            <pagination :pageNum='allPage'></pagination>
          </th>
      </tr>
      </tfoot>
    </table>
    <ZoomModal :activeList='activeList'></ZoomModal>
    <EditModal v-model='activeList'></EditModal>
  </div>
</template>

<script>
import Mock from 'Mockjs'
import ZoomModal from './components/ZoomModal'
import EditModal from './components/EditModal'
import Pagination from './components/Pagination'

//import tablesort from 'jquery-tablesort'
const Random = Mock.Random;
const data = Mock.mock(/\.json/,{
  'data|52':[{
    'id|+1':100000000,
    'pid|0-100':2,
    'grade|1':['九上','九下','七上','七下','八上',''],
    'title|1':['三角函数知识','几何','不等式','二元二次方程'],
    'content':'hh'
  }]
})
export default {
  name: 'app',
  data(){
    return{
      lists:[],
      activeList:'',
      allPage:'',
      allData:'',
      allDataLen:'',
      pageListAmount:20
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      this.$http.get('../knowledge/get_list.json').then((response) => {
        this.allData = JSON.parse(response.data).data//response.data.data;
        this.displayList();
        this.allPage = Math.ceil(this.allData.length/this.pageListAmount);
        this.allDataLen = this.allData.length;
      })
    },
    zoom(list){
      $('.zoom.modal').modal('show');
      this.activeList = list;
    },
    edit(list){
      $('.edit.modal').modal('show');
      this.activeList = list;
    },
    deleteList(list,index){
      this.lists.splice(index, 1);
      this.$http.get('../knowledge/delete?id='+list.id).then((response) => {
        this.getData();
        this.displayList();
      })
    },
    displayList(){
      const page = this.$route.query.page||1;
      const start = (page-1)*this.pageListAmount;
      const end = start+parseFloat(this.pageListAmount);
      this.lists = this.allData.slice(start,end);
    }
  },
  watch: {
    '$route' (to) {
      this.displayList();
    },
    pageListAmount(){
      //this.$route.query.page = 1;
      this.allPage = Math.ceil(this.allData.length/this.pageListAmount);
      this.$router.push({query: { page:1 }});
      this.displayList();
    }
  },
  components:{ZoomModal,EditModal,Pagination}
}
</script>

<style>
</style>
