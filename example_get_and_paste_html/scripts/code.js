(function(window, undefined){

	var editor;
	window.Asc.plugin.init = function(text)
	{
		document.getElementById("div_main").style.width = document.getElementById("body").clientWidth- 20 +"px";
		if (editor) {
			editor.setValue(text);
		} else {
			document.getElementById("main").value = text;
		}
		window.onresize = function(e){
			document.getElementById("div_main").style.width = document.getElementById("body").clientWidth- 20 +"px";
		}
		document.getElementById("btn_paste").onclick = function() {
			window.Asc.plugin.executeMethod("PasteHtml",[editor.getValue()]);
		};
		if (!editor) {
			editor = CodeMirror.fromTextArea(document.getElementById("main"), {
				mode: "text/html",
				lineNumbers: true,
				lineWrapping: true
			});
		}
		
	};
	window.Asc.plugin.button = function(id)
	{
		this.executeCommand("close", "");
	};

})(window, undefined);
