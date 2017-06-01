define("//taotao.com/mtd/pc/components/carousel/1.0.0/carousel.js", [], function() {
    "use strict";
    var t = _.Class.extend({
        construct: function(t) {
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
                onFirstSwitch: function() {},
                onBeforeSwitch: function() {},
                onAfterSwitch: function() {}
            }, t),
                this.$container = $(this.container),
                this.init()
        },
        init: function() {
            this.initElements(),
                this.initEvent(),
                this.hasSwitched = [],
                this.setCurrent(this.startIndex),
            this.isAuto && this.start()
        },
        initElements: function() {
            switch (this.$items = this.$container.find(this.itemSelector),
                this.length = this.$items.length,
                this.switchType) {
                case "fade":
                    this.$items.css({
                        opacity: 0,
                        zIndex: 0,
                        position: "absolute"
                    });
                    break;
                case "slide":
                    var t = this.$items
                        , i = $(t.get(0)).clone()
                        , s = $(t.get(this.length - 1)).clone();
                    this.$container.append(i).prepend(s),
                        this.$items = this.$container.find(this.itemSelector),
                        this.$container.css({
                            width: (this.length + 2) * this.itemWidth,
                            position: "absolute",
                            top: 0,
                            left: -this.itemWidth
                        })
            }
            return this
        },
        initEvent: function() {
            return this.$container.bind("mouseenter", $.proxy(this.stop, this)).bind("mouseleave", $.proxy(this.start, this)),
                this
        },
        setCurrent: function(t) {
            this.currentIndex = t,
            $.inArray(t, this.hasSwitched) < 0 && $.isFunction(this.onFirstSwitch) && (this.onFirstSwitch(t),
                this.hasSwitched.push(t));
            var i = this.$items
                , s = $(i.get(t));
            switch (i.removeClass(this.activeClass),
                s.addClass(this.activeClass),
                this.switchType) {
                case "fade":
                    $(i.get(t)).css({
                        opacity: 1,
                        zIndex: this.zIndex
                    })
            }
            return this
        },
        getCurrent: function() {
            return this.currentIndex
        },
        switchTo: function(t) {
            switch (this.switchType) {
                case "fade":
                    var i = this.$items
                        , s = this.currentIndex
                        , e = $(i.get(s))
                        , n = null;
                    t >= this.length ? t = 0 : t <= -1 && (t = this.length - 1),
                        n = $(i.get(t)),
                    $.isFunction(this.onBeforeSwitch) && this.onBeforeSwitch.call(this, s, t),
                        i.each(function(t) {
                            var i = $(this);
                            parseFloat(i.css("opacity")) > 0 && t !== s && i.stop().fadeTo(this.duration, 0).css("zIndex", "0")
                        }),
                        e.stop().fadeTo(this.duration, 0, $.proxy(function() {
                            e.css("zIndex", "0")
                        }, this)),
                        n.stop().fadeTo(this.duration, 1, $.proxy(function() {
                            this.setCurrent(t),
                                n.css({
                                    opacity: 1,
                                    zIndex: this.zIndex
                                }),
                            $.isFunction(this.onAfterSwitch) && this.onAfterSwitch.call(this, this.currentIndex)
                        }, this));
                    break;
                case "slide":
                    var i = this.$items
                        , e = $(i.get(this.currentIndex));
                    $.isFunction(this.onBeforeSwitch) && this.onBeforeSwitch.call(this, this.currentIndex, t),
                        this.$container.animate({
                            left: -(t + 1) * this.itemWidth
                        }, this.duration, $.proxy(function() {
                            t >= this.length ? (t = 0,
                                this.$container.css("left", -this.itemWidth * (t + 1))) : t <= -1 && (t = this.length - 1,
                                    this.$container.css("left", -this.itemWidth * (t + 1))),
                                this.setCurrent(t),
                            $.isFunction(this.onAfterSwitch) && this.onAfterSwitch.call(this, this.currentIndex)
                        }, this))
            }
            return this
        },
        switchToPrev: function() {
            var t = this.currentIndex - 1;
            return this.switchTo(t),
                this
        },
        switchToNext: function() {
            var t = this.currentIndex + 1;
            return this.switchTo(t),
                this
        },
        start: function() {
            return clearTimeout(this.autoTimer),
                this.autoTimer = setTimeout($.proxy(function() {
                    this.switchToNext().start()
                }, this), this.delay),
                this
        },
        stop: function() {
            return clearTimeout(this.autoTimer),
                this
        },
        destroy: function() {
            this.unbind(),
                this.$container.remove()
        },
        unbind: function() {
            return this.$container.unbind(),
                this
        }
    });
    return t
});
define("//taotao.com/mtd/pc/components/util/1.0.0/util.js", [], function() {
    "use strict";
    return {
        throttle: function(e, t, n) {
            var a, u, i, r = null, l = 0;
            n || (n = {});
            var c = function() {
                l = n.leading === !1 ? 0 : (new Date).getTime(),
                    r = null,
                    i = e.apply(a, u),
                r || (a = u = null)
            };
            return function() {
                var s = (new Date).getTime();
                l || n.leading !== !1 || (l = s);
                var o = t - (s - l);
                return a = this,
                    u = arguments,
                    o <= 0 || o > t ? (clearTimeout(r),
                        r = null,
                        l = s,
                        i = e.apply(a, u),
                    r || (a = u = null)) : r || n.trailing === !1 || (r = setTimeout(c, o)),
                    i
            }
        },
        debounce: function(e, t, n) {
            var a, u, i, r, l, c = function() {
                var s = (new Date).getTime() - r;
                s < t && s > 0 ? a = setTimeout(c, t - s) : (a = null,
                n || (l = e.apply(i, u),
                a || (i = u = null)))
            };
            return function() {
                i = this,
                    u = arguments,
                    r = (new Date).getTime();
                var s = n && !a;
                return a || (a = setTimeout(c, t)),
                s && (l = e.apply(i, u),
                    i = u = null),
                    l
            }
        },
        indexOf: function(e, t) {
            var n = e.length
                , a = Number(arguments[2]) || 0;
            for (a < 0 && (a += n); a < n; ) {
                if (a in e && e[a] === t)
                    return a;
                a++
            }
            return -1
        },
        getCalendar: function(e, t) {
            if (!(!e instanceof Date)) {
                var n = e.getMonth() + 1
                    , a = e.getFullYear()
                    , u = e.getDate() + (t || 0);
                switch (0 === u && (n -= 1,
                0 === n && (n = 12,
                    a -= 1)),
                    n) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        u = 0 === u ? 31 : u,
                        u > 31 && (n += 1,
                            u = 1);
                        break;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        u = 0 === u ? 30 : u,
                        u > 30 && (n += 1,
                            u = 1);
                        break;
                    case 2:
                        a % 4 == 0 ? (u = 0 === u ? 29 : u,
                        u > 29 && (n += 1,
                            u = 1)) : (u = 0 === u ? 28 : u,
                        u > 28 && (n += 1,
                            u = 1))
                }
                return n > 12 && (n = 1,
                    a += 1),
                a + "/" + n + "/" + u
            }
        }
    }
});
define("//taotao.com/mtd/pc/components/tab/1.0.0/tab.js", [], function() {
    "use strict";
    var t = _.Class.extend({
        construct: function(t) {
            this.conf = $.extend({
                container: null,
                head: null,
                headItems: null,
                content: null,
                contentItems: null,
                startAt: 0,
                activeClass: "active",
                hash: !1,
                hoverToSwitch: !1,
                onBeforeSwitch: function() {},
                onAfterSwitch: function() {},
                onFirstShow: function() {}
            }, t),
                this.index = void 0;
            var e = this.conf;
            this.$el = $(e.container),
                this.$head = e.head ? $(e.head) : this.$el.children(".mod_tab_head, .J_tab_head"),
                this.$headItems = e.headItems ? "string" == typeof e.headItems ? this.$head.children(e.headItems) : $(e.headItems) : this.$head.children(".mod_tab_head_item, .J_tab_head_item"),
                this.$content = e.content ? $(e.content) : this.$el.children(".mod_tab_content, .J_tab_content"),
                this.$contentItems = e.contentItems ? "string" == typeof e.contentItems ? this.$content.children(e.contentItems) : $(e.contentItems) : this.$content.children(".mod_tab_content_item, .J_tab_content_item"),
                this.tabLength = this.$headItems.length;
            for (var i = 0, n = this.$headItems.length; i < n; i++)
                this.$headItems[i].hasShown = !1;
            this.init()
        },
        init: function() {
            var t = this.conf
                , e = -1
                , i = window.location.hash;
            t.hash && i.length > 1 ? this.switchTo(i) : ("string" == typeof t.startAt ? (this.$active = this.$headItems.filter(t.startAt),
                e = this.$active.length ? this.$active.index() : 0) : e = "number" == typeof t.startAt ? t.startAt : 0,
                this.switchTo(e)),
                this.initEvent()
        },
        initEvent: function() {
            var t = this
                , e = t.conf
                , i = "click";
            e.hoverToSwitch && (i = "mouseenter"),
                this.$head.delegate(".mod_tab_head_item, .J_tab_head_item", i, function(e) {
                    e && e.preventDefault();
                    var i = $(this).index();
                    t.switchTo(i)
                })
        },
        switchTo: function(t) {
            var e = this.conf;
            if (e.hash) {
                var i;
                if ("string" == typeof t && (i = t.replace("#", ""),
                        this.$active = this.$headItems.filter("[data-hash$=" + i + "]"),
                        t = this.$active.index()),
                    "number" == typeof t && (i = this.$headItems.eq(t).attr("data-hash")),
                    t === -1)
                    return -1;
                window.location.hash = i
            }
            if (t = parseInt(t, 10),
                t !== this.index)
                return this.index = t,
                "function" == typeof e.onBeforeSwitch && e.onBeforeSwitch.call(this, t, this),
                    this.$headItems.removeClass(e.activeClass).eq(t).addClass(e.activeClass),
                    this.$contentItems.hide().eq(t).show(),
                "function" == typeof e.onAfterSwitch && e.onAfterSwitch.call(this, t, this),
                this.$headItems[t].hasShown || "function" != typeof e.onFirstShow || (e.onFirstShow.call(this, t, this),
                    this.$headItems[t].hasShown = !0),
                    this
        },
        switchToNext: function() {
            var t = this.index + 1;
            return t >= this.tabLength && (t = 0),
                this.switchTo(t),
                this
        },
        switchToPrev: function() {
            var t = this.index - 1;
            return t <= 0 && (t = this.tabLength - 1),
                this.switchTo(t),
                this
        },
        destroy: function() {
            this.unbind(),
                this.$el.remove()
        },
        unbind: function() {
            return this.$head.undelegate(),
                this
        },
        setOptions: function(t) {
            return $.extend(this.conf, t),
                this
        }
    });
    return t
});
define("//taotao.com/mtd/pc/components/lazyload/2.0.0/lazyload.js", [], function() {
    "use strict";
    !function(window, $) {
        var $window = $(window)
            , _height = $window.height()
            , _scrollTop = $window.scrollTop()
            , _event = new _.Events
            , _getWindowHeight = function() {
            return window.innerHeight ? function() {
                return window.innerHeight
            }
                : function() {
                    return $window.height()
                }
        }();
        _.eventCenter.on("lazyload:DOMUpdate", function(e) {
            _height = _getWindowHeight(),
                _event.trigger("lazyload:load", e)
        }),
            $window.bind("scroll.o2-lazyload", function(e) {
                _scrollTop = $window.scrollTop(),
                    _event.trigger("lazyload:load")
            }),
            $window.bind("resize.o2-lazyload", function(e) {
                _height = _getWindowHeight(),
                    _scrollTop = $window.scrollTop(),
                    _event.trigger("lazyload:load")
            });
        var Util = {
            setCookie: function(e, t, o, i) {
                if (i || (i = location.hostname),
                    arguments.length > 2) {
                    var n = new Date((new Date).getTime() + parseInt(60 * o * 60 * 24 * 30 * 1e3));
                    document.cookie = e + "=" + escape(t) + "; path=/; domain=" + i + "; expires=" + n.toGMTString()
                } else
                    document.cookie = e + "=" + escape(t) + "; path=/; domain=" + i
            },
            getCookie: function(e) {
                try {
                    return null == document.cookie.match(new RegExp("(^" + e + "| " + e + ")=([^;]*)")) ? "" : decodeURIComponent(RegExp.$2)
                } catch (t) {
                    return null == document.cookie.match(new RegExp("(^" + e + "| " + e + ")=([^;]*)")) ? "" : RegExp.$2
                }
            },
            getUrlParams: function(key) {
                var query = location.search
                    , reg = "/^.*[\\?|\\&]" + key + "\\=([^\\&]*)/";
                reg = eval(reg);
                var ret = query.match(reg);
                return null != ret ? decodeURIComponent(ret[1]) : ""
            },
            inviewport: function() {
                var e = function(e, t) {
                    return _height + _scrollTop <= e.top - t
                }
                    , t = function(e, t) {
                    return _scrollTop >= e.top + t + e.height
                };
                return function(o, i) {
                    return !e(o, i) && !t(o, i)
                }
            }()
        }
            , Lazyload = function(e) {
            this.$self = e.$self,
                this.webpSupported = !1,
                this.forceOpenWebP = !1,
                this._loadTimer = null,
                this._imgInfo = [],
                this._loaded = {},
                this.settings = e.settings
        };
        Lazyload.prototype._setImg = function(e, t, o) {
            t.attr("src", o),
                e.onload = null
        }
            ,
            Lazyload.prototype._loadImg = function(e) {
                var t = e.$el
                    , o = e.src
                    , i = o
                    , n = e.webpDisable
                    , a = this;
                if (!e.loading) {
                    e.loading = !0;
                    var r = new Image
                        , l = !1
                        , s = this.settings;
                    this.webpSupported && s.webpReg.test(o) && n !== s.webpDisableValue || this.forceOpenWebP ? i = o + "!q" + s.webpQuality + s.webpSuffix : s.quality !== -1 && (i = o + "!q" + s.quality),
                        r.onload = function() {
                            l = !0,
                                e.loading = !1,
                                e.done = !0,
                                t.attr(s.source, "done"),
                                a._setImg(r, t, i)
                        }
                        ,
                        r.onerror = function() {
                            e.webpDisable = "no",
                                e.loading = !1
                        }
                        ,
                        r.src = i,
                    1 != r.complete || l || (l = !0,
                        e.loading = !1,
                        e.done = !0,
                        t.attr(s.source, "done"),
                        this._setImg(r, t, i))
                }
            }
            ,
            Lazyload.prototype._loadImgs = function() {
                var e = this._imgInfo.length
                    , t = this;
                for ($.each(this._imgInfo, function(e, o, i) {
                    var n = o.$el;
                    !o.done && Util.inviewport(o, t.settings.threshold) && (o.src || n.attr("src", t.settings.placeholder),
                        t._loadImg(o))
                }); e--; )
                    1 == this._imgInfo[e].done && this._imgInfo.splice(e, 1)
            }
            ,
            Lazyload.prototype._update = function() {
                clearTimeout(this._loadTimer),
                    this._loadTimer = setTimeout($.proxy(this._loadImgs, this), this.settings.delay)
            }
            ,
            Lazyload.prototype._refreshDOMEl = function(e) {
                if (1 != e.attr("data-inlazyqueue")) {
                    e.attr("data-inlazyqueue", !0);
                    var t = this;
                    $("img", e).each(function(e, o) {
                        var i = $(o)
                            , n = i.attr(t.settings.source);
                        n && "done" != n && t._imgInfo.push({
                            $el: i,
                            src: n,
                            done: !1,
                            top: i.offset().top,
                            height: i.height(),
                            loading: !1,
                            webpDisable: i.attr(t.settings.webpDisableKey)
                        })
                    })
                }
            }
            ,
            Lazyload.prototype._refreshDOMPos = function(e) {
                $.each(this._imgInfo, function(t, o, i) {
                    i[t].top = e.offset().top,
                        i[t].height = e.height()
                })
            }
            ,
            Lazyload.prototype._initEvent = function() {
                $(document).ready($.proxy(this._update, this)),
                    _.eventCenter.on("lazyload:DOMUpdate", $.proxy(this._refreshDOMEl, this)),
                    _event.on("lazyload:load", $.proxy(this._update, this))
            }
            ,
            Lazyload.prototype._isInit = function() {
                return "1" === this.$self.attr(this.settings.source + "-install") || (this.$self.attr(this.settings.source + "-install", "1"),
                        !1)
            }
            ,
            Lazyload.prototype.init = function(e) {
                if (!this._isInit()) {
                    var t = Util.getUrlParams(this.settings.forceOpenOrCloseWebP);
                    this.webpSupported = e,
                    "1" === t && (this.forceOpenWebP = !0),
                        this._initEvent()
                }
            }
            ,
            $.fn.o2lazyload = function(e) {
                var t, o = this, i = $(o);
                t = $.extend({
                    threshold: 200,
                    delay: 100,
                    source: "data-lazy-img",
                    supportWebp: !0,
                    cacheSupportWebp: !0,
                    cacheSupportWebpKey: "o2-webp",
                    quality: -1,
                    webpReg: /\/\/img\d+.360buyimg.com\/.+\.(jpg|png)$/,
                    webpSuffix: ".webp",
                    webpQuality: 80,
                    webpDisableKey: "data-webp",
                    webpDisableValue: "no",
                    forceOpenOrCloseWebP: "o2-webp",
                    placeholder: "//taotao.com/lib/img/e/blank.gif"
                }, e);
                var n = new Lazyload({
                    $self: i,
                    settings: t
                })
                    , a = function(e) {
                    if ("0" === Util.getUrlParams(t.forceOpenOrCloseWebP))
                        return void e(!1);
                    if (!t.supportWebp)
                        return void e(!1);
                    if (t.cacheSupportWebp) {
                        var o = Util.getCookie(t.cacheSupportWebpKey);
                        if ("" !== o)
                            return void e("true" === o || o === !0)
                    }
                    var i = new Image;
                    i.onload = function() {
                        var o = i.width > 0 && i.height > 0;
                        e(o),
                        t.cacheSupportWebp && Util.setCookie(t.cacheSupportWebpKey, o, 1)
                    }
                        ,
                        i.onerror = function() {
                            e(!1),
                            t.cacheSupportWebp && Util.setCookie(t.cacheSupportWebpKey, !1, 1)
                        }
                        ,
                        i.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA"
                };
                return a(function(e) {
                    n.init(e)
                }),
                    this
            }
    }(window, jQuery)
});
define("home/widget/head", ["//taotao.com/jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js", "//taotao.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js", "//taotao.com/jdf/1.0.0/unit/login/3.0.0/login.js", "//taotao.com/jdf/1.0.0/unit/event/1.0.0/event.js", "//taotao.com/jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js", "//taotao.com/jdf/1.0.0/unit/globalReco/1.0.0/globalReco.js", "//taotao.com/jdf/1.0.0/unit/cookie/1.0.0/cookie.js", "//taotao.com/jdf/1.0.0/unit/search/1.0.0/search.js", "//taotao.com/jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js", "//taotao.com/jdf/1.0.0/unit/log/1.0.0/log.js", "home/widget/head_areamini", "home/widget/head_myjd", "home/widget/head_setUserinfo", "home/widget/head_shoppingcart"], function(require, exports, module) {
    var t = require("conf")
        , i = require("load_async")
        , e = (require("jdf/1.0.0/unit/log/1.0.0/log.js"),
        require("jdf/1.0.0/unit/cookie/1.0.0/cookie.js"))
        , a = (require("jdf/1.0.0/ui/dropdown/1.0.0/dropdown.js"),
        require("jdf/1.0.0/unit/localStorage/1.0.0/localStorage.js"))
        , n = function() {};
    n.prototype._loadingText = '<div class="dd-spacer"></div><div class="dd-inner"><span class="loading"></span></div>',
        n.prototype.init = function() {
            require("//taotao.com/jdf/1.0.0/unit/search/1.0.0/search.js");
            var t = $("#key");
            $("#shortcut").bind("mouseenter", function() {
                t.blur()
            }),
                this._initHotkey(),
                this._initHotwords(),
                this._initSearchFix(),
                this._initShoppingcart(),
                this._initAreamini(),
                this._initMyjd(),
                this._initSetUserInfo(),
                this._initMobile(),
                this._initService(),
                this._initSiteNav();
            var i = $("#ttbar-mycity .ui-areamini-text-wrap");
            i.prepend('<i class="iconfont">&#xe604;</i>')
        }
        ,
        n.prototype._initHotkey = function() {
            var t = require("//taotao.com/jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js");
            t()
        }
        ,
        n.prototype._initHotwords = function() {
            i({
                url: t.INTERFACE.HOT_WORDS,
                params: {
                    pin: pageConfig.user.pin,
                    uuid: pageConfig.user.uuid
                },
                dataType: "jsonp",
                scriptCharset: "utf-8",
                cache: !0,
                jsonpCallback: "jsonCallBackHotWords"
            }).then(function(t) {
                if (t && "object" == typeof t) {
                    var i = t.data
                        , e = ""
                        , a = []
                        , n = 0
                        , o = 0
                        , s = $("#search #key");
                    if ($.each(i, function(t, i) {
                            if (i.n)
                                if (2 == i.c && n++ < 10)
                                    a.push(i.n);
                                else if (o < 9) {
                                    var s = 1 == i.c ? 'class="style-red"' : "";
                                    e += '<a href="' + i.u + '" target="_blank" ' + s + ' clstag="h|keycount|2016|03b0' + (1 + t) + '">' + i.n + "</a>",
                                        o++
                                }
                        }),
                            $("#hotwords").html(e),
                            a.length) {
                        var c, d, r, l = 0, h = a.length;
                        r = function(t) {
                            clearTimeout(d),
                            t && (c = a[l],
                                s.val(c),
                                d = setTimeout(function() {
                                    l = (l + 1) % h,
                                        r(!0)
                                }, 3e3))
                        }
                            ,
                            s.bind("focus", function() {
                                r(!1),
                                s.val() == c && s.val("").css("color", "#333")
                            }).bind("blur", function() {
                                s.val() || (r(!0),
                                    s.val(c).css("color", "#999"))
                            }),
                            r(!0)
                    }
                }
            })
        }
        ,
        n.prototype._initSearchFix = function() {
            var t, i = function(t, i) {
                var e = !1
                    , a = !1;
                return function() {
                    return e ? void (a = !0) : (e = !0,
                        setTimeout(function() {
                            e = !1,
                            a && (t(),
                                a = !1)
                        }, i),
                        void t())
                }
            }, e = $(window);
            t = function() {
                this.opts = {},
                    this.$el,
                    this._state = 0
            }
                ,
                t.prototype._judge = function() {
                    e.scrollTop() > this.opts.offset && 0 == this._state ? (this._state = 1,
                        this.$el.addClass("search-fix")) : e.scrollTop() <= this.opts.offset && 1 == this._state && (this._state = 0,
                            this.$el.removeClass("search-fix"))
                }
                ,
                t.prototype._bind = function() {
                    var t = this;
                    e.bind("scroll.searchFix", i(function() {
                        t._judge()
                    }, 100))
                }
                ,
                t.prototype.init = function(t) {
                    $.extend(this.opts, {
                        offset: 788
                    }, t),
                        this.$el = $(this.opts.el),
                        this._judge(),
                        this._bind()
                }
                ,
                (new t).init({
                    el: "#search",
                    offset: 660
                })
        }
        ,
        n.prototype._initShoppingcart = function() {
            var t = require("home/widget/head_shoppingcart");
            t()
        }
        ,
        n.prototype._initAreamini = function() {
            var t = (require("home/widget/head_areamini"),
                '      <div class="dt cw-icon ui-areamini-text-wrap" style="display:none;">        <i class="ci-right"><s>◇</s></i>        <i class="ci-left"></i>        <span class="ui-areamini-text"></span>       </div>      <div class="dd dorpdown-layer">        <div class="dd-spacer"></div>        <div class="ui-areamini-content-wrap">           <div class="ui-areamini-content"></div>         </div>       </div>');
            $("#ttbar-mycity").html(t).areamini({
                hasCssLink: !1,
                className: {
                    hover: "hover",
                    selected: "selected"
                },
                provinceList: [{
                    name: "海外",
                    tpl: '<div class="item"><a href="//en.taotao.com/" target="_blank" data-onchange="1"><%=name%></a></div>'
                }],
                tplContentWrap: '<div class="ui-areamini-content-list"><%=list%></div>',
                tplContentItem: '<div class="item"><a data-id="<%=id%>" href="javascript:void(0)"><%=name%></a></div>',
                syncServer: !0,
                writeCookie: !1,
                threeWordDeal: function(t) {
                    var i = t.find(".ui-areamini-text").html()
                        , e = t.find(".dd-spacer");
                    3 == i.length ? e.addClass("dd-spacer-extend") : e.removeClass("dd-spacer-extend")
                },
                onReady: function(t) {
                    this.el.find(".ui-areamini-text-wrap").show();
                    var i = e("areaId");
                    if (a.check() && i) {
                        var n = "areaId";
                        a.get(n) ? a.get(n) != i && (a.set(n, i),
                                a.clearByReg("^jd_home_2015_")) : a.set(n, i)
                    }
                    this.options.threeWordDeal(this.el)
                },
                onChange: function(t, i, e) {
                    this.options.threeWordDeal(this.el),
                    "undefined" != typeof i && window.location.reload()
                }
            })
        }
        ,
        n.prototype._initMyjd = function() {
            var t = require("home/widget/head_myjd");
            t()
        }
        ,
        n.prototype._initSetUserInfo = function() {
            var t = require("home/widget/head_setUserInfo");
            new t({
                $userName: $("#ttbar-login")
            }).init()
        }
        ,
        n.prototype._initMobile = function() {
            var t = $("#J_mobile")
                , i = $("#J_mobile_pop")
                , e = !1
                , a = null;
            t.bind("mouseenter", function(n) {
                clearTimeout(a),
                    a = setTimeout(function() {
                        t.addClass("mobile_on"),
                        e || (e = !0,
                            seajs.use("home/widget/mobile_pop", function(t) {
                                t({
                                    $el: i
                                })
                            }))
                    }, 200)
            }),
                t.bind("mouseleave", function(i) {
                    clearTimeout(a),
                        t.removeClass("mobile_on")
                })
        }
        ,
        n.prototype._initService = function() {
            $("#ttbar-serv .dd").html(this._loadingText),
                $("#ttbar-serv").dropdown({
                    enterDelay: 50,
                    trigger: !0,
                    current: "hover",
                    onchange: function(t) {
                        t.attr("data-load") || (t.attr("data-load", 1),
                            i({
                                url: "//dc.3.cn/client/get",
                                backup: "//d.taotao.com/client/get",
                                dataType: "jsonp",
                                scriptCharset: "UTF-8",
                                cache: !0,
                                jsonpCallback: "getClientCallback"
                            }).then(function(t) {
                                if (t && "object" == typeof t) {
                                    t = t.data;
                                    var i = '<div class="dd-spacer"></div>'
                                        , e = ['<div class="item-client">客户</div>']
                                        , a = ['<div class="item-business">商户</div>'];
                                    $.each(t, function(i) {
                                        var n = t[i]
                                            , o = !n.type;
                                        0 == n.c && e.push('<div class="item"><a href="' + n.u + '" target="_blank" ' + o + ">" + n.n + "</a></div>"),
                                        1 == n.c && a.push('<div class="item"><a href="' + n.u + '" target="_blank" ' + o + ">" + n.n + "</a></div>")
                                    }),
                                        i += e.join(""),
                                    a.length > 1 && (i += a.join("")),
                                        $("#ttbar-serv .dd").html(i)
                                }
                            }))
                    }
                })
        }
        ,
        n.prototype._initSiteNav = function() {
            $("#ttbar-navs .dd").html(this._loadingText),
                $("#ttbar-navs").dropdown({
                    enterDelay: 50,
                    trigger: !0,
                    current: "hover",
                    leaveDelay: 100,
                    onchange: function(t) {
                        t.attr("data-load") || (t.attr("data-load", 1),
                            i({
                                url: "//dc.3.cn/navigation/get",
                                backup: "//d.taotao.com/navigation/get",
                                dataType: "jsonp",
                                scriptCharset: "UTF-8",
                                cache: !0,
                                jsonpCallback: "getNavigationCallback"
                            }).then(function(t) {
                                if (t && "object" == typeof t) {
                                    t = t.data;
                                    var i = '<div class="dd-spacer"></div>';
                                    $.each(t, function(e) {
                                        var a = t[e]
                                            , n = a.s
                                            , o = "";
                                        $.each(n, function(t) {
                                            var i = n[t]
                                                , e = i.c ? 'class="' + i.c + '"' : "";
                                            o += '<div class="item"><a href="' + i.u + '" target="_blank" ' + e + ">" + i.n + "</a></div>"
                                        });
                                        var s = a.n
                                            , c = a.c ? 'class="' + a.c + '"' : "";
                                        a.u && (s = '<a href="' + a.u + '" target="_blank" ' + c + ">" + a.n + "</a>"),
                                            i += '<dl class="fore' + (e + 1) + '">                    <dt>' + s + "</dt>                    <dd>" + o + "</dd>                  </dl>"
                                    }),
                                        $("#ttbar-navs .dd").html(i)
                                }
                            }))
                    }
                })
        }
        ,
        module.exports = new n
});
define("home/widget/cate", function(require) {
    "use strict";
    var t = require("conf")
        , e = require("load_async")
        , a = _.Class.extend({
        statics: {
            NO_HTTPS_DOMAIN_REG: /^\/\/(car\.jd\.com|group\.jd\.com|huishou\.jd\.com|dujia\.jd\.com)/
        },
        construct: function(t) {
            this.conf = $.extend({
                $el: null
            }, t),
                this.init()
        },
        init: function() {
            var e = this.conf
                , a = e.$el.attr("data-type")
                , i = pageConfig.leftCateABtestSwitch
                , n = t.INTERFACE;
            e.type = a ? a : "home",
                e.isSubDataLoaded = !1,
                e.isPopMenuBinded = !1,
                e.dataUrl = n.CATE_A,
                e.dataBackupUrl = n.CATE_A_BACKUP_PC,
                e.scriptCharset = "UTF-8";
            var l = pageConfig.user.jda
                , s = !0;
            if (i && "string" == typeof l) {
                var c = pageConfig.leftCateABtestSection || {
                        start: 1e3,
                        end: 2e3
                    }
                    , o = pageConfig.user.unifiedHash;
                o > c.start && o <= c.end && (s = !1)
            }
            "boolean" == typeof pageConfig.isCateUseA ? pageConfig.isCateUseA || (e.dataUrl = n.CATE_B,
                    e.dataBackupUrl = n.CATE_B_BACKUP_PC,
                    e.scriptCharset = "utf-8") : s || (e.dataUrl = n.CATE_B,
                    e.dataBackupUrl = n.CATE_B_BACKUP_PC,
                    e.scriptCharset = "utf-8"),
                pageConfig.leftCateABtestUseA = s,
                e.imgIndex = 0,
                this.$popCtn = $(".JS_popCtn", this.conf.$el),
                this.loaded = !1,
                this.initEvent()
        },
        initEvent: function() {
            var t = this
                , e = this.conf.$el
                , a = null
                , i = null
                , n = null
                , l = !1;
            e.bind("mouseenter", function() {
                i && clearTimeout(i),
                    i = setTimeout(function() {
                        l || (l = !0,
                            t.initSubCate())
                    }, 200)
            }).one("mousemove", function() {
                n && clearTimeout(n),
                    n = setTimeout(function() {
                        l || (l = !0,
                            t.initSubCate())
                    }, 200)
            }).one("mouseleave", function() {
                e.find(".cate_menu_item").removeClass("hover")
            }).delegate(".cate_menu_item", "mouseenter", function(e) {
                a && clearTimeout(a),
                    a = setTimeout(function() {
                        t.conf.isPopMenuBinded || (t._hoverel = $(e.currentTarget),
                            t.$popCtn.show())
                    }, 200)
            }).bind("mouseleave", function() {
                a && clearTimeout(a),
                i && clearTimeout(i),
                t.conf.isPopMenuBinded || t.$popCtn.hide()
            })
        },
        initSubCate: function() {
            var t = this
                , e = t.conf.$el;
            t.conf.isSubDataLoaded || t.getSubCateData(this.conf.type, function() {
                var a = $("#J_popCtn");
                $(".cate_part", a);
                require.async("O2_COMPONENT/sidePopMenu/1.0.0/sidePopMenu.js", function(i) {
                    new i({
                        $container: e,
                        navItemHook: ".cate_menu_item",
                        navItemOn: "cate_menu_item_on",
                        popItemHook: ".cate_part",
                        itemEnterCallBack: function(t) {
                            var i = $(window).scrollTop()
                                , n = e.offset().top
                                , l = 0;
                            i > n && (l = i - n),
                                a.css({
                                    top: l
                                }),
                                _.eventCenter.trigger("lazyload:DOMUpdate", t.$displayEl)
                        }
                    });
                    t.$popCtn.is(":hidden") || t._hoverel.trigger("mouseenter.itemEnter"),
                        t.conf.isPopMenuBinded = !0
                })
            })
        },
        getSubCateData: function(a, i) {
            var n = this.conf;
            e({
                url: n.dataUrl,
                scriptCharset: n.scriptCharset,
                cache: !0,
                jsonpCallback: "getCategoryCallback",
                backup: n.dataBackupUrl,
                timeout: t.TIMEOUT,
                dataCheck: function(t) {
                    return !!(t && t.data && t.data.length)
                }
            }).then($.proxy(function(t) {
                this.render(t),
                    this.conf.isSubDataLoaded = !0,
                i && i()
            }, this))
        },
        padding: function(t) {
            return (t < 9 ? "0" : "") + (1 + t)
        },
        render: function(t) {
            var e, a, i, n, l, s, c, o, d, r, u, g, m, f, p, h, _, C, v, k, b = this, x = t.data, T = b.padding, y = "", A = function(t, e, a, i) {
                return "h|keycount|2016|06" + Array.prototype.slice.call(arguments).join("")
            }, $ = x.length;
            for (e = 0; e < $; e++) {
                for (a = x[e],
                         C = '<div class="cate_part_col1">',
                         v = '<div class="cate_part_col2">',
                         p = "",
                         n = a.t.length,
                         i = 0; i < n; i++)
                    p += b.getLinkHtml({
                        str: a.t[i],
                        linkClass: "cate_channel_lk",
                        imagesWidth: null,
                        imagesHeight: 24,
                        level: null,
                        textPrefix: null,
                        textSuffix: '<i class="iconfont cate_channel_arrow">&#xe601;</i>'
                    });
                for (p = '<div class="cate_channel" clstag="' + A(T(e), "b") + '">' + p + "</div>",
                         C += p,
                         f = "",
                         n = a.s.length,
                         i = 0; i < n; i++)
                    for (l = a.s[i],
                             c = l.s.length,
                             s = 0; s < c; s++) {
                        if (o = l.s[s].s,
                                u = b.getLinkHtml({
                                    str: l.s[s].n,
                                    linkClass: "cate_detail_tit_lk",
                                    imagesWidth: null,
                                    imagesHeight: null,
                                    level: 2,
                                    textPrefix: null,
                                    textSuffix: '<i class="iconfont cate_detail_tit_arrow">&#xe601;</i>'
                                }),
                                m = '<dt class="cate_detail_tit" clstag="' + A(T(e), "c", T(s)) + '">' + u + "</dt>",
                                g = "",
                            0 != o)
                            for (r = o.length,
                                     d = 0; d < r; d++)
                                g += b.getLinkHtml({
                                    str: o[d].n,
                                    linkClass: "cate_detail_con_lk",
                                    imagesWidth: null,
                                    imagesHeight: 16,
                                    level: 3,
                                    textPrefix: null,
                                    textSuffix: null,
                                    index: d
                                });
                        g = '<dd class="cate_detail_con" clstag="' + A(T(e), "d", T(s)) + '">' + g + "</dd>",
                            f += '<dl class="cate_detail_item cate_detail_item' + (s + 1) + '">' + m + g + "</dl>"
                    }
                for (f = '<div class="cate_detail">' + f + "</div>",
                         C += f + "</div>",
                         h = "",
                         _ = 0,
                         n = a.b.length,
                         i = 0; i < n; i++)
                    i < 8 && (h += b.getLinkHtml({
                        str: a.b[i],
                        linkClass: "cate_brand_lk",
                        imagesWidth: 83,
                        imagesHeight: 35
                    }),
                        _ += 1);
                for (_ > 0 && _ % 2 == 1 && (h += '<a><img data-lazy-img="//img10.360buyimg.com/da/jfs/t757/162/604852976/158/9ed36f8/54c8699bNc2cfc6a1.png" src="//taotao.com/mtd/pc/common/img/blank.png" /></a>'),
                         h = '<div class="cate_brand" clstag="' + A(T(e), "e") + '">' + h + "</div>",
                         v += h,
                         k = "",
                         n = a.p.length,
                         i = 0; i < n; i++)
                    i < 2 && (k += b.getLinkHtml({
                        str: a.p[i],
                        linkClass: "cate_promotion_lk",
                        imagesWidth: 168,
                        imagesHeight: 134
                    }));
                k = '<div class="cate_promotion" clstag="' + A(T(e), "f") + '">' + k + "</div>",
                    v += k + "</div>",
                    y += '<div class="cate_part clearfix" id="cate_item' + (e + 1) + '" data-id="' + a.id + '">' + C + v + "</div>"
            }
            this.$popCtn.html(y).removeClass("mod_loading")
        },
        getLinkHtml: function(t) {
            var e = t.str
                , i = t.linkClass
                , n = t.imagesWidth
                , l = t.imagesHeight
                , s = t.level
                , c = t.textPrefix
                , o = t.textSuffix
                , d = t.index
                , r = t.clstag ? ' clstag="' + t.clstag + '"' : ""
                , u = e.split("|")
                , g = []
                , m = "";
            u[0] = u[0].replace(/ /g, "");
            var f = /^\d.*\d$/.test(u[0]) ? u[0] : u[0].replace(/^(http\:\/\/|\/\/)/, "");
            "undefined" != typeof s && /^\d.*\d$/.test(u[0]) && (2 === s ? f = "channel.taotao.com/" + u[0] + ".html" : 3 === s && (2 === u[0].split("-").length ? f = "channel.taotao.com/" + u[0] + ".html" : 3 === u[0].split("-").length && (f = "list.taotao.com/list.html?cat=" + u[0].replace(/\-/g, ",")))),
                f = "//" + f,
            "https:" === location.protocol && a.NO_HTTPS_DOMAIN_REG.test(f) && (f = "http:" + f),
                u[2],
            i && g.push(i),
            g.length > 0 && (m = 'class="' + g.join(" ") + '"');
            var p = "";
            return p = u[0] ? '<a href="' + f + '" ' + m + r + ' target="_blank">' : "<span " + m.replace(/lk/, "txt") + ">",
                u[2] ? (this.conf.imgIndex > 4 && (this.conf.imgIndex = 0),
                    n = n ? ' width="' + n + '"' : "",
                    l = l ? ' height="' + l + '"' : "",
                    p += '<img data-lazy-img="//img1' + this.conf.imgIndex + ".360buyimg.com/" + u[2] + '"  ' + n + l + ' src="//taotao.com/mtd/pc/common/img/blank.png" data-webp="no"/>',
                    this.conf.imgIndex += 1) : p += (c || "") + u[1] + (o || ""),
                p += u[0] ? "</a>" : "</span>",
            3 === s && 0 === d && 1 === parseInt(u[3], 10) && u[0] && (g.push(i + "_hot"),
                m = 'class="' + g.join(" ") + '"',
                p = '<a href="' + f + '" ' + m + ' target="_blank"><i class="cate_con_hot_l"></i>' + (c || "") + u[1] + (o || "") + '<i class="cate_con_hot_r"></i></a>'),
                p
        }
    });
    return a
});
define("home/widget/slider", ["O2_COMPONENT/carousel/1.0.0/carousel.js", "O2_COMPONENT/util/1.0.0/util.js"], function(require) {
    "use strict";
    var e = require("O2_COMPONENT/carousel/1.0.0/carousel.js")
        , i = require("O2_COMPONENT/util/1.0.0/util.js")
        , t = require("conf")
        , a = require("logger")
        , o = require("load_async")
        , r = _.Class.extend({
        construct: function(e) {
            this.conf = $.extend({
                $el: null
            }, e),
                this.width = 790,
                this.isWide = pageConfig.compatible && pageConfig.wideVersion,
                this.init()
        },
        init: function() {
            this.buildCarouselDom(),
                this.buildBottom(),
                this.initEvent()
        },
        buildCarouselDom: function() {
            var e = this
                , i = []
                , a = (window,
                t.INTERFACE.FOCUS)
                , r = pageConfig.useBi ? {
                pin: pageConfig.user.pin,
                uuid: pageConfig.user.uuid
            } : {};
            o({
                url: a,
                params: r,
                needStore: !0,
                times: 0,
                timeout: 1e3,
                backup: t.DOMAINS.BACKUP_FLOOR + "focus",
                dataCheck: function(e) {
                    if (e.data && $.isArray(e.data))
                        return !0
                },
                jsonpCallback: "jsonpCallbackFocus"
            }).then(function(t) {
                t.data && $.isArray(t.data) && (i = t.data,
                    e.createCarsouelDom(i))
            })
        },
        createCarsouelDom: function(e) {
            var i = this
                , t = ""
                , a = ""
                , o = this.conf.$el
                , r = $(".J_slider_main", o)
                , s = o.find(".J_slider_list");
            e.splice(6, 2, e.pop()),
                $.each(e, function(e, a) {
                    var o, r, s, n = (a.length,
                        String(102 + e).substring(1));
                    a = pageConfig.FN_GetRandomData(a),
                        pageConfig.clog.logDomain = pageConfig.clog.logDomain || a.logDomain,
                        pageConfig.clog.logV = pageConfig.clog.logV || a.logV,
                        o = i.isWide ? a.src : a.srcB,
                        a.clog ? r = '            <li class="J_slider_item slider_item">              <a href="' + a.href + '"                class="slider_item_lk mod_loading J_slider_item_lk"                fclog="' + a.clog + '"                clstag="' + pageConfig.clstagPrefix + "08a" + n + '"                target="_blank">                <img data-lazy-src="' + o + '"                  alt="' + a.alt + '"                  src="//taotao.com/mtd/pc/common/img/blank.png"                  class="J_slider_item_img slider_item_img" /></a>            </li>' : (s = pageConfig.generateBiLog(a),
                            r = '<li class="J_slider_item slider_item">            <a href="' + a.href + '"              class="slider_item_lk mod_loading J_log"              clstag="' + pageConfig.clstagPrefix + "08a" + n + '"              target="_blank"' + s + '>              <img data-lazy-src="' + o + '"                alt="' + a.alt + '"                src="//taotao.com/mtd/pc/common/img/blank.png"                class="J_slider_item_img slider_item_img" /></a>          </li>'),
                        t += r
                }),
            s.length || (a = '<ul class="slider_list J_slider_list">' + t + '</ul>          <div class="J_slider_indicator slider_indicator"></div><a href="javascript:void(0)" clstag="" class="J_slider_control_prev slider_control_item slider_control_prev"><i class="iconfont">&#xe602;</i></a><a href="javascript:void(0)" clstag="" class="J_slider_control_next slider_control_item slider_control_next"><i class="iconfont">&#xe601;</i></a>',
                r.append(a).removeClass("mod_lazyload")),
                s.append(t),
            pageConfig.enableActMark && $(".J_slider_item_lk", s).append('<i class="mod_actmark mod_actmark_focus"></i>'),
                this.initCarousel(),
                this.initCarouselNav(),
            pageConfig.useBi || this.changeRTB();
            var n = s.find("[fclog]");
            n.length && _.eventCenter.on("home:load", function() {
                pageConfig.sendClog(n)
            })
        },
        buildBottom: function() {
            var e = pageConfig.focusBottomData || {
                    data: []
                }
                , i = !0
                , a = this
                , r = [];
            $.each(e.data, function(e, t) {
                t.isTop ? r.push(e) : i = !1
            }),
                i ? a.createBottomDom(e.data) : o({
                    url: t.INTERFACE.FOCUS_BOTTOM_REC,
                    params: {
                        pin: pageConfig.user.pin,
                        uuid: pageConfig.user.uuid
                    },
                    jsonpCallback: "jsonpCallbackFocusBottomRec",
                    times: 0,
                    timeout: 1e3
                }).then(function(i) {
                    if (i && i.data && 2 !== i.errCode) {
                        var t = i.data
                            , o = e.data;
                        t && t.length ? ($.each(t, function(e) {
                            if ($.inArray(e, r) >= 0 && o[e]) {
                                var i = t[e];
                                t[e] = o[e],
                                t[e + 1] && (t[e + 1] = i)
                            }
                        }),
                        t.length < 2 && o.length && t.push(o[0])) : t = o,
                            a.createBottomDom(t),
                            _.eventCenter.on("home:load", function() {
                                var e = i.impr;
                                e && a.monitor(i.impr)
                            })
                    } else
                        a.createBottomDom(e.data);
                    _.eventCenter.on("home:load", function() {
                        a.errorMonitor(i)
                    })
                }, function(i, t) {
                    a.createBottomDom(e.data),
                        _.eventCenter.on("home:load", function() {
                            a.errorMonitor(null, t)
                        })
                })
        },
        createBottomDom: function(e) {
            var i = ""
                , t = this
                , a = t.conf.$el;
            if (e && e.length)
                for (var o = 0; o < 2; o++) {
                    var r = e[o]
                        , s = r.t.replace(/^http(s?):/, "")
                        , n = ["b", "c"]
                        , l = "";
                    if (/\/\//.test(r.img))
                        l = r.img;
                    else {
                        var c = String(r.sku).match(/(\d)$/) ? r.sku : "11";
                        l = pageConfig.FN_GetImageDomain(c) + r.img
                    }
                    l = pageConfig.processImageUrl(l, "780x260", "390x130"),
                    /\!q/.test(l) || (l += "!q90"),
                        i += '<div class="J_slider_bi slider_bi" clstag="' + pageConfig.clstagPrefix + "08" + n[o] + '" data-clk="' + r.clk + '" data-sku="' + r.sku + '">            <a href="' + s + '" class="slider_bi_lk mod_loading" target="_blank">              <img data-lazy-src="' + l + '" class="J_slider_bi_img slider_bi_img" title="" alt="" src="//taotao.com/lib/img/e/blank.gif" >            </a>          </div>'
                }
            $(".J_slider_extend", a).append(i).removeClass("mod_lazyload").find(".J_slider_bi_img").each(function() {
                var e = $(this);
                t.loadImage(e)
            })
        },
        monitor: function(e) {
            if (e) {
                var i = new Image;
                i.src = e + "&m=UA-J2011-1&ref=" + encodeURIComponent(document.referrer) + "&random=" + Math.random(),
                    i = null
            }
        },
        errorMonitor: function(e, i) {
            var a = t.INTERFACE.FOCUS_BOTTOM_REC_ERR_LOG;
            e ? e.data && e.data.length || this.monitor(a + "2") : "timeout" === i ? this.monitor(a + "3") : this.monitor(a + "4")
        },
        initCarousel: function() {
            var i = this.conf.$el
                , t = i.find(".slider_list")
                , o = t.children().length;
            this.carousel = new e({
                container: t,
                itemSelector: ".slider_item",
                activeClass: "slider_item_active",
                startIndex: 0,
                duration: 300,
                delay: 3e3,
                zIndex: 1,
                switchType: "fade",
                onFirstSwitch: $.proxy(function(e) {
                    var i = $(".J_slider_item", t).eq(e)
                        , r = $(".J_slider_item_img", i)
                        , s = e + 1;
                    s === o && (s = 0);
                    var n = $(".J_slider_item", t).eq(s).find(".J_slider_item_img");
                    a.logArea(i),
                        this.loadImage(r),
                        this.loadImage(n)
                }, this),
                onBeforeSwitch: $.proxy(function(e, i) {
                    var t = $(".slider_indicator_btn", this.conf.$el).eq(i);
                    t.siblings().removeClass("slider_indicator_btn_active").end().addClass("slider_indicator_btn_active")
                }, this)
            })
        },
        loadImage: function(e) {
            if (e.length) {
                var i = e.data("lazy-src");
                i && i.length && e.attr("src", i).one("load", function() {
                    $(this).removeAttr("data-lazy-src").parent().removeClass("mod_loading")
                }).each(function() {
                    this.complete && $(this).load()
                })
            }
        },
        initEvent: function() {
            var e = this;
            this.conf.$el.delegate(".slider_indicator_btn", "mouseenter", i.throttle(function() {
                var i = e.carousel
                    , t = $(this).index();
                i.stop(),
                t !== i.getCurrent() && ($(this).siblings().removeClass("slider_indicator_btn_active").end().addClass("slider_indicator_btn_active"),
                    i.switchTo(t))
            }, 500)).delegate(".J_slider_bottom_btn[data-clk]", "click", function() {
                var i = $(this);
                e.monitor(i.data("clk"))
            }).delegate(".J_slider_control_prev", "click", $.proxy(this.prevCarousel, this)).delegate(".J_slider_control_prev", "mouseenter", function() {
                var i = e.carousel;
                i.stop(),
                    e.restartCarousel()
            }).delegate(".J_slider_control_next", "click", $.proxy(this.nextCarousel, this)).delegate(".J_slider_control_next", "mouseenter", function() {
                var i = e.carousel;
                i.stop(),
                    e.restartCarousel()
            })
        },
        changeRTB: function() {
            var e = 2382;
            pageConfig.wideVersion || (e = 2433);
            var i = $(".J_slider_main .J_slider_item", this.conf.$el)
                , t = i.eq(i.length - 1);
            if (!t.length)
                return !1;
            var a = this;
            $.getJSON("//x.taotao.com/focus?spread_type=1&ad_type=10&template=0&ad_ids=" + e + ":1&callback=?", function(o) {
                if (o && $.isArray(o[e]) && o[e].length) {
                    var r = o[e][0];
                    $("a:eq(0)", t).attr("href", r.click_url.replace(/^http(s?):/, "")),
                        r.image_url = "//img13.360buyimg.com/da/" + r.image_url;
                    var s = $("a:eq(0) img", t);
                    a.carousel.getCurrent() === i.length - 1 ? s.removeAttr("data-lazy-src").attr("src", r.image_url) : s.attr("data-lazy-src", r.image_url).attr("src", "//taotao.com/mtd/pc/common/img/blank.png"),
                        function() {
                            var e = !1;
                            $(window).bind("load", function() {
                                e || (e = !0,
                                    (new Image).src = r.exposal_url)
                            })
                        }()
                }
            })
        },
        prevCarousel: function(e) {
            e && e.preventDefault(),
                this.carousel.stop().switchToPrev(),
                this.restartCarousel()
        },
        nextCarousel: function(e) {
            e && e.preventDefault();
            this.carousel;
            this.carousel.stop().switchToNext(),
                this.restartCarousel()
        },
        restartCarousel: function() {
            var e = this.carousel;
            clearTimeout(this.restartTimer),
                this.restartTimer = setTimeout(function() {
                    e.start()
                }, 4e3)
        },
        initCarouselNav: function() {
            for (var e = this.carousel.length, i = [], t = 0; t < e; t++) {
                var a = null
                    , o = "";
                t === e - 1 ? a = "slider_indicator_btn_last" : 0 === t && (a = "slider_indicator_btn_active"),
                    a = "string" == typeof a ? " " + a : "",
                    o = '<i class="slider_indicator_btn' + a + '"></i>',
                    i.push(o)
            }
            var r = this.conf.$el.find(".J_slider_indicator");
            r.html(i.join("")).css("marginLeft", -r.outerWidth() / 2 + "px").show()
        }
    });
    return r
});
define("home/widget/userinfo", function(require, exports, module) {
    "use strict";
    var e = require("conf")
        , i = require("load_async")
        , r = _.Class.extend({
        construct: function(e) {
            this.conf = $.extend({
                $el: null
            }, e),
                this.init()
        },
        init: function() {
            this.loginDeferred = new $.Deferred,
                this.getTpl(),
                this.checkUser(),
                this.initEvent()
        },
        renderDefer: new $.Deferred,
        initEvent: function() {
            _.eventCenter.on("home:load", $.proxy(function() {
                $.when(this.loginDeferred).then($.proxy(function() {
                    this.isLogin && $.when(pageConfig.userInfoDefer, this.renderDefer).done($.proxy(function(e) {
                        var i = e;
                        if (i && i.imgUrl) {
                            var r = i.imgUrl;
                            $(".J_user_info_avatar_img", this.conf.$el).attr("src", r)
                        }
                    }, this))
                }, this))
            }, this))
        },
        getTpl: function() {
            var e = '        {% var clstagPrefix = pageConfig.clstagPrefix + "09"; %}        <div class="user_info user_info_level{%= o.userLevel %} user_info_plus{%= o.plusState %}" clstag="{%= clstagPrefix + "a" %}">          <div class="J_user_info_avatar user_info_avatar">            <img class="J_user_info_avatar_img" src="{%= o.imgUrl %}" />            <a class="user_info_avatar_lk" href="{%= o.homeUrl %}" target="_blank"></a>          </div>          {% if (o.isLogin && o.nickName && o.nickName.length) { %}            <div class="user_info_show">              <p>                <i class="user_info_plusico"></i>                Hi，<a href="{%= o.homeUrl %}">{%= o.nickName %}</a></p>              <p>                <a class="user_info_lv" href="//vip.taotao.com" target="_blank">                  <i class="user_info_lvico"></i>{%= o.userLevelTxt %}                </a>                <a class="user_info_logout" href="{%= o.logoutUrl %}">退出</a>              </p>            </div>          {% } else { %}            <div class="user_info_show">              {% if (o.nickName && o.nickName.length) { %}                <p>Hi，<a href="{%= o.homeUrl %}">{%= o.nickName %}</a></p>              {% } else { %}                <p class="user_info_tip">Hi，欢迎来到京东！</p>              {% } %}              <p>                <a href="javascript:login();" class="user_info_login">登录</a>                <a href="javascript:regist();" class="user_info_reg">注册</a>              </p>            </div>          {% } %}      </div>      <div class="user_profit">        {% if (o.isNew || !o.isLogin) { %}          <a class="user_profit_lk" href="{%= o.xinrenUrl %}" target="_blank" clstag="{%= clstagPrefix + "b" %}">新人福利</a>          <a class="user_profit_lk" href="{%= o.plusUrl %}" target="_blank" clstag="{%= clstagPrefix + "c" %}">PLUS会员</a>        {% } else { %}          <a class="user_profit_lk user_profit_lk_long" href="{%= o.vipUrl %}" target="_blank" clstag="{%= clstagPrefix + "d" %}">            {%= o.vipPromo %}          </a>        {% } %}      </div>';
            return e
        },
        checkNewUser: function() {
            var r = e.INTERFACE.NEW_USER;
            return i({
                url: r,
                timeout: 1e3,
                jsonpCallback: "jsonpCallbackIsNewuser"
            })
        },
        checkUser: function() {
            function i(e) {
                var i = require("o2tpl")
                    , n = i(r.getTpl(), e);
                s.removeClass("mod_loading").html(n),
                    _.eventCenter.trigger("render:userinfo"),
                    o.resolve()
            }
            var r = this
                , s = r.conf.$el
                , n = e.URLS
                , o = this.renderDefer
                , t = {
                homeUrl: n.HOME,
                loginUrl: n.LOGIN,
                logoutUrl: n.LOGOUT,
                registUrl: n.REGIST,
                xinrenUrl: n.XINREN,
                vipUrl: "",
                vipPromo: "",
                plusState: 0,
                userLevel: "",
                isLogin: !1,
                isNew: !1,
                plusUrl: n.PLUS,
                nickName: pageConfig.user.pin,
                imgUrl: "//taotao.com/mtd/pc/common/img/no_login.jpg"
            };
            $.when(pageConfig.loginDefer, pageConfig.userInfoDefer).then(function(e, s) {
                var n, o = s.userLevel || 1, a = s.plusStatus in {
                    1: 1,
                    2: 1,
                    3: 1,
                    4: 1
                } ? s.plusStatus : 0, l = {
                        1: "注册会员",
                        2: "铜牌会员",
                        3: "银牌会员",
                        4: "金牌会员",
                        5: "钻石会员",
                        6: "VIP会员",
                        7: "企业会员"
                    }[o] || "注册会员";
                if (n = pageConfig.plusMap[o - 1] || plus.plusMap[0],
                        n = n[a] || n[4],
                        t.vipUrl = n[0],
                        t.vipPromo = n[1].replace(/\<span[ \s\S]+span>/g, "").replace(/>/g, ""),
                        t.plusState = a,
                        t.userLevel = o - 1,
                        t.userLevelTxt = l,
                    e && e.Identity) {
                    var f = e.Identity
                        , c = f.IsAuthenticated;
                    if (c) {
                        var g = f.Unick || f.Name;
                        t.isLogin = c,
                            r.isLogin = c,
                            r.loginDeferred.resolve(),
                            r.checkNewUser().then(function(e) {
                                if (e) {
                                    "string" == typeof g && g.length && (t.nickName = g);
                                    var r = e;
                                    "10000" === r.STATE && (t.isNew = r.isNew),
                                        pageConfig.isNewUser = t.isNew,
                                        i(t)
                                } else
                                    i(t)
                            }, function() {
                                i(t)
                            })
                    } else
                        r.loginDeferred.reject(),
                            i(t)
                } else
                    r.loginDeferred.reject(),
                        i(t)
            }, function() {
                r.loginDeferred.reject(),
                    i(t)
            })
        }
    });
    return r
});
define("home/widget/news", ["O2_COMPONENT/tab/1.0.0/tab.js"], function(require) {
    "use strict";
    var t = _.Class.extend({
        construct: function(t) {
            this.conf = $.extend({
                $el: null
            }, t),
            this.conf.$el && (this.supportTransform = o2.detect.css3test("transform"),
                this.initTab())
        },
        initTab: function() {
            var t = this.conf.$el
                , n = $(".J_news_tab", t)
                , s = require("O2_COMPONENT/tab/1.0.0/tab.js");
            new s({
                container: n,
                startAt: 0,
                hash: !1,
                activeClass: "mod_tab_head_item_on",
                hoverToSwitch: !0,
                onBeforeSwitch: function() {},
                onAfterSwitch: $.proxy(function(t) {
                    var s = 0
                        , a = n.find(".J_news_tab_active");
                    this.supportTransform ? (s = 52 * t,
                        a.css({
                            transform: "translateX(" + s + "px)",
                            "-webkit-transform": "translateX(" + s + "px)",
                            "-moz-transform": "translateX(" + s + "px)",
                            "-ms-transform": "translateX(" + s + "px)"
                        })) : (s = 50 * t,
                    0 === t && (s = -2),
                        a.css("left", s + "px"))
                }, this),
                onFirstShow: function() {}
            })
        }
    });
    return t
});
define("home/widget/service", ["mtd/pc/components/tab/1.0.0/tab.js"], function(require, t, module) {
    "use strict";
    var e = require("mtd/pc/components/tab/1.0.0/tab.js")
        , n = !0
        , o = _.Class.extend({
        construct: function(t) {
            var e = this;
            this.opts = $.extend({
                container: null,
                head: null,
                content: null,
                close: null,
                hoverToSwitch: !0,
                activeClass: "service_ind_active",
                afterSwitch: null,
                data: [],
                onAfterSwitch: function(t, n) {
                    var o = n.$contentItems.eq(t)
                        , s = e.opts.data[t];
                    o[0].loaded || (s.isIframe ? (o.removeClass("mod_loading"),
                        o.html($('<iframe width="190" height="185" frameborder="0" scrolling="no" src="' + s.url + '">'))) : seajs.use(s.url, function(t) {
                        o.removeClass("mod_loading"),
                            t.init({
                                el: o
                            })
                    }),
                        o[0].loaded = !0)
                }
            }, t),
                this.bind()
        },
        bind: function() {
            var t = !1
                , o = !1
                , s = this
                , a = null;
            this.opts.head.delegate(".mod_tab_head_item", "mouseenter", function(i) {
                n && (n = !1,
                    s.opts.startAt = $(i.currentTarget).index(),
                    s.tab = new e(s.opts)),
                    clearTimeout(a),
                    a = setTimeout(function() {
                        t || o || (s.opts.container.addClass(s.opts.expandClass),
                            t = !0)
                    }, 200)
            }),
                this.opts.container.delegate(".mod_tab_head_item, .J_tab_head", "mouseleave", function(t) {
                    o = !1,
                        clearTimeout(a)
                }),
                this.opts.close.bind("click", function(e) {
                    clearTimeout(a),
                        t = !1,
                        o = !0,
                        s.opts.container.removeClass(s.opts.expandClass)
                })
        }
    });
    return o
});
define("logger", function() {
    var t = function(t) {
        var o = this;
        _.Events.call(o),
            this._logQueue = [],
            this.opts = $.extend({
                afterLoad: 1e3,
                delay: 100,
                className: ".J_log"
            }, t),
            $(function() {
                setTimeout(function() {
                    o.canLog = !0,
                    o._logQueue.length && o.trigger("fill")
                }, o.opts.afterLoad)
            }),
            o._bind()
    };
    return $.extend(t.prototype, new _.Events),
        t.prototype._bind = function() {
            var t = this
                , o = !1;
            t.on("empty", function() {
                o = !1,
                    clearTimeout(t.timer)
            }),
                t.on("fill", function() {
                    !o && this.canLog && (o = !0,
                        t._log())
                }),
                $(document.body).delegate(t.opts.className, "click", function(o) {
                    var e = $(o.currentTarget)
                        , i = e.attr("data-log");
                    i && (logData = $.parseJSON(decodeURIComponent(i)),
                        t.logBi("clk", logData))
                })
        }
        ,
        t.prototype._log = function() {
            var t = this
                , o = this._logQueue.shift();
            return o ? (window.log.apply(window, o),
                void (t.timer = setTimeout(function() {
                    t._log()
                }, t.opts.delay))) : this.trigger("empty")
        }
        ,
        t.prototype.logBi = function(t, o) {
            var e = "clk" === t ? this.logNow : this.log;
            e.call(this, "pc_homepage", "bi", t, o.ad_groupName, o.ad_groupId, o.ad_num, o.ad_name, o.ad_id, o.ad_desc, o.ad_biclk, o.pd_groupName, o.pd_groupId, o.pd_name, o.pd_id, o.pd_biclk)
        }
        ,
        t.prototype.logArea = function(t) {
            var o = $(this.opts.className, t)
                , e = this;
            o.each(function(t, o) {
                var i, a = $(o).attr("data-log");
                a && (i = $.parseJSON(decodeURIComponent(a)),
                    e.logBi("impr", i))
            })
        }
        ,
        t.prototype.log = function() {
            var t = Array.prototype.slice.call(arguments);
            this._logQueue.push(t),
                this.trigger("fill")
        }
        ,
        t.prototype.logNow = function() {
            var t = this
                , o = Array.prototype.slice.call(arguments);
            t._logQueue.unshift(o),
                t.trigger("fill")
        }
        ,
        new t
});
define("home/widget/patch", function(require, exports, module) {
    "use strict";
    var e = require("conf")
        , t = _.Class.extend({
        construct: function() {
            this.init()
        },
        init: function() {
            this.setCheckEptArea(),
                this.showIpadBanner()
        },
        setCheckEptArea: function() {
            setTimeout(function() {
                $.ajax({
                    url: e.INTERFACE.USER_IP_INFO,
                    dataType: "jsonp",
                    jsonpCallback: "jsonpCallbackUserIpInfo",
                    success: function(e) {
                        if (void 0 !== e && 0 !== e.type) {
                            var t = $('<div class="inter" id="inter_enter" style="position: relative; z-index: 30; width: 100%; height: 49px; overflow: hidden; background:#4d4e62;"></div>')
                                , i = "//en.taotao.com/"
                                , n = '<a href="' + i + '" target="_blank" class="inter_link" style="display: block; width:100%; height: 49px; text-align: center;" clstag="h|keycount|2016|00b"><div class="grid_c1"><img src="//img30.360buyimg.com/ads/jfs/t463/311/1350191938/18754/313404d9/54cef1e3N796d7688.jpg" alt="" width="792" height="49" style="vertical-align: top;"></div></a>';
                            t.html(n),
                                $("body").prepend(t),
                                _.eventCenter.trigger("render:floorChange")
                        }
                    }
                })
            }, 3e3)
        },
        showIpadBanner: function() {
            var e = window.navigator.userAgent;
            /iPad/i.test(e) && seajs.use("//nfa.taotao.com/loadFa.js?aid=2_955_8766")
        }
    });
    return t
});
define("home/widget/elevator", ["O2_COMPONENT/util/1.0.0/util.js"], function(require, exports, module) {
    "use strict";
    var t = _.Class.extend({
        construct: function(t) {
            this.conf = $.extend({
                $el: null
            }, t),
                this.init()
        },
        init: function() {
            this.w = window,
                this.elevatorPos = 50,
                this.$elevatorEles = $(".J_f_lift"),
                this.elevatorElesId = this.$elevatorEles.map(function() {
                    return $(this).attr("id")
                }).toArray(),
                this.$firstElevatorFloor = this.$elevatorEles.eq(0),
                this.setStyle(),
                this.initEvent(),
                this.scrollTimer = null
        },
        initEvent: function() {
            var t = this.conf.$el;
            require("O2_COMPONENT/util/1.0.0/util.js");
            t.delegate(".J_lift_item", "click", $.proxy(this.go, this)),
                $(this.w).bind("scroll.elevator", $.proxy(this.onScroll, this)),
                _.eventCenter.on("home:resize", $.proxy(function() {
                    var e = $(this.w)
                        , i = e.scrollTop()
                        , o = this.$firstElevatorFloor.offset().top;
                    this.setStyle(),
                    i >= o - e.height() / 2 + 5 && t.show()
                }, this)),
                _.eventCenter.on("render:floorChange", $.proxy(function(t) {
                    var e = this.elevatorElesId
                        , i = $.inArray(t, e);
                    i >= 0 && (this.elevatorElesId.splice(i, 1),
                        $("#" + t).removeClass("J_f_lift"),
                        this.$elevatorEles = $(".J_f_lift"),
                        this.conf.$el.find(".J_lift_item").eq(i).remove())
                }, this))
        },
        setStyle: function() {
            var t = this.conf.$el
                , e = document.documentElement.clientWidth
                , i = 1190
                , o = parseInt(.5 * document.documentElement.clientHeight - .5 * t.height(), 10);
            t.css({
                left: (e - i) / 2 - t.width() - 40,
                top: o
            }),
            e < 1380 && t.css({
                left: "10px"
            })
        },
        go: function(t) {
            t && t.preventDefault();
            var e = $(t.currentTarget)
                , i = e.index()
                , o = 0;
            e.hasClass("J_lift_item_top") || (this.clicked = !0,
                o = this.$elevatorEles.eq(i).offset().top - this.elevatorPos,
                this.conf.$el.find(".J_lift_item").removeClass("lift_item_on").eq(i).addClass("lift_item_on")),
                $("body,html").stop(!1, !0).animate({
                    scrollTop: o
                }, 600, $.proxy(function() {
                    this.clicked = !1
                }, this))
        },
        onScroll: function(t) {
            var e = this
                , i = $(document);
            e.clicked || (clearTimeout(e.scrollTimer),
                e.scrollTimer = setTimeout(function() {
                    var t = i.scrollTop()
                        , o = e.conf.$el
                        , l = -1
                        , s = $(e.w).height() / 2;
                    t + s >= e.$firstElevatorFloor.offset().top ? (o.fadeIn(),
                        e.$elevatorEles.each(function() {
                            t + s >= $(this).offset().top && (l += 1)
                        }),
                        o.find(".J_lift_item").removeClass("lift_item_on").eq(l).addClass("lift_item_on")) : o.fadeOut()
                }, 200))
        }
    });
    return t
});
