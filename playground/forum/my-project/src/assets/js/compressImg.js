export default function(img, type){
	var canvas = document.createElement("canvas"),
		ctx = canvas.getContext('2d');
	var tcanvas = document.createElement('canvas'),
		tctx = canvas.getContext('2d');
		var initSize = img.src.length;
		var width = img.width;
		var height = img.height;
		// 如果图片>四百万像素 计算压缩比并将大小压至四百万以下
		var ratio;
		if((ratio = width*height / 4000000) > 1) {
			ratio = Math.sqrt(ratio);
			width /= ratio;
			height /= ratio;
		} else ratio = 1;
		canvas.width = width;
		canvas.height = height;
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// 图片像素>100万 用瓦片绘制
		// var count;
		// if((count = width * height / 1000000) > 1) {
		// 	count = ~~(Math.sqrt(count) + 1);
		// 	var nw = ~~(width / count);
		// 	var nh = ~~(height / count);
		// 	tcanvas.width = nw;
		// 	tcanvas.height = nh;
		// 	tctx.fillStyle = 'fff';
		// 	// tctx.fillRect
		// 	for(var i = 0; i < count; i++){
		// 		for(var j = 0; j < count; j++){
		// 			tctx.drawImage(img,i*nw*ratio, j*nh*ratio, nw*ratio, nh*ratio, 0, 0, nw, nh);
		// 			ctx.drawImage(tcanvas, i*nw, j*nh, nw, nh);
		// 		}
		// 	}
		// }
		// else ctx.drawImage(img, 0, 0, width, height);
		ctx.drawImage(img, 0, 0, width, height);
		// 进行压缩
		var ndata;
		// if( count > 1 ) ndata = tcanvas.toDataURL('image/jpeg', 0.1);
		ndata = canvas.toDataURL('image/jpeg', 0.1);
		// console.log(ndata)

        // 将base64的图片转成二进制对象
        var text = atob(ndata.split(',')[1])
        var buffer = new ArrayBuffer(text.length);
        var ubuffer = new Uint8Array(buffer);
        var pecent = 0 , loop = null;

        for (var i = 0; i < text.length; i++) {
            ubuffer[i] = text.charCodeAt(i);
        }

        var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        var blob;

        if (Builder) {
            var builder = new Builder();
            builder.append(buffer);
            blob = builder.getBlob(type);
        } else {
            blob = new window.Blob([buffer], {type: type});
        }
        // console.log(blob)
        var file = new File([blob], "name.jpg")
        return file;
}