(function(window, undefined){

	window.isInit = false;

	window.Asc.plugin.init = function(text)
	{
		if (!window.isInit)
		{
			window.isInit = true;

			window.Asc.plugin.currentText = "";
			window.Asc.plugin.createInputHelper();
			window.Asc.plugin.getInputHelper().createWindow();
		}
	};

	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};
	
	window.Asc.plugin.inputHelper_onSelectItem = function(item)
	{
		if (!item)
			return;

		window.Asc.plugin.executeMethod("InputText", [item.text, window.Asc.plugin.currentText]);
		window.Asc.plugin.getInputHelper().unShow();
	};

	window.Asc.plugin.event_onInputHelperClear = function()
	{
		window.Asc.plugin.currentText = "";
		window.Asc.plugin.getInputHelper().unShow();
	};

	window.Asc.plugin.event_onInputHelperInput = function(data)
	{
		if (data.add)
			window.Asc.plugin.currentText += data.text;
		else
			window.Asc.plugin.currentText = data.text;

		// correct by space
		var lastIndexSpace = window.Asc.plugin.currentText.lastIndexOf(" ");
		if (lastIndexSpace >= 0)
		{
			if (lastIndexSpace == (window.Asc.plugin.currentText.length - 1))
				window.Asc.plugin.currentText = "";
			else
				window.Asc.plugin.currentText = window.Asc.plugin.currentText.substr(lastIndexSpace + 1);
		}

		if (window.Asc.plugin.currentText.length < 3)
		{
			window.Asc.plugin.getInputHelper().unShow();
			return;
		}
		
		var variants = window.getAutoComplete(window.Asc.plugin.currentText);
		if (variants.length == 0)
		{
			window.Asc.plugin.getInputHelper().unShow();
		}
		else
		{
			var items = [];
			for (var i = 0; i < variants.length; i++)
			{
				items.push({ text : variants[i] });
			}

			window.Asc.plugin.getInputHelper().setItems(items);
			var _sizes = getInputHelperSize();
			window.Asc.plugin.getInputHelper().show(_sizes.w, _sizes.h, false);
		}
	};

	function getInputHelperSize()
	{
		var _size = window.Asc.plugin.getInputHelper().getScrollSizes();
		var _width = 150;// _size.w
		var _height = _size.h;
		var _heightMin = window.Asc.plugin.getInputHelper().getItemsHeight(Math.min(5, window.Asc.plugin.getInputHelper().getItems().length));

		if (_width > 400)
			_width = 400;
		if (_height > _heightMin)
			_height = _heightMin;

		_width += 30;

		return { w: _width, h : _height };
	}

	window.isAutoCompleteReady = false;
	window.getAutoComplete = function(text)
	{
		if (!g_dictionary)
			return;

		window.isAutoCompleteReady = true;
		g_dictionary.sort();

		var textFound = text.toLowerCase();

		var start = 0;
		var end = g_dictionary.length - 1;
		var index = 0;

		while (true)
		{
			var middle = (end + start) >> 1;

			if (middle == start || middle == end)
			{
				index = start;

				while (index != end)
				{
					if (g_dictionary[index] >= textFound)
						break;
					index++;
				}

				break;
			}

			var test = g_dictionary[middle];

			if (test == textFound)
			{
				index = middle;
				break;
			}

			if (test < textFound)
			{
				start = middle;				
			}
			else
			{
				end = middle;
			}
		}

		var ret = [];
		end = g_dictionary.length;
		while (index < end)
		{
			var testRec = g_dictionary[index++];
			if (testRec.indexOf(textFound) != 0)
				break;

			ret.push(text + testRec.substr(textFound.length));
			index++;
		}

		return ret;
	};

})(window, undefined);
