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
(function(window, undefined){

	window.Asc.plugin.init = function(text)
	{
		var client = new XMLHttpRequest();
		var _url = "./scripts/code.js";
		client.open("GET", _url);

		client.onreadystatechange = function() {
			if (client.readyState == 4 && (client.status == 200 || location.href.indexOf("file:") == 0))
			{
				window.Asc.plugin.info.interface = true;
				window.Asc.plugin.executeCommand("close", client.responseText);
			}
		};
		client.send();
	};
	
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

})(window, undefined);
