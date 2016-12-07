<template>
	<div id="userinfoEdit_container" class="user-common-container">
		<!--头像-->
		<div class="user-common-avatar-container">
			<img :src="user.avatar">
			<div class="btn">编辑头像</div>
		</div>
		<div id="form_container">
			<validation name="validation1">
				<div class="common-field"
			v-for="(value, field) in fields"
			:class="fields[field].class">
					<label :for="fields[field].id">{{fields[field].name}}</label>
					<div class="input-container">
						<validity
						:ref='fields[field].id'
						:field='fields[field].id'
						:validators="fields[field].validator">
							<input
							type="text"
							v-if="(fields[field].id !== 'sex') && (fields[field].id !=='subject')"
							:id="fields[field].id"
							:placeholder="fields[field].placeholder"
							:class="{ warn: fields[field].error, active: fields[field].focus}"
							@blur="handleValidate(fields[field].id)"
							@focus="focusing(fields[field].id)"
							v-model="fields[field].val">
							<!--性别下拉框-->
							<select
							v-if="fields[field].id === 'sex'"
							v-model="fields[field].val">
								<option
								v-for="option in fields[field].options"
								:value="option.value">{{option.title}}</option>
							</select>
							<!--补习学科选择框-->
							<div class="checkbox-container"
							v-if="fields[field].id === 'subject'">
								<div class="checkbox-group"
								v-for="checkbox in fields[field].checkboxes">
									<label><input type="checkbox">
									<span class="checkbox-input"></span></label>
									<span class="checkbox-title">{{checkbox.title}}</span>
									<span class="goal">
										<input maxlength="3"
										v-model="checkbox.mark"
										@blur="fillMark(checkbox)">
										<span class="fullMark">/150</span>
									</span>
								</div>
							</div>
						</validity>
						<p class="error" v-if="fields[field].error && !fields[field].focus">{{fields[field].msg}}</p>
					</div>
				</div>
			</validation>
		</div>
		<div class="btn save"
		@click="save">保存</div>
		<changeavatar></changeavatar>
	</div>
