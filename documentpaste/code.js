(function(window, undefined){

    window.Asc.plugin.init = function(text)
    {
    	document.getElementById("buttonIDText").onclick = function() {
			window.Asc.plugin.executeMethod("InsertDocuments", [[
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0', format : 'docx' }
			]]);
		};
		document.getElementById("buttonIDTable").onclick = function() {
			window.Asc.plugin.executeMethod("InsertDocuments", [[
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617670&version=0&doc=bXAvTTh5M054UEFRcEpVL0lxZ0M1VmJtb1pySGcraWRDTkFMYkc5VVlTYz0_IjE2MTc2NzAi0', format : 'docx' }
			]]);
		};
		document.getElementById("buttonIDMix").onclick = function() {
			window.Asc.plugin.executeMethod("InsertDocuments", [[
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0', format : 'docx' },
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617670&version=0&doc=bXAvTTh5M054UEFRcEpVL0lxZ0M1VmJtb1pySGcraWRDTkFMYkc5VVlTYz0_IjE2MTc2NzAi0', format : 'docx' },
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617658&version=0&doc=aEE1OEk0THZWakI4bC9Ydm1CaFdQaGRpOFdLMURzaUFkV3cvRFlXS1dUND0_IjE2MTc2NTgi0', format : 'docx' },
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617670&version=0&doc=bXAvTTh5M054UEFRcEpVL0lxZ0M1VmJtb1pySGcraWRDTkFMYkc5VVlTYz0_IjE2MTc2NzAi0', format : 'docx' }
			]]);
		};
		document.getElementById("buttonIDDemo").onclick = function() {
			window.Asc.plugin.executeMethod("InsertDocuments", [[
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617798&version=0&doc=NTJaMWo0MG9ubS9udGhyVDQ3K2I1RFoxN3ZOK0ZHZXRFMTVTWm1CQ3cwbz0_IjE2MTc3OTgi0', format : 'docx' }
			]]);
		};
		document.getElementById("buttonIDAmchitka").onclick = function() {
			window.Asc.plugin.executeMethod("InsertDocuments", [[
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617872&version=0&doc=OTlzUEg3eXNGL05QUHVKL3VVaDloaGVZZkFnMWwvOWNsUVBWVHFOeUhZWT0_IjE2MTc4NzIi0', format : 'docx' }
			]]);
		};
		document.getElementById("buttonIDMix2").onclick = function() {
			window.Asc.plugin.executeMethod("InsertDocuments", [[
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617798&version=0&doc=NTJaMWo0MG9ubS9udGhyVDQ3K2I1RFoxN3ZOK0ZHZXRFMTVTWm1CQ3cwbz0_IjE2MTc3OTgi0', format : 'docx' },
				{ url: 'https://personal.onlyoffice.com/products/files/httphandlers/filehandler.ashx?action=view&fileid=1617872&version=0&doc=OTlzUEg3eXNGL05QUHVKL3VVaDloaGVZZkFnMWwvOWNsUVBWVHFOeUhZWT0_IjE2MTc4NzIi0', format : 'docx' }
			]]);
		};
    };

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
	};

})(window, undefined);
