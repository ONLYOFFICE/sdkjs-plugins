(function(window, undefined){

	window.onresize = function()
	{
		var _styles = document.styleSheets[0];
		if (!_styles)
			return;
		
		_styles = _styles.cssRules;
		if (!_styles)
			return;
		
		for (var i = _styles.length - 1; i >= 0; i--)
		{
			if (_styles[i].selectorText == ".ac-container input:checked ~ article.ac-content")
			{
				document.styleSheets[0].deleteRule(i);
				break;
			}
		}
		
		var _heightBody = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		document.styleSheets[0].insertRule(".ac-container input:checked ~ article.ac-content {height:" + (_heightBody - 120) + "px;}", _styles.length);

		updateScrolls();
	};

	window.addEventListener("load", function _load(event){
		window.removeEventListener("load", _load, false);
		window.onresize();
	},false);

	function CTemplate(_id, _name, _url, _iconSize)
	{
		this.Id 	= _id ? _id : "";
		this.Url 	= _url ? _url : "";
		this.Name 	= _name ? _name : "";
		this.IconSize = { W: _iconSize[0], H: _iconSize[1] };
	}

	function CDocument(_id, _name, _templateID, _data)
	{
		this.Id 		= _id ? _id : "";
		this.TemplateId = _templateID ? _templateID : "";
		this.Name 		= _name ? _name : "";
		this.Data 		= _data ? _data : "";
	}

	function updateScrolls()
	{
		setTimeout(function()
		{
			if (window.Asc.plugin && window.Asc.plugin.isInit === true && window.Asc.plugin.fillTemplates)
				window.Asc.plugin.fillTemplates();
			if (window.Asc.plugin && window.Asc.plugin.isInit === true && window.Asc.plugin.fillDocuments)
				window.Asc.plugin.fillDocuments();
		}, 300);
	}

    window.Asc.plugin.init = function(text)
    {
    	this.isInit = true;

    	this.serverUrl = "";
    	this.userID = "";

    	this.templatesBaseUrl = "";
    	this.templates = [];

    	this.myDocuments = [];

    	this.currentTemplateID = "";

		document.getElementById("ac-2").onchange = function(e)
		{
			updateScrolls();
		};
		document.getElementById("ac-3").onchange = function(e)
		{
			updateScrolls();
		};

		Ps.initialize(document.getElementById('section_templates'), { theme : 'custom-theme' });
		Ps.initialize(document.getElementById('section_documents'), { theme : 'custom-theme' });

		this.fillTemplates();
		this.fillDocuments();

		document.getElementById("settingsButtonId").onclick = function(e) {
			window.serverConnect();
		};
		document.getElementById("documentsSaveId").onclick = function(e) {
			window.saveDocument();
		};
    };

	/***********************************************/
	/***************** TEMPLATES *******************/
	window.Asc.plugin.fillTemplates = function()
	{
		this.templates.splice(0, this.templates.length);

		this.templatesBaseUrl = "./templates/";

		this.templates.push(new CTemplate("{0B5DA9FE-F354-40A8-83B3-E0F42F31DFDD}", "Report", "bold_report/", [122, 158]));
		this.templates.push(new CTemplate("{D7817089-5819-41D2-981A-957B5D08A99F}", "Fax", "fax_cover/", [122, 158]));

		this.templates.push(new CTemplate("{0B5DA9FE-F354-40A8-83B3-E0F42F31DFDD}", "Report", "bold_report/", [122, 158]));
		this.templates.push(new CTemplate("{D7817089-5819-41D2-981A-957B5D08A99F}", "Fax", "fax_cover/", [122, 158]));
		this.templates.push(new CTemplate("{0B5DA9FE-F354-40A8-83B3-E0F42F31DFDD}", "Report", "bold_report/", [122, 158]));
		this.templates.push(new CTemplate("{D7817089-5819-41D2-981A-957B5D08A99F}", "Fax", "fax_cover/", [122, 158]));
		this.templates.push(new CTemplate("{0B5DA9FE-F354-40A8-83B3-E0F42F31DFDD}", "Report", "bold_report/", [122, 158]));
		this.templates.push(new CTemplate("{D7817089-5819-41D2-981A-957B5D08A99F}", "Fax", "fax_cover/", [122, 158]));
		this.templates.push(new CTemplate("{0B5DA9FE-F354-40A8-83B3-E0F42F31DFDD}", "Report", "bold_report/", [122, 158]));
		this.templates.push(new CTemplate("{D7817089-5819-41D2-981A-957B5D08A99F}", "Fax", "fax_cover/", [122, 158]));

		var _width = 0;
		for (var i = 0; i < this.templates.length; i++)
		{
			if (this.templates[i].IconSize.W > _width)
				_width = this.templates[i].IconSize.W;
		}

		_width += 20;

		var _space = 20;
		var _naturalWidth = window.innerWidth;

		var _count = ((_naturalWidth - _space) / (_width + _space)) >> 0;
		if (_count < 1)
			_count = 1;

		var _countRows = ((this.templates.length + (_count - 1)) / _count) >> 0;

		var _html = "";
		var _index = 0;

		var _margin = (_naturalWidth - _count * (_width + _space)) >> 1;
		document.getElementById("section_templates_main").style.marginLeft = _margin + "px";

		for (var _row = 0; _row < _countRows && _index < this.templates.length; _row++)
		{
			_html += "<tr style='margin-left: " + _margin + "'>";

			for (var j = 0; j < _count; j++)
			{
				var _cur = this.templates[_index];

				_html += "<td width='" + _width + "' height='" +_width + "' style='margin:" + (_space >> 1) + "'>";

				var _w = _cur.IconSize.W;
				var _h = _cur.IconSize.H;

				_html += ("<img id='template" + _index + "' src=\"" + this.templatesBaseUrl + _cur.Url + "/icon.png\" />");
				_html += ("<div class=\"noselect celllabel\">" + _cur.Name + "</div>");

				_html += "</td>";

				_index++;

				if (_index >= this.templates.length)
					break;
			}

			_html += "</tr>";
		}

		document.getElementById("section_templates_main").innerHTML = _html;

		for (_index = 0; _index < this.templates.length; _index++)
		{
			document.getElementById("template" + _index).onclick = new Function("return window.template_run(" + _index + ");");
		}

		Ps.update(document.getElementById('section_templates'));

		var _element = document.getElementsByClassName("ps-scrollbar-y")[0];
		if (_element.clientHeight == 0)
			_element.style.borderWidth = "0px";
		else
			_element.style.borderWidth = "1px";

		if (true)
		{
			document.getElementById("serverId").value       = "http://parity-node1.onlyoffice.com/rpc";
			document.getElementById("userId").value         = "0x004ec07d2329997267Ec62b4166639513386F32E";
			document.getElementById("userPassword").value   = "user";
			document.getElementById("serverContract").value = "0xedfc9c2f4cfa7495c1a95cfe1cb856f5980d5e18";

			document.getElementById("serverId").disabled       = true;
			document.getElementById("userId").disabled         = true;
			document.getElementById("userPassword").disabled   = true;
			document.getElementById("serverContract").disabled = true;
		}
	};

	/***********************************************/
	/***************** DOCUMENTS *******************/
	window.Asc.plugin.fillDocuments = function()
	{
		var _innerHtml = "";
		for (var i = 0; i < this.myDocuments.length; i++)
		{
			_innerHtml += ("<tr class='tableRow' id='rowDocumentId" + i + "'><td class='contentCells'>" + this.myDocuments[i].Name + "</td></tr>");
		}

		document.getElementById("section_documents_main").innerHTML = _innerHtml;

		for (_index = 0; _index < this.myDocuments.length; _index++)
		{
			document.getElementById("rowDocumentId" + _index).onclick = new Function("return window.document_run(" + _index + ");");
		}

		Ps.update(document.getElementById('section_documents'));

		var _element = document.getElementsByClassName("ps-scrollbar-y")[1];
		if (_element.clientHeight == 0)
			_element.style.borderWidth = "0px";
		else
			_element.style.borderWidth = "1px";
	};

	function getTemplateById(_id)
	{
		var _plugin = window.Asc.plugin;
		var _template = null;
		for (var i = _plugin.templates.length - 1; i >= 0; i--)
		{
			if (_id == _plugin.templates[i].Id)
			{
				_template = _plugin.templates[i];
				break;
			}
		}
		return _template;
	}

	window.document_run = function(_index)
	{
		var _plugin = window.Asc.plugin;
		var _template = getTemplateById(_plugin.myDocuments[_index].TemplateId);

		if (_template == null)
			return;

		window.Asc.plugin.currentTemplateID = _template.Id;
		window.Asc.plugin.currentDocumentIndex = _index;

		var client = new XMLHttpRequest();
		var _url = _plugin.templatesBaseUrl + _template.Url + "/document.bin";
		client.open("GET", _url);

		client.onreadystatechange = function() {
			if (client.readyState == 4 && (client.status == 200 || location.href.indexOf("file:") == 0))
			{
				var _document = _plugin.myDocuments[window.Asc.plugin.currentDocumentIndex];
				window.Asc.plugin.executeMethod("OpenFile", [client.responseText, _document.Data,  window.Asc.plugin.templatesBaseUrl + _template.Url]);
			}
		};
		client.send();
	};

	window.template_run = function(_index)
	{
		var _plugin = window.Asc.plugin;
		var _template = window.Asc.plugin.templates[_index];
		_plugin.currentTemplateID =_template.Id;

		var client = new XMLHttpRequest();
		var _url = _plugin.templatesBaseUrl + _template.Url + "/document.bin";
		client.open("GET", _url);

		client.onreadystatechange = function() {
			if (client.readyState == 4 && (client.status == 200 || location.href.indexOf("file:") == 0))
			{
				var _template = getTemplateById(window.Asc.plugin.currentTemplateID);
				window.Asc.plugin.executeMethod("OpenFile", [client.responseText, "", window.Asc.plugin.templatesBaseUrl + _template.Url]);
			}
		};
		client.send();
	};

	window.serverConnect = function()
	{
		var _serverId 		= document.getElementById("serverId").value;
		var _userId 		= document.getElementById("userId").value;
		var _userPassword 	= document.getElementById("userPassword").value;
		var _serverContract = document.getElementById("serverContract").value;

		window.setSettings(_serverId, _serverContract, _userId, _userPassword);

		window.documentTemplates = [];
		window.documentCurrentIndex = -1;
		window.documentTemplatesCount = 0;

		function _getFormCallback(_data)
		{
			var _dataParse = JSON.parse(_data);

			window.documentCurrentIndex++;

			if (_dataParse.TemplateID !== undefined)
				window.documentTemplates.push(new CDocument("" + window.documentCurrentIndex, "Document " + (window.documentCurrentIndex + 1), _dataParse.TemplateID, _dataParse.Data));

			if (window.documentCurrentIndex == (window.documentTemplatesCount - 1))
			{
				window.Asc.plugin.myDocuments = window.documentTemplates;
				window.documentTemplates = [];
				window.documentCurrentIndex = -1;
				window.documentTemplatesCount = 0;

				window.Asc.plugin.fillDocuments();

				$("#ac-3").click();
			}
			else
			{
				window.getForm(window.documentCurrentIndex + 1, _getFormCallback);
			}
		}

		window.getFormsCount(function(_count){
			window.documentTemplatesCount = _count.toNumber();

			if (0 < window.documentTemplatesCount)
				window.getForm(window.documentCurrentIndex + 1, _getFormCallback);
		});
	};

	window.saveDocument = function()
	{
		window.Asc.plugin.executeMethod("GetFields", []);
	};

    window.Asc.plugin.button = function(id)
    {
        if (id == 0)
        {
            // TODO:
        }
        else
        {
            this.executeCommand("close", "");
        }
    };

    window.Asc.plugin.onExternalMouseUp = function()
    {        
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		//console.log(returnValue);

		if (window.Asc.plugin.info.methodName == "GetFields")
		{
			var _dataParse = { TemplateID : this.currentTemplateID, Data : returnValue };

			window.setForm(JSON.stringify(_dataParse), function(){
				window.serverConnect();
			});
		}
	};

})(window, undefined);
