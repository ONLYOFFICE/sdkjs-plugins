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

	document.getElementById("button1").onclick = function()
	{
		dataMessage.data.type = "insertText";
		dataMessage.data.text = "Text1";
		var _iframe = document.getElementById("frameEditor");
		if (_iframe)
			_iframe.contentWindow.postMessage(JSON.stringify(dataMessage), "*");
	};
	document.getElementById("button2").onclick = function()
	{
		dataMessage.data.type = "insertText";
		dataMessage.data.text = "Text2";
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
