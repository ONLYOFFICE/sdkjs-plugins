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
(function(window, undefined) {

	window.Asc.plugin.init = function() {
		var comment = document.getElementById("textareaIDComment");
		document.getElementById("buttonIDAddComment").onclick = function() {
			Asc.scope.textComment = comment.value; // export variable to plugin scope
			window.Asc.plugin.callCommand(function() {
				var oWorksheet = Api.GetActiveSheet();
				var ActiveCell = oWorksheet.ActiveCell;
				ActiveCell.AddComment(Asc.scope.textComment); // past comment in active cell
			}, true);
		};
	};
	
	window.Asc.plugin.button = function() {
		this.executeCommand("close", "");
	};

})(window, undefined);
