window.Asc.plugin = {
    name : "speech",
    guid : "{D71C2EF0-F15B-47C7-80E9-86D671F9C595}",

    variations : [
        {
            description : "speech",
            url         : "speech/index.html",

            icons           : ["speech/icon.png", "speech/icon@2x.png"],
            isViewer        : true,
            EditorsSupport  : ["word", "cell", "slide"],

            isVisual        : false,
            isModal         : false,
            isInsideMode    : false,

            initDataType    : "text",
            initData        : "",

            isUpdateOleOnResize : false,

            buttons         : [ ]
        }
    ]
};

var plugin4                 = new Asc.CPlugin();
plugin4.name                = "speech";
plugin4.guid                = "{D71C2EF0-F15B-47C7-80E9-86D671F9C595}";
plugin4.url                 = "speech/index.html";
plugin4.icons               = ["speech/icon.png", "speech/icon@2x.png"];
plugin4.isVisual            = false;
plugin4.initDataType        = Asc.EPluginDataType.text;
plugin4.isUpdateOleOnResize = false;
plugin4.buttons             = [];