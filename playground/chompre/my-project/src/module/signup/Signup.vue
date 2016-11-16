<template>
	<div id='signup_container' class="account-container">
			<h3>Ingresar</h3>
			<!--大框开始-->
			<div class="form-container">
				<!--包住form表单的-->
				<div id='form_wrapper'>
					<validation name="validation1">
						<ul class="form-group">
							<li class="common-field" v-for="field in fieldsA" :class="field.class">
								<label :for="field.id">{{field.name}}</label>
								<div class="input-container">
									<validity :ref="field.id" :field="field.id" :validators="field.validator">
										<input :id="field.id" type="text" @input="handleValidate" :placeholder="field.placeholder">
									</validity>
								</div>
								<p class="error" v-if="field.error">xxx</p>
							</li>
						</ul>
						<ul class="form-group">
							<li class="common-field" v-for="field in fieldsB" :class="field.class">
								<label :for="field.id">{{field.name}}</label>
								<div class="input-container">
									<validity :ref="field.id" :field="field.id" :validators="field.validator">
										<input :id="field.id" type="text" @input="handleValidate" :placeholder="field.placeholder"  v-if="!field.isSelect">
										<select :id="field.id" v-else>
											<option v-for="option in field.options">{{option}}</option>
										</select>
									</validity>
								</div>
								<p class="error" v-if="field.error">xxx</p>
							</li>
						</ul>
						<div class="clear"></div>
						<!--<pre style="font-size:12px">{{$validation}}</pre>-->
				</validation>
				<div class="account-btn">Registrarme</div>
			</div>
		</div>
	</div>
</template>
<script>
	import a from 'vue-validator';
	export default{
		name: 'signup',
		data(){
			return{
				fieldsA:[{
		            id: 'email',
		            class: 'email-field',
		            name: '邮箱',
		            placeholder: '请输入邮箱',
		            error: '',
		            validator: { required: true}
		          },{
		            id: 'remail',
		            class: 'remail-field',
		            name: '重复邮箱',
		            placeholder: '请再次输入邮箱',
		            error: '',
		            validator: { required: true}
		          },{
		            id: 'pw',
		            class: 'pw-field',
		            name: '密码',
		            placeholder: '请输入6-20位密码',
		            error: '',
		            validator: { required: true}
		          },{
		            id: 'repw',
		            class: 'repw-field',
		            name: '重复密码',
		            placeholder: '再次输入6-20位密码',
		            error: '',
		            validator: { required: true}
		          }],
		        fieldsB:[{
		            id: 'name',
		            class: 'name-field',
		            name: '名字',
		            placeholder: '请输入用户名',
		            error: '',
		            validator: { required: true}
		          },{
		            id: 'id',
		            class: 'id-field',
		            name: '身份证',
		            placeholder: '请输入身份证',
		            error: '',
		            validator: { required: true}
		          },{
		            id: 'question',
		            class: 'question-field',
		            name: '问题设置',
		            placeholder: '请选择问题',
		            error: '',
		            validator: { required: true},
		            isSelect: true,
		            options:['问题A','问题B']
		          },{
		            id: 'answer',
		            class: 'answer-field',
		            name: '答案',
		            placeholder: '请填写答案',
		            error: '',
		            validator: { required: true}
		          }]
			}
		},
		methods: {
			handleValidate(e) {
				e.target.$validity.validate();
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	#signup_container{
		max-width: 950px;
		width: 100%;
	}
	#form_wrapper{
		font-size:20px;
		margin:40px 60px;
		overflow: hidden;
		text-align: center;
	}
	select{
		width: 100%;
		border: none;
	}
	@media all and (min-width: 840px){
		.form-group{
			&:nth-of-type(2n){
				float: right;
			}
			&:nth-of-type(2n+1){
				float: left;
			}
		}
	}
	@media all and (max-width: 840px){
		.form-group{
			display: inline-block;
		}
	}
</style>