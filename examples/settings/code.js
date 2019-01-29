// Example set settings to editors
(function(window, undefined){
    
    window.Asc.plugin.init = function()
    {
		var initSettings = {
			copyoutenabled : false
		};
		
        this.executeMethod("SetProperties", [initSettings], function() {
            window.Asc.plugin.executeCommand("close", "");
        });
    };

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

})(window, undefined);
