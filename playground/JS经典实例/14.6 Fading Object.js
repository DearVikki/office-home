var fadingObejct = {
    yellowColor: function(val) {
        var r = 'ff';
        var g = 'ff';
        var b = val.toString(16);
        var newval = '#' + r + g + b;
        return newval;
    },
    fade: function(id, start, finish){
    	this.count = this.start = start;
    	this.finish = finish;
    	this.id = id;
    	this.countDown = function(){
    		console.log(this)
    		this.count += 30;
    		if(this.count >= this.finish) {
    			document.getElementById(this.id).style.background='transparent';
    			this.countDown = null;
    			return;
    		}
    		document.getElementById(this.id).style.backgroundColor = this.yellowColor(this.count);
    		setTimeout(this.countDown.bind(this),100); //不设的话this是window
    	}
    }
}