/* jdf-1.0.0/ event.js Date:2017-05-23 20:25:31 */
define("//taotao.com/jdf/1.0.0/unit/event/1.0.0/event.js", [], function () {
    var c = {
        on: function (a, b) {
            var c = this;
            this.list = this.list || (this.list = []), this.list[a] = this.list[a] || [];
            if ("undefined" == typeof b)var b = function () {
                c[a] && c[a]()
            };
            "function" == typeof b && this.list[a].push(b)
        }, off: function (a, b) {
            if ("function" == typeof b) {
                if ("undefined" != typeof this.list) {
                    var c = this.list[a];
                    if (c) {
                        var d = c.length;
                        for (; d--;)c[d] === b && c.splice(d, 1)
                    }
                }
            } else this.list[a] = []
        }, trigger: function (a, b) {
            if ("undefined" != typeof this.list) {
                var c = this.list[a];
                if (c)for (var d in c)c.hasOwnProperty(d) && "function" == typeof c[d] && c[d](b)
            }
        }, removeAll: function () {
            this.list = []
        }
    };
    return c
});
