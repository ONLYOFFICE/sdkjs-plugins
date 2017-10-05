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
				oDiv = this.private_CreateCombobox(this.m_oRawProps["label"], this, -1, this.m_oRawProps["anotherMax"], this.m_oRawProps["anotherTitle"]);
			else
				oDiv = this.private_CreateCombobox(this.m_oRawProps["label"], this, -1);

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

		return sResult;
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

				privateUpdateCopyField();
			};

			var oField = new CField(oDiv, oProps);
			arrFields.push(oField);

			privateUpdateCopyField();
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
			_Control = oInput["internalInfo"];

			if (_Control.Field.IsTextField() && _Control.Field.CanAddAnother())
				privateCreateBlockControl();
			else
				privateCreateInlineControl();
		};
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