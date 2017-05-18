<template>
	<div id="form_container">
		<div class="item" v-for="field in fields">
			<label
			:class="{address:field.id==='address'}">{{field.title}}</label>
			<div class="input-container">
				<input v-if="field.id !== 'address'"
				val="field.val"
				:placeholder="field.placeholder"
				@focus="fieldFocus(field)"
				@blur="fieldBlur(field)"
				v-model="field.val">
				<textarea
				v-if="field.id === 'address'"
				val="field.val"
				:placeholder="field.placeholder"
				@focus="fieldFocus(field)"
				@blur="fieldBlur(field)"
				v-model="field.val"></textarea>
				<p class="tip" :class="{error:field.error}">{{field.msg}}</p>
			</div>
		</div>
		<!-- 设为默认发票 -->
		<div id="check_container">
			<label>
				<input type="checkbox" class="checkbox" :checked="isDefault"
				@change="isDefault = !isDefault">
				<span class="checkbox-input"></span>
				<span>Establecer como información de factura por defecto</span>
			</label>
		</div>
		<!-- 保存 -->
		<div class="common-save" @click="save">Guardar</div>
	</div>
</template>
<script>
	export default{
		name:'invoice',
		data(){
			return{
				// 0表示新增 1表示编辑
				type:0,
				fields:[{
					id:'name',
					title:'Nombre',
					placeholder:'请输入公司名称',
					validators:{required:{msg:'公司名称不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'taxid',
					title:'R.U.T',
					placeholder:'请输入税号',
					validators:{required:{msg:'税号不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'address',
					title:'Dirección',
					placeholder:'请输入地址',
					validators:{required:{msg:'详细地址不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'district',
					title:'Comuna',
					placeholder:'请输入地区',
					validators:{required:{msg:'地区不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'city',
					title:'Ciudad',
					placeholder:'请输入城市',
					validators:{required:{msg:'城市不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'phone',
					title:'Tel',
					placeholder:'请输入电话号码',
					validators:{
						required:{msg:'手机不能为空'},
						isNum:{msg:'手机号不合法'}
					},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'scope',
					title:'Giro',
					placeholder:'请输入经营范围',
					validators:{required:{msg:'经营范围不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				}],
				isDefault:false,
				invoiceId:''
			}
		},
		methods:{
			save(){
				if(!this.checkAll(this.fields)) return;
				let invoice = {
					company_name: this.fields[0].val,
					company_taxid: this.fields[1].val,
					company_city: this.fields[4].val,
					company_area: this.fields[3].val,
					company_address: this.fields[2].val,
					company_tel: this.fields[5].val,
					business_scope:this.fields[6].val,
					is_default: Number(this.isDefault)
				}
				// 编辑
				if(this.type) {
					invoice.name = 'zl.shopping.sys.update.invoice';
					invoice.invoice_id = this.invoiceId;
					this.$http.post('',invoice).then((response)=>{
					})
				} else {
					// 新增
					invoice.name = 'zl.shopping.sys.add.invoice';
					this.$http.post('', invoice).then((response)=>{
						invoice.invoice_id = response.body.data.invoice_id;
						if(response.body.code === 1000) console.log('已新建发票!')
					})
				}
				this.$emit('saveInvoice', invoice, this.type)
			}
		},
		watch:{
			invoice(){
				this.fields[0].val = this.invoice.company_name;
				this.fields[1].val = this.invoice.company_taxid;
				this.fields[2].val = this.invoice.company_address;
				this.fields[3].val = this.invoice.company_area;
				this.fields[4].val = this.invoice.company_city;
				this.fields[5].val = this.invoice.company_tel;
				this.fields[6].val = this.invoice.business_scope;
				this.isDefault = this.invoice.is_default;
				this.invoiceId = this.invoice.invoice_id;
				// 编辑/新增
				this.type = this.invoice ? 1 : 0;
			}
		},
		props:['invoice']
	}
</script>
<style lang='less' scoped>
	@import '../assets/lib/form.less';
</style>