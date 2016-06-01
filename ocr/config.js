window.Asc.plugin = {
    "name" : "ocr(Tesseract.js)",
    "guid" : "asc.{440EBF13-9B19-4BD8-8621-05200E58140B}",
    "baseUrl" : "",

    "variations" : [
        {
            "description" : "ocr",
            "url"         : "ocr/index.html",

            "icons"           : ["ocr/icon.png", "ocr/icon@2x.png"],
            "isViewer"        : false,
            "EditorsSupport"  : ["word"],

            "isVisual"        : true,
            "isModal"         : false,
            "isInsideMode"    : false,

            "initDataType"    : "html",
            "initData"        : "",

            "isUpdateOleOnResize" : false,

            "buttons"         : [ { "text": "Insert In Document", "primary": true},
                { "text": "Cancel", "primary": false } ]
        }
    ]
};
 