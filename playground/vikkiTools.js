$.fn.numEditor = function() {
    var $this = $(this);
    var $num = $this.find('.num');
    $('.plus,.minus').addClass('active');
    var $plus = $this.find('.plus');
    var $minus = $this.find('.minus');
    var currentNum, minNum, maxNum;

    function beforeEdit() {
        currentNum = parseInt($num.text());
        minNum = $this.data('min');
        maxNum = $this.data('max');
    };

    function afterEdit() {
        if (currentNum > minNum) $minus.addClass('active');
        else {
            $minus.removeClass('active');
            $num.text(minNum)
        };
        if (currentNum < maxNum) $plus.addClass('active');
        else {
            $plus.removeClass('active');
            $num.text(maxNum)
        };
    };

    function initial() {
        beforeEdit();
        afterEdit();
    };
    initial();
    $plus.on('click', function() {
        if ($(this).hasClass('active')) {
            beforeEdit();
            $num.text(++currentNum);
            afterEdit();
            $this.trigger('numCb', currentNum);
        }
    });
    $minus.on('click', function() {
        if ($(this).hasClass('active')) {
            beforeEdit();
            $num.text(--currentNum);
            afterEdit();
            $this.trigger('numCb', currentNum);
        }
    });
    //
};

$.fn.addressPicker = function(){
    //引入数据库
    var database;
    var proData, cityData, disData;
    var $this = $(this);
    var $pro = $this.find('.province'), $city = $this.find('.city'), $district = $this.find('.district');
    var $proSelect = $pro.find('.selected'), $citySelect = $city.find('.selected'), $disSelect = $district.find('.selected');
    var $proOption = $pro.find('.option-container'), $cityOption = $city.find('.option-container'), $disOption = $district.find('.option-container');
    $.getJSON('areas.json',function(json){
        proData = json;
        addAddress(Object.keys(proData),$proOption);
    });
    //填充option-container
    function addAddress(addArray,$area){
        addArray.forEach(function(e){
            $area.append('<li class="option" name="'+e+'">'+e+'</li>');
        });
        $area.find('.option').first().click();
    };
    //点击select-container
    $('.select-container').on('click',function(){
        var $this = $(this);
        if(!$this.hasClass('active')) $('.select-container.active').removeClass('active');
        $this.toggleClass('active');
    })
    //点击option
    $('.option-container').on('click',function(e){
        e.stopPropagation();
        var $this = $(this);
        var $selectContainer = $this.parent();
        var $nextAll =  $selectContainer.nextAll();
        var selectArea = $(e.target).text();
        $this.prev().text(selectArea);
        $nextAll.find('.option').remove();
        $nextAll.find('.selected').text('');
        $(e.target).addClass('active');
        $this.find('.option.active').removeClass('active');
        $selectContainer.removeClass('active');
        if($selectContainer.hasClass('province')){
            cityData = proData[selectArea];
            addAddress(Object.keys(cityData),$cityOption);
        } else if($selectContainer.hasClass('city')){
            disData = cityData[selectArea];
            addAddress(disData, $disOption);
        }
    });

};