export default function(img, type, base64){
	// var canvas = document.createElement("canvas"),
	var canvas = document.querySelector("canvas"),
		ctx = canvas.getContext('2d');
	var tcanvas = document.createElement('canvas'),
		tctx = tcanvas.getContext('2d');
		var initSize = img.src.length;
		var width = img.width;
		var height = img.height;
		var ratio;
		// 如果图片>四百万像素 计算压缩比并将大小压至四百万以下
		// if((ratio = width*height / 4000000) > 1) {
		// 	// ratio = 3.28
		// 	ratio = Math.sqrt(ratio);
		// 	// ratio = 1.81
		// 	// ctx的width已经是压缩过的了
		// 	width /= ratio;
		// 	height /= ratio;
		// } else ratio = 1;
		// 强制压缩图片为手机大小先
		if((ratio = width / window.innerWidth) > 1) {
			console.log(ratio)
			// ratio = 1.81
			// ctx的width已经是压缩过的了
			width /= ratio;
			console.log(width)
			height /= ratio;
		} else ratio = 1;
		canvas.width = width;
		canvas.height = height;
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// 图片像素>100万 用瓦片绘制
		var count;
		console.log(width*height)
		if((count = width * height / 1000000) > 1) {
			console.log(count)
			count = ~~(Math.sqrt(count) + 1);
			// 这里count是3
			var nw = ~~(width / count);
			var nh = ~~(height / count);
			tcanvas.width = nw;
			tcanvas.height = nh;
			for(var i = 0; i < count; i++){
				for(var j = 0; j < count; j++){
					tctx.drawImage(img,i*nw*ratio, j*nh*ratio, nw*ratio, nh*ratio, 0, 0, nw, nh);
					ctx.drawImage(tcanvas, i*nw, j*nh, nw, nh);
				}
			}
		}
		else ctx.drawImage(img, 0, 0, width, height);
		// ctx.drawImage(img, 0, 0, width, height);
		// 进行压缩
		var ndata;
		ndata = canvas.toDataURL('image/jpeg', 0.1);
		alert(ndata)
		// console.log(ndata)
		// ios在这里就断掉了！
        // 将base64的图片转成二进制对象
        var ndata2 = ndata.split(',')[1];
        // ndata2 = ndata2.replace(/\s/g, '');
        // var text = atob(ndata2)
        var text = base64.decode(ndata2);
        // console.log(text)
        // alert(text)
        var buffer = new ArrayBuffer(text.length);
        var ubuffer = new Uint8Array(buffer);
        // console.log(ubuffer)
        // alert(JSON.stringify(ubuffer))

        for (var i = 0; i < text.length; i++) {
            ubuffer[i] = text.charCodeAt(i);
        }
        // console.log(ubuffer)
        // alert(JSON.stringify(ubuffer))

        // var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        var blob;

        // if (Builder) {
        //     var builder = new Builder();
        //     builder.append(buffer);
        //     blob = builder.getBlob(type);
        // } else {
            blob = new Blob([buffer], {type: type});
            // alert(JSON.stringify(blob))
        // }
        // console.log(blob)
        var file = new File([blob], "name.jpg")
        return file;
}