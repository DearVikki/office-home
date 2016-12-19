<template>
	<div>
		<validation name="validation1">
				<validity field="username" :validators="['required']" ref="username">
					<div class="username-field">
						<label for="username">username:</label>
						<input id="username" type="text" @input="handleValidate">
					</div>
				</validity>
				<validity field="comment" :validators="{required: true, maxlength: 12}">
				<div class="comment-field">
					<label for="comment">comment:</label>
					<input id="comment" type="text" @input="handleValidate" placeholder="asdsad" />
				</div>
				</validity>
			<div class="errors">
				<p v-if="usernameRequire">Required your name.</p>
				<!--<p v-if="commentLong">Your comment is too long.</p>-->
			</div>
			<input type="submit" value="send" v-if="allPass">
			<div class="debug">
				<p>validation result info</p>
				<pre>{{$validation}}</pre>
			</div>
		</validation>
	</div>
</template>
<script>
	import a from 'vue-validator';
	export default{
		name:'Vali',
		data(){
			return{
				msg:'If you see this, then congrats!!',
				picked: ''
			}
		},
		computed: a.mapValidation({
			usernameRequire: '$validation.validation1.username.required',
			//commentLong: '$validation.validation1.comment.maxlength',
			allPass:'$validation.validation1.valid'
		}),
		methods: {
			handleValidate: function (e) {
				var self = this;
				var $validity = this.$refs.username;
				$validity.validate(()=>{
					console.log(self.$refs.username)
				})
				// e.target.$validity.validate();
			}
		},
		mounted() {
			console.log(this.$options.components)
		}
	}
</script>