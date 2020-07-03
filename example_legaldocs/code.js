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
			var oDiv = null;

			if (this.CanAddAnother())
				oDiv = this.private_CreateCombobox("TEXT - " + this.m_oRawProps["label"], this, -1, this.m_oRawProps["anotherMax"], this.m_oRawProps["anotherTitle"]);
			else
				oDiv = this.private_CreateCombobox("TEXT - " + this.m_oRawProps["label"], this, -1);

			oDiv.className = "copyFieldElement";
			arrDivs.push(oDiv);
			for (var nIndex = 0, nCount = this.m_oRawProps["subFields"].length; nIndex < nCount; ++nIndex)
			{
				oDiv = this.private_CreateCombobox(this.m_oRawProps["subFields"][nIndex], this, nIndex);
				oDiv.className = "copyFieldSubElement";
				arrDivs.push(oDiv);
			}
		}
		else if ("dropDown" === this.m_oRawProps["type"])
		{
			oDiv = this.private_CreateCombobox("LIST - " + this.m_oRawProps["label"], this, -1);
			oDiv.className = "copyFieldElement";
			arrDivs.push(oDiv);
		}

		return arrDivs;
	};
	CField.prototype.private_CreateCombobox = function(sLabel, oField, nSubFieldIndex, nAnotherMax, sAnotherLabel)
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

		if (undefined !== nAnotherMax && undefined !== sAnotherLabel)
		{
			var oAnotherLabel = document.createElement("div");
			oDiv.appendChild(oAnotherLabel);
			oAnotherLabel.className = "copyFieldAnotherLabel";
			oAnotherLabel.innerHTML = sAnotherLabel + " | max " + nAnotherMax;
		}

		return oDiv;
	};
	CField.prototype.IsTextField = function()
	{
		return (this.m_oRawProps["type"] === "text" ? true : false);
	};
	CField.prototype.IsListField = function()
	{
		return (this.m_oRawProps["type"] === "dropDown" ? true : false);
	};
	CField.prototype.CanAddAnother = function()
	{
		return (this.m_oRawProps["addAnother"] === true ? true : false);
	};
	CField.prototype.GetTextQSubFields = function()
	{
		if (undefined !== this.m_oRawProps["subFields"])
			return this.m_oRawProps["subFields"];

		return [];
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
			if (this.CanAddAnother() && (-1 === nSubIndex || undefined === nSubIndex))
			{
				sResult = this.m_oRawProps["label"] + " | " + this.m_oRawProps["anotherTitle"] + " | max " + this.m_oRawProps["anotherMax"];
			}
			else
			{
				sResult = "TEXT - " + this.m_oRawProps["label"];
				if (nSubIndex >= 0 && undefined !== this.m_oRawProps["subFields"][nSubIndex])
					sResult += " | " + this.m_oRawProps["subFields"][nSubIndex];
			}
		}
		else if (this.IsListField())
		{
			sResult = "LIST - " + this.m_oRawProps["label"];
		}

		return sResult;
	};
	CField.prototype.UseLogic = function()
	{
		return (this.m_oRawProps["useLogic"] === true ? true : false);
	};
	CField.prototype.GetListOptions = function()
	{
		if (this.IsListField() && this.m_oRawProps["selections"])
			return this.m_oRawProps["selections"];

		return [];
	};
	CField.prototype.GetHeader = function()
	{
		return (this.m_oRawProps["label"] ? this.m_oRawProps["label"] : "");
	};

	var arrFields = [];

	function privateCreateInlineControl()
	{
		window.Asc.plugin.executeMethod("AddContentControl", [2, {"Lock" : 3}]);
	}

	function privateCreateBlockControl()
	{
		window.Asc.plugin.executeMethod("AddContentControl", [1, {"Lock" : 3}]);
	}

	function privateCreateScriptForTextQ(Tag, Label, InternalId)
	{
		var _script = "\r\n\
			var oDocument = Api.GetDocument();\r\n\
			var oParagraph = Api.CreateParagraph();\r\n\
			var oRun = oParagraph.AddText(\'" + Label + "\');\r\n\
			oRun.SetColor(0,0,0);\r\n\
			oRun.SetShd(\"clear\",71, 222, 186);\r\n\
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

	function privateCreateScriptForListQ(Tag, Label, InternalId)
	{
		var _script = "\r\n\
			var oDocument = Api.GetDocument();\r\n\
			var oParagraph = Api.CreateParagraph();\r\n\
			var oRun = oParagraph.AddText(\'" + Label + "\');\r\n\
			oRun.SetColor(0,0,0);\r\n\
			oRun.SetShd(\"clear\",191, 202, 255);\r\n\
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

	function privateCreateScriptForTextQWithAnother(Tag, Label, arrSubFields, InternalId)
	{
		var nSubFieldsCount = arrSubFields.length;

		var _script = "\r\n\
			var oDocument = Api.GetDocument();\r\n\
			var oTable = Api.CreateTable(2, " + (nSubFieldsCount + 1) + ");\r\n\
			oTable.SetShd('clear', 71, 222, 186, false);\r\n\
			oTable.SetTableBorderInsideH('single', 12, 0, 146, 133, 136);\r\n\
			oTable.SetTableBorderInsideV('single', 12, 0, 146, 133, 136);\r\n\
			oTable.SetTableBorderTop('single', 8, 0, 140, 140, 140);\r\n\
			oTable.SetTableBorderBottom('single', 8, 0, 140, 140, 140);\r\n\
			oTable.SetTableBorderLeft('single', 8, 0, 140, 140, 140);\r\n\
			oTable.SetTableBorderRight('single', 8, 0, 140, 140, 140);\r\n\
			oTable.SetWidth('percent', 100);\r\n\
			var oRow = oTable.GetRow(0);\r\n\
			var oCell = oTable.MergeCells([oRow.GetCell(0), oRow.GetCell(1)]);\r\n\
			var oCellContent = oCell.GetContent();\r\n\
			oCellContent.GetElement(0).AddText(\'" + Label + "\');\r\n\
			oCellContent.GetElement(0).SetSpacingAfter(0);\r\n\
			oDocument.InsertContent([oTable], true);";

		for (var nIndex = 0; nIndex < nSubFieldsCount; ++nIndex)
		{
			_script += "oTable.GetRow(" + (nIndex + 1) + ").GetCell(0).GetContent().GetElement(0).AddText('" + arrSubFields[nIndex] + "');\r\n\
			oTable.GetRow(" + (nIndex + 1) + ").GetCell(0).GetContent().GetElement(0).SetIndLeft(720);\r\n\
			oTable.GetRow(" + (nIndex + 1) + ").GetCell(0).GetContent().GetElement(0).SetSpacingAfter(0);\r\n\
			oTable.GetRow(" + (nIndex + 1) + ").GetCell(0).SetWidth('percent', 0);\r\n\
			oTable.GetRow(" + (nIndex + 1) + ").GetCell(1).GetContent().GetElement(0).SetSpacingAfter(0);\r\n\
			oTable.GetRow(" + (nIndex + 1) + ").GetCell(1).SetWidth('percent', 100);";
		}

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

	function privateCreateScriptForInsertOption(Tag, Label, InternalId)
	{
		var _script = "\r\n\
			var oDocument = Api.GetDocument();\r\n\
			var oParagraph = Api.CreateParagraph();\r\n\
			var oInlineContainer = oParagraph.AddInlineLvlSdt();\r\n\
			oInlineContainer.SetLock('contentLocked');\r\n\
			var oRun = Api.CreateRun();\r\n\
			oRun.AddText(\'" + Label + "\');\r\n\
			oRun.SetColor(0,0,0);\r\n\
			oRun.SetShd(\"clear\", 244, 155, 32);\r\n\
			oInlineContainer.AddElement(oRun, 0);\r\n\
			oRun = oParagraph.AddText(\'Enter your conditional text here\');\r\n\
			oRun.SetColor(0,0,0);\r\n\
			oRun.SetShd(\"clear\", 240, 221, 191);\r\n\
			oDocument.InsertContent([oParagraph], true);\r\n\
			";

		_script = _script.replaceAll("\r\n", "");
		_script = _script.replaceAll("\n", "");

		var _scriptObject = {
			"Props" : {
				"Tag"        : Tag,
				"Lock"       : 3,
				"InternalId" : InternalId
			},
			"Script" : _script
		};

		return _scriptObject;
	}

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};

	var _Control = null;

    window.Asc.plugin.init = function()
    {
    	function privateAddField(sHeader, sText, oProps)
		{
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
			oInfoTitle.innerHTML = sHeader;

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

				privateUpdateCopyField();
			};

			var oField = new CField(oDiv, oProps);
			arrFields.push(oField);

			privateUpdateCopyField();
		}

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

			if (!sHeader || !sText)
				return;

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

			console.log(oProps);

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

			privateAddField("TEXT | " + sHeader, sText, oProps);
		};

		function privateOnRemoveTextQSub()
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
		}

		function privateUpdateCopyField()
		{
			var oContainer = document.getElementById("divCopyField");

			while (oContainer.children.length > 1)
				oContainer.removeChild(oContainer.children[0]);

			var oButton = oContainer.children[0];
			for (var nIndex = 0, nCount = arrFields.length; nIndex < nCount; ++nIndex)
			{
				var arrDivs = arrFields[nIndex].GenerateFieldDivsForInsert();
				for (var nDivId = 0, nDivsCount = arrDivs.length; nDivId < nDivsCount; ++nDivId)
				{
					oContainer.insertBefore(arrDivs[nDivId], oButton);
				}
			}

			privateUpdateInsertOptions();
		}

		function privateOnRemoveListQElement()
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
				if (oParentDiv === oContainerDiv.children[oContainerDiv.children.length - 1])
				{
					var oAddButton = document.getElementById("buttonAddListQAddElement");
					oAddButton.parentNode.removeChild(oAddButton);
					oContainerDiv.removeChild(oParentDiv);
					oContainerDiv.children[oContainerDiv.children.length - 1].appendChild(oAddButton);
				}
				else
				{
					oContainerDiv.removeChild(oParentDiv);
				}
			}
		}

		document.getElementById("buttonAddTextQRemoveSub").onclick = privateOnRemoveTextQSub;

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

			oButton.onclick = privateOnRemoveTextQSub;

			oDiv.appendChild(this);
		};

		document.getElementById("buttonCopyField").onclick = function()
		{
			var oContainer = document.getElementById("divCopyField");
			if ("none" === oContainer.style.display)
			{
				oContainer.style.display = "block";
				privateUpdateCopyField();
			}
			else
			{
				oContainer.style.display = "none";
			}
		};

		document.getElementById("buttonCopyFieldInsert").onclick = function()
		{
			if (_Control)
				return;

			var oInput = document.querySelector('input[name="radioCopyField"]:checked');
			if (!oInput)
				return;

			_Control = oInput["internalInfo"];

			if (_Control.Field.IsTextField() && _Control.Field.CanAddAnother())
				privateCreateBlockControl();
			else
				privateCreateInlineControl();
		};

		document.getElementById("buttonAddListQ").onclick = function()
		{
			if ("none" === document.getElementById("divAddListQ").style.display)
				document.getElementById("divAddListQ").style.display = "block";
			else
				document.getElementById("divAddListQ").style.display = "none";
		};

		document.getElementById("buttonAddListQSave").onclick = function()
		{
			document.getElementById("divAddListQ").style.display = "none";
		};

		document.getElementById("buttonAddListQRemoveElement").onclick = privateOnRemoveListQElement;

		document.getElementById("buttonAddListQAddElement").onclick = function()
		{
			this.parentNode.removeChild(this);
			var oContainer = document.getElementById("divAddListQContainerElements");

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

			oButton.onclick = privateOnRemoveListQElement;

			oDiv.appendChild(this);
		};

		document.getElementById("buttonAddListQSave").onclick = function()
		{
			var sHeader = document.getElementById("inputAddListQHeader").value;
			var sText   = document.getElementById("textareaAddListQText").value;

			if (!sHeader || !sText)
				return;

			var oProps = {
				"allowMultiple" : document.getElementById("checkboxAddListQAllowMultiple").checked,
				"isVisible"     : true,
				"useLogic"      : document.getElementById("checkboxAddListQLogic").checked,
				"nonEditable"   : false,
				"question"      : sText,
				"hint"          : "",
				"label"         : sHeader,
				"type"          : "dropDown",
				"id"            : GetNewId(),
				"selections"    : []
			};

			console.log(oProps);

			var nElementsCount = document.getElementById("divAddListQContainerElements").children.length;
			for (var nIndex = 0; nIndex < nElementsCount; ++nIndex)
			{
				var sValue = document.getElementById("divAddListQContainerElements").children[nIndex].children[0].value;
				oProps["selections"].push(sValue);
			}

			document.getElementById("divAddListQ").style.display = "none";

			privateAddField("List | " + sHeader, sText, oProps);
		};

		function privateUpdateInsertOptions()
		{
			var oSelectField = document.getElementById("selectInsertOptionField");

			while (oSelectField.children.length > 0)
				oSelectField.removeChild(oSelectField.children[0]);

			for (var nIndex = 0, nCount = arrFields.length; nIndex < nCount; ++nIndex)
			{
				var oField = arrFields[nIndex];
				if (oField.UseLogic())
				{
					var oOption = document.createElement("option");
					oOption.innerHTML = oField.GetLabel(-1);
					oOption["internalInfo"] = oField;
					oSelectField.appendChild(oOption);
				}
			}

			privateUpdateInsertOptionValue();
		}

		function privateUpdateInsertOptionValue()
		{
			document.getElementById("selectInsertOptionValue").style.display = "none";
			document.getElementById("inputInsertOptionValue").style.display  = "none";

			var oSelectField = document.getElementById("selectInsertOptionField");
			var oFieldOption = oSelectField.children[oSelectField.selectedIndex];
			if (!oFieldOption)
				return;

			var oField = oFieldOption["internalInfo"];
			if (!oField)
				return;

			if (oField.IsTextField())
			{
				document.getElementById("inputInsertOptionValue").style.display = "block";
			}
			else if (oField.IsListField())
			{
				var oSelectValue = document.getElementById("selectInsertOptionValue");
				oSelectValue.style.display = "block";

				while (oSelectValue.children.length > 0)
					oSelectValue.removeChild(oSelectValue.children[0]);

				var arrValueOptions = oField.GetListOptions();
				for (var nIndex = 0, nCount = arrValueOptions.length; nIndex < nCount; ++nIndex)
				{
					var oOption = document.createElement("option");
					oOption.innerHTML = arrValueOptions[nIndex];
					oSelectValue.appendChild(oOption);
				}
			}
		}

		document.getElementById("buttonInsertOption").onclick = function()
		{
			if ("none" === document.getElementById("divInsertOption").style.display)
			{
				document.getElementById("divInsertOption").style.display = "block";
				privateUpdateInsertOptions();
			}
			else
			{
				document.getElementById("divInsertOption").style.display = "none";
			}
		};

		document.getElementById("selectInsertOptionField").onchange = privateUpdateInsertOptionValue;

		document.getElementById("buttonInsertOptionInsert").onclick = function()
		{
			var oSelectField = document.getElementById("selectInsertOptionField");
			var oFieldOption = oSelectField.children[oSelectField.selectedIndex];
			if (!oFieldOption)
				return;

			var oField = oFieldOption["internalInfo"];
			if (!oField)
				return;

			var oSelectCondition = document.getElementById("selectInsertOptionCondition");
			var oConditionOption = oSelectCondition.children[oSelectCondition.selectedIndex];
			if (!oConditionOption)
				return;

			var sCondition = oConditionOption.innerHTML;
			var sValue     = "";

			if (oField.IsTextField())
			{
				sValue = document.getElementById("inputInsertOptionValue").value;
			}
			else if (oField.IsListField())
			{
				var oSelectValue = document.getElementById("selectInsertOptionValue");
				var oValueOption = oSelectValue.children[oSelectValue.selectedIndex];
				if (!oValueOption)
					return;

				sValue = oValueOption.innerHTML;
			}
			else
			{
				return;
			}

			var oProps = {
				"condition" : sCondition,
				"type"      : "conditional",
				"value"     : sValue,
				"id"        : GetNewId(),
				"input_id"  : oField.GetId()
			};

			console.log(oProps);

			document.getElementById("divInsertOption").style.display = "none";

			if (_Control)
				return;

			_Control = {
				Conditional : true,
				Props       : oProps,
				Field       : oField
			};

			privateCreateInlineControl(false);
		};
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "AddContentControl" && returnValue)
		{
			if (_Control)
			{
				var oField = _Control.Field;

				if (true === _Control.Conditional)
				{
					var sLabel = "OPTION - IF \"" + oField.GetHeader() + "\" " + _Control.Props["condition"] + " \"" + _Control.Props["value"] + "\"";
					var _obj = privateCreateScriptForInsertOption(oField.GetId(), sLabel, returnValue.InternalId);
					window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
				}
				else if (oField.IsTextField())
				{
					if (oField.CanAddAnother())
					{
						if (-1 === _Control.SubIndex)
						{
							var _obj = privateCreateScriptForTextQWithAnother(oField.GetId(), oField.GetLabel(), oField.GetTextQSubFields(), returnValue.InternalId);
							window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
						}
						else
						{
							var _obj = privateCreateScriptForTextQWithAnother(oField.GetId(), oField.GetLabel(), [oField.GetTextQSubFields()[_Control.SubIndex]], returnValue.InternalId);
							window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
						}
					}
					else
					{
						var _obj = privateCreateScriptForTextQ(oField.GetId(), oField.GetLabel(_Control.SubIndex), returnValue.InternalId);
						window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [[_obj]]);
					}
				}
				else if (oField.IsListField())
				{
					var _obj = privateCreateScriptForListQ(oField.GetId(), oField.GetLabel(), returnValue.InternalId);
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