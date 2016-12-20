<template>
	<div id="about_container">
		<div id="about_inner">
			<img src="~assets/img/index/about.png">
			<div id="about_text">
				<p>“名校昇”隶属于杭州领智网络科技有限公司，是一家由浙大精英带队研发的在线一对一家教平台，初创于美丽的西子湖畔，坐落在文化繁盛之地，享有高等学府的优质资源。针对目前教育资源分布极为不均衡的现状，我们致力于以互联网的方式让更多学生能够享受到985/211高校的优质大学生教育服务。</p>
				<p>不忘初心，方得始终。我们将如一践行最初的理念：传道、授业、解惑，用最真的心，做最实的事。选择我们，相信我们，让“名校昇”的名校生助你升入名校！</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"part9About"
	}
</script>
<style scoped lang='less'>
	#about_container{
		width: 100%;
		padding-top: .1px;
		#about_inner{
			width: 100%;
			max-width: 1170px;
			margin:79px auto;
			#about_text{
				padding: 27px 60px;
				font-size: 20px;
				color: #5c5c5c;
				text-indent: 40px;
			}
		}
	}
</style>