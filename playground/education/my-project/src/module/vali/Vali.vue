<template>
	<div>
		<validation name="validation1">
				<validity field="username" :validators="['required']">
				<div class="username-field">
				<label for="username">username:</label>
					<input id="username" type="text" @input="handleValidate">
								</div>
				</validity>

			<div class="comment-field">
				<label for="comment">comment:</label>
				<validity field="comment" :validators="{required: true, maxlength: 12}">
					<input id="comment" type="text" @input="handleValidate" placeholder="asdsad" />
				</validity>
			</div>
			<div class="errors">
				<p v-if="usernameRequire">Required your name.</p>
				<p v-if="commentLong">Your comment is too long.</p>
			</div>
			<input type="submit" value="send" v-if="allPass">
			<div class="debug">
				<p>validation result info</p>
				<pre>{{$validation}}</pre>
			</div>
		</validation>
		<input type="radio" id="one" value="One" v-model="picked">
		<label for="one">One</label>
		<br>
		<input type="radio" id="two" value="Two" v-model="picked">
		<label for="two">Two</label>
		<br>
		<span>Picked: {{ picked }}</span>
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
			commentLong: '$validation.validation1.comment.maxlength',
			allPass:'$validation.validation1.valid'
		}),
		methods: {
			handleValidate: function (e) {
				e.target.$validity.validate()
			}
		},
		mounted() {
			console.log(this.$options.components)
		}
	}
</script>