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
				<span>{{lang.SET_DEFAULT_INVOICE}}</span>
			</label>
		</div>
		<!-- 保存 -->
		<div class="common-save" @click="save">{{lang.SAVE}}</div>
	</div>
</template>
<script>
	import lang from '../assets/js/language.js'
	export default{
		name:'invoice',
		data(){
			return{
				// 0表示新增 1表示编辑
				type:0,
				fields:[{
					id:'name',
					title:lang.INVOICE_NAME,
					placeholder:lang.FILL_IN_INVOICE_NAME,
					validators:{required:{msg:lang.NO_EMPTY_INVOICE_NAME}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'taxid',
					title:lang.INVOICE_ID,
					placeholder:lang.FILL_IN_INVOICE_ID,
					validators:{required:{msg:lang.NO_EMPTY_INVOICE_NAME}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'address',
					title:lang.RECEIVE_ADDRESS,
					placeholder:lang.FILL_IN_RECEIVE_ADDRESS,
					validators:{required:{msg:lang.NO_EMPTY_RECEIVE_ADDRESS}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'district',
					title:lang.RECEIVE_AREA,
					placeholder:lang.FILL_IN_RECEIVE_AREA,
					validators:{required:{msg:lang.NO_EMPTY_RECEIVE_AREA}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'city',
					title:lang.RECEIVE_CITY,
					placeholder:lang.FILL_IN_RECEIVE_CITY,
					validators:{required:{msg:lang.NO_EMPTY_RECEIVE_CITY}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'phone',
					title:lang.RECEIVE_MOBILE,
					placeholder:lang.FILL_IN_RECEIVE_MOBILE,
					validators:{
						required:{msg:lang.NO_EMPTY_RECEIVE_MOBILE},
						isNum:{msg:lang.INVALID_RECEIVE_MOBILE}
					},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'scope',
					title:lang.INVOICE_FIELD,
					placeholder:lang.FILL_IN_INVOICE_FIELD,
					validators:{required:{msg:lang.NO_EMPTY_INVOICE_FIELD}},
					error:false,
					focus:false,
					msg:'',
					val:''
				}],
				isDefault:false,
				invoiceId:'',
				lang:lang
			}
		},
		methods:{
			initialInvoice(){
				this.fields[0].val = this.invoice.company_name;
				this.fields[1].val = this.invoice.company_taxid;
				this.fields[2].val = this.invoice.company_address;
				this.fields[3].val = this.invoice.company_area;
				this.fields[4].val = this.invoice.company_city;
				this.fields[5].val = this.invoice.company_tel;
				this.fields[6].val = this.invoice.business_scope;
				this.isDefault = this.invoice.is_default || 0;
				this.invoiceId = this.invoice.invoice_id;
				// 编辑/新增
				this.type = this.invoice ? 1 : 0;
			},
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
				this.initialInvoice();
			}
		},
		mounted(){
			this.initialInvoice();
		},
		props:['invoice']
	}
</script>
<style lang='less' scoped>
	@import '../assets/lib/form.less';
</style>