<template>
 <div class="ui edit modal">
  <i class="close icon"></i>
  <div class="header">
    {{activeList.id}}（{{activeList.grade}}）
  </div>
  <div class="image content">
    <span class="ui medium image" v-for="pic in activeList.content.pics">
      <img :src="pic">
    </span>
    <div class="description">
      <p>{{activeList.content.text}}</p>
    </div>
  </div>
  <div class="actions">
    <div class="ui black right deny button">
      关闭
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'EditModal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:['activeList']
}
</script>