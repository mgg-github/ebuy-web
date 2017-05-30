(function () {
var width = "90px-215px".split("-")[0];
var height = "90px-215px".split("-")[1];

var widthB = "57px-160px".split("-")[0];
var heightB = "57px-160px".split("-")[1];

var data = [
    {
        src: "//img.taotao.com/da/jfs/t4645/155/3471457415/23991/27c05383/5922ab35Ne69c815a.png",
        width: width,
        height: height,
        srcB: "//img.taotao.com/da/jfs/t5641/346/937225563/11909/4881f019/5922ab39N90ba573c.png",
        widthB: widthB,
        heightB: heightB,
        clstag: "20170522",
        iframe: "//sale.taotao.com/act/4WrNni7gqkoy6A.html",
        tit: "618 ȫ�����й����"
    }
];

var getCompatibleData=function(object){
    var flag=(screen.width<1380);
    if(flag){
        object.width=object.widthB?object.widthB:object.width;
        object.height=object.heightB?object.heightB:object.height;
        object.src=object.srcB?object.srcB:object.src;
    }
    return object
};

var currentItem = getCompatibleData(data[0]);

$("#J-global-toolbar").find(".jdm-tbar-panel-ad").attr("data-iframe", currentItem.iframe);

$("#J-global-toolbar").find(".jdm-tbar-panel-ad .title").text(currentItem.tit);

$("#J-global-toolbar").find(".jdm-toolbar-header .J-trigger").attr("clstag", $("#J-global-toolbar").find(".jdm-toolbar-header .J-trigger").attr("clstag") + currentItem.clstag);

$("#J-global-toolbar").find(".jdm-toolbar-header .jdm-tbar-act").css({"width":currentItem.width,"height":currentItem.height,"background":"url("+currentItem.src+") no-repeat","cursor":"pointer"});

$("#J-global-toolbar").find(".jdm-toolbar-header").css("width",currentItem.width);
})(window);

/* open a page, not slide show*/

