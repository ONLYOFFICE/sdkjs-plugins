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
	var inputSerch;
	var isInit = false;
	var isInitp = false;
	var predata = "";
	
	$(document).ready(function () {
		//event mouseout
		$('body').on('mouseout', '.label-words', function() {
			$(this).removeClass('label-selected');
		});
		//event mouseover
		$('body').on('mouseover', '.label-words', function() {
			$(this).addClass('label-selected');
			//$(this).toggleClass("label-selected");
			});
			//event click
		$('body').on('click', '.label-words', function() {
			var _htmlPaste = "<span >" + $(this).text() +" "+ "</span>";
			window.Asc.plugin.executeMethod("PasteText", [$(this).text() +" "]);	
		});
		//event button click
		button = document.getElementById("btn_search");
		button.onclick = function() {
			synonim_data = inputSerch.value;
			if ((null!=synonim_data) && (predata != synonim_data))
			{
				$('#global').empty(); // cleared global div
				synonim();
			}
			if (!isInit)
			{
				var container = document.getElementById('scrollable-container-id');
				Ps.initialize(container, {
					theme : 'custom-theme'
				});
				window.onresize = function()
				{
					updateScroll();
				};
				updateScroll();
				isInit = true;
			}
		};
	});	

	function synonim()
		{
			if (!isInit)
			{
				var container = document.getElementById('scrollable-container-id');
				Ps.initialize(container, {
					theme : 'custom-theme'
				});
				updateScroll();
				updateScroll();
				isInit = true;
			}
			predata = synonim_data;
			var xhr = new XMLHttpRequest();
			var req_text = decodeURIComponent(synonim_data.replace('%0D%0A', ' ')).trim() ;
			var _url = `https://words.bighugelabs.com/api/${version}/${ApiKey}/${req_text}/${SynonimFormat}`;
			xhr.open('POST', _url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 404)
				{
					$('#global').append("<h3 id = \"not_found\" class = \"not-found\">This word not found</h3>");
					//if synonym not found
					updateScroll();
					updateScroll();
				}
				if (this.readyState == 4 && this.status == 200  && !closed)
				{
					try
					{
						var _obj  = JSON.parse(this.responseText);
						if (_obj.noun)			//if noun exist
						{
							drawWords(_obj.noun,"Noun");
						}
						if(_obj.adjective)		//if andjective exist
						{
							drawWords(_obj.adjective,"Adjective")
						}
						if(_obj.verb)		//if verb exist
						{
							drawWords(_obj.verb,"Vebr")
						}
						updateScroll();
						updateScroll();
					}
					catch (err)
					{
					}
				}
				else if (401 == this.readyState || 500 == this.readyState || 403 == this.status)
				{
					synonim();
				}
			};
			xhr.send(null);
		
		}

	window.Asc.plugin.init = function(text)
	{
		if (!isInitp)
		{
			inputSerch = document.getElementById("inp_search");
			inputSerch.value = text;
			synonim_data = text;
			if (null!=synonim_data)
				synonim();
			window.onresize = function()
			{
				updateScroll();
				updateScroll();
			};
		}
		else
		{
			inputSerch.value = text;
			synonim_data = text;
			if (null == synonim_data)
			{
				synonim();
			}
			else if (predata == synonim_data)
			{
				return;
			}
			else {
				$('#global').empty(); // cleared global div
				synonim();
			}
		}
		isInitp = true;
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
	
	//draws the structure of the plugin
	function drawWords(response, type) 
		{
			$('#global').append("<h3 class = \"not-found\">" + type + "</h3>");
			$('#global').append("<div id = " + type + " ></div>");
			if (response.syn && response.syn.length)
			{
				$("#"+type).append("<div id =\""+ type +"-synonims\" class = \"div-words\"></div>");
				for (let i=0; i<response.syn.length; i++)
				{
					$('#'+ type +'-synonims').append("<label class =\"label-words\">"+ response.syn[i] +"</label>");
				}
			}
			if(response.ant && response.ant.length)
			{
				$("#"+type).append("<h4 class = \"not-found\">Antonyms</h4>");
				$("#"+type).append("<div id =\""+ type +"-antonyms\" class = \"div-words\"></div>");
				for (let i=0; i<response.ant.length; i++)
				{
					$('#'+ type +'-antonyms').append("<label class =\"label-words\">"+ response.ant[i] +"</label>");
				}
			}
		}

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
		  
})(window, undefined);