(function(window, undefined){

	function privateCreateInlineControl()
	{
		window.Asc.plugin.executeMethod("AddContentControl", [2, {"Lock" : 3}]);
	}

	function privateCreateScript(Tag, Label, isTextField, InternalId)
	{		
		var _script = "\r\n\
			var oDocument = Api.GetDocument();\r\n\
			var oParagraph = Api.CreateParagraph();\r\n\
			var oRun = oParagraph.AddText(\'" + Label + "\');\r\n\
			oRun.SetColor(255,255,255);\r\n\
			oRun.SetShd(\"clear\"," + (isTextField ? "0, 0, 255" : "255, 0, 0" ) + ");\r\n\
			oDocument.InsertContent([oParagraph], true);\r\n\
			";

		_script = _script.replaceAll("\r\n", "");
		_script = _script.replaceAll("\n", "");
		
		var _scriptObject = {
			"Props" : {
				"Tag"        : Tag,
				"Lock"       : 0,
				"InternalId" : InternalId
			},
			"Script" : _script
		};
		
		return _scriptObject;
	}
	
	function privateEncodeTextField(question)
	{
		return "q;" + question;
	}
	
	function privateEncodeDropDownField(question, items)
	{
		var _result = "d;" + question;
		
		for (var index = 0, count = items.length; index < count; ++index)
		{
			_result += ";" + items[index];
		}
		
		return _result;
	}

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};

	var _Control = null;

    window.Asc.plugin.init = function()
    {	
		document.getElementById("buttonAddTextField").onclick = function()
		{
			if (_Control)
				return;

			var _question = document.getElementById("inputTextFieldQ").value;
			var _label    = document.getElementById("inputTextFieldL").value;
			
			if (!_question || !_label)
				return;

			_Control = {
				Type     : 1,
				Question : _question,
				Label    : _label
			};

			privateCreateInlineControl();
			
			document.getElementById("inputTextFieldL").value = "";
			document.getElementById("inputTextFieldQ").value = "";
		};
		
		document.getElementById("buttonAddDropDownField").onclick = function()
		{
			if (_Control)
				return;

			var _question = document.getElementById("inputDropDownQ").value;
			var _label    = document.getElementById("inputDropDownL").value;
			
			if (!_question || !_label)
				return;
			
			var _items = [];
			var _select = document.getElementById("selectDropDown");
			for (var index = 0, count = _select.childNodes.length; index < count; ++index)
			{
				if (_select.childNodes[index] && _select.childNodes[index].nodeName.toLowerCase() === "option")
					_items.push(_select.childNodes[index].innerHTML);
			}

			_Control = {
				Type     : 2,
				Question : _question,
				Label    : _label,
				Items    : _items
			};

			privateCreateInlineControl();

			document.getElementById("inputDropDownL").value = "";
			document.getElementById("inputDropDownQ").value = "";
			
			while (_select.firstChild)
			{
				_select.removeChild(_select.firstChild);
			}
		};
		
		document.getElementById("buttonDropDownAddItem").onclick = function()
		{
			var _item = document.getElementById("inputDropDownItem").value;
			if (!_item)
				return;
			
			var _select = document.getElementById("selectDropDown");
			var _option = document.createElement("option");
			_option.innerHTML = _item;
			_select.appendChild(_option);
			
			document.getElementById("inputDropDownItem").value = "";
		};
		
		document.getElementById("buttonDropDownRemoveItem").onclick = function()
		{
			var _select = document.getElementById("selectDropDown");
			var _selectedIndex = _select.selectedIndex;
			
			if (_select.childNodes[_selectedIndex])
				_select.removeChild(_select.childNodes[_selectedIndex]);
		};
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "AddContentControl")
		{
			if (_Control)
			{
				if (1 === _Control.Type)
				{
					var _obj = privateCreateScript(privateEncodeTextField(_Control.Question), _Control.Label, true, returnValue.InternalId);
					window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
				}
				else if (2 === _Control.Type)
				{
					var _obj = privateCreateScript(privateEncodeDropDownField(_Control.Question, _Control.Items), _Control.Label, false, returnValue.InternalId);
					window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
				}

				_Control = null;
			}
		}
	};

	window.Asc.plugin.button = function(id)
	{
		if (-1 === id)
		{
			this.executeCommand("close", "");
		}
	};

})(window, undefined);
