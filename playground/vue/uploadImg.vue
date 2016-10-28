<template>
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
</template>
<script>
export default {
  name: 'add',
  data(){
    return{
      pics:[]
    }
  },
  mounted(){
    console.log('Add Component has mounted')
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
    }
  }
}
</script>