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
		code_field,							//field for higlight code		
		container,							//scrollable conteiner	
		timer,								//for timer 
		flag_select = false;

	function checkInternetExplorer(){
		var rv = -1;
		if (window.navigator.appName == 'Microsoft Internet Explorer') {
			const ua = window.navigator.userAgent;
			const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		} else if (window.navigator.appName == 'Netscape') {
			const ua = window.navigator.userAgent;
			const re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');

			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		}
		return rv !== -1;
	};
	const isIE = checkInternetExplorer();	//check IE
	
	$(document).ready(function(){
		$("div").keydown(function(event){
			//exit if it's not a tab
			if( (event.keyCode != 9) ||  isIE )
			{
				return;
			}
			//event.preventDefault(); 
			cancelEvent(event);
			$(function () {
				var $content = $("[data-target=\"insert\"]");
				$content.trigger("focus");
				insertHTML("\t");
			});
			updateScroll();
			updateScroll();
		});	
	});

	function updateScroll(){
		Ps.update(container);
		if($('.ps__scrollbar-y').height() === 0){
			$('.ps__scrollbar-y').css('border-width', '0px');
		}
		else{
			$('.ps__scrollbar-y').css('border-width', '1px');
		}
		if($('.ps__scrollbar-x').width() === 0){
			$('.ps__scrollbar-x').css('border-height', '0px');
		}
		else{
			$('.ps__scrollbar-x').css('border-height', '1px');
		}
	};

	window.Asc.plugin.init = function(text){
		code_field = document.getElementById("code_id");
		language_select = document.getElementById("language_id");
		var background_color = document.getElementById("background_color");
		var temp_code,
			flag = false;	//flag change code (true = changed)

		if (!isIE)
		{
			document.getElementById("btn_highlight").style.display ="none";
			document.getElementById("language_id").style.flex ="1";
		}

		if (isIE)
		{
			document.getElementById("tabselect").style.display ="none";
		}

		background_color.onchange = function () {
			container.style.background = background_color.value;
		}

		if (!isInitLang)
		{
			initLang();
			container = document.getElementById('scrollable-container-id');
			Ps.initialize(container, {
				theme : 'custom-theme'
			});
		}

		/* //for scroll
		code_field.onmousedown = function() {
			flag_select= true;
		}
		code_field.onmouseup = function() {
			flag_select= false;
		}
		$("#code_id").mouseenter(function(){
			flag_select = false;
		});
		document.onmousemove = function() {
			if(flag_select)
			{
				let pol = container.getBoundingClientRect();
				let pol_end = code_field.getBoundingClientRect();
				//let left = code_field.offsetLeft;
				//let top = code_field.offsetTop;
				let height = pol.height * 0.1;
				let width = pol.width * 0.1;
				if ( (event.clientY > pol.bottom) && (pol_end.bottom > pol.bottom) )
				{
					container.scrollBy(0,height);
				}
				if (event.clientX > pol.right)
				{
					container.scrollBy(width,0);
				}
				if (event.clientY < pol.top)
				{
					container.scrollBy(0,-height);
				}
				if (event.clientX < pol.left)
				{
					container.scrollBy(-width,0);
				}
			}
		}*/

		curLang = language_select.options[language_select.selectedIndex].text;		//get current language
		language_select.onchange = function(e) {
			text = code_field.innerText;
			curLang = language_select.options[language_select.selectedIndex].text;		// change current language
				ChangeCode(curLang);
				flag = true;
		};

		function deleteSelected(start,end) {
			text = code_field.innerText;
			var temp_text = text.substring(end);
			text = text.substring(0,start) + temp_text;
			ChangeCode(curLang);
		};

		if (!flag)
		{
			code_field.focus();
			ChangeCode(curLang);
		}

		function ChangeCode(curLang){
			if ((curLang == "Auto") && text)
			{
				temp_code = hljs.highlightAuto(text, language);
				createPreview(temp_code,text);
			}
			else if(text) 
			{
				temp_code = hljs.highlight(curLang, text, true, 0);
				createPreview(temp_code,text);
			}
			else
			{
				code_field.innerHTML = "";
			}
		};	

		$("#code_id").keydown(function(event){
			if( (event.keyCode == 13) && !isIE )
			{
				var selection_start = $("#code_id").get_selection_start();
				var selection_end = $("#code_id").get_selection_end();
				if (selection_end == code_field.innerText.length)
					{
						insertHTML("\n");
					}
				if(selection_start == selection_end)
				{
					insertHTML("\n");
					deleteSelected(selection_start,selection_end);
					$("#code_id").set_selection(selection_start+1, selection_start+1);
					cancelEvent(event);
				}else{
					insertHTML("\n");
					deleteSelected(selection_start+1,selection_end+1);
					$("#code_id").set_selection(selection_start+1, selection_start+1);
					cancelEvent(event);
				}
			}
		});

		document.getElementById("btn_highlight").onclick = function(event){
			text = code_field.innerHTML;
			for (var i=0;i<text.length;i++)
				{
					text = text.replace("<p>","<div>");
					text = text.replace("</p>","</div>\n");
				}
			for(i=0;i<text.length;i++)
			{
				text = text.replace("\n"," %%bpmn%% ");
				text = text.replace("<br>","");
			}
			code_field.innerHTML = text;
			text = $("#code_id").text();
			for(i=0;i<text.length;i++)
			{
				text = text.replace(" %%bpmn%% ","\n");
			}
			code_field.innerHTML = text;
			ChangeCode(curLang);
		};
		
		$("#code_id").on("input", function(){
			clearTimeout(timer);
			timer = setTimeout(grab,1500);
		});

		function grab (){
			if (!isIE)
			{
				let load = document.getElementById("load");
				load.style.display="block";
				load.style.padding = "40% 0 0 50%";
				var selection_start = $("#code_id").get_selection_start();
				var selection_end = $("#code_id").get_selection_end();
				text = code_field.innerHTML;
				if( text != code_field.innerText )
				{
					for (var i=0;i<text.length;i++)
					{
						
						text = text.replace("<p","<div");
						text = text.replace("</p>","</div>");
					}
				}
				code_field.innerHTML = text;
				text = code_field.innerText;
				ChangeCode(curLang);
				updateScroll();
				updateScroll();
				$("#code_id").set_selection(selection_start, selection_start);
				load.style.display="none";
			}
		}
		window.Asc.plugin.resizeWindow(880, 600, 860, 400, 0, 0);				//resize plugin window		
		
		window.onresize = function(){
				updateScroll();
				updateScroll();
			};
	};

	function initLang(){
		var temp_language = [];
		for (var i = 0; i < language.length; i++)
			{
				temp_language += ("<option value=\"" + (i + 1) + "\">" + language[i] + "</option>");
			}
		language_select.innerHTML ="<option value = 0>" + "Auto" + "</option>" + temp_language;
		isInitLang = true;
	};
	
	function insertHTML(html){
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
		var selection_start = $("#code_id").get_selection_start();
		var selection_end = $("#code_id").get_selection_end();
		$("#code_id").set_selection(selection_end, selection_end);
	};

	function createPreview(code,text){
		var selection_start = $("#code_id").get_selection_start();
		var selection_end = $("#code_id").get_selection_end();
		code_field.innerHTML = code.value;   // paste the value
		if(isIE)
		{
			var count=0;
			var i=0;
			//find all \n
			while (x != -1) {
					var c = text;
					var x = c.indexOf("\n",i);
					if (x>=selection_start)
					{
						x=-1;
					}
					i=x+1;
					count++;
				} 
			$("#code_id").set_selection((selection_start-count+1), (selection_start-count+1));
		}else{
			$("#code_id").set_selection(selection_start, selection_end);
		}
			
		for (var i=0; i<language_select.length;i++)
		{
			if (language_select.options[i].text == code.language)
			{
				curLang = code.language;
				language_select.selectedIndex = i;
			}	
		}
		updateScroll();
		updateScroll();
	};
	
	function createHTML(code){
		var tab_rep_count = $("#tab_replace_id").val();
		if(tab_rep_count == 2)
		{
			for (var i=0;i<code.length;i++)
			{
				//code = code.replace("\t","&emsp;&emsp;");
				code = code.replace("\t","&nbsp;&nbsp;");
				code = code.replace("\n","<br>");
			}
		}else if (tab_rep_count == 4) {
			for (var i=0;i<code.length;i++)
			{
				//code = code.replace("\t","&emsp;&emsp;&emsp;&emsp;");
				code = code.replace("\t","&nbsp;&nbsp;&nbsp;&nbsp;");
				code = code.replace("\n","<br>");
			}
		}
		_htmlPast = "<!DOCTYPE html>\
			<html lang=\"en\"> \
				<head>\
					<meta charset=\"UTF-8\"> \
					<style>\
					body {\
						background-color: black;\
					}\
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
				<body style = white-space: pre; background-color:'" + container.style.background + "'; font-family: Consolas\">" + code.trim(); + "</body>\
			</html>"; 
	};

	$.fn.get_selection_start = function(){
		var result = this.get(0).selectionStart;
		if (typeof(result) == "undefined") result = this.get_selection_range().selection_start;
		return result;
	};
	
	$.fn.get_selection_end = function(){
		var result = this.get(0).selectionEnd;
		if (typeof(result) == "undefined") result = this.get_selection_range().selection_end;
		return result;
	};
	
	$.fn_get_selected_text = function(){
		var value = this.get(0).value;
		if (typeof(value) == "undefined"){
			var result = this.get_selection_range().selected_text;
		}else{
			var result = value.substring(this.selectionStart, this.selectionEnd);
		}
		return result;
	};
	
	$.fn.get_selection_range = function(){
		var range = window.getSelection().getRangeAt(0);
		var cloned_range = range.cloneRange();
		cloned_range.selectNodeContents(this.get(0));
		cloned_range.setEnd(range.startContainer, range.startOffset);
		var selection_start = cloned_range.toString().length;
		var selected_text = range.toString();
		var selection_end = selection_start + selected_text.length;
		var result = {
			selection_start: selection_start,
			selection_end: selection_end,
			selected_text: selected_text
		}
		return result;
	};

	$.fn.set_selection = function(selection_start, selection_end){
		var target_element = this.get(0);
		selection_start = selection_start || 0;
		if (typeof(target_element.selectionStart) == "undefined"){
			if (typeof(selection_end) == "undefined") selection_end = target_element.innerHTML.length;
	
			var character_index = 0;
			var range = document.createRange();
			range.setStart(target_element, 0);
			range.collapse(true);
			var node_stack = [target_element];
			var node = null;
			var start_found = false;
			var stop = false;
	
			while (!stop && (node = node_stack.pop())) {
				if (node.nodeType == 3){
					var next_character_index = character_index + node.length;
					if (!start_found && selection_start >= character_index && selection_start <= next_character_index){
						range.setStart(node, selection_start - character_index);
						start_found = true;
					}
					
					if (start_found && selection_end >= character_index && selection_end <= next_character_index){
						range.setEnd(node, selection_end - character_index);
						stop = true;
					}
					character_index = next_character_index;
				}else{
					var child_counter = node.childNodes.length;
					while (child_counter --){
						node_stack.push(node.childNodes[child_counter]);
					}
				}
			}
			
			var selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}else{
			if (typeof(selection_end) == "undefined") selection_end = target_element.value.length;
		target_element.focus();
		target_element.selectionStart = selection_start;
			target_element.selectionEnd = selection_end;
		}
	};

	function cancelEvent(e){
		if (e && e.preventDefault) {
			e.stopPropagation(); // DOM style (return false doesn't always work in FF)
			//e.preventDefault(e);	//maybe working in ff
			e.preventDefault();
		}
		else {
			window.event.cancelBubble = true;//IE stopPropagation
		}
	};
	window.Asc.plugin.button = function(id)
	{
		if(id==0)
		{
			createHTML(code_field.innerHTML);
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