<template>
	<div class="nav-wrapper">
		<div class="nav"
		v-for="(nav,i) in navs"
		:class="{active:nav.active}"
		@click="clickNav(i)">{{nav.name}}</div>
	</div>
</template>
<script>
	export default{
		name:'nav',
		mounted(){
			let wid = Math.floor(100/this.navs.length);
			Array.prototype.slice.call(document.querySelectorAll('.nav-wrapper .nav')).forEach((e)=>{
				e.style.width = wid+'%';
			})
		},
		methods:{
			clickNav(i){
				this.navs.forEach((e)=>{
					e.active = false;
				})
				this.navs[i].active = true;
				this.$emit('clickNav',i);
			}
		},

		props:['navs']
	}
</script>
<style scoped lang='less'>
	@baseColor:#8995ff;
	.nav-wrapper{
		width: 100%;
		display: flex;
		justify-content: space-between;
		background: #fff;
		margin-bottom: .2rem;
		.nav{
			height: 1.30rem;
			line-height: 1.30rem;
			font-size: .42rem;
			color:#222;
			text-align: center;
			 &.active{
		        color:@baseColor;
		        border-bottom: .08rem solid @baseColor;
		    }
		}
	}
</style>