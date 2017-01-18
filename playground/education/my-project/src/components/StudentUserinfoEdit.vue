<template>
	<div id="form_container">
		<div class="common-field"
		v-for="(value, field) in fields"
		:class="fields[field].class">
			<label :for="fields[field].id">{{fields[field].name}}</label>
			<div class="input-container">
				<input
				type="text"
				v-if="((fields[field].id !== 'sex') && (fields[field].id !=='scores')) && ((fields[field].id !== 'learningType') && (fields[field].id !=='grade'))"
				:id="fields[field].id"
				:ref="fields[field].id"
				:placeholder="fields[field].placeholder"
				:class="{ warn: fields[field].error, active: fields[field].focus}"
				@blur="handleValidate(fields[field])"
				@focus="focusing(fields[field].id)"
				v-model="fields[field].val">
				<!--性别/分科/年级下拉框-->
				<select
				v-if="(fields[field].id === 'sex' ||fields[field].id === 'learningType') || (fields[field].id === 'grade')"
				:ref="fields[field].id"
				v-model="fields[field].val">
					<option
					v-for="option in fields[field].options"
					:value="option.value">{{option.title}}</option>
				</select>
				<!--补习学科选择框-->
				<div class="checkbox-container"
				v-if="fields[field].id === 'scores'">
					<div class="checkbox-group"
					v-for="checkbox in fields[field].subs"
					:ref="fields[field].id">
						<label>
							<input type="checkbox"
							:checked="checkbox.checked"
							@change="checkbox.checked = !checkbox.checked">
							<span class="checkbox-input"></span>
						</label>
						<span class="checkbox-title">{{checkbox.title}}</span>
						<span class="goal">
							<input maxlength="3"
							v-model="checkbox.val"
							@blur="fillMark(checkbox)"
							>
							<span class="fullMark">/{{checkbox.fullMark}}</span>
						</span>
					</div>
				</div>
				<p class="error" v-if="fields[field].error && !fields[field].focus">{{fields[field].msg}}</p>
			</div>
		</div>
</template>
<script>
	import Bus from '../assets/js/bus.js';
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
			            validator: { required: {msg:'姓名不能为空'} },
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
			            validator: { required: {msg:'QQ不能为空'}, isNum:{msg:'QQ号不合法'}},
			            error: false,
			            msg:'',
			            val:'',
			            focus: false
		        	},
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
		        			fullMark:150,
		        			checked:false
		        		},{
		        			title:'数学',
		        			value:'B',
		        			val:'',
		        			fullMark:150,
		        			checked:false
		        		},{
		        			title:'英语',
		        			value:'C',
		        			val:'',
		        			fullMark:150,
		        			checked:false
		        		},{
		        			title:'理综',
		        			value:'D',
		        			val:'',
		        			fullMark:300,
		        			checked:false
		        		},{
		        			title:'文综',
		        			value:'F',
		        			val:'',
		        			fullMark:300,
		        			checked:false
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
		        			value:''
		        		}]
		        	},
		        	school: {
			            id: 'school',
			            class: 'school-field',
			            name: '所在学校',
			            placeholder: '',
			            validator: {required: {msg:'学校不能为空'}},
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
		mounted(){
			//先填数据
			this.$http.get('?name=education.sys.user.info').then((response)=>{
				let info = response.body.data.info;
				this.fields.name.val =  JSON.parse(localStorage.getItem('user')).user_name;
				this.fields.sex.val = info.sex;
				this.fields.qq.val = info.qq;
				this.fields.scores.subs[0].val = Number(info.chinese) || '';
				this.fields.scores.subs[1].val = Number(info.math) || '';
				this.fields.scores.subs[2].val = Number(info.english) || '';
				this.fields.scores.subs[3].val = Number(info.multiple_l) || '';
				this.fields.scores.subs[4].val = Number(info.multiple_w) || '';
				this.fields.learningType.val = info.learning_type;
				this.fields.school.val = info.school;
				this.fields.grade.val = info.grade;
				// 加上补习学科的勾
				if(Number(info.chinese)) this.fields.scores.subs[0].checked=true;
				if(Number(info.math)) this.fields.scores.subs[1].checked=true;
				if(Number(info.english)) this.fields.scores.subs[2].checked=true;
				if(Number(info.multiple_l)) this.fields.scores.subs[3].checked=true;
				if(Number(info.multiple_w)) this.fields.scores.subs[4].checked=true;
			})
		},
		watch:{
			checkAll(){
				let allchecked = true;
				for(var field in this.fields){
					if(!this.handleValidate(this.fields[field])) allchecked = false;
				}
				if(allchecked) {
					this.$emit('allCheck',this.fields);
					Bus.$emit('changeName',this.fields.name.val);
				}
			}
		},
		methods:{
			isPhone(val){
				return /^1[34578]\d{9}$/.test(val);
			},
			isNum(val){
				return !isNaN(val);
			},
			required(val){
				return val!=='';
			},
			handleValidate(field) {
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
	#form_container .common-field.learningType-field{
		margin-top: 15px;
	}
</style>