(function(window, undefined){
	var flagInit = false;
	var fBtnGetAll = false;
	var fClickLabel = false;
	var fClickBtnCur =  false;

    window.Asc.plugin.init = function(text)
    {

		document.getElementById("divS").innerHTML = text.replace(/\n/g,"<br>");

		document.getElementById("buttonIDPaste").onclick = function() {

			window.Asc.plugin.executeMethod("PasteText", ["Test paste for document"]);	

		};

		

		document.getElementById("buttonIDGetAll").onclick = function() {

			window.Asc.plugin.executeMethod("GetAllContentControls");
			fBtnGetAll = true;					

		};

		document.getElementById("buttonIDShowCurrent").onclick = function() {
			
			fClickBtnCur = true;
			window.Asc.plugin.executeMethod("GetCurrentContentControl");

		};

		if (!flagInit) {
			flagInit = true;
			window.Asc.plugin.executeMethod("GetAllContentControls");
			// document.getElementById("buttonIDGetAll").click();
		}
	};
	
	addLabel = (returnValue, element) => {
		$(element).append(
			$('<label>',{
				id : returnValue.InternalId,
				for : element,
				class : 'label-info',
				text : returnValue.InternalId + "	" + (returnValue.Id || 'null'),
				on : {
					click: function(){
						fClickLabel = true;
						$('.label-selected').removeClass('label-selected');
						$(this).addClass('label-selected');
						if (element === "#divG") {
							window.Asc.plugin.executeMethod("SelectContentControl",[this.id]);
						} else {
							window.Asc.plugin.executeMethod("MoveCursorToContentControl",[this.id, true]);
						}
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
			if (fBtnGetAll) {
				document.getElementById("divP").innerHTML = "";
				fBtnGetAll = false;
				for (var i = 0; i < returnValue.length; i++) {	
					addLabel(returnValue[i], "#divP");
				}
			} else {
				document.getElementById("divG").innerHTML = "";
				for (var i = 0; i < returnValue.length; i++) {	
					addLabel(returnValue[i], "#divG");
				}
			}
			

		} else if (_plugin.info.methodName == "GetCurrentContentControl") {
			if (fClickBtnCur) {
				window.Asc.plugin.executeMethod("SelectContentControl",[returnValue]);
				fClickBtnCur = false;
			} else if (!($('.label-selected').length && $('.label-selected')[0].id === returnValue) && returnValue) {
				if (document.getElementById(returnValue))
				{
					$('.label-selected').removeClass('label-selected');
					$('#divG #' + returnValue).addClass('label-selected');
					$('#divP #' + returnValue).addClass('label-selected');


				} else {
					$('.label-selected').removeClass('label-selected');
					addLabel({InternalId: returnValue},"#divG");
					$('#' + returnValue).addClass('label-selected');
				}
			} else if (!returnValue) {
				$('.label-selected').removeClass('label-selected');
			}
		}
	};
	
	window.Asc.plugin.event_onTargetPositionChanged = function()
	{
		if (!fClickLabel) {
			window.Asc.plugin.executeMethod("GetCurrentContentControl");
		}
		fClickLabel = false;
	};

})(window, undefined);