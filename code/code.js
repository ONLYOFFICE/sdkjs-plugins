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
	var language_select;		//select for languages

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
	   $(document).ready(function () {
			//to do	
	   });
	}
	window.Asc.plugin.init = function(text)
	{		
		language_select = document.getElementById("language_id");
		var temp_code;
		var curLang; 	//l
		var flag = false;	//flag change code (true = changed)
		if (!isInitLang)
		{
			initLang();
		}
		function initLang()
		{
			let temp_language = [];
			for (let i = 0; i < language.length; i++)
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
				if ((curLang == "Auto") && text)
				{
					temp_code = hljs.highlightAuto(text, language);
					createHTML(temp_code);
					text="";
				}
				else if(text) 
				{
					temp_code = hljs.highlight(curLang, text, true, 0);
					createHTML(temp_code);
					text="";	
				}
		 	}
	};
	function createHTML(code)
	{
		let tmp = code.value.trim();
		for (let i=0;i<code.value.length;i++)
		{
			tmp = tmp.replace("\n","<br>");
		}
		//var temp_past = document.getElementById("code_id");
		//temp_past.innerHTML = "<pre>" + tmp + "</pre>";
		_htmlPast = "<!DOCTYPE html>\
			<html lang=\"en\"> \
				<head>\
					<meta charset=\"UTF-8\"> \
					<style>\
					.hljs {\
						display: block;\
						overflow-x: auto;\
						padding: 0.5em;\
						background: white;\
						color: black;}\
					.hljs-comment,\
					.hljs-quote {\
						color: #800;}\
					.hljs-keyword,\
					.hljs-selector-tag,\
					.hljs-section,\
					.hljs-title,\
					.hljs-name {\
						color: #008;}\
					.hljs-variable,\
					.hljs-template-variable {\
						color: #660;}\
					.hljs-string,\
					.hljs-selector-attr,\
					.hljs-selector-pseudo,\
					.hljs-regexp {\
						color: #080;}\
					.hljs-literal,\
					.hljs-symbol,\
					.hljs-bullet,\
					.hljs-meta,\
					.hljs-number,\
					.hljs-link {\
						color: #066;}\
					.hljs-title,\
					.hljs-doctag,\
					.hljs-type,\
					.hljs-attr,\
					.hljs-built_in,\
					.hljs-builtin-name,\
					.hljs-params {\
						color: #606;}\
					.hljs-attribute,\
					.hljs-subst {\
						color: #000;}\
					.hljs-formula {\
						background-color: #eee;\
						font-style: italic;}\
					.hljs-selector-id,\
					.hljs-selector-class {\
						color: #9B703F;}\
					.hljs-addition {\
						background-color: #baeeba;}\
					.hljs-deletion {\
						background-color: #ffc8bd;}\
					.hljs-doctag,\
					.hljs-strong {\
						font-weight: bold;}\
					.hljs-emphasis {\
						font-style: italic;}\
					</style>\
				</head> \
				<body style = font-family: Consolas\"><pre>" + tmp.trim(); + "</pre></body>\
			</html>"; 
			window.Asc.plugin.executeMethod("PasteHtml", [_htmlPast]);
			for (let i=0; i<language_select.length;i++)
			{
				if (language_select.options[i].text == code.language)
				{
					language_select.selectedIndex = i;
				}	
			}	

	}
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