define("//taotao.com/mtd/pc/components/lazyload/2.0.0/lazyload.js",[],function(){"use strict";!function(window,$){var $window=$(window),_height=$window.height(),_scrollTop=$window.scrollTop(),_event=new _.Events,_getWindowHeight=function(){return window.innerHeight?function(){return window.innerHeight}:function(){return $window.height()}}();_.eventCenter.on("lazyload:DOMUpdate",function(e){_height=_getWindowHeight(),_event.trigger("lazyload:load",e)}),$window.bind("scroll.o2-lazyload",function(e){_scrollTop=$window.scrollTop(),_event.trigger("lazyload:load")}),$window.bind("resize.o2-lazyload",function(e){_height=_getWindowHeight(),_scrollTop=$window.scrollTop(),_event.trigger("lazyload:load")});var Util={setCookie:function(e,t,o,i){if(i||(i=location.hostname),arguments.length>2){var n=new Date((new Date).getTime()+parseInt(60*o*60*24*30*1e3));document.cookie=e+"="+escape(t)+"; path=/; domain="+i+"; expires="+n.toGMTString()}else document.cookie=e+"="+escape(t)+"; path=/; domain="+i},getCookie:function(e){try{return null==document.cookie.match(new RegExp("(^"+e+"| "+e+")=([^;]*)"))?"":decodeURIComponent(RegExp.$2)}catch(t){return null==document.cookie.match(new RegExp("(^"+e+"| "+e+")=([^;]*)"))?"":RegExp.$2}},getUrlParams:function(key){var query=location.search,reg="/^.*[\\?|\\&]"+key+"\\=([^\\&]*)/";reg=eval(reg);var ret=query.match(reg);return null!=ret?decodeURIComponent(ret[1]):""},inviewport:function(){var e=function(e,t){return _height+_scrollTop<=e.top-t},t=function(e,t){return _scrollTop>=e.top+t+e.height};return function(o,i){return!e(o,i)&&!t(o,i)}}()},Lazyload=function(e){this.$self=e.$self,this.webpSupported=!1,this.forceOpenWebP=!1,this._loadTimer=null,this._imgInfo=[],this._loaded={},this.settings=e.settings};Lazyload.prototype._setImg=function(e,t,o){t.attr("src",o),e.onload=null},Lazyload.prototype._loadImg=function(e){var t=e.$el,o=e.src,i=o,n=e.webpDisable,a=this;if(!e.loading){e.loading=!0;var r=new Image,l=!1,s=this.settings;this.webpSupported&&s.webpReg.test(o)&&n!==s.webpDisableValue||this.forceOpenWebP?i=o+"!q"+s.webpQuality+s.webpSuffix:s.quality!==-1&&(i=o+"!q"+s.quality),r.onload=function(){l=!0,e.loading=!1,e.done=!0,t.attr(s.source,"done"),a._setImg(r,t,i)},r.onerror=function(){e.webpDisable="no",e.loading=!1},r.src=i,1!=r.complete||l||(l=!0,e.loading=!1,e.done=!0,t.attr(s.source,"done"),this._setImg(r,t,i))}},Lazyload.prototype._loadImgs=function(){var e=this._imgInfo.length,t=this;for($.each(this._imgInfo,function(e,o,i){var n=o.$el;!o.done&&Util.inviewport(o,t.settings.threshold)&&(o.src||n.attr("src",t.settings.placeholder),t._loadImg(o))});e--;)1==this._imgInfo[e].done&&this._imgInfo.splice(e,1)},Lazyload.prototype._update=function(){clearTimeout(this._loadTimer),this._loadTimer=setTimeout($.proxy(this._loadImgs,this),this.settings.delay)},Lazyload.prototype._refreshDOMEl=function(e){if(1!=e.attr("data-inlazyqueue")){e.attr("data-inlazyqueue",!0);var t=this;$("img",e).each(function(e,o){var i=$(o),n=i.attr(t.settings.source);n&&"done"!=n&&t._imgInfo.push({$el:i,src:n,done:!1,top:i.offset().top,height:i.height(),loading:!1,webpDisable:i.attr(t.settings.webpDisableKey)})})}},Lazyload.prototype._refreshDOMPos=function(e){$.each(this._imgInfo,function(t,o,i){i[t].top=e.offset().top,i[t].height=e.height()})},Lazyload.prototype._initEvent=function(){$(document).ready($.proxy(this._update,this)),_.eventCenter.on("lazyload:DOMUpdate",$.proxy(this._refreshDOMEl,this)),_event.on("lazyload:load",$.proxy(this._update,this))},Lazyload.prototype._isInit=function(){return"1"===this.$self.attr(this.settings.source+"-install")||(this.$self.attr(this.settings.source+"-install","1"),!1)},Lazyload.prototype.init=function(e){if(!this._isInit()){var t=Util.getUrlParams(this.settings.forceOpenOrCloseWebP);this.webpSupported=e,"1"===t&&(this.forceOpenWebP=!0),this._initEvent()}},$.fn.o2lazyload=function(e){var t,o=this,i=$(o);t=$.extend({threshold:200,delay:100,source:"data-lazy-img",supportWebp:!0,cacheSupportWebp:!0,cacheSupportWebpKey:"o2-webp",quality:-1,webpReg:/\/\/img\d+.360buyimg.com\/.+\.(jpg|png)$/,webpSuffix:".webp",webpQuality:80,webpDisableKey:"data-webp",webpDisableValue:"no",forceOpenOrCloseWebP:"o2-webp",placeholder:"//taotao.com/lib/img/e/blank.gif"},e);var n=new Lazyload({$self:i,settings:t}),a=function(e){if("0"===Util.getUrlParams(t.forceOpenOrCloseWebP))return void e(!1);if(!t.supportWebp)return void e(!1);if(t.cacheSupportWebp){var o=Util.getCookie(t.cacheSupportWebpKey);if(""!==o)return void e("true"===o||o===!0)}var i=new Image;i.onload=function(){var o=i.width>0&&i.height>0;e(o),t.cacheSupportWebp&&Util.setCookie(t.cacheSupportWebpKey,o,1)},i.onerror=function(){e(!1),t.cacheSupportWebp&&Util.setCookie(t.cacheSupportWebpKey,!1,1)},i.src="data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA"};return a(function(e){n.init(e)}),this}}(window,jQuery)});