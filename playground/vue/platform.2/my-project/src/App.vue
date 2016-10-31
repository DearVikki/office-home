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
            <button class="ui icon red button" @click='deleteList(list)'>
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
const data = Mock.mock({
  'data|52':[{
    'id|+1':100000000,
    'pid|0-100':2,
    'grade|1':['九上','九下','七上','七下','八上',''],
    'title|1':['三角函数知识','几何','不等式','二元二次方程'],
    'content':'<p>This is ueditor<img class="kfformula" src="data:image/png;base64,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" data-latex="x=\frac {-b\pm \sqrt {{b}^{2}-4ac}} {2a}"/></p>'
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
      pageListAmount:5
    }
  },
  mounted(){
    this.allData = data.data;
    this.displayList();
    this.allPage = Math.ceil(data.data.length/this.pageListAmount);
    this.allDataLen = data.data.length;
    console.log(data)
    //   $('table').tablesort();
  },
  methods:{
    getData(){
      /*this.$http.get('/single_manage/php/knowledge/get_list').then((response) => {
        console.log(response)
    }, (response) => {
        // 响应错误回调
    });*/
    },
    zoom(list){
      $('.zoom.modal').modal('show');
      this.activeList = list;
    },
    edit(list){
      $('.edit.modal').modal('show');
      this.activeList = list;
    },
    deleteList(index){
      this.lists.splice(index,1);
      //this.allData
      this.displayList();
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
