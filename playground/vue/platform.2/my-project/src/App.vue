<template>
  <div id="app">
    <!--<h2 class="ui header center aligned">
          <img class="ui image" src="/images/icons/school.png">
          <div class="content">
            初中习题库
          </div>
        </h2>-->
    <select class="ui dropdown" v-model="pageListAmount">
      <option value=5>每页5条</option>
      <option value=10>每页10条</option>
      <option value=50>每页50条</option>
      <option :value="allData">全部</option>
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
          <td>
            <span v-for='pic in list.content.pics'>
              <img :src="pic" />
            </span>
            {{list.content.text}}
          </td>
          <td class="center aligned">
            <button class="ui icon teal button" @click='zoom(list)'>
              <i class="zoom icon"></i>
            </button>
            <button class="ui icon orange button" @click='edit(list)'>
              <i class="edit icon"></i>
            </button>
            <button class="ui icon red button" @click='deleteList(list)'>
              <i class="delete icon"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>共{{allData}}条数据</th>
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
const data = Mock.mock({
  'data|52':[{
    'id|+1':100000000,
    'pid|0-100':2,
    'grade|1':['九上','九下','七上','七下','八上',''],
    'title|1':['三角函数知识','几何','不等式','二元二次方程'],
    'content':{
      'text':Random.cparagraph(),
      'pics|4':[Random.dataImage('200x100')]
    },
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
      pageListAmount:5
    }
  },
  mounted(){
    this.allPage = Math.ceil(data.data.length/this.pageListAmount);
    this.displayList();
    this.allData = data.data.length;
    /*this.$http.get('/single_manage/php/knowledge/get_list').then((response) => {
        console.log(response)
    }, (response) => {
        // 响应错误回调
    });*/

    //   $('table').tablesort();
  },
  methods:{
    zoom(list){
      $('.zoom.modal').modal('show');
      this.activeList = list;
    },
    edit(list){
      $('.edit.modal').modal('show');
      this.activeList = list;
    },
    deleteList(index){
      //console.log(list)
      this.lists.splice(index,1);
    },
    displayList(){
      const page = this.$route.query.page||1;
      const start = (page-1)*this.pageListAmount;
      const end = start+parseFloat(this.pageListAmount);
      this.lists = data.data.slice(start,end);
    }
  },
  watch: {
    '$route' (to) {
      this.displayList();
    },
    pageListAmount(){
      //this.$route.query.page = 1;
      this.allPage = Math.ceil(data.data.length/this.pageListAmount);
      this.$router.push({query: { page:1 }});
      this.displayList();
    }
  },
  components:{ZoomModal,EditModal,Pagination}
}
</script>

<style>
</style>
