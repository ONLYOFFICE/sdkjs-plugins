window.Asc.plugin = {
    "name" : "youtube",
    "guid" : "asc.{38E022EA-AD92-45FC-B22B-49DF39746DB4}",

    "variations" : [
        {
            "description" : "youtube",
            "url"         : "youtube/index.html",

            "icons"           : ["youtube/icon.png", "youtube/icon@2x.png"],
            "isViewer"        : true,
            "EditorsSupport"  : ["word", "cell", "slide"],

            "isVisual"        : true,
            "isModal"         : true,
            "isInsideMode"    : false,

            "initDataType"    : "ole",
            "initData"        : "",

            "isUpdateOleOnResize" : true,

            "buttons"        : [ { "text": "Ok", "primary": true },
                                { "text": "Cancel", "primary": false } ]
        }
    ]
};