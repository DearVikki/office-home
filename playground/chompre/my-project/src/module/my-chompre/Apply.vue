<template>
	<div id="personal_right_container">
    <div v-if="!contentLoaded">

    </div>
		<div class="container">
			<div class="title">{{lang.SELECT_SHOPTYPE}}</div>
			<label @click=clickType(1)>
				<input type="radio" name="shop" class="checkbox" checked=true>
				<span class="checkbox-input"></span>
				{{lang.INDIVIDUAL_SHOP}}
			</label>
			<label @click=clickType(2)>
				<input type="radio" name="shop" class="checkbox">
				<span class="checkbox-input"></span>
				{{lang.COMPANY_SHOP}}
			</label>
		</div>
		<div v-show="shoptype == 1">
			<div class="container">
				<div class="title">{{lang.SELECT_INVOICETYPE}}</div>
				<label>
					<input type="radio" class="checkbox" checked=true>
					<span class="checkbox-input"></span>
					{{lang.SMALL_INVOICE}}
				</label>
			</div>
			<div class="container">
				<div class="title">{{lang.UPLOAD_ID}}</div>
				<p class="tip">{{lang.ID_TIP}}</p>
				<input type="file" ref="indi_photo" accept="image/jpeg, image/png"
				@change=indiPhotoChange>
				<div class="img-holder" v-for="(img,i) in indi.photos">
					<div class="remove" @click="remove(1, i)">x</div>
					<img :src="img">
				</div>
				<div class="img-holder cp" @click="clickPhoto(1)"
				v-show="indi.photos.length < 5">+</div>
			</div>
		</div>
		<div v-show="shoptype == 2">
			<div class="container">
				<div class="title">{{lang.SELECT_INVOICETYPE}}</div>
				<label>
					<input type="checkbox" class="checkbox"
					id="small" value="small" v-model="company.invoice">
					<span class="checkbox-input"></span>
					{{lang.SMALL_INVOICE}}
				</label>
				<label>
					<input type="checkbox" class="checkbox"
					id="big" value="big" v-model="company.invoice">
					<span class="checkbox-input"></span>
					{{lang.big_INVOICE}}
				</label>
			</div>
			<div class="container">
				<div class="title">{{lang.UPLOAD_CRT}}</div>
				<input type="file" ref="company_photo" accept="image/jpeg, image/png"
				@change=companyPhotoChange>
				<div class="img-holder" v-for="(img,i) in company.photos">
					<div class="remove" @click="remove(2, i)">x</div>
					<img :src="img">
				</div>
				<div class="img-holder cp" @click="clickPhoto(2)"
				v-show="company.photos.length < 5">+</div>
			</div>
		</div>
		<div class="container textCenter" v-show="shoptype">
			<div class="account-btn" @click="submit">{{lang.SUBMIT_APPLY}}</div>
			<p class="error">{{error}}</p>
		</div>
	</div>
</template>
<script>
import lang from '../../assets/js/language.js'
export default{
	name: 'apply',
	data(){
		return{
      lang,
      contentLoaded: false,
      isAvailable: false,
			shoptype: 1, // 1个人店铺 2企业店铺,
			indi:{
				photos: [],
				files: []
			},
			company:{
				photos: [],
				files: [],
				invoice: []
			},
			error:''
		}
  },
  mounted(){
    this.$http.post('',{
				name:'zl.shopping.pc.isapply.shop',
		}).then(res => {
      if(res.data.success) this.isAvailable = true;
      else this.isAvailable = false;
    })
  },
	methods:{
		clickType(type) {
			this.shoptype = type;
			this.error = '';
		},
		clickPhoto(type){
			if(type == 1){
				this.$refs.indi_photo.click();
			} else this.$refs.company_photo.click();
		},
		indiPhotoChange(){
			const file = this.$refs.indi_photo.files[0];
			const src = window.URL.createObjectURL(file);
			this.indi.photos.push(src);
			this.indi.files.push(file);
		},
		companyPhotoChange(){
			const file = this.$refs.company_photo.files[0];
			const src = window.URL.createObjectURL(file);
			this.company.photos.push(src);
			this.company.files.push(file);
		},
		remove(type, index){
			if(type == 1) {
				this.indi.photos.splice(index, 1);
				this.indi.files.splice(index, 1);
			} else {
				this.company.photos.splice(index, 1);
				this.company.files.splice(index, 1);
			}
		},
		submit(){
			if(this.shoptype == 1) {
				if(!this.indi.photos.length) this.error = lang.ID_NOT_EMPTY;
			} else {
				if(!this.company.photos.length) this.error =  lang.CRT_NOT_EMPTY;
				else if(!this.company.invoice.length) this.error = lang.INVOICE_AT_LEAST1_TIP;
			}
			if(this.error) return;
		}
	}
}
</script>
<style lang='less' scoped>
	@baseColor: #d42b1e;
	.container{
		margin-bottom: 20px;
	}
	.title{
		font-size:20px;
		color:#5c5c5c;
		border-bottom: 2px solid #cbcbcb;
		height: 35px;
		line-height: 35px;
		margin-bottom: 14px;
		font-weight: bold;
	}
	label{
		font-size: 12px;
		margin-right: 20px;
		cursor: pointer;
	}
	.tip{
		font-size: 12px;
		margin-bottom: 10px;
	}
	.img-holder{
		width: 70px;
		height: 70px;
		position: relative;
		text-align: center;
		line-height:65px;
		font-size: 30px;
		color: @baseColor;
		border: 1px solid @baseColor;
		margin-right: 10px;
		display: inline-block;
		vertical-align: middle;
		.remove{
			font-size: 15px;
			color: #fff;
			background: @baseColor;
			width: 15px;
			height: 15px;
			line-height: 11px;
			text-align: center;
			border-radius: 100%;
			position: absolute;
			right: -5px;
			top: -5px;
			cursor: pointer;
		}
		img{
			width: 100%;
			height: 100%;
		}
	}
	.account-btn{
		font-size: 14px;
		height: 30px;
		line-height: 30px;
		width: 120px;
		padding: 0;
		cursor: pointer;
	}
</style>
