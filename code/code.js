(function(window, undefined){
	
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};

	var language = hljs.listLanguages(),	// array languages
		isInitLang = false, 				//flag init lang select
		language_select,					//select for languages
		_htmlPast,							//from paste in document
		curLang,							//current language
		code_field;							//field for higlight code
		//для сохранения курсора
		var selection,
				range;//для сохранения курсора
	
	$(document).ready(function () {	
		$("div").keydown(function(event){
			// выходим если это не кропка tab
			if( event.keyCode != 9 )
				return;
			event.preventDefault(); 
			$(function () {
				var $content = $('[data-target="insert"]');
					$content.trigger('focus');
					insertHTML("\t");
			});
		});
	});
	
	window.Asc.plugin.init = function(text)
	{
		code_field = document.getElementById("code_id");		
		language_select = document.getElementById("language_id");
		var temp_code,
			flag = false;	//flag change code (true = changed)
		if (!isInitLang)
		{
			initLang();
		}
		curLang = language_select.options[language_select.selectedIndex].text;		//get current language
		language_select.onchange = function(e) {
			text = document.getElementById("code_id").innerText;				
			curLang = language_select.options[language_select.selectedIndex].text;		// change current language
				ChangeCode(curLang);
				flag = true;	
		};
		if (!flag)
		{
			document.getElementById("code_id").focus();
			ChangeCode(curLang);
			//text = "";
		}
		function ChangeCode(curLang) {
			if ((curLang == "Auto") && text)
			{
				temp_code = hljs.highlightAuto(text, language);
				createPreview(temp_code);
			}
			else if(text) 
			{
				temp_code = hljs.highlight(curLang, text, true, 0);
				createPreview(temp_code);	
			}
		};	
		//document.getElementById("code_id").focus();

		code_field.oninput = function() {
			text = document.getElementById("code_id").innerText;
			ChangeCode(curLang);
		};

		window.onresize = function()
		{
			//to update div
			update();
		};
		window.Asc.plugin.resizeWindow(880, 600, 390, 400, 0, 0);				//resize plugin window		
	};
	function update()
	{
		//to do
	};

	function initLang()
	{
		let temp_language = [];
		for (let i = 0; i < language.length; i++)
			{
				temp_language += ("<option value=\"" + (i + 1) + "\">" + language[i] + "</option>");
			}
		language_select.innerHTML ="<option value='" + 0 + "'>" + "Auto" + "</option>" + temp_language;
		isInitLang = true;
	};
	
	function insertHTML(html) {
		try {
			var selection = window.getSelection(),
				range = selection.getRangeAt(0),
				temp = document.createElement("div"),
				insertion = document.createDocumentFragment();
	
			temp.innerHTML = html;
	
			while (temp.firstChild) {
				insertion.appendChild(temp.firstChild);
			}
			//range.deleteContents();	//delete the value
			range.insertNode(insertion);
		} catch (z) {
			try {
				document.selection.createRange().pasteHTML(html);
			} catch (z) {}
		}
	}

	function createPreview(code)
	{
		
			//var selection = window.getSelection(),
				//range = selection.getRangeAt(0),
				//insertion = document.createDocumentFragment();
			//range.deleteContents();	//delete the value
			//range.insertNode(insertion);

				//selection = window.getSelection();
				//range = selection.getRangeAt(0);
				//insertion = document.createDocumentFragment();
				//selection.removeAllRanges();
				//selection.addRange(range);

				//sel = window.getSelection();
				//sel.removeAllRanges();
				//sel.addRange(range);
				
				code_field.innerHTML = code.value;
				
				
				

		for (let i=0; i<language_select.length;i++)
		{
			if (language_select.options[i].text == code.language)
			{
				curLang = code.language;
				language_select.selectedIndex = i;
			}	
		}	
	};
	
	function createHTML(code)
	{
		for (let i=0;i<code.length;i++)
		{
			code = code.replace("\n","<br>");
			code = code.replace("\t","&emsp;&emsp;");
		}
		_htmlPast = "<!DOCTYPE html>\
			<html lang=\"en\"> \
				<head>\
					<meta charset=\"UTF-8\"> \
					<style>\
					<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\">\
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
				<body style = white-space: pre; font-family: Consolas\">" + code.trim(); + "</body>\
			</html>"; 
	};

	window.Asc.plugin.button = function(id)
	{
		if(id==0)
		{
			createHTML(document.getElementById("code_id").innerHTML);
			window.Asc.plugin.executeMethod("PasteHtml", [_htmlPast]);
			this.executeCommand("close", "");
		}
		if((id==-1) || (id==1))
		{
			this.executeCommand("close", "");
		}
	};

	window.Asc.plugin.onExternalMouseUp = function()
	{
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);
		document.dispatchEvent(evt);
	};

})(window, undefined);