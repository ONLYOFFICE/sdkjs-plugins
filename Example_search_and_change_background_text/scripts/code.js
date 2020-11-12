(function(window, undefined){

    window.Asc.plugin.init = function()
    {

		// $('#btn_prev').on('click', function() {
		// 	var text = $('#inp_search').val();
		// 	window.Asc.plugin.executeMethod("SearchText",[text, false]);
		// });

		// $('#btn_next').on('click', function() {
		// 	var text = $('#inp_search').val();
		// 	window.Asc.plugin.executeMethod("SearchText",[text, true]);
		// });

		$('#btn_bg').on('click', function() {
			var strcolor = $("#inp_color").val();
			var r = parseInt(strcolor[1] + strcolor[2], 16),
                g = parseInt(strcolor[3] + strcolor[4], 16),
				b = parseInt(strcolor[5] + strcolor[6], 16);
			Asc.scope.color = {
				r : r,
				g : g,
				b : b,
				isNone : false
			};
			window.Asc.plugin.callCommand(function() {
				var oDocument = Api.GetDocument();
				var range = oDocument.GetRangeBySelect();
				range.SetHighlight(Asc.scope.color.r, Asc.scope.color.g, Asc.scope.color.b, Asc.scope.color.isNone);
			}, false, true);
		});

		$('#btn_bgAll').on('click', function() {
			var strcolor = $("#inp_color").val();
			var r = parseInt(strcolor[1] + strcolor[2], 16),
                g = parseInt(strcolor[3] + strcolor[4], 16),
				b = parseInt(strcolor[5] + strcolor[6], 16);
			Asc.scope.color = {
				text : $('#inp_search').val(),
				r : r,
				g : g,
				b : b,
				isNone : false
			};
			window.Asc.plugin.callCommand(function() {
				var oDocument = Api.GetDocument();
				var arrRanges = oDocument.Search(Asc.scope.color.text, false);
				for (var i = 0; i < arrRanges.length; i++) {
					arrRanges[i].SetHighlight(Asc.scope.color.r, Asc.scope.color.g, Asc.scope.color.b, Asc.scope.color.isNone);
				}
			}, false, true);
		});

		$('#btn_resetColor').on('click', function() {
			window.Asc.plugin.callCommand(function() {
				var oDocument = Api.GetDocument();
				var range = oDocument.GetRangeBySelect();
				range.SetHighlight(null, null, null, true);
			}, false, true);
		});
		// $( "#inp_search" ).keydown(function( event ) {
		// 	if ( event.which == 13 ) {
		// 		$( "#btn_next" ).click();
		// 	}
		// });
	};

    window.Asc.plugin.button = function()
    {
		this.executeCommand("close", "");
	};
	
})(window, undefined);
