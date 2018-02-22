(function(window, undefined){

	var url = "";
	var player = null;
	var isWindowPlayer = false;
	
	function validateYoutubeUrl1(url)
	{
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? true : false;
	}
	function validateYoutubeUrl2(url)
	{
        var p = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(p);
		return (match && match[2] && match[2].length == 11) ? true : false;
	}
	
	var validateYoutubeUrl = validateYoutubeUrl2;
	
	function getVideoId(url)
	{
		var _ids = url.split("/");
		var _id = _ids[_ids.length - 1];

		if (0 == _id.indexOf("watch?v="))
			_id = _id.substr(8);

		var _amp = _id.indexOf("&");
		if (-1 != _amp)
			_id = _id.substr(0, _amp);

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
							'fs' : 1
						}
					});
				}
				else
				{
					if (player.stopVideo && player.loadVideoById)
					{
						player.stopVideo();
						player.loadVideoById(getVideoId(url));
					}
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
		
		_textbox.focus();
	};
	
	window.Asc.plugin.button = function(id)
	{
		try
		{
			if (player && player.stopVideo)
				player.stopVideo();
		}
		catch (err)
		{
		}

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

	window.Asc.plugin.onEnableMouseEvent = function(isEnabled)
	{
		var _frames = document.getElementsByTagName("iframe");
		if (_frames && _frames[0])
		{
			_frames[0].style.pointerEvents = isEnabled ? "none" : "";
		}
	};
	
})(window, undefined);
