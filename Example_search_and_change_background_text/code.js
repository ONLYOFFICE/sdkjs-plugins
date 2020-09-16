(function(window, undefined){

    window.Asc.plugin.init = function()
    {

		$('#btn_prev').on('click', function() {
			var text = $('#inp_search').val();
			window.Asc.plugin.executeMethod("SearchText",[text, false]);
			
		});

		$('#btn_next').on('click', function() {
			var text = $('#inp_search').val();
			window.Asc.plugin.executeMethod("SearchText",[text, true]);
			
		});

		$('#btn_bg').on('click', function() {
			var color = $("#inp_color").val();
			window.Asc.plugin.executeMethod("SetHighlightText",[color]);
		});

		$('#btn_bgAll').on('click', function() {
			var color = $("#inp_color").val();
			var text = $('#inp_search').val();
			window.Asc.plugin.executeMethod("SetHighlightSearched",[text,color]);
		});

		$('#btn_resetColor').on('click', function() {
			window.Asc.plugin.executeMethod("SetHighlightText",["none"]);
		});
		$( "#inp_search" ).keydown(function( event ) {
			if ( event.which == 13 ) {
				$( "#btn_next" ).click();
			}
		});
	};

    window.Asc.plugin.button = function()
    {
		this.executeCommand("close", "");
	};

	
})(window, undefined);
