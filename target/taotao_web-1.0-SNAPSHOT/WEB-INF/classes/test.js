define("conf", function (require, exports, module) {
    "use strict";
    var e = "//www.3.cn/bup",
        o = ("//taotao.com/mtd/pc/index/2.0.0" + "/home/", "//f.3.cn/index-floor-material?argv="),
        t = "//www.3.cn/index/bak/material_", a = "//ai.taotao.com", n = a + "/index_new.php?", r = "//ch.taotao.com",
        i = "//diviner.taotao.com/diviner", s = "//yuding.taotao.com", l = "app=Seckill&action=pcIndexMiaoShaArea",
        c = "app=Newuser&action=isNewuser", d = "app=Discovergoods&action=getDiscZdmGoodsListForIndex",
        _ = "app=ABdata&action=ABData&key=BtestData", u = pageConfig.dataLoadTimeout || 3e3, f = {
            PRICE: "//p.3.cn/prices/mgets",
            TIMEOUT: u,
            DOMAINS: {BACKUP_PC: e, INDEX_FLOOR: o, BACKUP_FLOOR: t, AI: a, AI_JD: n, CH_JD: r, BI: i},
            BLANKIMG: "//taotao.com/mtd/pc/common/img/blank.png",
            SWF_PLAYER: "//taotao.com/mtd/pc/index/2.0.0" + "/home/images/JDLiveVideo.swf",
            CLSTAG_PREFIX: "h|keycount|2016|",
            URLS: {
                LOGIN: "//passport.taotao.com",
                REGIST: "//reg.taotao.com",
                HOME: "//home.taotao.com",
                LOGOUT: "//passport.taotao.com/uc/login?ltype=logout",
                VIP: "//vip.taotao.com",
                XINREN: "//xinren.taotao.com/?channel=99",
                MIAOSHA: "//miaosha.taotao.com",
                FIND: "//fxhh.taotao.com",
                TOP: "//top.taotao.com",
                PLUS: "//plus.taotao.com",
                PLUSSALE: "//sale.taotao.com/act/Xno3MQRklCIm.html"
            },
            INTERFACE: {
                MYJD_GETHOMECOUNT: "//minijd.taotao.com/getHomeCount",
                MYJD_GETMYJDANSWERCOUNT: "//question.taotao.com/myjd/getMyJdAnswerCount.action",
                MYJD_REDUCEPRODUCTCOUNT: "//follow-soa.taotao.com/rpc/product/queryForReduceProductCount.action?sysName=misc",
                MYJD_GETCOUPONCOUNT: "//quan.taotao.com/getcouponcount.action",
                MYJD_MSGCENTER: "//joycenter.taotao.com/msgCenter/init.action",
                MYJD_QUERYBT: "//btshow.taotao.com/ious/queryBT.do?sourceType=137",
                FOCUS8: "//x.taotao.com/focus",
                LOGIN_SERVICE: "//passport.taotao.com/loginservice.aspx?method=Login",
                USER_NAME: "//passport.taotao.com/new/helloService.ashx",
                USER_INFO: "//passport.taotao.com/user/petName/getUserInfoForMiniJd.action",
                NEW_USER: n + c,
                CATE: "//dc.3.cn/category/get",
                CATE_A: "//dc.3.cn/category/get",
                CATE_A_BACKUP_PC: "//storage.taotao.com/1824f478e60ec503/7cf4cd46f2.js",
                CATE_B: n + _,
                CATE_B_BACKUP_PC: e + "/index_new.php?" + _,
                FOCUS: "//f.3.cn/bi/focus8/get",
                FOCUS_BOTTOM_REC: "//f.3.cn/bi/recm/get",
                FOCUS_BOTTOM_REC_ERR_LOG: "//mercury.taotao.com/log.gif?t=rec.619066&v=src=rec$errorcode=",
                SECKILL: n + l,
                SECKILL_BACKUP_PC: e + "/index_new.php?" + l,
                FIND: n + d,
                FIND_BACKUP_PC: e + "/index_new.php?" + d,
                BRAND: o + "aggr",
                SUP: "//f.3.cn/bi/album/get",
                SUP_BACKUP: "//www.3.cn/index/home_bak/album",
                TOP: {
                    RANK_LIST: r + "/homecate2",
                    RANK_LIST_BACKUP_PC: e + "/homecate2",
                    HOT_SALE: r + "/homepro",
                    HOT_SALE_BACKUP_PC: e + "/homepro"
                },
                MORE: i + "?p=610009",
                MORE_BACKUP: "//storage.taotao.com/1824f478e60ec503/f5ec9b9ffa.js",
                MORE_ERR_LOG: "//mercury.taotao.com/log.gif?t=rec.610009&v=src=rec$errorcode=",
                USER_IP_INFO: a + "/jdip/useripinfo.php?type=jd2015",
                HOT_WORDS: a + "/index/hotWords.php",
                PRESALE: a + "/index/preSale.php",
                YUDING_PRESALE_INFO: s + "/presaleInfo/getPresaleInfo.action",
                QRCODE: "//qrimg.taotao.com/"
            }
        }, p = "//f.3.cn/index-floor?argv=", h = "//www.3.cn/index/bak/", g = "//f.3.cn/index-floor?argv=focus";
    return f.DOMAINS.NEW_INDEX_FLOOR = f.DOMAINS.INDEX_FLOOR, f.DOMAINS.NEW_BACKUP_FLOOR = f.DOMAINS.BACKUP_FLOOR, pageConfig.useBi || (f.DOMAINS.INDEX_FLOOR = p, f.DOMAINS.BACKUP_FLOOR = h, f.INTERFACE.FOCUS = g), f
}), seajs.use(["conf"], function (e) {
    var o = window;
    o.pageConfig = window.pageConfig || {};
    var t = o.pageConfig;
    t.o2JSConfig = {
        useTplInJs: !0, tplPathRule: function (e) {
            return "//taotao.com/mtd/pc/index/2.0.0/home/" + e + ".min.js"
        }, sourcePathRule: function (o) {
            return "enjoy" == o ? "//f.3.cn/index-floor-material?argv=enjoy" : e.DOMAINS.INDEX_FLOOR + o
        }, backupPathRule: function (o) {
            return "enjoy" == o ? "//www.3.cn/index/bak/material_enjoy" : e.DOMAINS.BACKUP_FLOOR + o
        }
    }, t.clstagPrefix = "h|keycount|2016|", t.sendClog = function (e) {
        if (e.length) {
            var o = [], a = {}, n = t.clog;
            e.each(function (e) {
                var t = $(this).attr("fclog");
                a[t] || (a[t] = !0, o.push(t))
            }), n && n.logDomain && o.length > 0 && ((new Image).src = n.logDomain + o.join("||") + "&v=" + n.logV)
        }
    }, !function () {
        var o = [e.URLS.PLUS, "您可享钻石特惠，开通PLUS>"], a = [e.URLS.PLUS, "您可享金牌特惠，开通PLUS>"],
            n = [e.URLS.PLUS, "您可享银牌特惠，开通PLUS>"], r = [e.URLS.PLUS, "您可享钻石特惠，续费PLUS>"],
            i = [e.URLS.PLUS, "您可享金牌特惠，续费PLUS>"], s = [e.URLS.PLUS, "您可享银牌特惠，续费PLUS>"],
            l = [e.URLS.PLUS, "试用PLUS会员领免运费券>"], c = [e.URLS.PLUS, "试用PLUS会员享更多特权 <span class='style-red'>购买</span>"],
            d = [e.URLS.PLUS, "购买PLUS会员尊享顶级特权>"], _ = [e.URLS.PLUS, "PLUS专享商品每周更新>"],
            u = [e.URLS.PLUS, "续费PLUS会员尊享顶级特权 <span class='style-red'>续费</span>"],
            f = [e.URLS.PLUSSALE, "PLUS专享商品每周更新>"];
        t.plusMap = [[l, c, d, f, u], [l, c, d, f, u], [n, n, n, s, s], [a, a, a, i, i], [o, o, o, r, r], [l, c, d, _, u], [l, c, d, _, u]]
    }(), !function () {
        var e = ["ad_groupName", "ad_groupId", "ad_num", "ad_name", "ad_id", "ad_desc", "ad_biclk", "pd_groupName", "pd_groupId", "pd_name", "pd_id", "pd_biclk"];
        t.generateBiLog = function (o) {
            var t, o = o || {}, a = o.ext_columns || o, n = !$.grep(e, function (e, o) {
                if (!(e in a))return !0
            }).length;
            return n ? (t = $.toJSON(a), ' data-log="' + encodeURIComponent(t) + '" ') : ""
        }
    }()
}), seajs.config({
    paths: {
        O2_COMPONENT: "mtd/pc/components"
    },
    alias: {
        "home/widget/head": "O2_COMPONENT/head.min.js",
        "home/widget/head_areamini": "O2_COMPONENT/head_areamini.min.js",
        "home/widget/head_myjd": "O2_COMPONENT/head_myjd.min.js",
        "home/widget/head_setUserinfo": "O2_COMPONENT/head_setUserInfo.min.js",
        "home/widget/head_shoppingcart": "O2_COMPONENT/head_shoppingcart.min.js",
        "home/widget/cate": "O2_COMPONENT/cate.min.js",
        "home/widget/slider": "O2_COMPONENT/slider.min.js",
        "home/widget/userinfo": "O2_COMPONENT/userinfo.min.js",
        "home/widget/news": "O2_COMPONENT/news.min.js",
        "home/widget/service": "O2_COMPONENT/service.min.js",
        "home/widget/mobile_pop": "//nfa.taotao.com/loadFa.action?aid=0_0_8762",
        "home/widget/patch": "O2_COMPONENT/patch.min.js",
        "home/widget/scroller": "O2_COMPONENT/scroller.min.js",
        "home/widget/fbt": "O2_COMPONENT/fbt.min.js",
        "home/widget/top": "O2_COMPONENT/top.min.js",
        "home/widget/sup": "O2_COMPONENT/sup.min.js",
        "home/widget/seckill": "O2_COMPONENT/seckill.min.js",
        "home/widget/entry": "O2_COMPONENT/entry.min.js",
        "home/widget/portal": "O2_COMPONENT/portal.min.js",
        "home/widget/elevator": "O2_COMPONENT/elevator.min.js",
        "home/widget/more": "O2_COMPONENT/more.min.js",
        logger: "O2_COMPONENT/logger.min.js",
        "home/videojs": "O2_COMPONENT/video.min.js",
        "home/swfobject": "O2_COMPONENT/swfobject.min.js",
        logger: "O2_COMPONENT/logger.min.js"
    }
}), seajs.use(["O2_COMPONENT/carousel.js", "O2_COMPONENT/util.js", "O2_COMPONENT/tab.js", "O2_COMPONENT/lazyload.js", "home/widget/head", "home/widget/cate", "home/widget/slider", "home/widget/userinfo", "home/widget/news", "home/widget/service", "report", "logger", "home/widget/patch", "home/widget/elevator"], function (e, o, t, a, n, r, i, s, l, c, d, u, f) {
    d.init(222, 223, 224, 260), $.each(["jsonCallBackenjoy", "jsonCallBackcoupons", "jsonCallBackbanner_1", "jsonCallBackbanner_2", "jsonCallBackbanner_3", "jsonCallBackbanner_4", "jsonCallBackspecial_1", "jsonCallBackspecial_2", "jsonCallBackbasic_1", "jsonCallBackbasic_2", "jsonCallBackbasic_3", "jsonCallBackbasic_4", "jsonCallBackbasic_5", "jsonCallBackbasic_6", "jsonCallBackbasic_7", "jsonCallBackbasic_8", "jsonpCallbackUserIpInfo", "jsonpCallbackEnjoyBiAct", "jsonpCallbackEnjoyBiShop", "jsonpCallbackFindGood", "jsonpCallbackAggr", "jsonpCallbackTopRank", "jsonpCallbackTopHotsale1", "jsonpCallbackTopHotsale2", "jsonpCallbackTopHotsale3", "jsonpCallbackTopHotsale4", "jsonpCallbackTopHotsale5", "jsonpCallbackMoreGood", "jsonpCallbackSeckill", "jsonpCallbackFocus", "jsonpCallbackFocusBottomRec", "jsonpCallbackIsNewuser", "jsonpCallbackRequestUserInfo", "jsonpCallbackPreloadSk", "getCategoryCallback", "jsonpCallbackHelloService", "jsonpCallbackIsLogin", "jsonpCallbackMorePreSale", "jsonpCallbackSup", "jsonCallBackHotWords", "jsonpCallbackFocus8"], function (e, o) {
        window[o] = $.noop, _.eventCenter.on(o + ":backup", function () {
            d.processBackup(e + 1)
        })
    }), n.init(), new r({$el: $(".J_cate")}), new i({$el: $(".J_slider")}), new s({$el: $(".J_user")}), new l({$el: $(".J_news")}), $(window).one("load.home2016", function () {
        _.eventCenter.trigger("home:load")
    }), new f, !function () {
        var e = $("#J_service"), o = $(".J_tab_head", e), t = $(".J_tab_content", e), a = $(".J_service_pop_close", e);
        new c({
            container: e,
            head: o,
            content: t,
            close: a,
            expandClass: "service_expand",
            activeClass: "service_frame_on",
            data: [{
                isIframe: !0,
                url: "//chongzhi.taotao.com/jdhome-czindex.html"
            }, {url: "O2_COMPONENT/jipiao.js"}, {url: "O2_COMPONENT/hotel.js"}, {url: "O2_COMPONENT/game.js"}]
        })
    }()
}), define("logger", function () {
    var e = function (e) {
        var o = this;
        _.Events.call(o), this._logQueue = [], this.opts = $.extend({
            afterLoad: 1e3,
            delay: 100,
            className: ".J_log"
        }, e), $(function () {
            setTimeout(function () {
                o.canLog = !0, o._logQueue.length && o.trigger("fill")
            }, o.opts.afterLoad)
        }), o._bind()
    };
    return $.extend(e.prototype, new _.Events), e.prototype._bind = function () {
        var e = this, o = !1;
        e.on("empty", function () {
            o = !1, clearTimeout(e.timer)
        }), e.on("fill", function () {
            !o && this.canLog && (o = !0, e._log())
        }), $(document.body).delegate(e.opts.className, "click", function (o) {
            var t = $(o.currentTarget), a = t.attr("data-log");
            a && (logData = $.parseJSON(decodeURIComponent(a)), e.logBi("clk", logData))
        })
    }, e.prototype._log = function () {
        var e = this, o = this._logQueue.shift();
        return o ? (window.log.apply(window, o), void(e.timer = setTimeout(function () {
            e._log()
        }, e.opts.delay))) : this.trigger("empty")
    }, e.prototype.logBi = function (e, o) {
        var t = "clk" === e ? this.logNow : this.log;
        t.call(this, "pc_homepage", "bi", e, o.ad_groupName, o.ad_groupId, o.ad_num, o.ad_name, o.ad_id, o.ad_desc, o.ad_biclk, o.pd_groupName, o.pd_groupId, o.pd_name, o.pd_id, o.pd_biclk)
    }, e.prototype.logArea = function (e) {
        var o = $(this.opts.className, e), t = this;
        o.each(function (e, o) {
            var a, n = $(o).attr("data-log");
            n && (a = $.parseJSON(decodeURIComponent(n)), t.logBi("impr", a))
        })
    }, e.prototype.log = function () {
        var e = Array.prototype.slice.call(arguments);
        this._logQueue.push(e), this.trigger("fill")
    }, e.prototype.logNow = function () {
        var e = this, o = Array.prototype.slice.call(arguments);
        e._logQueue.unshift(o), e.trigger("fill")
    }, new e
}), define("floor_process", function (require) {
    function e() {
        var e = (c.before, c.after, $("body"));
        ["seckill:after", "enjoy:before", "enjoy:after", "fbt:after", "coupon_lazy:before", "rec_1:before", "entry_1:before", "entry_1:after", "rec_2:before", "portal_1:before", "portal_1:after", "portal_2:before", "portal_2:after", "portal_3:before", "portal_3:after", "portal_4:before", "portal_4:after", "rec_3:before", "portal_5:before", "portal_5:after", "portal_6:before", "portal_6:after", "portal_7:before", "portal_7:after", "portal_8:before", "portal_8:after", "entry_2:before", "entry_2:after", "rec_4:before", "more:after", "lift:after"].forEach(function (o, t) {
            var o = o.split(":"), a = o[0], n = o[1];
            e.delegate("#" + a, "render:" + n, c[n][a])
        })
    }

    var o = (require("conf"), require("load_async"), require("logger")), t = window.pageConfig, a = t.FN_GetRandomData,
        n = t.processImageUrl, r = function (e) {
            return function (o, t, n) {
                var r = t.data;
                r = r || {}, r.staticLogTag = e;
                var i = r.list || [];
                return i = i.map(function (e) {
                    return $.isArray(e) && e.length ? a(e) : e
                }), i = $.grep(i, function (e) {
                    return e
                }), i.length ? (r.list = i, void n()) : n(!1)
            }
        }, i = function (e, o, r, i) {
            return function (s, l, c) {
                var d = l.data;
                d = d || {};
                var _ = d.list || [], u = d.live || [];
                return !_.length || "享品质" == e && !u.length ? c(!1) : (d.staticLogTag = i, d.title = e, d.list = _.map(function (e) {
                    return $.isArray(e) && e.length ? a(e) : e
                }), d.list.forEach(function (e, t) {
                    e && (e.imgUrl = n(e.imgUrl, o, r))
                }), u.forEach(function (e, o) {
                    e.indexImage = n(e.indexImage, "780x700", "390x350"), !!t.disablePlayer != !!t.isdebug[15] && (e.status = 4)
                }), void c())
            }
        }, s = function (e, o) {
            return function (t, a, n) {
                var r = a.data;
                r = a.data || {};
                var i = r.cols || [];
                return i.length ? (e && (r.title = e), r.staticLogTag = o, void n()) : n(!1)
            }
        }, l = function (e) {
            var e, o = "190x210", t = "380x420", a = "240x106", r = "480x212", i = "124x44", s = "248x88";
            $.isArray(e.act) && $.each(e.act, function (e, a) {
                a.imgUrl = n(a.imgUrl, t, o)
            }), $.isArray(e.shop) && $.each(e.shop, function (e, o) {
                o.imgUrl = n(o.imgUrl, r, a)
            }), e.fixed && $.isArray(e.fixed.list) && $.each(e.fixed.list, function (e, o) {
                o.imgUrl = n(o.imgUrl, s, i)
            })
        }, c = {
            before: {
                enjoy: function (e, o, t) {
                    var a = o.data, n = a.act, r = a.shop, i = a.fixed;
                    n && n.length && r && r.length && i && i.list.length ? ($("#enjoy").addClass(a.className), l(a), t()) : t(!1)
                },
                coupon_lazy: function (e, o, t) {
                    var a = o.data;
                    a && a.list && a.list.length ? (a.list.forEach(function (e, o) {
                        e.imgUrl = n(e.imgUrl, "280x280", "140x140")
                    }), t()) : t(!1)
                },
                rec_1: r(18),
                entry_1: i("享品质", "800x340", "400x170", 19),
                rec_2: r(21),
                portal_1: s("爱生活", [22, 23]),
                portal_2: s(null, [24, 25]),
                portal_3: s(null, [26]),
                portal_4: s(null, [27, 28]),
                rec_3: r(29),
                portal_5: s(null, [30]),
                portal_6: s(null, [31, 32]),
                portal_7: s(null, [33, 34]),
                portal_8: s(null, [35, 36, 37]),
                entry_2: i("购特色", "480x280", "240x140", 38),
                rec_4: r(39)
            }, after: {
                seckill: function (e, o, t) {
                    seajs.use("home/widget/seckill", function (e) {
                        new e({$el: $("#seckill"), domStr: o.dom, next: t})
                    })
                }, enjoy: function () {
                    var e, t = $(window), a = function (e, o) {
                        var t = !1, a = !1;
                        return function () {
                            return t ? void(a = !0) : (t = !0, setTimeout(function () {
                                t = !1, a && (e(), a = !1)
                            }, o), void e())
                        }
                    };
                    e = function () {
                        this.opts = {}, this.$el, this._state = 0, this._reported = !1
                    }, e.prototype._judge = function () {
                        var e = this;
                        t.scrollTop() > this.opts.offset && 0 == this._state ? (this._state = 1, this.$el.addClass("enjoyFix"), e.reported || (e.reported = !0, o.logArea("#enjoy .enjoy_fix"))) : t.scrollTop() <= this.opts.offset && 1 == this._state && (this._state = 0, this.$el.removeClass("enjoyFix"))
                    }, e.prototype._bind = function () {
                        var e = this;
                        t.bind("scroll.enjoyFix", a(function () {
                            e._judge()
                        }, 100))
                    }, e.prototype.init = function (e) {
                        $.extend(this.opts, {offset: 788}, e), this.$el = $(this.opts.el), this._judge(), this._bind()
                    }, (new e).init({el: "#enjoy", offset: 1540}), o.logArea($("#enjoy"))
                }, fbt: function (e, o, t) {
                    seajs.use("home/widget/fbt", function (e) {
                        new e({$el: $("#fbt"), domStr: o.dom, next: t})
                    })
                }, entry_1: function (e, t) {
                    seajs.use("home/widget/entry", function (e) {
                        new e({$el: $("#entry_1"), data: t.data})
                    }), o.logArea($("#entry_1"))
                }, portal_1: function () {
                    seajs.use("home/widget/portal", function (e) {
                        new e({$el: $("#portal_1")}), o.logArea($("#portal_1"))
                    })
                }, portal_2: function () {
                    seajs.use("home/widget/portal", function (e) {
                        new e({$el: $("#portal_2")}), o.logArea($("#portal_2"))
                    })
                }, portal_3: function () {
                    seajs.use("home/widget/portal", function (e) {
                        new e({$el: $("#portal_3")}), o.logArea($("#portal_3"))
                    })
                }, portal_4: function () {
                    seajs.use("home/widget/portal", function (e) {
                        new e({$el: $("#portal_4")}), o.logArea($("#portal_4"))
                    })
                }, portal_5: function () {
                    seajs.use("home/widget/portal", function (e) {
                        new e({$el: $("#portal_5")}), o.logArea($("#portal_5"))
                    })
                }, portal_6: function () {
                    seajs.use("home/widget/portal", function (e) {
                        new e({$el: $("#portal_6")}), o.logArea($("#portal_6"))
                    })
                }, portal_7: function () {
                    seajs.use("home/widget/portal", function (e) {
                        new e({$el: $("#portal_7")}), o.logArea($("#portal_7"))
                    })
                }, portal_8: function () {
                    seajs.use("home/widget/portal", function (e) {
                        new e({$el: $("#portal_8")}), o.logArea($("#portal_8"))
                    })
                }, entry_2: function (e, t) {
                    o.logArea($("#entry_2"))
                }, more: function (e, o, t) {
                    seajs.use("home/widget/more", function (e) {
                        new e({$el: $("#more"), domStr: o.dom, next: t})
                    })
                }, lift: function () {
                    seajs.use("home/widget/elevator", function (e) {
                        new e({$el: $("#lift")})
                    })
                }
            }
        };
    return t.reportFloorHideHash = {
        seckill: 19,
        fbt: 1,
        coupon_lazy: 2,
        rec_1: 3,
        entry_1: 4,
        rec_2: 5,
        portal_1: 6,
        portal_2: 7,
        portal_3: 8,
        portal_4: 9,
        rec_3: 10,
        portal_5: 11,
        portal_6: 12,
        portal_7: 13,
        portal_8: 14,
        entry_2: 15,
        rec_4: 16,
        more: 17,
        footer: 18
    }, {render: c, bind: e}
}), seajs.use(["floor_process", "store"], function (e, o) {
    "use strict";
    var t, a = window, n = $(a), r = $("html"), i = n.width(), s = n.height();
    n.bind("resize.home", function () {
        var e = function () {
            var e = n.width() >= 1190;
            e ? r.removeClass("o2_mini").addClass("o2_wide root61") : r.removeClass("o2_wide root61").addClass("o2_mini"), a.pageConfig.wideVersion !== e && (_.eventCenter.trigger("render:floorChange"), a.pageConfig.wideVersion = e), _.eventCenter.trigger("home:resize", e)
        }, o = n.width(), l = n.height();
        i == o && s == l || (window.clearTimeout(t), t = window.setTimeout(e, 100)), i = o, s = l
    }), e.bind(), _.eventCenter.on("home:load", function () {
        o.enabled && o.clearByReg("jd_home_2015")
    }), pageConfig.loginDefer = new $.Deferred, pageConfig.userInfoDefer = new $.Deferred
}), seajs.use(["conf", "store", "o2tpl", "o2console", "load_async", "report", "mtd/pc/components/lazyload.js"], function (e, o, t, a, n, r, i) {
    "use strict";
    var s = window.pageConfig, l = _.Class.extend({
        statics: {
            CONTROL: "o2Control",
            RENDER_BEFORE: "render:before",
            RENDER_AFTER: "render:after"
        }, construct: function (e) {
            this.conf = $.extend({
                cls: "J_lazyload",
                scrollEvent: "scroll.lazydata",
                resizeEvent: "resize.lazydata",
                timer: {autoLoad: 3e3}
            }, e), this.conf.lazyEvents = this.conf.scrollEvent + " " + this.conf.resizeEvent, this.init()
        }, init: function () {
            this.w = window, this.$w = $(window), this.$b = $("body");
            var e = $("html"), o = s.o2AppName || "";
            "" !== o && e.addClass(o), a.consoleConfigFunc(), this.isChrome = e.hasClass("o2_chrome"), this.isIE = !!this.w.ActiveXObject || navigator.userAgent.indexOf("Trident") > 0, this.o2JSConfig = s ? s.o2JSConfig : {}, this.imageLazyload = s.imageLazyload, this.resourceLoader = null, this.loadingData = {}, this.tplDefer = {}, this.insertedStyles = {}, this.renderedFloor = {}, this.floorResult = {}, this.isAutoRendered = !1, this.lazyFloorCount = 0, this.initFloor(), this.floorsInfo = this.getFloorsInfo($(".J_f")), this.lazyLoadFloor(), this.bind(), this.events = $._data($("body").get(0), "events")
        }, initFloor: function () {
            var e = this, o = $("." + e.conf.cls);
            e.lazyFloorCount = o.length
        }, bind: function () {
            var e = this, o = e.$w, a = (e.w, {quality: 90, webpQuality: 90, delay: 20, threshold: 1e3});
            this.isIE && (a.delay = 60, a.threshold = 500), this.imageLazyload || (a.source = "nolazyload"), $("body").o2lazyload(a).bind("render", this.conf.cls, function (o, a, n) {
                var r, i = $(o.target), s = i.attr("id"), c = e.floorsInfo[s], d = c.custom, u = c.source,
                    f = $('[type="text/template"]', i), p = a.data || {}, h = "";
                if (!(s in e.renderedFloor)) {
                    a.dom = a.dom || f.html(), r = a.dom;
                    try {
                        if (e.floorResult[s] = {result: a}, d) {
                            if (n)return i.trigger(l.RENDER_AFTER, [a, function () {
                                _.eventCenter.trigger("lazyload:DOMUpdate", i), i.removeClass("mod_lazyload"), e.sendClog(i)
                            }])
                        } else e.renderedFloor[s] = !0;
                        if (u && (!p || $.isEmptyObject(p)))throw new Error("Loaded no data.");
                        if (n)return f.remove(), h = t(r, p), i.append(h), i.trigger(l.RENDER_AFTER, a), _.eventCenter.trigger("lazyload:DOMUpdate", i), void e.sendClog(i);
                        if (!d)return f.remove(), h = t(r, p), e.floorResult[s].html = h, void i.attr("data-hidden", !0)
                    } catch (o) {
                        e.hideFloor(s, i), _.console.log(o)
                    }
                }
            }), _.eventCenter.on("render:floorChange", function () {
                e.floorChange = !0, e.windowLoaded && o.trigger(e.conf.resizeEvent)
            }), o.one("load.render", function () {
                e.windowLoaded = !0, e.preloadOffset = e.isIE ? 500 : 800, e.startLoadTimer = setTimeout(function () {
                    o.trigger(e.conf.resizeEvent)
                }, 20)
            })
        }, lazyLoadFloor: function () {
            var e = this, o = e.$w, t = (e.w, $(document)), a = e.conf, n = null,
                r = e.isAutoRendered ? 20 : e.isIE ? 200 : 100;
            e.preloadOffset = 0;
            var i = e.floorsInfo;
            o.bind(a.lazyEvents, function (l) {
                e.isScrolling = !0, e.startLoadTimer && clearTimeout(e.startLoadTimer), e.autoLoadTimer && clearTimeout(e.autoLoadTimer), n && clearTimeout(n), e.resourceLoader && e.resourceLoader.pause(), n = setTimeout(function () {
                    e.isScrolling = !1, e.floorChange && (i = e.getFloorsInfo($(".J_f")), e.floorChange = !1);
                    var n, r, l, c = t.scrollTop(), d = o.height(), _ = c + d + e.preloadOffset;
                    for (n in i)r = i[n], l = r.$el, (r.force || r.top <= _ && r.top >= c - r.height) && l.hasClass(a.cls) && (l.attr("data-hidden") ? e.renderHidden(n) : e.load(n, !0));
                    s.idleTimeLoad && (e.autoLoadTimer = setTimeout($.proxy(e.autoLoad, e), 3e3))
                }, r)
            })
        }, hideFloor: function (e, o) {
            o.height(0).hide(), r.processHidedFloor(s.reportFloorHideHash[e]), _.eventCenter.trigger("render:floorChange", e), _.console.log(e + "加载失败！")
        }, getFloorsInfo: function (e) {
            var o = {};
            return e.each(function (e, t) {
                var a = $(t), n = a.attr("id"), r = a.data("rel"), i = $("#" + r), s = a.offset().top;
                r && i.length && (s = i.offset().top), o[n] = {
                    $el: a,
                    top: s,
                    height: a.outerHeight(!0),
                    force: !!a.data("forcerender"),
                    tpl: a.data("tpl"),
                    source: a.data("source"),
                    backup: a.data("backup"),
                    custom: !!a.data("custom"),
                    hidden: !1
                }
            }), o
        }, sendClog: function (e) {
            var o = e.find("[fclog]");
            o.length && setTimeout(function () {
                s.sendClog(o)
            }, 200)
        }, _loadTpl: function (o, t) {
            var a, i = this, l = this.floorsInfo[o], c = l.$el, d = c.html(), _ = l.tpl, u = this.w.tplVersion;
            if (_ && u)if (this.tplDefer[_]) a = this.tplDefer[_]; else {
                var f = !0, p = "jsonCallBack_" + _, h = this.o2JSConfig.tplPathRule(_), g = u[_],
                    m = s.tplLoadTimeout || e.TIMEOUT || 4e3;
                a = n({
                    url: h,
                    jsonpCallback: p,
                    params: {__trigger: !0},
                    needStore: f,
                    storeSign: g,
                    timeout: m,
                    backup: null,
                    cache: !0
                }), this.tplDefer[_] = a
            } else a = d;
            return a.always && a.fail(function () {
                c.removeClass(i.conf.cls).removeClass("mod_lazyload"), i.hideFloor(o, c), r.processTempl(s.reportFloorHideHash[o])
            }), a
        }, _loadData: function (o, t) {
            var a, r = this, i = this.floorsInfo[o], l = i.$el, c = i.source, d = i.backup;
            if (c)if (this.loadingData[o]) a = new $.Deferred, a.reject(); else {
                this.loadingData[o] = !0;
                var _ = c.split(":"), u = _[0], f = _[1], p = e.DOMAINS.INDEX_FLOOR + f, h = e.DOMAINS.BACKUP_FLOOR + d,
                    g = encodeURIComponent("jsonCallBack" + f), m = "cms" == u,
                    j = this.w.sourceVersion && this.w.sourceVersion[f], w = s.dataLoadTimeout || e.TIMEOUT || 4e3,
                    C = {pin: s.user.pin, uuid: s.user.uuid};
                s.disableStore === !0 && (m = !1), s.useBi || (C = {}), "nbi" == u && (p = e.DOMAINS.NEW_INDEX_FLOOR + f, h = e.DOMAINS.NEW_BACKUP_FLOOR + d, C = {
                    pin: s.user.pin,
                    uuid: s.user.uuid
                }), a = n({
                    url: p,
                    backup: h,
                    jsonpCallback: g,
                    params: C,
                    needStore: m,
                    storeSign: j,
                    timeout: w,
                    cache: !1,
                    dataCheck: function (e) {
                        if (e && e.data)return !0
                    }
                }), a.done(function () {
                    r.loadingData[o] = !1
                }).fail(function () {
                    r.loadingData[o] = !1, l.removeClass(r.conf.cls).removeClass("mod_lazyload"), r.hideFloor(o, l)
                })
            } else this.loadingData[o] = !1, a = {};
            return a
        }, load: function (e, o) {
            var t = this;
            $.when(this._loadTpl(e, o), this._loadData(e, o)).then(function (a, n) {
                var r = $.isArray(a) ? a[0] : a, i = $.isArray(n) ? n[0] : {data: n}, s = {};
                $.extend(s, i), t.triggerRender(e, r, s, o)
            })
        }, autoLoad: function () {
            var e = this, o = e.conf, t = e.getFloorsInfo($("." + o.cls));
            if (!e.isScrolling) {
                for (var a in t) {
                    var n = t[a], r = n.$el;
                    r.attr("data-hidden") || e.load(a, !1)
                }
                setTimeout(function () {
                    var o = $("body").find('img[data-lazy-img!="done"]'), t = [];
                    o.each(function () {
                        var e = $(this).attr("data-lazy-img");
                        "string" == typeof e && e.indexOf("//") >= 0 && t.push({type: "image", uri: e})
                    }), e.resourceLoader ? (e.resourceLoader.clear(), e.resourceLoader.load(t), e.isAutoRendered = !0) : seajs.use("O2_COMPONENT/resourceLoader.js", function (o) {
                        e.resourceLoader = o, e.resourceLoader.load(t), e.isAutoRendered = !0
                    })
                }, 2e3)
            }
        }, renderHidden: function (e) {
            var o = this.floorsInfo[e], t = o.$el, a = this.floorResult[e], n = $(a.html);
            t.removeClass(this.conf.cls).removeClass("mod_lazyload").append(n), o.hidden = !1, t.trigger(l.RENDER_AFTER, a.result).removeAttr("data-hidden"), _.eventCenter.trigger("lazyload:DOMUpdate", t)
        }, triggerRender: function (e, o, t, a) {
            var n, r, i = this, c = this.floorsInfo[e], d = c.$el, _ = c.custom, u = c.tpl, f = this.events,
                p = f[l.RENDER_BEFORE];
            o instanceof Object && ($.extend(t, o), o.style && !i.insertedStyles[u] && (s.insertStyles(u, o.style), i.insertedStyles[u] = !0)), d.hasClass(this.conf.cls) && (n = !!$.grep(p, function (e, o) {
                if ($(e.selector).is(d))return !0
            }).length, a && d.removeClass(this.conf.cls), r = function (o) {
                return o === !1 ? i.hideFloor(e, d) : (t.data = arguments[0] || t.data, !_ && a && d.removeClass("mod_lazyload"), void d.trigger("render", [t, a]))
            }, n ? d.trigger(l.RENDER_BEFORE, [t, r]) : r())
        }
    });
    new l
});