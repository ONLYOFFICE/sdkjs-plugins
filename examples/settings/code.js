// Example set settings to editors
(function(window, undefined){
    
    window.Asc.plugin.init = function()
    {
		var initSettings = {
			copyoutenabled : false,
			watermark_on_draw : JSON.stringify({
				"transparent" : 0.3,
				"type" : "rect",
				"width" : 100,
				"height" : 100,
				"rotate" : -45,
				"margins" : [ 10, 10, 10, 10 ],
				"fill" : [255, 0, 0],
				"stroke-width" : 1,
				"stroke" : [0, 0, 255],
				"align" : 1,
				
				"paragraphs" : [ {
					"align" : 2,
					"fill" : [255, 0, 0],
					"linespacing" : 1,
					
					"runs" : [
							{
								"text" : "Do not steal, %user_name%!",
								"fill" : [0, 0, 0],
								"font-family" : "Arial",
								"font-size" : 40,
								"bold" : true,
								"italic" : false,
								"strikeout" : false,
								"underline" : false
							},
							{
								"text" : "<%br%>"
							}
						]
					}
				]
			})
		};
		
        this.executeMethod("SetProperties", [initSettings], function() {
            window.Asc.plugin.executeCommand("close", "");
        });
    };

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

})(window, undefined);
