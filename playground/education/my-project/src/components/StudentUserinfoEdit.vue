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
							v-if="((fields[field].id !== 'sex') && (fields[field].id !=='scores')) && ((fields[field].id !== 'learningType') && (fields[field].id !=='grade'))"
							:id="fields[field].id"
							:placeholder="fields[field].placeholder"
							:class="{ warn: fields[field].error, active: fields[field].focus}"
							@blur="handleValidate(fields[field].id)"
							@focus="focusing(fields[field].id)"
							v-model="fields[field].val">
							<!--性别/分科/年级下拉框-->
							<select
							v-if="(fields[field].id === 'sex' ||fields[field].id === 'learningType') || (fields[field].id === 'grade')"
							v-model="fields[field].val">
								<option
								v-for="option in fields[field].options"
								:value="option.value">{{option.title}}</option>
							</select>
							<!--补习学科选择框-->
							<div class="checkbox-container"
							v-if="fields[field].id === 'scores'">
								<div class="checkbox-group"
								v-for="checkbox in fields[field].subs">
									<label><input type="checkbox">
									<span class="checkbox-input"></span></label>
									<span class="checkbox-title">{{checkbox.title}}</span>
									<span class="goal">
										<input maxlength="3"
										v-model="checkbox.val"
										@blur="fillMark(checkbox)">
										<span class="fullMark">/{{checkbox.fullMark}}</span>
									</span>
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
		name:'studentUserinfoEdit',
		data(){
			return{
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
		        	sex: {
		        		id: 'sex',
		        		class: 'sex-field',
		        		name: '性别',
		        		val:'男',
		        		validator: {},
		        		options:[{
		        			title:'男',
		        			value: '男'
		        		},{
		        			title:'女',
		        			value:'女'
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
		        	/*alipay: {
			            id: 'alipay',
			            class: 'alipay-field',
			            name: '支付宝',
			            placeholder: '',
			            validator: { required: true},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},*/
		        	scores:{
		        		id:'scores',
		        		class: 'scores-field',
		        		name: '补习学科',
		        		validator:{},
		        		error:false,
		        		msg:'',
		        		subs:[{
		        			title:'语文',
		        			value:'A',
		        			val:'',
		        			fullMark:150
		        		},{
		        			title:'数学',
		        			value:'B',
		        			val:'',
		        			fullMark:150
		        		},{
		        			title:'英语',
		        			value:'C',
		        			val:'',
		        			fullMark:150
		        		},{
		        			title:'理综',
		        			value:'D',
		        			val:'',
		        			fullMark:300
		        		},{
		        			title:'文综',
		        			value:'F',
		        			val:'',
		        			fullMark:300
		        		}]
		        	},
		        	learningType: {
		        		id: 'learningType',
		        		class: 'learningType-field',
		        		name: '分科',
		        		val:'理科',
		        		validator: {},
		        		options:[{
		        			title:'理科',
		        			value: '理科'
		        		},{
		        			title:'文科',
		        			value:'文科'
		        		},{
		        			title:'其他',
		        			value:'其他'
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
			            validator: {},
			            val:'高一',
			           options:[{
		        			title:'高一',
		        			value: '高一'
		        		},{
		        			title:'高二',
		        			value:'高二'
		        		},{
		        			title:'高三',
		        			value:'高三'
		        		},{
		        			title:'复读',
		        			value:'复读'
		        		}]
		        	}
		        }
			}
		},
		watch:{
			/*$validation(){
				console.log('hey')
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
			}*///,
			checkAll(){
					let n = 6;
					for (var validity in this.$refs){
						this.$refs[validity][0].validate(() => {
							this.watchValidation();
							n--;
							if(n>0) return;
							if(this.$validation.validation1.invalid) return;
							else this.$emit('allCheck',this.fields);
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
					/*if(va1.phone2.invalid) {
						this.fields.phone2.error = true;
						var err0 = va1.phone2.errors[0].validator;
						if(err0 === 'required') this.fields.phone2.msg = '家长手机不能为空喔';
						else if(err0 === 'isPhone') this.fields.phone2.msg = '家长手机号不合法喔'
					} else {
						this.fields.phone2.error = false;
					}*/
					if(va1.qq.invalid) {
						this.fields.qq.error = true;
						var err0 = va1.qq.errors[0].validator;
						if(err0 === 'required') this.fields.qq.msg = 'QQ号不能为空喔';
						else if(err0 === 'isNum') this.fields.qq.msg = 'QQ号不合法喔'
					} else {
						this.fields.qq.error = false;
					}
					/*if(va1.alipay.invalid) {
						this.fields.alipay.error = true;
						this.fields.alipay.msg = '支付宝号不能为空喔';
					} else {
						this.fields.alipay.error = false;
					}*/
					if(va1.school.invalid) {
						this.fields.school.error = true;
						this.fields.school.msg = '学校不能为空喔';
					} else {
						this.fields.school.error = false;
					}
					/*if(va1.grade.invalid) {
						this.fields.grade.error = true;
						this.fields.grade.msg = '年级不能为空喔';
					} else {
						this.fields.grade.error = false;
					}*/
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
			fillMark(checkbox){
				let mark = checkbox.mark;
				if((isNaN(mark) || mark >150) || mark<0) checkbox.mark = 130;
			}
		},
		props:['checkAll']
	}
</script>
<style scoped lang='less'>
	@import '../assets/lib/userinfoForm.less';
</style>