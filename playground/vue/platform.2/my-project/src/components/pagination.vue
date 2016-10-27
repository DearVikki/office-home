<template>
 <div class="ui right floated pagination menu">
            <div class="icon item">
              <i class="left chevron icon"></i>
            </div>
            <div class="item active">1</div>
            <div class="disabled item">
              ...
            </div>
            <div class="item">6</div>
            <div class="item">7</div>
            <div class="item">8</div>
            <div class="icon item">
              <i class="right chevron icon"></i>
            </div>
          </div>
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>