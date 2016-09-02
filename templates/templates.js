(function(window, undefined){

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

	var _templates = [
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ],
		[ "demohyden", 121, 159 ]
	];

	var _templates_code = [];

	function fill_templates()
	{
		var _width = 0;
		for (var i = 0; i < _templates.length; i++)
		{
			if (_templates[i][1] > _width)
				_width = _templates[i][1];
		}

		_width += 20;

		var _space = 20;
		var _naturalWidth = window.innerWidth;

		var _count = ((_naturalWidth - _space) / (_width + _space)) >> 0;
		if (_count < 1)
			_count = 1;

		var _countRows = ((_templates.length + (_count - 1)) / _count) >> 0;

		var _html = "";
		var _index = 0;

		var _margin = (_naturalWidth - _count * (_width + _space)) >> 1;
		document.getElementById("main").style.marginLeft = _margin + "px";

		for (var _row = 0; _row < _countRows && _index < _templates.length; _row++)
		{
			_html += "<tr style='margin-left: " + _margin + "'>";

			for (var j = 0; j < _count; j++)
			{
				var _cur = _templates[_index];

				_html += "<td width='" + _width + "' height='" +_width + "' style='margin:" + (_space >> 1) + "'>";

				var _w = _cur[1];
				var _h = _cur[2];

				_html += ("<img id='template" + _index + "' src=\"./templates/" + _cur[0] + "/icon.png\" />");
				_html += ("<div class=\"noselect celllabel\">" + _cur[0] + "</div>");

				_html += "</td>";

				_index++;

				if (_index >= _templates.length)
					break;
			}

			_html += "</tr>";
		}

		document.getElementById("main").innerHTML = _html;

		for (_index = 0; _index < _templates.length; _index++)
		{
			document.getElementById("template" + _index).onclick = new Function("return window.template_run(" + _index + ");");
		}

		updateScroll();
	}

	window.onresize = function()
	{
		fill_templates();
	};

	window.Asc.plugin.init = function(text)
	{
		var container = document.getElementById('scrollable-container-id');
		Ps.initialize(container, {
			theme : 'custom-theme'
		});

		fill_templates();
	};
	
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.template_run = function(_index)
	{
		if (_templates_code[_index])
		{
			window.Asc.plugin.info.recalculate = true;
			window.Asc.plugin.executeCommand("command", _templates_code[_index]);
			return;
		}

		var client = new XMLHttpRequest();
		var _url = "./templates/" + _templates[_index][0] + "/script.txt";
		client.open("GET", _url);

		var _indexTmp = _index;
		client.onreadystatechange = function() {
			if (client.readyState == 4 && client.status == 200)
			{
				_templates_code[_indexTmp] = client.responseText;
				template_run(_indexTmp);
			}
		};
		client.send();
	}

})(window, undefined);
