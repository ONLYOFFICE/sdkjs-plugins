(function(window, undefined){
	var flagInit = false;

    window.Asc.plugin.init = function(text)
    {
		if (!flagInit) {
			//get all content controls
			this.executeMethod("GetAllContentControls",null,function(data){
				for (var i = 0; i < data.length; i++) {
					if (data[i].Tag == 11) {
						//select content control with tag 11 (for example)
						this.Asc.plugin.executeMethod("SelectContentControl",[data[i].InternalId]);
						break;
					}
				}
			});
			flagInit = true;
		} else {
			if (Asc.scope.text) {
				//paste text into document
				this.executeMethod("PasteText",[Asc.scope.text],function (){
					Asc.scope.text = null;
					this.Asc.plugin.executeCommand("close", "");
				});
			} else {
				Asc.scope.text = text;
				//get all content controls
				this.executeMethod("GetAllContentControls",null,function(data){
					for (var i = 0; i < data.length; i++) {
						if (data[i].Tag == 14) {
						
							//select content control with tag 14 (for example)	
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