var main=function(){
	$('.vikkiNum').numEditor();
	$('.vikkiNum').on('numCb',function(e,num){
		console.log('现在的数字是'+num); //第一个参数默认是event事件
	});
	 $.getJSON('areas.json',function(json){
        proData = json;
        console.log(data)
       $('.vikkiAddressPicker').addressPicker(data);
    });
};
$(document).ready(main);