<template>
  <div id="app">
    <p>{{msg}}</p>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'page1',
  data(){
    return {
      msg: 'This is page 1'
    }
  },
  methods:{
  }
}
</script>

<style lang='less'>
#app {
  color: skyblue;
  font-size: 24px;
  p{
    color: pink;
  }
}
</style>
