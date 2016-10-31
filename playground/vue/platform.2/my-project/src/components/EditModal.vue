<template>
 <div class="ui edit modal large">
 <div class="ui content">
   <div class="ui form" style="display:block">
    <div class="field">
      <label>Grade</label>
      <input type="text" :value='value.grade' @input='setGrade'>
    </div>
    <div class="field">
      <label>Title</label>
      <input type="text" :value='value.title' @input='setTitle'>
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
    <div class="ui blue right button">
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
    this.title = this.value.title;
    this.grade = this.value.grade;
    this.content = this.value.content;
  },
  methods:{
    setTitle(event){
      this.value.title = event.target.value;
    },
    setGrade(){
      this.value.grade = event.target.value;
    },
    setContentText(){
      this.content = event.target.value;
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