(function(window, undefined){

    window.Asc.plugin.init = function()
    {
		// none
    };

    window.Asc.plugin.button = function(id)
    {
    };

    window.Asc.plugin.onExternalPluginMessage = function(data)
	{
		switch (data.type)
		{
			case "close":
			{
				this.executeCommand("close", "");
				break;
			}
			case "insertText":
			{
				var sScript = "var oDocument = Api.GetDocument();";
				sScript += "var oParagraph = Api.CreateParagraph();";
				sScript += "oParagraph.AddText(\"";
				sScript += data.text;
				sScript += "\");";
				sScript += "oDocument.InsertContent([oParagraph]);";
				window.Asc.plugin.info.recalculate = true;
				this.executeCommand("command", sScript);
				break;
			}
		}
	};

})(window, undefined);
