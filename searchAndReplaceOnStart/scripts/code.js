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
		//event document is ready
		//all events are specified in the config file in the "events" field
		var oProperties = {
			"searchString"  : "ONLYOFFICE",
			"replaceString" : "ONLYOFFICE is cool",
			"matchCase"     : false
		};
		//method for search and replace in documents
		window.Asc.plugin.executeMethod("SearchAndReplace", [oProperties], function() {
            window.Asc.plugin.executeCommand("close", "");
        });
	};

})(window, undefined);
