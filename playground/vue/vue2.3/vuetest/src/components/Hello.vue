<template>
  <div>
    <input :value='value' @input='inputing' />
    <p>{{fromP2}}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: ''
    }
  },
  methods:{
    inputing(event){
      this.msg = event.target.value;
      this.$emit('inputing',this.msg);
    }
  },
  props:['value','fromP2']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
