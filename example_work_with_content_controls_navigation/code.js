(function(window, undefined){

    window.Asc.plugin.init = function(text)
    {
		console.log("Selected: " + text);

		document.getElementById("buttonIDGetAll").onclick = function() {

			window.Asc.plugin.executeMethod("GetAllContentControls");

		};
		document.getElementById("buttonIDShowCurrent").onclick = function() {

			window.Asc.plugin.executeMethod("GetCurrentContentControl");

		};
		$('body').on('mouseout', '.label-info', function() {
			$(this).removeClass('label-hovered');
		});

		$('body').on('mouseover', '.label-info', function() {
			$(this).addClass('label-hovered');
		});
		$('body').on('click', '.label-info', function() {
			$('.label-selected').removeClass('label-selected');
			$(this).addClass('label-selected');
			window.Asc.plugin.executeMethod("SelectContentControl",[this.id]);
		});
	};
	
    window.Asc.plugin.button = function(id)
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
				$('#divG').append("<label id = \"" + returnValue[i].InternalId + "\" class =\"label-info\">"+ returnValue[i].InternalId + "	" + (returnValue[i].Id || 'null') +"</label>");
			}

		} else if (_plugin.info.methodName == "GetCurrentContentControl") {
			if (document.getElementById(returnValue))
			{
				$('.label-selected').removeClass('label-selected');
				$('#' + returnValue).addClass('label-selected');

			} else {
				$('#divG').append("<label id = \"" + returnValue + "\" class =\"label-info\">"+ returnValue + "	null</label>");
				$('#' + returnValue).addClass('label-selected');
			}
		}
	};

})(window, undefined);
