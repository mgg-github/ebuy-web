var o2 = o2 || {};
o2.detect = {
    browser: function () {
        var ua = navigator.userAgent.toLowerCase(), opera = window.opera,
            result = {engine: 0, system: 0, browser: 0, version: 0}, systemList = {}, ieBrowserList = {},
            engineList = {}, i;
        systemList = {
            macintosh: ua.indexOf("macintosh") > -1,
            windows: ua.indexOf("windows") > -1,
            linux: ua.indexOf("linux") > -1,
            android: ua.indexOf("android") > -1,
            ipad: ua.indexOf("ipad") > -1,
            iphone: ua.indexOf("iphone") > -1
        };
        ieBrowserList = {
            ie6: !window.XMLHttpRequest || engineList.quirk,
            ie7: /msie 7/i.test(ua),
            ie8: document.documentMode == 8,
            ie9: document.documentMode == 9,
            ie10: document.documentMode == 10,
            ie11: document.documentMode == 11
        };
        engineList = {
            ie: /msie/i.test(ua),
            quirk: document.compatMode == "BackCompat",
            webkit: ua.indexOf(" applewebkit/") > -1,
            opera: (!!opera && opera.version),
            gecko: navigator.product == "Gecko" && !engineList.webkit && !engineList.opera
        };
        if (engineList.ie) {
            for (i in ieBrowserList) {
                if (ieBrowserList[i]) {
                    result.engine = "ie";
                    result.browser = i;
                    result.version = /msie 7/i.test(ua) ? 7 : document.documentMode;
                    getSystem();
                    return result
                }
            }
        }
        if (engineList.webkit) {
            if (ua.indexOf("safari") > -1) {
                if (ua.indexOf("chrome") > -1) {
                    result.browser = "chrome";
                    result.version = "latest"
                } else {
                    result.browser = "safari";
                    result.version = parseInt(ua.match(/ applewebkit\/(\d+)/)[1])
                }
            } else {
                result.browser = "webkit";
                result.version = "unknown"
            }
            result.engine = "webkit";
            getSystem();
            return result
        }
        if (engineList.opera) {
            result.engine = "opera";
            result.browser = "opera";
            result.version = parseInt(opera.version());
            getSystem();
            return result
        }
        if (engineList.gecko) {
            if (ua.indexOf("firefox") > -1) {
                result.browser = "firefox";
                result.version = ua.match(/rv:(\d+)/)[1]
            } else {
                result.browser = "unknown";
                result.version = "unknown"
            }
            result.engine = "gecko";
            getSystem();
            return result
        }
        return result;
        function getSystem() {
            var i;
            for (i in systemList) {
                if (systemList[i]) {
                    result.system = i
                }
            }
        }
    }, css3test: function (prop) {
        var div = document.createElement("div"), vendors = "Khtml Ms O Moz Webkit".split(" "), len = vendors.length - 1;
        if (prop in div.style) {
            return true
        }
        prop = prop.replace(/^[a-z]/, function (val) {
            return val.toUpperCase()
        });
        len = vendors.length - 1;
        while (len >= 0) {
            if (vendors[len] + prop in div.style) {
                return true
            }
            len--
        }
        return false
    }
};
o2.init = function () {
    var browser = o2.detect.browser();
    var cssTest = o2.detect.css3test("transition") ? ("csstransitions") : ("no-csstransitions");
    cssTest = o2.detect.css3test("animation") ? (cssTest + " cssanimations") : (cssTest + " no-cssanimations");
    var classList = [];
    classList.push(cssTest, browser.engine, browser.browser, browser.version);
    $("html").addClass(classList.join(" o2_"))
};
o2.init();