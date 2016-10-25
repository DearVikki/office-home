<template>
  <div>
    <firstHeader></firstHeader>
    <div id="content_container">
      <!--banner板块开始-->
      <div class="banner-container swiper-container">
          <div class="swiper-wrapper" v-for="bannerItem in bannerItems">
              <a class="banner swiper-slide" href="">
                <img src="bannerItem.img"/>
              </a>
          </div>
          <div class="banner swiper-pagination">
          </div>
      </div>
   </div>
  </div>
</template>

<script>
import firstHeader from './components/firstHeader'

export default {
  name: 'index',
  data(){
    return {
      bannerItems:[]
    }
  },
  mounted(){
    this.$http.post('',{name:'shopping.sys.homepage.info'}).then((response)=>{
      console.log(response)
    })
  },
  components: {
    firstHeader
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
</style>
