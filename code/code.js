(function(window, undefined){
	
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};
	var language = hljs.listLanguages();	// array languages
	var isInitLang = false; 	//flag init lang select


	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
	   $(document).ready(function () {
	

		  
		  
			
	   });
		
	}

	
	
	
	

	window.Asc.plugin.init = function(text)
	{		
		var language_select = document.getElementById("language_id");
		var style = document.getElementById("code_style");
		var temp_code;
		var curLang; 	//l
		var flag = false;	//flag change code (true = changed)
		style.href = "highlight/styles/github-gist.css"; //if you need change use -> .href = "highlight/styles/NameStyle.css";
		if (!isInitLang)
		{
			initLang();
		}
		function initLang()
		{
			let temp_language = [];
			for (var i = 0; i < language.length; i++)
				{
					temp_language += ("<option value=\"" + (i + 1) + "\">" + language[i] + "</option>");
				}
			
			language_select.innerHTML ="<option value='" + 0 + "'>" + "Auto" + "</option>" + temp_language;
			isInitLang = true;
		}

		curLang = language_select.options[language_select.selectedIndex].text;		//get current language
		
		language_select.onchange = function(e) { 								
			let changeLang = language_select.options[language_select.selectedIndex].text;		// change current language
			if (curLang != changeLang)
			{
				ChangeCode(changeLang);
				flag = true;
			}
				
		 };
		 if (!flag)
		 {
			 ChangeCode(curLang)
		 }
		 function ChangeCode(curLang) {
		 	if (curLang == "Auto"){
				temp_code = hljs.highlightAuto(text, language);
				var temp_past = document.getElementById("code_id");
				temp_past.innerHTML = "<pre>" + temp_code.value + "</pre>";
			}
			else {
				temp_code = hljs.highlight(curLang, text, true, 0);
				var temp_past = document.getElementById("code_id");
				temp_past.innerHTML = "<pre>" + temp_code.value + "</pre>";
				_htmlPast = "<pre>" + temp_code.value + "</pre>";
				window.Asc.plugin.executeMethod("PasteHtml", [_htmlPast]);
				
			}
		 }

		 

		 //var temp_code = hljs.highlightAuto(text, language); //hljs.highlight("javascript", text, true, 0);
		//_htmlPast = '<!DOCTYPE html> <html lang="en"> <meta charset="UTF-8"> <head> <link id="code_style" rel="stylesheet" href="highlight/styles/default.css"> </head> <body>' +"<pre>" + temp_code.value + "</pre>" +'</body> </html>' 
		//window.Asc.plugin.executeMethod("PasteHtml", [_htmlPast]);
		
	
			
	};
	
	//close plugin
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};
		  
})(window, undefined);