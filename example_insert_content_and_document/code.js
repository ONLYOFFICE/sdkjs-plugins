(function (window, undefined) {
    
	function insertContentCommandFunction()
	{
		var sScript = 'var oDocument = Api.GetDocument();';
        sScript += 'var oParagraph = Api.CreateParagraph();';
        sScript += 'oParagraph.AddText(\'Hello world!\');';
        sScript += 'oDocument.InsertContent([oParagraph]);';
		return sScript;
	}
	var insertContentCommand = insertContentCommandFunction();
	
	var arrayCommands = [
		{ 
			Props : {
				Id : 0,
				Tag : "Document 1",
				Lock : 0
			},
			
			Url : 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0',
			
			Format : 'docx'
		},
		{ 
			Props : {
				Id : 1,
				Tag : "Document 2",
				Lock : 1
			},
			
			Url : 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0',
			
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
			
			Url : 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0',
			
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
		var plugin = window.Asc.plugin;
		plugin.info.recalculate = true;
		plugin.executeCommand("command", insertContentCommand);
	};
	
	window.Asc.plugin.onCommandCallback = function()
	{
		var plugin = window.Asc.plugin;
		plugin.executeCommand("close", "");
	};

    window.Asc.plugin.init = function()
	{
		this.executeMethod("InsertAndReplaceContentControls", [arrayCommands]);
    };

    window.Asc.plugin.button = function(id) 
	{
    };

})(window, undefined);