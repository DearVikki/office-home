var main = function() {
    if ($.os.phone || $.os.tablet) {
        $('div').on('tap', function(e) {
            console.log(e);
        });
    } else {
        $('div').on('click', function() {
            console.log('click!');
        });
    }
}
$(document).ready(main);