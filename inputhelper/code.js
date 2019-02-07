(function(window, undefined){

	window.isInit = false;
	window.isVisible = false;
	window.disableTargetChanged = false;

	window.Asc.plugin.onSelect = function(isAttackPaste)
	{
		var items = document.getElementsByTagName("li");
		var curIndex = -1;
		for (var i = 0; i < items.length; i++)
		{
			if (items[i].className == "li_selected")
			{
				curIndex = i;
				break;
			}
		}
		if (-1 != curIndex)
		{
			if (!window.currentContentControl || isAttackPaste)
			{
				window.Asc.plugin.executeMethod("PasteHtml", ["<span style=\"font-family:onlyofficeDefaultFont\">" + items[curIndex].innerHTML + "</span>"]);
				window.isVisible = false;
				window.Asc.plugin.executeMethod("UnShowInputHelper", [window.Asc.plugin.info.guid], function() { window.isVisible = false; });	
				
				window.disableTargetChanged = true;
				window.setTimeout(function() {
					window.disableTargetChanged = false;					
				}, 1000);
			}
			else
			{
				window.Asc.plugin.executeMethod("SelectContentControl",[window.currentContentControl], function(){
					window.Asc.plugin.onSelect(true);
				});
			}
		}
	};

	window.Asc.plugin.init = function(text)
	{
		if (!window.isInit)
		{
			if (false)
			{
				var xhr = new XMLHttpRequest();

				xhr.open('GET', "https://nct.onlyoffice.com/api/2.0/people", true); // TODO:
				if (xhr.overrideMimeType)
					xhr.overrideMimeType('text/plain; charset=x-user-defined');
				else
					xhr.setRequestHeader('Accept-Charset', 'x-user-defined');

				xhr.onload = function()
				{
					if (this.status == 200)
					{
						console.log(this);
					}
				};

				xhr.send(null);
			}
			
			window.onkeydown = function(e) {
				switch (e.keyCode)
				{
					case 27: // Escape
					{
						if (window.isVisible)
						{
							window.isVisible = false;
							window.Asc.plugin.executeMethod("UnShowInputHelper", [window.Asc.plugin.info.guid], function() { window.isVisible = false; });
						}
						break;
					}
					case 38: // Up
					case 40: // Down
					case 9: // Tab
					{
						var items = document.getElementsByTagName("li");
						var curIndex = -1;
						for (var i = 0; i < items.length; i++)
						{
							if (items[i].className == "li_selected")
							{
								curIndex = i;
								items[i].className = "";
								break;
							}
						}
						if (curIndex == -1)
						{
							curIndex = 0;
						}
						else
						{
							switch (e.keyCode)
							{
								case 38:
								{
									curIndex--;
									if (curIndex < 0)
										curIndex = 0;
									break;
								}
								case 40:
								{
									curIndex++;
									if (curIndex >= items.length)
										curIndex = items.length - 1;
									break;
								}
								case 9:
								{
									curIndex++;
									if (curIndex >= items.length)
										curIndex = 0;
									break;
								}
							}							
						}

						if (curIndex < items.length)
						{
							items[curIndex].className = "li_selected";

							var _currentOffset = items[curIndex].offsetTop;
							var _currentHeight = items[curIndex].offsetHeight;

							var container = document.getElementById("elements_area");
							var _currentScroll = container.scrollTop;
							if (_currentOffset < _currentScroll)
							{
								container.scrollTo(0, _currentOffset);
							}
							else if ((_currentScroll + container.offsetHeight) < (_currentOffset + _currentHeight))
							{
								container.scrollTo(0, _currentOffset - (container.offsetHeight - _currentHeight));
							}
						}
						break;
					}
					case 13:
					{
						window.Asc.plugin.onSelect();						
						break;
					}
				}

				if (e.preventDefault)
					e.preventDefault();
				if (e.stopPropagation)
					e.stopPropagation();
				return false;
			};

			window.onresize = function(e)
			{
				window.Asc.plugin.PS.update();
				window.Asc.plugin.PS.update();
			};

			window.onitemclick = function(e)
			{
				var items = document.getElementsByTagName("li");
				for (var i = 0; i < items.length; i++)
				{
					items[i].className = "";
				}
				e.target.className = "li_selected";
				window.Asc.plugin.onSelect();
			};

			this.PS = new PerfectScrollbar(document.getElementById("elements_area"), { 
				minScrollbarLength: 20
			});
			this.PS.update();
			window.isInit = true;
		}
	};
	
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

	window.Asc.plugin.event_onTargetPositionChanged = function()
	{
		if (window.disableTargetChanged)
			return;

		window.Asc.plugin.executeMethod("GetCurrentContentControl", [], function(obj){
			
			window.currentContentControl = "" + obj;
			switch (window.currentContentControl)
			{
				case "428":
				{
					var items = [
						"Svetlana.Maleeva", "Kirill.Volkov", "galina.goduhina", "Alexander.Galkin", "Olga.Golubeva", "Natalya.Busleeva", "mikola_world", "Lena.Nagaeva", "Pavel.Rogozhin", "Alexey.Micheev", "egor.rozhnetsov", "Denis.Spitsyn", "Tatiana.Kljazmina", "Vyacheslav.Belov", "Lev.Bannov", "Rostislav.Pivovarov", "Alisa.Bulatova", "Kate.Osipova", "gingetsu2007", "mihkail.efremov", "andrew.panov", "dmitry.gubanov", "Andrey.Savihin", "Sergey.Kirillov", "ivan.danilov", "Kostenko.Alexey", "Vladimir.Voronin", "nikolay.pugachev", "Anastasia.Markelova", "Alexey.Matveev", "Evgenia.Olshanskaja", "Alexander.Trofimov", "Margarita.Kitaeva", "Timur.Shugajev", "Konstantin.Maystrenko", "Sergey.Nagaev", "Sergey.Linnik", "Julia.Radzhabova", "serge.seyfetdinov", "anastasiia.reagan", "Eugene.Katyshev", "rusty.locke", "Sergey.Luzyanin", "Elena.Belova", "Alexey.Musinov", "irina.malysheva", "Alexey.Safronov", "Vladimir.Gorshenkov", "mishell.seyfetdinov", "Pavel.Lobashov", "Marina.Matveeva", "Alexander.Vnuchkov", "olga.nesterova", "Aleksei.Myasnikov", "Elena.Subbotina", "Irina.Sanaeva", "Ekaterina.Heidel", "Vladislav.Sedov-Ponomarev", "sergey.leushkin", "Tatiana.Kochedykova", "Natalia.Balashova", "Pavel.Bannov", "cody.harmon", "Ilja.Kirillov", "Eugenia.Gurtovenko", "Kirill.Solodovnikov", "n.knyazeva118", "Oleg.Korshul", "Igor.Zotov", "Maxim.Kadushkin", "Margarita.Bubnova", "Sergey.Konovalov", "djmaximus", "Alexey.Golubev", "Dmitry.Kolesnikov", "Anna.Medvedeva", "Nastya.Lapteva", "Alex.Bannov", "Kseniya.Fedoruk", "olga.grunina", "Irina.Isanshina", "mihailkorotaev1", "oleg.gonchar", "bardov.ivan", "galina.medvedeva", "Egor.Zorin", "Alexander.Zozulya", "tresa.hilson", "Roman.Neviditsyn", "Denis.Myshaev", "Dmitry.Rotatyy", "nokolay.rechkin", "Oleshko.Ilya", "Alexander.Yuzhin"
					];
			
					fillList(items);
					break;
				}
				case "446":
				{
					var items = [
						"manager", "marketing", "programmer"
					];
			
					fillList(items);
					break;
				}
				default:
				{
					if (window.isVisible)
					{
						window.isVisible = false;
						window.Asc.plugin.executeMethod("UnShowInputHelper", [window.Asc.plugin.info.guid], function() { window.isVisible = false; });					
					}
					break;	
				}
			}

		});	
	};
	
	window.Asc.plugin.event_onInputSymbolCheck = function(symbol)
	{
		if (symbol == "@".charCodeAt(0))
		{
			var items = [
				"svetlana.maleeva@onlyoffice.com", "Kirill.Volkov@onlyoffice.com", "galina.goduhina@onlyoffice.com", "Alexander.Galkin@avsmedia.net", "Olga.Golubeva@onlyoffice.com", "Natalya.Busleeva@avsmedia.net", "mikola.world@gmail.com", "lena.nagaeva@mail.ru", "Pavel.Rogozhin@avsmedia.net", "alexm@onlyoffice.com", "egor.rozhnetsov@onlyoffice.com", "Denis.Spitsyn@onlyoffice.com", "Tatiana.Tyulyutova@avs4you.com", "Vyacheslav.Belov@onlyoffice.com", "Lev.Bannov@onlyoffice.com", "Rostislav.Pivovarov@onlyoffice.com", "alisa.bulatova@onlyoffice.com", "Jekaterina.Osipova@onlyoffice.com", "gingetsu2007@yandex.ru", "mikhail.efremov@onlyoffice.com", "andrew.panov@onlyoffice.com", "dmitry.gubanov@onlyoffice.com", "andrey.savihin@onlyoffice.com", "Sergey.Kirillov@OnlyOffice.com", "ivan.danilov@onlyoffice.com", "Alexey.Kostenko@onlyoffice.com", "vladimir.voronin@onlyoffice.com", "nikolay.pugachev@onlyoffice.com", "anastasia.markelova@onlyoffice.com", "Alexey.Matveev@onlyoffice.com", "Evgenia.Olshanskaja@onlyoffice.com", "Alexander.Trofimov@onlyoffice.com", "Margarita.Kitaeva@avsmedia.net", "tim@onlyoffice.com", "Konstantin.Maystrenko@onlyoffice.com", "Sergey.Nagaev@nctsoft.com", "sergey.linnik@onlyoffice.com", "Julia.Radzhabova@onlyoffice.com", "serge.seyfetdinov@onlyoffice.com", "anastasiia.reagan@onlyoffice.com", "Evgeny.Katyshev@onlyoffice.com", "rusty.locke@onlyoffice.com", "Sergey.Luzyanin@onlyoffice.com", "elena.belova@onlyoffice.com", "Alexey.Musinov@onlyoffice.com", "irina.malysheva@onlyoffice.com", "Alexey.Safronov@onlyoffice.com", "Vladimir.Gorshenkov@avsmedia.net", "mishell.seyfetdinov@onlyoffice.com", "shockwavenn@gmail.com", "Marina.Matveeva@onlyoffice.com", "alexander.vnuchkov@onlyoffice.com", "olga.nesterova@onlyoffice.com", "aleksei.myasnikov@gmail.com", "Elena.Subbotina@nctsoft.com", "Irina.Sanaeva@avs4you.com", "Ekaterina.Heidel@onlyoffice.com", "Vladislav.Sedov-Ponomarev@onlyoffice.com", "sergey.leushkin@onlyoffice.com", "Tatiana.Kochedykova@onlyoffice.com", "natalia.pistsova@avsmedia.net", "paul.bannov@gmail.com", "cody.harmon@onlyoffice.com", "Ilja.Kirillov@avsmedia.net", "Eugenia.Gurtovenko@onlyoffice.com", "Kirill.Solodovnikov@onlyoffice.com", "n.knyazeva118@gmail.com", "Oleg.Korshul@avsmedia.net", "Igor.Zotov@onlyoffice.com", "Maxim.Kadushkin@nctsoft.com", "Margarita.Bubnova@onlyoffice.com", "sergey.konovalov@onlyoffice.com", "maksim.osipov@onlyoffice.com", "Alexey.Golubev@onlyoffice.com", "Dmitry.kolesnikov@onlyoffice.com", "Anna.Medvedeva@onlyoffice.com", "Nastya.Lapteva@onlyoffice.com", "alexey.bannov@onlyoffice.com", "Kseniya.Fedoruk@onlyoffice.com", "olga.grunina@onlyoffice.com", "irina.vikulova@onlyoffice.com", "mihailkorotaev1@gmail.com", "oleg.gonchar@onlyoffice.com", "bardov.ivan@gmail.com", "galina.medvedeva@avsmedia.net", "egor.zorin@onlyoffice.com", "Alexander.Zozulya@onlyoffice.com", "tresa.hilson@onlyoffice.com", "Roman.Neviditsyn@onlyoffice.com", "denis.myshaev@onlyoffice.com", "dmitry.rotatyy@onlyoffice.com", "nikolay.rechkin@onlyoffice.com", "ilya.oleshko@onlyoffice.com", "Alexander.Yuzhin@onlyoffice.com"		
			];
	
			fillList(items);
		}
	};

	window.Asc.plugin.onExternalMouseUp = function()
    {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);

        document.dispatchEvent(evt);
	};
	
	function fillList(items)
	{
		var data = "";
		for (var i = 0; i < items.length; i++)
		{
			data += "<li role=\"option\"";
			if (0 == i)
				data += " class=\"li_selected\"";
			
			data += " onclick=\"onitemclick(event)\">";
			data += items[i];
			data += "</li>";
		}

		document.getElementById("elements_id").innerHTML = data;
		window.Asc.plugin.PS.update();
		window.Asc.plugin.PS.update();

		setTimeout(function() {
			var _width = 200;// document.getElementById("elements_id").scrollWidth;
			var _height = document.getElementById("elements_id").scrollHeight;

			if (_width > 400)
				_width = 400;
			if (_height > 150)
				_height = 150;

			window.Asc.plugin.executeMethod("ShowInputHelper", [window.Asc.plugin.info.guid, _width + 30, _height, true], function() { window.isVisible = true; });

			window.disableTargetChanged = true;
				window.setTimeout(function() {
					window.disableTargetChanged = false;					
				}, 500);
		}, 10);
	}

})(window, undefined);
