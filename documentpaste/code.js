(function(window, undefined){

    window.Asc.plugin.init = function(text)
    {
    	document.getElementById("buttonID").onclick = function() {
			window.Asc.plugin.executeMethod("InsertDocuments", [[ { url: "url1", format : 0 }, { url: "url2", format : 1 }]]);
		};
    };

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
	};

})(window, undefined);
