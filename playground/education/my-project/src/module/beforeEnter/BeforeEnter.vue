<template>
	<div id="beforeenter_container">
		<div id="enter_title">请完善个人信息</div>
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
					@focus="focusing(fields[field].id)"
					>
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
								@change="clickSubject">
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
							@blur="fillMark(sub)">
						</div>
					</div>
					<p class="error" v-if="fields[field].error && !fields[field].focus">{{fields[field].msg}}</p>
				</div>
			</div>
		</div>
		<div class="btn"
		@click="submit">下一步</div>
	</div>
</template>
<script>
	import Bus from '../../assets/js/bus.js';
	export default{
		name:'beforeEnter',
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
		        		val:'',
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
		        			focus:false,
		        			error:false,
		        			val:''
		        		},{
		        			title:'数学',
		        			id:'B',
		        			focus:false,
		        			error:false,
		        			val:''
		        		},{
		        			title:'英语',
		        			id:'C',
		        			focus:false,
		        			error:false,
		        			val:''
		        		},{
		        			val:'',
		        			id:'D',
		        			focus:false,
		        			error:false,
		        			options:[{
		        				title:'理综',
			        			id:'D'
		        			},{
		        				title:'文综',
		        				id:'E'
		        			}]
		        		}]
		        	},
		        	/*school: {
			            id: 'school',
			            class: 'school-field',
			            name: '所在学校',
			            placeholder: '',
			            validator: { required: {msg:'学校不能为空喔'}},
			            error: false,
			            msg:'',
			            val:'浙江大学',
			            focus: false
		        	},*/
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
			
		},
		watch:{
			
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
					if((isNaN(e.val) || e.val >150) || e.val<0) {
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
			},
			/*blur出分数框*/
			fillMark(sub){
				let mark = sub.val;
				sub.focus = false;
				if((isNaN(mark) || mark >150) || mark<0) {
					//sub.val = '';
					sub.error = true;
					this.fields.scores.error = true;
					this.fields.scores.msg = '不是有效的分数数值';
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
			checkAll(){
					let allchecked = true;
					for(var field in this.fields){
						if(!this.handleValidate(this.fields[field])) allchecked = false;
					}
					if(allchecked) {
						this.$emit('allCheck',this.fields);
						Bus.$emit('changeName',this.fields.name.val);
					}
			},
			focusing(field){
				this.fields[field].focus = true;
				this.fields[field].error = false;
			},
			/*点击科目*/
			clickSubject(){
				this.fields.subject.error = false;
				this.subjectField = [];
			},
			/*选择文科理科下拉框*/
			clickOption(id){
				this.learningType = id==='E' ?'文科':'理科';
			},
			submit(){
				this.checkAll();
			}
		}
	}
</script>
<style scoped lang='less'>
	@import '../../assets/lib/userinfoForm.less';
	@baseColor:#55b7f8;
	#beforeenter_container{
		width: 744px;
		margin: 50px auto;
	    padding:45px 50px;
	    position: relative;
	    border:1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        overflow: hidden;
        &:before{
            content:'';
            width: 30px;
            height: 30px;
            position: absolute;
            top:0;
            right:0;
            background: url(../../assets/img/index/mini.png) no-repeat;
        }
	}
	#enter_title{
		width: 580px;
		height: 48px;
		line-height: 48px;
		font-size: 20px;
		color:@baseColor;
		background: #f8f8f8;
		text-align: center;
		margin:0 auto;
	}

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
	.btn{
		width: 84px;
		height: 30px;
		line-height: 30px;
		float: right;
		margin-top: 20px;
		margin-bottom: 70px;
		&:hover{
			background:@baseColor;
			color:#fff;
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