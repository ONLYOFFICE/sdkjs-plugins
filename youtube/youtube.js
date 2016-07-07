(function(window, undefined){

	window.Asc.plugin.url = "";
	window.Asc.plugin.player = null;
	
	function document_focus(e)
	{
		if (e.target.id == "focus_id")
			return;
		
		var _elem = document.getElementById("focus_id");
		if (_elem)
			_elem.focus();
		
	}
	
	var _userAgent = navigator.userAgent.toLowerCase();
	var isIE = (_userAgent.indexOf("msie") > -1 || _userAgent.indexOf("trident") > -1 || _userAgent.indexOf("edge") > -1);

	window.Asc.plugin.init = function(text)
	{
		this.url = text;
		if (this.url == "")
		{
			document.body.innerHTML = ("<div style=\"font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#848484;font-size:20px;" +
				"background:#F4F4F4;display:table;width:100%;height:100%;text-align:center;z-index:10;\">" +
				"<span style=\"display:table-cell;vertical-align: middle;\"> PASTE URL FROM CLIBOARD (Ctrl + V) </span></div>");
				
			if (isIE)
			{
				document.body.innerHTML = "<textarea id=\"focus_id\" style=\"position:absolute;left:0px;top:0px;z-index:-1;\"></textarea>" + document.body.innerHTML;
				document.addEventListener("focus", document_focus, true);
			}				
		}
		else
		{
			var _data = "<video style=\"width:100%; height:100%;\">";
			_data += "<source type=\"video/youtube\" src=\"" + window.Asc.plugin.url + "\" type=\"video/mp4\"  id=\"player1\"" +
				" poster=\"\" controls=\"controls\" preload=\"none\" /></video>";

			document.body.innerHTML = _data;

			play();

			document.onpaste = function(e){};
		}
	};
	
	function _onPaste(e)
	{
		if (isIE)
			document.removeEventListener("focus", document_focus, true);
		
		var _clipboard = (e && e.clipboardData) ? e.clipboardData : window.clipboardData;
		if (_clipboard && _clipboard.getData)
		{
			var _dataType = isIE ? "Text" : "text/plain";
			window.Asc.plugin.url   = _clipboard.getData(_dataType);
			var _paramsIndex = window.Asc.plugin.url.indexOf("&");
			if (_paramsIndex > 0 && _paramsIndex < window.Asc.plugin.url.length)
				window.Asc.plugin.url = window.Asc.plugin.url.substr(0, _paramsIndex);

			var _data = "<video style=\"width:100%; height:100%;\">";
			_data += "<source type=\"video/youtube\" src=\"" + window.Asc.plugin.url + "\" type=\"video/mp4\"  id=\"player1\"" +
				" poster=\"\" controls=\"controls\" preload=\"none\" /></video>";

			document.body.innerHTML = _data;

			play();
		}
		if (e.preventDefault)
			e.preventDefault();

		document.onpaste = function(e){};
		return false;
	};
	
	if (!isIE)
		document.onpaste = _onPaste;
	else
		document.addEventListener("paste", _onPaste);

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

			if (0 == _id.indexOf("watch?v="))
			    _id = _id.substr(8);

            var _url = "http://img.youtube.com/vi/" + _id + "/0.jpg";
			if (_id)
			{
			    var _info = window.Asc.plugin.info;

                var _method = (_info.objectId === undefined) ? "asc_addOleObject" : "asc_editOleObject";

                _info.width = _info.width ? _info.width : 100;
                _info.height = _info.height ? _info.height : 70;

                // TODO: load image & get size
                _info.widthPix = (_info.mmToPx * _info.width) >> 0;
                _info.heightPix = (_info.mmToPx * _info.height) >> 0;

                _info.imgSrc = _url;
                _info.data = this.url;

                var _code = "Api." + _method + "(" + JSON.stringify(_info) + ");";
                this.executeCommand("close", _code);
			}
			this.executeCommand("close", _code);
		}
		else
		{
			this.executeCommand("close", "");
		}
	};

})(window, undefined);
