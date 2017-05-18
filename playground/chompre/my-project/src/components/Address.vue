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
				<span>Establecer como dirección por defecto</span>
			</label>
		</div>
		<!-- 保存 -->
		<div class="common-save" @click="save">Guardar</div>
	</div>
</template>
<script>
	export default{
		name:'address',
		data(){
			return{
				// 0表示新增 1表示编辑
				type:0,
				fields:[{
					id:'name',
					title:'Nombre',
					placeholder:'请输入名字',
					validators:{required:{msg:'名字不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'rut',
					title:'R.U.T',
					placeholder:'请输入RUT',
					validators:{required:{msg:'R.U.T不能为空'}},
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
					placeholder:'请输入手机',
					validators:{required:{msg:'手机不能为空'},isNum:{msg:'手机号不合法'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				}],
				isDefault:false,
				addressId:''
			}
		},
		methods:{
			save(){
				if(!this.checkAll(this.fields)) return;
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
			}
		},
		watch:{
			address(){
				this.fields[0].val = this.address.receive_name;
				this.fields[1].val = this.address.idcard;
				this.fields[2].val = this.address.receive_address;
				this.fields[3].val = this.address.receive_area;
				this.fields[4].val = this.address.receive_city;
				this.fields[5].val = this.address.receive_mobile;
				this.isDefault = this.address.selected;
				this.addressId = this.address.address_id;
				// 编辑/新增
				this.type = this.address ? 1 : 0;
			}
		},
		props:['address']
	}
</script>
<style scoped lang='less'>
	@import '../assets/lib/form.less';
</style>