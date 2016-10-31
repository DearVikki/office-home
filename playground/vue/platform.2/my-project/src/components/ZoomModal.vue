<template>
 <div class="ui zoom modal">
  <div class="header">
    <p>{{activeList.title}}（{{activeList.grade}}）</p>
  </div>
  <div class="content">
      <div class="description" v-html="activeList.content"></div>
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