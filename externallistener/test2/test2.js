/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
window.onload = function() {

	var dataMessage = {
		frameEditorId : "iframeEditor",
		guid : "asc.{A8705DEE-7544-4C33-B3D5-168406D92F72}",
		type : "onExternalPluginMessage",
		data : {
			type: "close",
			text: "text"
		}
	};
	var script = "";
	var type = document.getElementById("frameEditor").src;

	if (type.indexOf(".docx") !== -1) {
		script += "var oDocument = Api.GetDocument();\r\n"
		script += "var oParagraph = Api.CreateParagraph();\r\n"
		script += "oParagraph.AddText('Hello, I am external listener');\r\n"
		script += "oDocument.InsertContent([oParagraph]);"
	} else if (type.indexOf(".xlsx") !== -1) {
		script += "var WS = Api.GetActiveSheet();\r\n"
		script += "WS.GetRange('B1').SetValue('2');\r\n"
		script += "WS.GetRange('B2').SetValue('2');\r\n"
		script += "WS.GetRange('A3').SetValue('2x2=');\r\n"
		script += "WS.GetRange('B3').SetValue('=B1*B2')"
	} else if (type.indexOf(".pptx")) {
		script += "var oPresentation = Api.GetPresentation();\r\n"
		script += "var oSlide = oPresentation.GetSlideByIndex(0);\r\n"
		script += "oSlide.RemoveAllObjects();\r\n"
		script += "oFill = Api.CreateSolidFill(Api.CreateRGBColor(61, 74, 107));\r\n"
		script += "oStroke = Api.CreateStroke(0, Api.CreateNoFill());\r\n"
		script += "var oShape = Api.CreateShape('flowChartMagneticTape', 300 * 36000, 130 * 36000, oFill, oStroke);\r\n"
		script += "oShape.SetPosition(608400, 1267200);\r\n"
		script += "oDocContent = oShape.GetDocContent();\r\n"
		script += "oParagraph = oDocContent.GetElement(0);\r\n"
		script += "oRun = Api.CreateRun();\r\n"
		script += "oRun.SetFontSize(30);\r\n"
		script += "oRun.AddText('This is just a sample text. Nothing special.');\r\n"
		script += "oParagraph.AddElement(oRun);\r\n"
		script += "oSlide.AddObject(oShape);"
	}
	

	document.getElementById("textarea").value = script;

	document.getElementById("button1").onclick = function()
	{
		dataMessage.data.type = "executeCommand";
		dataMessage.data.text = document.getElementById("textarea").value.trim().replace(/\r*\n/g,"");
		var _iframe = document.getElementById("frameEditor");
		if (_iframe)
			_iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
	};
	document.getElementById("buttonClose").onclick = function()
	{
		dataMessage.data.type = "close";
		dataMessage.data.text = "";
		var _iframe = document.getElementById("frameEditor");
		if (_iframe)
			_iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
	};

};
