<template>
	<div class="question-container">
		<mic></mic>
	</div>
</template>
<script>
	import {getParameterByName} from '../../assets/js/utils.js';
	import mic from './Mic.vue'
	export default{
		name:'all-question',
		mounted(){
			console.log(getParameterByName('id'));
		},
		components:{mic}
	}
</script>
<style scoped lang='less'>
	.question-container{
		width: 1026px;
		margin: 50px auto;
	    padding:45px 50px;
	    position: relative;
	    border:1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        &:before{
            content:'';
            width: 30px;
            height: 30px;
            position: absolute;
            top:0;
            right:0;
            background: url(../../assets/img/index/mini.png) no-repeat;
        }
	}
</style>