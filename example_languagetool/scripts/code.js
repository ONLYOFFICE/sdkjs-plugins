(function(window, undefined){
	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};
	var isInit = false;
	var CurLang = "auto";
	var txt = "";
	var matches;
	
	window.Asc.plugin.init = function(text)	{
		txt = text;
		document.getElementById("textarea").value = text;
		if (!isInit) {
			init();
			isInit = true;
		}
	};

	$(document).ready(function () {
		$('#check').on('click', function(){
			txt = document.getElementById("textarea").value.trim();
			if (txt !== "") {
				$("#result").empty();
				checkText(txt, CurLang);
			};
		});
	});	

	function getLanguages() {
		var url = "https://languagetool.org/api/v2/languages";
		return $.ajax({
			method: 'GET',
			url: url
		});
	};

	function checkText(txt, lang) {
		var data = {
			text : txt,
			language : lang,
			enabledOnly : false
		}
		var _url = "https://languagetool.org/api/v2/check"
		$.ajax({
			method: 'POST',
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
			},
			data : data,
			url: _url
		}).success(function (oResponse) {
			matches = oResponse.matches.map(function(el, ind) {
				el.index = ind;
				return el;
			});
			parseResult(oResponse);
			console.log(oResponse);
		}).error(function(e){       
			console.log(e);
		});
	};

	function parseResult (oResponse) {
		var data = oResponse.matches.map(function (el) {
			return {
				shortMessage : el.shortMessage,
				message : el.message,
				replacements : el.replacements,
				context : el.context
			}
		});
		data.forEach(function(el, ind) {
			$('<div>', {
				"class": 'header',
				id: "div_header_" + ind,
				text: el.shortMessage
			}).appendTo($('<div>', {
				id : "div_" + ind,
				"class": 'result_div',
			}).appendTo('#result'));

			$('<span>', {
				"class": 'btn_close',
				click: function () {
					$('#div_'+$(this).data().index).remove();
					var ind = matches.findIndex(function(el) {
						if (el.index === ind) {
							return true;
						}
					});
					matches.splice(ind, 1);
				}
			}).data({ index : ind })
			.appendTo('#div_header_'+ind);

			$('<div>', {
				"class": 'caption',
				text : el.message
			}).appendTo('#div_'+ind);

			$('<div>', {
				"class": 'caption',
				text : '"' + el.context.text + '"'
			}).appendTo('#div_'+ind);
			
			$('<div>', {
				id : "div_replacments_" + ind,
				"class": 'replacments',
			}).appendTo('#div_'+ind)


			el.replacements.forEach(function(elem) {
				$('<span>', {
					"class": 'replacment',
					text: elem.value,
					click : function () {
						// console.log($(this));
						correctText($(this));
					}
				}).data({ index : ind })
				.appendTo('#div_replacments_'+ind);
			});
		});
		updateScroll();
	};

	function correctText(data) {
		var ind = data.data().index;
		ind = matches.findIndex(function(el) {
			if (el.index === ind) {
				return true;
			}
		});
		var end = matches[ind].offset + matches[ind].length;
		var temp = txt.slice(0, matches[ind].offset) + data.text() + txt.slice(end);
		var count = txt.length - temp.length;
		matches.splice(ind, 1);
		txt = temp;
		document.getElementById("textarea").value = txt;
		for (var i = ind; i < matches.length; i++) {
			matches[i].offset -= count;
		}
		$('#div_'+data.data().index).remove();
		if (!matches.length) {
			$('#check').trigger("click");
		}
		updateScroll();
	};

	function init() {
		getLanguages().then(function(oResponse) {
			var languages = oResponse.map(function(el, ind) {
				return {
					id : ind + 1,
					text : el.name,
					code : el.code,
					longcode : el.longCode
				};
			});
			languages.unshift({id : 0, text:"Auto", code : "auto"});
			$('#language_id').select2({
				data : languages
			}).on('select2:select', function (e) {
				CurLang = e.params.data.longcode;
				// console.log(e.params.data);
			});
		}, function(err) {console.log("ouch" +err)});

		var container = document.getElementById('scrollable-container-id');			
			Ps = new PerfectScrollbar('#' + container.id, { minScrollbarLength: 20 });
			// updateScroll();
			// updateScroll();
	};
	
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};
	
	window.onresize = function() {
		updateScroll();
		updateScroll();
	};

	window.Asc.plugin.onExternalMouseUp = function() {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
			false, false, false, false, 0, null);

		document.dispatchEvent(evt);
	};
	

	function updateScroll()
	{
		Ps && Ps.update();
	};

	window.Asc.plugin.onTranslate = function()
	{
		var btn = document.getElementById("check");
		if (btn)
			btn.innerHTML = window.Asc.plugin.tr("Check");
	};
		  
})(window, undefined);