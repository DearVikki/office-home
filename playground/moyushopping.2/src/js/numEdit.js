! function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        root.numEdit = factory(root.jQuery);
    }
}(this, function($) {
    function NumEdit(el, config) {
        var self = this;
        this.$el = el;
        this.$num = el.find(config.num);
        this.$plus = el.find(config.plus);
        this.$minus = el.find(config.minus);
        this.diff = config.diff || 1;
        NumEdit.prototype.beforeEdit = function() {
            this.currentNum = Number(this.$num.text());
            //有可能min为0 那么不能直接||了
            this.minNum = (Number(this.$el.data('min')) || this.$el.data('min') === 0) ? this.$el.data('min') : 0;
            this.maxNum = (Number(this.$el.data('max')) || this.$el.data('max') === 0) ? this.$el.data('max') : Infinity;
            //console.log('beforeEdit currentNum:' + currentNum)
        };
        NumEdit.prototype.afterEdit = function() {
            if (this.minNum > this.maxNum) this.maxNum = this.minNum;
            if (this.minNum === this.maxNum) this.currentNum = this.minNum;
            if (this.currentNum > this.minNum) this.$minus.removeClass('disable');
            else {
                this.$minus.addClass('disable');
                this.currentNum = this.minNum;
            };
            if (this.currentNum < this.maxNum) this.$plus.removeClass('disable');
            else {
                this.$plus.addClass('disable');
                this.currentNum = this.maxNum;
            };
            this.$num.text(this.currentNum);
            //console.log('afterEdit currentNum:' + currentNum)
        };
        this.$plus.on('click', function() {
            if (!$(this).hasClass('disable')) {
                self.beforeEdit();
                self.currentNum = self.currentNum + self.diff;
                self.$num.text(self.currentNum);
                self.afterEdit();
                self.$el.trigger('numCb', self.currentNum);
            }
        });
        this.$minus.on('click', function() {
            if (!$(this).hasClass('disable')) {
                self.beforeEdit();
                self.currentNum = self.currentNum - self.diff;
                self.$num.text(self.currentNum);
                self.afterEdit();
                self.$el.trigger('numCb', self.currentNum);
            }
        });
        self.beforeEdit();
        self.afterEdit();
    }
    $.fn.numEdit = function(config) {
        var $this = $(this);
        var len = $this.length;
        for (var i = 0; i < len; i++) {
            var $el = $($this[i]);
            $el.data('ne', new NumEdit($el, config));
        }
    }
    $.fn.numInitial = function() {
        var $this = $(this);
        var len = $this.length;
        for (var i = 0; i < len; i++) {
            var $el = $($this[i]);
            var ne = $el.data('ne');
            ne.beforeEdit();
            ne.afterEdit();
        }
    };
})