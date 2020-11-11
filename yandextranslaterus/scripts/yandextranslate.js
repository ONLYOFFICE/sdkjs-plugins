(function(window, undefined){

	var closed = false;
 	window.Asc.plugin.init = function(text)
	{
		var xhr = new XMLHttpRequest();
		var _url = "https://translate.yandex.net/api/v1.5/tr.json/translate?";
		_url += "key=trnsl.1.1.20160604T115612Z.107ebb05a7757bcc.804e900f347ddfbeadd7ca5999bd5cb6ca32805b";
		_url += "&text=";
		_url += text;
		_url += "&lang=ru";
		_url += "&format=plain";
		xhr.open('POST', _url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200 && !closed)
			{
				try
				{
					var command                        = "";
					command += "var oDocument = Api.GetDocument();";
					command += "var oParagraph = Api.CreateParagraph();var oRun = Api.CreateRun();oParagraph.AddElement(oRun);";

					var _obj = JSON.parse(this.responseText);
					var _text                          = _obj.text[0];
					_text                              = _text.split("\"").join("\\\"");

					command += "oRun.AddText(\"" + _text + "\");";
					command += 'oDocument.InsertContent([oParagraph]);';
					window.Asc.plugin.info.recalculate = true;
					window.Asc.plugin.executeCommand("close", command);
				}
				catch (err)
				{
					window.Asc.plugin.executeCommand("close", "");
				}
			}
			else if (401 == this.readyState || 404 == this.readyState || 413 == this.readyState || 422 == this.readyState || 501 == this.readyState)
			{
				window.Asc.plugin.executeCommand("close", "");
			}
		};
		xhr.send(null);
	};

	window.Asc.plugin.button = function(id)
	{
		closed = true;
		this.executeCommand("close", "");
	};

})(window, undefined);
