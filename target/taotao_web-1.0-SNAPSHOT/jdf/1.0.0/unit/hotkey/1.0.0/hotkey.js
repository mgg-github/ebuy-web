/* jdf-1.0.0/ hotkey.js Date:2017-05-23 20:25:31 */
define("//taotao.com/jdf/1.0.0/unit/hotkey/1.0.0/hotkey.js", [], function () {
    function c() {
        document.onkeyup = function (a) {
            var b = document.activeElement.tagName.toLowerCase();
            if ("input" != b && "textarea" != b) {
                var a = a ? a : window.event, c = a.keyCode || a.which;
                switch (c) {
                    case 68:
                        window.pageConfig.clientViewTop || (window.pageConfig.clientViewTop = 0), window.pageConfig.clientViewTop += document.documentElement.clientHeight, window.scrollTo(0, pageConfig.clientViewTop);
                        break;
                    case 83:
                        window.scrollTo(0, 0), window.pageConfig.clientViewTop = 0, document.getElementById("key").focus();
                        break;
                    case 84:
                        window.scrollTo(0, 0), window.pageConfig.clientViewTop = 0
                }
            }
        }
    }

    return c
});
