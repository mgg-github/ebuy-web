define("//taotao.com/mtd/pc/components/sidePopMenu/1.0.0/sidePopMenu.js", ["//taotao.com/mtd/pc/components/util/1.0.0/util.js"], function (t) {
    "use strict";
    var e = t("//taotao.com/mtd/pc/components/util/1.0.0/util.js"), i = _.Class.extend({
        construct: function (t) {
            this.config = {
                $container: null,
                navItemHook: "",
                popItemHook: "",
                navCtnHook: ".JS_navCtn",
                popCtnHook: ".JS_popCtn",
                navItemOn: "",
                moveDeg: 70,
                isAuto: !1,
                menuDirection: "right",
                itemEnterCallBack: null
            }, t && $.extend(this.config, t), this.checkRun()
        }, checkRun: function () {
            var t = this.config;
            null != t.$container && 0 != $(t.navCtnHook).length && 0 != $(t.popCtnHook).length && "" != t.navItemHook && "" != t.popItemHook && this.init()
        }, init: function () {
            var t = this.config;
            this.$navCtn = t.$container.find(t.navCtnHook), this.$popCtn = t.$container.find(t.popCtnHook), this.$navItemList = this.$navCtn.find(t.navItemHook), this.$popItemList = this.$popCtn.find(t.popItemHook), this.potCollect = [], this.moveTimer = null, this.enterTimer = null, this.isBind = !1, this.$window = $(window), this.callback = null, this.initEvents()
        }, getNavItemInfo: function () {
            var t = this.config, e = [];
            return t.$container.find(t.navItemHook).each(function () {
                var t = $(this), i = t.position();
                e.push({
                    thisHeight: t.outerHeight(!0).toFixed(0),
                    thisWidth: t.outerWidth().toFixed(0),
                    thisPstX: i.left,
                    thisPstY: i.top,
                    thisPageY: t.offset().top
                })
            }), e
        }, initEvents: function () {
            var t = this, i = t.config;
            i.$container.bind("mouseleave", $.proxy(t.ctnLeave, t)), t.$navCtn.delegate(i.navItemHook, {
                "mouseenter.itemEnter": t.navItemEnter,
                "mouseleave.itemLeave": t.navItemLeave
            }, {
                thisObj: t,
                callback: i.itemEnterCallBack
            }), t.$navCtn.delegate(i.navItemHook, "mousemove.itemMove", {
                thisObj: t,
                callback: i.itemEnterCallBack
            }, e.throttle(t.navItemMove, t.moveTimer)), t.isBind = !0
        }, ctnLeave: function () {
            var t = this, e = t.config;
            t.$navItemList.removeClass(e.navItemOn), t.$popCtn.hide(), t.$popItemList.hide(), t.moveTimer = null, t.enterTimer = null
        }, reBindNavItemEnter: function () {
            var t = this, e = t.config;
            t.$navCtn.delegate(e.navItemHook, "mouseenter.itemEnter", {
                thisObj: t,
                callback: e.itemEnterCallBack
            }, t.navItemEnter), t.isBind = !0
        }, unbindNavItemEnter: function () {
            var t = this;
            t.config;
            t.$navCtn.undelegate(".itemEnter"), t.isBind = !1
        }, navItemEnter: function (t) {
            var e = t.data.thisObj, i = $(this), n = e.config, o = t.data.callback,
                s = $(this).index(n.$container.selector + " " + n.navItemHook);
            i.addClass(n.navItemOn).siblings(n.$container.selector + " " + n.navItemHook).removeClass(n.navItemOn), e.$popCtn.show();
            var a = e.$popItemList.eq(s);
            a.show().siblings(n.$container.selector + " " + n.popItemHook).hide(), n.isAuto && e.popAutoShow(s, i), "function" == typeof o && o({$displayEl: a})
        }, popAutoShow: function (t, e) {
            var i = this, e = e, n = i.config, t = e.index(n.$container.selector + " " + n.navItemHook), o = [], s = 0;
            switch (o = i.getNavItemInfo(), n.menuDirection) {
                case"right":
                    i.$popCtn.css({
                        position: "absolute",
                        left: o[t].thisWidth + "px",
                        top: o[t].thisPstY - o[t].thisHeight + "px",
                        right: "auto",
                        bottom: "auto"
                    }), s = i.$window.height().toFixed(0) - (o[t].thisPageY - i.$window.scrollTop()), o[t].thisPstY < o[t].thisHeight ? i.$popCtn.css("top", "0px") : s < i.$popCtn.height().toFixed(0) && i.$popCtn.css({top: o[t].thisPstY - (i.$popCtn.height().toFixed(0) - s) + "px"});
                    break;
                case"left":
                    i.$popCtn.css({
                        position: "absolute",
                        left: "auto",
                        top: o[t].thisPstY - o[t].thisHeight + "px",
                        right: o[t].thisWidth + "px",
                        bottom: "auto"
                    }), s = i.$window.height().toFixed(0) - (o[t].thisPageY - i.$window.scrollTop()), o[t].thisPstY < o[t].thisHeight ? i.$popCtn.css("top", "0px") : s < i.$popCtn.height().toFixed(0) && i.$popCtn.css({top: o[t].thisPstY - (i.$popCtn.height().toFixed(0) - s) + "px"})
            }
        }, navItemMove: function (t) {
            function e() {
                clearTimeout(n.moveTimer), n.isBind && n.unbindNavItemEnter(), n.moveTimer = setTimeout(function () {
                    n.reBindNavItemEnter()
                }, 100)
            }

            function i() {
                clearTimeout(n.moveTimer), n.isBind || n.reBindNavItemEnter()
            }

            var n = t.data.thisObj, o = $(this), s = n.config, a = t, c = s.moveDeg * (2 * Math.PI / 360),
                h = Math.tan(c).toFixed(2), m = 0, l = 0, r = 0, p = null, u = null;
            if (n.potCollect.push({
                    x: a.pageX,
                    y: a.pageY
                }), n.potCollect.length > 4)switch (n.potCollect.shift(), p = n.potCollect[0], u = n.potCollect[n.potCollect.length - 1], l = u.x - p.x, r = u.y - p.y, m = Math.abs((r / l).toFixed(2)), s.menuDirection) {
                case"right":
                    m <= h && l > 0 ? e() : i();
                    break;
                case"left":
                    m <= h && l < 0 ? e() : i()
            }
            return clearTimeout(n.enterTimer), n.enterTimer = setTimeout(function () {
                o.trigger("mouseenter", {thisObj: n, callback: s.itemEnterCallBack})
            }, 300), !1
        }, navItemLeave: function (t) {
            var e = t.data.thisObj;
            $(this), e.config;
            clearTimeout(e.enterTimer)
        }
    });
    return i
});