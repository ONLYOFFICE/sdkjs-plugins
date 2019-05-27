(function(window, undefined){

	window.isInit = false;

	window.Asc.plugin.init = function(text)
	{
		if (!window.isInit)
		{
			window.isInit = true;

			window.Asc.plugin.currentContentControl = null;
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

		if (window.Asc.plugin.currentContentControl != null)
		{
			window.Asc.plugin.executeMethod("SelectContentControl", [window.Asc.plugin.currentContentControl.InternalId], function() {
				window.Asc.plugin.executeMethod("InputText", [item.text]);
				window.Asc.plugin.getInputHelper().unShow();	
			});
		}
		else
		{
			window.Asc.plugin.getInputHelper().unShow();	
		}
	};	
	
	window.Asc.plugin.event_onClick = function(isSelectionUse)
	{
		window.Asc.plugin.executeMethod("GetCurrentContentControlPr", [], function(obj) {
			
			window.Asc.plugin.currentContentControl = obj;
			var controlTag = obj ? obj.Tag : "";
			if (isSelectionUse)
				controlTag = "";
			switch (controlTag)
			{
				case "{people}": // names
				{
					var items = [
						{ text: "Name1.Family1", id : "0" },
						{ text: "Name2.Family2", id : "1" },
						{ text: "Name3.Family3", id : "2" },
						{ text: "Name4.Family4", id : "3" },
						{ text: "Name5.Family5", id : "4" },
						{ text: "Name6.Family6", id : "5" },
						{ text: "Name7.Family7", id : "6" },
						{ text: "Name8.Family8", id : "7" },
						{ text: "Name9.Family9", id : "8" },
						{ text: "Name10.Family10", id : "9" },
						{ text: "Name11.Family11", id : "10" },
						{ text: "Name12.Family12", id : "11" },
						{ text: "Name13.Family13", id : "12" }
					];
			
					window.Asc.plugin.getInputHelper().setItems(items);
					var _sizes = getInputHelperSize();
					window.Asc.plugin.getInputHelper().show(_sizes.w, _sizes.h, true);
					break;
				}
				case "{position}": // position
				{
					var items = [
						{ text: "manager" }, 
						{ text: "marketing" }, 
						{ text: "programmer" }
					];
			
					window.Asc.plugin.getInputHelper().setItems(items);
					var _sizes = getInputHelperSize();
					window.Asc.plugin.getInputHelper().show(_sizes.w, _sizes.h, true);
					break;
				}
				default:
				{
					window.Asc.plugin.currentContentControl = null;
					window.Asc.plugin.getInputHelper().unShow();					
					break;	
				}
			}

		});	
	};

	function getInputHelperSize()
	{
		var _size = window.Asc.plugin.getInputHelper().getScrollSizes();
		var _width = 200;// _size.w
		var _height = _size.h;
		var _heightMin = window.Asc.plugin.getInputHelper().getItemsHeight(Math.min(5, window.Asc.plugin.getInputHelper().getItems().length));

		if (_width > 400)
			_width = 400;
		if (_height > _heightMin)
			_height = _heightMin;

		_width += 30;

		return { w: _width, h : _height };
	}

})(window, undefined);
