export default function(img, type){
	var canvas = document.createElement("canvas"),
		ctx = canvas.getContext('2d');
	var tcanvas = document.createElement('canvas'),
		tctx = tcanvas.getContext('2d');
		var initSize = img.src.length;
		var width = img.width;
		var height = img.height;
		var ratio;
		// 强制压缩图片为手机大小先
		if((ratio = width / window.innerWidth) > 1) {
			// ctx的width已经是压缩过的了
			width /= ratio;
			height /= ratio;
		} else ratio = 1;
		canvas.width = width;
		canvas.height = height;
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, 0, 0, width, height);
		// 进行压缩
		var ndata;
		ndata = canvas.toDataURL('image/jpeg', 0.1);

        // 将base64的图片转成二进制对象
        var ndata2 = ndata.split(',')[1];
        ndata2 = ndata2.replace(/\s/g, '');
        var text = atob(ndata2)

        var buffer = new ArrayBuffer(text.length);
        var ubuffer = new Uint8Array(buffer);

        for (var i = 0; i < text.length; i++) {
            ubuffer[i] = text.charCodeAt(i);
        }

        var blob = new Blob([buffer], {type: type});
        blob.lastModifiedDate = new Date();
        return blob;
}