<template>
  <ueditor v-model="content"></ueditor>
</template>

<script>
  import Ueditor from "./components/Ueditor";
    export default{
        data() {
          return {
            content: "mua!~"
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