window.onload = function() {

	var dataMessage = {
		frameEditorId : "iframeEditor",
		guid : "asc.{A8705DEE-7544-4C33-B3D5-168406D92F72}",
		type : "onExternalPluginMessage",
		data : {
			type: "close",
			text: "text"
		}
	};
	var script = "var oDocument = Api.GetDocument();\r\n"
	script += "var oParagraph = Api.CreateParagraph()\r\n;"
	script += "oParagraph.AddText('Hello, I am external listener');\r\n"
	script += "oDocument.InsertContent([oParagraph]);"

	document.getElementById("textarea").value = script;

	document.getElementById("button1").onclick = function()
	{
		dataMessage.data.type = "executeCommand";
		dataMessage.data.text = document.getElementById("textarea").value.trim().replace(/\r*\n/g,"");
		var _iframe = document.getElementById("frameEditor");
		if (_iframe)
			_iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
	};
	document.getElementById("buttonClose").onclick = function()
	{
		dataMessage.data.type = "close";
		dataMessage.data.text = "";
		var _iframe = document.getElementById("frameEditor");
		if (_iframe)
			_iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
	};

};
