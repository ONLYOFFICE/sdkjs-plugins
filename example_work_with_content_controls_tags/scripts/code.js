(function(window, undefined){
	var flagInit = false;
	var fBtnGetAll = false;
	var ArrContentControls = {};

    window.Asc.plugin.init = function()
    {

		document.getElementById("buttonIDPaste").onclick = function() {
			var tmpArr = ArrContentControls[$('.label-selected')[0].id].id;
			for (var i = 0; i < tmpArr.length; i++) {
				window.Asc.plugin.executeMethod("SelectContentControl",[tmpArr[i]]);
				window.Asc.plugin.executeMethod("PasteText", ["Test paste for document"]);
			}

		};

		document.getElementById("buttonIDGetAll").onclick = function() {

			window.Asc.plugin.executeMethod("GetAllContentControls");
			fBtnGetAll = true;					

		};

		if (!flagInit) {
			flagInit = true;
			window.Asc.plugin.executeMethod("GetAllContentControls");
		}
	};
	
	addLabel = (arrEl, element) => {
		$(element).append(
			$('<label>',{
				id : arrEl.tag,
				for : element,
				class : 'label-info',
				text : arrEl.tag,
				on : {
					click: function(){
						fClickLabel = true;
						$('.label-selected').removeClass('label-selected');
						$(this).addClass('label-selected');
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

	compareArr = (arr) => {
		ArrContentControls = {};
		for (var i = 0; i < arr.length; i++) {
			if (!arr[i].Tag) {
				continue;
			}
			if (ArrContentControls[arr[i].Tag]) {
				ArrContentControls[arr[i].Tag].id.push(arr[i].InternalId);
			} else {
				ArrContentControls[arr[i].Tag] = {
					id : [arr[i].InternalId],
					tag : arr[i].Tag 
				};
			}
		}
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
			compareArr(returnValue);
			fBtnGetAll = false;

			document.getElementById("divG").innerHTML = "";
			for (const key in ArrContentControls) {
				addLabel(ArrContentControls[key], "#divG");
			}
		} 
	};
})(window, undefined);