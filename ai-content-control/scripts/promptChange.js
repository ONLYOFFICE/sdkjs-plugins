var AreaEl = document.getElementById('prompt-textarea');
var changeBtnEl = document.getElementById('change-btn');
changeBtnEl.addEventListener('click', onChangePrompt);

function onChangePrompt() {
	var prompt = AreaEl.value.trim();
	if(!prompt.length) return;

	window.Asc.plugin.sendToPlugin("onChangePrompt", prompt);	
}

window.Asc.plugin.init = function() {
    window.Asc.plugin.attachEvent("onGetPrompt", function(data) {
        AreaEl.value = data;
    });

    window.Asc.plugin.sendToPlugin("onInit");
}
