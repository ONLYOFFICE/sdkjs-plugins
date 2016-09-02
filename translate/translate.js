(function(window, undefined){

	window.Asc.plugin.translate_data = "";
	var languages = [];

	var isInit = false;

	function updateScroll()
	{
		var container = document.getElementById('scrollable-container-id');
		Ps.update(container);
		if($('.ps-scrollbar-y').height() === 0){
			$('.ps-scrollbar-y').css('border-width', '0px');
		}
		else{
			$('.ps-scrollbar-y').css('border-width', '1px');
		}
	}

	function getLanguagesSupport()
	{
		var xhr = new XMLHttpRequest();
		var _url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?";
		_url += "key=trnsl.1.1.20160604T115612Z.107ebb05a7757bcc.804e900f347ddfbeadd7ca5999bd5cb6ca32805b";
		_url += "&ui=en";
		xhr.open('POST', _url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				try
				{
					var _obj = JSON.parse(this.responseText);
					var _langs = _obj.langs;

					languages = [];

					for (var i in _langs)
					{
						languages.push( { id : i, lang : _langs[i] } );
					}

					languages.sort(function(a, b)
					{
						if (a.lang > b.lang)
						{
							return 1;
						}
						if (a.lang < b.lang)
						{
							return -1;
						}
						return 0;
					});

					languages.unshift( { id : "auto", lang : "Auto" } );

					var _len = languages.length;

					var _defaultDest = 0;

					var _langs = "";
					for (var i = 1; i < _len; i++)
					{
						_langs += ("<option value=\"" + languages[i].id + "\">" + languages[i].lang + "</option>");

						if (languages[i].id == "ru")
							_defaultDest = i - 1;
					}
					
					document.getElementById("lang1_id").innerHTML = "<option value='auto'>Auto</option>" + _langs;
					document.getElementById("lang2_id").innerHTML = _langs;

					document.getElementById("lang2_id").selectedIndex = _defaultDest;

					document.getElementById("lang1_id").onchange = function(e) { translate(); };
					document.getElementById("lang2_id").onchange = function(e) { translate(); };

					translate();
				}
				catch (err)
				{
					window.Asc.plugin.executeCommand("close", "");
				}
			}
		};
		xhr.send(null);
	}

	function translate()
	{
		document.getElementById("translateresult_id").innerHTML = "";
		updateScroll();

		if (window.Asc.plugin.translate_data == "")
			return;

		var _lang = "";

		var _select1 = document.getElementById("lang1_id");
		var _select2 = document.getElementById("lang2_id");

		_select1.setAttribute("disabled", "disabled");
		_select2.setAttribute("disabled", "disabled");

		if (_select1.selectedIndex != 0)
			_lang += (_select1.options[_select1.selectedIndex].value + "-");
		_lang += _select2.options[_select2.selectedIndex].value;

		var xhr = new XMLHttpRequest();
		var _url = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
		_url += "key=trnsl.1.1.20160604T115612Z.107ebb05a7757bcc.804e900f347ddfbeadd7ca5999bd5cb6ca32805b";
		_url += "&text=";
		_url += window.Asc.plugin.translate_data;
		_url += ("&lang=" + _lang);
		_url += "&format=plain";
		xhr.open('POST', _url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200 && !closed)
			{
				try
				{
					var _obj  = JSON.parse(this.responseText);
					var _text = _obj.text[0];

					document.getElementById("translateresult_id").innerHTML = _text;
					updateScroll();

					_select1.removeAttribute("disabled");
					_select2.removeAttribute("disabled");
				}
				catch (err)
				{
				}
			}
			else if (401 == this.readyState || 404 == this.readyState || 413 == this.readyState || 422 == this.readyState || 501 == this.readyState)
			{
			}
		};
		xhr.send(null);
	}

	window.Asc.plugin.init = function(text)
	{
		document.getElementById("translateresult_id").innerHTML = "";
		updateScroll();

		text = text.replace(/;/g, "%3B");

		window.Asc.plugin.translate_data = text;

		if (!isInit)
		{
			var container = document.getElementById('scrollable-container-id');
			Ps.initialize(container, {
				theme : 'custom-theme'
			});

			getLanguagesSupport();
		}
		else
		{
			translate();
		}
		isInit = true;
	};
	
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

})(window, undefined);
