<template>
	<a class='common-goods-item' @click="clickItem">
	    <img :src="item.cover_pic"/>
	    <p>{{item.description}}</p>
	    <p>${{item.price}}</p>
        <div class="mask delete"
        v-if="hasDelete"
        @click.stop.prevent="test(item)"></div>
        <!-- <div class="mask add"
        @click="$emit('add',item)">加入购物车</div> -->
	</a>
</template>
<script>
	export default{
		name:'goodsitem',
		data(){
			return{

			}
		},
        methods:{
            clickItem(){
                location.href = './product.html?id='+this.item.pre_goods_id+'&ref='+this.entry;
            },
            test(item){
                this.$emit('delete', item);
            }
        },
		props:['item','hasDelete', 'entry']
	}
</script>
<style lang='less'>
    /*做隔离用*/
    .empty-space-filling-item{
        width: 220px;
        height: 0;
    }
</style>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	@backColor: #fff7f7;
	@bla: #5c5c5c;
	.common-goods-item {
    margin-top: 20px;
    width: 220px;
    display: inline-block;
    position: relative;
    img {
        width: 220px;
        height: 220px;
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
    .mask{
        position: absolute;
        background-color: rgba(50, 50, 50, .48);
        font-size: 12px;
        color: #fff;
        text-align: center;
        opacity: 0;
        transition: all .4s;
        &.delete{
            right: 0;
            top:0;
            width: 28px;
            height: 28px;
            background-image: url(../assets/img/product/icon_delete.png);
            background-repeat: no-repeat;
            background-position: center;
        }
        &.add{
            left: 0;
            top: 184px;
            height: 36px;
            line-height: 36px;
            width: 100%;
        }
    }
    &:hover .mask{
        opacity: 1;
    }
}
</style>