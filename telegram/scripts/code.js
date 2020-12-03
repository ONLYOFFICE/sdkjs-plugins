(function(window, undefined){

    window.Asc.plugin.init = function()
    {
        //check incognito mode
        var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (fs) {
            fs(window.TEMPORARY, 100, function(fs) {
                document.getElementById("iframe").style.display = "block";
            }, function(err) {
                document.getElementById("result").style.display = "block";
                document.getElementById("iframe").style.display = "none";
            });
        } 
    };

    window.Asc.plugin.button = function(id)
    {
        this.executeCommand("close", "");
    };

    window.Asc.plugin.onExternalMouseUp = function()
    {        
    };

})(window, undefined);
