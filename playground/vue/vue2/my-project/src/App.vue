<template>
 <h1>姓名：{{name}}</h1>
 <h2>{{age}}</h2>
</template>

<script>
//import Hello from './components/Hello'
//import firstComponent from './components/firstComponent'

/*export default {
  name: 'app',
  components: {
    Hello,firstComponent
  }
}*/
export default {
  el:'#app',
  data:function () {
    return {
      name:'what',
      age:'question face'
    }
  }
}
</script>

<style lang="less">
$qwe:#098;
    body{
        background-color: $qwe;
        h1{
            background-color: #eee;
            color: red;
            transform: translate(10%, 10%);/*测试自动添加前缀*/
        }
        h1:hover{
            height:100px;
        }
        h2{
            background-color: #999;
        }
    }
</style>
