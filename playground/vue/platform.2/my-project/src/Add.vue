<template>
<div style="display:block;width:100%">
  <div class="ui form" style="display:block;max-width:95%">
     <div class="field">
      <label>Id</label>
      <input type="text" v-model='id'>
    </div>
     <div class="field">
      <label>Pid</label>
      <input type="text" v-model='pid'>
    </div>
     <div class="field">
      <label>Relation-id</label>
      <input type="text" v-model='relation_id'>
    </div>
    <div class="field">
      <label>Grade</label>
      <input type="text" v-model='grade'>
    </div>
    <div class="field">
      <label>Title</label>
      <input type="text" v-model='title'>
    </div>
    <div class="field">
      <label>File</label>
      <input type="file" ref='file' multiple="multiple" @change='fileChange($event)'>
      <div id='file_input'
      @click='$refs.file.click()'
      @drop.prevent='fileChange($event)'
      @dragover.prevent>+</div>
      <label>Selected Files:</label>
      <div v-for="(file,index) in selectedFiles"
      @mouseenter="file.cross=true"
      @mouseleave="file.cross=false">
        {{file.name}}
        <i class="remove icon" v-show="file.cross" @click=deleteFile(index)></i>
      </div>
    </div>
    <div class="field">
      <label>Content</label>
      <ueditor v-model="content" :config='editorConfig'></ueditor>
    </div>
  <div id="save">
    <transition name="fade">
       <div v-show='saveAlert' class="ui pointing below basic blue label">
        保存成功!
      </div>
    </transition>
    <button class="ui primary button" @click='save'>保存</button>
  </div>
  </div>
</template>

<script>
import Mock from 'Mockjs'
//Mock.mock(/\.json/,{'msg':'hs'})
import Ueditor from "./components/Ueditor";
export default {
  name: 'add',
  data(){
    return{
      id:'',
      pid:'',
      relation_id:'',
      grade:'',
      title:'',
      text:'',
      saveAlert:false,
      content:'',
      editorConfig:{
        toolbars: [[
                    'fullscreen', 'source', '|',
                    'bold', 'italic', 'underline', '|', 'fontsize', '|', 'kityformula', 'preview'
                ]]
      },
      selectedFiles:[],
      files:[]
    }
  },
  mounted(){
    console.log(this.$route)
  },
  methods:{
    fileChange(e){
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      for(let i=0; i<files.length; i++){
        this.selectedFiles.push({
          name:files[i].name,
          cross:false
        })
        this.files.push(files[i]);
      }
    },
    deleteFile(index){
      this.selectedFiles.splice(index,1);
      this.files.splice(index,1);
      console.log(this.files)
    },
    save(){
      this.$http.get('../knowledge/add?id='+this.id+'&pid='+this.pid+'&grade='+this.grade+
        '&title='+this.title+'&content='+this.content+'&relation_id='+this.relation_id
      ).then((response) => {
        console.log(response)
        this.id = this.pid = this.relation_id = this.grade =
        this.content = this.title = this.text = '';
        this.saveAlert = true;
        setTimeout(()=>{
          this.saveAlert = false
        },1000)
    },(response) => {
      alert('提交失败！')
    })
    }
  },
  watch: {
    content: function (val) {
      console.log(val)
    }
  },
  components:{Ueditor}
}
</script>

<style scoped>
  textarea{
    margin-bottom: 10px;
  }
  .small.image{
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .upload{
    border:1px dashed rgba(34,36,38,.15);
    border-radius:.28571429rem;
    text-align: center;
    height: 150px !important;
    cursor: pointer;
  }
  .add.icon{
    line-height: 150px !important;
  }
  #save{
    margin-left:48% !important;
  }
  button{
    display: block !important;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  input[type=file]{
    display: none;
  }
  #file_input{
    width: 200px;
    height: 100px;
    border: 2px dashed rgba(34,36,38,.15);
    font-size: 30px;
    line-height: 100px;
    text-align: center;
    border-radius: 2px;
  }
  i{
    cursor: pointer;
  }
</style>