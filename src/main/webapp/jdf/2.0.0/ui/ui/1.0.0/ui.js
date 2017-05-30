/* jdf-2.0.0/ ui.js Date:2017-02-21 17:05:38 */
!function (a, b) {
    !function () {
        var a = navigator.userAgent.toLowerCase();
        "undefined" == typeof b.browser ? b.browser = {
            version: (a.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
            safari: /webkit/.test(a),
            opera: /opera/.test(a),
            msie: /msie/.test(a) && !/opera/.test(a) || /trident/.test(a),
            mozilla: /mozilla/.test(a) && !/(compatible|webkit)/.test(a)
        } : (b.browser.webkit || (b.browser.webkit = /webkit/.test(a)), b.browser.mozilla && (b.browser.msie = /trident/.test(a))), b.extend(b.browser, function () {
            {
                var a = navigator.userAgent;
                navigator.appVersion
            }
            return {
                mobile: !!a.match(/AppleWebKit.*Mobile.*/),
                ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1,
                iPhone: a.indexOf("iPhone") > -1,
                iPad: a.indexOf("iPad") > -1,
                webApp: -1 == a.indexOf("Safari")
            }
        }()), b.browser.isMobile = function (a) {
            return function () {
                return a
            }
        }(b.browser.mobile || b.browser.ios || b.browser.android), b.each([6, 7, 8, 9, 10, 11, 12], function (a, c) {
            b.browser["isIE" + c] = function (a) {
                return function () {
                    return a
                }
            }(!(!b.browser.msie || b.browser.version != c))
        })
    }(), b.page = b.extend(b.page || {}, {
        document: "BackCompat" == document.compatMode ? document.body : document.documentElement,
        doc: function () {
            return this.document
        },
        clientWidth: function () {
            return this.document.clientWidth
        },
        clientHeight: function () {
            return this.document.clientHeight
        },
        docWidth: function () {
            return Math.max(this.document.clientWidth, this.document.scrollWidth)
        },
        docHeight: function () {
            return Math.max(this.document.clientHeight, this.document.scrollHeight)
        }
    }), "undefined" == typeof b.contains && (b.contains = function (a, b) {
        return a.compareDocumentPosition ? !!(16 & a.compareDocumentPosition(b)) : a !== b && a.contains(b)
    }), b.T = {
        throttle: function (a, c, d) {
            var e = -1;
            return 1 > c ? function () {
                b.T.call(null, d, -1), a.apply(this, arguments)
            } : function () {
                var f = arguments;
                var g = this;
                clearTimeout(e), e = setTimeout(function () {
                    clearTimeout(e), a.apply(g, f)
                }, c), b.T.call(null, d, e)
            }
        }, call: function (a, c) {
            var e = 1;
            var f = this;
            var g = a;
            b.isFunction(a) || (f = a, g = c, e = 2), b.isFunction(g) && g.apply(f, [].slice.call(arguments, e))
        }, apply: function (a, c, d) {
            var e = a;
            var f = c;
            var g = d;
            b.isFunction(a) && (e = this, f = a, g = c), b.isFunction(f) && f.apply(e, [].concat(g))
        }, tpl: function () {
            var a = {};
            return function (b, c, d) {
                var e = "string" == typeof d ? d : b;
                var f = "boolean" == typeof d ? d : !0;
                var g = a[e] || new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + b.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
                return f && (a[e] = g), c ? g(c) : g
            }
        }(), isBlank: function (a) {
            var c = arguments;
            if (c.length > 1) {
                for (var d = 0, e = c.length; e > d; d++)if (arguments.callee(c[d]))return !0;
                return !1
            }
            return "undefined" === String(a) || "null" === String(a) || ("string" == typeof a ? "" === b.trim(a) : !1) || b.isEmptyObject(a)
        }, search: function () {
            var a = {};
            var c = "_@separating@_";
            return b.each(location.search.substring(1).split("&"), function (d, e) {
                if (e = e.replace(/\%20/g, "").replace("=", c).split(c), e[0])if ("isdebug" == e[0] && e[1]) {
                    var f = {};
                    b.each(e[1].replace(/^\-/, "").split("-"), function (a, b) {
                        b && (f[b] = !0)
                    }), a[e[0]] = f
                } else a[e[0]] = e[1]
            }), function (c, d) {
                if (!c)return a;
                if (!b.isPlainObject(c) && null == d)return a[c];
                if ("isdebug" == c)return !(!a[c] || !a[c][d]);
                var e = arguments.callee;
                if (b.isPlainObject(c)) {
                    var f = !0;
                    var g = 0 == d;
                    return b.each(c, function (a, b) {
                        var c = e(a, b);
                        return g && c ? (f = !0, !1) : g || c ? void 0 : f = !1
                    }), f
                }
                return !(!a[c] || a[c] != d)
            }
        }(), getAllUI: function (a) {
            var c = [];
            return b.each(TTFUI.classes(), function (b) {
                c = c.concat(TTFUI[b].get(a))
            }), c
        }
    }, b.tpl = b.T.tpl, b.T.defer = b.T.throttle
}(window, jQuery), function (a) {
    if (a.browser.isMobile()) {
        var c, b = {};

        function d(a) {
            return "tagName" in a ? a : a.parentNode
        }

        function e(a, b, c, d) {
            var e = Math.abs(a - b), f = Math.abs(c - d);
            return e >= f ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down"
        }

        var g, f = 750;

        function h() {
            g = null, b.last && (b.el.trigger("longTap"), b = {})
        }

        function i() {
            g && clearTimeout(g), g = null
        }

        a(document).ready(function () {
            var j, k;
            a(document.body).bind("touchstart", function (e) {
                j = Date.now(), k = j - (b.last || j), b.el = a(d(e.target)), c && clearTimeout(c), b.x1 = e.pageX, b.y1 = e.pageY, k > 0 && 250 >= k && (b.isDoubleTap = !0), b.last = j, g = setTimeout(h, f)
            }).bind("touchmove", function (a) {
                i(), b.x2 = a.pageX, b.y2 = a.pageY
            }).bind("touchend", function () {
                i(), b.isDoubleTap ? (b.el.trigger("doubleTap"), b = {}) : b.x2 && Math.abs(b.x1 - b.x2) > 30 || b.y2 && Math.abs(b.y1 - b.y2) > 30 ? (b.el.trigger("swipe") && b.el.trigger("swipe" + e(b.x1, b.x2, b.y1, b.y2)), b = {}) : "last" in b && (b.el.trigger("tap"), c = setTimeout(function () {
                        c = null, b.el.trigger("singleTap"), b = {}
                    }, 250))
            }).bind("touchcancel", function () {
                c && clearTimeout(c), g && clearTimeout(g), g = c = null, b = {}
            })
        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (b) {
            a.fn[b] = function (a) {
                return this.bind(b, a)
            }
        })
    }
}($), function (a, b, c) {
    if (!b)return !1;
    var d = a.TTFUI;
    if (d && "2.0.0" == d.version && "TTF" == d.author || (d = function () {
            function d() {
            }

            "undefined" == typeof console && (a.console = {info: d, log: d, warn: d, error: d});
            var e = -1;
            var f = {
                id: -1,
                guid: -1,
                name: null,
                version: "2.0.0",
                el: null,
                selector: null,
                eventNamespace: null,
                options: {isAutoInit: !0, hasCssLink: !1, baseVersion: "1.0.0", cssLinkVersion: "1.0.0"},
                constructor: function () {
                },
                init: d,
                cache: function () {
                },
                show: function () {
                    this.el.show()
                },
                hide: function () {
                    this.el.hide()
                }
            };
            var g = {
                initCount: 0,
                _: {},
                event: {},
                isAlive: !0,
                options: {SSCode: 0, SSKeys: null, hasCssLink: !1, onReady: d, onDestroy: d},
                on: function () {
                },
                one: function () {
                },
                off: function () {
                },
                trigger: function () {
                },
                eventHandler: function () {
                },
                delegate: function () {
                },
                call: function (a) {
                    if (b.isFunction(a)) {
                        var d = [].slice.call(arguments, 1);
                        a.apply(this, d)
                    }
                },
                unbindEvent: d,
                loadAllEls: d,
                destroy: d
            };
            var h = ["id", "guid", "name", "eventNamespace", "selector", "cache"];
            var i = "abort,blur,change,click,dblclick,drag,dragend,dragenter,dragleave,dragover,dragstart,drop,durationchange,focus,input,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,mousewheel,scroll,select,submit,wheel".split(",");
            var j = /\b(\w)/g;
            var k = /El$/;
            var l = /Evt$/;
            var m = /\btimer\b|Timer$/;
            var n = /\binterval\b|Interval$/;
            var o = /^on[A-Z]/;
            var p = /\w\#\w/;
            var q = /^(author|version|define|all|classes|helper|loadRootUI|gc)$/;
            var r = /#/;
            var s = /#\w*/;
            var t = "data-options";
            var u = "data-opt-";
            var v = "ui-on-event";
            var w = /^(el|selector|hover)$/;
            var x = /^on|callback|complete$/;
            var y = /\s+/g;
            var z = /^static_/;
            var A = /^(create|get|all|forEach)$/;
            var B = {};
            var C = {};
            var D = {
                create: function (a, c, d) {
                    var f = C[c];
                    var g = b(a);
                    if (!f)return null;
                    var h = V(f.options || {}, g);
                    var i = b.extend(!0, {}, f, {options: h}, {options: d, guid: e + 1, id: f.id + 1});
                    i.el = g, i.selector = g.selector = a.selector, i.eventNamespace = ".ui-" + c + "-" + i.id;
                    var j = i.options;
                    if ("1.0.0" == j.baseVersion) O(i); else {
                        var k = M(c, g, j);
                        if (!k)return !1;
                        if (k !== !0)return k.selector = a.selector, k.init(d), k.cache("origin_options", b.extend(i.cache("origin_options"), d)), k;
                        H.createClass(i), i.cache("origin_options", d), N(i)
                    }
                    return B[c].push(i), W(c), C[c].id++, e++, K(i, c), i
                }, register: function (a, c) {
                    var d = C[a];
                    if (d)return !1;
                    var e = this.getClasses(c.extend);
                    var h = {};
                    return "2.0.0" == c.options.baseVersion && (h = g), e.length ? d = b.extend.apply(b, [!0, {}, f, h].concat(e).concat([c])) : (_(a, c), d = b.extend(!0, {}, f, h, c)), C[a] = d, d.name = a, B[a] = [], !0
                }, getClasses: function (a) {
                    var c = [];
                    var d = null;
                    var e = [];
                    return a ? (b.isArray(a) ? e = a : e.push(a), b.each(e, function (a, b) {
                        if (d = C[b], !d)throw new Error(b + " is not exist!");
                        c.push(d)
                    }), c) : c
                }
            };
            var E = {
                author: "TTF", version: "2.0.0", define: I("define", function (a, c) {
                    if (!a || !c || "string" != typeof a || q.test(a) || !b.isPlainObject(c))return !1;
                    c.options = c.options || {}, c.options.baseVersion = c.options.baseVersion || "1.0.0";
                    var d = {};
                    return b.each(c, function (a, b) {
                        if (z.test(a)) {
                            var e = a.substring(7);
                            c[e] && console.warn('static method "' + a + '" will be overwrite "' + e + '" method! '), c[e] = d[e] = b, delete c[a]
                        }
                    }), r.test(a) && (a = a.replace(s, ""), c.options.baseVersion = "2.0.0"), E[a] ? E[a] : D.register(a, c) ? (E[a] = Z(C[a], d), X(a), Y(a), E[a]) : !1
                }), all: I("all", function () {
                    return b.extend(!0, {}, B)
                }), classes: I("classes", function () {
                    return b.extend(!0, {}, C)
                }), helper: I("helper", function (a) {
                    if ("object" != typeof seajs)return console.error("require seajs.js!"), !1;
                    var c = ["jdf/2.0.0/ui/helper/1.0.0/helper.js"];
                    b.each(C, function (a, b) {
                        "2.0.0" == b.options.baseVersion && c.push("jdf/" + b.options.baseVersion + "/ui/" + a + "/" + b.options.cssLinkVersion + "/helper.js")
                    }), c.length && seajs.use(c, function (c) {
                        b.T.call(c, a, B)
                    })
                }), loadRootUI: I("loadRootUI", function () {
                    var a = "data-root-ui";
                    var c = "data-root-ui-url";
                    var d = "data-root-install";
                    var e = [];
                    var f = b("[" + a + "][" + d + '!="done"]');
                    return f.each(function () {
                        var d = b(this);
                        var f = d.attr(a);
                        var g = d.attr(c);
                        return !g && q.test(f) ? !0 : void e.push(g || "jdf/2.0.0/ui/" + f + "/1.0.0/" + f + ".js")
                    }), e.length ? void seajs.use(e, function () {
                        f.each(function () {
                            var e = b(this);
                            var f = e.attr(a);
                            var g = E[f];
                            if (!g || !e.attr(c) && q.test(f))return !0;
                            var h = g({el: e, isAutoInit: !1});
                            return h ? (h.on("ready", function () {
                                e.attr(d, "done")
                            }), void h.init()) : !0
                        })
                    }) : !1
                }), gc: I("gc", function () {
                    var a = F.list;
                    return a.length ? (b.each(a, function (a, c) {
                        delete c.data, delete c.event, delete c.eventIDs, b.each(c.instance, function (a) {
                            delete c.instance[a]
                        }), delete c.instance
                    }), F.list = [], !0) : !1
                })
            };
            var F = {
                list: [], push: function (a) {
                    this.list.push(a), this.clear()
                }, clear: b.T.throttle(function () {
                    E.gc()
                }, 3e3)
            };

            function G(a, b) {
                this.name = a, this.ui = b
            }

            G.createClass = function (a, c) {
                var d = new G(a, c);
                b.each(["create", "get", "forEach"], function (a, b) {
                    c[b] = I(b, function () {
                        return d[b].apply(d, arguments)
                    })
                }), c.all = B[a]
            }, G.prototype.create = function (a, c, d) {
                var e = this.name;
                var f = [];
                var g = a.selector;
                return b.each(a, function (a, b) {
                    b.selector = g + ":eq(" + a + ")", f.push(D.create(b, e, c))
                }), 1 == d ? this : 1 == f.length ? f.pop() : f
            }, G.prototype.get = function (a) {
                var c = this.name;
                var d = [];
                return a instanceof b && b.each(a, function (a, e) {
                    e = b(e).get(0), b.each(B[c], function (a, b) {
                        e == b.el.get(0) && d.push(b)
                    })
                }), d.length && b.each(d[0], function (a, c) {
                    b.isFunction(c) && !A.test(a) && (d[a] = function () {
                        var c = arguments;
                        return b.each(d, function () {
                            this[a].apply(this, c)
                        }), d
                    })
                }), d
            }, G.prototype.forEach = function (a) {
                if (b.isFunction(a)) {
                    var c = B[this.name];
                    for (var d = c.length - 1; d >= 0; d--)a.call(c[d], d, c[d])
                }
                return this.ui
            };
            function H(a) {
                var b = this;
                b.data = {}, b.event = {}, b.eventIDs = {}, b.instance = a
            }

            H.createClass = function (a) {
                var c = new H(a);
                b.each(["on", "one", "off", "trigger", "eventHandler", "delegate"], function (b, d) {
                    a[d] = I(d, function () {
                        return c[d].apply(c, arguments), a
                    })
                }), a.cache = I("cache", function () {
                    return c.cache.apply(c, arguments)
                });
                var e = b.isFunction(a.unbindEvent) ? a.unbindEvent : d;
                a.unbindEvent = I("unbindEvent", function () {
                    return c.unbindEvent.apply(c, arguments), e.apply(a, arguments), a
                });
                var f = b.isFunction(a.loadAllEls) ? a.loadAllEls : d;
                a.loadAllEls = I("loadAllEls", function () {
                    return c.loadAllEls.apply(c, arguments), f.apply(a, arguments), a
                });
                var g = b.isFunction(a.destroy) ? a.destroy : d;
                a.destroy = I("destroy", function () {
                    return g.apply(a, arguments), b.T.call(a, a.options.onDestroy), c.destroy.apply(c, arguments), a
                })
            }, H.prototype.cache = function (a, b) {
                var d = this;
                if (a)return b === c ? d.data[a] : null !== b ? d.data[a] = b : void delete d.data[a]
            }, H.prototype.on = function (a, c) {
                if (a && b.isFunction(c)) {
                    var d = this;
                    if (a = a.toLowerCase(), p.test(a)) {
                        var e = a.split("#");
                        if (d.eventIDs[a])return d.off(a, d.eventIDs[a]), d.on(a, c), !1;
                        d.eventIDs[a] = c, a = e[0]
                    }
                    d.event[a] = (d.event[a] || []).concat([c])
                }
            }, H.prototype.one = function (a, c) {
                if (a && b.isFunction(c)) {
                    var d = this;
                    a = a.toLowerCase(), d.on(a, function () {
                        return c.apply(this, arguments), d.off(a, arguments.callee), v
                    })
                }
            }, H.prototype.off = function (a, c) {
                if (a || b.isFunction(c)) {
                    var d = this;
                    if (a = a.toLowerCase(), p.test(a)) {
                        var e = a.split("#");
                        if (!d.eventIDs[a])return !1;
                        c = d.eventIDs[a], delete d.eventIDs[a], a = e[0]
                    } else b.each(d.eventIDs, function (b) {
                        0 == b.indexOf(a + "#") && delete d.eventIDs[b]
                    });
                    var f = d.event[a] || [];
                    if (b.isFunction(c)) {
                        for (var g = f.length - 1, h = null; g >= 0; g--)if (h = f[g], f[g] == c) {
                            f.splice(g, 1);
                            break
                        }
                    } else f = [];
                    d.event[a] = f
                }
            }, H.prototype.trigger = function (a, c) {
                if (a) {
                    var d = this;
                    var e = d.instance;
                    if (a = a.toLowerCase(), d.event[a]) {
                        c = [].slice.call(arguments, 1);
                        for (var f = 0; f < d.event[a].length; f++) {
                            var g = d.event[a][f];
                            b.isFunction(g) && (f -= g.apply(e, c) == v ? 1 : 0)
                        }
                    }
                }
            }, H.prototype.eventHandler = function (a) {
                var c = this;
                var d = c.instance;
                if (!a)return d;
                if (a.el = a.el || d.el, b.each(a, function (b, c) {
                        w.test(b) || (a.selector ? a.el.delegate(a.selector, S(d, b), c) : a.el.bind(S(d, b), c))
                    }), a.hover) {
                    var e = a.hover;
                    b.isArray(e) ? 1 == e.length && e.push(e[0]) : e = [e, e], arguments.callee.call(c, {
                        el: a.el,
                        selector: a.selector,
                        mouseenter: e[0],
                        mouseleave: e[1]
                    })
                }
                return d
            }, H.prototype.delegate = function (a, c, d) {
                var e = this.instance;
                a instanceof b ? a.bind(c, d) : "string" == typeof a && e.el.delegate(a, c, d)
            }, H.prototype.unbindEvent = function () {
                var a = this;
                var c = a.instance;
                c.el.unbind(c.eventNamespace), b.each(c.options, function (a, d) {
                    k.test(a) && d instanceof b && d.unbind(c.eventNamespace)
                }), !b.isEmptyObject(c._) && b.isPlainObject(c._) && b.each(c._, function (a, d) {
                    k.test(a) && d instanceof b ? d.unbind(c.eventNamespace) : m.test(a) ? clearTimeout(d) : n.test(a) && clearInterval(d)
                })
            }, H.prototype.loadAllEls = function () {
                var a = this;
                var c = a.instance;
                var d = c.cache("options");
                var e = null;
                b.each(d, function (a, d) {
                    !k.test(a) || d instanceof b || (d ? (c.options[a] = b(d, c.el), c.options[a.replace(k, "") + "Selector"] = d) : (d = '[data-root="' + a.substring(0, a.length - 2) + '"]', e = b(d, c.el), e.length && (c.options[a] = e, c.options[a.replace(k, "") + "Selector"] = d)))
                })
            }, H.prototype.destroy = function () {
                var a = this;
                var b = a.instance;
                b.unbindEvent(), b.isAlive = !1, J(b), F.push(a)
            };
            function I(a, b) {
                return b.toString = function () {
                    return a + " { [native code] }"
                }, b
            }

            function J(a) {
                var c = a.name;
                var d = B[c];
                var e = d.length;
                b.each(d, function (b, c) {
                    return c.id == a.id ? (d.splice(b, 1), !1) : void 0
                }), W(c, e)
            }

            function K(a, b) {
                var c = a.options;
                if (c.hasCssLink && "undefined" != typeof seajs && c.cssLinkVersion && c.baseVersion) seajs.use(("https:" == document.location.protocol ? "https:" : "http:") + "//taotao.com" + c.baseVersion + "/ui/" + b + "/" + c.cssLinkVersion + "/" + b + ".css", function () {
                    c.isAutoInit && a.init()
                }); else if (c.isAutoInit) {
                    var d = a.init();
                    d === !1 && "1.0.0" == c.baseVersion && J(a)
                }
            }

            function L(a, c) {
                if (!b.isPlainObject(a))return "";
                if (!b.isArray(c))return "";
                var d = [];
                var e = "";
                return b.each(c, function (c, f) {
                    e = a[f], k.test(f) && e instanceof b && (e = e.selector), d.push(f + ":" + String(e))
                }), d.join(",")
            }

            function M(a, c, d) {
                var e = d.SSCode;
                if (e > 0) {
                    var f = E[a].get(c);
                    if (f.length) {
                        if (d.SSKeys) {
                            var g = L(d, d.SSKeys);
                            var h = [];
                            if (g && b.each(f, function (a, b) {
                                    L(b.cache("options"), d.SSKeys) == g && h.push(b)
                                }), !h.length)return !0;
                            f = h
                        }
                        switch (e % 2 != 0 && console.warn(c, c.selector + " has been bind " + a + " component!", f), e) {
                            case 1:
                                break;
                            case 2:
                                return f[0];
                            case 3:
                                return !1
                        }
                    }
                }
                return !0
            }

            function N(a) {
                a.cache("options", b.extend({}, a.options, !0)), Q(a), T(a), U(a)
            }

            function O(a) {
                a.cache("options", b.extend({}, a.options, !0)), b.each(a.options, function (c, d) {
                    x.test(c.toLowerCase()) && b.isFunction(a.options[c]) && (a.options[c] = function (a) {
                        var c = [a];
                        var d = function () {
                            var a = this;
                            var d = arguments;
                            b.each(c, function (b, c) {
                                c.apply(a, d)
                            })
                        };
                        return d.callbacks = c, d.add = function (a) {
                            d.callbacks.push(a)
                        }, d
                    }(d))
                })
            }

            function P() {
                var a = this;
                var c = a.options;
                var d = a.cache("options");
                var e;
                var f = {};
                b.each([].slice.call(arguments, 0), function (g, h) {
                    e ? (c[e] = f[e] = d[e] = h, e = null) : b.isPlainObject(h) ? (f = h, b.extend(d, f), b.extend(a.options, f)) : e = String(h).replace(y, "")
                }), a.cache("options", d), a.cache("origin_options", b.extend(a.cache("origin_options"), f)), b.each(f, function (b, c) {
                    R(a, b, c)
                })
            }

            function Q(a) {
                b.each(a.options, function (b, c) {
                    R(a, b, c)
                })
            }

            function R(a, b, c) {
                if ((l.test(b) || "evt" == b) && c) a.options[b] = S(a, c); else if (o.test(b)) {
                    var d = b.substring(2);
                    a.on(d + "#__id_" + a.id, c), a.options[b] = I(b, function () {
                        var b = [].slice.call(arguments);
                        b.unshift(d), a.trigger.apply(null, b)
                    })
                }
            }

            function S(a, b) {
                return b + a.eventNamespace
            }

            function T(a) {
                var c = {};
                b.each(i, function (b, d) {
                    c[d] = S(a, d)
                }), a.event = c
            }

            function U(a) {
                var c = a.init;
                a.init = I("init", function () {
                    var d = {};
                    return a.unbindEvent(), a.initCount++, arguments.length && P.apply(a, arguments), a.loadAllEls(), $(a), b.isFunction(c) && (d = c.apply(a, arguments), d === !1) ? void 0 : (b.T.call(a, a.options.onReady, d), a)
                })
            }

            function V(c, d) {
                var e = d.attr(t);
                var f = null;
                var g, h = d[0].attributes;
                var i = 9;
                if (e && e.length > 2)try {
                    f = a.eval("(" + e + ")")
                } catch (j) {
                }
                return f || (f = {}), h && h.length && b.each(h, function (a, d) {
                    0 == d.name.indexOf(u) && d.name.length > i && (g = d.name.substring(i).toLocaleLowerCase(), b.each(c, function (a) {
                        a.toLocaleLowerCase() == g && (f[a] = d.value)
                    }))
                }), f
            }

            function W(a, c) {
                c = Math.max(c || 0, B[a].length);
                for (var d = 0; c > d; d++)delete E[a][d];
                b.each(B[a], function (b, c) {
                    E[a][b] = c
                })
            }

            function X(a) {
                return b.fn[a] ? (b.T.search("isdebug", 1) && console.error('$.fn["' + a + '"] is exist! please use TTFUI.' + a), !1) : void(b.fn[a] = function (b, c) {
                    return E[a].create(this, b, c)
                })
            }

            function Y(a) {
                var c = "get" + a.replace(j, function (a) {
                        return a.toUpperCase()
                    });
                return b.fn[c] ? (b.T.search("isdebug", 1) && console.error("$.fn[" + c + "] is exist! please use TTFUI." + a + ".get($el)"), !1) : void(b.fn[c] = function () {
                    return E[a].get(this)
                })
            }

            function Z(a, c) {
                var d = a.name;

                function e(c) {
                    return c ? (c.el instanceof b || (c.el = b(c.el ? c.el : "body")), E[d].create(c.el, c)) : a
                }

                return G.createClass(d, e), b.each(a, function (a, c) {
                    b.isFunction(c) && !A.test(a) && (e.all[a] = function () {
                        var b = arguments;
                        return e.forEach(function () {
                            this[a].apply(this, b)
                        }), e.all
                    })
                }), b.each(c || [], function (a, b) {
                    e[a] = b
                }), e
            }

            function $(a) {
                b.T.search("isdebug", 1) && E.helper(function () {
                    var c = this;
                    c && b.T.call(c.test, a)
                })
            }

            function _(a, d) {
                b.each(h, function (b, e) {
                    d[e] !== c && console.error("SyntaxError: " + a + "." + e + "  is a reserved identifier")
                })
            }

            return a.TTFUI = E, b(function () {
                E.loadRootUI()
            }), E
        }()), "function" == typeof define && define("//taotao.com2.0.0/ui/ui/1.0.0/ui.js", [], function () {
            return d
        }), !b.ui && (b.ui = d, a.seajs && b.isPlainObject(seajs.data) && b.isArray(seajs.data.preload))) {
        var e = seajs.data.preload;
        for (var f = e.length - 1; f >= 0; f--)-1 != e[f].indexOf("//taotao.com/jdf/1.0.0/ui/1.0.0/ui.js") && e.splice(f, 1);
        seajs.data.preload = e
    }
}(window, jQuery);
