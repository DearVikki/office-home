<template>
	<div id="personal_right_container">
		<h1>Gestión de las Facturas</h1>
		<h3>{{status[statusType].title}}</h3>
		<div id="invoice_container">
			<invoicePop :invoice="invoice" @saveInvoice="saveInvoice"></invoicePop>
		</div>
		<div class="table-container" v-show="Object.keys(table.tds).length">
			<personaltable
			tableWid="1000px"
			:cols="table.cols"
			:tds="table.tds"
			@editar="editar"
			@deletar="callPop"></personaltable>
		</div>
		<!-- 删除弹窗 -->
		<pop :pop="pop">
			<div id="delete_container">
				<p>{{lang.DELETE_INVOICE_POP}}?</p>
				<div class="btn-container">
					<div class="btn" @click="deletar">{{lang.CONFIRM_DELETE}}</div>
					<div class="btn reverse" @click="pop.show=false">{{lang.CLOSE}}</div>
				</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import personaltable from './Table.vue'
	import pop from '../../components/Pop.vue';
	import invoicePop from '../../components/Invoice.vue';
	import {myAlert} from '../../assets/js/utils.js';
	import lang from '../../assets/js/language.js'
	export default{
		name:'receipt',
		data(){
			return{
				//当前页面状态
				status: [{
					title:lang.ADD_INVOICE,
					type:0
				},{
					title:lang.EDIT_ADDRESS,
					type:1
				}],
				statusType:0,
				invoice:'',
			    isDefault:'',
			    invoiceId:'',
			    deleteItem:'',
			    table:{
				    cols:[{
						name:'名称',
						key:'company_name',
						width:'10%'
					},{
						name:lang.ID,
						key:'company_taxid',
						width:'10%'
					},{
						name:lang.RECEIVE_ADDRESS,
						key:'company_address',
						width:'20%'
					},{
						name:lang.RECEIVE_AREA,
						key:'company_area',
						width:'20%'
					},{
						name:lang.RECEIVE_CITY,
						key:'company_city',
						width:'15%'
					},{
						name:lang.RECEIVE_MOBILE,
						key:'company_tel',
						width:'10%'
					},{
						name:lang.INVOICE_FIELD,
						key:'business_scope',
						width:'10%'
					},{
						name:lang.ACTION,
						key:'is_default',
						width:'15%'
					}],
					tds:[],
					lang:lang
			    },
			    pop:{
			    	show:false,
			    	style:{width:'780px',height:'292px'}
			    },
			    lang: lang
			}
		},
		mounted(){
			if(!localStorage.getItem('userInfo')) location.href = './login.html';
			//拉取发票列表
			this.$http.post('',{name:'zl.shopping.sys.invoice.list'}).then((response)=>{
				this.table.tds = response.body.data;
			})
			//if编辑发票
			if(this.$route.path === '/receiptEdit') {
				this.invoice = JSON.parse(localStorage.getItem('receipt'));
				this.statusType = 1;
			}
		},
		methods:{
			// 新增
			saveInvoice(invoice, type){
				if(!type) {
					console.log(invoice)
					this.table.tds.unshift(invoice);
					myAlert(lang.ADD_SUCCESS)
				}
				else {
					this.table.tds.forEach((e) => {
						if(e.invoice_id === invoice.invoice_id) e = invoice;
						myAlert(lang.SAVE_SUCCESS);
						this.$router.push('receipt');
					})
				}
				this.invoice = {};
			},
			//编辑
			editar(td){
				localStorage.setItem('receipt',JSON.stringify(td));
				this.invoice = td;
				this.$router.push('receiptEdit');
				window.scrollTo(0,0);
			},
			callPop(item){
				this.pop.show=true;
				this.deleteItem = item;
			},
			// 删除发票
			deletar(){
				this.$http.post('',{
					name:'zl.shopping.sys.delete.invoice',
					invoice_id:this.deleteItem.invoice_id
				}).then((response)=>{
					// 删除这一条地址
					if(response.body.code === 1000) myAlert(lang.DELETE_SUCCESS);
					this.pop.show = false;
					this.table.tds.forEach((e,i) => {
						if(e.invoice_id === this.deleteItem.invoice_id) this.table.tds.splice(i,1);
					})
				})
			}
		},
		watch:{
			'$route'(){
				if(this.$route.path === '/receiptEdit') this.statusType = 1;
				else this.statusType = 0;
			}
		},
		components:{personaltable,pop,invoicePop}
	}
</script>
<style scoped lang="less">
	@baseColor: #d42b1e;
	#invoice_container{
		margin: 0 62px;
	}
	#delete_container{
		margin-top: 20px;
	}
	.btn-container{
		margin-top: 100px;
	}
	::-webkit-scrollbar {
    	height: 5px;
    	cursor: pointer;
	}
	/* 滚动槽 */
	::-webkit-scrollbar-track {
	}
	::-webkit-scrollbar-button{
		width: 5px;
		height: 5px;
		background: #cc756e;
	}
	/* 滚动条滑块 */
	::-webkit-scrollbar-thumb {
	    background: #cc756e;
	    cursor: pointer;
	}
</style>