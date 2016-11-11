<template>
	<div>
		<validate name="validation1">
	      <div class="username-field">
	        <label for="username">username:</label>
	        <validity field="username" :validators="['required']">
	        	<input id="username" type="text">
	        </validity>
	      </div>
	      <div class="comment-field">
	        <label for="comment">comment:</label>
	        <validity field="comment" v-validate:comment="{maxlength: 7}">
	        	<input id="comment" type="text">
	        </validity>
	      </div>
	      <div class="errors">
	        <p v-if="usernameRequire">Required your name.</p>
	        <p v-if="commentLong">Your comment is too long.</p>
	      </div>
	      <input type="submit" value="send" v-if="allPass">
	  </validate>
	</div>
</template>
<script>
	import validate from 'vue-validator';
	export default{
		name:'Vali',
		data(){
			return{
				msg:'If you see this, then congrats!!'
			}
		},
		computed: validate.mapValidation({
			usernameRequire: '$validation.validation1.username.required',
			commentLong: '$validation.validation1.comment.maxlength',
			allPass:'$validation.validation1.valid'
		}),
		mounted(){
			//console.log(validate)
		},
		components:{validate}
	}
</script>