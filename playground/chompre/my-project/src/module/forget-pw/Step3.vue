<template>
	<!--包住form表单的-->
	<div id='form_wrapper' style="font-size:20px">
		<validation name="validation1">
			<div class="common-field" v-for="field in fields" :class="field.class">
				<label :for="field.id">{{field.name}}</label>
				<div class="input-container" :class="{active:status[field.id].active, warn:status[field.id].result}">
					<validity :ref="field.id" :field="field.id" :validators="field.validator">
							<input :id="field.id" type="text"  :placeholder="field.placeholder" @blur="handleValidate(field.id)" @focus="hideMsg">
					</validity>
				</div>
				<p class="error" v-if="status[field.id].result">{{status[field.id].msg}}</p>
			</div>
			<!--<pre style="font-size:12px">{{$validation}}</pre>-->
		</validation>
		<div class="account-btn">下一步</div>
	</div>
</template>
<script>
	import a from 'vue-validator';
	export default{
		name:'Vali',
		mounted(){
		},
		data(){
			return{
				fields:[{
		            id: 'pw',
		            class: 'pw-field',
		            name: 'Contraseña',
		            placeholder: '输入6-20位密码',
		            error: '',
		            validator: { required: true, minlength: 6, maxlength: 20}
		          }, {
		            id: 'repw',
		            class: 'repw-field',
		            name: '重复密码',
		            placeholder: '请再次输入6-20位密码',
		            error: '',
		            validator: { required: true, equalTo: 'pw'}
		          }]
			}
		},
		validators:{
			equalTo(val){
				return false;
			}
		},
		computed:{
			status(){
				var status = {};
				this.fields.forEach((field)=>{
					status[field.id] = {result: false, msg: '', active:false};
				})
				try{
					if(this.$validation.validation1.pw.invalid) {
						status.pw.result = true;
						var err0 = this.$validation.validation1.pw.errors[0].validator;
						if(err0 === 'required') status.pw.msg = '密码不能为空';
						else if(err0 === 'minlength') status.pw.msg = '密码长度最短为6位';
						else if(err0 === 'maxlength') status.pw.msg = '密码长度最长为20位'
					}
					if(this.$validation.validation1.repw.invalid) {
						status.repw.result = true;
						var err0 = this.$validation.validation1.repw.errors[0].validator;
						if(err0 === 'required') status.repw.msg = '重复密码不能为空';
						else if(err0 === 'equalTo') status.repw.msg = '两次密码输入不一致';
					}
				} catch(err) {}
				return status;
			},
		},
		methods:{
			handleValidate(validity) {
				this.$refs[validity][0].validate();
			},
			hideMsg(e){
				var field = e.target.id;
				this.status[field].result = false;
				this.status[field].active = true;
				console.log(this.status.pw)
			}
		}
	}
</script>
<style scoped lang='less'>
	@baseColor: #d42b1e;
	#form_wrapper{
		font-size: 20px;
	    display: inline-block;
	    margin-top: 45px;
	    margin-bottom: 40px;
	    width:100%;
	    min-width: 300px;
	}
	.common-field{
		margin: 6px auto;
	}
</style>