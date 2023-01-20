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

(function (window, undefined) {
	window.Asc.plugin.init = function()
	{
		document.getElementById('btn_paste').onclick = function() {
			// if you want to change some parametrs read more about it. 
			// https://api.onlyoffice.com/plugin/executemethod/addcontentcontrol
			window.Asc.plugin.executeMethod("AddContentControl", [1, {"Id" : 7, "Tag" : "{tag_example}", "Lock" : 3}]);
		};
	};
})(window, undefined);
