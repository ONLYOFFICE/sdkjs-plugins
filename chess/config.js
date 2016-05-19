window.Asc.plugin = {
    "name" : "chess(fen)",
    "guid" : "{FFE1F462-1EA2-4391-990D-4CC84940B754}",

    "variations" : [
        {
            "description" : "chess",
            "url"         : "chess(fen)/index.html",

            "icons"           : ["chess\(fen\)/icon.png", "chess\(fen\)/icon@2x.png"],
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