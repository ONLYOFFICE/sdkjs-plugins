(function(window, undefined){

	var url = "";
	var player = null;
	var isWindowPlayer = false;
	var isViewerMode = false;

	function getParam(url, param)
	{
		var _questPos = url.indexOf("?");
		if (_questPos < 0 && _questPos >= (url.length - 1))
			return undefined;

		var _url = url.substr(_questPos + 1);
		var _propPos = _url.indexOf(param + "=");
		if (_propPos < 0 && _propPos >= (url.length - 1))
			return undefined; 

		_propPos += param.length;
		_propPos += 1; // '='

		var _last = _url.indexOf("&", _propPos);
		if (_last < 0)
			_last = _url.length;

		return _url.substr(_propPos, _last - _propPos);
	}
	
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
		
		if (this.info.isViewMode != isViewerMode)
		{
			isViewMode = this.info.isViewMode;
			var _table     = document.getElementsByTagName("table")[0];
			
			if (_table)
			{
				if (_table.rows[0])
					_table.rows[0].style.display = isViewMode ? "none" : "";
				
				if (_table.rows[1])
					_table.rows[1].style.display = isViewMode ? "none" : "";
			}
		}

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
			
			var _searchDoubleStart = 10;
			var _findDoubleUrl = _url.indexOf("http://", _searchDoubleStart);
			if (_findDoubleUrl < 0)
				_findDoubleUrl = _url.indexOf("https://", _searchDoubleStart);
			if (_findDoubleUrl < 0)
				_findDoubleUrl = _url.indexOf("www.", _searchDoubleStart);

			if (_findDoubleUrl > 0)
			{
				_url = _url.substr(0, _findDoubleUrl);
				document.getElementById("textbox_url").value = _url;
			}

		    if (!validateYoutubeUrl(_url))
            {
                document.getElementById("textbox_url").style.borderColor = "#d9534f";
                document.getElementById("input_error_id").style.display = "block";
                return;
            }

			if (!isWindowPlayer)
			{
				var _table     = document.getElementById("id_player");
				_table.innerHTML = "<div id=\"content\" style=\"position:absolute;padding:0;margin:0;left:0;top:0;width:100%;height:100%;\"></div>";
				isWindowPlayer = true;

				window.Asc.plugin.resizeWindow(620, 480, 390, 400, 0, 0);
			}

			if (true)
			{
				url = _url;

				if (!player)
				{
					var opt = {
						height: '100%',
						width: '100%',
						videoId: getVideoId(url),
						playerVars: { 
							'fs' : 1
						}
					};

					var _time = getParam(url, "t");
					if (_time && _time.length > 0)
						opt.playerVars.start = parseInt(_time);

					player = new YT.Player('content', opt);
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
			var _questPos = _id.indexOf("?");
			if (_questPos > 0)
				_id = _id.substr(0, _questPos);

            var _url = "http://img.youtube.com/vi/" + _id + "/0.jpg";
			if (_id)
			{
			    var _info = window.Asc.plugin.info;

				var _method = (_info.objectId === undefined) ? "AddOleObject" : "EditOleObject";
				
				var _param = {
					guid : _info.guid,
					widthPix : (_info.mmToPx * _info.width) >> 0,
					heightPix : (_info.mmToPx * _info.height) >> 0,
					width : _info.width ? _info.width : 100,
					height : _info.height ? _info.height : 70,
					imgSrc : _url,
					data : url,
					objectId : _info.objectId,
					resize : _info.resize
				};

				window.Asc.plugin.executeMethod(_method, [_param], function() {
					window.Asc.plugin.executeCommand("close", "");
				});
			}
			else
			{
				this.executeCommand("close", "");
			}
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
	
	window.Asc.plugin.onTranslate = function()
	{
		var label = document.getElementById("td_labelUrl");
		if (label)
			label.innerHTML = window.Asc.plugin.tr("Paste youtube video URL");
	};
	
})(window, undefined);
