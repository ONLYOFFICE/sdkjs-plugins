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

	document.getElementById("button1").onclick = function()
	{
		dataMessage.data.type = "insertText";
		dataMessage.data.text = "Text1";
		var _iframe = document.getElementById("frameEditor");
		if (_iframe)
			_iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
	};
	document.getElementById("button2").onclick = function()
	{
		dataMessage.data.type = "insertText";
		dataMessage.data.text = "Text2";
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
