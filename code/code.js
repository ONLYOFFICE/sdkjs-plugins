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
		style.href = "//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/styles/github-gist.min.css"; //if you need change use -> .href = "highlight/styles/NameStyle.css";
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
				//var finalStyle = document.defaultView.getComputedStyle(document.temp_past, "");
				temp_past.innerHTML = "<pre>" + temp_code.value + "</pre>";
				//_htmlPast = "<pre>" + temp_code.value + "</pre>";
				/*_htmlPast = '<!DOCTYPE html>\
								<html lang="en">\
									<head>\
										<meta charset="UTF-8"> \
										<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github-gist.min.css"> \
										<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>\
										<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>\
									</head>\
										<body>\
											<div id="mydiv">' + temp_code.value + '</div> \
											<script>\
												var text = $(\'#mydiv\').text();\
												var language = hljs.listLanguages(); \
												var temp_code = hljs.highlightAuto(text, language);\
												document.body.innerHTML = "<pre>" + temp_code.value + "</pre>"\
											</script>\
										 </body>\
								 </html>'*/
								 _htmlPast = "<!DOCTYPE html> <html lang=\"en\"> <meta charset=\"UTF-8\"> <head>\
								 <style>\
										.hljs {\
										display: block;\
										background: white;\
										padding: 0.5em;\
										color: #333333;\
										overflow-x: auto;}\
										.hljs-comment,\
										.hljs-meta {\
										color: #969896;}\
										.hljs-string,\
										.hljs-variable,\
										.hljs-template-variable,\
										.hljs-strong,\
										.hljs-emphasis,\
										.hljs-quote {\
										color: #df5000;}\
										.hljs-keyword,\
										.hljs-selector-tag,\
										.hljs-type {\
										color: #a71d5d;}\
										.hljs-literal,\
										.hljs-symbol,\
										.hljs-bullet,\
										.hljs-attribute {\
										color: #0086b3;}\
										.hljs-section,\
										.hljs-name {\
										color: #63a35c;}\
										.hljs-tag {\
										color: #333333;}\
										.hljs-title,\
										.hljs-attr,\
										.hljs-selector-id,\
										.hljs-selector-class,\
										.hljs-selector-attr,\
										.hljs-selector-pseudo {\
										color: #795da3;}\
										.hljs-addition {\
										color: #55a532;\
										background-color: #eaffea;}\
										.hljs-deletion {\
										color: #bd2c00;\
										background-color: #ffecec;}\
										.hljs-link {\
										text-decoration: underline;}\
									</style>\
								 </head> <body font-size: 11px; font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;> <pre>" + temp_code.value + "</pre> </body> </html>"; 
				window.Asc.plugin.executeMethod("PasteHtml", [_htmlPast]);
				
			}
		 }

		 

		 //var temp_code = hljs.highlightAuto(text, language); //hljs.highlight("javascript", text, true, 0);
		//_htmlPast = '<!DOCTYPE html> <html lang="en"> <meta charset="UTF-8"> <head> <link id="code_style" rel="stylesheet" href="https://github.com/isagalaev/highlight.js/tree/master/src/styles/default.css"> </head> <body>' +"<pre>" + temp_code.value + "</pre>" +'</body> </html>' 
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