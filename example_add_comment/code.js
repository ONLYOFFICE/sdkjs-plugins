(function(window, undefined){

    window.Asc.plugin.init = function(text)
    {
		var comment = document.getElementById("textareaIDComment");
		var author = document.getElementById("textareaIDAuthor");
		document.getElementById("buttonIDAddComment").onclick = function() {

			window.Asc.plugin.executeMethod("AddComment",[comment.value,author.value]);

		};
	};
	
    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

})(window, undefined);
