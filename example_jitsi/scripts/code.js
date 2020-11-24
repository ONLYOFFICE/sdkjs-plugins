(function(window, undefined){

	var iframe,
		isInit = false,
		api;
	
	window.Asc.plugin.init = function () {
		document.getElementById("start").onclick = function() {
			const domain = 'meet.jit.si';
			const options = {
				roomName: 'Test meet',
				width: document.getElementById("body").clientWidth- 10 +"px",
				height: '550px',
				parentNode: document.querySelector('#meet'),
				onload : function () {
					if (isInit) {
						api.dispose();
						isInit = false;
					} else {
						isInit = true;
					}
				}
			};
			api = new JitsiMeetExternalAPI(domain, options);
			iframe = api.getIFrame();
		};

		document.getElementById("stop").onclick = function() {
			api.dispose();
			isInit = false;
		};
	};

	window.onresize = function(e){
		iframe.style.width = document.getElementById("body").clientWidth- 10 +"px";
	}
	window.Asc.plugin.button = function(id) {		
		this.executeCommand("close", "");
	};


})(window, undefined);