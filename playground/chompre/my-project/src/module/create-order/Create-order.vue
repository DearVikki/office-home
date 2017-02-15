<template>
	<div id="createOrder_container">
		<!-- 确认收货地址 -->
		<div id="address_container">
			<div class="title">确认收货地址<span class="fr smallBlue">Añadir nueva dirección</span></div>
			<!-- 地址内容 -->
			<div class="address-item" v-for="(add,index) in address.addressList"
			v-show="index<4 || !address.fold"
			:class="{active:add.address_id === address.selected}"
			@click="address.selected=add.address_id">
				<span class="pre txt">
					<img class="vm" src="~assets/img/order/location.png">
					<span class="vm">寄送至</span>
				</span>
				<span class="dot"></span>
				<span class="txt">{{add.receive_name}}</span>
				<span class="txt">{{add.idcard}}</span>
				<span class="txt">{{add.receive_city}}</span>
				<span class="txt" v-if="add.receive_area">{{add.receive_area}}</span>
				<span class="txt">{{add.receive_address}}</span>
				<span class="txt">{{add.receive_mobile}}</span>
				<span class="txt" v-if="add.selected"> Defecto</span>
				<span class="editAdd fr">Modificar dirección</span>
			</div>
			<!-- 收起地址 -->
			<div v-show="!address.fold" class="fold" @click="address.fold = true">收起地址 <img src="~assets/img/order/Trianglered_up.png"></div>
			<div v-show="address.fold" class="fold" @click="address.fold = false">展开地址 <img src="~assets/img/order/Trianglered_down.png"></div>
			<!-- 地址弹窗 -->
			<pop :pop="address.pop">
				<addressPop @saveAddress="saveAddress"></addressPop>
			</pop>
		</div>
	</div>
</template>
<script>
	import pop from '../../components/Pop.vue';
	import addressPop from '../../components/Address.vue';
	export default{
		name:'createorder',
		data(){
			return{
				address:{
					addressList:[],
					selected:0,
					fold:true,
					pop:{
						show:true,
						style:{
							width:'788px',
							height:'700px',
							padding:'50px 80px'
						}
					}
				}
			}
		},
		mounted(){
			// 拉取要结算商品信息
			this.$http.post('',{
				name: 'zl.shopping.sys.settle.account',
				goods_id: localStorage.getItem('goodsIdOrder')
			}).then((response)=>{
				// 此时商品还留在购物车中
			})
			// 拉取地址
			this.$http.post('',{
				name:'zl.shopping.sys.address.list'
			}).then((response)=>{
				let add  = [];
				response.body.data.list.forEach((e) => {
					if(e.selected === 1) {
						add.unshift(e);
						this.address.selected = e.address_id;
					}
					else add.push(e);
				})
				this.address.addressList = add;
			})
		},
		methods:{
			saveAddress(address, type){
				this.address.pop = false;
				// 新增
				if(!type) {
					this.address.addressList.unshift(address);
				} else {
					this.address
				}
				
			}
		},
		components:{pop,addressPop}
	}
</script>
<style scoped lang='less'>
	/*蓝色小字*/
	.smallBlue{
		font-size:12px;
		color:#437cd9;
	}
	/*灰色小字*/
	.smallGrey{
		font-size:12px;
		color:#5c5c5c;
	}
	/*收起/展开*/
	.fold{
		font-size:12px;
		margin-left: 105px;
		margin-top: 5px;
		cursor: pointer;
	}
	#createOrder_container{
		margin:20px auto;
		max-width: 1200px;
		width: 100%;
		min-width: 1000px;
		.title{
			font-size:20px;
			color:#5c5c5c;
			border-bottom: 2px solid #cbcbcb;
			height: 35px;
			line-height: 35px;
			margin-bottom: 14px;
			span{
				float:right;
				margin-top: 5px;
			}
		}
	}
	#address_container{
		/*地址列表*/
		.address-item{
			height: 35px;
			line-height: 32px;
			cursor: pointer;
			padding: 0 12px;
			/*红色的空心点实心点感觉可以放commonstyle里面阿*/
			.dot{
				width: 12px;
				height: 12px;
				border-radius: 100%;
				border: 1px solid #cbcbcb;
				display: inline-block;
				vertical-align: middle;
				margin-right: 5px;
				position: relative;
			}
			.txt{
				.smallGrey;
				vertical-align: middle;
				margin-right: 7px;
			}
			.pre{
				display: inline-block;
				width: 70px;
				color: #d42b1e !important;
				opacity: 0;
			}
			.editAdd{
				.smallBlue;
				opacity: 0;
			}
			&.active{
				background:#fff0f2;
				border:2px solid #d42b1e;
				box-shadow:4px 4px 0px 0px #e7e7e7;
				.dot{
					background: #d42b1e;
				}
				.dot:after{
					content: '';
					width: 4px;
					height: 4px;
					border-radius: 100%;
					background: #fff;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate3d(-50%, -50%, 0);
				}
				.txt{
					font-weight: bold;
					font-size:14px;
					color:#5c5c5c;
				}
				.pre{
					opacity: 1;
				}
				.editAdd{
					opacity: 1;
				}
			}
			&:hover{
				background:#fff0f2;
			}
		}
		.fold{
			color:#d42b1e;
		}
	}
</style>