/* jdf-1.0.0/ setUserInfo.js Date:2017-05-23 20:25:30 */
define("//taotao.com/1.0.0/unit/setUserInfo/3.0.0/setUserInfo.js",[],function(){var c=function(a){a=$.extend({el:$("#loginbar,#ttbar-login"),callback:null},a||{});var b=function(){return"https:"==document.location.protocol?"https://":"http://"};$.ajax({url:b()+"passport.taotao.com/new/helloService.ashx",dataType:"jsonp",scriptCharset:"GBK",success:function(b){if(!b)return!1;b.info&&a.el.html(b.info);var c=function(){clearTimeout(d),$.isFunction(a.callback)&&a.callback(b),c=$.noop};var d=setTimeout(function(){c()},2e3);if(b.sso){var e=b.sso.length;$.each(b.sso,function(a,b){$.getJSON(b).complete(function(){0==--e&&c()})})}else c()}})};return c});
