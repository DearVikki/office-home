<template>
	<div id="personal_right_container">
		<h1>Gestión de las Facturas</h1>
		<h3>{{status.title}}</h3>
		<div class="input-group" v-for="field in fields" :class="field.class">
			<label :for="field.id">{{field.name}}</label>
			<div class="input-container"
			:class="{ active: field.error || field.focus, big:field.id === 'address'}">
					<input
					v-if="field.id !== 'address'"
					:id="field.id" type="text"
					:placeholder="field.placeholder"
					@blur="fieldBlur(field)"
					@focus="fieldFocus(field)"
					v-model="field.val">
					<textarea
					v-else
					:id="field.id" type="text"
					:placeholder="field.placeholder"
					@blur="fieldBlur(field)"
					@focus="fieldFocus(field)"
					v-model="field.val"></textarea>
				<p class="error" v-show="field.error && !field.focus">{{field.msg}}</p>
			</div>
		</div>
		<label class="check-container">
			<input type="checkbox" value="1" v-model="isDefault">
			<span class="radio-input"></span>
			<!-- 设置为默认发票 -->
			<span>Establecer como información de factura por defecto</span>
		</label>
		<div class="side-btn" @click="save">Guardar</div>
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
						<p>您确定要删除该发票吗？</p>
						<div class="btn-container">
							<div class="btn" @click="deletar">确认删除</div>
							<div class="btn reverse">关闭</div>
						</div>
					</div>
		</pop>
	</div>
</template>
<script>
	import personaltable from '../../components/Table.vue'
	import pop from '../../components/Pop.vue';
	import {myAlert} from '../../assets/js/utils.js';
	export default{
		name:'receipt',
		data(){
				return{
					//当前页面状态
					status:{
						title:'Añadir nueva informacion de factura',
						type:0
					},
					fields:{
						name: {
				            id: 'name',
				            class: 'name-field',
				            name: 'Nombre',
				            placeholder: '请输入',
				            error: false,
				            msg: '',
				            validators: { required: { msg: '名字不能为空' }},
				            val: '',
							focus: false
			          	},
			         	taxid: {
				            id: 'taxid',
				            class: 'taxid-field',
				            name: 'R.U.T',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: { required: { msg: 'R.U.T不能为空' } },
				            val: '',
							focus: false
				        },
				        address: {
				            id: 'address',
				            class: 'address-field',
				            name: 'Dirección',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: { required: { msg: 'Dirección不能为空' } },
				            val: '',
							focus: false
				        },
				        district: {
				            id: 'district',
				            class: 'district-field',
				            name: 'Comuna',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: { required: { msg: 'Comuna不能为空' } },
				            val: '',
							focus: false
				        },
				        city: {
				            id: 'city',
				            class: 'city-field',
				            name: 'Ciudad',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: { required: { msg: 'Ciudad不能为空' } },
				            val: '',
							focus: false
				        },
				        phone: {
				            id: 'phone',
				            class: 'phone-field',
				            name: 'Tel',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: {
				            	required: { msg: 'Tel不能为空' } ,
				            	isNum: { msg: 'Tel号不合法' }
				            },
				            val: '',
							focus: false
				        },
				        scope: {
				            id: 'scope',
				            class: 'scope-field',
				            name: 'Giro',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: { required: { msg: 'Giro不能为空' } },
				            val: '',
							focus: false
				        }
			    },
			    isDefault:'',
			    invoiceId:'',
			    deletarId:'',
			    table:{
				    	cols:[{
						name:'名称',
						key:'company_name',
						width:'10%'
					},{
						name:'R.U.T',
						key:'company_taxid',
						width:'10%'
					},{
						name:'Dirección',
						key:'company_address',
						width:'20%'
					},{
						name:'Comuna',
						key:'company_area',
						width:'20%'
					},{
						name:'Ciudad',
						key:'company_city',
						width:'15%'
					},{
						name:'Tel',
						key:'company_tel',
						width:'10%'
					},{
						name:'Giro',
						key:'business_scope',
						width:'10%'
					},{
						name:'操作',
						key:'is_default',
						width:'15%'
					}],
					tds:{
						13:{
							invoice_id: "13",
				            user_id: 100093,
				            company_name: "chuanxiangzhe",
				            company_taxid: "1111",
				            company_address: "zheda",
				            company_area: "zhejiang",
				            company_city: "hangzhou",
				            business_scope: "kaixin",
				            company_tel: "111111",
				            is_default: 0
						}
					}
			    },
			    pop:{
			    	show:false,
			    	style:{width:'780px',height:'292px'}
			    }
			}
		},
		mounted(){
			if(!localStorage.getItem('userInfo')) location.href = './login.html';
			//拉取发票列表
			this.$http.post('',{name:'zl.shopping.sys.invoice.list'}).then((response)=>{
				let invoiceList = response.body.data;
				console.log(invoiceList)
				invoiceList.forEach((a)=>{
					this.table.tds[a.invoice_id] = a;
					console.log(this.table.tds)
				})
			})
			//if编辑发票
			if(location.hash === '#editar') {
				let receiptInfo = JSON.parse(localStorage.getItem('receipt'));
				this.status = {title:"Editar factura", type:1};
				this.fields.name.val = receiptInfo.company_name;
				this.fields.taxid.val = receiptInfo.company_taxid;
				this.fields.address.val = receiptInfo.company_address;
				this.fields.district.val = receiptInfo.company_area;
				this.fields.city.val = receiptInfo.company_city;
				this.fields.scope.val = receiptInfo.business_scope;
				this.fields.phone.val = receiptInfo.company_tel;
				this.isDefault = receiptInfo.is_default;
				this.invoiceId = receiptInfo.invoice_id;
			}
		},
		methods:{
			//提交新发票/修改发票
			save(){
				if(!this.checkAll(this.fields)) return;
				let request = {
					company_name: this.fields.name.val,
					company_taxid: this.fields.taxid.val,
					company_address: this.fields.address.val,
					company_area: this.fields.district.val,
					company_city: this.fields.city.val,
					business_scope: this.fields.scope.val,
					company_tel: this.fields.phone.val,
					is_default: Number(this.isDefault)
				}
				if(this.status.type === 0) request.name = 'zl.shopping.sys.add.invoice';
				else {
					request.name = 'zl.shopping.sys.update.invoice',
					request.invoice_id = Number(this.invoiceId);
				}
				console.log(request)
				/*this.$http.post('',request).then((response)=>{
					if(response.body.code === 1000)
						request.invoice_id = response.body.data.new_invoice_id;
				})*/
				delete request.name;
				if(this.status.type === 0) {
					this.table.tds['100'] = request;
					this.fields.name.val = this.fields.taxid.val = this.fields.address.val = 
					this.fields.district.val = this.fields.city.val = this.fields.scope.val = 
					this.fields.phone.val = this.isDefault = '';
				} else {
					this.table.tds[request.invoice_id] = request;
				}
			},
			//编辑
			editar(td){
				localStorage.setItem('receipt',JSON.stringify(td));
				window.open("./receipt.html#editar");
			},
			callPop(id){
				this.pop.show=true;
				this.deletarId = id;
			},
			// 删除发票
			deletar(){
				this.$http.post('',{
					name:'zl.shopping.sys.delete.invoice',
					invoice_id:this.deletarId
				}).then((response)=>{
					// 删除这一条地址
					if(response.body.code === 1000) myAlert('删除成功!');
					this.pop.show = false;
					delete this.table.tds[this.deletarId];
				})
			}
		},
		components:{personaltable,pop}
	}
</script>
<style scoped lang="less">
	@baseColor: #d42b1e;
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