window.Asc.plugin = {
    "name" : "cbr",
    "guid" : "asc.{5F9D4EB4-AF61-46EF-AE25-46C96E75E1DD}",

    "variations" : [
        {
            "description" : "cbr",
            "url"         : "cbr/index.html",

            "icons"           : ["cbr/icon.png", "cbr/icon@2x.png"],
//            "isViewer"        : true,
            "isViewer"        : false,
            "EditorsSupport"  : ["word", "cell", "slide"],

//            "isVisual"        : true,
//            "isModal"         : true,
            "isVisual"        : false,
            "isModal"         : false,
            "isInsideMode"    : false,

            "initDataType"    : "none",
            "initData"        : "",

//            "isUpdateOleOnResize" : true,
			"isUpdateOleOnResize" : false,

//            "buttons"         : [ { "text": "Ok", "primary": true },
//                                { "text": "Cancel", "primary": false } ]
			"buttons"         : []
        }
    ]
};