<template>
<div>
<div class="message">{{ count }}</div>
<a href="#" @click.prevent="increment">increment</a>
</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods:{
  	increment(){
  		this.count++;
  	}
  }
}
</script>

<style>
</style>