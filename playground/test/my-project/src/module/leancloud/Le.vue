<template>
	<div>
		<input type="file" @change="fileUpload">
	</div>
</template>
<script>
	import AV from 'leancloud-storage'
	export default{
		name:'le',
		mounted(){
			const appId = '1zD4Kio5pFbNgnTpaRJ8nTnz-gzGzoHsz';
			const appKey = '3m3Du5FwDHR8mMvleV0CxAML';
			AV.init({appId, appKey});

			const TO = AV.Object.extend('TestObject');
			const to = new TO();
			// ah! await居然暂时还用不了 说是reserved word
			// await to.save({words:'hhh'});
			// to.save({
			// 	words:'hhh2'
			// }).then(()=>{
			// 	console.log('Leancloud Rocks!')
			// })
		},
		methods:{
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
				xhr.open('post','http://121.40.91.157/zl_shopping/php/index.php/PcApi',true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.send(fm);
			}
		}
	}
</script>