(function(window, undefined){

	window.Asc.plugin.init = function(text)
	{
		var client = new XMLHttpRequest();
		var _url = "./code.js";
		client.open("GET", _url);

		client.onreadystatechange = function() {
			if (client.readyState == 4 && (client.status == 200 || location.href.indexOf("file:") == 0))
			{
				window.Asc.plugin.info.interface = true;
				window.Asc.plugin.executeCommand("close", client.responseText);
			}
		};
		client.send();
	};
	
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

})(window, undefined);
