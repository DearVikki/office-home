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
			checkAll(){
				let allchecked = true;
				for(var field in this.fields){
					if(!this.handleValidate(this.fields[field])) allchecked = false;
				}
				return allchecked;
			},
			save(){
				if(!this.checkAll()) return;
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
						// 留：应当更新新id的 同时新增old_id字段
						// address.address_id = response.body.data.address_id;
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
	@baseColor: #d42b1e;
	.inline{
		display: inline-block;
	}
	.vm{
		display: inline-block;
		vertical-align: middle;
	}
	.txt{
		font-size:16px;
		color:#666666;
	}
	.item{
		.txt;
		letter-spacing:0.36px;
		margin-bottom: 10px;
		label{
			.inline;
			vertical-align: 7px;
			width: 74px;
			text-align: right;
			&.address{
				vertical-align: 45px;
			}
		}
		.input-container{
			.vm;
			margin-left: 5px;
			input,textarea{
				padding: 0 10px;
				border:1px solid #d3d3d3;
				width:534px;
				height:38px;
				.txt;
			}
			textarea{
				height: 100px;
				resize: none;
				padding: 8px 10px;
			}
			.tip{
				font-size: 12px;
				color: @baseColor;
				text-align: left;
				height: 16px;
				opacity: 0;
				&.show{
					opacity: 1;
				}
			}
		}
	}
	#check_container{
		text-align: left;
		font-size:14px;
		color:#666666;
		letter-spacing:0.28px;
		margin-left: 80px;
		.checkbox-input{
			border:1px solid #b0b0b0;
			width:12px;
			height:12px;
		}
	}
	.common-save{
		margin-top: 30px;
		margin-left: 80px;
		cursor: pointer;
		font-size: 20px;
		text-align: center;
	}
</style>