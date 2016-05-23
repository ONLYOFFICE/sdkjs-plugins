window.Asc.plugin = {
    "name" : "chess(fen)",
    "guid" : "asc.{FFE1F462-1EA2-4391-990D-4CC84940B754}",

    "variations" : [
        {
            "description" : "chess",
            "url"         : "chess(fen)/index.html",

            "icons"           : ["chess%28fen%29/icon.png", "chess%28fen%29/icon@2x.png"],
            "isViewer"        : true,
            "EditorsSupport"  : ["word", "cell", "slide"],

            "isVisual"        : true,
            "isModal"         : true,
            "isInsideMode"    : false,

            "initDataType"    : "ole",
            "initData"        : "",

            "isUpdateOleOnResize" : true,

            "buttons"         : [ { "text": "Ok", "primary": true },
                                { "text": "Cancel", "primary": false } ]
        }
    ]
};