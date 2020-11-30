(function(window, undefined)
{
	
	window.Asc.plugin.init = function(text)
	{
		var words = (text.match(/\S+/g)) ? text.match(/\S+/g).length : 0;
		document.getElementById("charsNoSpaces").innerHTML = `Charcaters without spaces: ${text.replace(/\s+/g, '').length}`;
		document.getElementById("chars").innerHTML         = `Total charcaters: ${text.length}`;
		document.getElementById("words").innerHTML         = `Words count: ${words}`;
		document.getElementById("lines").innerHTML         = `Lines count: ${text.split(/\r*\n/).length - 1}`;
		
	};


	window.Asc.plugin.button = function()
	{
		this.executeCommand("close", "");
	};

})(window, undefined);
