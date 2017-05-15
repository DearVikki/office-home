<template>
	<div id="personal_container">
		<div id="personal_main_container">
			<div id="personal_right_container">
					<!-- 收货地址管理 -->
					<h1>Gestión de direcciones de envío</h1>
					<h3>{{status.title}}</h3>
					<div class="input-group" v-for="field in fields" :class="field.class">
						<label :for="field.id">{{field.name}}</label>
						<div class="input-container"
						:class="{ active: field.error || field.focus, big:field.id === 'address'}">
								<input
								v-if="field.id !== 'address'"
								:id="field.id" type="text"
								:placeholder="field.placeholder"
								@blur="fieldBlur(field)"
								@focus="fieldFocus(field)"
								v-model="field.val">
								<textarea
								v-else
								:id="field.id" type="text"
								:placeholder="field.placeholder"
								@blur="fieldBlur(field)"
								@focus="fieldFocus(field)"
								v-model="field.val"></textarea>
							<p class="error" v-show="field.error && !field.focus">{{field.msg}}</p>
						</div>
					</div>
					<label class="check-container">
						<input type="checkbox" value="1" v-model="isDefault">
						<span class="radio-input"></span>
						<span>Establecer como dirección por defecto</span>
					</label>
					<div class="side-btn" @click="save">Guardar</div>
				<div class="table-container" v-show="Object.keys(table.tds).length">
					<personaltable
					tableWid="913px"
					:cols="table.cols"
					:tds="table.tds"
					@editar="editar"
					@deletar="callPop"></personaltable>
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
	import personaltable from '../../components/Table.vue'
	import pop from '../../components/Pop.vue';
	import {myAlert} from '../../assets/js/utils.js'
	export default{
		name:'receipt',
		data(){
				return{
					//当前页面状态
					status:{
						title:'Añadir nueva dirección',
						type:0
					},
					fields:{
						name: {
				            id: 'name',
				            class: 'name-field',
				            name: 'Consignatario',
				            placeholder: '请输入',
				            error: false,
				            msg: '',
				            validators: { required: { msg: '名字不能为空' }},
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
				            validators: { required: { msg: 'rut不能为空' } },
				            val: '',
							focus: false
				        },
				        phone: {
				            id: 'phone',
				            class: 'phone-field',
				            name: 'Tel',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: {
				            	required: { msg: '手机号不能为空' },
				            	isNumber: { msg: '手机号不合法' }
				            },
				            val: '',
							focus: false
				        },
				        district: {
				            id: 'district',
				            class: 'district-field',
				            name: 'Comuna',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: { required: { msg: '地区不能为空' }},
				            val: '',
							focus: false
				        },
				        city: {
				            id: 'city',
				            class: 'city-field',
				            name: 'Ciudad',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: { required: { msg: '城市不能为空' }},
				            val: '',
							focus: false
				        },
				         address: {
				            id: 'address',
				            class: 'address-field',
				            name: 'Dirección',
				            placeholder: '请输入',
				            error: false,
				            msg:'',
				            validators: { required:  { msg: '详细地址不能为空' }},
				            val: '',
							focus: false
				        }
			    },
			    isDefault:'',
			    addressId:'',
			    deletarId:'',
			    table:{
				    cols:[{
						name:'Consignatario',
						key:'receive_name',
						width:'20%'
					},{
						name:'R.U.T',
						key:'idcard',
						width:'10%'
					},{
						name:'Tel',
						key:'receive_mobile',
						width:'20%'
					},{
						name:'Comuna',
						key:'receive_address',
						width:'20%'
					},{
						name:'Ciudad',
						key:'receive_city',
						width:'15%'
					},{
						name:'Dirección',
						key:'receive_address',
						width:'20%'
					},{
						name:'操作',
						key:'selected',
						width:'15%'
					}],
					tds:{
						//这里用了对象是为了考虑到修改地址后保存应该更新对应地址
						// 1:{
						// 	address_id: 1,
			   //              user_id: 100093,
			   //              receive_name: "王美丽",
			   //              receive_mobile: "18868028394",
			   //              receive_city: "杭州市",
			   //              receive_area: "西湖区",
			   //              receive_address: "三墩镇三墩人民公园东门",
			   //              selected: 0,
			   //              idcard: ""
						// }
					}
			    },
			    pop:{
			    	show:false,
			    	style:{width:'780px',height:'292px'}
			    }
			}
		},
		mounted(){
			if(!localStorage.getItem('userInfo')) location.href = './login.html';
			//拉取地址列表
			this.$http.post('',{name:'zl.shopping.sys.address.list'}).then((response)=>{
				let addressList = response.body.data.list, tds = {};
				addressList.forEach((a)=>{
					// 这样直接赋值不行喔 要整个替换喔
					// this.table.tds[a.address_id] = a;
					tds[a.address_id] = a;
				})
				this.table.tds = tds;
			})
			//if编辑地址
			if(location.hash === '#editar') {
				let addressInfo = JSON.parse(localStorage.getItem('address'));
				this.status = {title:"Editar dirección", type:1};
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
		methods:{
			save(){
				if(!this.checkAll(this.fields)) return;
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
			},
			//编辑
			editar(td){
				localStorage.setItem('address',JSON.stringify(td));
				window.open("./address.html#editar");
			},
			// 删除弹窗
			callPop(id){
				this.pop.show=true;
				this.deletarId = id;
			},
			// 删除地址
			deletar(){
				this.$http.post('',{
					name:'zl.shopping.sys.address.del',
					address_id: this.deletarId
				}).then((response)=>{
					// 删除这一条地址
					if(response.body.code === 1000) myAlert('删除成功!')
						this.pop.show = false;
						delete this.table.tds[this.deletarId];
				})
			}
		},
		components:{personaltable, pop}
	}
</script>
<style scoped lang="less">
	@baseColor: #d42b1e;
	#delete_container{
		margin-top: 20px;
	}
	.btn-container{
		margin-top: 100px;
	}
</style>