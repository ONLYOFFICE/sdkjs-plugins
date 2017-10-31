(function(window, undefined){
		
	if ("frameEditor" == window.name)
	{
		var _url = chrome.extension.getURL("main.js");
		_url = _url.substr(0, _url.lastIndexOf("main.js"));
		
		var _baseUrl = _url + "chess/";
		var _configUrl = _baseUrl + "config.json";
		
		function onLoadConfig(_json)
		{
			var _obj = _json;
			_obj.baseUrl = _baseUrl;
			
			var _obj_value = JSON.stringify(_obj);
			_obj_value = _obj_value.replace(/\"/g, '\\\"');
			
			var _script_content = "\
			(function(window, undefined) {\n\
				var _value = JSON.parse(\"" + _obj_value + "\");\
				window.Asc = window.Asc ? window.Asc : {};\n\
				window.Asc.extensionPlugins = window.Asc.extensionPlugins ? window.Asc.extensionPlugins : [];\n\
				window.Asc.extensionPlugins.push(_value);\n\
				\n\
				if (window.Asc.g_asc_plugins)\n\
				{\n\
					window.Asc.g_asc_plugins.loadExtensionPlugins(window.Asc.extensionPlugins);\n\
					window.Asc.extensionPlugins = [];\n\
				}\n\
			})(window, undefined);";
			
			var _script = document.createElement('script');
			_script.appendChild(document.createTextNode(_script_content));
			(document.body || document.head || document.documentElement).appendChild(_script);				
		}	
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', _configUrl, true);
		xhr.responseType = 'json';
		xhr.onload = function() 
		{
			if (this.status === 200) 
			{
				onLoadConfig(xhr.response);
			}
		};
		xhr.send();
	}
})(window, undefined);