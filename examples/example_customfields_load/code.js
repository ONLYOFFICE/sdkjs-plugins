(function(window, undefined)
{
	function CInterview(arrQuestions, fOnEnd)
	{
		this.m_arrQuestions = [];
		this.m_nIndex       = 0;
		this.m_fOnEnd       = fOnEnd;

		this.private_Parse(arrQuestions);
		this.private_Init();
	}
	CInterview.prototype.private_Parse = function(arrQuestions)
	{
		var nQuestionIndex = 0;
		for (var nIndex = 0, nCount = arrQuestions.length; nIndex < nCount; ++nIndex)
		{
			var sEncodedString = arrQuestions[nIndex].String;
			var arrSplit       = sEncodedString.split(";");

			if (arrSplit.length <= 1)
				continue;

			if ("q" === arrSplit[0])
			{
				this.m_arrQuestions[nQuestionIndex++] = {
					FieldId : arrQuestions[nIndex].FieldId,
					Type    : 0,
					String  : arrSplit[1],
					Answer  : ""
				};
			}
			else if ("d" === arrSplit[0])
			{
				this.m_arrQuestions[nQuestionIndex++] = {
					FieldId : arrQuestions[nIndex].FieldId,
					Type    : 1,
					String  : arrSplit[1],
					Items   : arrSplit.slice(2),
					Answer  : ""
				};
			}
		}
	};
	CInterview.prototype.private_Init = function()
	{
		document.getElementById("divSimpleQuestion").style.display = "none";
		document.getElementById("divDropDownQuestion").style.display = "none";

		var oThis = this;
		document.getElementById("buttonBack").onclick = function()
		{
			if (oThis.m_nIndex <= 0)
				return;

			oThis.m_nIndex--;
			oThis.Show();
			oThis.private_UpdateButtons();
		};

		document.getElementById("buttonNext").onclick = function()
		{
			oThis.private_ProcessAnswer();

			if (oThis.m_nIndex === oThis.m_arrQuestions.length - 1)
				return oThis.m_fOnEnd(oThis.m_arrQuestions);
			else if (oThis.m_nIndex >= oThis.m_arrQuestions.length)
				return;

			oThis.m_nIndex++;
			oThis.Show();
			oThis.private_UpdateButtons();
		};

		this.private_UpdateButtons();
	};
	CInterview.prototype.private_ShowSimple = function(sQuestion)
	{
		document.getElementById("divSimpleQuestion").style.display   = "block";
		document.getElementById("divDropDownQuestion").style.display = "none";

		document.getElementById("divSimpleQuestionText").innerHTML = sQuestion;
		document.getElementById("inputSimpleQuestion").value       = "";
	};
	CInterview.prototype.private_ShowDropDown = function(sQuestion, arrItems)
	{
		document.getElementById("divSimpleQuestion").style.display   = "none";
		document.getElementById("divDropDownQuestion").style.display = "block";

		document.getElementById("divDropDownQuestionText").innerHTML = sQuestion;

		var oSelect = document.getElementById("divDropDownQuestionSelect");
		while (oSelect.firstChild)
			oSelect.removeChild(oSelect.firstChild);

		for (var nIndex = 0, nCount = arrItems.length; nIndex < nCount; ++nIndex)
		{
			var oOption       = document.createElement("option");
			oOption.innerHTML = arrItems[nIndex];
			oSelect.appendChild(oOption);
		}
	};
	CInterview.prototype.private_UpdateButtons = function()
	{
		if (this.m_nIndex <= 0)
			document.getElementById("buttonBack").style.display = "none";
		else
			document.getElementById("buttonBack").style.display = "block";

		if (this.m_nIndex >= this.m_arrQuestions.length)
			document.getElementById("buttonNext").style.display = "none";
		else
			document.getElementById("buttonNext").style.display = "block";
	};
	CInterview.prototype.private_ProcessAnswer = function()
	{
		if (!this.m_arrQuestions[this.m_nIndex])
			return;

		var oQuestion = this.m_arrQuestions[this.m_nIndex];
		if (0 === oQuestion.Type)
		{
			oQuestion.Answer = document.getElementById("inputSimpleQuestion").value;
		}
		else if (1 === oQuestion.Type)
		{
			var oSelect = document.getElementById("divDropDownQuestionSelect");
			var nSelectedIndex = oSelect.selectedIndex;
			var oOption = oSelect.childNodes[nSelectedIndex];
			if (!oOption)
				oQuestion.Answer = "";
			else
				oQuestion.Answer = oOption.innerHTML;
		}
	};
	CInterview.prototype.Show = function()
	{
		if (!this.m_arrQuestions[this.m_nIndex])
			return;

		var oQuestion = this.m_arrQuestions[this.m_nIndex];
		if (0 === oQuestion.Type)
		{
			this.private_ShowSimple(oQuestion.String);
		}
		else if (1 === oQuestion.Type)
		{
			this.private_ShowDropDown(oQuestion.String, oQuestion.Items);
		}
	};

	var oInterview = null;
	var nState     = 0;
	var _Elements  = null;

	var _id = 0;
	function privateCreateScript(Label, Id)
	{
		var _script = "\r\n\
			var oDocument = Api.GetDocument();\r\n\
			var oParagraph = Api.CreateParagraph();\r\n\
			var oRun = oParagraph.AddText(\'" + Label + "\');\r\n\
			oDocument.InsertContent([oParagraph], true);\r\n\
			";

		_script = _script.replaceAll("\r\n", "");
		_script = _script.replaceAll("\n", "");

		var _scriptObject = {
			"Props"  : {
				"Id"         : _id++,
				"Tag"        : "",
				"Lock"       : 0,
				"InternalId" : Id
			},
			"Script" : _script
		};

		return _scriptObject;
	}

	function privateCreateScriptForUnlocking(Id)
	{
		return {
			"Props"  : {
				"Lock"       : 3,
				"InternalId" : Id
			}
		};
	}

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};

	window.Asc.plugin.init = function()
	{
		window.Asc.plugin.executeMethod("GetAllContentControls");
	};

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "GetAllContentControls")
		{
			if (undefined === returnValue.length || returnValue.length <= 0)
			{
				this.executeCommand("close", "");
			}
			else
			{
				var arrQuestions = [];
				for (var nIndex = 0, nCount = returnValue.length; nIndex < nCount; ++nIndex)
				{
					arrQuestions.push({String : returnValue[nIndex].Tag, FieldId : returnValue[nIndex].InternalId});
				}

				oInterview = new CInterview(arrQuestions, function(arrElements)
				{
					var _replace = [];
					for (var nIndex = 0, nCount = arrElements.length; nIndex < nCount; ++nIndex)
					{
						_replace.push(privateCreateScriptForUnlocking(arrElements[nIndex].FieldId));
					}

					window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [_replace]);
					_Elements = arrElements;
				});
				oInterview.Show();
			}
		}
		else if (_plugin.info.methodName == "InsertAndReplaceContentControls")
		{
			if (0 === nState)
			{
				var _replace = [];

				for (var nIndex = 0, nCount = _Elements.length; nIndex < nCount; ++nIndex)
				{
					var nFieldId = _Elements[nIndex].FieldId;
					var sAnswer  = _Elements[nIndex].Answer;

					var _obj = privateCreateScript(sAnswer, nFieldId);
					_replace.push(_obj);
				}

				window.Asc.plugin.executeMethod("InsertAndReplaceContentControls", [_replace]);
			}
			else if (1 === nState)
			{
				this.executeCommand("close", "");
			}
			nState++;
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
