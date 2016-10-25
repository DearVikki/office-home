<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>{{msg}}<span @click='remove'>×</span></p>
    <hello :fromP2='des' v-model='msg' @inputing='inputing'><p>{{msg}}</p></hello>
    <router-link to='/page1'>I'm a link to page 1</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Alert1 from './assets/js/module1.js'
import Hello from './components/Hello'

export default {
  name: 'app',
  data(){
    return {
      msg: 'This is a vue test',
      des:'Try me'
    }
  },
  mounted(){
    Alert1();
  },
  methods:{
    inputing(m){
      this.msg = m;
    },
    remove(){
      this.msg = '';
    }
  },
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
span{
  background: pink;
  border-radius: 100%;
}
</style>
