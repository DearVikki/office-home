<template>
	<a class='banner common-goods-item'>
	    <img :src="item.cover_pic"/>
	    <p>{{item.description}}</p>
	    <p>${{item.price}}</p>
	</a>
</template>
<script>
	export default{
		name:'goodsitem',
		data(){
			return{

			}
		},
		props:['item']
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	.common-goods-item {
    margin-top: 20px;
    width: 220px;
    display: inline-block;
    img {
        width: 100%;
    }
    p {
        font-size: 12px;
        color: @bla;
        margin-top: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    p:last-child {
        font-size: 14px;
        color: @baseColor;
        margin-top: 10px;
    }
}
</style>