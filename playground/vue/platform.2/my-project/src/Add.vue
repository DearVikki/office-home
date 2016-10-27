<template>
<div style="display:block;width:80%">

  <div class="ui form" style="display:block">
    <div class="field">
      <label>Grade</label>
      <input type="text" name="first-name" v-model='grade'>
    </div>
    <div class="field">
      <label>Title</label>
      <input type="text" name="first-name" v-model='title'>
    </div>
    <div class="field">
      <label>Content/Text</label>
      <textarea rows="2" v-model='text'></textarea>
    </div>
    <div class="field">
      <label>Content/Image</label>
      <div>
        <div class="ui small image" v-for="pic in pics">
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

export default {
  name: 'add',
  data(){
    return{
      pics:[],
      grade:'',
      title:'',
      text:'',
      saveAlert:false
    }
  },
  mounted(){
    console.log($(document).width())
  },
  methods:{
   upload(){
    $('input').click();
   },
   fileChange(e){
    var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var vm = this;
      for(let i=0; i<files.length; i++){
        vm.createImage(files[i]);
      }
   },
   createImage(file){
    console.log(file)
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        vm.pics.push(e.target.result);
        //console.log(vm.pics)
      }
    },
    removeImage(key){
      Vue.delete(this.pic,key);
    },
    save(){
      this.grade = this.title = this.text = '';
      this.pics = [];
      this.saveAlert = true;
      setTimeout(()=>{
        this.saveAlert = false
      },1000)
    }
  }
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