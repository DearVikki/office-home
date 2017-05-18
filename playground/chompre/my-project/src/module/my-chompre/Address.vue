<template>
	<div id="personal_right_container">
		<!-- 收货地址管理 -->
		<h1>Gestión de direcciones de envío</h1>
		<h3>{{status[statusType].title}}</h3>
		<div id="address_container">
			<addressPop :address="address" @saveAddress="saveAddress"></addressPop>
		</div>
		<div class="table-container" v-show="Object.keys(table.tds).length">
			<personaltable
			tableWid="913px"
			:cols="table.cols"
			:tds="table.tds"
			@editar="editar"
			@deletar="callPop"></personaltable>
		</div>
		<!-- 删除弹窗 -->
		<pop :pop="pop">
			<div id="delete_container">
				<p>您确定要删除该收货地址吗？</p>
				<div class="btn-container">
					<div class="btn" @click="deletar">确认删除</div>
					<div class="btn reverse" @click="pop.show = false">关闭</div>
				</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import personaltable from './Table.vue'
	import addressPop from '../../components/Address.vue';
	import pop from '../../components/Pop.vue';
	import {myAlert} from '../../assets/js/utils.js'
	export default{
		name:'receipt',
		data(){
			return{
				//当前页面状态
				status: [{
					title:'Añadir nueva dirección',
					type:0
				},{
					title:"Editar dirección",
					type:1
				}],
				statusType:0,
				address:{},
				isDefault:'',
				addressId:'',
				deleteItem:'',
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
						key:'receive_area',
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
					tds:[]
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
				this.table.tds = response.body.data.list;
			})
			//if编辑地址
			if(this.$route.path === '/addressEdit') {
				this.address = JSON.parse(localStorage.getItem('address'));
			}
		},
		methods:{
			saveAddress(address, type){
				// 新增
				if(!type) {
					this.table.tds.unshift(address);
					myAlert('新增成功')
				}
				else {
					// 法一：
					this.table.tds.forEach((e,i) => {
						if(e.address_id === address.address_id) {
							this.table.tds[i] = address;
							this.table.tds[i].good = 'dd';
						}
						myAlert('保存成功');
						this.$router.push('address');
					})
					// this.table.tds.push({receive_name: 'testObj'});
					// this.table.tds.pop();
					// 法二不成功：
					// let tds = this.table.tds;
					// tds.forEach((e,i) => {
					// 	if(e.address_id === address.address_id) {
					// 		tds[i] = address;
					// 		tds[i].good = 'dd';
					// 	}
					// 	myAlert('保存成功');
					// 	this.$router.push('address');
					// })
					// this.table.tds = tds;
					console.log(this.table.tds)
					// this.$forceUpdate();
				}
				this.address = {};
			},
			//编辑
			editar(td){
				localStorage.setItem('address',JSON.stringify(td));
				this.address = td;
				this.$router.push('addressEdit');
				window.scrollTo(0,0);
			},
			// 删除弹窗
			callPop(deleteItem){
				this.pop.show=true;
				this.deleteItem = deleteItem;
			},
			// 删除地址
			deletar(){
				this.$http.post('',{
					name:'zl.shopping.sys.address.del',
					address_id: this.deleteItem.address_id
				}).then((response)=>{
					// 删除这一条地址
					if(response.body.code === 1000) myAlert('删除成功!')
					this.pop.show = false;
					this.table.tds.forEach((e,i) => {
						if(e.address_id === this.deleteItem.address_id) this.table.tds.splice(i,1);
					})
				})
			}
		},
		watch:{
			'$route'(){
				if(this.$route.path === '/addressEdit') this.statusType = 1;
				else this.statusType = 0;
			}
		},
		components:{personaltable, pop, addressPop}
	}
</script>
<style scoped lang="less">
	@baseColor: #d42b1e;
	#address_container{
		margin: 0 62px;
	}
	#delete_container{
		margin-top: 20px;
	}
	.btn-container{
		margin-top: 100px;
	}
</style>