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
		var isBreakSynonime = false;
		var data = [];		//Fonts storage
		var isFontInit = false;		//font initialization flag
		var breakTimeoutId = -1;
		var isInit = false;

		window.Asc.plugin.onMethodReturn = function(returnValue)
		{
		   $(document).ready(function () {

			   var oCurFont, oLastFont;
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
			function InitFont ()
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
	
		
		function synonim()
		{
			isBreakSynonime = false;
			if (-1 != breakTimeoutId)
			{
				clearTimeout(breakTimeoutId);
				breakTimeoutId = -1;
			}
	
			if (synonim_data == "")
				return;

			if (!synonim_data)
				return;
	
			var _text = synonim_data;
			
			if (_text == "")
				return synonim();
		
			var xhr = new XMLHttpRequest();
			var req_text = decodeURIComponent(_text.replace('%0D%0A', ' ')).trim() ;
			var _url = `https://words.bighugelabs.com/api/${version}/${ApiKey}/${req_text}/${SynonimFormat}`;
			xhr.open('POST', _url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 404)
				{
					//if synonims/antonims not found
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
						var _text = getSynonim(_obj); 	//take synonims
						var _antonim = getAntonym(_obj);	//take antonyms
						var _select1 = document.getElementById("synonim_id");	//synonims
						var _select2 = document.getElementById("antonym_id");	//antonims
						var _font = document.getElementById("font-select");		//font
						var _synonim = "";	
						var _ant = "";
	
						
							// if _text !=null
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
								_select1.innerHTML ="<option value='" + req_text + "'>" + req_text + "</option>";
							}
							// if _antonim !=null
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
								sFont = _font.options[_font.selectedIndex].text;	//take selected font
      							var _htmlPaste = "<span style=\"font-family:'" + sFont + "'\">" + _select1.options[_select1.selectedIndex].text +" "+ "</span>";
								window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
							 };
							 _select2.onchange = function(e) { 
								sFont = _font.options[_font.selectedIndex].text;
								var _htmlPaste = "<span style=\"font-family:'" + sFont + "'\">" + _select2.options[_select2.selectedIndex].text +" "+ "</span>";
								window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
							 };
							
						
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
					synonim();
				}
			};
			xhr.send(null);
		
		}
	
		window.Asc.plugin.init = function(text)
		{
			window.Asc.plugin.executeMethod("GetFontList");
			text = text.replace(/;/g, "%3B");
			synonim_data = text;
			if (!isInit)
			{
				synonim();	
			}
			else
			{
				if (null == synonim_data)
				{
					synonim();
				}
				else
				{
					isBreakSynonime = true;
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
			let temp_syn = []; // array for synonims
			if (responceObj.verb || responceObj.noun) {
				if((responceObj.verb.syn && responceObj.verb) && (responceObj.noun && responceObj.noun.syn))
					temp_syn = temp_syn.concat(responceObj.verb.syn, responceObj.noun.syn);   // if you want more synonims you should concat all items
				if ((responceObj.verb.syn && responceObj.verb) && (!temp_syn.length))
					temp_syn = temp_syn.concat(temp_syn, responceObj.verb.syn);
				if ((responceObj.noun && responceObj.noun.syn) && (!temp_syn.length))
					temp_syn = temp_syn.concat(temp_syn, responceObj.noun.syn);		
			} 
			else if (responceObj.adjective && responceObj.adjective.sim) {
				temp_syn = temp_syn.concat(temp_syn, responceObj.adjective.sim);
			}
			else {
				return;
			}
			return temp_syn;
		};
		
		//return array antonyms
		function getAntonym(responceObj) {
			let temp_ant = [];	// array for antonyms
			if (responceObj.verb || responceObj.noun) {
				if((responceObj.verb.ant && responceObj.verb) && (responceObj.noun && responceObj.noun.ant))
					temp_ant = temp_ant.concat(responceObj.verb.ant, responceObj.noun.ant);   // if you want more antonyms you should concat all items
				if ((responceObj.verb.ant && responceObj.verb) && (!temp_ant.length))
					temp_ant = temp_ant.concat(temp_ant, responceObj.verb.ant);
				if ((responceObj.noun && responceObj.noun.ant) && (!temp_ant.length))
					temp_ant = temp_ant.concat(temp_ant, responceObj.noun.ant);		
			} 
			else if (responceObj.adjective && responceObj.adjective.ant) {
				temp_ant = temp_ant.concat(temp_ant, responceObj.adjective.ant);
			}
			else {
				return;
			}
			return temp_ant;
		};
			  
	})(window, undefined);