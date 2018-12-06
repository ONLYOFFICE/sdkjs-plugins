(function(window, undefined) {

	window.Asc.plugin.init = function() {
		var comment = document.getElementById("textareaIDComment");
		document.getElementById("buttonIDAddComment").onclick = function() {
			Asc.scope.textComment = comment.value; // export variable to plugin scope
			window.Asc.plugin.callCommand(function() {
				var oWorksheet = Api.GetActiveSheet();
				var ActiveCell = oWorksheet.ActiveCell;
				ActiveCell.AddComment(Asc.scope.textComment); // past comment in active cell
			}, true);
		};
	};
	
	window.Asc.plugin.button = function() {
		this.executeCommand("close", "");
	};

})(window, undefined);