</template>
<script>
	import changeavatar from '../../components/Avatar.vue';
	export default{
		name:'userinfoedit',
		data(){
			return{
				usertype:1,
				user:{
					avatar:'../../static/img/icon_head.png',
					name:'我不要再叫李慧慧了!'
				},
				fields: {
					name: {
			            id: 'name',
			            class: 'name-field',
			            name: '真实姓名',
			            placeholder: '',
			            validator: { required: true },
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
		        	phone: {
			            id: 'phone',
			            class: 'phone-field',
			            name: '手机',
			            placeholder: '',
			            validator: { required: true, isPhone:true},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
		        	phone2: {
			            id: 'phone2',
			            class: 'phone2-field',
			            name: '家长手机',
			            placeholder: '',
			            validator: { required: true, isPhone:true},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
		        	sex: {
		        		id: 'sex',
		        		class: 'sex-field',
		        		name: '性别',
		        		val:'B',
		        		validator: {},
		        		options:[{
		        			title:'男',
		        			value: 'A'
		        		},{
		        			title:'女',
		        			value:'B'
		        		}]
		        	},
		        	qq: {
			            id: 'qq',
			            class: 'qq-field',
			            name: 'QQ',
			            placeholder: '',
			            validator: { required: true, isNum:true},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
		        	alipay: {
			            id: 'alipay',
			            class: 'alipay-field',
			            name: '支付宝',
			            placeholder: '',
			            validator: { required: true},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
		        	subject:{
		        		id:'subject',
		        		class: 'subject-field',
		        		name: '补习学科',
		        		validator:{},
		        		error:false,
		        		msg:'',
		        		checkboxes:[{
		        			title:'数学',
		        			value:'A',
		        			mark:''
		        		},{
		        			title:'物理',
		        			value:'B',
		        			mark:''
		        		},{
		        			title:'化学',
		        			value:'C',
		        			mark:''
		        		}]
		        	},
		        	school: {
			            id: 'school',
			            class: 'school-field',
			            name: '所在学校',
			            placeholder: '',
			            validator: { required: true},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
		        	grade: {
			            id: 'grade',
			            class: 'grade-field',
			            name: '年级',
			            placeholder: '',
			            validator: { required: true},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
		        }
			}
		},
		watch:{
			$validation(){
				var va1 = this.$validation.validation1;
				try{
					if(va1.name.invalid) {
						this.fields.name.error = true;
						this.fields.name.msg = '姓名不能为空';
					} else {
						this.fields.name.error = false;
					}
					if(va1.phone.invalid) {
						this.fields.phone.error = true;
						var err0 = va1.phone.errors[0].validator;
						if(err0 === 'required') this.fields.phone.msg = '手机不能为空喔';
						else if(err0 === 'isPhone') this.fields.phone.msg = '手机号不合法喔'
					} else {
						this.fields.phone.error = false;
					}
					if(va1.phone2.invalid) {
						this.fields.phone2.error = true;
						var err0 = va1.phone2.errors[0].validator;
						if(err0 === 'required') this.fields.phone2.msg = '家长手机不能为空喔';
						else if(err0 === 'isPhone') this.fields.phone2.msg = '家长手机号不合法喔'
					} else {
						this.fields.phone2.error = false;
					}
					if(va1.qq.invalid) {
						this.fields.qq.error = true;
						var err0 = va1.qq.errors[0].validator;
						if(err0 === 'required') this.fields.qq.msg = 'QQ号不能为空喔';
						else if(err0 === 'isNum') this.fields.qq.msg = 'QQ号不合法喔'
					} else {
						this.fields.qq.error = false;
					}
					if(va1.alipay.invalid) {
						this.fields.alipay.error = true;
						this.fields.alipay.msg = '支付宝号不能为空喔';
					} else {
						this.fields.alipay.error = false;
					}
					if(va1.school.invalid) {
						this.fields.school.error = true;
						this.fields.school.msg = '学校不能为空喔';
					} else {
						this.fields.school.error = false;
					}
					if(va1.grade.invalid) {
						this.fields.grade.error = true;
						this.fields.grade.msg = '年级不能为空喔';
					} else {
						this.fields.grade.error = false;
					}
				}catch(err){}
			}
		},
		validators:{
			isPhone(val){
				return /^1[34578]\d{9}$/.test(val);
			},
			isNum(val){
				return !isNaN(val);
			}
		},
		methods: {
			handleValidate(field) {
				this.$refs[field][0].validate();
				this.fields[field].focus = false;
			},
			focusing(field){
				this.fields[field].focus = true;
				this.fields[field].error = false;
			},
			/*填写分数*/
			fillMark(checkbox){
				let mark = checkbox.mark;
				if((isNaN(mark) || mark >150) || mark<0) checkbox.mark = 130;
			},
			/*提交*/
			save(){
				let n = 10;
				for (var validity in this.$refs){
					this.$refs[validity][0].validate(() => {
						n--;
						if(n>0) return;
						if(this.$validation.validation1.invalid) return;
						else console.log('allCheck')
					});
				}
			}
		},
		components:{changeavatar}
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	@warn: #f12323;
	#userinfoEdit_container{
		position: relative;
	}
	/*编辑头像*/
	.user-common-avatar-container .btn{
		width:80px;
		height: 26px;
		line-height: 26px;
		margin: 0 auto;
	}
	/*表单部分*/
	#form_container{
		margin-top: 40px;
		.common-field{
			font-size:16px;
			margin-top: 5px;
			label{
				color: #4d4d4d;
				text-align: right;
				display: inline-block;
    			vertical-align: 5px;
    			width: 100px;
    			margin-right: 16px;
			}
			.input-container{
				width:400px;
				display: inline-block;
			    vertical-align: middle;
			    height: 48px;
			    /*输入框*/
				input,select{
					width:400px;
					height: 32px;
					border:1px solid #f1f1f1;
					padding-left: 10px;
					color:#949494;
					&.warn{
						border-color:@warn;
					}
					&.active{
						border-color:@baseColor;
					}
				}
				/*下拉框*/
				select{
					background-position: 365px;
				}
				/*checkbox框*/
				.checkbox-container{
					.checkbox-group{
						display: inline-block;
						width: 100%;
						text-align: left;
						margin-bottom: 5px;
						span{
							vertical-align: middle;
						}
						label{
							width: auto;
							margin-right: 0;
							vertical-align: middle;
						}
					}
					input[type=checkbox]{
						display: none;
					}
					.checkbox-input{
						width: 24px;
						height: 24px;
						position: relative;
						display: inline-block;
						border:1px solid #f1f1f1;
						cursor: pointer;
					}
					input[type=checkbox]:checked + .checkbox-input:after{
						content:'\2713';
						position: absolute;
						color: @baseColor;
						right: 4px;
						top: 0px;
						font-size: 18px;
					}
					.checkbox-title{
						color: #949494;
						margin: 0 10px;
					}
					.goal{
						position: relative;
						width: 120px;
						height: 32px;
						border:1px solid #f1f1f1;
						display: inline-block;
						color:#949494;
						input{
							display: inline-block;
							border:none;
							width: 50px;
							height: 20px;
						    margin-top: 5px;
						    font-size: 16px;
						}
						.fullMark{
							position: absolute;
							right: 5px;
							top:5px;
						}
					}
				}
				.error{
					font-size: 12px;
					color:@warn;
				}
			}
			&.subject-field {
				&>label{
					vertical-align: 35px;
				}
				.input-container{
					height: auto;
				}
			}
		}
	}
	/*保存*/
	.btn.save{
		width: 72px;
	    height: 30px;
	    line-height: 30px;
	    float: right;
	    margin-top: 50px;
	}
</style>