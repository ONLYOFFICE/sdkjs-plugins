window.Asc.plugin = {
    name : "glavred",
    guid : "{B631E142-E40B-4B4C-90B9-2D00222A286E}",

    variations : [
        {
            description : "glavred",
            url         : "glavred/index.html",

            icons           : ["glavred/icon.png", "glavred/icon@2x.png"],
            isViewer        : true,
            EditorsSupport  : ["word", "cell", "slide"],

            isVisual        : true,
            isModal         : true,
            isInsideMode    : false,

            initDataType    : "text",
            initData        : "",

            isUpdateOleOnResize : false,

            buttons         : [ { text: "Ok", primary: true } ]
        }
    ]
};