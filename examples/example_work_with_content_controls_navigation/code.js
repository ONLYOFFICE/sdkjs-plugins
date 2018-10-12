(function(window, undefined){
	var flagInit = false;

    window.Asc.plugin.init = function(text)
    {

		document.getElementById("divS").innerHTML = text.replace(/\n/g,"<br>");

		document.getElementById("buttonIDPaste").onclick = function() {

			window.Asc.plugin.executeMethod("PasteText", ["Test paste for document"]);	

		};

		document.getElementById("buttonIDGetAll").onclick = function() {

			window.Asc.plugin.executeMethod("GetAllContentControls");

		};

		document.getElementById("buttonIDShowCurrent").onclick = function() {

			window.Asc.plugin.executeMethod("GetCurrentContentControl");

		};

		if (!flagInit) {
			flagInit = true;
			document.getElementById("buttonIDGetAll").click();
		}
	};
	
	addLabel = (returnValue) => {
		$('#divG').append(
			$('<label>',{
				id : returnValue.InternalId,
				class : 'label-info',
				text : returnValue.InternalId + "	" + (returnValue.Id || 'null'),
				on : {
					click: function(){
						$('.label-selected').removeClass('label-selected');
						$(this).addClass('label-selected');
						window.Asc.plugin.executeMethod("SelectContentControl",[this.id]);
					},
					mouseover: function(){
						$(this).addClass('label-hovered');
					},
					mouseout: function(){
						$(this).removeClass('label-hovered');
					}
				}
			})
		);
	};
	
    window.Asc.plugin.button = function()
    {
		this.executeCommand("close", "");
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "GetAllContentControls")
		{
			document.getElementById("divG").innerHTML = "";
			for (var i = 0; i < returnValue.length; i++) {	
				addLabel(returnValue[i]);
			}

		} else if (_plugin.info.methodName == "GetCurrentContentControl") {
			if (!($('.label-selected').length && $('.label-selected')[0].id === returnValue) && returnValue) {
				if (document.getElementById(returnValue))
				{
					$('.label-selected').removeClass('label-selected');
					$('#' + returnValue).addClass('label-selected');

				} else {
					$('.label-selected').removeClass('label-selected');
					addLabel({InternalId: returnValue});
					$('#' + returnValue).addClass('label-selected');
				}
			} else if (!returnValue) {
				$('.label-selected').removeClass('label-selected');
			}
		}
	};
	
	window.Asc.plugin.event_onTargetPositionChanged = function()
	{
		window.Asc.plugin.executeMethod("GetCurrentContentControl");
	};

})(window, undefined);