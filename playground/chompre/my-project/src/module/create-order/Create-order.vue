<template>
	<div id="createOrder_container">
		<!-- 确认收货地址 -->
		<div id="address_container">
			<div class="title">确认收货地址
				<!-- 新增地址 -->
				<span class="fr smallBlue" @click="addAddress">Añadir nueva dirección</span>
			</div>
			<!-- 地址内容 -->
			<div class="address-item item" v-for="(add,index) in address.addressList"
			v-show="index < 4 || !address.fold"
			:class="{active:add.address_id === address.selected.address_id}"
			@click="address.selected = add">
				<span class="pre txt">
					<img class="vm" src="~assets/img/order/location.png">
					<span class="vm">寄送至</span>
				</span>
				<span class="dot"></span>
				<span class="txt name" :title="add.receive_name">{{add.receive_name}}</span>
				<span class="txt" :title="add.idcard">{{add.idcard}}</span>
				<span class="txt address" :title="add.receive_city+' '+add.receive_area+' '+add.receive_address">
					{{add.receive_city}} {{add.receive_area}} {{add.receive_address}}
				</span>
				<span class="txt mobile" :title="add.receive_mobile">{{add.receive_mobile}}</span>
				<span class="txt" v-if="add.selected"> Defecto</span>
				<span class="edit fr" @click="editAddress(add)">Modificar dirección</span>
			</div>
			<!-- 收起地址 -->
			<div v-if="address.addressList.length > 4">
				<div v-show="!address.fold" class="fold" @click="address.fold = true">收起地址 <img src="~assets/img/order/Trianglered_up.png"></div>
				<div v-show="address.fold" class="fold" @click="address.fold = false">展开地址 <img src="~assets/img/order/Trianglered_down.png"></div>
			</div>
			<!-- 地址弹窗 -->
			<pop :pop="address.pop" :popReset="address.popReset">
				<addressPop :address="address.selectedForPop" @saveAddress="saveAddress"></addressPop>
			</pop>
		</div>
		<!-- 确认发票信息 -->
		<div id="invoice_container">
			<div class="title">确认发票信息
				<!-- 新增地址 -->
				<span class="fr smallBlue" @click="addInvoice">新增发票</span>
			</div>
			<!-- 发票内容 -->
			<div class="invoice-item item" v-for="(inv,index) in invoice.invoiceList"
			v-show="index < 4 || !invoice.fold"
			:class="{active:inv.invoice_id === invoice.selected.invoice_id}"
			@click="invoice.selected = inv">
				<span class="pre txt">
					<img class="vm" src="~assets/img/order/invoice.png">
					<span class="vm">小发票</span>
				</span>
				<span class="dot"></span>
				<span class="txt name" :title="inv.receive_name">{{inv.company_name}}</span>
				<span class="txt" :title="inv.idcard">{{inv.company_taxid}}</span>
				<span class="txt address" :title="inv.company_city+' '+inv.company_area+' '+inv.company_address">
					{{inv.company_city}} {{inv.company_area}} {{inv.company_address}}
				</span>
				<span class="txt" :title="inv.company_scope">{{inv.company_scope}}</span>
				<span class="txt mobile" :title="inv.company_tel">{{inv.company_tel}}</span>
				<span class="txt" v-if="inv.is_default"> Defecto</span>
				<span class="edit fr" @click="editInvoice(inv)">修改发票</span>
			</div>
			<!-- 收起地址 -->
			<div v-if="invoice.invoiceList.length > 4">
				<div v-show="!invoice.fold" class="fold" @click="invoice.fold = true">收起发票 <img src="~assets/img/order/Trianglegreen_up.png"></div>
				<div v-show="invoice.fold" class="fold" @click="invoice.fold = false">展开发票 <img src="~assets/img/order/Trianglegreen_down.png"></div>
			</div>
			<!-- 地址弹窗 -->
			<pop :pop="invoice.pop" :popReset="invoice.popReset">
				<invoicePop :invoice="invoice.selectedForPop" @saveInvoice="saveInvoice"></invoicePop>
			</pop>
		</div>
		<!-- 选择托运公司 -->
		<div id="delivery_container">
			<div class="title">选择托运公司</div>
			<div id="select_delivery">
				<simpleDropdown :sDropdown="delivery.dropdown"></simpleDropdown>
			</div>
		</div>
		<!-- 订单确认 -->
		<div id="order_container"></div>
	</div>
