<template>
 <div class="ui edit modal large">
 <div class="ui content">
   <div class="ui form" style="display:block">
    <div class="field">
      <label>Id</label>
      <input type="text" :value='value.id'>
    </div>
     <div class="field">
      <label>Pid</label>
      <input type="text" :value='value.pid'>
    </div>
     <div class="field">
      <label>Relation-id</label>
      <input type="text" :value='value.relation_id'>
    </div>
    <div class="field">
      <label>Grade</label>
      <input type="text" v-model='value.grade'>
    </div>
    <div class="field">
      <label>Title</label>
      <input type="text" v-model='value.title'>
    </div>
    <div class="field">
      <label>Content</label>
      <ueditor v-model="value.content" :config='editorConfig'></ueditor>
    </div>
  </div>
 </div>
  <div class="actions">
    <div class="ui black right deny button">
      关闭
    </div>
    <div class="ui blue right button" @click='save'>
      保存
    </div>
  </div>
</div>
</template>

<script>
import Ueditor from "./Ueditor";
export default {
  name: 'EditModal',
  data () {
    return {
      id:'',
      pid:'',
      relation_id:'',
      grade:'',
      title:'',
      content:'',
      editorConfig:{
        toolbars: [[
                    'fullscreen', 'source', '|',
                    'bold', 'italic', 'underline', '|', 'fontsize', '|', 'kityformula', 'preview'
                ]],
         autoHeightEnabled: true
      }
      }
    },
  mounted(){
    this.id = this.value.id;
    this.pid = this.value.pid;
    this.relation_id = this.relation_id;
    this.title = this.value.title;
    this.grade = this.value.grade;
    this.content = this.value.content;
  },
  methods:{
    save(){
       this.$http.get('../knowledge/update?id='+this.id+'&pid='+this.pid+'&grade='+this.grade+
        '&title='+this.title+'&content='+this.content+'&relation_id='+this.relation_id
      ).then(response => {
        $('.edit.modal').modal('hide');
      }).catch(err => {
        console.error(err.stack)
      });
    }
  },
  props:['value'],
  components:{Ueditor}
}
</script>
<style scoped>
 #edui33{
  width: 100% !important;
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
</style>