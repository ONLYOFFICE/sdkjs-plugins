(function(window, undefined){

    window.Asc.plugin.init = function(text)
    {
		//event "init" for plugin
		document.getElementById("buttonIDStart").onclick = function() {
			
			//method for move cursor to start document
			window.Asc.plugin.executeMethod("MoveCursorToStart",[true]);			

		};
		
		document.getElementById("buttonIDEnd").onclick = function() {

			//method for move cursor to end document
			window.Asc.plugin.executeMethod("MoveCursorToEnd",[true]);			

		};
		
	};
	
    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

})(window, undefined);
