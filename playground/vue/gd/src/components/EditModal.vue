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
      <label>Content/Text</label>
      <textarea rows="2" :value='value.content.text' @input='setContentText'></textarea>
    </div>
    <div class="field">
      <label>Content/Image</label>
      <div>
        <div class="ui small image"  v-for="pic in value.content.pics">
          <a class="ui right corner label">
            <i class="close icon" @click='removeImage($key)'></i>
          </a>
          <img :src="pic">
        </div>
        <div class="ui small image upload" @click='upload' @drop.prevent='fileChange($event)' @dragover.prevent>
           <i class="add icon big grey"></i>
        </div>
      </div>
      <input type="file" multiple="multiple" style="display:none" accept="image/*" @change='fileChange($event)'>
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
export default {
  name: 'EditModal',
  data () {
    return {
      grade:'',
      title:'',
      content:{
        text:'',
        pics:[]
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
      this.content.text = event.target.value;
    },
     upload(){
      $('input').click();
     },
     fileChange(e){
      console.log('fileChange!')
      var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        var vm = this;
        for(let i=0; i<files.length; i++){
          vm.createImage(files[i]);
        }
     },
     createImage(file){
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          vm.value.content.pics.push(e.target.result);
          //console.log(vm.pics)
        }
      },
      removeImage(key){
        Vue.delete(this.pic,key);
      }
  },
  props:['value']
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
</style>