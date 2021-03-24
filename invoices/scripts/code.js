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
	
	var isInit = false;
	window.Add = function(field_type)
	{
		if (!isInit)
			return;
		
		// serialize command as text
		var sScript = "var oDocument = Api.GetDocument();";
        sScript += "var oParagraph = Api.CreateParagraph();";
        sScript += "oParagraph.AddText(\'" + field_type + "\');";
        sScript += "oDocument.InsertContent([oParagraph]);";
        window.Asc.plugin.info.recalculate = true;
        window.Asc.plugin.executeCommand("command", sScript);
	};
	window.Mark = function()
	{
		return window.Add('${DynamicTable}');
	};

    window.Asc.plugin.init = function()
    {
        isInit = true;
    };

    window.Asc.plugin.button = function(id)
    {
		if (-1 == id)
			this.executeCommand("close", "");
    };

})(window, undefined);
