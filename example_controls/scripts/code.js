(function(window, undefined){

	var loader;

    window.Asc.plugin.init = function()
    {
		$('#select_example').select2({
			data : [{id:0, text:'Item 1'},{id:1, text:'Item 2'},{id:2, text:'Item 3'}],
			minimumResultsForSearch: Infinity,
			width : '120px'
		});

		$('#show-loader').on('click', function(){
			loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
			loader = showLoader($('#loader-container')[0], 'Loading...');
		});

		$('#hide-loader').on('click', function(){
			loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
			loader = undefined;
		});
	};

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
	};
})(window, undefined);
