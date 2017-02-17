<template>
	<div id="personal_container">
		<div id="personal_main_container">
			<personalside :activeId=2></personalside>
			<div id="personal_right_container">
				<validation name="validation1">
					<h1>收货地址管理</h1>
					<h3>{{status.title}}</h3>
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
					<label class="check-container">
						<input type="checkbox" value="1" v-model="isDefault">
						<span class="radio-input"></span>
						<span>设置为默认地址</span>
					</label>
					<div class="side-btn" @click="save">保存</div>
				</validation>
				<div class="table-container">
					<personaltable
					tableWid="913px"
					:cols="table.cols"
					:tds="table.tds"
					@editar="editar"
					@deletar="pop.show=true"></personaltable>
				</div>
			</div>
		</div>
		<!-- 删除弹窗 -->
		<pop :pop="pop">
			<div id="delete_container">
				<p>您确定要删除该收货地址吗？</p>
				<div class="btn-container">
					<div class="btn" @click="deletar">确认删除</div>
					<div class="btn reverse">关闭</div>
				</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import a from 'vue-validator';
	import personalside from '../../components/PersonalSide.vue'
	import personaltable from '../../components/Table.vue'
	import pop from '../../components/Pop.vue';
	import {myAlert} from '../../assets/js/utils.js'
	export default{
		name:'receipt',
		data(){
				return{
					//当前页面状态
					status:{
						title:'添加新地址',
						type:0
					},
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
				        }
			    },
			    isDefault:'',
			    addressId:'',
			    table:{
				    	cols:[{
						name:'名字',
						key:'receive_name',
						width:'10%'
					},{
						name:'R.U.T',
						key:'idcard',
						width:'10%'
					},{
						name:'手机号',
						key:'receive_mobile',
						width:'20%'
					},{
						name:'地区',
						key:'receive_address',
						width:'20%'
					},{
						name:'城市',
						key:'receive_city',
						width:'15%'
					},{
						name:'详细地址',
						key:'receive_address',
						width:'20%'
					},{
						name:'操作',
						key:'selected',
						width:'15%'
					}],
					tds:{
					//这里用了对象是为了考虑到修改地址后保存应该更新对应地址
					1:{
						address_id: 1,
		                user_id: 100093,
		                receive_name: "王美丽",
		                receive_mobile: "18868028394",
		                receive_city: "杭州市",
		                receive_area: "西湖区",
		                receive_address: "三墩镇三墩人民公园东门",
		                selected: 0,
		                idcard: ""
					},
					16:{
						address_id: 16,
		                user_id: 100093,
		                receive_name: "王美丽",
		                receive_mobile: "18868028394",
		                receive_city: "杭州市",
		                receive_area: "西湖区",
		                receive_address: "三墩镇三墩人民公园东门",
		                selected: 1,
		                idcard: ""
					}
				}
			    },
			    pop:{
			    	show:false,
			    	style:{width:'780px',height:'292px'}
			    }
			}
		},
		mounted(){
			//拉取地址列表
			this.$http.post('',{name:'zl.shopping.sys.address.list'}).then((response)=>{
				let addressList = response.body.data.list;
				addressList.forEach((a)=>{
					this.table.tds[a.address_id] = a;
					console.log(this.table.tds)
				})
			})
			//if编辑地址
			if(location.hash === '#editar') {
				let addressInfo = JSON.parse(localStorage.getItem('address'));
				this.status = {title:"编辑地址", type:1};
				this.fields.name.val = addressInfo.receive_name;
				this.fields.rut.val = addressInfo.idcard;
				this.fields.phone.val = addressInfo.receive_mobile;
				this.fields.district.val = addressInfo.receive_area;
				this.fields.city.val = addressInfo.receive_city;
				this.fields.address.val = addressInfo.receive_address;
				this.isDefault = addressInfo.selected;
				this.addressId = addressInfo.address_id;
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
					if(this.$validation.validation1.phone.invalid) {
						this.fields.phone.error = true;
						var err0 = this.$validation.validation1.phone.errors[0].validator;
						if(err0 === 'required') this.fields.phone.msg = '手机不能为空';
						else this.fields.phone.msg = '手机不合法';
					} else if(this.$validation.validation1.phone.valid){
						this.fields.phone.error = false;
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
					if(this.$validation.validation1.address.invalid) {
						this.fields.address.error = true;
						this.fields.address.msg = '详细地址不能为空';
					} else if(this.$validation.validation1.address.valid){
						this.fields.address.error = false;
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
			},
			save(){
				let n = 7;
				for (var validity in this.$refs){
					this.$refs[validity][0].validate(() => {
						n--;
						if(n>0) return;
						if(this.$validation.validation1.invalid) return;
						else {
							let request = {
								receive_name: this.fields.name.val,
								idcard: this.fields.rut.val,
								receive_address: this.fields.address.val,
								receive_area: this.fields.district.val,
								receive_city: this.fields.city.val,
								receive_mobile: this.fields.phone.val,
								selected: Number(this.isDefault)
							}
							// 新增地址
							if(this.status.type === 0) {
								request.name = 'zl.shopping.sys.address.add';
								this.$http.post('',request).then((response)=>{
									if(response.body.code === 1000)
										request.address_id = response.body.data.address_id;
										this.table.tds['100'] = request;
										this.fields.name.val = this.fields.rut.val = this.fields.address.val = 
										this.fields.district.val = this.fields.city.val = 
										this.fields.phone.val = this.isDefault = '';
								})
							}
							// 保存地址
							else {
								request.name = 'zl.shopping.sys.address.update',
								request.address_id = Number(this.addressId);
								this.$http.post('',request).then((response)=>{
									if(response.body.code === 1000)
										request.address_id = response.body.data.address_id;
										this.table.tds[request.address_id] = request;
								})
							}
							delete request.name;
							myAlert('保存成功');
						}
					});
				}
			},
			//编辑
			editar(td){
				localStorage.setItem('address',JSON.stringify(td));
				window.open("./address.html#editar");
			},
			// 删除地址
			deletar(id){
				id = 217;
				this.$http.post('',{
					name:'zl.shopping.sys.address.del',
					address_id:id
				}).then((response)=>{
					// 删除这一条地址
					if(response.body.code === 1000) console.log('删除成功!')
				})
			}
		},
		components:{personalside, personaltable, pop}
	}
</script>
<style scoped lang="less">
	@baseColor: #d42b1e;
</style>