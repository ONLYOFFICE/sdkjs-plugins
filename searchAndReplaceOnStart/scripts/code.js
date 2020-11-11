// Example set settings to editors
(function(window, undefined){
    
    window.Asc.plugin.init = function()
    {
    };

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };
	
	window.Asc.plugin.event_onDocumentContentReady = function()
	{
		var oProperties = {
			"searchString"  : "ONLYOFFICE",
			"replaceString" : "ONLYOFFICE is cool",
			"matchCase"     : false
		};

		window.Asc.plugin.executeMethod("SearchAndReplace", [oProperties], function() {
            window.Asc.plugin.executeCommand("close", "");
        });
	};

})(window, undefined);
