(function(window, undefined){

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
		if (-1 == id)
		{
			responsiveVoice.cancel();
		}
		this.executeCommand("close", "");
	};

})(window, undefined);
