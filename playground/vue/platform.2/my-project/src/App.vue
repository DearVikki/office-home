<template>
  <div id="app">
    <!--<h2 class="ui header center aligned">
          <img class="ui image" src="/images/icons/school.png">
          <div class="content">
            初中习题库
          </div>
        </h2>-->
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
        <tr v-for='list in lists'>
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
  'data|50':[{
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
      allData:''
    }
  },
  mounted(){
    this.allPage = Math.ceil(data.data.length/5);
    this.displayList();
    this.allData = data.data.length;
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
    deleteList(list){
      console.log(list)
      this.lists.$remove(list);
    },
    displayList(){
      const page = this.$route.query.page||1;
      const start = (page-1)*5;
      const end = start+5;
      this.lists = data.data.slice(start,end);
    }
  },
  watch: {
    '$route' (to) {
      this.displayList();
    }
  },
  components:{ZoomModal,EditModal,Pagination}
}
</script>

<style>
</style>
