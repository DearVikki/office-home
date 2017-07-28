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
				<p class="tip" :class="{show:field.error && !field.focus}">{{field.msg}}</p>
			</div>
		</div>
		<!-- 设为默认保存地址 -->
		<div id="check_container">
			<label>
				<input type="checkbox" class="checkbox" :checked="isDefault"
				@change="isDefault = !isDefault">
				<span class="checkbox-input"></span>
				<span>{{lang.SET_DEFAULT_ADDRESS}}</span>
			</label>
		</div>
		<!-- 保存 -->
		<div class="common-save" @click="save">{{lang.SAVE}}</div>
	</div>
</template>
<script>
	import lang from '../assets/js/language.js'
	export default{
		name:'address',
		data(){
			return{
				// 0表示新增 1表示编辑
				type:0,
				fields:[{
					id:'name',
					title:lang.RECEIVE_NAME,
					placeholder:lang.FILL_IN_RECEIVE_NAME,
					validators:{required:{msg: lang.NO_EMPTY_RECEIVE_NAME}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'rut',
					title:lang.ID,
					placeholder: lang.FILL_IN_ID,
					validators:{required:{msg: lang.NO_EMPTY_ID}},
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
				}],
				isDefault:false,
				addressId:'',
				lang:lang
			}
		},
		methods:{
			save(){
				// if(!this.checkAll(this.fields)) return;
				let address = {
					receive_name: this.fields[0].val,
					idcard: this.fields[1].val,
					receive_city: this.fields[4].val,
					receive_area: this.fields[3].val,
					receive_address: this.fields[2].val,
					receive_mobile: this.fields[5].val,
					selected: Number(this.isDefault)
				}
				// 编辑
				if(this.type) {
					address.name = 'zl.shopping.sys.address.update';
					address.address_id = this.addressId;
					this.$http.post('',address).then((response)=>{
					})
				} else {
					// 新增
					address.name = 'zl.shopping.sys.address.add';
					this.$http.post('',address).then((response)=>{
						address.address_id = response.body.data.address_id;
					})
				}
				this.$emit('saveAddress', address, this.type)
			},
			initial(){
				this.fields[0].val = this.address.receive_name;
				this.fields[1].val = this.address.idcard;
				this.fields[2].val = this.address.receive_address;
				this.fields[3].val = this.address.receive_area;
				this.fields[4].val = this.address.receive_city;
				this.fields[5].val = this.address.receive_mobile;
				this.isDefault = this.address.selected || 0;
				this.addressId = this.address.address_id;
				// 编辑/新增
				this.type = this.address ? 1 : 0;
			}
		},
		watch:{
			address(){
				this.initial();
			}
		},
		mounted(){
			this.initial();
		},
		props:['address']
	}
</script>
<style scoped lang='less'>
	@import '../assets/lib/form.less';
</style>