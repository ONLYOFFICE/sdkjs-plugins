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
		_htmlPast,							//for paste in document
		curLang,							//current language
		code_field,							//field for higlight code		
		container,							//scrollable conteiner	
		timer,								//for timer 
		lockMouseInterval = -1,				//for scroll
		mousePos = { x : 0, y : 0 };		//for scroll

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

	function updateScroll()
	{
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
		container = document.getElementById('scrollable-container-id');
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
			Ps.initialize(container, {
				theme : 'custom-theme'
			});
		}

		curLang = language_select.options[language_select.selectedIndex].text;		//get current language
		language_select.onchange = function(e) {
			text = code_field.innerText;
			curLang = language_select.options[language_select.selectedIndex].text;		// change current language
				ChangeCode(curLang);
				flag = true;
		};

		function deleteSelected(start,end) {
			text = code_field.innerText;
			text = text.substring(0,start) + text.substring(end);
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
			{	cancelEvent(event);
				var range = $("#code_id").get_selection_range();
				if (range.end == code_field.innerText.length)
					insertHTML("\n");

				insertHTML("\n");
				deleteSelected(range.start+1,range.end+1);
				$("#code_id").set_selection(range.start+1, range.start+1);
			}
			if( (event.keyCode == 9) && !isIE )
			{ 
				cancelEvent(event);
				insertHTML("\t");
				updateScroll();
				updateScroll();
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

		function grab(){
			if (!isIE)
			{
				create_loader();
				var range = $("#code_id").get_selection_range();
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
				$("#code_id").set_selection(range.start, range.start);
				$(".loader").delay(100).fadeOut();
			}
		}
		function create_loader(){
			let loader = document.getElementById("loader");
			loader.style.display ="block"; 
			loader.style.padding = "40% 0 0 50%";   
		}
		window.Asc.plugin.resizeWindow(880, 600, 860, 400, 0, 0);				//resize plugin window		
		
		window.onresize = function(){
				updateScroll();
				updateScroll();
		};

		code_field.onmousedown = function(e) {
		
			if (-1 == lockMouseInterval)
				lockMouseInterval = setInterval(onSelectWheel, 40);
			
			mousePos.x = e.pageX || e.clientX;
			mousePos.y = e.pageY || e.clientY;
					
		};
		code_field.onmouseup = function(e) {
			
			if (-1 != lockMouseInterval)
				clearInterval(lockMouseInterval);
			lockMouseInterval = -1;
			
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

	function onSelectWheel()
		{
			var $textElem = $(code_field);
			var position = $textElem.offset();
			
			var width = $textElem.outerWidth();
			var height = $textElem.outerHeight();
			
			var maxX = container.scrollWidth;
			var maxY = container.scrollHeight;
					
			var scrollX = container.scrollLeft;
			var scrollY = container.scrollTop;
			
			var left = position.left + scrollX;
			var top = position.top + scrollY;
			
			var step = 20;
			if (mousePos.x < left)
				scrollX -= step;
			else if (mousePos.x > (left + width))
				scrollX += step;
			if (mousePos.y < top)
				scrollY -= step;
			else if (mousePos.y > (top + height))
				scrollY += step;
			
			if (scrollX < 0)
				scrollX = 0;
			if (scrollX > maxX)
				scrollX = maxX;
			if (scrollY < 0)
				scrollY = 0;
			if (scrollY > maxY)
				scrollY = maxY;
			
			container.scrollLeft = scrollX;
			container.scrollTop = scrollY;
			
			Ps.update(container);
		}
	
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
		var range = $("#code_id").get_selection_range();
		$("#code_id").set_selection(range.end, range.end);
	};

	function createPreview(code,text){
		var range = $("#code_id").get_selection_range();
		code_field.innerHTML = code.value;   // paste the value
		if(isIE)
		{
			var count=0;
			var i=0;
			//find all \n
			while (x != -1) {
					var c = text;
					var x = c.indexOf("\n",i);
					if (x>=range.start)
					{
						x=-1;
					}
					i=x+1;
					count++;
				} 
			document.getElementById("btn_highlight").focus();
			//$("#code_id").set_selection((range.start-count+1), (range.start-count+1));
		}else{
			$("#code_id").set_selection(range.start, range.end);
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

	$.fn.get_selection_range = function(){
		var range = window.getSelection().getRangeAt(0);
		var cloned_range = range.cloneRange();
		cloned_range.selectNodeContents(this.get(0));
		cloned_range.setEnd(range.startContainer, range.startOffset);
		var start = cloned_range.toString().length;
		var selected_text = range.toString();
		var end = start + selected_text.length;
		var result = {
			start: start,
			end: end,
			selected_text: selected_text
		}
		return result;
	};

	$.fn.set_selection = function(start, end){
		var target_element = this.get(0);
		start = start || 0;
		if (typeof(target_element.selectionStart) == "undefined"){
			if (typeof(end) == "undefined") end = target_element.innerHTML.length;
	
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
					if (!start_found && start >= character_index && start <= next_character_index){
						range.setStart(node, start - character_index);
						start_found = true;
					}
					
					if (start_found && end >= character_index && end <= next_character_index){
						range.setEnd(node, end - character_index);
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
			if (typeof(end) == "undefined") end = target_element.value.length;
		target_element.focus();
		target_element.selectionStart = start;
			target_element.selectionEnd = end;
		}
	};

	function cancelEvent(e){
		if (e && e.preventDefault) {
			e.stopPropagation(); // DOM style (return false doesn't always work in FF)
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

	window.addEventListener('mousemove', function(e) {
		
		if (-1 == lockMouseInterval)
			return;
		
		mousePos.x = e.pageX || e.clientX;
		mousePos.y = e.pageY || e.clientY;
	
	}, false);
	
	window.addEventListener('mouseup', function() {
		
		if (-1 != lockMouseInterval)
			clearInterval(lockMouseInterval);
		lockMouseInterval = -1;
		
	}, false);

})(window, undefined);