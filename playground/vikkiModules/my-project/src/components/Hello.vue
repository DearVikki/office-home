<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span class="to-do-num">{{msgfromfather}}</span>
    <button @click="notify" @child-msg="handleIt">Tell Father</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'This is a to-do list!',
      msg2: 'Childs voice'
    }
  },
  props: ['msgfromfather'],
  methods: {
    notify: function(){
      //this.$dispatch('child-msg',this.msg2);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
h1{
  display: inline-block;
}
button{
  display: inline-block;
}
.to-do-num{
    border-radius: 100%;
    background: #42b983;
    color: #fff;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px
}
</style>
