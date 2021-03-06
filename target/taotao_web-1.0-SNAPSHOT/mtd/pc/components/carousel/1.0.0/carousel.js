define("//taotao.com/mtd/pc/components/carousel/1.0.0/carousel.js", [], function () {
    "use strict";
    var t = _.Class.extend({
        construct: function (t) {
            $.extend(this, {
                container: null,
                itemSelector: null,
                itemWidth: 0,
                activeClass: "active",
                startIndex: 0,
                duration: 500,
                delay: 2e3,
                switchType: "fade",
                isAuto: !0,
                zIndex: 5,
                onFirstSwitch: function () {
                },
                onBeforeSwitch: function () {
                },
                onAfterSwitch: function () {
                }
            }, t), this.$container = $(this.container), this.init()
        }, init: function () {
            this.initElements(), this.initEvent(), this.hasSwitched = [], this.setCurrent(this.startIndex), this.isAuto && this.start()
        }, initElements: function () {
            switch (this.$items = this.$container.find(this.itemSelector), this.length = this.$items.length, this.switchType) {
                case"fade":
                    this.$items.css({opacity: 0, zIndex: 0, position: "absolute"});
                    break;
                case"slide":
                    var t = this.$items, i = $(t.get(0)).clone(), s = $(t.get(this.length - 1)).clone();
                    this.$container.append(i).prepend(s), this.$items = this.$container.find(this.itemSelector), this.$container.css({
                        width: (this.length + 2) * this.itemWidth,
                        position: "absolute",
                        top: 0,
                        left: -this.itemWidth
                    })
            }
            return this
        }, initEvent: function () {
            return this.$container.bind("mouseenter", $.proxy(this.stop, this)).bind("mouseleave", $.proxy(this.start, this)), this
        }, setCurrent: function (t) {
            this.currentIndex = t, $.inArray(t, this.hasSwitched) < 0 && $.isFunction(this.onFirstSwitch) && (this.onFirstSwitch(t), this.hasSwitched.push(t));
            var i = this.$items, s = $(i.get(t));
            switch (i.removeClass(this.activeClass), s.addClass(this.activeClass), this.switchType) {
                case"fade":
                    $(i.get(t)).css({opacity: 1, zIndex: this.zIndex})
            }
            return this
        }, getCurrent: function () {
            return this.currentIndex
        }, switchTo: function (t) {
            switch (this.switchType) {
                case"fade":
                    var i = this.$items, s = this.currentIndex, e = $(i.get(s)), n = null;
                    t >= this.length ? t = 0 : t <= -1 && (t = this.length - 1), n = $(i.get(t)), $.isFunction(this.onBeforeSwitch) && this.onBeforeSwitch.call(this, s, t), i.each(function (t) {
                        var i = $(this);
                        parseFloat(i.css("opacity")) > 0 && t !== s && i.stop().fadeTo(this.duration, 0).css("zIndex", "0")
                    }), e.stop().fadeTo(this.duration, 0, $.proxy(function () {
                        e.css("zIndex", "0")
                    }, this)), n.stop().fadeTo(this.duration, 1, $.proxy(function () {
                        this.setCurrent(t), n.css({
                            opacity: 1,
                            zIndex: this.zIndex
                        }), $.isFunction(this.onAfterSwitch) && this.onAfterSwitch.call(this, this.currentIndex)
                    }, this));
                    break;
                case"slide":
                    var i = this.$items, e = $(i.get(this.currentIndex));
                    $.isFunction(this.onBeforeSwitch) && this.onBeforeSwitch.call(this, this.currentIndex, t), this.$container.animate({left: -(t + 1) * this.itemWidth}, this.duration, $.proxy(function () {
                        t >= this.length ? (t = 0, this.$container.css("left", -this.itemWidth * (t + 1))) : t <= -1 && (t = this.length - 1, this.$container.css("left", -this.itemWidth * (t + 1))), this.setCurrent(t), $.isFunction(this.onAfterSwitch) && this.onAfterSwitch.call(this, this.currentIndex)
                    }, this))
            }
            return this
        }, switchToPrev: function () {
            var t = this.currentIndex - 1;
            return this.switchTo(t), this
        }, switchToNext: function () {
            var t = this.currentIndex + 1;
            return this.switchTo(t), this
        }, start: function () {
            return clearTimeout(this.autoTimer), this.autoTimer = setTimeout($.proxy(function () {
                this.switchToNext().start()
            }, this), this.delay), this
        }, stop: function () {
            return clearTimeout(this.autoTimer), this
        }, destroy: function () {
            this.unbind(), this.$container.remove()
        }, unbind: function () {
            return this.$container.unbind(), this
        }
    });
    return t
});