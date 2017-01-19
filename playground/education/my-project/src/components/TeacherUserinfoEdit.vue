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
								<input type="checkbox" :value="checkbox.value"
								:checked="checkbox.checked"
								@change="clickSubject(checkbox)">
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
							v-model="sub.id"
							@change="clickOption(sub.id)">
								<option
								v-for="option in sub.options"
								:value="option.id">{{option.title}}</option>
							</select>
							<input maxlength="3"
							:class="{warn: sub.error, active: sub.focus}"
							v-model="sub.val"
							@focus="focusMark(sub)"
							@blur="blurMark(sub)">
						</div>
					</div>
					<p class="error" v-if="fields[field].error && !fields[field].focus">{{fields[field].msg}}</p>
				</div>
			</div>
	</div>
</template>
<script>
	import Bus from '../assets/js/bus.js';
	export default{
		name:'teacherUserinfoEdit',
		data(){
			return{
				learningType:'理科',
				subjectField:[],
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
		        	/*alipay: {
			            id: 'alipay',
			            class: 'alipay-field',
			            name: '支付宝',
			            placeholder: '',
			            validator: { required: {msg:'支付宝号不能为空喔'}},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},*/
		        	/*learningType: {
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
		        	},*/
		        	subject:{
		        		id:'subject',
		        		class: 'subject-field',
		        		name: '擅长学科',
		        		validator:{subjectRequired:{msg:'请至少选择一门擅长学科喔'}},
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
		        		},{
		        			title:'生物',
		        			value:'生物',
		        			mark:''
		        		},{
		        			title:'英语',
		        			value:'英语',
		        			mark:''
		        		},{
		        			title:'语文',
		        			value:'语文',
		        			mark:''
		        		},{
		        			title:'政治',
		        			value:'政治',
		        			mark:''
		        		},{
		        			title:'地理',
		        			value:'地理',
		        			mark:''
		        		},{
		        			title:'历史',
		        			value:'历史',
		        			mark:''
		        		}]
		        	},
		        	scores:{
		        		id:'scores',
		        		class:'scores-field',
		        		name:'高考分数',
		        		validator:{scoresRequired:{msg:'请完善好所有高考分数喔'},scoresValid:{msg:'不是有效的分数数值'}},
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
		        				id:'E'
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
		        		validator:{required: {msg:'请选择年级喔'}},
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
		        			title:'大四',
		        			value:'大四'
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
		},
		watch:{
			datainfo(){
				//先填数据
					let info = this.datainfo;
					console.log(this.datainfo)
					this.fields.name.val =  info.user_name;
					this.fields.sex.val = info.sex;
					this.fields.qq.val = info.qq;
					//this.fields.alipay.val = info.alipay;
					this.fields.scores.subs[0].val = Number(info.chinese) || '';
					this.fields.scores.subs[1].val = Number(info.math) || '';
					this.fields.scores.subs[2].val = Number(info.english) || '';
					this.fields.scores.subs[3].val = Number(info.multiple_l) || '';
					//this.fields.learningType.val = info.learning_type;
					this.fields.school.val = info.university;
					this.fields.major.val = info.major;
					this.fields.grade.val = info.grade;
					let subject = JSON.parse(info.subject);
					// 判断subject数组里是否有subject.checkbox的value
					this.fields.subject.checkboxes.forEach((e)=>{
						if(subject.indexOf(e.value)!==-1){
							console.log(e.value)
							e.checked = true;
						}
					})
					this.fields.scores.subs[3].id = info.learning_type === '文科'?'E':'D';
					this.fields.scores.subs[3].val = info.learning_type === '文科'? info.multiple_w : info.multiple_l;
			},
			checkAll(){
					let allchecked = true;
					for(var field in this.fields){
						if(!this.handleValidate(this.fields[field])) allchecked = false;
					}
					if(allchecked) {
						this.$emit('allCheck',this.fields, this.learningType);
						Bus.$emit('changeName',this.fields.name.val);
					}
			}
		},
		methods:{
			isNum(val){
				return !isNaN(val);
			},
			required(val){
				return val!=='';
			},
			subjectRequired(){
				let checkboxes = document.querySelectorAll('.subject-field input');
				for (var i=0; i<checkboxes.length; i++) {
					if (checkboxes[i].checked) {
					    this.subjectField.push(checkboxes[i].value);
					}
				}
				return this.subjectField.length;
			},
			scoresRequired(){
				let allMark = true;
				this.fields.scores.subs.forEach((e)=>{
					if(!e.val) {
						allMark = false;
						e.error = true;
					}
				})
				return allMark;
			},
			scoresValid(){
				let allMark = true;
				this.fields.scores.subs.forEach((e)=>{
					let mark = Number(e.val)
					if( (isNaN(mark) || mark<0) ||
						( ((e.id!=='D' && e.id!=='E') && mark>150) ||
						((e.id==='D' || e.id==='E') && mark>300) )
					) {
						allMark = false;
						e.error = true;
					}
				})
				return allMark;
			},
			//点击进分数框
			focusMark(sub){
				sub.error = false;
				sub.focus = true;
				this.fields.scores.error = false;
			},
			/*blur出分数框*/
			blurMark(sub){
				sub.focus = false;
				// 这里没有采取全部检测的做法 不然点击进一个分数框后面的所有分数框都会因为无数据而变红了
				// 所以就只检测了分数格式是否正确
				// this.handleValidate(this.fields.scores);
				if(!this.scoresValid()) {
					this.fields.scores.error = true;
					this.fields.scores.msg = '不是有效的分数数值'
				}
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
				this.fields.subject.checkboxes.forEach((e)=>{
					if(e.checked) console.log(e)
				})
			},
			/*点击科目*/
			clickSubject(checkbox){
				checkbox.checked =! checkbox.checked;
				this.fields.subject.error = false;
				this.subjectField = [];
			},
			/*选择文科理科下拉框*/
			clickOption(id){
				this.learningType = id==='E' ?'文科':'理科';
			}
		},
		props:['datainfo','checkAll']
	}
</script>
<style scoped lang='less'>
	@import '../assets/lib/userinfoForm.less';
	/*擅长学科框*/
	#form_container .common-field.subject-field{
		margin-top: -5px;
		height: 110px;
		& >label{
			vertical-align: middle;
		}
	}
	#form_container .common-field .input-container .checkbox-container .checkbox-group{
		width: 110px;
	}
	/*高考分数框*/
	#form_container .common-field.scores-field{
		margin-top: 10px;
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
	#form_container .common-field.scores-field .input-container .score-group input{
		&.warn{
			border-color:red;
		}
		&.active{
			border-color:@baseColor;
		}
	}
</style>