<template>
 <div class="ui edit modal large">
 <div class="ui content">
   <div class="ui form" style="display:block">
    <div class="field">
      <label>Id</label>
      <input type="text" v-model='editValue.id'>
    </div>
     <div class="field">
      <label>Pid</label>
      <input type="text" v-model='editValue.pid'>
    </div>
     <div class="field">
      <label>Relation-id</label>
      <input type="text" v-model='editValue.relation_id'>
    </div>
    <div class="field">
      <label>Grade</label>
      <input type="text" v-model='editValue.grade'>
    </div>
    <div class="field">
      <label>Title</label>
      <input type="text" v-model='editValue.title'>
    </div>
    <div class="field">
      <label>Content</label>
      <ueditor v-model="editValue.content" :config='editorConfig'></ueditor>
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
      editorConfig:{
        toolbars: [[
                    'fullscreen', 'source', '|',
                    'bold', 'italic', 'underline', '|', 'fontsize', '|', 'kityformula', 'preview'
                ]],
         autoHeightEnabled: true
      },
      editValue:{
        id:'',
        pid:'',
        relation_id:'',
        grade:'',
        title:'',
        content:''
      }
    }
  },
  methods:{
    save(){
       this.$http.get('../knowledge/update?id='+this.editValue.id+'&pid='+this.editValue.pid+'&grade='+this.editValue.grade+
        '&title='+this.editValue.title+'&content='+this.editValue.content+'&relation_id='+this.editValue.relation_id
      ).then(response => {
        $('.edit.modal').modal('hide');
        this.value.id = this.editValue.id;
        this.value.pid = this.editValue.pid;
        this.value.relation_id = this.editValue.relation_id;
        this.value.grade = this.editValue.grade;
        this.value.title = this.editValue.title;
        this.value.content = this.editValue.content;
      }).catch(err => {
        console.error(err.stack)
      });
    }
  },
  watch:{
    value(newVal){
      console.log(newVal);
      this.editValue.id = newVal.id;
      this.editValue.pid = newVal.pid;
      this.editValue.relation_id = newVal.relation_id;
      this.editValue.grade = newVal.grade;
      this.editValue.title= newVal.title;
      this.editValue.content = newVal.content;
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