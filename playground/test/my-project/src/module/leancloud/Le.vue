<template>
	<div>
		<input type="file" @change="fileUpload">
		<textarea v-model="textarea"></textarea>
		<button @click="submitTextarea">提交textarea</button>
		<div id="contentedit" style="background: pink;white-space: pre-wrap" contenteditable=true></div>
		<p>{{textarea}}</p>
		<p id="test" style="white-space: pre"></p>
		<button @click="submitDiv">提交contenteditable</button>
	</div>
</template>
<script>
	import AV from 'leancloud-storage'
	export default{
		name:'le',
		data(){
			return {
				textarea:'',
				To:''
			}
		},
		mounted(){
			const appId = '1zD4Kio5pFbNgnTpaRJ8nTnz-gzGzoHsz';
			const appKey = '3m3Du5FwDHR8mMvleV0CxAML';
			AV.init({appId, appKey});

			this.To = AV.Object.extend('TestObject');

			var query = new AV.Query(this.To);
			query.get('58d556fa44d9040068688549').then((response)=>{
				this.textarea = response.get('words');
				var text =  this.textarea.replace(/\r?\n/g, '<br />');
				document.querySelector('#test').innerHTML = this.textarea;
				document.querySelector('#contentedit').innerHTML = this.textarea;
			})
		},
		methods:{
			submitTextarea(){
				console.log(this.textarea)
				const to = new this.To();
				to.set('words',this.textarea);
				to.save().then((response)=>{
					console.log(response)
				})
			},
			submitDiv(){
				// const to = new this.To();
				// to.set('words',this.textarea);
				// to.save().then((response)=>{
				// 	console.log(response)
				// })
				var text = document.querySelector('#contentedit')
				console.log(text.innerHTML)
				console.log(text.textContent)
				console.log(text.innerText)
				// const to = new this.To();
				// to.set('words',text.innerText);
				// to.save().then((response)=>{
				// 	console.log(response)
				// })
			},
			fileUpload(e){
				var files= e.target.files[0];
				// if(!files.length) return;
				var name = files.name;
				// var avFile = new AV.File(name, files);
				// avFile.save().then((file)=>{
				// 	console.log(file.url());
				// })
				var fm = new FormData();
				fm.append('name','zl.shopping.sys.upload.img');
				fm.append('img',files)
				var xhr = new XMLHttpRequest();
				
				xhr.addEventListener('load',function(event){
					console.log('加载成功')
				});
				xhr.upload.addEventListener('progress', function(event){
				    console.log(event.loaded);
				    // event.total 总文件大小
				}, false);
				xhr.open('post','http://tangguyan.vicp.net/pcapi',true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(fm);
			}
		}
	}
</script>