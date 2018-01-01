<template>
	<div id="form_wrapper">
		<img src="~assets/img/personal/icon_select.png">
		{{lang.RESET_PW_SUCCESS}}
	</div>
</template>
<script>
	import lang from '../../assets/js/language.js'
	export default{
		name: 'step4',
		data(){
			return{
				lang: lang
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
	    text-align: center;
	    color:#666;
	    height: 115px;
	    line-height: 115px;
	    img{
	    	vertical-align: -2px;
	    }
	}
</style>
