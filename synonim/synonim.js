(function(window, undefined){
	
		window.oncontextmenu = function(e)
		{
			if (e.preventDefault)
				e.preventDefault();
			if (e.stopPropagation)
				e.stopPropagation();
			return false;
		};
		
		var ApiKey = '34aacef03e39ff2e622f10d1fc5313f3'; // generated APi key on bighugelabs.com
		var SynonimFormat = 'json';
		var version = 2;

		var synonim_data = "";
		var synonim_data_send = null;
		var isBreakSynonime = false;
		var data = [];		//Font storage
		var isFontInit = false;
		var breakTimeoutId = -1;

	
		var isInit = false;
	
		function updateScroll()
		{
			var container = document.getElementById('scrollable-container-id');
			Ps.update(container);
			if($('.ps__scrollbar-y').height() === 0){
				$('.ps__scrollbar-y').css('border-width', '0px');
			}
			else{
				$('.ps__scrollbar-y').css('border-width', '1px');
			}
		}
	
	
		function getSynonimArray(data)
		{
			var return_array = [];
			// split by max_size
			var max_size = 9000;
			var index = 0;
			var test_border = max_size - 500;
	
			var chars = [".", "%2C", "%20"];
	
			while (data.length > max_size)
			{
				for (var i = 0; i < chars.length; i++)
				{	
					index = data.lastIndexOf(chars[i], max_size);
	
					if (index > test_border)
					{
						index += chars[i].length;
						break;
					}
					else
					{
						index = max_size;
					}
				}
	
				return_array.push(data.substr(0, index));
				data = data.substr(index);
			}
	
			return_array.push(data);
	
			return { parts : return_array, current : 0 };
		}

		window.Asc.plugin.onMethodReturn = function(returnValue)
		{
		   $(document).ready(function () {

			   var oCurFont, oLastFont;
			   //var data = [];
			   var oFontsByName = {};
			   var sCurFontNameInMap;
			   for(var i = 0; i < returnValue.length; ++i){
				   oCurFont = returnValue[i];
				   sCurFontNameInMap = oCurFont.m_wsFontName;
				   oLastFont = oFontsByName[sCurFontNameInMap];
				   if(!oLastFont){
					   oFontsByName[sCurFontNameInMap] = oCurFont;
				   }
				   else{
					   if(oLastFont.m_bBold && oLastFont.m_bItalic){
						   oFontsByName[sCurFontNameInMap] = oCurFont;
					   }
					   else if(oLastFont.m_bBold && !oCurFont.m_bBold){
						   oFontsByName[sCurFontNameInMap] = oCurFont;
					   }
					   else if(oLastFont.m_bItalic && !oCurFont.m_bBold && !oCurFont.m_bItalic){
						   oFontsByName[sCurFontNameInMap] = oCurFont;
					   }
				   }
			   }
			   delete oFontsByName['ASCW3'];
			   for(var key in oFontsByName){
				   if(oFontsByName.hasOwnProperty(key)){
					   data.push(oFontsByName[key]);
				   }
			   }
			    
		   });

		   if (!isFontInit)
		   {
			   InitFont();
		   }
			   function	InitFont ()
		   		{
		  			 //initialize params
		   			aFontSelects = data;	  
		   			//fill fonts combo box
		   			var oFontSelector = $('#font-select');
            		oFontSelector.empty();
            		var oOption;
            		for(i = 0; i < aFontSelects.length; ++i){
                	oOption = $('<option></option>');
                	oOption.attr('value', i);
                	oOption.text(aFontSelects[i].m_wsFontName);
                	oFontSelector.append(oOption);
					}
					isFontInit = true;
				}
			
		}
	
		function synonimIter()
		{
			if (!synonim_data_send)
				return;
	
			if (synonim_data_send.current >= synonim_data_send.parts.length)
			{
				synonim_data_send = null;	
	
				document.getElementById("id_progress").style.display = "none";
	
				return;
			}
	
			var _text = synonim_data_send.parts[synonim_data_send.current];
			synonim_data_send.current++;
	
			if (_text == "")
				return synonimIter();
	
			if (synonim_data_send.parts.length != 1)
			{
				document.getElementById("id_progress").style.display = "block";
				var _cur = (100 * synonim_data_send.current / synonim_data_send.parts.length) >> 0;
				if (_cur > 100)
					_cur = 100;
				document.getElementById("id_progress").style.width = _cur + "%";
			}
	
			var xhr = new XMLHttpRequest();
			var req_text = decodeURIComponent(_text.replace('%0D%0A', ' ')).trim() ;
			var _url = `https://words.bighugelabs.com/api/${version}/${ApiKey}/${req_text}/${SynonimFormat}`;
			xhr.open('POST', _url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 404)
				{
					var _select1 = document.getElementById("synonim_id");
					_select1.innerHTML = "<option value='" + req_text + "'>" + req_text + "</option>";
					var _select2 = document.getElementById("antonym_id");
					_select2.innerHTML = "<option value='" + req_text + "'>" + req_text + "</option>";
					
				}
				if (this.readyState == 4 && this.status == 200  && !closed)
				{
					try
					{
						if (isBreakSynonime)
						{
							synonim();
							return;
						}
	
						var _obj  = JSON.parse(this.responseText);
						var _text = getSynonim(_obj); 
						var _antonim = getAntonym(_obj);
						var _select1 = document.getElementById("synonim_id");
						var _select2 = document.getElementById("antonym_id");
						var _font = document.getElementById("font-select");
						var _synonim = "";
						var _ant = "";
	
						if (1 == synonim_data_send.current)
						{
							if(_text)
							{
								for (var i = 0; i < _text.length; i++)
								{
									_synonim += ("<option value=\"" + (i + 1) + "\">" + _text[i] + "</option>");
								}
								_select1.innerHTML ="<option value='" + req_text + "'>" + req_text + "</option>" + _synonim;
							}
							else 
							{
								_select1.innerHTML ="<option value='" + req_text + "'>" + req_text + "</option>" + _synonim;
							}
							
							if(_antonim)
							{
								for (var i = 0; i < _antonim.length; i++)
								{
								_ant += ("<option value=\"" + (i + 1) + "\">" + _antonim[i] + "</option>");
								}
								_select2.innerHTML ="<option value='" + req_text + "'>" + req_text + "</option>" + _ant;
							}
							else
							{
								_select2.innerHTML ="<option value='" + req_text + "'>" + req_text + "</option>";
							}
							_select1.onchange = function(e) { 								
								sFont = _font.options[_font.selectedIndex].text;
      							var _htmlPaste = "<span style=\"font-family:'" + sFont + "'\">" + _select1.options[_select1.selectedIndex].text +" "+ "</span>";
								window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
							 };
							 _select2.onchange = function(e) { 
								sFont = _font.options[_font.selectedIndex].text;
								var _htmlPaste = "<span style=\"font-family:'" + sFont + "'\">" + _select2.options[_select2.selectedIndex].text +" "+ "</span>";
								window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
							 };
							
						}
						else
						updateScroll();
						synonimIter();
					}
					catch (err)
					{
					}
				}
				else if (401 == this.readyState || 500 == this.readyState || 403 == this.status)
				{
					
					if (isBreakSynonime)
					{
						synonim();
						return;
					}
					synonimIter();
				}
			};
			xhr.send(null);
		}
		
	
		function synonim()
		{
			isBreakSynonime = false;
			if (-1 != breakTimeoutId)
			{
				clearTimeout(breakTimeoutId);
				breakTimeoutId = -1;
			}
	
			
			updateScroll();
	
			if (synonim_data == "")
				return;
	
	
			synonim_data_send = getSynonimArray(encodeURIComponent(synonim_data));
	
			synonimIter();
		}
	
		window.Asc.plugin.init = function(text)
		{
			window.Asc.plugin.executeMethod("GetFontList");
			
			updateScroll();
	
			text = text.replace(/;/g, "%3B");
	
			synonim_data = text;
			if (!isInit)
			{
				var container = document.getElementById('scrollable-container-id');
				Ps.initialize(container, {
					theme : 'custom-theme'
				});
				synonim();	
				window.onresize = function()
				{
					updateScroll();
					
				};
			}
			else
			{
				if (null == synonim_data_send)
				{
					synonim();
				}
				else
				{
					isBreakSynonime = true;
	
					document.getElementById("id_progress").style.display = "block";
					breakTimeoutId = setTimeout(function() { synonim(); }, 5000);
				}
			}
			isInit = true;
		};
		
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
		//return array synonims
		function getSynonim(responceObj) {
			let j = [];
			if (responceObj.verb) {
				if(responceObj.verb.syn && (responceObj.noun && responceObj.noun.syn))
					return j.concat(responceObj.verb.syn, responceObj.noun.syn);
				return responceObj.verb.syn;			// if you want more synonyms you should concat all items
			} else if (responceObj.noun && responceObj.noun.syn) {
				return responceObj.noun.syn;	// if you want more synonyms you should concat all items
			}
			else if (responceObj.adjective && responceObj.adjective.sim) {
				return responceObj.adjective.sim;
			}
			else {
				return;
			}
		};
		
		//return array antonyms
		function getAntonym(responceObj) {
			if (responceObj.noun && responceObj.noun.ant) {
				return responceObj.noun.ant;			// if you want more antonyms you should concat all items
			} else if(responceObj.verb && responceObj.verb.ant) {
				return responceObj.verb.ant;	// if you want more antonyms you should concat all items
			}
			else if(responceObj.adjective && responceObj.adjective.ant) {
				return responceObj.adjective.ant;
			}
			else {
				return;
			}
		};
	
	})(window, undefined);