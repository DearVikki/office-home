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
		<!-- 设为默认保存地址 -->
		<div id="check_container">
			<label>
				<input type="checkbox" class="checkbox" :checked="isDefault"
				@change="isDefault = !isDefault">
				<span class="checkbox-input"></span>
				<span>设置为默认地址</span>
			</label>
		</div>
		<!-- 保存 -->
		<div class="common-save" @click="save">保存</div>
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
					title:'名字',
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
					title:'详细地址',
					placeholder:'请输入地址',
					validators:{required:{msg:'详细地址不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'district',
					title:'地区',
					placeholder:'请输入地区',
					validators:{required:{msg:'地区不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'city',
					title:'城市',
					placeholder:'请输入城市',
					validators:{required:{msg:'城市不能为空'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				},{
					id:'phone',
					title:'手机',
					placeholder:'请输入手机',
					validators:{required:{msg:'手机不能为空'},isNum:{msg:'手机号不合法'}},
					error:false,
					focus:false,
					msg:'',
					val:''
				}],
				isDefault:false
			}
		},
		methods:{
			isNum(val){
				return !isNaN(val);
			},
			required(val){
				return val!=='';
			},
			handleValidate(field) {
				let checked = true;
				for(var rule in field.validators){
					if(!this[rule](field.val) && checked) {
						field.error = true;
						field.msg = field.validators[rule].msg;
						checked = false;
						break;
					}
				}
				return checked?true:false;
			},
			fieldFocus(field){
				field.focus = true;
				field.error = false;
			},
			fieldBlur(field){
				this.handleValidate(field);
				field.focus = false;
			},
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
				this.$emit('saveAddress', address, this.type)
			}
		}
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
				vertical-align: 65px;
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
				height: 150px;
				resize: none;
				padding: 8px 10px;
			}
			.tip{
				font-size: 12px;
				color: @baseColor;
				text-align: left;
				height: 16px;
			}
		}
	}
	#check_container{
		text-align: left;
		font-size:14px;
		color:#666666;
		letter-spacing:0.28px;
		margin-left: 80px;
		margin-top: -10px;
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
	}
</style>