</template>
<script>
	import pop from '../../components/Pop.vue';
	import addressPop from '../../components/Address.vue';
	import invoicePop from '../../components/Invoice.vue';
	import simpleDropdown from '../../components/SimpleDropdown.vue';
	export default{
		name:'createorder',
		data(){
			return{
				address:{
					addressList:[{
						receive_name:'',
						idcard:'',
						receive_city:'',
						receive_area:'',
						receive_address:'',
						receive_mobile:'',
						selected:''
					}],
					// 当前选中的地址。本来只有这一个的，可是新增地址传给addressPop时不就相当于selected = ''了!所以要新增selectedForPop
					selected:'',
					selectedForPop:'',
					fold:true,
					pop:{
						show:false,
						style:{
							width:'788px',
							height:'700px',
							padding:'50px 80px'
						}
					},
					popReset(){
						// 所以这里在pop.vue里调用，就只能取到pop.vue的上下文。怎样才能取到这里vue的上下文呢
						// this.address.selectedForPop = {};
					}
				},
				invoice:{
					invoiceList:[{
						invoice_id:'',
						company_name:'',
						company_city:'',
						company_area:'',
						company_address:'',
						company_tel:'',
						company_taxid:'',
						business_scope:'',
						is_default:''
					}],
					// 当前选中的地址。本来只有这一个的，可是新增地址传给addressPop时不就相当于selected = ''了!所以要新增selectedForPop
					selected:'',
					selectedForPop:'',
					fold:true,
					pop:{
						show:false,
						style:{
							width:'788px',
							height:'700px',
							padding:'50px 80px'
						}
					}
				},
				delivery:{
					dropdown:{
						type:1,
						title:'请选择托运公司',
						options:[{
							name:'顺丰快递',
							value:1
						}],
						optionClass:'orderClass',
						headerClass:'orderClass'
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
				let shipping_info = response.body.data.shipping_info;
				let delivery=[];
				shipping_info.forEach((s)=>{
					delivery.push({
						name: s.shipping_name,
						value: s.shipping_id
					})
				})
				this.delivery.dropdown.options = delivery;
			})
			// 拉取地址
			this.$http.post('',{
				name:'zl.shopping.sys.address.list'
			}).then((response)=>{
				let add  = [];
				response.body.data.list.forEach((e) => {
					if(e.selected === 1) {
						add.unshift(e);
						this.address.selected = e;
					}
					else add.push(e);
				})
				this.address.addressList = add;
			})
			// 拉取发票
			this.$http.post('',{
				name:'zl.shopping.sys.invoice.list'
			}).then((response)=>{
				let inv = [];
				response.body.data.forEach((e) => {
					if(e.is_default === 1) {
						inv.unshift(e);
						this.invoice.selected = e;
					}
					else inv.push(e);
				})
				this.invoice.invoiceList = inv;
			})
		},
		methods:{
			// 点击新增地址
			addAddress(){
				this.address.selectedForPop = {};
				this.address.pop.show = true;
			},
			// 点击编辑地址
			editAddress(address){
				this.address.selected = address;
				this.address.selectedForPop = address;
				this.address.pop.show = true;
			},
			saveAddress(address, type){
				this.address.pop.show = false;
				// 新增
				if(!type) {
					this.address.addressList.unshift(address);
					this.address.selected = address;
				}
				// 编辑
				else {
					this.address.addressList.forEach((a)=>{
						if(a.address_id === address.address_id) {
							// 不能直接a = address阿 得分别赋值阿!~咦为什么分别赋值也不行了…
							a = {
								receive_name: address.receive_name,
								idcard: address.idcard,
								receive_city: address.receive_city,
								receive_area: address.receive_area,
								receive_address: address.receive_address,
								receive_mobile: address.receive_mobile,
								selected: address.selected
							}
							a.receive_name = address.receive_name;
							console.log('新的收件人姓名已变为'+a.receive_name)
							// this.$forceUpdate();
						}
					})
				}
			},
			// 点击新增发票
			addInvoice(){
				this.invoice.selectedForPop = {};
				this.invoice.pop.show = true;
			},
			// 点击编辑发票
			editInvoice(invoice){
				this.invoice.selected = invoice;
				this.invoice.selectedForPop = invoice;
				this.invoice.pop.show = true;
			},
			saveInvoice(invoice, type){
				console.log('listen!');
				this.invoice.pop.show = false;
				// 新增
				if(!type) {
					this.invoice.invoiceList.unshift(invoice);
					this.invoice.selected = invoice;
				}
				// 编辑
				else {
					this.invoice.invoiceList.forEach((a)=>{
						if(a.invoice_id === invoice.invoice_id) {
							a = invoice;
							console.log('新的公司名已变为'+a.company_name);
						}
					})
				}
			}
		},
		components:{pop,addressPop,invoicePop,simpleDropdown}
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
	/*省略号*/
	.ellipsis{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		.item{
			height: 35px;
			line-height: 32px;
			cursor: pointer;
			padding: 0 12px;
		}
		/*彩色空心点实心点感觉可以放commonstyle里面阿*/
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
			.ellipsis;
			vertical-align: middle;
			display: inline-block;
			margin-right: 7px;
		}
		.pre{
			display: inline-block;
			width: 70px;
			opacity: 0;
		}
		.edit{
			.smallBlue;
			opacity: 0;
		}
		.item.active{
			.txt{
				font-weight: bold;
				font-size:14px;
				color:#5c5c5c;
			}
			.pre{
				opacity: 1;
			}
			.edit{
				opacity: 1;
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
		}
		.item:hover{
			.edit{
				opacity: 1;
			}
		}
		/*收起/展开*/
		.fold{
			font-size:12px;
			margin-left: 105px;
			margin-top: 5px;
			cursor: pointer;
		}
	}
	#address_container{
		/*地址列表*/
		.address-item{
			.txt{
				&.name{
					max-width: 100px;
				}
				&.address{
					max-width: 580px;
				}
				&.mobile{
					max-width: 110px;
				}
			}
			.pre{
				color: #d42b1e !important;
			}
			&.active{
				background:#fff0f2;
				border:2px solid #d42b1e;
				box-shadow:4px 4px 0px 0px #e7e7e7;
				.dot{
					background: #d42b1e;
				}
			}
			/*移到条条上时*/
			&:hover{
				background:#fff0f2;
			}
		}
		.fold{
			color:#d42b1e;
		}
	}
	#invoice_container{
		margin-top: 50px;
		/*发票列表*/
		.invoice-item{
			.txt{
				&.name{
					max-width: 100px;
				}
				&.address{
					max-width: 580px;
				}
				&.mobile{
					max-width: 110px;
				}
			}
			.pre{
				color: #3db287 !important;
			}
			&.active{
				background:rgba(60,178,134,0.05);
				border:2px solid #3db287;
				box-shadow:4px 4px 0px 0px #e7e7e7;
				.dot{
					background:#3db287;
				}
			}
			/*移到条条上时*/
			&:hover{
				background:rgba(60,178,134,0.05);
			}
		}
		.fold{
			color:#3db287;
		}
	}
	#delivery_container{
		margin-top: 50px;
		#select_delivery{
			width: 560px;
			height: 36px;
		}
	}
	#order_container{
		margin-top: 150px;
	}
</style>