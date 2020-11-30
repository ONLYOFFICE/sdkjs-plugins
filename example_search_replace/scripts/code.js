(function(window, undefined)
{
	var nStage   = 0;
	//the text that will be searched in the document. 
	var arrCodes = ["%FIRST_NAME%", "%LAST_NAME%", "%ADDRESS%"];
	var arrIds   = ["inputFirstName", "inputLastName", "inputAddress"];

	function privateReplaceNext()
	{
		//properties structure for search and replace
		var oProperties = {
			"searchString"  : arrCodes[nStage],
			"replaceString" : document.getElementById(arrIds[nStage]).value,
			"matchCase"     : true
		};
		//execute method for search and replace
		window.Asc.plugin.executeMethod("SearchAndReplace", [oProperties]);

		nStage++;
		if (nStage >= arrCodes.length)
			window.Asc.plugin.executeCommand("close", "");
	}

	window.Asc.plugin.init = function()
	{
		var oThis = this;
		document.getElementById("buttonCancel").onclick = function()
		{
			this.executeCommand("close", "");
		};

		document.getElementById("buttonOK").onclick = function()
		{
			privateReplaceNext();
		};
	};

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		//event return for completed method
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "SearchAndReplace")
		{
			privateReplaceNext();
		}
	};

	window.Asc.plugin.button = function(id)
	{
		if (-1 === id)
		{
			this.executeCommand("close", "");
		}
	};

})(window, undefined);
