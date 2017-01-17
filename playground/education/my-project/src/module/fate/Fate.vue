<template>
	<div id="main_container">
		<div id="input_container"
		v-if="!verified">
			<p>Congrats, u find me!!<br>One last step...</p>
			<input placeholder="Plz identify yourself..."
			v-model="name"
			@keydown="tip = false"
			@keyup.enter="verifying">
			<p id="tip"
			v-show="tip">{{tipText}}</p>
		</div>
		<div id="countdown_container"
		v-if="verified">
			<div v-if="!showCode">
				<p class="countdown"
				>U will see the clue 5 in <br><span>{{time}}</span></p>
				<img src="~assets/img/dog.jpg">
			</div>
			<div v-else>
				<p class="countdown"
				>The clue will expire in <br><span>{{time}}</span></p>
				<img src="~assets/img/test.png">
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'fate',
		data(){
			return{
				name:'',
				verified:false,
				tip: false,
				tipText: '',
				// 倒计时文本
				time:'',
				// setInterval器
				timer:'',
				showCode:false
			}
		},
		mounted(){
		},
		methods:{
			verifying(){
				this.tip = true
				if(this.name==='陈六六' || this.name === '陈华' || this.name === '六儿' || this.name === '陈六') {
					this.tipText = 'Identity confirmed!!';
					setTimeout(()=>{
						this.verified = true;
						this.timer = setInterval(this.showRemaining, 1000);
					},1000);
				}
				else {
					this.tipText = 'Identity denied!';
				}
			},
			add0(val){
				return val < 10? '0'+val : val;
			},
			countdown(end,expired){
				var _second = 1000;
				var _minute = _second * 60;
				var _hour = _minute * 60;
				var _day = _hour * 24;
				var timer;
				var now = new Date();
				var distance = end - now;
				if (distance < 0) {
				    clearInterval(this.timer);
				    return expired();
				}
				var days = Math.floor(distance / _day);
				var hours = Math.floor((distance % _day) / _hour);
				var minutes = Math.floor((distance % _hour) / _minute);
				var seconds = Math.floor((distance % _minute) / _second);

				var time = '';
				time += this.add0(hours) + ':';
				time += this.add0(minutes) + ':';
				time += this.add0(seconds) + '';
				return time;
			},
			showRemaining(){
				this.time = this.countdown( new Date('01/17/2017 00:00 PM'),()=>{
					this.timer = setInterval(this.showRemaining2, 1000);
					this.showCode = true;
				});
			},
			showRemaining2(){
				this.time = this.countdown(new Date('01/17/2017 00:01 PM'),()=>{
					this.showCode = false;
					this.timer = setInterval(this.showRemaining3, 1000);
				})
			},
			showRemaining3(){
				this.time = this.countdown( new Date('01/17/2017 03:34 PM'),()=>{
					// this.timer = setInterval(this.showRemaining2, 1000);
					this.showCode = true;
				});
			},
		}
	}
</script>
<style scoped lang='less'>
	#main_container{
		font-family: cursive;
		margin-top: 200px;
	}
	#input_container{
		width: 445px;
		margin: 0 auto;
		position: relative;
		p{
			font-size: 40px;
			color:#fff;
			text-align: center;
			margin: 20px 0;
		}
		#tip{
			color: #000;
			position: absolute;
			right: 55px;
			bottom: -10px;
			font-size: 16px;
		}
	}
	input{
		display: block;
		    margin: 10px auto;
		    padding-left: 5px;
		    width: 350px;
		    font-size: 25px;
		    border-radius: 5px;
		    border: 1px solid #fff;
		    height: 40px;
	}
	#countdown_container{
		.countdown{
			font-size: 60px;
			color:#fff;
			text-align: center;
			span{
				font-size: 100px;
			}
		}
		img{
			display: block;
			margin: 0 auto;
		}
	}
</style>