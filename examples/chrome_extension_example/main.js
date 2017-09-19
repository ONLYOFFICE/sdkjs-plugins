(function(window, undefined){
	
	if ("frameEditor" == window.name)
	{
		var _url = chrome.extension.getURL("main.js");
		_url = _url.substr(0, _url.lastIndexOf("main.js"));
		var _text = "\n\
(function(window, undefined){\n\
\n\
	var _obj = {\n\
		\"name\" : \"chess(fen)\",\n\
		\"guid\" : \"asc.{FFE1F462-1EA2-4391-990D-4CC84940B754}\",\n\
		\"baseUrl\" : \"\",\n\
\n\
		\"variations\" : [\n\
			{\n\
				\"description\" : \"chess\",\n\
				\"url\"         : \"chess/index.html\",\n\
\n\
				\"icons\"           : [\"chess/icon.png\", \"chess/icon@2x.png\"],\n\
				\"isViewer\"        : true,\n\
				\"EditorsSupport\"  : [\"word\", \"cell\", \"slide\"],\n\
\n\
				\"isVisual\"        : true,\n\
				\"isModal\"         : true,\n\
				\"isInsideMode\"    : false,\n\
\n\
				\"initDataType\"    : \"ole\",\n\
				\"initData\"        : \"\",\n\
\n\
				\"isUpdateOleOnResize\" : true,\n\
\n\
				\"buttons\"         : [ { \"text\": \"Ok\", \"primary\": true },\n\
									{ \"text\": \"Cancel\", \"primary\": false } ]\n\
			}\n\
		]\n\
	};\n\
	\n\
	_obj.baseUrl = \"" + _url + "\"\n\
	\n\
	window.Asc = window.Asc ? window.Asc : {};\n\
	window.Asc.extensionPlugins = window.Asc.extensionPlugins ? window.Asc.extensionPlugins : [];\n\
	window.Asc.extensionPlugins.push(_obj);\n\
	\n\
	if (window.Asc.g_asc_plugins)\n\
	{\n\
		window.Asc.g_asc_plugins.loadExtensionPlugins(window.Asc.extensionPlugins);\n\
		window.Asc.extensionPlugins = [];\n\
	}\n\
	\n\
})(window, undefined);";

		var script = document.createElement('script');
		script.appendChild(document.createTextNode(_text));
		(document.body || document.head || document.documentElement).appendChild(script);

	}
})(window, undefined);