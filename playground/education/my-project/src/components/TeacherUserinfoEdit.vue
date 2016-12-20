<template>
	<div id="form_container">
			<div class="common-field"
			v-for="(value, field) in fields"
			:class="fields[field].class">
				<label :for="fields[field].id">{{fields[field].name}}</label>
				<div class="input-container">
					<input
					type="text"
					v-if="((fields[field].id !== 'sex') && (fields[field].id !=='subject')) &&
					((fields[field].id !=='scores') && (fields[field].id !=='learningType')) && (fields[field].id !=='grade')"
					:id="fields[field].id"
					:placeholder="fields[field].placeholder"
					:class="{ warn: fields[field].error, active: fields[field].focus}"
					@blur="handleValidate(fields[field])"
					@focus="focusing(fields[field].id)"
					v-model="fields[field].val">
					<!--性别/文理科/年级下拉框-->
					<select
					v-if="(fields[field].id === 'sex' || fields[field].id === 'learningType') || (fields[field].id === 'grade')"
					v-model="fields[field].val"
					@focus="focusing(fields[field].id)">
						<option
						v-for="option in fields[field].options"
						:value="option.value">{{option.title}}</option>
					</select>
					<!--擅长学科选择框-->
					<div class="checkbox-container" style="margin-top:10px"
					v-if="fields[field].id === 'subject'"
					@focus="focusing(fields[field].id)">
						<div class="checkbox-group"
						v-for="checkbox in fields[field].checkboxes">
							<label>
								<input type="checkbox" :value="checkbox.value">
								<span class="checkbox-input"></span>
							</label>
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
					<p class="error" v-if="fields[field].error && !fields[field].focus">{{fields[field].msg}}</p>
				</div>
			</div>
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
			            validator: { required: {msg:'姓名不能为空喔'}},
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
			            validator: { required: {msg:'QQ不能为空喔'}, isNum:{msg:'QQ号不合法'}},
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
			            validator: { required: {msg:'支付宝号不能为空喔'}},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
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
		        		}]
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
		        			value:'数学',
		        			mark:''
		        		},{
		        			title:'物理',
		        			value:'物理',
		        			mark:''
		        		},{
		        			title:'化学',
		        			value:'化学',
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
			            validator: { required: {msg:'学校不能为空喔'}},
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
			            validator: { required: {msg:'专业不能为空喔'}},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
		        	grade:{
		        		id:'grade',
		        		class: 'grade-field',
		        		name: '年级',
		        		validator:{},
		        		val:'大一',
		        		options:[{
		        			title:'大一',
		        			value:'大一'
		        		},{
		        			title:'大二',
		        			value:'大二'
		        		},{
		        			title:'大三',
		        			value:'大三'
		        		},{
		        			title:'研一',
		        			value:'研一'
		        		},{
		        			title:'研二',
		        			value:'研二'
		        		},{
		        			title:'研三',
		        			value:'研三'
		        		},{
		        			title:'博一',
		        			value:'博一'
		        		},{
		        			title:'博二',
		        			value:'博二'
		        		},{
		        			title:'博三',
		        			value:'博三'
		        		}]
		        	}
		        }
			}
		},
		mounted(){
			//先填数据
			this.$http.get('?name=education.sys.user.info').then((response)=>{
				let info = response.body.data.info;
				this.fields.name.val =  info.user_name;
				this.fields.sex.val = info.sex;
				this.fields.qq.val = info.qq;
				this.fields.alipay.val = info.alipay;
				this.fields.scores.subs[0].val = Number(info.chinese) || '';
				this.fields.scores.subs[1].val = Number(info.math) || '';
				this.fields.scores.subs[2].val = Number(info.english) || '';
				this.fields.scores.subs[3].val = Number(info.multiple_l) || '';
				this.fields.learningType.val = info.learning_type;
				this.fields.school.val = info.university;
				this.fields.major.val = info.major;
				this.fields.grade.val = info.grade;
			})
		},
		watch:{
			checkAll(){
					let allchecked = true;
					for(var field in this.fields){
						if(!this.handleValidate(this.fields[field])) allchecked = false;
					}
					if(allchecked) this.$emit('allCheck',this.fields);
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
				console.log(field)
				let checked = true;
				field.focus = false;
				for(var rule in field.validator){
					if(!this[rule](field.val) && checked) {
						field.error = true;
						field.msg = field.validator[rule].msg;
						checked = false;
						break;
					}
				}
				return checked?true:false;
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
	#form_container .common-field.subject-field{
		margin-top: -5px;
		& >label{
			vertical-align: middle;
		}
	}
	#form_container .common-field .input-container .checkbox-container .checkbox-group{
		width: 110px;
	}
	/*高考分数框*/
	#form_container .common-field.scores-field{
		margin-bottom: 15px;
	}
	#form_container .common-field.scores-field label{
		vertical-align: 3px;
	}
	#form_container .common-field.scores-field .input-container{
		width: 500px;
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