(function(window, undefined){

	var url = "";
	var player = null;
	var isWindowPlayer = false;
	
	function validateYoutubeUrl(url)
	{
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? true : false;
	}
	
	function getVideoId(url)
	{
		var _ids = url.split("/");
		var _id = _ids[_ids.length - 1];

		if (0 == _id.indexOf("watch?v="))
			_id = _id.substr(8);
		return _id;
	}

	window.Asc.plugin.init = function(text)
	{
	    var _textbox = document.getElementById("textbox_url");
	    _textbox.onkeyup = function(e)
	    {
	        if (e.keyCode == 13) // click on Enter
                document.getElementById("textbox_button").onclick();
	    };

		// clear validation on input/paste
        _textbox.oninput = _textbox.onpaste = function(e)
        {
            this.style.borderColor = "";
            document.getElementById("input_error_id").style.display = "none";
        };
        // ie
        _textbox.addEventListener("paste", function(e)
        {
            this.style.borderColor = "";
            document.getElementById("input_error_id").style.display = "none";
        });

		document.getElementById("textbox_button").onclick = function(e)
		{
		    var _url = document.getElementById("textbox_url").value;

		    if (!validateYoutubeUrl(_url))
            {
                document.getElementById("textbox_url").style.borderColor = "#d9534f";
                document.getElementById("input_error_id").style.display = "block";
                return;
            }

			if (!isWindowPlayer)
			{
				var _table     = document.getElementsByTagName("table")[0];
				var _row       = _table.insertRow(_table.rows.length);
				_row.innerHTML = "<td colspan=\"2\" style=\"background-color:transparent;height:100%;\"><div id=\"content\" style=\"width:100%;height:100%;\"></td>";
				isWindowPlayer = true;

				window.Asc.plugin.resizeWindow(620, 480, 390, 400, 0, 0);
			}

			if (true)
			{
				url = _url;

				if (!player)
				{
					player = new YT.Player('content', {
						height: '100%',
						width: '100%',
						videoId: getVideoId(url),
						playerVars: { 
							'fs' : 0
						}
					});
				}
				else
				{
					player.stopVideo();
					player.loadVideoById(getVideoId(url));
				}
			}
		};

		url = text;
		if (url == "")
		{
			this.resizeWindow(350, 90, 350, 90, 350, 90);
		}
		else
		{
			document.getElementById("textbox_url").value = url;
			document.getElementById("textbox_button").onclick();
		}
	};
	
	window.Asc.plugin.button = function(id)
	{
		if (player)
			player.stopVideo();
		if (id == 0)
		{
	        url = document.getElementById("textbox_url").value;

            if (!validateYoutubeUrl(url))
            {
                document.getElementById("textbox_url").style.borderColor = "#d9534f";
                document.getElementById("input_error_id").style.display = "block";
                return;
            }

			var _id = getVideoId(url);
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
                _info.data = url;

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

	window.onresize = function(e)
	{
		var _plugin = document.getElementById("me_youtube_0_container");
		if (_plugin)
		{
			var _pluginContainer = document.getElementById("mep_0");
			if (_pluginContainer)
			{
				_pluginContainer.style.width = "100%";
				_pluginContainer.style.height = "100%";
			}

			_plugin.style.width = "100%";
			_plugin.style.height = "100%";
		}
	};

})(window, undefined);
