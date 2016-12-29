<template>
	<div class="basic-info-wrapper">
		<div class="item"
		v-for="info in infos2">
			<span class="key">{{info.key}}</span>
			<span class="content">{{info.content}}</span>
		</div>
	</div>
</template>
<script>
	export default{
		name:'basicInfo',
		computed:{
			infos2(){
				let info2=[]
				this.infos.forEach((e)=>{
					if(e.content) info2.push(e);
				})
				return info2;
			}
		},
		props:['infos']
	}
</script>
<style scoped lang='less'>
.item{
    width: 100%;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: .43rem;
    padding-left: .53rem;
    background: #fff;
    margin-bottom: 2px;
    .key{
        color:#858585;
    }
    .content{
        margin-left: .5rem;
    }
}
</style>