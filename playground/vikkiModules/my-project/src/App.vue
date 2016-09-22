<template>
  <div id="app">
    <hello :msgfromfather="length" @child-msg="handleIt"></hello>
    <input type="text" v-model="newToDo" @keyup.enter="submit" />
    <ul>
      <li v-for="item in items" :class="{'done':item.done}" @click="toggle(item)">{{item.value}}</li>
    </ul>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Store from './storage'
export default {
   components: {Hello},
   data: function(){
    return {
      newToDo: '',
      items:Store.fetch()||[],
      length:''
    }
  },
  methods:{
    submit:function(){
      var newList = {
        value: this.newToDo,
        done:false
      }
      this.items.push(newList);
      this.newToDo = '';
      Store.set(newList);
    },
    toggle:function(item){
      //this仍是指向VueComponent
      if(item.done === false) item.done = true;
      else item.done = false;
    },
    toDoNum:function(items){
      var toDo = 0;
      if(!items) return 0;
        items.forEach(function(e){
          if(e.done === false) toDo++;
        })
        return toDo;
    },
    handleIt:function(msg){
      this.newToDo = msg;
    }
  },
  watch:{
    items:{
      handler: function(val) {
        Store.set(val);
        this.length = this.toDoNum(val);
      },
      deep: true
    }
  },
  computed:{
    length: function(){
      return this.toDoNum(this.items);
    }
  }
}
</script>

<!--这里的style加了scoped就不对了喔-->
<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app .title{
  font-size: 24px;
}
li.done{
  text-decoration: line-through;
}

</style>

<!--
如何用less?
-->
