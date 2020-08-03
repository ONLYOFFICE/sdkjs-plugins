(function(window, undefined){

    window.Asc.plugin.init = function(text)
    {

		document.getElementById("buttonIDStart").onclick = function() {

			window.Asc.plugin.executeMethod("MoveCursorToStart",[true]);			

		};
		
		document.getElementById("buttonIDEnd").onclick = function() {

			window.Asc.plugin.executeMethod("MoveCursorToEnd",[true]);			

		};
		
	};
	
    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

})(window, undefined);
