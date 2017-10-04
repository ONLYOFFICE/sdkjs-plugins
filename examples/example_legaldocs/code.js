(function(window, undefined){

	var nIdCounter = 0;

	function GetNewId()
	{
		return "LegalDocs_" + (++nIdCounter);
	}

	function CField(oPaneElement, oProps)
	{
		this.m_oPaneElement = oPaneElement;
		this.m_oRawProps    = oProps;
	}
	CField.prototype.CheckByPaneElement = function(oElement)
	{
		return this.m_oPaneElement === oElement;
	};
	CField.prototype.GenerateFieldDivsForInsert = function()
	{
		var arrDivs = [];
		if ("text" === this.m_oRawProps["type"])
		{
			var oDiv = this.private_CreateCombobox(this.m_oRawProps["label"], this, -1);
			oDiv.className = "copyFieldElement";
			arrDivs.push(oDiv);
			for (var nIndex = 0, nCount = this.m_oRawProps["subFields"].length; nIndex < nCount; ++nIndex)
			{
				oDiv = this.private_CreateCombobox(this.m_oRawProps["subFields"][nIndex], this, nIndex);
				oDiv.className = "copyFieldSubElement";
				arrDivs.push(oDiv);
			}
		}

		return arrDivs;
	};
	CField.prototype.private_CreateCombobox = function(sLabel, oField, nSubFieldIndex)
	{
		var oDiv = document.createElement("div");

		var oLabel = document.createElement("label");
		oDiv.appendChild(oLabel);

		var oInput = document.createElement("input");
		oInput.type = "radio";
		oInput.name = "radioCopyField";
		oLabel.appendChild(oInput);

		oInput["internalInfo"] = {
			Field    : oField,
			SubIndex : nSubFieldIndex
		};

		var oSpan = document.createElement("span");
		oSpan.innerHTML = sLabel;
		oLabel.appendChild(oSpan);

		return oDiv;
	};
	CField.prototype.IsTextField = function()
	{
		return (this.m_oRawProps["type"] === "text");
	};
	CField.prototype.GetId = function()
	{
		return this.m_oRawProps["id"];
	};
	CField.prototype.GetLabel = function(nSubIndex)
	{
		var sResult = "";
		if (this.IsTextField())
		{
			sResult = "TEXT - " + this.m_oRawProps["label"];
			if (nSubIndex >= 0 && undefined !== this.m_oRawProps["subFields"][nSubIndex])
				sResult += " | " + this.m_oRawProps["subFields"][nSubIndex];
		}

		return sResult;
	};


	var arrFields = [];


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
			oRun.SetColor(0,0,0);\r\n\
			oRun.SetShd(\"clear\"," + (isTextField ? "71, 222, 186" : "255, 0, 0" ) + ");\r\n\
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
		document.getElementById("buttonAddTextQ").onclick = function()
		{
			if ("none" === document.getElementById("divAddTextQ").style.display)
				document.getElementById("divAddTextQ").style.display = "block";
			else
				document.getElementById("divAddTextQ").style.display = "none";
		};

		document.getElementById("buttonAddTextQSave").onclick = function()
		{
			var sHeader = document.getElementById("inputAddTextQHeader").value;
			var sText   = document.getElementById("textareaAddTextQText").value;

			var oProps = {
				"isVisible"    : true,
				"useLogic"     : document.getElementById("checkboxAddTextQLogic").checked,
				"nonEditable"  : document.getElementById("checkboxAddTextQNotEditable").checked,
				"question"     : sText,
				"hint"         : "",
				"label"        : sHeader,
				"type"         : "text",
				"id"           : GetNewId(),
				"subFields"    : [],
				"addAnother"   : document.getElementById("checkboxAddTextQAnother").checked,
				"anotherTitle" : "",
				"anotherMax"   : -1
			};

			var nSubfieldsCount = document.getElementById("divAddTextQContainerSub").children.length;
			if (1 < nSubfieldsCount || (1 === nSubfieldsCount && "" !== document.getElementById("divAddTextQContainerSub").children[0].children[0].value))
			{
				for (var nIndex = 0; nIndex < nSubfieldsCount; ++nIndex)
				{
					var sSub = document.getElementById("divAddTextQContainerSub").children[nIndex].children[0].value;
					oProps["subFields"].push(sSub);
				}
			}

			if (true === document.getElementById("checkboxAddTextQAnother").checked)
			{
				oProps["anotherTitle"] = document.getElementById("checkboxAddTextQAnotherDescription").value;
				oProps["anotherMax"]   = document.getElementById("inputAddTextQAnotherMaximum").value;
			}


			document.getElementById("divAddTextQ").style.display = "none";

			var oPaneDiv = document.getElementById("divQuestionPane");

			var oDiv = document.createElement("div");
			oPaneDiv.appendChild(oDiv);
			oDiv.className = "paneElement";


			var oButton            = document.createElement("button");
			oButton.className      = "roundButton";
			oButton.style["float"] = "left";
			oDiv.appendChild(oButton);

			var oSpan       = document.createElement("span");
			oSpan.innerHTML = "-";
			oButton.appendChild(oSpan);

			var oInfo       = document.createElement("div");
			oInfo.className = "paneElementInfo";
			oDiv.appendChild(oInfo);

			var oInfoTitle       = document.createElement("div");
			oInfoTitle.className = "paneElementInfoTitle";
			oInfo.appendChild(oInfoTitle);
			oInfoTitle.innerHTML = "TEXT | " + sHeader;

			var oInfoText       = document.createElement("div");
			oInfoText.className = "paneElementInfoText";
			oInfo.appendChild(oInfoText);

			oInfoText.innerHTML = sText;

			oButton.onclick = function()
			{
				// var sText = this.children[0].innerHTML;
				// if ("-" === sText)
				// {
				// 	this.children[0].innerHTML = "+";
				// 	oInfoText.style.display = "none";
				// }
				// else
				// {
				// 	this.children[0].innerHTML = "-";
				// 	oInfoText.style.display = "block";
				// }

				oPaneDiv.removeChild(oDiv);

				for (var nIndex = 0, nCount = arrFields.length; nIndex < nCount; ++nIndex)
				{
					if (arrFields[nIndex].CheckByPaneElement(oDiv))
					{
						arrFields.splice(nIndex, 1);
						break;
					}
				}

				var oCopyFieldContainer = document.getElementById("divCopyField");
				if ("none" !== oCopyFieldContainer.style.display)
				{
					oCopyFieldContainer.style.display = "none";
					while (oCopyFieldContainer.children.length > 1)
						oCopyFieldContainer.removeChild(oCopyFieldContainer.children[0]);
				}
			};

			var oField = new CField(oDiv, oProps);
			arrFields.push(oField);

			console.log(oProps);
		};

		function OnRemoveTextQSub()
		{
			var oParentDiv = this.parentNode;
			if (!oParentDiv)
				return;

			var oContainerDiv = oParentDiv.parentNode;
			if (!oContainerDiv)
				return;

			if (1 === oContainerDiv.children.length)
			{
				oParentDiv.children[0].value = "";
			}
			else
			{
				if (oParentDiv == oContainerDiv.children[oContainerDiv.children.length - 1])
				{
					var oAddButton = document.getElementById("buttonAddTextQAddSub");
					oAddButton.parentNode.removeChild(oAddButton);
					oContainerDiv.removeChild(oParentDiv);
					oContainerDiv.children[oContainerDiv.children.length - 1].appendChild(oAddButton);
				}
				else
				{
					oContainerDiv.removeChild(oParentDiv);
				}
			}
		};

		document.getElementById("buttonAddTextQRemoveSub").onclick = OnRemoveTextQSub;

		document.getElementById("buttonAddTextQAddSub").onclick = function()
		{
			this.parentNode.removeChild(this);

			var oContainer = document.getElementById("divAddTextQContainerSub");

			var oDiv       = document.createElement("div");
			oDiv.className = "divAddTextQContainerSubElement";
			oContainer.appendChild(oDiv);


			var oInput            = document.createElement("input");
			oInput.className      = "inputDefault inputTextQSubfields";
			oInput.style["float"] = "left";
			oDiv.appendChild(oInput);

			var oButton            = document.createElement("button");
			oButton.className      = "roundButton";
			oButton.style["float"] = "left";
			oDiv.appendChild(oButton);

			var oSpan       = document.createElement("span");
			oSpan.innerHTML = "-";
			oButton.appendChild(oSpan);

			oButton.onclick = OnRemoveTextQSub;

			oDiv.appendChild(this);
		};

		document.getElementById("buttonCopyField").onclick = function()
		{
			var oContainer = document.getElementById("divCopyField");
			if ("none" === oContainer.style.display)
			{
				oContainer.style.display = "block";

				var oButton = oContainer.children[0];
				for (var nIndex = 0, nCount = arrFields.length; nIndex < nCount; ++nIndex)
				{
					var arrDivs = arrFields[nIndex].GenerateFieldDivsForInsert();
					for (var nDivId = 0, nDivsCount = arrDivs.length; nDivId < nDivsCount; ++nDivId)
					{
						oContainer.insertBefore(arrDivs[nDivId], oButton);
					}
				}
			}
			else
			{
				oContainer.style.display = "none";
				while (oContainer.children.length > 1)
					oContainer.removeChild(oContainer.children[0]);
			}
		};

		document.getElementById("buttonCopyFieldInsert").onclick = function()
		{
			if (_Control)
				return;

			var oInput = document.querySelector('input[name="radioCopyField"]:checked');
			_Control = oInput["internalInfo"];

			privateCreateInlineControl();
		};
	
	

	/*
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
		*/
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "AddContentControl")
		{
			if (_Control)
			{
				var oField = _Control.Field;
				if (oField.IsTextField())
				{
					var _obj = privateCreateScript(oField.GetId(), oField.GetLabel(_Control.SubIndex), true, returnValue.InternalId);
					window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
				}

				// if (1 === _Control.Type)
				// {
				// 	var _obj = privateCreateScript(privateEncodeTextField(_Control.Question), _Control.Label, true, returnValue.InternalId);
				// 	window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
				// }
				// else if (2 === _Control.Type)
				// {
				// 	var _obj = privateCreateScript(privateEncodeDropDownField(_Control.Question, _Control.Items), _Control.Label, false, returnValue.InternalId);
				// 	window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
				// }

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