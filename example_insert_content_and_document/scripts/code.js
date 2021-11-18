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
    
	function insertContentCommandFunction()
	{
		//create script for paste content into document
		var sScript = 'var oDocument = Api.GetDocument();';
        sScript += 'var oParagraph = Api.CreateParagraph();';
        sScript += 'oParagraph.AddText(\'Hello world!\');';
        sScript += 'oDocument.InsertContent([oParagraph]);';
		return sScript;
	}
	var insertContentCommand = insertContentCommandFunction();
	
	//for example we use this documents
	var arrayCommands = [
		{ 
			Props : {
				Id : 0,
				Tag : "Document 1",
				Lock : 0
			},
			
			Url : 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=4356181&version=0&doc=SUp1RjRQbFVOeExxTE9PZ1RwRUxMcWhpajZJL0MyblB6dU9lbEFaZmNCND0_NDM1NjE4MQ',
			
			Format : 'docx'
		},
		{ 
			Props : {
				Id : 1,
				Tag : "Document 2",
				Lock : 1
			},
			
			Url : 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=4356181&version=0&doc=SUp1RjRQbFVOeExxTE9PZ1RwRUxMcWhpajZJL0MyblB6dU9lbEFaZmNCND0_NDM1NjE4MQ',
			
			Format : 'docx'
		},
		{ 
			Props : {
				Id : 2,
				Tag : "Document 3",
				Lock : 0
			},
			
			Script : insertContentCommand
		},
		{ 
			Props : {
				Id : 3,
				Tag : "Document 4",
				Lock : 0
			},
			
			Url : 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=4356181&version=0&doc=SUp1RjRQbFVOeExxTE9PZ1RwRUxMcWhpajZJL0MyblB6dU9lbEFaZmNCND0_NDM1NjE4MQ',
			
			Format : 'docx'
		},
		{ 
			Props : {
				Id : 4,
				Tag : "Document 5",
				Lock : 0
			},
			
			Script : insertContentCommand
		},
		{ 
			Props : {
				Id : 5,
				Tag : "Document 6",
				Lock : 0
			},
			
			Script : insertContentCommand
		}
	];
		
	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		//event for method "InsertAndReplaceContentControls".
		//works after inserting
		var plugin = window.Asc.plugin;
		//need for update document
		plugin.info.recalculate = true;
		plugin.executeCommand("command", insertContentCommand);
	};
	
	window.Asc.plugin.onCommandCallback = function()
	{
		//event call back for plugin.executeCommand("command", insertContentCommand);
		var plugin = window.Asc.plugin;
		//close plugin
		plugin.executeCommand("close", "");
	};

    window.Asc.plugin.init = function()
	{
		//command for paste content controls into document
		this.executeMethod("InsertAndReplaceContentControls", [arrayCommands]);
    };

    window.Asc.plugin.button = function(id) 
	{
    };

})(window, undefined);