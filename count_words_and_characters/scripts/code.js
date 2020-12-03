(function(window, undefined)
{
	
	window.Asc.plugin.init = function(text)
	{
		var chars = text.replace(/\r*\n/g, '').replace(/\t/g,"").length;
		var words = text.replace(/—/g,"").match(/\S+/g);
		words = (words) ? words.length : 0;
		var lines = text.split(/\r\n/);
		// // lines.length--;
		if (lines[lines.length-1] == "") lines.length--;
		document.getElementById("charsNoSpaces").innerHTML = "Characters without spaces: " + text.replace(/\s+/g, '').length;
		document.getElementById("chars").innerHTML         = "Total characters: " + chars;
		document.getElementById("words").innerHTML         = "Words count: " + words;
		document.getElementById("lines").innerHTML         = "Paragraphs count: " + lines.length;
		
	};


	window.Asc.plugin.button = function()
	{
		this.executeCommand("close", "");
	};

})(window, undefined);
