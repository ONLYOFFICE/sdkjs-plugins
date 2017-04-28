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
			type : "document", 
			data : [[
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0', format : 'docx' },
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0', format : 'docx' }				
			]] 
		},
		{
			type : "content",
			data : insertContentCommand
		},
		{ 
			type : "document", 
			data : [[
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0', format : 'docx' }
			]]
		},
		{
			type : "content",
			data : insertContentCommand
		},
		{
			type : "content",
			data : insertContentCommand
		}
	];
		
	var arrayCommandsLength = arrayCommands.length;
	var currentCommand = -1;
	
	function RunCommand()
	{
		var plugin = window.Asc.plugin;
		
		++currentCommand;
		if (currentCommand >= arrayCommandsLength)
		{
			plugin.executeCommand("close", "");
			return;
		}
		
		var current = arrayCommands[currentCommand];
		if (current.type == "document")
		{
			plugin.executeMethod("InsertDocuments", current.data);
		}
		else if (current.type == "content")
		{
			plugin.info.recalculate = true;
			plugin.executeCommand("command", current.data);
		}		
	}
	
	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		// next command
		RunCommand();
	};
	
	window.Asc.plugin.onCommandCallback = function()
	{
		// next command
		RunCommand();
	};

    window.Asc.plugin.init = function()
	{
		RunCommand();
    };

    window.Asc.plugin.button = function(id) 
	{
    };

})(window, undefined);