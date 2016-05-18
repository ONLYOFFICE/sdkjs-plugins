(function(window, undefined){

	window.Asc.plugin = {};

	window.Asc.plugin.guid = "{D71C2EF0-F15B-47C7-80E9-86D671F9C595}";

	window.Asc.plugin.init = function(text)
	{
		function StartCallback()
		{
		}

		function EndCallback()
		{
			window.Asc.plugin.button(-1);
		}

		responsiveVoice.OnVoiceReady = function()
		{
			setTimeout(function(){
				var voicelist = responsiveVoice.getVoices();
				responsiveVoice.speak(text, voicelist[0].name,  {onstart: StartCallback, onend: EndCallback});
			}, 1);
		};
	};

	window.Asc.plugin.button = function(id)
	{
		window.Asc.plugin_sendMessage("close", "");
	};

})(window, undefined);
