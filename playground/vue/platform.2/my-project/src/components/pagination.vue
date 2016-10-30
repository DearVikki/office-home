<template>
 <div class="ui right floated pagination menu">
            <div class="icon item">
              <i class="step backward icon" @click='firstPage'></i>
            </div>
            <div class="icon item">
              <i class="left chevron icon" @click='prevPage'></i>
            </div>
            <span class="page-wrapper" v-for='page in showPage'>
              <div class="item" :class="{active:isCurrentPage(page)}" @click='clickPage(page)'>{{page}}</div>
            </span>
            <div class="icon item">
              <i class="right chevron icon" @click='nextPage'></i>
            </div>
            <div class="icon item">
              <i class="step forward icon" @click='lastPage'></i>
            </div>
          </div>
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {
      currentPage:''
    }
  },
  mounted(){
    this.currentPage = this.$route.query.page||1;
  },
  methods:{
    isCurrentPage(page){
      return page === this.currentPage;
    },
    clickPage(page){
      this.currentPage = page;
      this.$router.push({query: { page: page }})
    },
    firstPage(){
      this.clickPage(1);
    },
    lastPage(){
      this.clickPage(this.pageNum);
    },
    prevPage(){
      this.clickPage(this.currentPage-1);
    },
    nextPage(){
      this.clickPage(this.currentPage+1);
    }
  },
  computed:{
    showPage(){
      let pageArr = [];
      if(this.currentPage<=3) {
        if(this.pageNum>=5) pageArr = [1,2,3,4,5];
        else {
          for(let i = 1; i<=this.pageNum; i++){
            pageArr.push(i);
          }
        }
      }
      else if(this.currentPage >= this.pageNum - 2) {
        for(let i=this.pageNum-4; i <= this.pageNum; i++) {
          pageArr.push(i);
        }
      }
      else {
        for(let i=-2; i<=2; i++){
          pageArr.push(parseInt(this.currentPage)+i);
        }
      }
      return pageArr;
    }
  },
  watch:{
    pageNum(){
      this.currentPage = 1;
    }
  },
  props:['pageNum']
}
</script>
<style scoped>
  .page-wrapper{
    display: flex;
  }
  .page-wrapper .item:last-child:before{
   display: block !important;
  }
  .item{
    cursor: pointer;
  }
</style>