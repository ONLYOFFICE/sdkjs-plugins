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
(function(window, undefined)
{
	var nStage   = 0;
	//the text that will be searched in the document. 
	var arrCodes = ["%FIRST_NAME%", "%LAST_NAME%", "%ADDRESS%"];
	var arrIds   = ["inputFirstName", "inputLastName", "inputAddress"];

	function privateReplaceNext()
	{
		if (nStage >= arrCodes.length){
			window.Asc.plugin.executeCommand("close", "");
			return;
		}

		//properties structure for search and replace
		Asc.scope.searchProps = {
			"searchString"  : arrCodes[nStage],
			"replaceString" : document.getElementById(arrIds[nStage]).value,
			"matchCase"     : true
		};
		
		//execute method for search and replace
		window.Asc.plugin.callCommand(function() {
			var oDocument = Api.GetDocument();
			oDocument.SearchAndReplace(Asc.scope.searchProps);
		});
	}

	window.Asc.plugin.onCommandCallback = function() {
		nStage++;
		privateReplaceNext();
	};
	
	window.Asc.plugin.init = function()
	{
		document.getElementById("buttonCancel").onclick = function()
		{
			window.Asc.plugin.executeCommand("close", "");
		};

		document.getElementById("buttonOK").onclick = function()
		{
			privateReplaceNext();
		};
	};

	window.Asc.plugin.button = function()
	{
		this.executeCommand("close", "");
	};

})(window, undefined);
