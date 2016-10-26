<template>
  <div>
    <mainHeader></mainHeader>
    <div id="content_container">
      <!--banner板块开始-->
      <div class="banner-container swiper-container">
          <div class="swiper-wrapper" v-for="bannerItem in bannerItems">
              <a class="banner swiper-slide" href="">
                <img v-bind:src="bannerItem.path"/>
              </a>
          </div>
          <div class="banner swiper-pagination">
          </div>
      </div>
   </div>
  </div>
</template>

<script>
import MainHeader from './components/mainHeader'
import Swiper from './assets/lib/swiper.js'

export default {
  name: 'index',
  data(){
    return {
      bannerItems:[]
    }
  },
  mounted(){
    this.$http.post('',{name:'shopping.sys.homepage.info'}).then((response)=>{
      console.log(response.body.data)
      var data = response.body.data;
      this.bannerItems = data.banner_homepage;
      this.$nextTick(()=>{
          new Swiper('.swiper-container',{
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          paginationClickable: true,
          loop:true
        })
      })
    })
  },
  components: {
    MainHeader
  }
}
</script>

<style scoped lang='less'>
@import './assets/lib/swiper.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.banner-container {
        width: 100%;
        height: 3.173rem;
        margin-top: 1.173rem;
        .banner img {
            width: 100%;
            height: 100%;
        }
    }
</style>
