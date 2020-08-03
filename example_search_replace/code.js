(function(window, undefined)
{
	var nStage   = 0;
	var arrCodes = ["%FIRST_NAME%", "%LAST_NAME%", "%ADDRESS%"];
	var arrIds   = ["inputFirstName", "inputLastName", "inputAddress"];

	function privateReplaceNext()
	{
		var oProperties = {
			"searchString"  : arrCodes[nStage],
			"replaceString" : document.getElementById(arrIds[nStage]).value,
			"matchCase"     : true
		};

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
