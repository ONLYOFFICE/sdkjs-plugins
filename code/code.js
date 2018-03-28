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
		style_select,						//select for style
		style_value,						//current value style
		curLang,							//current language
		code_field,							//field for higlight code		
		container,							//scrollable conteiner	
		timer,								//for timer 
		f_Paste = false;					//flag paste 
	const isIE = checkInternetExplorer();	//check IE

	var myscroll = window.Asc.ScrollableDiv;

	window.Asc.plugin.init = function(text){	
		myscroll = window.Asc.ScrollableDiv;
		myscroll.create_div("TabColor",{
					width: "",
					height: "",
					left: "10px",
					right: "10px",
					top: "90px",
					bottom: "5px"
		});
		myscroll.addEventListener();
		code_field = document.getElementById("conteiner_id1");
		container = document.getElementById('scrollable-container-id1');
		$(container).addClass('codefield');
		$(code_field).addClass('content');
		$(container).addClass('hljs');
		language_select = document.getElementById("language_id");
		style_select = document.getElementById("style_id");
		var background_color = document.getElementById("background_color");
		var temp_code,
			flag = false;	//flag change code (true = changed)

		if (!isIE)
		{
			document.getElementById("btn_highlight").style.display ="none";
			document.getElementById("language_id").style.flex ="1";
		}

		if (isIE)
			document.getElementById("tabselect").style.display ="none";

		background_color.onchange = function () {
			container.style.background = background_color.value;
		};

		if (!isInitLang)
		{
			initLang();
			window.Asc.plugin.loadModule("./highlight/styles/googlecode.css", function(content){
				style_value = content;
				background_color.value = hexc($(container).css('backgroundColor'));
			});
		}

		function hexc (colorval) {
			var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			delete(parts[0]);
			for (var i = 1; i <= 3; ++i) {
				parts[i] = parseInt(parts[i]).toString(16);
				if (parts[i].length == 1) parts[i] = '0' + parts[i];
			}
			return ('#' + parts.join(''));
		}

		curLang = language_select.options[language_select.selectedIndex].text;		//get current language
		language_select.onchange = function() {
			text = code_field.innerText;
			curLang = language_select.options[language_select.selectedIndex].text;		// change current language
			ChangeCode(curLang);
			flag = true;
		};
		
		style_select.onchange = function(){
			document.getElementById("style").href = "highlight/styles/" + style_select.options[style_select.selectedIndex].value;
			window.Asc.plugin.loadModule("./highlight/styles/" + style_select.options[style_select.selectedIndex].value , function(content){
				style_value = content;
				background_color.value = hexc($(container).css('backgroundColor'));
			});
		}

		function deleteSelected(start,end) {
			text = code_field.innerText;
			text = text.substring(0,start) + text.substring(end);
			clearTimeout(timer);
			timer = setTimeout(ChangeCode,35,curLang);
		};

		if (!flag)
		{ 
			text = text.replace(/<span style="mso-tab-count:1;">	<\/span>/g,"%%%bpmn%%%");
			text = text.replace(/<p/g,"<div");
			text = text.replace(/<\/p>/g,"</div>");
			code_field.focus();
			code_field.innerHTML = text;
			text = code_field.innerText;
			code_field.innerText = text;
			text = code_field.innerHTML;
			text = text.replace(/%%%bpmn%%%/g,"\t");
			//text = text.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g,"\t");
			code_field.innerHTML = "";
			text = text.replace(/&nbsp;/g," ");
			text = text.replace(/<br>/g,"\n");
			text = text.replace(/&lt;/g,"<");
			text = text.replace(/&gt;/g,">");
			ChangeCode(curLang);
		}

		function ChangeCode(curLang){
			if ((curLang == "Auto") && text)
			{
				temp_code = hljs.highlightAuto(text, language);
				createPreview(temp_code,text);
			}else if (text) 
			{
				temp_code = hljs.highlight(curLang, text, true, 0);
				createPreview(temp_code,text);
			}else
			{
				code_field.innerHTML = "";
			}
		};	

		$("#conteiner_id1").keydown(function(event){
			if( (event.keyCode == 13) && !isIE )
			{	
				cancelEvent(event);
				var range = $("#conteiner_id1").get_selection_range();
				if (range.end == code_field.innerText.length)
					insertHTML("\n");

				insertHTML("\n");
				deleteSelected(range.start+1,range.end+1);
				myscroll.updateScroll(code_field);
				myscroll.updateScroll(code_field);
				$("#conteiner_id1").set_selection(range.start+1, range.start+1);
			}
			if( (event.keyCode == 9) && !isIE )
			{ 
				cancelEvent(event);
				tab_untab(event);
				myscroll.updateScroll(code_field);
				myscroll.updateScroll(code_field);
			}
		});

		function tab_untab(event){
			let one_line = false;
			let right_tab = false;
			var range = $("#conteiner_id1").get_selection_range();
			text = $("#conteiner_id1").text();
			let substr_left = text.substring(range.start,range.start-1);
			let substr_right = text.substring(range.start,range.end+1);
			if((substr_left =="\t" && event.shiftKey))
				range.start--;
			let start = range.start;
			let end = range.end;
			let arr = text.substring(range.start,range.end);
			arr = arr.split("\n");

			if(!event.shiftKey)
			{
				if(range.start!=range.end)
					one_line = true;
				for (let i in arr) {
					arr[i] = '\t' + arr[i];
					end++;
					if(i==0)
						start++;
				}
			}else{
				if((end==0) && (start==0) && (text.substring(0,1) == "\t") )
				{
					text = text.substring(1);
					code_field.innerText= text;
					ChangeCode(curLang);
					return;
				}
				if (range.start!=range.end)
					for (let i in arr)
						if (arr[i][0] == "\t")
							one_line = true;	
				if((substr_left != "\t") && !one_line && (substr_left != "\n") && (substr_right != "\t"))
					return;
				if((substr_left == "\t") && !one_line && arr.length>1)
					end--;
				if(((range.start == range.end) || !one_line) && (substr_left != "\n") && (substr_right != "\t"))
					range.start--;
				for (let i in arr) {
					if ( text.substring(range.end,range.end+1) == '\t')
					{
						text = text.slice(0, range.end) + text.slice((range.end+1));
						right_tab = true;
						continue;
					}
						if (arr[i][0] == '\t')
						arr[i] = arr[i].substr(1);
					else if (arr.length>1)
						end++;
					if(substr_left != "\n")
						end--;
				}
			}
			arr = arr.join('\n');
			text = text.slice(0, range.start) + arr + text.slice(range.end);
			range.start = range.start != range.end ? range.start : end;
			range.end = end;
			if(right_tab)
				range.start = end;
			if(!event.shiftKey && one_line)
				range.start= start;
			code_field.innerText= text;
			ChangeCode(curLang);
			$("#conteiner_id1").set_selection(range.start, range.end);
		};
		
		document.getElementById("btn_highlight").onclick = function(event){
			text = code_field.innerHTML;
			if( text != code_field.innerText )
			{
				text = text.replace(/<p/g,"<div");
				text = text.replace(/<\/p>/g,"</div>");	
			}
			code_field.innerHTML = text;
			text = code_field.innerText;
			ChangeCode(curLang);
		};

		document.addEventListener('paste', function(){
			var range = $("#conteiner_id1").get_selection_range();
			text = code_field.innerText.substring(0,range.start) + "%%%bpmn%%%" + code_field.innerText.substring(range.end);
			f_Paste = true;
			code_field.innerHTML ="";
		});

		$("#conteiner_id1").on("input", function(event){
			if(f_Paste){
				grab();
				f_Paste = false;
				return;
			}
			clearTimeout(timer);
			if (!isIE)
				timer = setTimeout(grab,1000);
		});

		function grab(){
			if(f_Paste)
			{
				let count = code_field.innerHTML;
				if( count != code_field.innerText )
				{
					count = count.replace(/<p/g,"<div");
					count = count.replace(/<\/p>/g,"</div>");
				}
				code_field.innerHTML = count;
				count = code_field.innerText;
				count = count.substring(0);
				count = count.split("\n");
				if (navigator.userAgent.search(/Firefox/) <= 0)
					if(count[count.length-1] == "")
						count.pop();
				text = text.replace(/&nbsp;/g," ");
				text = text.split("%%%bpmn%%%");
				let new_text = text[0] + count.join('\n') + text[1];
				if (navigator.userAgent.search(/Firefox/) > 0)
					new_text = new_text.replace(/\n/g,"╫");
				code_field.innerText = new_text;
				var start = (new_text.length - text[1].length);
				$("#conteiner_id1").set_selection((start), (start));
				text = code_field.innerText;
				if (navigator.userAgent.search(/Firefox/) > 0)
					text = text.replace(/╫/g,"\n");
				ChangeCode(curLang);
			}else{
				var range = $("#conteiner_id1").get_selection_range();
				text = code_field.innerHTML;
				code_field.innerHTML = text;
				text = code_field.innerText;
				ChangeCode(curLang);
				$("#conteiner_id1").set_selection(range.start, range.start);
			}
		};
		
		window.Asc.plugin.resizeWindow(800, 600, 800, 600, 0, 0);				//resize plugin window		
		
		window.onresize = function(){
			myscroll.updateScroll(code_field);
			myscroll.updateScroll(code_field);
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
		var range = $("#conteiner_id1").get_selection_range();
		$("#conteiner_id1").set_selection(range.end, range.end);
	};

	function createPreview(code,text){
		var range = $("#conteiner_id1").get_selection_range();
		code_field.innerHTML = code.value;   // paste the value
		if(isIE)
		{
			document.getElementById("btn_highlight").focus();
		}else{
			$("#conteiner_id1").set_selection(range.start, range.end);
		}
			
		for (var i=0; i<language_select.length;i++)
		{
			if (language_select.options[i].text == code.language)
			{
				curLang = code.language;
				language_select.selectedIndex = i;
			}	
		}
		myscroll.updateScroll(code_field);
		myscroll.updateScroll(code_field);
	};
	
	function createHTML(code){
		var tab_rep_count = $("#tab_replace_id").val();
		if(tab_rep_count == 2)
		{
			code = code.replace(/\t/g,"&nbsp;&nbsp;");
		}else if (tab_rep_count == 4) {
			code = code.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
		}
		else{
			code = code.replace(/\t/g,"<span style='mso-tab-count:1'></span>");
		}
		code = code.split("\n");
		for (var i in code)
			if ( code[i] == "" )
				{code[i] = "<p>&nbsp</p>"}
			else
				{code[i] = "<p>" +code[i] + "</p>"}
		if (code[code.length-1] == "<p>&nbsp</p>")
			code.pop();
		window.Asc.plugin.executeMethod("PasteHtml",['<html lang=\"en\"><head><style> p{background:'+background_color.value+'}'+style_value +'</style></head><body><div style = \"white-space: pre;\"><span style =\"font-size:12pt;\">'+code.join("")+'</span></div></body></html>']);
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