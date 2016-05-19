window.Asc.plugin = {
    name : "chess (fen)",
    guid : "{FFE1F462-1EA2-4391-990D-4CC84940B754}",

    variations : [
        {
            description : "chess",
            url         : "chess/index.html",

            icons           : ["chess/icon.png", "chess/icon@2x.png"],
            isViewer        : true,
            EditorsSupport  : ["word", "cell", "slide"],

            isVisual        : true,
            isModal         : true,
            isInsideMode    : false,

            initDataType    : "ole",
            initData        : "",

            isUpdateOleOnResize : true,

            buttons         : [ { text: "Ok", primary: true },
                                { text: "Cancel", primary: false } ]
        }
    ]
};