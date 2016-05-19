(function(window, undefined){

	window.Asc.plugin.url = "";
	window.Asc.plugin.player = null;

	window.Asc.plugin.init = function(text)
	{
		this.url = text;
		if (this.url == "")
		{
			document.body.innerHTML = "<div> PASTE URL FROM CLIPBOARD (Ctrl + V) <div>";
		}
		else
		{
			var _data = "<video style=\"width:100%; height:100%;\">";
			_data += "<source type=\"video/youtube\" src=\"" + window.Asc.plugin.url + "\" type=\"video/mp4\"  id=\"player1\"" +
				" poster=\"\" controls=\"controls\" preload=\"none\" /></video>";

			document.body.innerHTML = _data;

			play();
		}
	};
	
	document.onpaste = function(e)
	{
		var _clipboard = (e && e.clipboardData) ? e.clipboardData : window.clipboardData;
		if (_clipboard && _clipboard.getData)
		{
			window.Asc.plugin.url   = _clipboard.getData("text/plain");

			var _data = "<video style=\"width:100%; height:100%;\">";
			_data += "<source type=\"video/youtube\" src=\"" + window.Asc.plugin.url + "\" type=\"video/mp4\"  id=\"player1\"" +
				" poster=\"\" controls=\"controls\" preload=\"none\" /></video>";

			document.body.innerHTML = _data;

			play();
		}
		if (e.preventDefault)
			e.preventDefault();
		return false;
	};

	function play()
	{
		if (window.Asc.plugin.player)
			window.Asc.plugin.player.pluginApi.stopVideo();

		$('audio,video').mediaelementplayer({
			//mode: 'shim',
			success: function(player, node) {
				window.Asc.plugin.player = player;
				$('#' + node.id + '-mode').html('mode: ' + player.pluginType);
			}
		});
	}

	window.Asc.plugin.button = function(id)
	{
		if (window.Asc.plugin.player)
			window.Asc.plugin.player.pluginApi.stopVideo();

		if (id == 0)
		{
			var _ids = this.url.split("/");
			var _id = _ids[_ids.length - 1];

			if (_id)
			{
				var _url = "http://img.youtube.com/vi/" + _id + "/0.jpg";
				_code = "window.g_asc_plugins.api.asc_addOleObject(\"" + _url + "\", \"" + this.url + "\",  \"" + window.Asc.plugin.guid + "\");";
			}
			window.Asc.plugin_sendMessage("close", _code);
		}
		else
		{
			window.Asc.plugin_sendMessage("close", "");
		}
	};

})(window, undefined);
