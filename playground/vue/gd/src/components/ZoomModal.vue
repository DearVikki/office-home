<template>
 <div class="ui zoom modal">
  <div class="header">
    <p>{{activeList.title}}（{{activeList.grade}}）</p>
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
  name: 'ZoomModal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:['activeList']
}
</script>