<template>
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
							v-if="((fields[field].id !== 'sex') && (fields[field].id !=='subject')) && (fields[field].id !=='scores')"
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
							<!--擅长学科选择框-->
							<div class="checkbox-container"
							v-if="fields[field].id === 'subject'">
								<div class="checkbox-group"
								v-for="checkbox in fields[field].checkboxes">
									<label><input type="checkbox">
									<span class="checkbox-input"></span></label>
									<span class="checkbox-title">{{checkbox.title}}</span>
								</div>
							</div>
							<!--高考分数填写框-->
							<div
							v-if="fields[field].id === 'scores'">
								<div class="score-group"
								v-for="sub in fields[field].subs">
									<!--其它学科-->
									<span class="sub-title"
									v-if="sub.title">{{sub.title}}</span>
									<!--文综/理综-->
									<select
									v-else
									v-model="sub.id">
										<option
										v-for="option in sub.options"
										:value="option.id">{{option.title}}</option>
									</select>
									<input maxlength="3"
									v-model="sub.val"
									@blur="fillMark(sub)">
								</div>
							</div>
						</validity>
						<p class="error" v-if="fields[field].error && !fields[field].focus">{{fields[field].msg}}</p>
					</div>
				</div>
			</validation>
	</div>
</template>
<script>
	export default{
		name:'teacherUserinfoEdit',
		data(){
			return{
				fields:{
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
		        		name: '擅长学科',
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
		        	scores:{
		        		id:'scores',
		        		class:'scores-field',
		        		name:'高考分数',
		        		validator:{},
		        		error:false,
		        		msg:'',
		        		subs:[{
		        			title:'语文',
		        			id:'A',
		        			val:''
		        		},{
		        			title:'数学',
		        			id:'B',
		        			val:''
		        		},{
		        			title:'英语',
		        			id:'C',
		        			val:''
		        		},{
		        			val:'',
		        			id:'D',
		        			options:[{
		        				title:'理综',
			        			id:'D'
		        			},{
		        				title:'文综',
		        				id:'F'
		        			}]
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
		        	major: {
			            id: 'major',
			            class: 'major-field',
			            name: '专业',
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
		        	}
				}
			}
		},
		watch:{
			checkAll(){
					let n = 9;
					for (var validity in this.$refs){
						this.$refs[validity][0].validate(() => {
							this.watchValidation();
							n--;
							if(n>0) return;
							if(this.$validation.validation1.invalid) return;
							else console.log('allCheck')
						});
					}
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
		methods:{
			watchValidation(){
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
					if(va1.major.invalid) {
						this.fields.major.error = true;
						this.fields.major.msg = '学校不能为空喔';
					} else {
						this.fields.major.error = false;
					}
					if(va1.grade.invalid) {
						this.fields.grade.error = true;
						this.fields.grade.msg = '年级不能为空喔';
					} else {
						this.fields.grade.error = false;
					}
				}catch(err){}
			},
			handleValidate(field) {
				//console.log(this.$refs[field][0])
				this.$refs[field][0].validate(()=>{
					this.watchValidation();
				});
				this.fields[field].focus = false;
			},
			focusing(field){
				this.fields[field].focus = true;
				this.fields[field].error = false;
			},
			/*填写分数*/
			fillMark(subject){
				let mark = subject.val;
				if((isNaN(mark) || mark >150) || mark<0) subject.val = '';
			}
		},
		props:['checkAll']
	}
</script>
<style scoped lang='less'>
	@import '../assets/lib/userinfoForm.less';
	/*擅长学科框*/
	#form_container .common-field.subject-field > label{
		vertical-align: middle;
	}
	#form_container .common-field .input-container .checkbox-container .checkbox-group{
		width: 110px;
	}
	/*高考分数框*/
	#form_container .common-field.scores-field label{
		vertical-align: 3px;
	}
	#form_container .common-field.scores-field .input-container{
		width: 500px;
		margin-top: 10px;
		.score-group{
			color: #949494;
			width: 100px;
			display: inline-block;
			margin-right: 5px;
			&:last-of-type{
				width:auto;
			}
			.sub-title{
				margin-right: 4px;
			}
			input{
				width: 54px;
				height: 32px;
			}
			select{
				width: 72px;
				height: 32px;
				margin-right: 4px;
				background-position: 48px;
			}
		}
	}
</style>