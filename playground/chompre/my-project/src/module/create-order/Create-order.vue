<template>
	<div id="createOrder_container">
		<!-- 确认收货地址 -->
		<div id="address_container">
			<div class="title">Confirmar dirección de envío
				<!-- 新增地址 -->
				<span class="fr smallBlue" @click="addAddress">Añadir nueva dirección</span>
			</div>
			<!-- 地址内容 -->
			<div class="address-item item"
			v-for="(add,index) in address.addressList"
			v-show="index < 4 || !address.fold"
			:class="{active:add.address_id === address.selected.address_id}"
			@click="address.selected = add">
				<span class="pre txt">
					<img class="vm" src="~assets/img/order/location.png">
					<span class="vm">To</span>
				</span>
				<span class="dot"></span>
				<span class="txt name" :title="add.receive_name">{{add.receive_name}}</span>
				<span class="txt" :title="add.idcard">{{add.idcard}}</span>
				<span class="txt mobile" :title="add.receive_mobile">{{add.receive_mobile}}</span>
				<span class="txt address" :title="add.receive_address+' '+add.receive_area+' '+add.receive_city">
					{{add.receive_address}} {{add.receive_area}} {{add.receive_city}}
				</span>
				<span class="txt" v-if="add.selected"> Defecto</span>
				<span class="edit fr" @click="editAddress(add)">Modificar dirección</span>
			</div>
			<!-- 收起地址 -->
			<div v-if="address.addressList.length > 4">
				<div v-show="!address.fold" class="fold" @click="address.fold = true">收起地址 <img src="~assets/img/order/Trianglered_up.png"></div>
				<div v-show="address.fold" class="fold" @click="address.fold = false">Ver más <img src="~assets/img/order/Trianglered_down.png"></div>
			</div>
			<!-- 地址弹窗 -->
			<pop :pop="address.pop" :popReset="addressPopReset">
				<addressPop :address="address.selectedForPop" @saveAddress="saveAddress"></addressPop>
			</pop>
			<!-- 缺省图 -->
			<div class="small-empty-tip" v-show="!address.addressList.length">
				<p>暂无可用地址</p>
			</div>
		</div>
		<!-- 确认发票信息 -->
		<div id="invoice_container">
			<div class="title">Confirmar la información de factura
				<!-- 新增地址 -->
				<span class="fr smallBlue" @click="addInvoice">Añadir nueva informacion de factura</span>
			</div>
			<!-- 发票内容 -->
			<div class="invoice-item item" v-for="(inv,index) in invoice.invoiceList"
			v-show="index < 4 || !invoice.fold"
			:class="{active:inv.invoice_id === invoice.selected.invoice_id}"
			@click="invoice.selected = inv">
				<span class="pre txt">
					<img class="vm" src="~assets/img/order/invoice.png">
					<span class="vm">factura</span>
				</span>
				<span class="dot"></span>
				<span class="txt name" :title="inv.company_name">{{inv.company_name}}</span>
				<span class="txt" :title="inv.company_taxid">{{inv.company_taxid}}</span>
				<span class="txt mobile" :title="inv.company_tel">{{inv.company_tel}}</span>
				<span class="txt address" :title="inv.company_address+' '+inv.company_area+' '+inv.company_city">
					{{inv.company_address}} {{inv.company_area}} {{inv.company_city}}
				</span>
				<span class="txt" :title="inv.company_scope">{{inv.company_scope}}</span>
				<span class="txt" v-if="inv.is_default"> Defecto</span>
				<span class="edit fr" @click="editInvoice(inv)">Modificar la información de factura</span>
			</div>
			<!-- 收起发票 -->
			<div v-if="invoice.invoiceList.length > 4">
				<div v-show="!invoice.fold" class="fold" @click="invoice.fold = true">收起发票 <img src="~assets/img/order/Trianglegreen_up.png"></div>
				<div v-show="invoice.fold" class="fold" @click="invoice.fold = false">Ver más <img src="~assets/img/order/Trianglegreen_down.png"></div>
			</div>
			<!-- 发票弹窗 -->
			<pop :pop="invoice.pop" :popReset="invoicePopReset">
				<invoicePop :invoice="invoice.selectedForPop" @saveInvoice="saveInvoice"></invoicePop>
			</pop>
			<!-- 缺省图 -->
			<div class="small-empty-tip" v-show="!invoice.invoiceList.length">
				<p>暂无可用发票</p>
			</div>
		</div>
		<!-- 选择托运公司 -->
		<div id="delivery_container">
			<div class="title">Seleccionar transporte</div>
			<div id="select_delivery">
				<simpleDropdown :sDropdown="delivery.dropdown"></simpleDropdown>
			</div>
		</div>
		<!-- 订单确认 -->
		<div id="order_container">
			<div class="title">Confirmar los datos de pedido</div>
			<div id="order_header">
				<div class="header-item"
				v-for="h in order.headers"
				:style="h.style">
					{{h.name}}
					<span class="border"></span>
				</div>
			</div>
			<a id="order_dealer">{{order.dealer_info.dealer_name}}</a>
			<div id="order_goods">
				<div class="goods-item" v-for="goods in order.goods_info">
					<img :src="goods.cover_pic">
					<div class="goods-title">{{goods.goods_name}}</div>
					<div class="goods-detail">
						<p v-for="d in goods.description">{{d}}</p>
					</div>
					<div class="goods-price">${{goods.price}}</div>
					<div class="goods-num">{{goods.goods_num}}</div>
					<div class="goods-price-all">${{goods.price*goods.goods_num}}</div>
				</div>
			</div>
			<div id="order_address">
				<img src="~assets/img/order/location.png">
				<span v-if="address.selected">
					<span class="txt" :title="address.selected.receive_name">{{address.selected.receive_name}}</span>
					<span class="txt" :title="address.selected.idcard">{{address.selected.idcard}}</span>
					<span class="txt" :title="address.selected.receive_mobile">{{address.selected.receive_mobile}}</span>
					<span class="txt" :title="address.selected.receive_address+' '+address.selected.receive_area+' '+address.selected.receive_city">
						{{address.selected.receive_address}} {{address.selected.receive_area}} {{address.selected.receive_city}}
					</span>
				</span>
			</div>
			<div id="order_invoice">
				<img src="~assets/img/order/invoice.png">
				<span v-if="invoice.selected">
					<span class="txt name" :title="invoice.selected.company_name">{{invoice.selected.company_name}}</span>
					<span class="txt" :title="invoice.selected.company_taxid">{{invoice.selected.company_taxid}}</span>
					<span class="txt mobile" :title="invoice.selected.company_tel">{{invoice.selected.company_tel}}</span>
					<span class="txt address" :title="invoice.selected.company_address+' '+invoice.selected.company_area+' '+invoice.selected.company_city">
						{{invoice.selected.company_address}} {{invoice.selected.company_area}} {{invoice.selected.company_city}}
					</span>
				</span>
			</div>
			<div id="order_delivery" v-show="delivery.dropdown.selectedValue">
				<img src="~assets/img/order/delivery.png">
				<span class="txt">{{delivery.dropdown.title}}</span>
			</div>
		</div>
		<!-- 店铺合计 -->
		<div id="conclu_container">
			<div id="conclu_inner">
				<div id="conclu_price">
					Total:
					<span>${{conclu.sumprice}}</span>
				</div>
				<!-- <div id="conclu_delivery"  v-show="delivery.dropdown.selectedValue">{{delivery.dropdown.title}}</div> -->
			</div>
			<p class="clear"></p>
			<div id="conclu_pay_container">
				<div id="conclu_pay"  @click="pay">ir a pagar</div>
				<div id="conclu_tip">{{conclu.tip}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import pop from '../../components/Pop.vue';
	import addressPop from '../../components/Address.vue';
	import invoicePop from '../../components/Invoice.vue';
	import simpleDropdown from '../../components/SimpleDropdown.vue';
	import { myAlert } from '../../assets/js/utils.js'
	import '../../assets/lib/order-item.less'
	export default{
		name:'createorder',
		data(){
			return{
				sendCode:{
					send:function(before){
						before();
						console.log('sendla!');
					},
					before:function() {
						console.log(this.txt)
					},
					style:{
						fontSize:'12px'
					}
				},
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
					selected:{},
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
					selected:{},
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
						title:'seleccionar transporte',
						options:[{
							name:'顺丰快递',
							value:1
						}],
						optionClass:'orderClass',
						headerClass:'orderClass'
					}
				},
				order:{
					headers:[{
						// 店铺宝贝
						name:'Nombre de producto',
						style:'width:38%'
					},{
						// 商品属性
						name:'Información de producto ',
						style:'width:16%'
					},{
						// 单价(比索)
						name:'Precio unidario (CLP)',
						style:'width:13%'
					},{
						// 数量
						name:'Cantidad',
						style:'width:13%'
					},{
						// 小计
						name:'Total parcial',
						style:'width:20%'
					}],
					dealer_info:{
						dealer_id:'',
						dealer_name:''
					},
					goods_info:[{
						goods_id: 0,
					    goods_num: 0,
					    pre_goods_id: 0,
					    description: [],
					    goods_name: '',
					    cover_pic: '',
					    price: 100
					}]
				},
				conclu:{
					sumprice:0,
					tip:''
				}
			}
		},
		mounted(){
			let requestData,
				goodsIdOrder = localStorage.getItem('goodsIdOrder'),
				buyDirectly = localStorage.getItem('buyDirectly');
			// 检测是否有可供结算商品
			if(!goodsIdOrder) {
				if(buyDirectly) {
					buyDirectly = JSON.parse(buyDirectly);
					requestData = buyDirectly;
				}
				else location.replace('./cart.html');
			} else requestData = {
				name: 'zl.shopping.sys.settle.account',
				goods_id: localStorage.getItem('goodsIdOrder')
			}
			// 拉取要结算商品信息
			this.$http.post('', requestData).then((response)=>{
				// 此时商品还留在购物车中
				let shipping_info = response.body.data.shipping_info;
				let dealer_info = response.body.data.dealer_info;
				let goods_info = response.body.data.goods_info;
				// 运费部分
				let delivery=[];
				shipping_info.forEach((s)=>{
					delivery.push({
						name: s.shipping_name,
						value: s.shipping_id
					})
				})
				this.delivery.dropdown.options = delivery;
				// 店铺部分
				this.order.dealer_info = dealer_info;
				// 商品部分
				goods_info.forEach((g)=>{
					g.description = g.description.split(' ').filter((d)=>{return d});
				})
				this.order.goods_info = goods_info;
				// 总价格
				this.conclu.sumprice = response.body.data.sum_price;
			})
			// 拉取地址
			this.$http.post('',{
				name:'zl.shopping.sys.address.list'
			}).then((response)=>{
				let add  = [], hasDefault = false;
				response.body.data.list.forEach((e) => {
					if(e.selected === 1) {
						// 默认地址保持第一条
						add.unshift(e);
						this.address.selected = e;
						hasDefault = true;
					}
					else add.push(e);
				})
				// 无默认地址情况下
				if(!hasDefault) this.address.selected = add[0];
				this.address.addressList = add;
				console.log(this.address.addressList)
			})
			// 拉取发票
			this.$http.post('',{
				name:'zl.shopping.sys.invoice.list'
			}).then((response)=>{
				let inv = [], hasDefault = false;
				response.body.data.forEach((e) => {
					if(e.is_default === 1) {
						inv.unshift(e);
						this.invoice.selected = e;
						hasDefault = true;
					}
					else inv.push(e);
				})
				if(!hasDefault) this.invoice.selected = inv[0];
				this.invoice.invoiceList = inv;
			})
		},
		methods:{
			addressPopReset(){
				this.address.selectedForPop = {};
			},
			invoicePopReset(){
				this.invoice.selectedForPop = {};
			},
			// 点击新增地址
			addAddress(){
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
							this.$forceUpdate();
						}
					})
				}
			},
			// 点击新增发票
			addInvoice(invoice, type){
				this.invoice.pop.show = true;
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
						}
					})
				}
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
			},
			// 支付前检测
			checkBeforePay(){
				if(!this.address.selected) {
					this.conclu.tip = '请选择收货地址';
					return false;
				}
				if(!this.invoice.selected) {
					this.conclu.tip = '请选择发票';
					return false;
				}
				if(!this.delivery.dropdown.selectedValue) {
					this.conclu.tip = '请选择托运公司';
					return false;
				}
				return true;
			},
			// 支付
			pay(){
				if(!this.checkBeforePay()) return;
				let goods_id = [];
				this.order.goods_info.forEach((g)=>{
					goods_id.push(g.goods_id);
				})
				this.$http.post('',{
					name:'zl.shopping.sys.submit.order',
					address_id: this.address.selected.address_id,
					invoice_id: this.invoice.selected.invoice_id,
					shipping_id: this.delivery.dropdown.selectedValue,
					dealer_id: this.order.dealer_info.dealer_id,
					goods_id: goods_id.toString(),
					goods_num: ''
				}).then((response)=>{
					if(response.body.code === 1000) {
						localStorage.setItem('goodsIdOrder','');
						localStorage.setItem('buyDirectly', '');
						console.log('提交订单成功!')
						myAlert('提交订单成功！',() => {
							location.replace('./order.html');
						});
					}
				})
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
			font-weight: bold;
			span{
				float:right;
				margin-top: 5px;
				cursor: pointer;
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
		z-index: 10;
		#select_delivery{
			width: 560px;
			height: 36px;
			position: relative;
		}
	}
	/*#order部分已移入order-item.less了*/
	#order_container{
		margin-top: 50px;
		.title{
			border-bottom: none;
		}
	}
	#conclu_container{
		overflow:hidden;
		margin-top:40px;
		margin-bottom:130px;
		#conclu_inner{
			float:right;
			padding:15px 20px;
		}
		#conclu_price{
			font-size:20px;
			color:#5c5c5c;
			text-align:right;
			font-weight:bold;
			span{
				font-size:30px;
				color:#d0021b;
			}
		}
		#conclu_delivery{
			height:20px;
			line-height:20px;
			background:#fff0f2;
			border-radius:4px;
			font-size:12px;
			color:#d42b1e;
			text-align:center;
			padding:0 8px;
			display: inline-block;
			float: right;
			margin-top: 10px;

		}
		#conclu_pay_container{
			width:224px;
			float: right;
		}
		#conclu_pay{
			background:#d42b1e;
			width:224px;
			height:50px;
			line-height:50px;
			font-size:24px;
			color:#ffffff;
			text-align:center;
			cursor:pointer;
		}
		#conclu_tip{
			font-size:12px;
			color:#d42b1e;
			text-align: center;
			margin-top: 7px;
		}
	}
</style>