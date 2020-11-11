(function(window, undefined){
	var flagInit = false;

    window.Asc.plugin.init = function(text)
    {
		if (!flagInit) {
			this.executeMethod("GetAllContentControls",null,function(data){
				for (var i = 0; i < data.length; i++) {
					if (data[i].Tag == 11) {
						this.Asc.plugin.executeMethod("SelectContentControl",[data[i].InternalId]);
						break;
					}
				}
			});
			flagInit = true;
		} else {
			if (Asc.scope.text) {
				this.executeMethod("PasteText",[Asc.scope.text],function (){
					Asc.scope.text = null;
					this.Asc.plugin.executeCommand("close", "");
				});
			} else {
				Asc.scope.text = text;
				this.executeMethod("GetAllContentControls",null,function(data){
					for (var i = 0; i < data.length; i++) {
						if (data[i].Tag == 14) {
							this.Asc.plugin.executeMethod("SelectContentControl",[data[i].InternalId]);
							break;
						}
					}
				});
			}
		}
	};
		
    window.Asc.plugin.button = function()
    {
    };

})(window, undefined);