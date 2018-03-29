<template>
	<div>
    	<div class="empty-tip" v-if="!contentLoaded">{{lang.LOADING}}...</div>
		<div id="order_container" v-if="contentLoaded">
			<div class="smallGrey cp" style="color:#bbb" @click="back">Mis pedidos></div>
			<div class="title">{{lang.ORDER_DETAIL}}
				<span class="fr smallGrey time">{{time}}</span>
				<!-- 新增地址 -->
				<span class="fr smallGrey" v-if="order_info.status === 1">{{lang.TO_PAY}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 2">{{lang.TO_SEND}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 3">{{lang.TO_RECEIVE}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 4">{{lang.TO_COMMENT}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 5">{{lang.DEAL_CLOSE}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 6">{{lang.DEAL_SUCCESS}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 7">{{lang.RESEND_GOODS_ING}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 8">{{lang.CHANGE_ING}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 9">{{lang.RESEND_GOODS_SUCCESS}}</span>
				<span class="fr smallGrey" v-if="order_info.status === 10">{{lang.CHANGE_SUCCESS}}</span>
			</div>
			<div id="order_address">
				<img src="~assets/img/order/location.png">
				<span class="txt" :title="address_info.receive_name">{{address_info.receive_name}} </span>
				<span class="txt" :title="address_info.idcard">{{address_info.idcard}}</span>
				<span class="txt" :title="address_info.receive_mobile">{{address_info.receive_mobile}}</span>
				<span class="txt" :title="address_info.address">
					{{address_info.address}}
				</span>
			</div>
			<div id="order_delivery">
				<img src="~assets/img/order/delivery.png">
				<span class="txt" :title="address_info.receive_name">{{lang.DELIVERY_NO}}: {{order_info.ems_no==-1?lang.NO_DELIVERY_INFO:order_info.ems_no}} </span>
			</div>
			<!-- <div id="order_invoice">
				<img src="~assets/img/order/invoice.png">
				<span class="txt name" :title="invoice.selected.company_name">{{invoice.selected.company_name}}</span>
				<span class="txt" :title="invoice.selected.company_taxid">{{invoice.selected.company_taxid}}</span>
				<span class="txt mobile" :title="invoice.selected.company_tel">{{invoice.selected.company_tel}}</span>
				<span class="txt address" :title="invoice.selected.company_address+' '+invoice.selected.company_area+' '+invoice.selected.company_city">
					{{invoice.selected.company_address}} {{invoice.selected.company_area}} {{invoice.selected.company_city}}
				</span>
			</div> -->
			<div id="order_main">
        <a id="order_dealer" style="fontSize:'15px'">{{dealer_info.dealer_name}}</a>
				<div id="order_header">
					<div class="header-item"
					v-for="h in headers"
					:style="h.style">
						{{h.name}}
						<span class="border"></span>
					</div>
				</div>
				<div id="order_goods">
					<div class="goods-item" v-for="(goods, i) in goods_info" :key="i">
						<a :href="'./product.html?id='+goods.pre_goods_id">
							<img :src="goods.goods_pic">
							<div class="goods-title">{{goods.goods_name}}</div>
						</a>
						<div class="goods-detail">
							<p v-for="d in goods.description">{{d}}</p>
						</div>
						<div class="goods-price">${{goods.price}}</div>
						<div class="goods-num">{{goods.goods_num}}</div>
						<div class="goods-price-all">${{goods.price*goods.goods_num}}</div>
            <!-- 商品可进行的处理操作/状态 -->
            <div class="goods-action"  @click="selectedGoodsIndex=i">
              <div v-if="order_info.status === 4 && goods.is_comment == 0 && goods.status == 0">
                <p class="btn main" @click="comment.pop.show = true">{{lang.COMMENT}}</p>
                <p class="btn" @click="returnPop.show = true">{{lang.REFUND}}</p>
								<p class="btn" @click="changePop.show = true">{{lang.CHANGE_GOODS}}</p>
              </div>
              <!-- 交易成功 -->
              <div v-if="order_info.status === 4 && goods.is_comment == 1 || (order_info.status === 6)">
                <p>{{lang.DEAL_SUCCESS}}</p>
              </div>
              <!-- 待发货 -->
              <div v-if="order_info.status === 2 && goods.status == 0">
                <!-- <p>{{lang.TO_SEND}}</p> -->
                <p class="btn" @click="returnPop.show = true">{{lang.REFUND}}</p>
              </div>
               <!-- 待收货 -->
              <div v-if="order_info.status === 3">
                <p>{{lang.TO_RECEIVE}}</p>
              </div>
              <!-- 换货处理中 -->
              <div v-if="goods.status == 1">
                <p>{{lang.CHANGE_ING}}</p>
              </div>
              <!-- 换货完成 -->
              <div v-if="goods.status == 4">
                <p>{{lang.CHANGE_SUCCESS}}</p>
              </div>
              <!-- 退货处理中 -->
              <div v-if="goods.status == 2">
                <p>{{lang.RESEND_GOODS_ING}}</p>
              </div>
              <!-- 退货完成 -->
              <div v-if="goods.status == 3">
                <p>{{lang.RESEND_GOODS_SUCCESS}}</p>
              </div>
               <!-- 交易关闭 -->
              <div v-if="order_info.status == 5">
                <p>{{lang.DEAL_CLOSE}}</p>
              </div>
              <div v-if="goods.test">
                <p>{{lang.NO_ACTION}}</p>
              </div>
            </div>
					</div>
				</div>
			</div>
			<div id="conclu">
				{{lang.TOTAL}}:
				<span>${{totalPrice}}</span>
			</div>
		</div>
    <!-- 评价弹窗 -->
		<pop :pop="comment.pop" :popReset="commentPopReset">
			<div id="comment_inner_container">
				<textarea v-model="comment.content"></textarea>
				<div id="comment_pic_container">
					<div v-for="pic in comment.pics" class="pic">
						<img :src="pic">
					</div>
					<input type="file" accept="image/png, image/jpeg, image/gif" @change="filechange">
					<div id="add_pic" @click="clickInput"  @drop.prevent="filechange" @dragover.prevent v-show="comment.pics.length < 5">+</div>
				</div>
				<div id="comment_star_container">
					<span class="fl">{{lang.MAKE_CREDIT}}</span>
					<span class="fr">
						<starmark @markStar="markstar"></starmark>
					</span>
				</div>
				<div class="btn-container">
					<div class="btn" :class="{disabled:comment.uploading}"
					@click="uploadImg">
            <span v-if="comment.uploading">{{lang.COMMENTING}}..</span>
            <span v-else>{{lang.COMMENT}}</span>
          </div>
					<div class="btn reverse" @click="comment.pop.show = false">{{lang.CLOSE}}</div>
				</div>
        <p class="colored tip">{{comment.msg}}</p>
			</div>
		</pop>
		<!-- 换货弹窗 -->
		<pop :pop="changePop">
			{{lang.CONFIRM_CHANGE_GOODS_POP}}？
			<div class="btn-container">
				<div class="btn" @click="returnGoods(1)">{{lang.CHANGE_GOODS}}</div>
				<div class="btn reverse" @click="changePop.show = false">{{lang.CLOSE}}</div>
			</div>
		</pop>
		<!-- 退货弹窗 -->
		<pop :pop="returnPop">
			{{lang.CONFIRM_REFUND_POP}}
			<div class="btn-container">
				<div class="btn" @click="returnGoods(2)">{{lang.REFUND}}</div>
				<div class="btn reverse" @click="returnPop.show = false">{{lang.CLOSE}}</div>
			</div>
		</pop>
	</div>
</template>
<script>
	import '../../assets/lib/order-item.less'
	import {getParameterByName, timestamp, myAlert} from '../../assets/js/utils.js'
  import lang from '../../assets/js/language.js'
  import pop from '../../components/Pop.vue'
  import starmark from '../../components/Starmark.vue';
	export default{
		name:'orderdetail',
		data(){
			return{
        contentLoaded: false,
				id:'',
				time:'',
				address_info:'',
				invoice_info:'',
				delivery_info:'',
				order_info:'',
				dealer_info:{
					name:'示例店铺',
					id:''
				},
        goods_info:[],
        selectedGoodsIndex: '',
				headers:[{
					name:lang.PRODUCT_NAME,
					style:'width:32%'
				},{
					name:lang.PRODUCT_INFO,
					style:'width:15%'
				},{
					name:lang.PRODUCT_UNIT_PRICE,
					style:'width:10%'
				},{
					name:lang.NUM,
					style:'width:10%'
				},{
					name:lang.PRODUCT_TOTAL,
					style:'width:15%'
				},{
					name:lang.ACTION,
					style:'width:18%'
        }],
        comment:{
					content:'',
					pics:[],
					files:[],
					star:0,
          uploading: false,
          msg: '',
					pop:{
						show:false,
						style: {
							width:'780px',
							height:'500px',
							padding:'52px 120px 35px 120px'
						}
					}
				},
				changePop:{
					show:false,
					style:{
						width:'780px',
						minHeight:'292px',
						padding:'84px 120px 35px 120px'
					}
				},
				returnPop:{
					show:false,
					style:{
						width:'780px',
						minHeight:'292px',
						padding:'84px 120px 35px 120px'
					}
        },
				lang
			}
		},
		mounted(){
			this.id = getParameterByName('id');
			this.$http.post('',{
				name:'zl.shopping.sys.order.detail',
				order_id: this.id
			}).then((response)=>{
        this.contentLoaded = true;
				this.order_info = response.body.data.order;
				this.address_info = response.body.data.address_info;
				this.time = timestamp( response.body.data.order.start_time);
				let goods_info = [];
				response.body.data.goods_info.forEach((e)=>{
					e.description = e.description.split(' ').filter((d)=>{return d});
					goods_info.push(e);
				})
				this.goods_info = goods_info;
			})
		},
		computed:{
			totalPrice(){
				let p = 0;
				this.goods_info.forEach((e) => {
					p += e.price * e.goods_num;
				})
				return p;
			}
    },
    methods:{
    	back(){
    		history.back();
    	},
      clickInput(){
				document.querySelector('input[type=file]').click();
			},
			filechange(e){
				var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
				if (files.length > 4) {
					alert(lang.MAX_PIC_5);
					return;
        }
				Array.prototype.slice.call(files).forEach((e)=>{
          if(e.type.slice(0,5) !== 'image') {
            alert(e.name+ lang.NO_PIC);
            return;
          }
          else if(e.size > 5242680) {
            alert(lang.PIC_TOO_LARGE);
            return;
          }
					else this.displayImg(e);
				})
			},
			displayImg(file){
				this.comment.pics.push(window.URL.createObjectURL(file));
				this.comment.files.push(file);
			},
			markstar(n){
				this.comment.star = n;
			},
      uploadImg(){
        if(this.comment.uploading) return;
        if(!this.comment.content) {
          this.comment.msg = lang.FILL_IN_COMMENT;
          return;
        }
        if(!Number(this.comment.star)) {
           this.comment.msg = lang.FILL_IN_STAR;
          return;
        }
        this.comment.uploading = true;
          		let picData = [];
				var fm = new FormData();
				fm.append('name','zl.shopping.sys.upload.multi.img');
				this.comment.files.forEach((e)=>{
					fm.append('img[]',e);
				})
				this.$http.post('',fm).then((response)=>{
					// 因为没有图片的话返回的数据是data:[]...
					if(!Array.isArray(response.body.data)) {
          				response.body.data.list.forEach((e)=>picData.push(e.compress));
					}
					// 评价订单
					this.$http.post('',{
						name:'zl.shopping.sys.comment.order',
						order_id: this.order_info.order_id,
						goods_id: this.goods_info[this.selectedGoodsIndex].goods_id,
						content: this.comment.content,
						comment_picture: picData.toString(),
						star_num: this.comment.star
					}).then((response)=>{
			            this.comment.pop.show = false;
			            this.comment.uploading = false;
			            this.comment.files = [];
			            if(response.data.code === 1000) {
			              myAlert(lang.COMMENT_SUCCESS);
			              this.goods_info[this.selectedGoodsIndex].is_comment = 1;
			            }
					})
				})
			},
			// 重置评论框
			commentPopReset(){
				this.comment.content = '';
				this.comment.pics = [];
				this.comment.star = 0;
				this.comment.uploading = false;
      },
      // 退换货
			returnGoods(type){
				this.$http.post('',{
					name:'zl.shopping.sys.return.goods',
					order_id: this.order_info.order_id,
					goods_id: this.goods_info[this.selectedGoodsIndex].goods_id,
					type:type
				}).then((response) => {
					this.returnPop.show = this.changePop.show = false;
					this.goods_info[this.selectedGoodsIndex].status = type;
				})
      },
    },
    components: { pop, starmark }
	}
</script>
<style lang='less' scoped>
	#order_container{
		margin:20px auto 120px auto;
		max-width: 1200px;
		width: 100%;
		min-width: 1000px;
		overflow: hidden;
		.txt{
			margin-right: 7px;
		}
		.time{
			margin-left: 10px;
		}
		#order_main{
			margin-top: 35px;
      margin-bottom: 90px;
      #order_goods .goods-item{
        .goods-title{
          width:~'calc(32% - 100px)';
        }
        .goods-detail{
          width: 16%;
        }
        .goods-price{
          width: 10.5%;
        }
        .goods-num{
          width: 10%;
        }
        .goods-price-all{
          width: 16%;
        }
        .goods-action{
          width: 16%;
          float: left;
          .btn{
						border-radius:2px;
						width:100px;
						height:30px;
						line-height:30px;
						text-align:center;
						font-size:12px;
						color:#d42b1e;
						cursor:pointer;
						margin:0 auto;
						&.main{
							background:#d42b1e;
							color:#fff;
            }
             &.disabled{
              opacity: .5;
              cursor: default;
            }
					}
        }
      }
		}
		#conclu{
			font-size:20px;
			color:#5c5c5c;
			text-align:right;
			font-weight:bold;
			float: right;
			span{
				font-size:30px;
				color:#d0021b;
			}
		}
  }
  #comment_inner_container{
		textarea{
			resize:none;
			width:544px;
			height:148px;
			font-size: 14px;
			padding: 5px;
			color: #5b5b5b;
		}
		#comment_pic_container{
			margin-top:10px;
			text-align:left;
			input{
				display:none;
			}
			.pic{
				width:98px;
				height:98px;
				display:inline-block;
				vertical-align:middle;
				margin-right:10px;
				img{
					width:100%;
					height:100%;
				}
			}
			#add_pic{
				border:2px dashed #cbcbcb;
				width:98px;
				height:98px;
				line-height: 98px;
				text-align:center;
				color:#cbcbcb;
				font-size:30px;
				display:inline-block;
				cursor:pointer;
				vertical-align:middle;
			}
		}
		#comment_star_container{
			margin-top: 10px;
			overflow:hidden;
			.fl{
				font-size:22px;
				color:#979797;
				letter-spacing:-1.31px;
			}
			span{
				vertical-align:center;
			}
		}
		.btn-container{
			margin-top: 40px;
		}
	}
  .btn-container{
    margin-top: 90px;
  }
  .tip{
    font-size: 14px;
    margin-top: 10px;
  }
</style>
