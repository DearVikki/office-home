<template>
	<div id="personal_container">
		<div id="personal_main_container">
			<personalside :activeId=1></personalside>
			<div id="personal_right_container">
				<validation name="validation1">
					<h1>收货地址管理</h1>
					<h3>添加新地址</h3>
					<div class="input-group" v-for="(value, field) in fields" :class="fields[field].class">
						<label :for="fields[field].id">{{fields[field].name}}</label>
						<div class="input-container"
						:class="{ active: fields[field].error || fields[field].focus, big:fields[field].id === 'address'}">
							<validity :ref='fields[field].id' :field='fields[field].id' :validators="fields[field].validator">
								<input
								v-if="fields[field].id !== 'address'"
								:id="fields[field].id" type="text"
								:placeholder="fields[field].placeholder"
								@blur="handleValidate(fields[field].id)"
								@focus="focusing(fields[field].id)"
								v-model="fields[field].val">
								<textarea
								v-else
								:id="fields[field].id" type="text"
								:placeholder="fields[field].placeholder"
								@blur="handleValidate(fields[field].id)"
								@focus="focusing(fields[field].id)"
								v-model="fields[field].val"></textarea>
							</validity>
							<p class="error" v-show="fields[field].error && !fields[field].focus">{{fields[field].msg}}</p>
						</div>
					</div>
					<div class="check-container">
						<label >
						<input type="checkbox">
						<span class="radio-input"></span>
						<span>设置为默认地址</span>
					</label>
					</div>
				</validation>
			</div>
		</div>
	</div>
</template>
<script>
	import a from 'vue-validator';
	import personalside from '../../components/PersonalSide.vue'
	export default{
		name:'receipt',
		data(){
				return{
					fields:{
						name: {
				            id: 'name',
				            class: 'name-field',
				            name: '名字',
				            placeholder: '请输入',
				            error: false,
				            msg: '',
				            validator: { required: true},
				            val: '',
							focus: false
			          	},
			         	rut: {
				            id: 'rut',
				            class: 'rut-field',
				            name: 'R.U.T',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validator: { required: true},
				            val: '',
							focus: false
				        },
				        address: {
				            id: 'address',
				            class: 'address-field',
				            name: '详细地址',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validator: { required: true},
				            val: '',
							focus: false
				        },
				        district: {
				            id: 'district',
				            class: 'district-field',
				            name: '地区',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validator: { required: true},
				            val: '',
							focus: false
				        },
				        city: {
				            id: 'city',
				            class: 'city-field',
				            name: '城市',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validator: { required: true},
				            val: '',
							focus: false
				        },
				        phone: {
				            id: 'phone',
				            class: 'phone-field',
				            name: '手机',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validator: { required: true, isNumber:true},
				            val: '',
							focus: false
				        }
			    }
			}
		},
		validators:{
			isNumber(val){
				return parseInt(val) === 'NaN' ? false : true;
			}
		},
		watch:{
			$validation(){
				try{
					if(this.$validation.validation1.name.invalid) {
						this.fields.name.error = true;
						this.fields.name.msg = '名字不能为空';
					} else if(this.$validation.validation1.name.valid){
						this.fields.name.error = false;
					}
					if(this.$validation.validation1.rut.invalid) {
						this.fields.rut.error = true;
						this.fields.rut.msg = 'R.U.T不能为空';
					} else if(this.$validation.validation1.rut.valid){
						this.fields.rut.error = false;
					}
					if(this.$validation.validation1.address.invalid) {
						this.fields.address.error = true;
						this.fields.address.msg = '详细地址不能为空';
					} else if(this.$validation.validation1.address.valid){
						this.fields.address.error = false;
					}
					if(this.$validation.validation1.district.invalid) {
						this.fields.district.error = true;
						this.fields.district.msg = '地区不能为空';
					} else if(this.$validation.validation1.district.valid){
						this.fields.district.error = false;
					}
					if(this.$validation.validation1.city.invalid) {
						this.fields.city.error = true;
						this.fields.city.msg = '城市不能为空';
					} else if(this.$validation.validation1.city.valid){
						this.fields.city.error = false;
					}
					if(this.$validation.validation1.phone.invalid) {
						this.fields.phone.error = true;
						var err0 = this.$validation.validation1.phone.errors[0].validator;
						if(err0 === 'required') this.fields.phone.msg = '手机不能为空';
						else this.fields.phone.msg = '手机不合法';
					} else if(this.$validation.validation1.phone.valid){
						this.fields.phone.error = false;
					}
				} catch(err) {}
			}
		},
		methods:{
			handleValidate(field){
				this.$refs[field][0].validate(()=>{
					console.log(this.$validation.validation1.phone)
				});
				this.fields[field].focus = false;
			},
			focusing(field){
				this.fields[field].focus = true;
			}
		},
		components:{personalside}
	}
</script>
<style scoped lang="less">
	
</style>